const ProfileDetails = () => {
  const imageUrl = 'https://www.nicepng.com/png/detail/128-1280406_view-user-icon-png-user-circle-icon-png.png';
  const userName = 'Saumya Dixit';
  return (
    <div className='header-items'>
      <div className='profile'>
        <img
          className='profile-photo fr'
          src={imageUrl}
          alt='Profile' />
        <p className='fr'>{userName}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
