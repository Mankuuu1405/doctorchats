import React from 'react'
import Header from '../components/Header'
import SpecialityMenu from '../components/SpecialityMenu'
import TopDoctors from '../components/TopDoctors'
import FaqSection from '../components/FaqSection';
import InfoSection from '../components/InfoSection'
import MobileAppAd from '../components/MobileAppAd'
import Testimonial from '../components/Testimonial'
import Banner from '../components/Banner'


const Home = () => {
  return (
    <div>
      <Header />
      <SpecialityMenu />
      <TopDoctors />
      <Banner />
      <FaqSection />
      <InfoSection />
      <Testimonial />
      <MobileAppAd />
    </div>
  )
}

export default Home