import { useEffect, useState} from 'react';
import axios from "axios";

function useAxios({ url, method, requestBody = null }) {

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
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
            setData(response.data.item);
          }
          setError('Something went wrong ! (API Error GET request failed)')
          break;
        }
        case 'PUT' : {
          if (response.status === 204) {
            setData(response.data.item);
          }
          setError('Something went wrong ! (API Error PUT request failed)')
          break;
        }
        case 'DELETE' : {
          if (response.status === 200) {
            setData(response.data.item);
          }
          setError('Something went wrong ! (API Error DELETE request failed)')
          break;
        }
        case 'POST' : {
          if (response.status === 201) {
            setData(response.data.item);
          }
          setError('Something went wrong ! (API Error POST request failed)')
          break;
        }
        default : setError('Invalid Method Found') 
      }
    }).catch((error) => {
      console.log(error.response.data.message);
      if (error && error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      }
      setError('Something went wrong ! (API Error)');
    });
  }, [url, method, requestBody])

  return {data, error}
}

export default useAxios;