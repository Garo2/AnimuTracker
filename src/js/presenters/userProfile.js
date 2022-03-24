import React from "react";
import useModelProp from "../useModelProp"
import UserProfileView from "../views/userProfileView"

function UserProfile({ animeModel, userModel, navToDetails, navToSearch }) {
    const animeList = useModelProp(animeModel, "animeList");
    const loggedIn = useModelProp(userModel, "loggedIn");
    const [sortingType, setSortingType] = React.useState("");
    let sortingFunction = null;
    if (!loggedIn) {
        navToSearch();
    }
    if (sortingType === "") {
        sortingFunction = compareAnimeByNothing;
    }
    else if (sortingType === "name") {
        sortingFunction = compareAnimeByName;
    }
    else if (sortingType === "status") {
        sortingFunction = compareAnimeByStatus;
    }
    else if (sortingType === "rating") {
        sortingFunction = compareAnimeRating;
    }

    return React.createElement(UserProfileView, {
        animeList: [...animeList],
        removeAnime: (animeId) => {
            animeModel.removeFromAnimeList(animeId);
            userModel.updateUserAnimeListDb();
        },
        showAnimeDetails: (animeId) => { animeModel.setCurrentAnime(animeId); navToDetails(); },
        sortingType: (sortFor) => setSortingType(sortFor),
        sortingFunction: sortingFunction,
        updatedAnimeStatus: (animeStatus, animeEntry) => {
            animeEntry.animeStatus = animeStatus;
            animeModel.updateAnimeData(animeEntry);
            userModel.updateUserAnimeListDb();
        },
        updateAnimeRating: (animeRating, animeEntry) => {
            animeEntry.personalRating = animeRating;
            animeModel.updateAnimeData(animeEntry);
            userModel.updateUserAnimeListDb();
        },
    })
}

function compareAnimeByNothing(animeEntryA, animeEntryB) {
    return 0;
}

function compareAnimeByName(animeEntryA, animeEntryB) {
    let ae = animeEntryA.name;
    let be = animeEntryB.name;

    if (ae === be) {
        return 0;
    }
    return ae < be ? -1 : 1;
}

const animeStatus = ["Completed", "Watching", "Plan to watch", ""];
function compareAnimeByStatus(animeEntryA, animeEntryB) {
    let ae = animeStatus.indexOf(animeEntryA.animeStatus);
    let be = animeStatus.indexOf(animeEntryB.animeStatus);

    if (ae === be) {
        return compareAnimeByName(animeEntryA, animeEntryB);
    }
    return ae < be ? -1 : 1;
}

function compareAnimeRating(animeEntryA, animeEntryB) {
    let ae = parseInt(animeEntryA.personalRating);
    let be = parseInt(animeEntryB.personalRating);

    if (animeEntryA.personalRating === "") {
        ae = 0;
    }
    if (animeEntryB.personalRating === "") {
        be = 0;
    }

    if (ae === be) {
        return compareAnimeByName(animeEntryA, animeEntryB);
    }
    return ae > be ? -1 : 1;
}

export default UserProfile;