// import React, { useRef, useContext } from 'react'
// import axios from 'axios';

// import config from '../../config';

// import Card from '../../components/Card';
// import Input from '../../components/Input';
// import Button from '../../components/Button';

// import { popupTriggeredContext } from '../../App';

// const UpdateExpenseForm = (props) => {

//     console.log('Update Expense Form Rendered');
//     const popupTriggeredCnxt = useContext(popupTriggeredContext);

//     const activityRef = useRef(null)
//     const amountRef = useRef(null)
//     const dateRef = useRef(null)
//     const categoryRef = useRef(null)

//     const updateExpense = (event) => {
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
//                     value={props.updateExpenseData.activity}
//                 />
//                 <Input
//                     lable="Amount"
//                     placeholder="Enter Amount"
//                     reference={amountRef}
//                     inputType="number"
//                     value={props.updateExpenseData.amount}
//                 />
//                 <Input
//                     lable="Date"
//                     placeholder="Enter Date"
//                     reference={dateRef}
//                     inputType="date"
//                     defaultValue={new Date(props.updateExpenseData.spent_on)}
                    
//                 />
//                 <Input
//                     lable="Category"
//                     placeholder="Enter Category"
//                     reference={categoryRef}
//                     inputType="text"
//                     value={props.updateExpenseData.category_name}
//                 />
//                 <Button
//                     buttonValue="Add"
//                     buttonColor="purple"
//                     buttonTextColor="white"
//                     onClick={updateExpense}
//                 />
//             </Card>
//         </>
//     )
// }

// export default UpdateExpenseForm;