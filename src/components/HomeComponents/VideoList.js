import React, { useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Typography } from '@material-ui/core/';

import VideoCard from './VideoCard';
import './VideoList.scss';

const VideoList = ({ videos, categoryTitle }) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [itemWidth, setItemWidth] = useState(0);

  const setListItemWidth = () => {
    if (window.innerWidth < 480) {
      setItemWidth(270);
    } else if (window.innerWidth > 480 && window.innerWidth < 1024) {
      setItemWidth(300);
    } else setItemWidth(320);
  };

  useEffect(() => {
    setListItemWidth();
    window.addEventListener('resize', () => {
      setWidth(window.innerWidth);
      setListItemWidth();
    });
  }, []);

  const Card = ({ style, index }) => (
    <div style={style}>
      <VideoCard video={videos[index]} />
    </div>
  );

  return (
    <div>
      <Typography variant='h6' className='category-title'>
        {categoryTitle}
      </Typography>

      <List
        // className={classes.VideoList}
        className='video-list'
        height={250}
        itemCount={videos.length}
        itemSize={itemWidth}
        layout='horizontal'
        width={width}
      >
        {Card}
      </List>
    </div>
  );
};

export default VideoList;
