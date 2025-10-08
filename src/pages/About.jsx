import React from 'react'
import CompanyStory from '../componets/About/Story'
import SetPageTitle from "../componets/SetPageTitle";
import MagicBento from "../componets/About/MagicBento";


const About = () => {
  return (
    <>
    <SetPageTitle title="About - BuyNGO"/>
        <MagicBento/>
        <CompanyStory/>
    </>
  )
}

export default About