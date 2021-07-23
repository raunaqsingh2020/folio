import React from 'react'
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
} from '../styles/font'

const SectionWrapper = styled.div`
  background-color: #00f;
`

const HeaderWrapper = styled.div`
  height: 84vh;
  margin: 0rem 0rem 0rem 0rem;
  display: flex;
  // align-items: center;
  padding-top: 6rem;
  z-index: 10;
  background-color: transparent;
  ${media.desktop`justify-content: center; padding-top: 9rem; height: 77.5vh`};
  @media (max-height: 500px) {
    height: 500px;
  }
`

const Heading = styled.h1`
  position: relative;
  height: 14.5vw;
  display: flex;
  align-items: center;
  overflow: hidden;
  font-size: 15.5vw;
  margin: 0;
  margin-left: 2vw;
  z-index: 100;
  color: var(--text);
  background: transparent;
  opacity: 0.83;
  ${BOGART_SEMIBOLD}
  ${media.desktop`font-size: 19vw; height: 17.6vw; margin-left: 0`};
`

const BackgroundImage = styled.div`
  height: 43vw;
  width: 35vw;
  position: relative;
  margin-left: auto;
  right: 10vw;
  top: -32.5vw;
  z-index: 10;
  background-image: url(${withBackground});
  background-repeat: no-repeat;
  background-size: cover;
  ${media.desktop`right: 15vw; top: -38vw; height: 49vw; width: 40vw;`};
`

const Headshot = styled.div`
  height: 43vw;
  width: 35vw;
  position: relative;
  margin-left: auto;
  right: 10vw;
  top: -75.5vw;
  z-index: 999;
  opacity: 0;
  background-image: url(${outline});
  background-repeat: no-repeat;
  background-size: cover;
  transition: opacity 0.2s ease-out;
  &:hover {
    opacity: 1;
  }
  ${media.desktop`right: 15vw; top: -87vw; height: 49vw; width: 40vw;`};
`

const Header = () => {

  const line1 = "creative"
  const line2 = "developer"

  const line = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0,
        staggerChildren: 0.06,
        ease: "easeOut",
      }
    },
  }

  const letter = {
    hidden: { opacity: 0, y: "55%" },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
      }
    }
  }

  return (
      <HeaderWrapper>
        <Fade duration={2000} triggerOnce>
          <motion.h1
            variants={line}
            initial="hidden"
            animate="visible"
          >

            <Heading>
            {line1.split("").map((char, index) => {
              return (
                <motion.div key={char + "-" + index} variants={letter}>
                  {char}
                </motion.div>
              )
            })}
            </Heading>
            
            <Heading>
            {line2.split("").map((char, index) => {
              return (
                <motion.div key={char + "-" + index} variants={letter}>
                  {char}
                </motion.div>
              )
            })}
            </Heading>

            <BackgroundImage/>

            <Headshot/>

          </motion.h1>
        </Fade>
      </HeaderWrapper>
  );
};

export default Header;