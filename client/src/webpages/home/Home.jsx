import { Box, Link } from '@mui/material';
import React from 'react';
import { CTAButton } from '../../components';
import './Home.scss';

const Home = () => {
  return (
    <main id="home">

        <Box className="header">
            <Box className="logo">
                <h2 className="header-text text-1">block</h2>
                <h2 className="header-text text-2">watch</h2>
            </Box>

            <Link className="begin">Begin</Link>
            <Link className="get-started">Get Started</Link>
            
        </Box>

      <section className="hero">
        <Box>
            <h1 className="hero-slogan"> #1 GROUP WATCH PLATFORM</h1>
        </Box>
        
        <Box>
            <h2 className="hero-app-title">Youtube</h2>

                <p className="supplemental-message subheadline-1">
                    We are a tool friends and family can stream YouTube 
                    videos seamlessly, and most importantly,
                    <span className="bold-text">together.</span>
                </p>

            <h2 className="hero-app-title">Block Watch</h2>
        </Box>

        <Box>
            <p className="supplemental-message subheadline-2">
                We are a tool friends and family can stream YouTube 
                videos seamlessly, and most importantly,
                <span className="bold-text">together.</span>
            </p>
        </Box>

        <Box className="cta-button-wrapper">
            <CTAButton text="Host Party"/>
            <CTAButton text="Join Party" classname="inverted"/>
        </Box>

      </section>


    
      <section className="host-section">
        <Box className="text-wrapper">
            <h2 className="subtitle-text">
                <span>host</span>
                <span>your</span>
                <br/>
                <span className="__3">own</span>
                <span>party</span>
            </h2>
        </Box>

        <Box className="host-details">

            <Box className="text-wrapper">
                <p className="instructions">
                    Simply fill in your display name and provide a 
                    valid Youtube video url. After that, you are on
                    your way to having a memorable hag session!
                </p>
            </Box>

            <Box className="input-wrapper">
                <Box className="input">
                    <label htmlFor="host-name" className="input-label">Party Display Name</label>
                    <input id="host-name" type="text"/>
                </Box>
                
                <Box className="input">
                    <label htmlFor="video-link" className="input-label">YouTube Video Link</label>
                    <input id="video-link" type="text"/>
                </Box>
                <CTAButton text="Begin Hosting"/>
            </Box>
            
        </Box>
      </section>

      <section className="join-section">
        <Box className="text-wrapper">
            <h2 className="subtitle-text">
                <span>join</span>
                <span>a</span>
                {/* <br/>
                <span>own</span> */}
                <span>party</span>
            </h2>
        </Box>

        <Box className="host-details">

            <Box className="text-wrapper">
                <p className="instructions">
                    Simply fill in your display name and provide a 
                    valid Youtube video url. After that, you are on
                    your way to having a memorable hag session!
                </p>
            </Box>

            <Box className="input-wrapper">
                <Box className="input">
                    <label htmlFor="host-name" className="input-label">Party Display Name</label>
                    <input id="host-name" type="text"/>
                </Box>
                
                <Box className="input">
                    <label htmlFor="video-link" className="input-label">Room Id</label>
                    <input id="video-link" type="text"/>
                </Box>
                <CTAButton text="Join Party"/>
            </Box>
            
        </Box>
      </section>


    </main>
  )
}

export default Home;
