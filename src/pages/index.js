import React from 'react'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

import { motion } from "framer-motion"
import { Fade, AttentionSeeker, Zoom } from "react-awesome-reveal";

import NavBar from "../components/navbar"

import { ThemeProvider, Header, Layout, Fluid } from '@components';
import { GlobalStyle } from '@styles';

const IndexPage = () => {
  return (
    <>
        <Header/>
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
