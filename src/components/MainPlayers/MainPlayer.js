import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { connect } from 'react-redux';
import { motion } from 'framer-motion';
import './MainPlayer.scss';
import Duration from './Duration';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PauseCircleFilledIcon from '@material-ui/icons/PauseCircleFilled';
import RepeatIcon from '@material-ui/icons/Repeat';
import RepeatOneIcon from '@material-ui/icons/RepeatOne';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import CloseIcon from '@material-ui/icons/Close';
// import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import SkipNextIcon from '@material-ui/icons/SkipNext';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import {
  Typography,
  Slider,
  IconButton,
  Grid,
  withStyles,
} from '@material-ui/core';

// import video actions
import {
  clearCurrentVideo,
  setCurrentVideo,
  setUpNextVideos,
  addFavoriteVideo,
  removeFavoriteVideo,
} from '../../redux/actions/videoActions';

import isMobileDevice from '../../utils/isMobileDevice';

import UpNextVideos from './UpNextVideo';

const ProgressSlider = withStyles({
  root: {
    height: 6,
  },
  thumb: {
    height: 16,
    width: 16,
    marginTop: -5.3,
    marginLeft: -8,
  },
  track: {
    height: 6,
    borderRadius: 4,
  },
  rail: {
    height: 6,
    borderRadius: 4,
  },
})(Slider);

