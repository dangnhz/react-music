import getSuggestSearchQuery from '../../api/suggestSearchQuery';
import searchYouTube from '../../api/searchYouTube';
export const GET_SUGGEST_SEARCH_QUERY = 'GET_SUGGEST_SEARCH_QUERY';
export const CLEAR_SUGGEST_SEARCH_QUERY = 'CLEAR_SUGGEST_SEARCH_QUERY';
export const CLEAR_QUERY = 'CLEAR_QUERY';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SET_IS_SEARCHING = 'SET_IS_SEARCHING';
export const SEARCH_YOUTUBE = 'SEARCH_YOUTUBE';
export const CLEAR_SEARCH_YOUTUBE_RESULT = 'CLEAR_SEARCH_YOUTUBE_RESULT';

export const getSuggestSearchQueryAction = (query) => async (dispatch) => {
  if (query.length > 0) {
    try {
      const response = await getSuggestSearchQuery(query);
      if (response) {
        const suggestQueries = response.data[1].map((query) => query[0]);
        dispatch({
          type: GET_SUGGEST_SEARCH_QUERY,
          payload: suggestQueries,
        });
      }
    } catch (err) {
      console.log('error from search action:', err);
    }
  }
};

export const clearSuggestSearchQuery = () => (dispatch) => {
  return dispatch({
    type: CLEAR_SUGGEST_SEARCH_QUERY,
  });
};

export const clearQuery = () => (dispatch) => {
  return dispatch({
    type: CLEAR_QUERY,
  });
};

export const setSearchQuery = (query) => (dispatch) => {
  return dispatch({
    type: SET_SEARCH_QUERY,
    payload: query,
  });
};

export const searchYouTubeAction = (query) => async (dispatch) => {
  // set isSearching to true and clear search suggest query
  dispatch(clearSuggestSearchQuery());
  dispatch(setIsSearching());

  try {
    const response = await searchYouTube(query);
    if (response) {
      const results = response.data.items.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        channelTitle: item.snippet.channelTitle,
        audioLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
        maxThumbnail: item.snippet.thumbnails.high.url,
        sdThumbnail: item.snippet.thumbnails.medium.url,
      }));
      dispatch({
        type: SEARCH_YOUTUBE,
        payload: results,
      });
    }
  } catch (err) {
    console.log('cannot search', err);
    // dispatch error action here
    dispatch(setIsSearching());
  }
};

export const setIsSearching = () => (dispatch) => {
  return dispatch({
    type: SET_IS_SEARCHING,
  });
};

export const clearSearchYouTubeResult = () => (dispatch) => {
  return dispatch({
    type: CLEAR_SEARCH_YOUTUBE_RESULT,
  });
};
