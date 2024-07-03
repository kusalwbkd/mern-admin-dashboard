import React from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'


export const action=async({params})=>{
   try {
   await customFetch.delete(`/products/${params.id}`)
   toast.success('Product deleted sucesfully')
   } catch (error) {
    toast.error(error?.response?.data?.msg);
    
   }
   return redirect('/dashboard/all-products')
}
