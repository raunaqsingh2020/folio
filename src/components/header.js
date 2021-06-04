import React from 'react'
import styled from 'styled-components'

import gsap from 'gsap'

import { Wave } from "react-animated-text";

import { motion, useViewportScroll, useTransform } from "framer-motion"
import { Fade, AttentionSeeker, Zoom } from "react-awesome-reveal";

import {
  SANGBLEU,
} from '../styles/font'

const SectionWrapper = styled.div`
  //height: calc(100vh - 5.4rem);
  width: 100%;
  margin: 7rem 0rem 5rem 0rem;
  //padding: 2rem 1rem 0rem 1rem;
  //margin-top: 30px;
  //padding-top: 30px;
  background-color: transparent;
  z-index: 10;
`

const Heading = styled.h1`
  width: 100%;
  height: 15vw;
  //opacity: 0.4;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 0;
  text-align: center;
  text-transform: uppercase;
  font-size: 14.3vw;
  //line-height 14.3vw;
  //white-space: pre;
  z-index: 10;
  color: var(--text);
  background: transparent;
  ${SANGBLEU}
`
const Header = () => {

  const line1 = "Creative"
  const line2 = "Developer"

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
      <SectionWrapper>
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
      </motion.h1>
      </Fade>
      </SectionWrapper>
  );
};

export default Header;