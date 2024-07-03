import React from 'react'
import customFetch from '../utils/customFetch'
import { ChartsContainer, StatsContainer } from '../components'
import { useLoaderData } from 'react-router-dom'
import { formatPrice } from '../utils'

export const loader=async({params})=>{
 const {data}= await customFetch.get(`/sales/${params.id}`)


 return data
}




const SingleProductPage = () => {
 
  const data=useLoaderData()

  const{monthlyItemSales,monthlySalesCost,totalItemsSales,totalItemsSalesCost,inventory,productName,reviewsCount}=data
const {total_Sale_items}=totalItemsSales[0]||0

const{total_Sale_items_cost}=totalItemsSalesCost[0]||0
const price=formatPrice(total_Sale_items_cost||0)


 const updatedData=monthlySalesCost.map((item)=>{
   const sales=item.sales/100
   const date=item.date
   return {sales,date}
 })

 
const defaultStats = {
  total_Sale_items,
 price,
  inventory,
  reviewsCount
};
  return (
    <>
      <h1 className='text-2xl font-semibold mb-8 capitalize'> Stats of {productName}</h1>
       <StatsContainer defaultStats={defaultStats}  />
      {monthlyItemSales?.length > 0 && (
        <ChartsContainer monthlyItemSales={monthlyItemSales} monthlySalesCost={updatedData}/>
      )}
    </>
  )
}

export default SingleProductPage