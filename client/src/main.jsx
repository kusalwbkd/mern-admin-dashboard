import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify';
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
 <>
   <App />
 <ToastContainer position='top-center' />
 </>

  
    
  
)
