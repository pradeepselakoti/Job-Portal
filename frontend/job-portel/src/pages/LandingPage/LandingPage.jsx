import React from 'react'
import Header from './commponents/Header'
import Hero from './commponents/Hero'
import Features from './commponents/Features'
import Analytics from './commponents/Analytics'

const LandingPage = () => {
  return (
    <div className='min-h-screen mb-[100vh]'>

      <Header/>
      <Hero />
      <Features />
      <Analytics />
      
    </div>
  )
}

export default LandingPage