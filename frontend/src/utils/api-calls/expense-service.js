import { ENDPOINTS } from '../../utils/constants';
import { toast } from 'react-toastify';
import axios from 'axios';

const getExpensesByDate = ({ apiParameters, setResponse }) => {
  axios({
    method: 'GET',
    url: ENDPOINTS['get-expenses-by-date'],
    headers: {
      'Content-Type': 'application/json'
    },
    params: apiParameters,
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

const getExpensesByMonth = ({ apiParameters, setResponse }) => {
  axios({
    method: 'GET',
    url: ENDPOINTS['get-expenses-by-month'],
    headers: {
      'Content-Type': 'application/json'
    },
    params: apiParameters,
  }).then((response) => {
    setResponse({api_response: response.data.item});
  }).catch((error) => {
    if (error && error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    }
    toast.error('API error !');
  });
};

const getExpensesByMonthAndCategory = ({ apiParameters, setResponse }) => {
  axios({
    method: 'GET',
    url: ENDPOINTS['get-user-expense-by-month-and-category'],
    headers: {
      'Content-Type': 'application/json'
    },
    params: apiParameters,
  }).then((response) => {
    console.log({api: response.data.item});
    setResponse({api_response: response.data.item});
  }).catch((error) => {
    if (error && error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    }
    console.log('Sure ?')
    toast.error('API error !');
  });
};

export const EXPENSE_SERVICE_API_CALLS = Object.freeze({
  getExpensesByDate,
  getExpensesByMonth,
  getExpensesByMonthAndCategory
});