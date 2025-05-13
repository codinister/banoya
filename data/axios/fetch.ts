import axios from 'axios';

const client = axios.create({
  baseURL: '/api',
});

const fetch =  ({ ...options }) => {
  return  client(options)
    .then((data) => data)
    .catch((err) => err);
};

export default fetch;
