import "./App.css"
import React from "react";
import Navigation from "./js/presenters/navigation";
import Search from "./js/presenters/search";
import Details from "./js/presenters/details";
import ShowView from "./js/presenters/showView";
import UserProfile from "./js/presenters/userProfile"
import NavigationSignin from "./js/presenters/navigationSignin"
import NavigationSignup from "./js/presenters/navigationSignup"
import NavigationSignout from "./js/presenters/navigationSignout"
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const goToSearch = () => window.location.hash = "search";
const goToDetails = () => window.location.hash = "details";
const goToSearchHref = "#search";
const goToUserProfileHref = "#userProfile";



function App({ animeModel, userModel }) {
  return (
    <div>
      <Navigation userModel={userModel} >
        <NavigationSignin userModel={userModel} />
        <NavigationSignup userModel={userModel} />
        <NavigationSignout userModel={userModel} goToSearch={goToSearchHref} goToUserProfile={goToUserProfileHref} />
      </Navigation>
      <ShowView hash="#search">
        <div>
          <Search animeModel={animeModel} nav={goToDetails} />
        </div>
      </ShowView>
      <ShowView hash="#details">
        <div>
          <Details userModel={userModel} animeModel={animeModel} navToSearch={goToSearch} />
        </div>
      </ShowView>
      <ShowView hash="#userProfile">
        <div>
          <UserProfile userModel={userModel} animeModel={animeModel} navToSearch={goToSearch} navToDetails={goToDetails} />
        </div>
      </ShowView>
      <ToastContainer />
    </div>
  );
}

function defaultRoute() {
  if (!["#search", "#details", "#userProfile"].find(knownRoute =>
    knownRoute === window.location.hash))
    window.location.hash = "#search";
}

defaultRoute();
window.addEventListener("hashchange", defaultRoute);

export default App;