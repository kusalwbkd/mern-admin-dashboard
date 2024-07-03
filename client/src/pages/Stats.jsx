import React from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { useLoaderData } from 'react-router-dom'
import { ChartsContainer, StatsContainer, TotalStatsContainer } from '../components'
import { formatPrice } from '../utils'

export const loader=async()=>{
try {
  const{data}=await customFetch('/sales')
return data
} catch (error) {
  toast.error('Something went wrong...')
}


}

const Stats = () => {
  const{totalItemsSales,totalItemsSalesCost,monthlyItemSales,monthlySalesCost,outOfInventoryItems,totalProducts,numOfUsers,numOfOrders}=useLoaderData()

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
 totalProducts,
 numOfUsers,
 outOfInventoryItems,
 numOfOrders
  
};
  return (
    <>
     <h1 className='text-2xl font-semibold mb-8 capitalize'> Stats</h1>
     <TotalStatsContainer defaultStats={defaultStats}  />
      {monthlyItemSales?.length > 0 && (
        <ChartsContainer monthlyItemSales={monthlyItemSales} monthlySalesCost={updatedData}/>
      )}
    
    </>
  )
}

export default Stats