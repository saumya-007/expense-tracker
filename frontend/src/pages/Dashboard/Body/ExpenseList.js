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
  // CONSTANTS

  const expensesData = props.expensesData.data;
  const expensesDataOnjKeys = Object.keys(expensesData[0]);
  const headers = expensesDataOnjKeys.slice(1, expensesDataOnjKeys.length);
  headers.push('options');

  // REQUIRED COMPONENTS

  const editIcon = (
    <Icon iconClass="fa fa-edit" fontSize="17px" fontColor="green" />
  );
  const deleteIcon = (
    <Icon iconClass="fa fa-trash-o" fontSize="17px" fontColor="red" />
  );

  // STATES

  // HANDLERS

  const editHandler = (event) => {
    console.log('Edit called');
    // edit api call
  };

  const deleteHandler = (event) => {
    console.log('Delete called');
    // delete api call
  };

  // TABLE ROWS

  const rows = expensesData.map((expense) => {
    const id = expense.id;
    const activity = expense.activity;
    const amount = expense.amount;
    const dayPostFix = constants.DAY_MAPPING[expense.date.getDay()]
      ? constants.DAY_MAPPING[expense.date.getDay()]
      : constants.DAY_MAPPING['ELSE'];
    const date = [
      expense.date.getDay() + dayPostFix,
      constants.MONTH_MAPPING[expense.date.getMonth()],
      expense.date.getFullYear(),
    ].join(' ');

    return (
      <TableRow key={id}>
        <TableData>
          <p className="font-semibold">{activity}</p>
        </TableData>
        <TableData>
          <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100">
            {amount}
          </span>
        </TableData>
        <TableData>{date}</TableData>
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
      <Table>
        <TableHeader headers={headers} />
        <TableBody>{rows}</TableBody>
      </Table>
      <PaginationFooter />
    </div>
  );
};

export default ExpenseList;
