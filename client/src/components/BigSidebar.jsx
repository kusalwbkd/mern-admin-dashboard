import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout'
import Navbar from './Navbar'
import Navlinks from './Navlinks'
import Logo from './Logo'

const BigSidebar = () => {
  const{showSidebar }=useDashboardContext()
  return (
   <aside className='hidden lg:block  shadow-sm '>
    <div className={showSidebar?'big-sidebar-container':'big-sidebar-container show-big-sidebar mt-6 '}>

     <div className='sticky top-0'> 
     <header className=' h-24 flex items-center pl-10'>
            <Logo />
          </header>
        
          <Navlinks isBigSidebar />
         
   
     </div>
    </div>
    </aside>
  )
}

export default BigSidebar