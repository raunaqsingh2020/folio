import React, { Suspense, useRef, useEffect, useState, useLayoutEffect } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { motion } from "framer-motion"
import { Fade, AttentionSeeker, Zoom } from "react-awesome-reveal";

import Scene1 from "@components/3DHeader/Scene1"

import { Loading, NavBar, Projects, AboutMe, Header, Layout, ThemeContext, ContactMenu, ScrollIndicator, ThreeDHeader, Footer } from '@components';
import { NORTH_CAROSSELA } from '@styles/font'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useProgress, Html } from '@react-three/drei'

import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

const HeaderWrapper = styled.div`
  background-color: #000;
`


const ProjectsContainer = styled.div`
  width: 100vw;
  position: ${props => props.position || "fixed"};
  top: ${props => props.top || 0};
  left: 0;
`

const ScrollText = styled.text`
  font-size: max(1vw, 0.8rem);
  color: white;
  background: transparent;
  text-transform: uppercase;
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  z-index: 6000;
  ${NORTH_CAROSSELA}
`

const Spacer = styled.div`
  height: ${props => props.height || 0};
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

  const [isLoading, setIsLoading] = useState(true)

  const headerRef = useRef();
  const projectsRef = useRef();

  const [scrollIndicatorOpacity, setScrollIndicatorOpacity] = useState(0)

  const [projectsPosition, setProjectsPosition] = useState("fixed")
  const [projectsTop, setProjectsTop] = useState(0)

  const [overlayOpacity, setOverlayOpacity] = useState(1)
  const [overlayDisplay, setOverlayDisplay] = useState("block")

  const [navDisplay, setNavDisplay] = useState("none")

  const onScroll = e => {
    const header = headerRef.current.getBoundingClientRect();
    const projects = projectsRef.current.getBoundingClientRect();

    if (header.bottom >= -100 || projects.bottom >= -100) {
      requestAnimationFrame(updatePositions);
    }
  };

  function updatePositions() {

    var scroll = window.scrollY;
    var overlay = (2900 + window.innerHeight - scroll) / window.innerHeight;

    if (overlay >= 0) {
      setOverlayOpacity(overlay);
    } else {
      setOverlayOpacity(0);
    }

    const headerBounds = headerRef.current.getBoundingClientRect();
    const projectsBounds = projectsRef.current.getBoundingClientRect();

    if (headerBounds.bottom <= 100) {
      setNavDisplay("visible");
    } else {
      setNavDisplay("hidden");
    }

    if (headerBounds.bottom <= 0) {
      setOverlayDisplay("none");
      setScrollIndicatorOpacity(1);
      setProjectsPosition("relative");
      setProjectsTop('0')
    } else {
      setOverlayDisplay("block");
      setScrollIndicatorOpacity(0);
      setProjectsPosition("fixed");
      setProjectsTop(projectsBounds.height.toString() + 'px')
    }
  }

  useLayoutEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(()=>  {
    if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual"
      }
  },[]);

  return (
    <>
      {isLoading &&
        <Loading setIsLoading={setIsLoading} />
      }

      <HeaderWrapper>
        <ThreeDHeader sceneRef={headerRef} />
      </HeaderWrapper>

      {/* <ScrollText>SCROLL</ScrollText> */}

      <NavBar display={navDisplay} />
      <ScrollIndicator opacity={scrollIndicatorOpacity} />

      {/* <Spacer height={"2000px"}/> */}

      <div id="projects" />
      <ProjectsContainer ref={projectsRef} position={projectsPosition}>
        <Projects overlayOpacity={overlayOpacity} display={overlayDisplay} />
      </ProjectsContainer>

      <Spacer height={projectsTop} />

      <div id="about" />
      <AboutMe />
      <div id="contact" />
      <ContactMenu />
      <Footer />
    </>
  )
}

export default IndexPage