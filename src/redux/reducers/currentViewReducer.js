import { SET_CURRENT_VIEW } from '../actions/setCurrentViewActions';

const currentViewIsDisplayed = (state = 'home', action) => {
  switch (action.type) {
    case SET_CURRENT_VIEW:
      return (state = action.payload);
    default:
      return state;
  }
};

export default currentViewIsDisplayed;
