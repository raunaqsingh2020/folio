import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { ThemeProvider, NavBar, SEO, Fluid, SideBar, ScrollIndicator } from "@components"
import { GlobalStyle } from "@styles"
import { Fade } from "react-awesome-reveal";
import { Curtains } from 'react-curtains';

import styled from "styled-components"
import { media } from '@styles';


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

const Container = styled.header`
  padding-left: 10rem;
  ${media.desktop`padding-left: 0rem`};
`

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
                    <Container>
                      <NavBar/>
                      <SideBar/>
                      <ScrollIndicator/>
                      {children}
                    </Container>
                </>
          </ThemeProvider>
        </>
      )}
    />
  );
};

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default Layout
