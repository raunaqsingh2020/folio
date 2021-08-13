import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { motion, useViewportScroll, useTransform } from "framer-motion"

import { ThemeContext, Toggle } from "./"
import { FEDERO, REEM_KUFI, DANUBE, BOGART_SEMIBOLD } from "../styles/font"

import { media } from '@styles';

const Container = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  height: 100px;
  width: 2px;
  z-index: 500;
  display: flex;
  flex-direction: column;
  background-color: var(--text);
  border-radius: 10px;
  opacity: ${props => props.opacity || 0};
  transition: opacity 0.8s;
`

export const Indicator = styled.div`
  position: relative;
  height: 25px;
  width: 2px;
  left: 0px;
  z-index: 500;
  background-color: var(--background);
  transition: background-color 0.4s ease-out;
  ${REEM_KUFI}
`

const TopBar = styled.div`
  position: fixed;
  top: calc(100% - 124px);
  right: 24px;
  //height: 100px;
  height: ${props => props.inputHeight || '0px'};
  width: 2px;
  z-index: 500;
  display: flex;
  flex-direction: column;
  background-color: var(--text);
  border-radius: 10px;
  opacity: ${props => props.opacity || 0};
  transition: opacity 0.8s;
`

const BottomBar = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  //height: 100px;
  height: ${props => props.inputHeight || '0px'};
  width: 2px;
  z-index: 500;
  display: flex;
  flex-direction: column;
  background-color: var(--text);
  border-radius: 10px;
  opacity: ${props => props.opacity || 0};
  transition: opacity 0.8s;
`


const ScrollIndicator = ( {opacity} ) => {
  // const { scrollYProgress } = useViewportScroll()
  // const location = useTransform(scrollYProgress, [0, 1], [0, 70])
  // const height = useTransform(scrollYProgress, [0, 1], [0, 75])

  const [topHeight, setTopHeight] = useState('0px');
  const [bottomHeight, setBottomHeight] = useState('75px');

  const onScroll = (ev) => {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height);

    setTopHeight((scrolled * 75).toString() + 'px');
    setBottomHeight((75 - scrolled * 75).toString() + 'px');
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // console.log(topHeight);

  return (
    <>
        {/* <Container
          data-scroll
          data-scroll-sticky
          data-scroll-target="#page_container"
          opacity={opacity}
        >
          <motion.div
            style={{
                y: location,
            }}
            // transition={{ type: "spring", stiffness: 100 }}
            transition={{ delay: 1 }}
          >
            <Indicator/>
          </motion.div>
        </Container> */}
        {/* <motion.div
            style={{
                // height: height,
            }}
            // transition={{ type: "spring", stiffness: 100 }}
            transition={{ delay: 1 }}
          >
            <TopBar/>
        </motion.div> */}
        <TopBar inputHeight={topHeight} opacity={opacity}/>
        <BottomBar inputHeight={bottomHeight} opacity={opacity}/>
    </>
  )
}

export default ScrollIndicator
