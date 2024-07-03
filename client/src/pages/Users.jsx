import React from 'react'
import { PaginationContainer } from '../components'
import UsersContainer from '../components/UsersContainer'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'

export const loader=async({params,request})=>{
  try {
    const params=Object.fromEntries([...new URL(request.url).searchParams.entries()])

  const{data} = await customFetch.get('/users',{params})
  return data
    
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}

const Users = () => {
  return (
    <>
    <UsersContainer/>
    <PaginationContainer/>
    
    </>
  )
}

export default Users