import React from "react";
import useModelProp from "../useModelProp";
import AnimeData from "../animeData";
import usePromise from "../usePromise";
import promiseNoData from "../views/promiseNoData";
import DetailsView from "../views/detailsView";

function Details({ userModel, animeModel, navToSearch }) {
  const currentAnime = useModelProp(animeModel, "currentAnime");
  const animeList = useModelProp(animeModel, "animeList");
  const loggedIn = useModelProp(userModel, "loggedIn");
  const [addToListText, setaddToListText] = React.useState("Login to add anime to list");
  const [animeStatus, setAnimeStatus] = React.useState("Plan to watch");
  const [personalRating, setPersonalRating] = React.useState("");
  const [promise, setPromise] = React.useState(null);
  const [data, error] = usePromise(promise);

  React.useEffect(
    function () {
      if (currentAnime) {
        setPromise(AnimeData.searchAnimeById(currentAnime));
      }
    },
    [currentAnime]
  );

  React.useEffect(
    function () {
      if (loggedIn) {
        setaddToListText("Add to list");
      }
    },
    [loggedIn]
  );

  return (
    promiseNoData(promise, data, error) ||
    React.createElement(DetailsView, {
      anime: data,
      personalRating: userRating => setPersonalRating(userRating),
      animeStatus: animeStatus => setAnimeStatus(animeStatus),
      animeAdded: (addedAnime) => {
        if (loggedIn) {
          animeModel.addToAnimeList({
            animeTitle: addedAnime.attributes.canonicalTitle,
            animeId: addedAnime.id,
            animeStatus: animeStatus,
            personalRating: personalRating
          });
          userModel.updateUserAnimeListDb();
        }
      },
      addToListNav: navToSearch,
      addToListText: addToListText,
      backToSearchNav: navToSearch,
      isAnimeInList: animeList.find((listAnime) => listAnime.id === currentAnime) !== undefined,
      loggedIn: loggedIn
    })
  );
}
export default Details;
