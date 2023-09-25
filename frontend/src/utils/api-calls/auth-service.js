import { ENDPOINTS } from '../../utils/constants';
import { toast } from 'react-toastify';
import axios from 'axios';

const getSingUpLink = ({ setResponse }) => {
  axios({
    method: 'GET',
    url: ENDPOINTS['get-signup-link'],
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((response) => {
    console.log(response.data.item);
    setResponse({api_response: response.data.item});
  }).catch((error) => {
    if (error && error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    }
    toast.error('API error !');
  });
};

const authenticateGoogleUser = ({ url, setResponse }) => {
  axios({
    method: 'GET',
    url,
    headers: {
      'Content-Type': 'application/json'
    },
  }).then((response) => {
    console.log(response.data.item);
    setResponse({api_response: response.data.item});
  }).catch((error) => {
    if (error && error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    }
    toast.error('Google authentication failure !');
  });
};


export const AUTH_SERVICE_API_CALLS = Object.freeze({
  getSingUpLink,
  authenticateGoogleUser,
});