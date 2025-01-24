import React from 'react'
import {  Link, useLoaderData, useNavigate } from 'react-router-dom'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify'
import { MdDelete } from 'react-icons/md'
import { CiEdit } from "react-icons/ci";
import { formatPrice } from '../utils'


const ProductsContainer = () => {
  const { products, totalProducts } = useLoaderData()
  const navigate = useNavigate()
  const deleteItem = async (id) => {
    try {
      await customFetch.delete(`/products/${id}`)
      toast.success('Product deleted sucesfully')
    } catch (error) {
      toast.error(error?.response?.data?.msg);

    }
    navigate('/dashboard/all-products')

  }
  return (
    <>
      <h4 className='font-medium text-md'>
        {totalProducts} product{totalProducts > 1 && 's'}
      </h4>
      <div className='border p-8 rounded-md'>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Company</th>
                <th>Price</th>
                <th>Inventory</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product) => {
                return (
                  <tr key={product?._id}>

                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img
                              src={product?.image}
                              alt="product-img" />
                          </div>
                        </div>

                      </div>
                    </td>
                    <td>
                      <Link to={`../all-products/${product?._id}`}>
                        {product?.name}
                      </Link>
                      <br />
                      <span className="badge badge-ghost badge-sm">{product?.category}</span>
                    </td>

                    <td>

                      {product?.company}
                    </td>
                    <td>
                      {formatPrice(product?.price)}
                    </td>
                    <td>


                      {product?.inventory >= 1 ? (
                        <div className="badge badge-success gap-2">

                          {product?.inventory}
                        </div>
                      ) : (
                        <div className="badge badge-error gap-2">

                          Out of Stock
                        </div>
                      )}


                    </td>
                    <td>
                      <Link to={`./edit/${product?._id}`}>
                        <CiEdit className='h-6 w-6 text-blue-500 cursor-pointer ' />
                      </Link>
                    </td>
                    <td>




                      {/* <Form method='post' action={`../delete-product/${product._id}`}> */}
                      {/* Open the modal using document.getElementById('ID').showModal() method */}
                      <button onClick={() => document.getElementById(`${product._id}`).showModal()}>
                        <MdDelete className=' h-6 w-6 text-red-500 cursor-pointer ' />
                      </button>
                      <dialog id={product._id} className="modal">

                        <div className="modal-box">
                          <h3 className="font-bold text-lg text-red-800">{`Are you sure you want to Delete the item ${product.name}? `}</h3>
                          <p className="py-4 text-red-600">This action will permenently delete this item from database</p>
                          <div className="modal-action">
                            <form method="dialog">
                              {/* if there is a button in form, it will close the modal */}
                              <button className="btn btn-success">Close</button>
                              <button className="btn btn-error ml-3" onClick={() => deleteItem(product?._id)}>Confirm Delete</button>
                            </form>
                          </div>
                        </div>
                      </dialog>

                      {/* </Form> */}


                    </td>
                  </tr>
                )
              })}


            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default ProductsContainer