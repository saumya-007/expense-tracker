import React from 'react'

function AddExpenseForm() {
  console.log('add expense form');
  return (
    <div className='add-edit-form'>
      <div>
        <label htmlFor="fname">Activity</label>
        <input type="text" id="fname" name="fname" />
      </div>
      <div>
        <label htmlFor="lname">Category Name</label>
        <input type="text" id="lname" name="lname" />
      </div>
      <div>
        <label htmlFor="lname">Amount</label>
        <input type="text" id="lname" name="lname" />
      </div>
      <div>
        <label htmlFor="lname">Spent On</label>
        <input type="text" id="lname" name="lname" />
      </div>
      <div>
        <button>submit</button>
      </div>
    </div>
  )
}

export default AddExpenseForm