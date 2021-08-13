import React, { useRef } from 'react'
import styled from 'styled-components'

import gsap from 'gsap'

import { Wave } from "react-animated-text";

import { motion, useViewportScroll, useTransform } from "framer-motion"
import { Fade, AttentionSeeker, Zoom } from "react-awesome-reveal";

import { media } from "@styles"

import outline from '@images/outline.png';
import withBackground from '@images/withBackground.png';

import {
  SANGBLEU,
  BOGART_SEMIBOLD,
  NORTH_CAROSSELA,
} from '../styles/font'

const IntroWrapper = styled.div`
  height: 100vh;
  // margin: 0;
  padding: 0;
  // padding-top: 5rem;
  // background: linear-gradient(#0A0A0A, var(--background));
  // background-color: #F00;
`

const Overlay = styled.div`
  position: relative;
  // display: none;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #0A0A0A;
  opacity: ${props => props.opacity || 0};
  z-index: 998;
  // cursor: pointer;  
`

const Content = styled.div`
  position: relative;
  top: -100vh;
  left: 0;
  padding: calc(12vw + 3rem) 0 0 3rem;
`

const Heading = styled.h1`
  overflow: hidden;
  font-size: max(11.5vw, 5rem);
  margin: 0;
  color: var(--text);
  background: transparent;
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: var(--text);
  text-transform: uppercase;
  ${NORTH_CAROSSELA}
`

const Intro = ({ overlayOpacity }) => {

  return (
      <IntroWrapper>
        <Overlay opacity={overlayOpacity}/>
        <Content>
          <Heading>Hello 👋</Heading>
        </Content>
      </IntroWrapper>
  );
};

export default Intro;