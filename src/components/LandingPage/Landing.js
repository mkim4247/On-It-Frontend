import React from 'react'
import Hero from './Hero'
import Info from './Info'
import Extra from './Extra'
import Album from './Album'
import Footer from './Footer'
import LandingNav from './LandingNav'
import LandingLogin from './LandingLogin'

const Landing = () => {
  return(
    <div>
      <LandingNav />
      <LandingLogin />
      <Hero />
      <Info />
      <Extra />
      <Album />
      <Footer />
    </div>
  )
}

export default Landing
