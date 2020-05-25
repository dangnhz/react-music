import searchUpNextVideos from '../../api/searchUpNextVideos';
export const SET_PLAYER_DISPLAY = 'SET_PLAYER_DISPLAY';
export const SET_CURRENT_VIDEO = 'SET_CURRENT_VIDEO';
export const SET_UP_NEXT_VIDEOS = 'SET_UP_NEXT_VIDEOS';
export const CLEAR_CURRENT_VIDEO = 'CLEAR_CURRENT_VIDEO';
export const SET_IS_LOADING_VIDEO = 'SET_IS_LOADING_VIDEO';
export const ADD_RECENT_PLAYED_VIDEO = 'ADD_RECENT_PLAYED_VIDEO';
export const ADD_RECOMMENDED_VIDEO = 'ADD_RECOMMENDED_VIDEO';
export const ADD_FAVORITE_VIDEO = ' ADD_FAVORITE_VIDEO';
export const REMOVE_FAVORITE_VIDEO = 'REMOVE_FAVORITE_VIDEO';

export const setPlayerDisplay = (value) => (dispatch) => {
  dispatch({
    type: SET_PLAYER_DISPLAY,
    payload: value,
  });
};

export const setCurrentVideo = (video) => async (dispatch) => {
  dispatch({
    type: SET_CURRENT_VIDEO,
    payload: video,
  });
};

// search related videos based on current video's id
export const setUpNextVideos = (id) => async (dispatch) => {
  try {
    const response = await searchUpNextVideos(id);
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
        type: SET_UP_NEXT_VIDEOS,
        payload: results,
      });

      dispatch(addRecommendedVideo(results[0]));
    }
  } catch (err) {
    console.log('up next videos:', err);
  }
};

export const clearCurrentVideo = () => (dispatch) => {
  dispatch({
    type: CLEAR_CURRENT_VIDEO,
  });
};

export const setIsLoadingVideo = (value) => (dispatch) => {
  dispatch({
    type: SET_IS_LOADING_VIDEO,
    payload: value,
  });
};

export const addRecentPlayedVideo = (video) => async (dispatch) => {
  dispatch({
    type: ADD_RECENT_PLAYED_VIDEO,
    payload: video,
  });
};

export const addRecommendedVideo = (video) => async (dispatch) => {
  dispatch({
    type: ADD_RECOMMENDED_VIDEO,
    payload: video,
  });
};

export const addFavoriteVideo = (video) => async (dispatch) => {
  dispatch({
    type: ADD_FAVORITE_VIDEO,
    payload: video,
  });
};

export const removeFavoriteVideo = (video) => async (dispatch) => {
  dispatch({
    type: REMOVE_FAVORITE_VIDEO,
    payload: video,
  });
};
