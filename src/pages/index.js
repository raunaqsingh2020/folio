import React, { Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

import { motion } from "framer-motion"
import { Fade, AttentionSeeker, Zoom } from "react-awesome-reveal";

import Scene from "@components/3DHeader/Scene1"

import { AboutMe, Header, Layout, Fluid, Loading, Cube, ThemeContext } from '@components';

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useProgress, Html } from '@react-three/drei'

const SceneContainer = styled.div`
  height: 100vh;
`

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <span style={{ color: '#FFFFFF' }}>{progress} % loaded</span>
    </Html>
  )
}

const IndexPage = () => {

  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text')
  const { colorMode, setColorMode } = React.useContext(ThemeContext)

  //concurrent shadowMap

  return (
    <>
        <SceneContainer>
          <Canvas camera={{ position: [0, 0, 8], fov: 70 }}>
            {/* <color attach="background" args={['#000']} /> */}
            <Suspense fallback={<Loader />}>
              <Scene theme={colorMode}/>
            </Suspense>
            <ambientLight intensity={0.4} />
          </Canvas>
        </SceneContainer>
        <AboutMe/>
    </>
  )
}

export default IndexPage

// import * as React from "react"
// import { Link } from "gatsby"
// import { StaticImage } from "gatsby-plugin-image"

// import Layout from "../components/layout"
// import Seo from "../components/seo"

// const IndexPage = () => (
//   <Layout>
//     <Seo title="Home" />
//     <h1>Hi people</h1>
//     <p>Welcome to your new Gatsby site.</p>
//     <p>Now go build something great.</p>
//     <StaticImage
//       src="../images/gatsby-astronaut.png"
//       width={300}
//       quality={95}
//       formats={["AUTO", "WEBP", "AVIF"]}
//       alt="A Gatsby astronaut"
//       style={{ marginBottom: `1.45rem` }}
//     />
//     <p>
//       <Link to="/page-2/">Go to page 2</Link> <br />
//     </p>
//   </Layout>
// )

// export default IndexPage
