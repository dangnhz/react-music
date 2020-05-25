import React, { useState, useEffect } from 'react';
import AppBar from '../components/AppBar';
import VideoList from '../components/HomeComponents/VideoList';
import Welcome from '../components/HomeComponents/Welcome';
import './Home.scss';
import { connect } from 'react-redux';
import { getTrendingMusic } from '../api/getPlayList';

const Home = ({ video }) => {
  let { recentPlayedVideos, recommendedVideos } = video;
  // display only 15 videos in the list
  if (recentPlayedVideos.length >= 15) {
    recentPlayedVideos = recentPlayedVideos.slice(0, 15);
  }

  if (recommendedVideos.length >= 15) {
    recommendedVideos = recommendedVideos.slice(0, 15);
  }

  const [trendingVideos, setTrendingVideos] = useState([]);

  // useEffect(() => {
  //   //  fetch trending music
  //   getTrendingMusic()
  //     .then((res) => {
  //       let trendingVideos = res.data.items.map((item) => ({
  //         id: item.id.videoId,
  //         title: item.snippet.title,
  //         channelTitle: item.snippet.channelTitle,
  //         audioLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
  //         maxThumbnail: item.snippet.thumbnails.high.url,
  //         sdThumbnail: item.snippet.thumbnails.medium.url,
  //       }));

  //       setTrendingVideos(trendingVideos);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

  return (
    <div className='home-container'>
      <AppBar title='Home' />

      {!recentPlayedVideos.length > 0 && !recommendedVideos.length > 0 && (
        <Welcome />
      )}

      {recentPlayedVideos.length > 0 && (
        <VideoList
          categoryTitle='recently played'
          videos={recentPlayedVideos}
        />
      )}

      {recommendedVideos.length > 0 && (
        <VideoList categoryTitle='Recommended' videos={recommendedVideos} />
      )}

      {/*Trending playlist */}
      {trendingVideos.length > 0 ? (
        <VideoList categoryTitle='Trending Videos' videos={trendingVideos} />
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  video: state.video,
});
export default connect(mapStateToProps, {})(Home);
