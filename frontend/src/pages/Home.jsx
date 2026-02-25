import React from 'react'

export const Home = () => {
  return (
    <div className='h-screen pt-8 flex justify-between flex-col w-full bg-red-500'>
      <img className='w-16 ml-8' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/250px-Uber_logo_2018.svg.png" alt="NA" />
      <div className='bg-white pb-7 px-4 py-4'>
        <h2 className='text-3xl font-bold'>Get Started With Uber</h2>
        <button className='w-full bg-black text-white py-3 rounded mt-4'>Continue</button>
      </div>
    </div>
  )
}

export default Home