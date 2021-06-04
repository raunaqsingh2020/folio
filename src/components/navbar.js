import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { motion, useViewportScroll, useTransform } from "framer-motion"

import { ThemeContext, Toggle } from "./"
import { FEDERO, REEM_KUFI, DANUBE } from "../styles/font"

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  background-color: transparent;
`

const NavBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 1rem 1rem 0rem 1rem;
`

export const NameWrapper = styled(Link)`
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 0.75rem;
  line-height 0.75rem;
  color: var(--text);
  ${DANUBE}
`

export const MenuWrapper = styled(Link)`
  display: flex;
  flex-direction: row;
  z-index: 10;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 0.85rem;
  line-height 0.85rem;
  color: var(--text);
  ${REEM_KUFI}
  &:hover {
    color: var(--text);
  }
`

export const ThemeWrapper = styled(Link)`
  display: block;
  z-index: 999;
  label {
    cursor: pointer;
    input {
      display: none;
    }
  }
  div {
    width: 1rem;
    height: 1rem;
  }
`

const NavBar = () => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  const { scrollYProgress } = useViewportScroll()
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 100])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  return (
    <Container
      data-scroll
      data-scroll-sticky
      data-scroll-target="#page_container"
    >
      <NavBarWrapper>
        <MenuWrapper to="/page-2">Menu</MenuWrapper>
        <NameWrapper to="/">Raunaq Singh</NameWrapper>
        <motion.div
          style={{
            rotate: rotation,
            //scale: scale,
          }}
        >
          <ThemeWrapper>
            <label>
              <input
                type="checkbox"
                onChange={ev => {
                  setColorMode(ev.target.checked ? "dark" : "light")
                }}
                checked={colorMode === "dark"}
              />
              {colorMode === "dark" ? (
                <Toggle mode="lightmode" />
              ) : (
                <Toggle mode="darkmode" />
              )}
            </label>
          </ThemeWrapper>
        </motion.div>
      </NavBarWrapper>
    </Container>
  )
}

export default NavBar
