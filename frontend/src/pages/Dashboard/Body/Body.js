import constants from '../../../utils/constants';
import ExpenseList from './ExpenseList';

import PageTitle from '../../../components/PageTitle';
import Popup from '../../../components/Popup';

import AddExpenseForm from '../Header/AddExpenseForm';

const Body = (props) => {

  const title = constants.EXPENSE_LIST_TITLE;

  const clickHandler = () => {
    console.log('called')
    props.setIsAddExpensePopupTriggered(false)
  };

  return (
    <>
      <Popup triggered={props.isAddPopupTriggered}>
        <AddExpenseForm
          setIsAddExpensePopupTriggered={props.setIsAddExpensePopupTriggered}
          isAddPopupTriggered={props.isAddPopupTriggered}
        />
      </Popup>
      <main className="h-full overflow-y-auto" onClick={clickHandler}>
        <div className="container px-6 mx-auto grid">
          <PageTitle title={title} />
          <ExpenseList />
        </div>
      </main>
    </>
  );
};

export default Body;
