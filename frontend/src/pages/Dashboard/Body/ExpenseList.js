import { useEffect, useState } from 'react';
import axios from "axios";
import config from '../../../config';

import Table from '../../../components/Table';
import TableHeader from '../../../components/TableHeader';
import TableBody from '../../../components/TableBody';
import PaginationFooter from '../../../components/PaginationFooter';
import TableRow from '../../../components/TableRow';
import TableData from '../../../components/TableData';
import Icon from '../../../components/Icon';
import Button from '../../../components/Button';
import constants from '../../../utils/constants';

const ExpenseList = (props) => {
  const noExpenseAddedMsg = constants.DEFAULT_MSG_FOR_NO_EXPENSE_RECORD;

  const [expensesData, setExpenseData] = useState();
  const headers = ['Category', 'Activity', 'Amount', 'Spent Date', 'Options'];

  const editIcon = (
    <Icon iconClass="fa fa-edit" fontSize="17px" fontColor="green" />
  );
  const deleteIcon = (
    <Icon iconClass="fa fa-trash-o" fontSize="17px" fontColor="red" />
  );

  const editHandler = (event) => {
    console.log('Edit called');
    // edit api call
  };

  const deleteHandler = (event) => {
    console.log('Delete called');
    // delete api call
  };

  useEffect(() => {
    console.log('expense list')
    axios({
      method: 'GET',
      url: `${config.backendPoints['EXPENSE-SERVICE']}/v1/get-user-expense`,
      headers: {
        'Content-Type': 'application/json'
      },
    }).then((response) => {
      console.log(response.data.item)
      setExpenseData(response.data.item);
    }).catch((error) => {
      console.log(error)
      if (error && error.response && error.response.data && error.response.data.message) {
        return error.response.data.message;
      }
      return 'API error'
    });
  }, [props]);

  const rows = expensesData?.map((expense) => {
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
            handler={editHandler}
          />
          <Button
            icon={deleteIcon}
            buttonColor="white"
            buttonTextColor="black"
            px="5"
            handler={deleteHandler}
          />
        </TableData>
      </TableRow>
    );
  });

  return (
    <div className="w-full overflow-hidden rounded-lg shadow-xs">
      {rows?.length ?
        <>
          <Table>
            <TableHeader headers={headers} />
            <TableBody>{rows}</TableBody>
          </Table><PaginationFooter />
        </>
        :
        <>
          {noExpenseAddedMsg}
        </>
      }
    </div>
  );
};

export default ExpenseList;
