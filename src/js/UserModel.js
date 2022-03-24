import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

class UserModel {
  constructor({ animeModel }) {
    this.subscribers = [];
    this.animeModel = animeModel;
    this.loggedIn = null;
    this.uid = null;
    this.displayName = null;
    this.email = null;
    this.dbref = null;
    this.errorData = null;
    if (firebase.auth().currentUser) {
      this.populateUserModelData({ loggedIn: true, user: firebase.auth().currentUser });
      this.fillUserAnimeListFromDb();
    }
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.populateUserModelData({ loggedIn: true, user: user });
        this.fillUserAnimeListFromDb();
      } else {
        this.emptyUserModelData();
      }
    });
  }

  loginUser(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(result => {
        if (result.user) {
          this.populateUserModelData({ loggedIn: true, user: result.user });
          this.fillUserAnimeListFromDb();
        }
      })
      .catch(err => {
        this.emptyUserModelData();
        this.reportError(err.code, err.message);
      })

  }

  logoutUser() {
    firebase.auth().signOut().then(() => {
      this.emptyUserModelData();
      this.animeModel.emptyAnimeList();
    }).catch(err => {
      this.emptyUserModelData();
      this.reportError(err.code, err.message);
    });
  }

  signupUser(displayName, email, password) {

    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(result => {
        if (result.user) {
          result.user.updateProfile({ displayName: displayName });
          this.displayName = displayName;
          this.populateUserModelData({ loggedIn: true, user: result.user });
          this.setInitialDbUserData({ displayName: displayName, email: email });
        }
      })
      .catch(err => {
        this.emptyUserModelData();
        this.reportError(err.code, err.message);
      })

  }

  fillUserAnimeListFromDb() {
    let animeList = [];
    this.dbref.once('value').then((snapshot) => {
      animeList = snapshot.val().animeList;
      if (animeList) {
        this.animeModel.fillAnimeList(animeList);
      }
    });
  }

  updateUserAnimeListDb() {
    this.dbref.update({
      animeList: this.animeModel.animeList
    });
  }

  setInitialDbUserData({ displayName, email }) {
    this.dbref.set({
      displayName: displayName,
      email: email,
      animeList: []
    });
  }


  populateUserModelData({ loggedIn, user }) {
    this.loggedIn = loggedIn;
    this.uid = user.uid;
    if (user.displayName) {
      this.displayName = user.displayName;
    }
    this.email = user.email;
    this.dbref = firebase.database().ref('users/' + this.uid);
    this.notifyObservers();
  }

  reportError(code, message) {
    this.errorData = { code: code, message: message };
    this.notifyObservers();
  }

  emptyErrorData() {
    this.errorData = null;
    this.notifyObservers();
  }

  emptyUserModelData() {
    this.loggedIn = false;
    this.uid = null;
    this.displayName = null;
    this.email = null;
    this.dbref = null;
    this.notifyObservers();
  }

  addObserver(callback) {
    this.subscribers = this.subscribers.concat(callback);
  }

  removeObserver(obs) {
    this.subscribers = this.subscribers.filter(o => { return o !== obs; });
  }

  notifyObservers() {
    this.subscribers.forEach(callback => {
      try {
        callback();
      }
      catch (err) {
        console.error("Callback error: ", err, callback);
      }
    });
  }

}

export default UserModel;