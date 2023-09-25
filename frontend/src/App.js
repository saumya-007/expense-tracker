import React from 'react';
import './App.css';

import Header from './pages/Header/Header';
import BodyRouting from './Routing/BodyRouting';
import Temp from './Temp';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      {/* <Temp /> */}
      <ToastContainer
        position='top-center'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <BodyRouting />
    </>
  );
}

export default App;