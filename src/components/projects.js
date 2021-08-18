import React, { useRef } from 'react'
import styled from 'styled-components'

import gsap from 'gsap'

import { Wave } from "react-animated-text";

import { motion, useViewportScroll, useTransform } from "framer-motion"
import { Fade, AttentionSeeker, Zoom } from "react-awesome-reveal";

import { media } from "@styles"

import outline from '@images/outline.png';
import withBackground from '@images/withBackground.png';

import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

import {
  NORTH_CAROSSELA,
  POPPINS_LIGHT,
  POPPINS_MEDIUM
} from '../styles/font'

const ProjectsWrapper = styled.div`
  min-height: 100vh;
  padding: 7rem 4.8rem 0rem 4.8rem;
`

const Overlay = styled.div`
  position: fixed;
  display: ${props => props.display || 0};
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #0A0A0A;
  opacity: ${props => props.opacity || 0};
  z-index: 998;
`

const Heading = styled.h1`
  overflow: hidden;
  font-size: max(10.5vw, 6rem);
  margin: 0;
  color: var(--text);
  background: transparent;
  // -webkit-text-fill-color: transparent;
  // -webkit-text-stroke-width: 1px;
  // -webkit-text-stroke-color: var(--text);
  text-transform: uppercase;
  ${NORTH_CAROSSELA}
`

const ProjectText = styled.h1`
  overflow: hidden;
  font-size: max(1.2vw, 0.8rem);
  margin: 0;
  color: var(--text);
  background: transparent;
  // text-transform: uppercase;
  ${POPPINS_LIGHT}
`

const Projects = ({ overlayOpacity, display }) => {

  const wrapper = useRef();

  return (
      <ProjectsWrapper ref={wrapper}>
        <Overlay 
          opacity={overlayOpacity}
          display={display}
        />
        <Heading>Projects</Heading>
        <ProjectText>Hi, my name's Raunaq. Here's sample text. Here's sample text. Here's sample text. Here's sample text. Here's sample text. Here's sample text. Here's sample text.</ProjectText>
      </ProjectsWrapper>
  );
};

export default Projects;