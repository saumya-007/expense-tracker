const ProfilePhoto = () => {
  return (
    <button
      className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
      aria-label="Account"
      aria-haspopup="true"
    >
      <img
        className="object-cover w-8 h-8 rounded-full"
        src="https://images.unsplash.com/photo-1502378735452-bc7d86632805?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&s=aa3a807e1bbdfd4364d1f449eaa96d82"
        alt=""
        aria-hidden="true"
      />
    </button>
  );
};

export default ProfilePhoto;
