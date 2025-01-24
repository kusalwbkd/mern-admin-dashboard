import React from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { Filters,  PaginationContainer, ProductsContainer } from '../components'


export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])
    const response = await customFetch.get('/products', { params })
    const { products, categories, companies, totalProducts, numOfPages, currentPage } = response.data
    return { products, categories, companies, params, totalProducts, currentPage, numOfPages, params };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
}
const AllProducts = () => {


  return (
    <>
      <section>
        <h1 className='text-2xl font-semibold mb-8 capitalize'>All Products</h1>

        <Filters />
        <ProductsContainer />
        <PaginationContainer />
      </section>


    </>

  )
}

export default AllProducts