import React, { Suspense, useRef, useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { motion } from "framer-motion"
import { Fade, AttentionSeeker, Zoom } from "react-awesome-reveal";

import Scene from "@components/3DHeader/Scene1"

import { Scroll, Skills, AboutMe, Header, Layout, Loading, Cube, ThemeContext, ContactMenu } from '@components';

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useProgress, Html } from '@react-three/drei'

const SceneContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: ${props => props.position || "sticky"};;
  top: ${props => props.top || 0};;
  left: 0;
  // background-color: "#f00";
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

  const HeaderContainer = React.createRef();
  const [position, setPosition] = useState("fixed")
  const [top, setTop] = useState(0)

  useEffect(() => {
    const onScroll = e => {
      //var scrolled = e.target.documentElement.scrollTop;
      var scroll = window.scrollY;
      if (scroll > 3000) {
        setPosition("relative");
        setTop('3000px');
      } else {
        setPosition("sticky");
        setTop(0);
      }
      console.log(e.target.documentElement.scrollTop);
      console.log(window.innerHeight);


      //var header = document.querySelector('.3D-Header');
      // var scroll = window.scrollY;
      // var headerTop = HeaderContainer.current.offsetTop;
      // var end = 2500;

      // if (scroll >= headerTop && scroll < end) {
      //   HeaderContainer.current.style.position = 'fixed';
      //   HeaderContainer.current.style.top = 0;
      // } else if (scroll < headerTop) {
      //   HeaderContainer.current.style.position = 'relative';
      // } else {
      //   if (scroll >= end) {
      //     HeaderContainer.current.style.position = 'relative';
      //   }
      // }

      // console.log(scroll);

      // var products = document.querySelector('.rest-of-page'),
      //   scroll = window.scrollY,
      //   nav = document.querySelector('.side-nav'),
      //   navTop = nav.offsetTop
      // header = document.querySelector('.header'),
      //   offset = header.clientHeight,
      //   end = products.clientHeight + products.offsetTop;


      // if (scroll >= navTop && scroll < end) {
      //   nav.style.position = 'fixed';
      //   nav.style.top = offset;
      // } else if (scroll < navTop) {
      //   nav.style.position = 'relative';
      // } else {
      //   if (scroll >= end) {
      //     nav.style.position = 'relative';
      //   }
      // }

    };

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text')
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  return (
    <>
        <SceneContainer position={position} top={top}>
          <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
            <color attach="background" args={['#0A0A0A']} />
            {/* <OrbitControls/> */}
            <Suspense fallback={<Loader/>}>
              <Scene theme={colorMode}/>
            </Suspense>
            <ambientLight intensity={0.6} color={'#FFF'} />
          </Canvas>
        </SceneContainer>
        
        <Spacer top={'3000px'}/>

        <Header/>
        <div id="about"/>
        <AboutMe/>
        <div id="contact"/>
        <ContactMenu/>

        <Spacer/>
    </>
  )
}

export default IndexPage