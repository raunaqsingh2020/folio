import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"
import { ThemeProvider, NavBar, SEO, Fluid, SideBar, ScrollIndicator } from "@components"
import { GlobalStyle } from "@styles"
import { Fade } from "react-awesome-reveal";
import { Curtains } from 'react-curtains';

import styled from "styled-components"
import { media } from '@styles';

const Container = styled.div`
  
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
                      {/* <NavBar/> */}
                      {/* <SideBar/> */}
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

export default Layout
