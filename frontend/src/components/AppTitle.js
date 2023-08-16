import {DISPLAY_TEXT} from '../utils/constants';

const AppTitle = () => {
  const {app_title} = DISPLAY_TEXT;
  return <div className='header-items'><p className='title'>{app_title}</p></div>
};

export default AppTitle;
