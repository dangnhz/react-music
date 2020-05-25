import axios from 'axios';
import selectRandomKey from '../utils/selectRandomKey';

export default function searchUpNextVideo(id) {
  return axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      part: 'snippet',
      videoCategoryId: '10',
      type: 'video',
      maxResults: 10,
      key: selectRandomKey(),
      relatedToVideoId: id,
    },
  });
}
