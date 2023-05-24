import { useState } from 'react';
import './App.css';

import Header from './pages/Dashboard/Header/Header';
import Body from './pages/Dashboard/Body/Body';

function App() {
  const [isAddPopupTriggered, setIsAddExpensePopupTriggered] = useState(false);
  const [isUploadPopupTriggered, setIsUploadExpensePopupTriggered] = useState(false);

  return (
    <div className="App">
      <Header
        isAddPopupTriggered={isAddPopupTriggered}
        setIsAddExpensePopupTriggered={setIsAddExpensePopupTriggered}
        isUploadPopupTriggered={isUploadPopupTriggered}
        setIsUploadExpensePopupTriggered={setIsUploadExpensePopupTriggered}
      />
      <Body
        isAddPopupTriggered={isAddPopupTriggered}
        setIsAddExpensePopupTriggered={setIsAddExpensePopupTriggered}
        isUploadPopupTriggered={isUploadPopupTriggered}
        setIsUploadExpensePopupTriggered={setIsUploadExpensePopupTriggered}
      />
    </div>
  );
}

export default App;