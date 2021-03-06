import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { motion, useViewportScroll, useTransform } from "framer-motion"

import { ThemeContext, Toggle } from "./"
import { NORTH_CAROSSELA, REEM_KUFI, DANUBE, BOGART_SEMIBOLD, POPPINS_LIGHT, POPPINS_MEDIUM } from "../styles/font"

import { media } from "@styles"
import { NoToneMapping } from "three"

const Container = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  visibility: ${props => props.display || "hidden"};
  // opacity: ${props => props.opacity || 0};
  // transition: visibility 0.8s, opacity 0.8s;
  mix-blend-mode: difference;
  // background: #f00;
`

const NavBarWrapper = styled.div`
  display: flex;
  // justify-content: space-between;
  align-items: center;
  background-color: transparent;
  padding: 1rem 1rem 0rem 1rem;
`

const SectionWrapper = styled.div`
  display: flex;
  width: 165px;
  margin-top: -2px;
  margin-left: 35px;
  justify-content: space-between;
  align-items: center;
  opacity: 1;
  transition: opacity 0.2s;
  ${media.phablet`opacity: 0;`};
`

export const SectionLink = styled.text`
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  font-size: 0.75rem;
  line-height 0.75rem;
  color: white;//var(--text);
  cursor: pointer;
  ${NORTH_CAROSSELA}
`

// export const SectionLink2 = styled(Link)`
//   text-align: center;
//   text-transform: uppercase;
//   text-decoration: none;
//   font-size: 0.75rem;
//   line-height 0.75rem;
//   color: white;//var(--text);
//   cursor: pointer;
//   ${NORTH_CAROSSELA}
// `

export const SVGFill = styled.g`
  fill: white;//var(--text);
`

export const ThemeWrapper = styled(Link)`
  display: block;
  right: 0;
  margin-top: -0.5rem;
  margin-left: auto;
  margin-right: 0;
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

const NavBar = ({ opacity, display }) => {
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  const { scrollYProgress } = useViewportScroll()
  const rotation = useTransform(scrollYProgress, [0, 1], [0, 230])

  const scrollToTop = () => {
    window.scrollTo(0,0);
  }

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView(true);
  }

  return (
    <Container
      data-scroll
      data-scroll-sticky
      data-scroll-target="#page_container"
      opacity={opacity}
      display={display}
    >
      <NavBarWrapper>
        
        <button onClick={scrollToTop} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
          <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
          width="15.0pt" height="12.3pt" viewBox="0 0 206.000000 169.000000"
          preserveAspectRatio="xMidYMid meet">
            <SVGFill transform="translate(0.000000,169.000000) scale(0.100000,-0.100000)"
            fill="#ffffff" stroke="none">
              <path d="M830 1545 l145 -145 262 0 263 0 48 -29 c63 -39 88 -76 101 -146 13
              -70 3 -115 -38 -172 -31 -42 -117 -93 -158 -93 -13 0 -23 -4 -23 -8 0 -12 215
              -222 227 -222 21 0 106 65 154 119 27 31 65 85 82 121 32 64 32 67 32 215 0
              145 -1 152 -29 209 -46 94 -143 189 -244 239 l-85 42 -261 7 c-144 3 -342 7
              -441 7 l-180 1 145 -145z"/>
              <path d="M343 1372 c-8 -5 210 -230 650 -670 l662 -662 198 2 197 3 -667 668
              -668 667 -180 0 c-99 0 -185 -4 -192 -8z"/>
              <path d="M102 179 l-102 -129 705 0 c388 0 705 4 705 8 0 4 -56 63 -123 130
              l-124 122 -479 -1 -479 0 -103 -130z"/>
            </SVGFill>
          </svg>
        </button>

        <SectionWrapper>
          <SectionLink onClick={() => scrollToSection("projects")}>Projects</SectionLink>
          <SectionLink onClick={() => scrollToSection("about")}>About</SectionLink>
          {/* <SectionLink2 to="#contact">contact</SectionLink2> */}
          <SectionLink onClick={() => scrollToSection("contact")}>Contact</SectionLink>
        </SectionWrapper>

          <ThemeWrapper>
            <motion.div
              style={{
                rotate: rotation,
              }}
            >
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
            </motion.div>
          </ThemeWrapper>

      </NavBarWrapper>
    </Container>
  )
}

export default NavBar
