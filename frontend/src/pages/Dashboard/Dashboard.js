import React, { useReducer, useState } from 'react'
import SearchBar from './SearchBar'
import DateAndTimePicker from './DateAndTimePicker'
import ExpenseList from './ExpenseList'
import Popup from '../../components/Popup'
import AddExpenseForm from './AddExpenseForm'
import UpdateExpenseForm from './UpdateExpenseForm'

export const popupContext = React.createContext();

function Dashboard() {
  const initialPopupStates = {
    states: {
      'addExpense': false,
      'uploadExpense': false,
      'updateExpense': false,
    },
    updateExpenseId: null,
  };

  const changePopUpState = (currentPopupStates, metaData) => {
    console.log(metaData);
    switch (metaData?.action) {
      case 'addExpense':
        return { states: { ...currentPopupStates.states, 'addExpense': !currentPopupStates.states['addExpense'] }, updateExpenseId: currentPopupStates.updateExpenseId};
      case 'uploadExpense':
        return { states: { ...currentPopupStates.states, 'uploadExpense': !currentPopupStates.states['uploadExpense'] }, updateExpenseId: currentPopupStates.updateExpenseId};
      case 'updateExpense':
        return { states: { ...currentPopupStates.states, 'updateExpense': !currentPopupStates.states['updateExpense'] }, updateExpenseId: metaData.updateExpenseId};
      default:
        return initialPopupStates;
    }
  }
  const [popupStates, dispatch] = useReducer(changePopUpState, initialPopupStates);

  const closePopup = () => dispatch();

  const [filterStates, setFilterStates] = useState({
    skip: 0,
    limit: 10,
    searchTerm: null,
    startDate: null,
    endDate: null,
  });

  const updateSearchTerm = (searchTerm) => {
    setFilterStates((previousFilters) => {
      return {...previousFilters, searchTerm}
    });
  }

  const updateDates = (startDate, endDate) => {
    setFilterStates((previousFilters) => {
      return {...previousFilters, startDate, endDate}
    });
  }

  console.log(filterStates);

  return (
    <div>
      {/* {console.log(popupStates)} */}
      <Popup triggered={Object.values(popupStates.states)?.filter(trueState => trueState)?.length} closePopup={closePopup}>
        {
          popupStates.states['addExpense'] ? <AddExpenseForm /> :
            popupStates.states['updateExpense'] ? <UpdateExpenseForm expenseId = {popupStates.updateExpenseId}/> :
              popupStates.states['uploadExpense'] ? console.log('UPLOAD EXPENSE FORM') : null
        }
      </Popup>
      <popupContext.Provider value={{ popupStates: popupStates, popupDispatch: dispatch }}>
        <div className='date-picker-div'>
          <div className='search-box'>
            <SearchBar updateSearchTerm={updateSearchTerm}/>
          </div>
          <div className='date-box'>
            <DateAndTimePicker updateDates={updateDates}/>
          </div>
        </div>
        <div className='display'>
          <div className='display-item'>
            <ExpenseList filterStates={filterStates} setFilterStates={setFilterStates} />
          </div>
        </div>
      </popupContext.Provider>
    </div>
  )
}

export default Dashboard