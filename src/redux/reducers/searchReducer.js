import {
  GET_SUGGEST_SEARCH_QUERY,
  SEARCH_YOUTUBE,
  CLEAR_QUERY,
  CLEAR_SEARCH_YOUTUBE_RESULT,
} from '../actions/searchActions';
import { CLEAR_SUGGEST_SEARCH_QUERY } from '../actions/searchActions';
import { SET_SEARCH_QUERY } from '../actions/searchActions';
import { SET_IS_SEARCHING } from '../actions/searchActions';
const initialState = {
  query: '',
  isSearching: false,
  suggestQueries: [],
  searchResults: [],
};

const search = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUGGEST_SEARCH_QUERY:
      return {
        ...state,
        suggestQueries: action.payload,
      };
    case CLEAR_SUGGEST_SEARCH_QUERY:
      return {
        ...state,
        suggestQueries: [],
      };
    case CLEAR_QUERY:
      return {
        ...state,
        query: '',
      };
    case SET_SEARCH_QUERY:
      return { ...state, query: action.payload };
    case SET_IS_SEARCHING:
      return { ...state, isSearching: !state.isSearching };
    case SEARCH_YOUTUBE:
      return { ...state, searchResults: action.payload, isSearching: false };
    case CLEAR_SEARCH_YOUTUBE_RESULT:
      return { ...state, searchResults: [] };
    default:
      return state;
  }
};

export default search;
