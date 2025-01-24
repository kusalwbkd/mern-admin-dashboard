import React from 'react'
import customFetch from '../utils/customFetch'
import { useLoaderData } from 'react-router-dom'
import { formatPrice } from '../utils'
import day from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import {PaginationContainer } from '../components';
day.extend(advancedFormat);

export const loader = async ({ request }) => {
  try {
    const params = Object.fromEntries([...new URL(request.url).searchParams.entries()])

    const { data } = await customFetch.get('/orders', { params })

    return data
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error
  }

}
const Orders = () => {
  const { orders } = useLoaderData()

  return (
    <section>
      <h1 className='text-2xl font-semibold mb-8 capitalize'>Orders</h1>

      <div className='border p-8 rounded-md'>


        <div className="overflow-x-auto">
          <table className="table">

            <thead>
              <tr>

                <th>Customer Name</th>
                <th>Product Name/s</th>
                <th>cost</th>
                <th>date</th>

              </tr>
            </thead>
            <tbody>

              {orders?.map((order) => {

                return (
                  <tr key={order?._id}>
                    <td>{order?.user.name}</td>
                    <td>
                      {order?.orderItems?.map((item, index) => {
                        return (
                          <li key={index} className=' list-decimal mb-4'>
                            {item?.name}
                          </li>
                        )
                      })}
                    </td>
                    <td>   {formatPrice(order?.total)}</td>
                    <td>{day(order?.createdAt).format('MMM Do, YYYY')}</td>
                  </tr>
                )
              })}

            </tbody>
          </table>

        </div>
      </div>
      <PaginationContainer />
    </section>
  )
}

export default Orders