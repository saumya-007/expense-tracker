import axios from "axios";

export const callAxios = ({method, url, requestBody = null}) => {

  const response = {
    data: null,
    error: null,
  }

  axios({
    method,
    url,
    headers: {
      'Content-Type': 'application/json'
    },
    body: requestBody,
  }).then((response) => {
    console.log(response.data.item);
    switch (method) {
      case 'GET' : {
        if (response.status === 200) {
          response.data = response.data.item;
          return response;
        }
        response.error = 'Something went wrong ! (API Error GET request failed)';
        return response;
      }
      case 'PUT' : {
        if (response.status === 204) {
          response.data = response.data.item;
          return response;
        }
        response.error = 'Something went wrong ! (API Error PUT request failed)'
        return response;
      }
      case 'DELETE' : {
        if (response.status === 200) {
          response.data = response.data.item;
          return response;
        }
        response.error = 'Something went wrong ! (API Error DELETE request failed)'
        return response;
      }
      case 'POST' : {
        if (response.status === 201) {
          response.data = response.data.item;
          return response;
        }
        response.error = 'Something went wrong ! (API Error POST request failed)';
        return response;
      }
      default : {
        response.error = 'Invalid Method Found';
        return response;
      }
    }
  }).catch((error) => {
    console.log(error.response.data.message);
    if (error && error.response && error.response.data && error.response.data.message) {
      response.error = error.response.data.message;
      return response;
    }
    response.error = 'Something went wrong ! (API Error)';
    return response;
  });

  return response;
}