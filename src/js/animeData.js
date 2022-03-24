import BASE_URL from "./apiConfig";

const AnimeData = {
  apiCall(params) {
    return fetch(BASE_URL + params).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("HTTP CODE NOT 200");
    });
  },
  searchAnimeByName(animeName) {
    if (animeName === undefined) {
      throw new Error("Anime name cannot be undefined");
    }
    return this.apiCall(
      "/anime?" + new URLSearchParams({ "filter[text]": animeName })
    ).then((anime) => {
      if (anime.data !== "") {
        return anime.data;
      }
    });
  },
  searchAnimeById(animeId) {
    if (animeId === undefined) {
      throw new Error("Anime id cannot be undefined");
    }
    return this.apiCall(
      "/anime?" + new URLSearchParams({ "filter[id]": animeId })
    ).then((anime) => {
      if (anime.data !== "") {
        return anime.data[0];
      }
    });
  },
  getTrendingAnime() {
    return this.apiCall("/trending/anime").then((anime) => {
      if (anime.data !== "") {
        return anime.data;
      }
    });
  }
};

export default AnimeData;
