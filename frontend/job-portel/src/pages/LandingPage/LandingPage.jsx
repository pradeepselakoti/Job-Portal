import React from 'react'
import Header from './commponents/Header'
import Hero from './commponents/Hero'
import Features from './commponents/Features'
import Analytics from './commponents/Analytics'
import Footer from './commponents/Footer'

const LandingPage = () => {
  return (
    <div className='min-h-screen '>

      <Header/>
      <Hero />
      <Features />
      <Analytics />


      <Footer />
      
    </div>
  )
}

export default LandingPage