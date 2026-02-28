import React from 'react'
import {Link} from 'react-router-dom'
export const Home = () => {
  return (
    <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8 flex justify-between flex-col w-full'>
      <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/250px-Uber_logo_2018.svg.png" alt="NA" />
      <div className='bg-white pb-7 px-4 py-4'>
        <h2 className='text-[30px] font-bold'>Get Started With Uber</h2>
        <Link to='/userlogin' className='flex items-center justify-center w-full bg-black text-white py-3 rounded-lg mt-5'>Continue</Link>
      </div>
    </div>
  )
}

export default Home 