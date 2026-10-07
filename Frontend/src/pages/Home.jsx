import React from 'react'
import MainHomeSection from '../components/MainHomeSection'
import BestSeller from '../components/BestSeller'
import OurProducts from '../components/OurProducts'
import HomeVideoSection from '../components/HomeVideoSection'
import OurCollection from '../components/OurCollection'
import OurPromise from '../components/OurPromise'
import FAQSection from '../components/FAQSection'

const Home = () => {
  return (
    <>
        <MainHomeSection/>
        <BestSeller />
        <OurProducts/>
        <HomeVideoSection />
        <OurCollection />
        <OurPromise />
        <FAQSection />
    </>
  )
}

export default Home