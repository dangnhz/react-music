import axios from 'axios';

const url = 'https://server.ylight.xyz/song';
const local = 'http://localhost:4000/song';

export default function getVideoLink(videoId) {
  return axios.get(local, {
    params: {
      id: videoId,
    },
  });
}
