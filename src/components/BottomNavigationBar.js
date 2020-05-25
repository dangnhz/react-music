import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { setCurrentView } from '../redux/actions/setCurrentViewActions';

const useStyles = makeStyles({
  root: {
    position: 'fixed',
    bottom: '0',
    marginTop: '100px',
    width: '100%',
    display: 'flex',
    boxShadow: '0px -5px 10px rgba(0,0,0,.1)',
    justifyContent: 'space-between',
  },
});

function BottomNavigationBar({ setCurrentView, currentViewIsDisplayed }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        setCurrentView(newValue);
      }}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        className={currentViewIsDisplayed === 'home' ? 'Mui-selected' : ''}
        label='Home'
        value='home'
        icon={<HomeIcon />}
      />
      <BottomNavigationAction
        className={currentViewIsDisplayed === 'search' ? 'Mui-selected' : ''}
        label='Search'
        value='search'
        icon={<SearchIcon />}
      />
      <BottomNavigationAction
        className={currentViewIsDisplayed === 'favorite' ? 'Mui-selected' : ''}
        label='Favorite'
        value='favorite'
        icon={<FavoriteIcon />}
      />
    </BottomNavigation>
  );
}

const mapStateToProps = (state) => ({
  currentViewIsDisplayed: state.currentViewIsDisplayed,
});

export default connect(mapStateToProps, { setCurrentView })(
  BottomNavigationBar
);
