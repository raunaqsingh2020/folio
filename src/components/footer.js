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
  ${NORTH_CAROSSELA}
`

const PageEnd = styled.h1`
  flex: none;
	display: flex;
	justify-content: center;
	position: relative;
  overflow: hidden;
  font-size: max(2.8vw, 1.2rem);
  margin-top: min(23vw, 10rem);
  color: var(--text);
  background: transparent;
  text-transform: uppercase;
  ${NORTH_CAROSSELA}
`

const BackToTopWrapper = styled(motion.div)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  cursor: pointer;
  margin: 1rem 0 1rem 0;
`

const BackToTopText = styled(motion.h1)`
  display: inline-block;
  font-size: min(5.5vw, 3.8rem);
  color: var(--text);
  text-transform: uppercase;
  margin-right: 1.2vw;
  white-space: nowrap;
  ${NORTH_CAROSSELA}
`

const FooterWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 0rem 1.2rem 0rem 1.2rem;
  margin-bottom: 1rem;
`

export const FooterText = styled.text`
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  font-size: min(3vw, 1.2rem);
  //line-height 0.85rem;
  color: var(--text);
  ${NORTH_CAROSSELA}
`

const Footer = () => {

  // const { scrollYProgress } = useViewportScroll()
  // const shift = useTransform(scrollYProgress, [0, 1], [0, 1000])


  const scrollToTop = () => {
    window.scrollTo({
      top: 2,
      behavior: 'smooth',
    })
  }

  return (
      <>
        <PageEnd>You've Reached the End</PageEnd>
        {/* <button onClick={scrollToTop} style={{ background: 'none', border: 'none', cursor: 'pointer' }}> */}
        <BackToTopWrapper
          initial={{ x: '0' }}
          animate={{ x: '-85%' }}
          transition={{ duration: 16, ease: 'linear', repeat: Infinity, delay: 0 }}
          onClick={scrollToTop}
          // style={{ x: shift }}
        >
          <BackToTopText>BACK TO THE TOP ▲</BackToTopText>
          <BackToTopText>BACK TO THE TOP ▲</BackToTopText>
          <BackToTopText>BACK TO THE TOP ▲</BackToTopText>
          <BackToTopText>BACK TO THE TOP ▲</BackToTopText>
          <BackToTopText>BACK TO THE TOP ▲</BackToTopText>
          <BackToTopText>BACK TO THE TOP ▲</BackToTopText>
          <BackToTopText>BACK TO THE TOP ▲</BackToTopText>
          <BackToTopText>BACK TO THE TOP ▲</BackToTopText>
          <BackToTopText>BACK TO THE TOP ▲</BackToTopText>
          <BackToTopText>BACK TO THE TOP ▲</BackToTopText>
        </BackToTopWrapper>
        {/* </button> */}
        <FooterWrapper>
          <FooterText>39.95210˚N, 75.19308˚W</FooterText>
          <FooterText>©2021</FooterText>
        </FooterWrapper>
      </>
  );
};

export default Footer;