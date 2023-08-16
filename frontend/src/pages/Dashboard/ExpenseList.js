import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { ENDPOINTS } from '../../utils/constants';
import { popupContext } from '../Dashboard/Dashboard';
import { BsCaretRightFill, BsCaretLeftFill, BsFillTrashFill } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { GiClick } from 'react-icons/gi';
import { toast } from 'react-toastify';
import Dropdown from '../../components/Dropdown';
import DateTimePicker from 'react-datetime-picker';


export const userDetailsContext = React.createContext();

const ExpenseList = ({ filterStates, setFilterStates }) => {

  const headers = ['Category', 'Activity', 'Amount', 'Spent Date', 'Options'];
  const popupStates = useContext(popupContext);
  const [expensesData, setExpenseData] = useState({ data: [], count: 0 });
  const [dropDownItems, setDropDownItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const makeDropDownList = (items) => {
    const arrOfNumbers = [];
    let start = 0;
    const makeDropDownList = (items) => {
      start += 10;
      if (start < items) {
        arrOfNumbers.push(start);
        makeDropDownList(items);
      }
      else {
        arrOfNumbers.push(items);
      }
    }
    makeDropDownList(items);
    return arrOfNumbers;
  }

  const getExpenses = ({ apiParameters }) => {
    axios({
      method: 'GET',
      url: ENDPOINTS['get-expenses'],
      headers: {
        'Content-Type': 'application/json'
      },
      params: apiParameters,
    }).then((response) => {
      setExpenseData({
        data: response.data.item,
        count: response.data.item.length,
      });
    }).catch((error) => {
      if (error && error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
      toast.error('API error !');
    });
  }

  const addHandler = (id) => {
    popupStates.popupDispatch({ action: 'addExpense' });
  }

  const editHandler = (id) => {
    popupStates.popupDispatch({ action: 'updateExpense', updateExpenseId: id });
  };

  const deleteHandler = (id) => {
    axios({
      method: 'DELETE',
      url: ENDPOINTS['delete-expenses'] + `/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log(response.data.item);
      if (response.status === 200) {
        toast.success('Expense deleted successfuly !');
        getExpenses();
      } else {
        toast.error('Something went wrong!');
      }
    }).catch((error) => {
      console.log(error.response.data.message);
      if (error && error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      }
      toast.error('Something went wrong ! (API Error)');
    });
  };

  const pageChangeHandler = (isForward) => {
    if (isForward) {
      setCurrentPage(previousPage => previousPage + 1)
    } else {
      setCurrentPage(previousPage => previousPage - 1)
    }
  }

  const handeLimitChange = (limit) => {
    setFilterStates((prev) => {
      return { ...prev, limit }
    })
  }

  useEffect(() => {
    getExpenses({ apiParameters: filterStates });
  }, [filterStates]);

  useEffect(() => {
    setDropDownItems(makeDropDownList(expensesData.count));
  }, [expensesData])
  return (
    <>
      <div className='page-selector'>
        <Dropdown dropDownItems={dropDownItems} handleDropDownItemClick={handeLimitChange} /><p>entries per page</p>
      </div>
      <div className='table-container'>
        <table>
          <thead>
            <tr key='add-expense-button'>
              <td className="expense-add-btn" colSpan={5} onClick={() => addHandler()}>
                ADD EXPENSE <GiClick />
              </td>
            </tr>
            <tr key='headers'>
              {headers.map(header => <th key={header}>{header}</th>)}
            </tr>
          </thead>
          <tbody>
            {expensesData?.data.map(row => {
              return (
                <tr key={row.id}>
                  <td>{row.category_name}</td>
                  <td>{row.activity}</td>
                  <td>{row.amount}</td>
                  <td>
                    <span className={row.is_above_limit ? 'red' : 'green'}>
                      {row.spent_on}
                    </span>
                  </td>
                  <td>
                    <div className='expense-action'>
                      <button onClick={() => editHandler(row.id)}><FiEdit2 /></button>
                      <button onClick={() => deleteHandler(row.id)}><BsFillTrashFill /></button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div >
      <div className='page-number-selector'>
        <button disabled={currentPage > 1 ? false : true} onClick={() => pageChangeHandler(false)}>
          <BsCaretLeftFill />
        </button>
        <p>{currentPage}</p>
        <button disabled={currentPage < (dropDownItems.length) ? false : true} onClick={() => pageChangeHandler(true)}>
          <BsCaretRightFill />
        </button>
      </div>
    </>
  );
};

export default ExpenseList;