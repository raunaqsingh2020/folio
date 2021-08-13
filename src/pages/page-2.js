import * as React from "react"
import { Helmet } from 'react-helmet'
import { Link } from "gatsby"

//import Layout from "../components/layout"
import Seo from "../components/seo"
import { Header, Layout } from '@components';

const SecondPage = () => (
  <>
    <Helmet title="Page-2"/>
    <Header/>
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <Link to="/">Go back to the homepage</Link>
  </>
  // <Layout>
  //   <Seo title="Page two" />
  //   <h1>Hi from the second page</h1>
  //   <p>Welcome to page 2</p>
  //   <Link to="/">Go back to the homepage</Link>
  // </Layout>
)

export default SecondPage
