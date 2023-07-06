import React, { useContext, useEffect, useState, useReducer } from 'react';
import axios from "axios";
import config from '../../config';

import noDataImage from '../../images/no_data_found.jpg'
import constants from '../../utils/constants';

import Table from '../../components/Table';
import TableHeader from '../../components/TableHeader';
import TableBody from '../../components/TableBody';
import PaginationFooter from '../../components/PaginationFooter';
import TableRow from '../../components/TableRow';
import TableData from '../../components/TableData';
import Icon from '../../components/Icon';
import Button from '../../components/Button';
import Popup from '../../components/Popup';
import UpdateExpenseForm from '../Header/UpdateExpenseForm';

import { popupTriggeredContext } from '../../App';

export const userDetailsContext = React.createContext();

const ExpenseList = () => {

  console.log('Expense List Rendered');

  const headers = ['Category', 'Activity', 'Amount', 'Spent Date', 'Options'];
  const [expensesData, setExpenseData] = useState([]);
  const [isResponseSuccess, setResponseStatus] = useState(false);
  const [updateExpenseData, setUpdateExpenseData] = useState();
  const popupTriggeredCnxt = useContext(popupTriggeredContext);

  const editHandler = (id) => {
    setUpdateExpenseData(expensesData.find((expense) => expense.id === id));
    popupTriggeredCnxt.popupTriggeredDispatch('updateExpense')
  };

  const deleteHandler = (id, index) => {
    axios({
      method: 'DELETE',
      url: `${config.backendPoints['EXPENSE-SERVICE']}/v1/delete-user-expense/${id}`,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log(response.data.item);
      // expensesData.splice(index, 1)
      // setExpenseData(expensesData);
      setResponseStatus(true);
    }).catch((error) => {
      console.log(error.response.data.message);
      if (error && error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
      }
      return 'API error'
    });
  };

  useEffect(() => {
    axios({
      method: 'GET',
      url: `${config.backendPoints['EXPENSE-SERVICE']}/v1/get-user-expense`,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log(response.data.item)
      setExpenseData(response.data.item);
      setResponseStatus(false);
    }).catch((error) => {
      if (error && error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
      }
      return 'API error'
    });
  }, [popupTriggeredCnxt.popupTriggered, isResponseSuccess]);

  const editIcon = <Icon iconClass="fa fa-edit" fontSize="17px" fontColor="green" />;
  const deleteIcon = <Icon iconClass="fa fa-trash-o" fontSize="17px" fontColor="red" />;

  const rows = expensesData.map((expense, index) => {
    const id = expense.id;
    const category = expense.category_name;
    const activity = expense.activity;
    const amount = expense.amount;
    const isAboveLimit = expense.is_above_limit
    const spentOn = new Date(expense.spent_on);
    const dayPostFix = constants.DAY_MAPPING[spentOn.getUTCDate()]
      ? constants.DAY_MAPPING[spentOn.getUTCDate()]
      : constants.DAY_MAPPING['ELSE'];
    const date = [
      spentOn.getUTCDate() + dayPostFix,
      constants.MONTH_MAPPING[spentOn.getUTCMonth()],
      spentOn.getUTCFullYear(),
    ].join(' ');

    return (
      <TableRow key={id}>
        <TableData>
          <p className="font-semibold">{category}</p>
        </TableData>
        <TableData>
          <p className="font-semibold">{activity}</p>
        </TableData>
        <TableData>
          <span className={
            `px-2 py-1
            font-semibold
            leading-tight
            text-${isAboveLimit ? 'green' : 'red'}-700
            bg-${isAboveLimit ? 'green' : 'red'}-100
            rounded-full
            dark:bg-${isAboveLimit ? 'green' : 'red'}-700
            dark:text-${isAboveLimit ? 'green' : 'red'}-100`
          }>
            {amount}
          </span>
        </TableData>
        <TableData><i>{date}</i></TableData>
        <TableData>
          <Button
            icon={editIcon}
            buttonColor="white"
            buttonTextColor="black"
            px="5"
            onClick={(index) => editHandler(id, index)}
          />
          <Button
            icon={deleteIcon}
            buttonColor="white"
            buttonTextColor="black"
            px="5"
            onClick={(index) => deleteHandler(id, index)}
          />
        </TableData>
      </TableRow>
    );
  });

  return (
    <>
      {
        rows?.length ?
          <>
            <Popup triggered={popupTriggeredCnxt.popupTriggered['updateExpense']}>
              <UpdateExpenseForm updateExpenseData={updateExpenseData} />
            </Popup>
            <Table>
              <TableHeader headers={headers} />
              <TableBody>{rows}</TableBody>
            </Table>
            <PaginationFooter />
          </>
          :
          <div className="center-div">
            <img
              src={noDataImage}
              alt="No Data Found !"
              aria-hidden="true"
            />
          </div>
      }
    </>
  );
};

export default ExpenseList;
