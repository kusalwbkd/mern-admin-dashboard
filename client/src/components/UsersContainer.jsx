import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { useLoaderData } from 'react-router-dom'

const UsersContainer = () => {

const {users, totalUsers}=useLoaderData()

  return (
    <>
      <h4 className='font-medium text-md'>
        {totalUsers} User{totalUsers > 1 && 's'}
      </h4>
      <div className='border p-8 rounded-md'>


        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>

                <th>Name</th>
                <th>Location</th>
                <th>Number of Orders</th>
                <th>User email</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                return (
                  <tr key={user?._id}>

                    <td>
                      <div className="flex items-center gap-3">


                        {user?.avatar ? (
                          <div className="avatar">
                            <div className="mask mask-squircle h-12 w-12 rounded-full">
                              <img
                                src={user?.avatar}
                                alt="Avatar Tailwind CSS Component" />
                            </div>
                          </div>
                        ) : (
                          <FaUserCircle className=' h-12 w-12' />
                        )}


                        <div>
                          <div className="font-bold">{user?.name}</div>
                          <div className="text-sm opacity-50">{user?.lastName}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      {user?.location}

                    </td>
                    <td>{user?.orders?.length}</td>
                    <td>{user?.email}</td>

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

export default UsersContainer