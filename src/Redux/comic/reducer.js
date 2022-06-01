import {
  COMICS_REQUEST_FAILURE,
  COMICS_REQUEST_PENDING,
  COMICS_REQUEST_SUCCESS,
} from "./type";

const comicReducer = (
  comicData = { comic: [], isLoading: false, error: false, isApiCall: true },
  action
) => {
  switch (action.type) {
    case COMICS_REQUEST_PENDING:
      return { ...comicData, isLoading: true };
    case COMICS_REQUEST_SUCCESS:
      return {
        ...comicData,
        isLoading: false,
        comic: [...action.comics],
      };
    case COMICS_REQUEST_FAILURE:
      console.log("COMICS_REQUEST_FAILURE");
      return { ...comicData, error: action.error };
    default:
      return comicData;
  }
};

export default comicReducer;
