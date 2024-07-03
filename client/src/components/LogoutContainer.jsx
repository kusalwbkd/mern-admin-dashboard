import React, { useState } from 'react'
import { useDashboardContext } from '../pages/DashboardLayout';
import { FaCaretDown, FaUserCircle } from 'react-icons/fa';

const LogoutContainer = () => {
  const [showLogout, setShowLogout] = useState(false);
  const { user, logoutUser } = useDashboardContext();


  return (
    <div className=' relative'>

<button
        type='button'
        className=' btn flex justify-center items-center gap-y-0 gap-x-2 capitalize'
        onClick={() => setShowLogout(!showLogout)}
      >
        {user?.avatar ? (
          <img src={user?.avatar} alt='avatar' className=' w-6 h-6 rounded-full' />
        ) : (
          <FaUserCircle />
        )}

        {user?.name}
        <FaCaretDown />
      </button>

      <div className={showLogout ? ' absolute top-[45px] left-0 w-full shadow text-center rounded bg-indigo-500' : ' hidden'}>
        <button type='button' className=' rounded p-2 bg-transparent border-none text-white tracking-normal capitalize cursor-pointer w-full h-full ' onClick={logoutUser}>
          logout
        </button>
      </div>
    </div>
  )
}

export default LogoutContainer