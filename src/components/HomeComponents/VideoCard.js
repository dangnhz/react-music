import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

import './VideoCard.scss';

import { connect } from 'react-redux';
import {
  setCurrentVideo,
  setUpNextVideos,
  addRecentPlayedVideo,
} from '../../redux/actions/videoActions';

const VideoCard = ({
  video,
  setCurrentVideo,
  setUpNextVideos,
  addRecentPlayedVideo,
}) => {
  const handleOnClick = (video) => {
    // console.log(video);
    // dispatch set current video action
    setCurrentVideo(video);
    // dispatch set related videos action
    setUpNextVideos(video.id);
    // add to recent played list
    addRecentPlayedVideo(video);
  };

  return (
    <Card className='video-card' onClick={() => handleOnClick(video)}>
      <CardActionArea>
        <CardMedia
          component='img'
          alt={video.title}
          height='140'
          image={video.sdThumbnail}
          title={video.title}
          src={video.sdThumbnail}
        />
        <CardContent>
          <Typography variant='h6' component='h6' className='video-title'>
            {video.title}
          </Typography>
          <Typography
            variant='body1'
            color='textSecondary'
            component='p'
            className='channel-title'
          >
            {video.channelTitle}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default connect(null, {
  setCurrentVideo,
  setUpNextVideos,
  addRecentPlayedVideo,
})(VideoCard);
