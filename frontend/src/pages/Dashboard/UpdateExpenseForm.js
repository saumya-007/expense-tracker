import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from "axios";
import { ENDPOINTS } from '../../utils/constants';

function UpdateExpenseForm(props) {

  const [expenseData, setExpenseData] = useState({});

  const updateUserExpense = ({ expenseId }) => {
    axios({
      method: 'PUT',
      url: ENDPOINTS['update-expense'] + `/${expenseId}`,
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      console.log(response.data.item);
      if (response.status === 204) {
        toast.success('Expense updated successfuly !');
      }
      toast.error('Something went wrong !');
    }).catch((error) => {
      console.log(error.response.data.message);
      if (error && error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
      toast.error('Something went wrong ! (API Error)');
    });
  }

  useEffect(() => {
    axios({
      method: 'GET',
      url: ENDPOINTS['get-expense-by-id'] + `/${props.expenseId}`,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log(response.data.item);
      if (response.status === 200) {
        setExpenseData(response.data.item);
        return;
      }
      toast.error('Something went wrong !');
    }).catch((error) => {
      console.log(error.response.data.message);
      if (error && error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
      toast.error('Something went wrong ! (API Error)');
    });
  }, [props.expenseId])



  return (
    <div className='add-edit-form'>
      <div>
        <label>Activity</label>
        <input type="text" name="Activity" defaultValue={expenseData.activity ? expenseData.activity : ''}/>
      </div>
      <div>
        <label>Category Name</label>
        <input type="text" name="Category Name" defaultValue={expenseData.category_name ? expenseData.category_name : ''}/>
      </div>
      <div>
        <label>Amount</label>
        <input type="text" name="Amount" defaultValue={expenseData.amount ? expenseData.amount : ''}/>
      </div>
      <div>
        <label>Spent On</label>
        <input type="text" name="Spent On" defaultValue={expenseData.spent_on ? expenseData.spent_on : ''}/>
      </div>
      <div>
        <button>Submit</button>
      </div>
    </div>
  )
}

export default UpdateExpenseForm