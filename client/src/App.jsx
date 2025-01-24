import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { AddProduct, AllProducts, DashboardLayout, EditProduct, Error, HomeLayout, Landing, Login, Orders, Profile, Register, Reviews, SingleProductPage, Stats, Users } from './pages'

//actions

import { action as registerAction } from './pages/Register'
import {action as loginAction} from './pages/Login'
import{action as addProductAction} from './pages/AddProduct'
import{action as editProducAction} from './pages/EditProduct'

//loaders
import { loader as dashboardLoader, loader } from './pages/DashboardLayout'
import {loader as addProductsLoader} from './pages/AddProduct'
import {loader as allProductsLoader} from './pages/AllProducts'
import{loader as ordersLoader} from './pages/Orders'
import{loader as singleProductLoader} from './pages/SingleProductPage'
import{loader as editProducLoader} from './pages/EditProduct'
import{loader as statsLoader} from './pages/Stats'
import{loader as userLoader} from './pages/Users'


const router=createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement:<Error/>,
    children: [
      {
       index:true,
       element:<Landing/>
      },
      
      {
        path: 'login',
        element: <Login />,
        action:loginAction
      },
      {
        path: 'dashboard',
        element: <DashboardLayout />,
        loader:dashboardLoader,
        children:[
          {
            index: true,
            element: <AddProduct />,
            loader:addProductsLoader,
            action:addProductAction,
          },
          { 
            path: 'stats', 
            element: <Stats /> ,
            loader:statsLoader
          },
          {
            path: 'all-products',
            element: <AllProducts />,
            loader:allProductsLoader,
           
          },
          {
            path:'all-products/:id',
            element:<SingleProductPage/>,
            loader:singleProductLoader
          },
          {
            path:'all-products/edit/:id',
            element:<EditProduct/>,
            action:editProducAction,
            loader:editProducLoader

          },
        
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'users',
            element: <Users/>,
            loader:userLoader
          },
          {
            path: 'reviews',
            element: <Reviews />,
          },
          {
            path: 'orders',
            element: <Orders />,
            loader:ordersLoader
          }
        ]
      },
    ],
  },
])


const App = () => {
  return (
   <RouterProvider router={router}/>
  )
}

export default App