class AnimeModel {
  constructor() {
    this.subscribers = [];
    this.animeList = [];
    this.currentAnime = -1;
  }

  addToAnimeList({ animeId, animeTitle, animeStatus, personalRating }) {
    this.animeList.forEach((curAnime) => {
      if (curAnime.id === animeId) {
        throw new Error("Anime already exists in the list");
      }
    });
    let animeEntry = {
      id: animeId,
      name: animeTitle,
      animeStatus: animeStatus,
      personalRating: personalRating,
    };
    this.animeList = [animeEntry, ...this.animeList];
    this.notifyObservers();
  }

  getAnimeList() {
    return this.animeList;
  }

  removeFromAnimeList(animeId) {
    this.animeList = this.animeList.filter(
      (curAnime) => curAnime.id !== animeId
    );
    this.notifyObservers();
  }

  fillAnimeList(animeList) {
    this.animeList = [...animeList];
    this.notifyObservers();
  }

  emptyAnimeList() {
    this.animeList = [];
    this.notifyObservers();
  }

  updateAnimeData(anime) {
    let newAnimeList = [...this.animeList];
    newAnimeList.forEach((curAnimeInList) => 
    {
      if (curAnimeInList.id === anime.id) 
      {
        curAnimeInList = anime;
      }
    });
    this.animeList = newAnimeList;
    this.notifyObservers();
  }

  setCurrentAnime(animeId) {
    this.currentAnime = animeId;
    this.notifyObservers();
  }

  getCurrentAnime() {
    return this.currentAnime;
  }

  addObserver(callback) {
    this.subscribers = this.subscribers.concat(callback);
  }

  removeObserver(obs) {
    this.subscribers = this.subscribers.filter((o) => {
      return o !== obs;
    });
  }

  notifyObservers() {
    this.subscribers.forEach((callback) => {
      try {
        callback();
      } catch (err) {
        console.error("Callback error: ", err, callback);
      }
    });
  }
}

export default AnimeModel;
