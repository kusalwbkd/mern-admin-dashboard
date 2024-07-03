import React from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'


export const action=async({params})=>{
  console.log(params);
  return null
  try {
    await customFetch.patch(`/notifications/${params.id}`)
    toast.success('Notification updated')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    
  }
  return redirect('/dashboard')
}

