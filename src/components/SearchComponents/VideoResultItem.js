import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';

import {
  setCurrentVideo,
  setUpNextVideos,
  addRecentPlayedVideo,
  removeFavoriteVideo,
} from '../../redux/actions/videoActions';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    cursor: 'pointer',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
}));

const VideoResultItem = ({
  video,
  showDeleteAction = false,
  setCurrentVideo,
  setUpNextVideos,
  addRecentPlayedVideo,
  removeFavoriteVideo,
}) => {
  const handleClick = (video) => {
    // console.log(video);
    // dispatch set current video action
    setCurrentVideo(video);
    // dispatch set related videos action
    setUpNextVideos(video.id);
    // add to recent played list
    addRecentPlayedVideo(video);
  };

  const handleRemoveFavorite = (video) => {
    removeFavoriteVideo(video);
    console.log('remove video from favorite list', video.id);
  };
  const classes = useStyles();
  return (
    <ListItem
      alignItems='center'
      className={classes.root}
      button
      onClick={() => handleClick(video)}
    >
      <ListItemAvatar>
        <Avatar alt={video.title} src={video.sdThumbnail} />
      </ListItemAvatar>
      <ListItemText
        primary={video.title}
        secondary={
          <React.Fragment>
            <Typography
              component='span'
              variant='body2'
              className={classes.inline}
              color='textPrimary'
            >
              {video.channelTitle}
            </Typography>
          </React.Fragment>
        }
      />
      {showDeleteAction && (
        <ListItemSecondaryAction>
          <IconButton
            edge='end'
            aria-label='delete'
            onClick={() => handleRemoveFavorite(video)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      )}
    </ListItem>
  );
};

export default connect(null, {
  setCurrentVideo,
  setUpNextVideos,
  addRecentPlayedVideo,
  removeFavoriteVideo,
})(VideoResultItem);
