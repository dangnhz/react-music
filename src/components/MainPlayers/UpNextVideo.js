import React from 'react';
// import { FixedSizeList as List } from 'react-window';
import { connect } from 'react-redux';

import VideoResultItem from '../SearchComponents/VideoResultItem';

const UpNextVideos = ({ videos }) => {
  return videos.map((video, index) => {
    return <VideoResultItem video={video} key={index} />;
  });
};

const mapStateToProps = (state) => ({
  videos: state.video.upNextVideos,
});

export default connect(mapStateToProps, {})(UpNextVideos);
