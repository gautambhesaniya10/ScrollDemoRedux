import axios from "axios";

import {
  COMICS_REQUEST_FAILURE,
  COMICS_REQUEST_PENDING,
  COMICS_REQUEST_SUCCESS
} from "./type";

export const loadComic = () => {
  return {
    type: COMICS_REQUEST_PENDING,
  };
};

export const setComic = (comics) => {
  return {
    type: COMICS_REQUEST_SUCCESS,
    comics,
  };
};

export const failComic = (error) => {
  return {
    type: COMICS_REQUEST_FAILURE,
    error,
  };
};

export const comicAPI = (increment) => {
  return (dispatch) => {
    dispatch(loadComic());
    axios
      .get(
        `https://api.giphy.com/v1/gifs/trending?api_key=0ibORAYysaM11zBqpLlegxFN0I1D33f6&limit=${increment}`
      )
      .then((res) => {
        let comicData = res.data.data;
        console.log("res.data", res.data.data);
        dispatch(setComic(comicData));
        return res.data;
      })
      .catch((err) => {
        console.log("ERROR", err);
        dispatch(failComic(err));
      });
  };
};
