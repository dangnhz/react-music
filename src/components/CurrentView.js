import React from 'react';
import Home from '../views/Home';
import Search from '../views/Search';
import Favorite from '../views/Favorite';

const CurrentView = ({ currentViewIsDisplayed }) => {
  return (
    <div style={style}>
      {currentViewIsDisplayed === 'home' && <Home></Home>}
      {currentViewIsDisplayed === 'search' && <Search></Search>}
      {currentViewIsDisplayed === 'favorite' && <Favorite></Favorite>}
    </div>
  );
};

const style = {
  height: 'auto',
  overflowX: 'hidden',
  scrollbarWidth: 'none',
  '&::WebkitScrollbar': {
    display: 'none',
  },
};
export default CurrentView;
