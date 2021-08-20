import React from 'react'
import styled from 'styled-components'

import gsap from 'gsap'

import { Wave } from "react-animated-text";

import { motion, useViewportScroll, useTransform } from "framer-motion"

import Slide from 'react-reveal/Slide';
import Fade from 'react-reveal/Fade';

import { media } from "@styles"

import outline from '@images/outline.png';
import withBackground from '@images/withBackground.png';

import {
  NORTH_CAROSSELA,
  POPPINS_LIGHT
} from '../styles/font'

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 5rem;
  ${media.medium`flex-direction: column-reverse; height: fit-content`};
`

const OverflowWrapper = styled.div`
  overflow: hidden;
  height: min(43vw, 550px);
  width: min(32vw, 410px);
  position: absolute;
  top: 0;
  left: 0vw;
  ${media.medium`margin: auto; top: 0; left: 0; bottom: 0; right: 0; width: max(32vw, 250px); height: max(43vw, 336px);`};
`

const BackgroundImage = styled.div`
  height: min(43vw, 550px);
  width: min(32vw, 410px);
  position: absolute;
  top: 0;
  left: 0vw;
  z-index: 10;
  background-image: url(${withBackground});
  background-repeat: no-repeat;
  background-size: cover;
  ${media.medium`margin: auto; top: 0; left: 0; bottom: 0; right: 0; width: max(32vw, 250px); height: max(43vw, 336px);`};
`

const Headshot = styled.div`
  height: min(43vw, 550px);
  width: min(32vw, 410px);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 200;
  opacity: 0;
  background-image: url(${outline});
  background-repeat: no-repeat;
  background-size: cover;
  transition: opacity 0.2s ease-out;
  &:hover {
    opacity: 1;
  }
  ${media.medium`margin: auto; top: 0; left: 0; bottom: 0; right: 0; width: max(32vw, 250px); height: max(43vw, 336px);`};
`

const Title = styled.h1`
  display: flex;
  align-items: center;
  overflow: hidden;
  font-size: max(10.5vw, 6rem);
  margin: 0;
  color: var(--text);
  opacity: 0.84;
  text-transform: uppercase;
  ${NORTH_CAROSSELA}
  ${media.medium`font-size: max(14vw, 94px); height: max(15vw, 100px);`};
`

const TitleWrapper = styled.div`
  position: absolute;
  left: -8.2vw;
  top: 17vw;
  z-index: 100;
  ${media.medium`margin: auto; width: fit-content; height: fit-content; left: -17vw; top: -3.5vw; bottom: 0; right: 0;`};
`

const TitleSection = styled.div`
    position: relative;
    height: min(43vw, 550px);
    width: 47%;
    // background-color: #00f;
    ${media.desktop`width: 42%;`};
    ${media.medium`width: 100%; height: max(43vw, 336px);`};
`

const InfoSection = styled.div`
    position: relative;
    width: 53%;
    // background-color: #f0f;
    ${media.desktop`width: 58%;`};
    ${media.medium`width: 100%; height: max(43vw, 336px);`};
`

const InfoWrapper = styled.div`
  position: absolute;
  margin: auto; 
  width: 50%;
  //background-color: #ff0;
  left: 0;
  top: 12vw; 
  bottom: 0; 
  right: 4vw;
  ${media.medium`right: 0; width: max(32vw, 250px);`};
`

const Info = styled.p`
  font-size: max(1.2vw, 0.8rem);
  margin: 0;
  color: var(--text);
  white-space: pre-wrap;
  overflow: hidden;
  ${POPPINS_LIGHT}
`

const AboutMe = () => {

  const line1 = "about"
  const line2 = "singh"

  const line = {
    hidden: { opacity: 1, margin: 0 },
    visible: {
      opacity: 1,
      margin: 0,
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
        <InfoSection>
            <InfoWrapper>
                <Info> 
                  <Fade bottom cascade>
                    Hi, I'm Raunaq...{'\n'}God's greatest gift to humanity. Truly, I am the best.{'\n'}Amazing. Incredible. Inspiring.
                  </Fade>
                </Info>
            </InfoWrapper>
        </InfoSection>

        <TitleSection>
          <OverflowWrapper>
            <Slide left>
              <BackgroundImage/>
            </Slide>
            </OverflowWrapper>
            <Headshot/>
            <TitleWrapper>
                <Title>
                  <Fade bottom cascade>
                    ABOUT
                  </Fade>
                </Title>
            </TitleWrapper>
        </TitleSection>
    </SectionWrapper>
  );
};

export default AboutMe;