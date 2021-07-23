import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { motion, useViewportScroll, useTransform } from "framer-motion"

import { ThemeContext, Toggle } from "./"
import { FEDERO, REEM_KUFI, JOSEFIN_SANS, SPACE_LIGHT, DANUBE, BOGART_SEMIBOLD } from "../styles/font"

import { media } from '@styles';

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 10rem;
  z-index: 999;
  display: flex;
  flex-direction: column;
  background-color: transparent;
//   border-style: solid;
//   border-width: 0px 1.5px 0px 0px;
//   border-color: var(--text);
  align-items: flex-end;
  padding-top: 13rem;
  ${media.desktop`display: none`};
`

export const SectionWrapper = styled(Link)`
  text-align: center;
  text-transform: lowercase;
  text-decoration: none;
  width: fit-content;
  font-size: 0.95rem;
  line-height 0.95rem;
  color: var(--text);
  // background: #f00;
  margin-bottom: 15px;
  margin-right: 25px;
  ${SPACE_LIGHT}
`

const SideBar = () => {
  
  return (
    <Container
      data-scroll
      data-scroll-sticky
      data-scroll-target="#page_container"
    >
        <SectionWrapper to="/">skills</SectionWrapper>
        <SectionWrapper to="/">projects</SectionWrapper>
        <SectionWrapper to="/">about</SectionWrapper>
        <SectionWrapper to="/">contact</SectionWrapper>
    </Container>
  )
}

export default SideBar
