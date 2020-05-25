import axios from 'axios';
import jsonpAdapter from 'axios-jsonp';

export default function (query) {
  return axios.get('https://suggestqueries.google.com/complete/search?', {
    adapter: jsonpAdapter,
    params: {
      hl: 'en', // Language
      ds: 'yt', // Restrict lookup to youtube
      client: 'youtube',
      q: query, // force youtube style response, i.e. jsonp
    },
  });
}
