import React, { useState } from 'react';
import './App.css';

import Header from './pages/Header/Header';
import BodyRouting from './Routing/BodyRouting';

export const popupTriggeredContext = React.createContext();

function App() {
  const [isAddExpensePopupTriggered, setIsAddExpensePopupTriggered] = useState(false);
  const [isUploadExpensePopupTriggered, setIsUploadExpensePopupTriggered] = useState(false);
  // const [isUpdateExpensePopupTriggered, setIsUpdateExpensePopupTriggered] = useState(false);
  return (
    <div className="App">
      <Header
        isAddExpensePopupTriggered={isAddExpensePopupTriggered}
        setIsAddExpensePopupTriggered={setIsAddExpensePopupTriggered}
        isUploadExpensePopupTriggered={isUploadExpensePopupTriggered}
        setIsUploadExpensePopupTriggered={setIsUploadExpensePopupTriggered}
      />
      <BodyRouting
        isAddExpensePopupTriggered={isAddExpensePopupTriggered}
        setIsAddExpensePopupTriggered={setIsAddExpensePopupTriggered}
        isUploadExpensePopupTriggered={isUploadExpensePopupTriggered}
        setIsUploadExpensePopupTriggered={setIsUploadExpensePopupTriggered}
      />
    </div>
  );
}

export default App;