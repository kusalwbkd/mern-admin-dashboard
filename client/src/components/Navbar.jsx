import React from 'react'
import { FaAlignLeft } from 'react-icons/fa';
import Logo from './Logo';
import { useDashboardContext } from '../pages/DashboardLayout';
import Navlinks from './Navlinks';
import LogoutContainer from './LogoutContainer';
import ThemeToggle from './ThemeToggle';
import NotificationContainer from './NotificationContainer';
import customFetch from '../utils/customFetch';



const Navbar = () => {
   const{toggleSidebar,showSidebar }=useDashboardContext()
  return (
    <nav className='sticky top-0 w-full h-24 flex items-center justify-center shadow-sm bg-white z-50'>
    <div className='flex w-[90vw] items-center justify-between md:w-[90%]'>
      <button
        type='button'
        className='bg-transparent border-none text-2xl text-indigo-700 cursor-pointer flex items-center'
        onClick={toggleSidebar}
      >
        <FaAlignLeft />
      </button>

      <div className='flex items-center space-x-4'>
        <div className='lg:hidden'>
          <Logo />
        </div>
        <h4 className='hidden lg:block whitespace-nowrap'>dashboard</h4>
      </div>

      <div className='flex items-center space-x-4'>
     <NotificationContainer/>
    
        <LogoutContainer />
      </div>
    </div>
  </nav>
  )
}

export default Navbar