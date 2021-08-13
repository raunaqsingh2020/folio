import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { motion } from "framer-motion"
import { Fade, AttentionSeeker, Zoom } from "react-awesome-reveal";

import Scene from "@components/3DHeader/Scene1"

import { Scroll, NavBar, Intro, AboutMe, Header, Layout, Loading, Cube, ThemeContext, ContactMenu, ScrollIndicator } from '@components';

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useProgress, Html } from '@react-three/drei'

const SceneContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: ${props => props.position || "sticky"};
  top: ${props => props.top || 0};
  left: 0;
`

const Spacer = styled.div`
  height: ${props => props.top || 0};
`

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <span style={{ color: '#FFFFFF' }}>{progress} % loaded</span>
    </Html>
  )
}

const IndexPage = () => {

  const [position, setPosition] = useState("fixed")
  const [top, setTop] = useState(0)

  const [navOpacity, setNavOpacity] = useState(0)
  const [navDisplay, setNavDisplay] = useState("none")
  const [scrollIndicatorOpacity, setScrollIndicatorOpacity] = useState(0)

  const [overlayOpacity, setOverlayOpacity] = useState(1)

  useEffect(() => {
    const onScroll = e => {
      //var scrolled = e.target.documentElement.scrollTop;
      var scroll = window.scrollY;
      if (scroll > 2900) {
        setPosition("relative");
        setTop('2900px');
      } else {
        setPosition("sticky");
        setTop(0);
      }

      var overlay = (2900 + window.innerHeight - scroll) / window.innerHeight;
      if (overlay >= 0) {
        setOverlayOpacity(overlay);
      } else {
        setOverlayOpacity(0);
      }

      if (scroll > 3635) {
        setNavOpacity(1);
        setNavDisplay("visible");
        setScrollIndicatorOpacity(1);
      } else {
        setNavOpacity(0);
        setNavDisplay("hidden");
        setScrollIndicatorOpacity(0);
      }

    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  //const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text')
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  return (
    <>
        <SceneContainer position={position} top={top}>
          <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
            <color attach="background" args={['#0A0A0A']}/>
            <Suspense fallback={<Loader/>}>
              <Scene theme={colorMode}/>
            </Suspense>
            <ambientLight intensity={0.6} color={'#FFF'} />
          </Canvas>
        </SceneContainer>

        <NavBar opacity={navOpacity} display={navDisplay}/>
        <ScrollIndicator opacity={scrollIndicatorOpacity}/>

        <Spacer top={'2900px'}/>

        {/* <Header/> */}

        <Intro overlayOpacity={overlayOpacity}/>

        <div id="about"/>
        <AboutMe/>
        <div id="contact"/>
        <ContactMenu/>

        <Spacer/>
    </>
  )
}

export default IndexPage