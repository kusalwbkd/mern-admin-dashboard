import React, { createContext, useContext, useEffect, useState } from 'react'
import { Outlet, redirect, useLoaderData, useNavigate } from 'react-router-dom'
import { BigSidebar, Navbar, SmallSidebar } from '../components'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'




const DashBoardContext=createContext()

export const loader=async()=>{
  try {


const response1=await customFetch.get('/users/showMe')
const user=await response1.data.user

const response2=await customFetch.get('/notifications')
const notifications=await response2.data.notification


return {user,notifications}

  } catch (error) {
    return redirect('/')
  }
}


const DashboardLayout = () => {
  const {user}=useLoaderData();


  const [showSidebar, setShowSidebar] = useState(false);

  

  const navigate=useNavigate()
 
  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
    console.log(showSidebar);
  };

  const logoutUser = async () => {
    navigate('/')
    await customFetch.post('/auth/logout');
    toast.success('Logging out...');
  };

  


  return (
   <DashBoardContext.Provider value={{user,showSidebar,logoutUser,toggleSidebar}}>
    <section >
      <main className=' grid grid-cols-1 md:grid-cols-my-columns'>
      <SmallSidebar/>
     <BigSidebar/>
        <div>
          <Navbar />
        
          <div className=' w-[90vw]  my-0 mx-auto py-8 px-0 md:w-[90%] '>
            <Outlet  context={{user}}/>
          
          </div>
        </div>
     
      </main>
    </section>
    </DashBoardContext.Provider>
  

    


  
);

  
}
export const useDashboardContext=()=>useContext(DashBoardContext)
export default DashboardLayout