const MainPlayer = ({
  video,
  clearCurrentVideo,
  setCurrentVideo,
  setUpNextVideos,
  addFavoriteVideo,
  removeFavoriteVideo,
}) => {
  const {
    currentVideo,
    upNextVideos,
    recentPlayedVideos,
    favoriteVideos,
  } = video;

  const audio = useRef(null);
  const player = audio.current;

  const [isOnMobile, setIsOnMobile] = useState(null); // check if user on mobile or not
  const [isPlayerMaximize, setIsPlayerMaximize] = useState(true); // there are 2 states: true= maximize || false = minimize
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [volume, setVolume] = useState(1);
  const [loop, setLoop] = useState(false);
  // const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);
  const [autoPlayNext, setAutoPlayNext] = useState(true);
  const [isLiked, setIsLiked] = useState(null);

  useEffect(() => {
    setIsOnMobile(isMobileDevice());
    console.log('is mobile:', isMobileDevice());
  }, []);

  // check if current video is in the favorite list

  useEffect(() => {
    setIsLiked(false);
    let found = favoriteVideos.find((item) => currentVideo.id === item.id);
    if (!found) return;
    setIsLiked(true);
  }, [currentVideo, favoriteVideos]);

  const handlePlayerDisplayMode = () => {
    setIsPlayerMaximize(!isPlayerMaximize);
  };

  const handleClosePlayer = () => {
    console.log('close player');
    clearCurrentVideo();
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const onAudioReady = () => {
    // if user is on mobile device turn off auto play
    if (isOnMobile) return setIsLoading(false);
    setIsPlaying(true);
    setIsLoading(false);
  };

  const handleOnBuffer = () => {
    setIsLoading(true);
    console.log('on buffering...');
  };

  const handleOnBufferEnd = () => {
    console.log('buffer end');
    setIsLoading(false);
  };

  const handleToggleLoop = () => {
    setLoop(!loop);
  };
  const handleVolumeChange = (e, newValue) => {
    setVolume(newValue);
  };

  const handlePlay = () => {
    setIsPlaying(true);
    setIsLoading(false);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleProgress = (state) => {
    // console.log('onProgress', state);
    if (!isSeeking) {
      setPlayed(state.played);
    }
    // We only want to update time slider if we are not currently seeking
  };

  const handleSeekChange = (e, newValue) => {
    if (!player) return;
    setPlayed(parseFloat(newValue));
    player.seekTo(parseFloat(newValue));
  };

  const handlePlayNextVideo = () => {
    if (!upNextVideos[0]) return;
    const nextVideo = upNextVideos[0];
    setCurrentVideo(nextVideo);
    setUpNextVideos(nextVideo.id);
  };

  const handleEnded = () => {
    console.log('onEnded');

    if (autoPlayNext && !loop) {
      handlePlayNextVideo();
    } else setIsPlaying(loop);
  };

  const handleOnError = (err) => {
    alert('Unable to play this song');
    // clearCurrentVideo();
    setIsPlaying(false);
    setIsLoading(false);
  };

  const handleAutoPlayNext = () => {
    setAutoPlayNext(!autoPlayNext);
  };

  const handleToggleLike = (video) => {
    if (isLiked === true) {
      removeFavoriteVideo(video);
      setIsLiked(false);
    } else {
      addFavoriteVideo(video);
      setIsLiked(true);
    }
  };

  return (
    <motion.div
      id='main-player'
      className={`main-player ${isPlayerMaximize ? 'maximize' : 'minimize'}`}
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ duration: 0.5 }}
    >
      {/* the top container includes toggle button and cover image */}
      <div className='top-container'>
        {/* toggle display mode maximize || minimize */}
        <div className='toggle-maximize'>
          <IconButton
            className='btn-toggle-maximize'
            size='medium'
            color='primary'
            onClick={handlePlayerDisplayMode}
          >
            {isPlayerMaximize ? (
              <KeyboardArrowDownIcon style={{ fontSize: '3rem' }} />
            ) : (
              <KeyboardArrowUpIcon style={{ fontSize: '3rem' }} />
            )}
          </IconButton>

          <IconButton
            className='btn-close-player'
            size='medium'
            color='primary'
            onClick={handleClosePlayer}
          >
            <CloseIcon />
          </IconButton>
        </div>
        {/* video cover image */}
        <div className={`video-cover ${isPlaying ? 'spin' : ''}`}>
          <img src={currentVideo.maxThumbnail} alt={currentVideo.title}></img>
        </div>
      </div>

      {/* end top container */}

      {/* start bottom container */}
      <div className='bottom-container'>
        <div className='video-info'>
          <Typography variant='h5' className='video-title'>
            {currentVideo.title}
          </Typography>

          <Typography variant='h6' className='video-channel-title'>
            {currentVideo.channelTitle}
          </Typography>
        </div>

        <Grid container justify='space-between' className='progress-time'>
          <Grid item className='progress-current'>
            <Typography>
              <Duration seconds={duration * played}></Duration>
            </Typography>
          </Grid>
          <Grid item className='progress-duration'>
            <Typography>
              <Duration seconds={duration}></Duration>
            </Typography>
          </Grid>
        </Grid>

        <div className='progress-bar'>
          <ProgressSlider
            min={0}
            max={0.999999}
            value={played}
            step={0.000001}
            onChange={handleSeekChange}
          />
        </div>

        <div className='player-controls'>
          <div className='controls-group'>
            <IconButton
              color='primary'
              onClick={() => handleToggleLike(currentVideo)}
              className='controls-item controls-item-like'
            >
              {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            </IconButton>

            <IconButton
              color='primary'
              className='controls-item controls-item-previous'
            >
              <SkipPreviousIcon style={{ fontSize: '2rem' }} />
            </IconButton>

            {/* if audio is loading then show loading icon otherwise show play button  */}

            <Grid container justify='center' style={{ width: '6rem' }}>
              {isLoading ? (
                <CircularProgress
                  className='circular-loading'
                  color='primary'
                />
              ) : (
                <IconButton
                  color='primary'
                  className='controls-item controls-item-play-pause'
                  onClick={handlePlayPause}
                >
                  {isPlaying && !isLoading ? (
                    <PauseCircleFilledIcon style={{ fontSize: '4rem' }} />
                  ) : (
                    <PlayCircleFilledIcon style={{ fontSize: '4rem' }} />
                  )}
                </IconButton>
              )}
            </Grid>

            <IconButton
              color='primary'
              onClick={handlePlayNextVideo}
              className='controls-item controls-item-next'
            >
              <SkipNextIcon style={{ fontSize: '2rem' }} />
            </IconButton>

            <IconButton
              color='primary'
              className='controls-item controls-item-repeat'
              onClick={handleToggleLoop}
            >
              {loop ? <RepeatOneIcon /> : <RepeatIcon />}
            </IconButton>
          </div>

          <Grid
            container
            justify='center'
            alignItems='center'
            spacing={2}
            className='player-volume'
          >
            <Grid item xs={1}>
              <VolumeUp />
            </Grid>
            <Grid item xs={10}>
              <Slider
                value={volume}
                min={0}
                max={1}
                step={0.00001}
                onChange={handleVolumeChange}
              />
            </Grid>
          </Grid>
        </div>

        <div className='up-next-section'>
          <List>
            <ListSubheader style={{ background: 'white' }}>
              <Grid container justify='space-between' alignItems='center'>
                <Grid item>
                  <Typography>UP NEXT</Typography>
                </Grid>
                <Grid item>
                  <FormGroup>
                    <FormControlLabel
                      label='AUTO PLAY'
                      labelPlacement='start'
                      control={
                        <Switch
                          color='primary'
                          checked={autoPlayNext}
                          onChange={handleAutoPlayNext}
                        />
                      }
                    />
                  </FormGroup>
                </Grid>
              </Grid>
            </ListSubheader>
            <UpNextVideos />
          </List>
        </div>
      </div>

      {/* end bottom container */}

      <ReactPlayer
        ref={audio}
        width={1}
        height={1}
        style={{ visibility: 'hidden' }}
        autoPlay
        playing={isPlaying}
        onReady={onAudioReady}
        url={currentVideo.audioLink}
        loop={loop}
        volume={volume}
        onPlay={handlePlay}
        onPause={handlePause}
        onBuffer={handleOnBuffer}
        onBufferEnd={handleOnBufferEnd}
        onSeek={(e) => console.log('onSeek', e)}
        onEnded={handleEnded}
        onError={handleOnError}
        onProgress={handleProgress}
        onDuration={handleDuration}
      />
    </motion.div>
  );
};

const mapStateToProps = (state) => ({
  // video: state.video,
});

export default connect(mapStateToProps, {
  clearCurrentVideo,
  setCurrentVideo,
  setUpNextVideos,
  removeFavoriteVideo,
  addFavoriteVideo,
})(MainPlayer);
