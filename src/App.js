import React from 'react';
import { connect } from 'react-redux';
import './App.scss';
import BottomNavigationBar from './components/BottomNavigationBar';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { pink } from '@material-ui/core/colors';
import CurrentView from './components/CurrentView';
import MainPlayer from './components/MainPlayers/MainPlayer';
import LoadingCircular from './components/LoadingCircular';
import './utils/getCountryCode';
const defaultTheme = {
  palette: {
    primary: pink,
    secondary: {
      main: '#fafafa',
    },
  },
  typography: {
    useNextVariants: true,
  },
};

const darkTheme = {
  palette: {
    type: 'dark',
    primary: pink,
    secondary: {
      main: '#fafafa',
    },
  },
  typography: {
    useNextVariants: true,
  },
};

const muiDarkTheme = createMuiTheme(darkTheme);
const muiDefaultTheme = createMuiTheme(defaultTheme);

let userChoice = 'light';

function App({ currentViewIsDisplayed, video }) {
  if (video.isLoadingVideo) console.log('loading video...');
  return (
    <ThemeProvider
      theme={userChoice === 'dark' ? muiDarkTheme : muiDefaultTheme}
    >
      <div className='App'>
        {video.currentVideo && <MainPlayer video={video} />}

        {/* {<LoadingCircular />} */}

        <CurrentView
          currentViewIsDisplayed={currentViewIsDisplayed}
        ></CurrentView>
        <BottomNavigationBar></BottomNavigationBar>
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  currentViewIsDisplayed: state.currentViewIsDisplayed,
  video: state.video,
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
