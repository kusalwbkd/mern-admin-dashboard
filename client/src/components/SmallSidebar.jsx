import React from 'react'
import { FaTimes } from 'react-icons/fa';
import Logo from './Logo';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';
import { useDashboardContext } from '../pages/DashboardLayout';
import Navlinks from './Navlinks';

const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useDashboardContext();
  return (
    <aside className='md:hidden'>
      <div className={showSidebar?'sidebar-content show-sidebar' :'sidebar-content'  }>
      <div className=' w-[90vw] h-[95vh]  rounded-md py-16 px-8 relative flex items-center flex-col bg-white'>
      <button type='button' className=' absolute top-[10px] left-[10px] bg-transparent border-transparent text-4xl text-red-600 cursor-pointer  ' onClick={toggleSidebar}>
            <FaTimes />
      </button>

      <header>
            <Logo />
          </header>

        <Navlinks/>
      </div>
      </div>


    </aside>
  )
}

export default SmallSidebar