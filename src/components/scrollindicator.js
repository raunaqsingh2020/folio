import React from "react"
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
  z-index: 999;
  display: flex;
  flex-direction: column;
  background-color: var(--text);
  border-radius: 10px;
  opacity: 0.8;
`

export const Indicator = styled.div`
  position: relative;
  height: 30px;
  width: 4px;
  left: -1px;
  z-index: 999;
  background-color: var(--background);
  transition: background-color 0.4s ease-out;
  ${REEM_KUFI}
`

const ScrollIndicator = () => {
  const { scrollYProgress } = useViewportScroll()
  const location = useTransform(scrollYProgress, [0, 1], [0, 70])

  return (
    <>
        <Container
        data-scroll
        data-scroll-sticky
        data-scroll-target="#page_container"
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
        </Container>
    </>
  )
}

export default ScrollIndicator
