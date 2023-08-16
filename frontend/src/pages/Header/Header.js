import AppTitle from '../../components/AppTitle';
import ProfileDetails from '../../components/ProfileDetails';

const Header = () => {
  return (
    <>
      <div className='header'>
        <AppTitle />
        <ProfileDetails />
      </div>
    </>
  );
};

export default Header;
