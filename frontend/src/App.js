import './App.css';
import Header from './pages/Dashboard/Header/Header';
import Body from './pages/Dashboard/Body/Body';
import { useState } from 'react';

const dummyData = {
  data: [
    {
      id: Math.random().toString(),
      activity: 'lunch',
      amount: 'Rs 200',
      date: new Date(12, 1, 2023)
    }
  ],
  previousPage: 1,
}

function App() {
  const [expensesData, setExpenseData] = useState(dummyData);
  return (
    <div className="App">
      <Header expensesData={expensesData} setExpenseData={setExpenseData} />
      <Body expensesData={expensesData} setExpenseData={setExpenseData}/>
    </div>
  );
}

export default App;