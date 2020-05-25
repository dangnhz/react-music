import axios from 'axios';
import selectRandomKey from '../utils/selectRandomKey';

export function getTrendingMusic() {
  return axios.get('https://www.googleapis.com/youtube/v3/videos', {
    params: {
      part: 'snippet',
      chart: 'mostPopular',
      videoCategoryId: '10',
      type: 'video',
      maxResults: 15,
      key: selectRandomKey(),
      regionCode: localStorage.getItem('country_code') || 'VN',
    },
  });
}
