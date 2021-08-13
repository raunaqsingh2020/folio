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
  DAYS_ONE,
  SPACE_LIGHT,
  SPACE_REGULAR,
  LATO_REGULAR,
  NORTH_CAROSSELA
} from '../styles/font'

const SectionWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 5rem;
  ${media.medium`flex-direction: column-reverse; height: fit-content`};
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
  z-index: 999;
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
  font-size: min(12vw, 154px);
  height: min(12.7vw, 165px);
  margin: 0;
  color: var(--text);
  opacity: 0.84;
  text-transform: uppercase;
  ${NORTH_CAROSSELA}
  ${media.medium`font-size: max(14vw, 94px); height: max(15vw, 100px);`};
`

const TitleWrapper = styled.div`
  position: absolute;
  left: -6.2vw;
  top: 3vw;
  z-index: 100;
  ${media.medium`margin: auto; width: fit-content; height: fit-content; left: 0; top: -3.5vw; bottom: 0; right: 0;`};
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
  font-size: min(2.2vw, 24px);
  margin: 0;
  color: var(--text);
  white-space: pre-wrap;
  ${media.giant`font-size: min(2.2vw, 18px);`};
  ${media.medium`font-size: max(2.2vw, 14px);`};
  ${SPACE_LIGHT}
`

const AboutMe = () => {

  const line1 = "raunaq"
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
                    Hi, I'm Raunaq...{'\n'}{'\n'}God's greatest gift to humanity. Truly, I am the best. {'\n'}{'\n'}Amazing. Incredible. Inspiring.
                </Info>
            </InfoWrapper>
        </InfoSection>

        <TitleSection>
            <BackgroundImage/>
            <Headshot/>
            <TitleWrapper>
                {/* <Fade duration={2000} triggerOnce> */}
                <motion.h1
                    variants={line}
                    initial="hidden"
                    animate="visible"
                >
                    <Title>
                        {/* <Wave text={line1} iterations={1} delay={0.4} effect="verticalFadeIn" effectDirection="down" effectDuration={10} effectChange={0.5}/> */}
                    {/* {line1.split("").map((char, index) => {
                    return (
                        <motion.div key={char + "-" + index} variants={letter}>
                        {char}
                        </motion.div>
                    )
                    })} */}
                    {line1}
                    </Title>
                    
                    <Title>
                    {/* {line2.split("").map((char, index) => {
                    return (
                        <motion.div key={char + "-" + index} variants={letter}>
                        {char}
                        </motion.div>
                    )
                    })} */}
                    {line2}
                    </Title>
                </motion.h1>
                {/* </Fade> */}
            </TitleWrapper>
        </TitleSection>
    </SectionWrapper>
  );
};

export default AboutMe;