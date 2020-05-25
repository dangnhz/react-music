import { SET_CURRENT_VIDEO } from '../actions/videoActions';
import { SET_PLAYER_DISPLAY } from '../actions/videoActions';
import { CLEAR_CURRENT_VIDEO } from '../actions/videoActions';
import { SET_UP_NEXT_VIDEOS } from '../actions/videoActions';
import { ADD_RECENT_PLAYED_VIDEO } from '../actions/videoActions';

import { ADD_FAVORITE_VIDEO } from '../actions/videoActions';
import { REMOVE_FAVORITE_VIDEO } from '../actions/videoActions';
import { ADD_RECOMMENDED_VIDEO } from '../actions/videoActions';
// display: none || minimize || maximize

const initialState = {
  playerDisplay: false,
  currentVideo: null,
  upNextVideos: [],
  recentPlayedVideos:
    JSON.parse(localStorage.getItem('recentPlayedVideos')) || [],
  recommendedVideos:
    JSON.parse(localStorage.getItem('recommendedVideos')) || [],
  favoriteVideos: JSON.parse(localStorage.getItem('favoriteVideos')) || [],
};

const videoPlayer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PLAYER_DISPLAY: {
      return { ...state, playerDisplay: action.payload };
    }
    case SET_CURRENT_VIDEO:
      return { ...state, currentVideo: action.payload };
    case CLEAR_CURRENT_VIDEO:
      return { ...state, currentVideo: null, playerDisplay: false };
    case SET_UP_NEXT_VIDEOS:
      return { ...state, upNextVideos: action.payload };
    case ADD_RECENT_PLAYED_VIDEO: {
      //Check if the video was already in the list or not ?
      const found = state.recentPlayedVideos.find(
        (video) => video.id === action.payload.id
      );

      let newPlayedList = [];

      // if found => remove that video and add it again to first position
      if (found) {
        newPlayedList = [
          found,
          ...state.recentPlayedVideos.filter((video) => video.id !== found.id),
        ];
      } else {
        newPlayedList = [action.payload, ...state.recentPlayedVideos];
      }
      // store new playlist to local storage
      localStorage.setItem('recentPlayedVideos', JSON.stringify(newPlayedList));
      return {
        ...state,
        recentPlayedVideos: newPlayedList,
      };
    }

    case ADD_RECOMMENDED_VIDEO: {
      const found = state.recommendedVideos.find(
        (video) => video.id === action.payload.id
      );

      if (found) {
        return state;
      } else {
        let recommendedVideos = [action.payload, ...state.recommendedVideos];
        localStorage.setItem(
          'recommendedVideos',
          JSON.stringify(recommendedVideos)
        );
        return {
          ...state,
          recommendedVideos: [action.payload, ...state.recommendedVideos],
        };
      }
    }

    case ADD_FAVORITE_VIDEO: {
      let favoriteList = [action.payload, ...state.favoriteVideos];
      localStorage.setItem('favoriteVideos', JSON.stringify(favoriteList));
      return {
        ...state,
        favoriteVideos: favoriteList,
      };
    }

    case REMOVE_FAVORITE_VIDEO: {
      let favoriteList = [
        ...state.favoriteVideos.filter(
          (video) => video.id !== action.payload.id
        ),
      ];
      localStorage.setItem('favoriteVideos', JSON.stringify(favoriteList));
      return {
        ...state,
        favoriteVideos: favoriteList,
      };
    }
    default:
      return state;
  }
};

export default videoPlayer;
