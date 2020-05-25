import { combineReducers } from 'redux';
import currentViewIsDisplayed from './currentViewReducer';
import search from './searchReducer';
import video from './videoReducer';

const rootReducer = combineReducers({
  currentViewIsDisplayed,
  search,
  video,
});

export default rootReducer;
