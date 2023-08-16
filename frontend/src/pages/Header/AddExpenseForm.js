// import React, { useRef, useContext } from 'react'
// import axios from 'axios';

// import config from '../../config';

// import Card from '../../components/Card';
// import Input from '../../components/Input';
// import Button from '../../components/Button';

// import { popupTriggeredContext } from '../../App';

// const AddExpenseForm = () => {

//     console.log('Add Expense Form Rendered');

//     const popupTriggeredCnxt = useContext(popupTriggeredContext);

//     const activityRef = useRef(null)
//     const amountRef = useRef(null)
//     const dateRef = useRef(null)
//     const categoryRef = useRef(null)

//     const addNewExpense = (event) => {
//         event.preventDefault();
//         const activity = activityRef.current.value;
//         const amount = amountRef.current.value;
//         const spent_on = new Date(dateRef.current.value);
//         const category_name = categoryRef.current.value;

//         axios({
//             method: 'POST',
//             url: `${config.backendPoints['EXPENSE-SERVICE']}/v1/add-user-expense`,
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             data: {
//                 activity,
//                 amount,
//                 category_name,
//                 spent_on,
//             }
//         }).then((response) => {
//             console.log(response.data.item)
//             popupTriggeredCnxt.popupTriggeredDispatch('addExpense');
//         }).catch((error) => {
//             console.log(error.response.data.message)
//             if (error && error.response && error.response.data && error.response.data.message) {

//             } else {

//             }
//         });
//     }

//     return (
//         <>
//             <Card>
//                 <Input
//                     lable="Activity"
//                     placeholder="Enter Activity"
//                     reference={activityRef}
//                     inputType="text"
//                 />
//                 <Input
//                     lable="Amount"
//                     placeholder="Enter Amount"
//                     reference={amountRef}
//                     inputType="number"
//                 />
//                 <Input
//                     lable="Date"
//                     placeholder="Enter Date"
//                     reference={dateRef}
//                     inputType="date"
//                 />
//                 <Input
//                     lable="Category"
//                     placeholder="Enter Category"
//                     reference={categoryRef}
//                     inputType="text"
//                 />
//                 <Button
//                     buttonValue="Add"
//                     buttonColor="purple"
//                     buttonTextColor="white"
//                     onClick={addNewExpense}
//                 />
//             </Card>
//         </>
//     )
// }

// export default AddExpenseForm;