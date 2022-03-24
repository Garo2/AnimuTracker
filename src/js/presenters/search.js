import React from "react";
import usePromise from "../usePromise";
import AnimeData from "../animeData";
import SearchView from "../views/searchView";
import SearchResultView from "../views/searchResultView";
import promiseNoData from "../views/promiseNoData";

function Search({ animeModel, nav }) {
  const [animeName, setAnimeName] = React.useState("");
  const [searchTitle, setSearchTitle] = React.useState("Trending")
  const [promise, setPromise] = React.useState(null);
  const [data, error] = usePromise(promise);
  React.useEffect(() => {
    setPromise(AnimeData.getTrendingAnime());
  }, []);

  return React.createElement(
    React.Fragment,
    {},
    React.createElement(SearchView, {
      setAnimeName: (animeName) => setAnimeName(animeName),
      searchAnime: () => {
        setPromise(AnimeData.searchAnimeByName(animeName));
        setSearchTitle("Search results for: " + animeName);
      },
    }),
    promiseNoData(promise, data, error) ||
    React.createElement(SearchResultView, {
      animeResults: data,
      currentAnime: (animeId) => animeModel.setCurrentAnime(animeId),
      nav: nav,
      searchTitle: searchTitle
    })
  );
}

export default Search;
