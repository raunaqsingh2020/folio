import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { ThemeProvider, NavBar, SEO, Fluid } from "@components"
import { GlobalStyle } from "@styles"
import { Fade } from "react-awesome-reveal";
import { Curtains } from 'react-curtains';

// const variants = {
//   initial: {
//     opacity: 0,
//   },
//   enter: {
//     opacity: 1,
//     transition: {
//       duration: 0.5,
//       delay: 0.5,
//       when: 'beforeChildren',
//     },
//   },
//   exit: {
//     opacity: 0,
//     transition: { duration: 0.5 },
//   },
// };

const Layout = ({ children, location }) => {
  return (
    <StaticQuery
      query={graphql`
        query SeoQuery {
          site {
            siteMetadata {
              title
              description
              image
            }
          }
        }
      `}
      render={site => (
        <>
          <SEO metadata={site.site.siteMetadata}/>
          <ThemeProvider>
            <GlobalStyle />
                <>
                  {/* <Fade triggerOnce duration={1500} style={{ zIndex: 2000 }}> */}
                    <NavBar/> 
                  {/* </Fade> */}
                  {/* <Curtains
                    pixelRatio={Math.min(1.5, window.devicePixelRatio)}
                  >
                    <Fluid> */}
                    {children}
                    {/* </Fluid>
                  </Curtains> */}
                </>
          </ThemeProvider>
        </>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
