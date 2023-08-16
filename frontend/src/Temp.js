import React from "react";
import { BsCaretRightFill, BsCaretLeftFill, BsFillTrashFill, BsSearch } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { GiClick } from 'react-icons/gi';

function Temp() {
  return (
    <>
      <div className='header'>
        <div className='header-items'><p class='title'>Expense Tracker</p></div>
        <div className='header-items'>
          <div className='profile'>
            <img className='profile-photo fr' src="img_avatar.png" alt="Avatar" />
            <p className='fr'>Saumya Dixit</p>
          </div>
        </div>
      </div>
      <div className='menu'>
        <div className='menu-items'>
          <nav>
            <ul className="nav-links">
              <li><a href="index">Home</a></li>
              <li><a href="services.html" class="active">Dashboard</a></li>
              <li><a href="index">Graphs</a></li>
            </ul>
          </nav>
        </div>
      </div>
      <div className='date-picker-div'>
        <div className='search-box'>
          <input type='text' placeholder="Search Expense" />
          <button><BsSearch /></button>
        </div>
        <div className='date-box'>
          <input className="fr" type='date' placeholder="Search Expense" />
        </div>
      </div>
      <div className='display'>
        <div className='display-item'>
          <div className='page-selector'>
            <input type='text'></input><p>entries per page</p>
          </div>
          <table>
            <tr>
              <td className="expense-add-btn" colSpan={5}>
                {/* keep onclick on this */}
                ADD EXPENSE <GiClick />
              </td>
            </tr>
            <tr>
              <th>Activity</th>
              <th>Category Name</th>
              <th>Amount</th>
              <th>Spent On</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>Dinner</td>
              <td>Resturants</td>
              <td>$100</td>
              <td>21-july-2023</td>
              <td>
                <div className='expense-action'>
                  <button><FiEdit2 /></button>
                  <button><BsFillTrashFill /></button>
                </div>
              </td>
            </tr>
            <tr>
              <td>Dinner</td>
              <td>Resturants</td>
              <td>$100</td>
              <td>21-july-2023</td>
              <td>
                <div className='expense-action'>
                  <button><FiEdit2 /></button>
                  <button><BsFillTrashFill /></button>
                </div>
              </td>
            </tr>
            <tr>
              <td>Dinner</td>
              <td>Resturants</td>
              <td>$100</td>
              <td>21-july-2023</td>
              <td>
                <div className='expense-action'>
                  <button><FiEdit2 /></button>
                  <button><BsFillTrashFill /></button>
                </div>
              </td>
            </tr>
          </table>
          <div className='page-number-selector'>
            <button><BsCaretLeftFill /></button><p>2</p><button><BsCaretRightFill /></button>
          </div>
        </div>
      </div>
      <div className="add-edit-form">
        <div>
          <label for="fname">Activity</label>
          <input type="text" id="fname" name="fname" />
        </div>
        <div>
          <label for="lname">Category Name</label>
          <input type="text" id="lname" name="lname" />
        </div>
        <div>
          <label for="lname">Amount</label>
          <input type="text" id="lname" name="lname" />
        </div>
        <div>
          <label for="lname">Spent On</label>
          <input type="text" id="lname" name="lname" />
        </div>
        <div>
          <button>submit</button>
        </div>
      </div>
    </>
  )
}

export default Temp