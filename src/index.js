import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebaseConfig from "./js/firebaseConfig";
import AnimeModel from "./js/AnimeModel";
import UserModel from "./js/UserModel";
import 'bootstrap/dist/css/bootstrap.min.css';

const animeModel = new AnimeModel();
const userModel = new UserModel({ animeModel: animeModel });

ReactDOM.render(<App animeModel={animeModel} userModel={userModel} />, document.getElementById("app"));

