import React from 'react';
import AppBar from '../components/AppBar';
import List from '@material-ui/core/List';
import VideoResultItem from '../components/SearchComponents/VideoResultItem';

import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';

const Favorite = ({ videos }) => {
  const renderResult = videos.map((video, index) => {
    return (
      <VideoResultItem video={video} key={index} showDeleteAction={true} />
    );
  });
  return (
    <div
      style={{
        paddingTop: '60px',
        paddingBottom: '110px',
      }}
    >
      <AppBar title='Favorite' />
      {!videos.length > 0 && (
        <Typography
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 'calc(100vh - 200px)',
            justifyContent: 'center',
          }}
        >
          You have no favorite song.
        </Typography>
      )}
      <List>{renderResult}</List>
    </div>
  );
};

const mapStateToProps = (state) => ({
  videos: state.video.favoriteVideos,
});

export default connect(mapStateToProps, {})(Favorite);
