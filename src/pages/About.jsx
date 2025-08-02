import React from 'react'
import CompanyStory from '../componets/About/Story'
// import TimeLine from '../componets/About/TimeLine'
import SetPageTitle from "../componets/SetPageTitle";

const About = () => {
  return (
    <>
    <SetPageTitle title="About - BuyNGO"/>
        <CompanyStory/>
        {/* <TimeLine/> */}
    </>
  )
}

export default About