import React, { useReducer } from 'react';
import './App.css';

import Header from './pages/Header/Header';
import BodyRouting from './Routing/BodyRouting';

export const popupTriggeredContext = React.createContext();

function App() {
  const initialState = {
    'addExpense': false,
    'uploadExpense': false,
    'updateExpense': false,
  };
  const render = (popupTriggered, action) => {
    switch (action) {
      case 'addExpense':
        return { ...popupTriggered, 'addExpense': !popupTriggered['addExpense'] };
      case 'uploadExpense':
        return { ...popupTriggered, 'uploadExpense': !popupTriggered['uploadExpense'] };
      case 'updateExpense':
        return { ...popupTriggered, 'updateExpense': !popupTriggered['updateExpense'] };
      default:
        return popupTriggered;
    }
  }
  const [popupTriggered, dispatch] = useReducer(render, initialState)
  return (
    <div className="App">
      <popupTriggeredContext.Provider value={{ popupTriggered: popupTriggered, popupTriggeredDispatch: dispatch }}>
        <Header />
        <BodyRouting />
      </popupTriggeredContext.Provider>
    </div>
  );
}

export default App;