import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
const ThemeToggle = () => {
  const { theme, toggleDarkTheme } = useDashboardContext();

  return (
    <div onClick={toggleDarkTheme} className=' bg-transparent border-transparent w-14 h-8 grid place-content-center cursor-pointer'>
 {theme==='winter' ? (
        <BsFillSunFill className=' text-2xl ' />
      ) : (
        <BsFillMoonFill className='text-2xl' />
      )}
    </div>
  )
}

export default ThemeToggle