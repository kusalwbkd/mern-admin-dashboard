import React from 'react'
import { Form, Link, useLoaderData } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { MdDelete } from 'react-icons/md'
import { CiEdit } from "react-icons/ci";
import { CheckboxInput, Filters, FormInput, FormRange, PaginationContainer, ProductsContainer, SelectInput } from '../components'


export const loader=async({request})=>{
 
    
  
try {
  const params=Object.fromEntries([...new URL(request.url).searchParams.entries()])
  const response=await customFetch.get('/products',{params})
  const products = response.data.products;
  const categories=response.data.categories
 const companies=response.data.companies
 const totalProducts=response.data.totalProducts
 const numOfPages=response.data.numOfPages
 const currentPage=response.data.currentPage
 return {products,categories,companies,params,totalProducts,currentPage,numOfPages,params};
} catch (error) {
  toast.error(error?.response?.data?.msg);
  return error;
}
}
const AllProducts = () => {

const{products,categories,companies} =useLoaderData()
console.log(products);
const id=1
  return (
    <>
   <section>
   <h1 className='text-2xl font-semibold mb-8 capitalize'>All Products</h1>

<Filters/>
<ProductsContainer/>
<PaginationContainer/>
 
      
     
       
        </section>


</>

  )
}

export default AllProducts