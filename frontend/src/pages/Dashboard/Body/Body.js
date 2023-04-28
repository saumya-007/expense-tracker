import constants from '../../../utils/constants';
import ExpenseList from './ExpenseList';
import Icon from '../../../components/Icon';
import PageTitle from '../../../components/PageTitle';

// temp
import Card from '../../../components/Card';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { useState } from 'react';

const Body = (props) => {

  const title = constants.EXPENSE_LIST_TITLE;
  const noExpenseAddedMsg = constants.DEFAULT_MSG_FOR_NO_EXPENSE_RECORD;
  const expensesData = props.expensesData;

  // temp it will all go in change handler
  // initally it should be a state of value by user
  const [newExpense, setNewExpense] = useState({
    activity: '',
    amount: '',
    date: ''
  });
  const newActivityHandler = (event) => {
    // console.log('newActivity', event.target.value);
    setNewExpense((prevState) => {
      return {
        ...prevState,
        activity: event.target.value,
      }
    })
  };

  const newAmountHandler = (event) => {
    // console.log('newAmount', event.target.value);
    setNewExpense((prevState) => {
      return {
        ...prevState,
        amount: event.target.value,
      }
    })
  };

  const newDateHandler = (event) => {
    // console.log('newDate', event.target.value);
    setNewExpense((prevState) => {
      return {
        ...prevState,
        date: new Date(2023, 1, 12),
      }
    })
  };

  const addNewExpense = (event) => {
    // validate that all object states are not null anymore
    newExpense['id'] = Math.random().toString();
    props.setExpenseData((prevState) => {
      prevState.data.push(newExpense);
      return {...prevState};
    })
  }

  if (props.expensesData.data.length > 0)
    return (
      <main className="h-full overflow-y-auto">
        <div className="container px-6 mx-auto grid">
          <PageTitle title={title} />
          <ExpenseList expensesData={expensesData} />
        </div>
        <Card>
          <Input
            lable="Activity"
            placeholder="Enter Activity"
            handler={newActivityHandler}
            inputType="text"
          />
          <Input
            lable="Amount"
            placeholder="Enter Amount"
            handler={newAmountHandler}
            inputType="number"
          />
          <Input
            lable="Date"
            placeholder="Enter Date"
            handler={newDateHandler}
            inputType="date"
          />
          <Button
            buttonValue="Add"
            buttonColor="purple"
            buttonTextColor="white"
            handler={addNewExpense}
          />
        </Card>
      </main>
    );
  else
    return (
      <main className="my-6 mx-auto">
        <p className="text-xl my-6">{noExpenseAddedMsg}</p>
        <Icon
          iconClass="fa fa-smile-o"
          fontSize="220px"
          fontColor="light-gray"
        />
      </main>
    );
};

export default Body;
