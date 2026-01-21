import React from 'react';
import { FiUser } from 'react-icons/fi';

const ProfileDropdown = () => {
  return (
    <div className="profile-dropdown">
      <div className="profile-avatar">
        <FiUser size={22} />
      </div>
    </div>
  );
};

export default ProfileDropdown;