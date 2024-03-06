import React from 'react'
import './Home.css'
import { About, Advertisement, Order, Title,Show } from './container'
export const Home = () => {
  return (
    <> 
      <div className='body'> 
        <Advertisement />
        <Title />
        <Show />
        <About />
        <Order />
      </div>
    </>
  )
}

