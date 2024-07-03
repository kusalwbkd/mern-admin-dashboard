import React from 'react'
import { useDashboardContext } from '../pages/DashboardLayout';
import { NavLink } from 'react-router-dom';
import links from '../utils/links';

const Navlinks = ({ isBigSidebar }) => {
  const { user, toggleSidebar } = useDashboardContext();
  return (
    <div className= 'pt-8 flex flex-col'>
    {links.map((link) => {
        const { text, path, icon } = link;
      const{role}=user
     if ( role !== 'admin') return;
        return (
          <NavLink
            to={path}
            key={text}
            className={isBigSidebar? 'flex items-center  text-indigo-600  py-4  pl-10 capitalize  transition-all  hover:text-indigo-700 active:text-indigo-800 hover:pl-12':'flex items-center  text-indigo-600  py-4 px-0 capitalize transition duration-300 ease-in-out hover:text-indigo-700  active:text-indigo-800'}
           
            onClick={isBigSidebar? null :toggleSidebar}
            end
          >
            <span className=' text-2xl mr-4 grid place-items-center'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  )
}

export default Navlinks