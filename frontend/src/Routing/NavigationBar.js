import React, { useEffect, useState } from 'react'
import Button from '../components/Button';
import { useNavigate, useLocation } from 'react-router-dom';

function NavigationBar() {
  const location = useLocation();
  const [linkStatus, setLinkStatus] = useState();
  
  const navigate = useNavigate();
  const homeClickHandler = () => navigate('/dashboard/');
  const listClickHandler = () => navigate('/dashboard/list');
  const graphClickHandler = () => navigate('/dashboard/graph');

  useEffect(() => {
    const { pathname } = location;
    const splitLocation = pathname.split("/");
    setLinkStatus(splitLocation[2]);
  }, [location]);

  return (
    <>
    <div className='menu'>
        <div className='menu-items'>
          <nav>
            <ul className="nav-links">
              <li><button onClick={homeClickHandler} className={linkStatus === '' ? 'active' : null}>Home</button></li>
              <li><button onClick={listClickHandler} className={linkStatus === 'list' ? 'active' : null}>Dashboard</button></li>
              <li><button onClick={graphClickHandler} className={linkStatus === 'graph' ? 'active' : null}>Graphs</button></li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  )
}

export default NavigationBar