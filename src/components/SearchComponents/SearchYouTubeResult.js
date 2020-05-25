import React from 'react';
// import { FixedSizeList as List } from 'react-window';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import VideoResultItem from './VideoResultItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    // overflowY: 'scroll',
    width: '100%',
    // height: '100vh',
    padding: '50px 0 150px 0 !important',
    '&::WebkitScrollbar': {
      display: 'none',
    },
    scrollbarWidth: 'none',
    '-ms-overflow-style': 'none',
    backgroundColor: theme.palette.background.paper,
  },
}));

const SearchYouTubeResult = ({ videos }) => {
  const classes = useStyles();
  const renderResult = videos.map((video, index) => {
    return <VideoResultItem video={video} key={index} />;
  });

  return <List className={classes.root}>{renderResult}</List>;
};

const mapStateToProps = (state) => ({
  videos: state.search.searchResults,
});

export default connect(mapStateToProps, {})(SearchYouTubeResult);
