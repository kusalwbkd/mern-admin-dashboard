import React from 'react'
import { Logo } from '../components'
import { Link } from 'react-router-dom'
import main from '../assets/images/main.svg'
const Landing = () => {
  return (
    <section className=' max-w-6xl m-auto'>
    <div className="navbar bg-base-100 h-24">
   <Logo/>
  </div>



    <div className=' w-[90vw] max-w-6xl m-auto h-[calc(100vh -24rem )] grid items-center mt-24 grid-cols-4' style={{gridTemplateColumns:'1fr 400px'}}>

        <div>

          <h1 className=' font-bold text-7xl capitalize mb-6'>
            E-Commerce <span className=' text-indigo-600'>Admin</span>  
          </h1>
          <p className=' leading-loose text-slate-400 mb-6 max-w-[35rem]'>
            I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
            bottle single-origin coffee chia. Aesthetic post-ironic venmo,
            quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
            narwhal.
          </p>
          <div className=' mb-8'>
          
          <Link to='/login' className='btn btn-active btn-primary ml-5 py-[0.75rem] px-[1rem]'>
            Login to Dashboard
          </Link>
          </div>
        </div>

        <img src={main} className='hidden md:block'/>
    </div>
  </section>
  )
}




export default Landing