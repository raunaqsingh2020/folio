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

import { Path } from 'three';

const SectionWrapper = styled.div`
  background-color: transparent;
`

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  padding: 5rem 0rem 0 0rem;
  z-index: 10;
  // background-color: #f00;
`

const HeaderText = styled.text`
  position: relative;
  display: flex;
  overflow: hidden;
  margin: 0;
  left: ${props => props.left || '0'};
  font-size: 22.5vw;
  // height: 20vw;
  z-index: 100;
  color: var(--text);
  text-transform: uppercase;
  // background-color: red;
  ${NORTH_CAROSSELA}
`

const PathText = styled.text`
  overflow: hidden;
  margin: 0;
  font-size: 175rem;
  z-index: 100;
  color: var(--text);
  text-transform: uppercase;
  ${NORTH_CAROSSELA}
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

class HeaderItem extends React.Component {

  constructor(props){
    super(props);

    this.onScroll = this.onScroll.bind(this);
    // this.updateTextPathOffset = this.updateTextPathOffset.bind(this);

    this.textContainerRef = React.createRef();
    this.textCurveRef = React.createRef();
    this.textPathRef = React.createRef();
  }

  // updateTextPathOffset(offset){
  //   this.textPathRef.current.setAttribute('startOffset', offset); 
  // }

  onScroll(){
    var textPathRefClone = this.textPathRef;
    requestAnimationFrame(function(){
      // console.log(window.pageYOffset);
      textPathRefClone.current.setAttribute('startOffset', 90 * window.pageYOffset); 
    });
  }

  componentDidMount(){
    //this.pathLength = this.textCurveRef.current.getTotalLength();
    this.textPathRef.current.setAttribute('startOffset', 1000);
    window.addEventListener('scroll', this.onScroll);
  }

  render(){
    return (
      <>
        <svg ref={this.textContainerRef} xmlns="http://www.w3.org/2000/svg" viewBox={this.props.viewBox}>
          <path ref={this.textCurveRef} id="text-curve" fill="none" d={this.props.path} stroke="#000" stroke-width="4"/>
          <PathText>
            <textPath ref={this.textPathRef} href={"#text-curve"}>
              {this.props.text}
            </textPath>
          </PathText>
        </svg>
      </>
    );;
  }
}

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

  const { scrollYProgress } = useViewportScroll()
  const shiftRight = useTransform(scrollYProgress, [0, 1], [0, 500])
  const shiftLeft = useTransform(scrollYProgress, [0, 1], [0, -500])

  return (
      <HeaderWrapper>
        {/* <Fade duration={2000} triggerOnce>
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
        </Fade> */}

        {/* <HeaderItem text="Singh" viewBox="0 0 12196 2607" path="M0 2587h9922c2030.7 0 1952.5-474 2190.1-2077l31.4-238 33-269.5"/> */}
        <motion.div
          style={{
            x: shiftRight,
          }}
        >
          <HeaderText left={'-9.5vw'}>Raunaq</HeaderText>
        </motion.div>
        <motion.div
          style={{
            x: shiftLeft,
          }}
        >
          <HeaderText left={'6vw'}>Singh</HeaderText>
        </motion.div>
        <motion.div
          style={{
            x: shiftRight,
          }}
        >
          <HeaderText left={'-5vw'}>Developer</HeaderText>
        </motion.div>
        <motion.div
          style={{
            x: shiftLeft,
          }}
        >
          <HeaderText left={'7vw'}>Designer</HeaderText>
        </motion.div>

      </HeaderWrapper>
  );
};

export default Header;