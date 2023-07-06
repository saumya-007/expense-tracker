import React from 'react'
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

function NavigationBar() {

  const navigate = useNavigate();
  const homeClickHandler = () => navigate('/dashboard/');
  const listClickHandler = () => navigate('/dashboard/list');
  const graphClickHandler = () => navigate('/dashboard/graph');

  return (
    <>
      {/* Navigation Bar */}
      <div className="container flex items-center justify-between h-3 px-6 py-4 mx-auto text-purple-600 dark:text-purple-300">
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <Button
              buttonValue={'Home'}
              buttonTextColor={'black'}
              onClick={homeClickHandler}
            />
          </li>
          <li className="relative">
            <Button
              buttonValue={'List'}
              buttonTextColor={'black'}
              onClick={listClickHandler}
            />
          </li>
          <li className="relative">
            <Button
              buttonValue={'Graph'}
              buttonTextColor={'black'}
              onClick={graphClickHandler}
            />
          </li>
        </ul>
      </div>
    </>
  )
}

export default NavigationBar