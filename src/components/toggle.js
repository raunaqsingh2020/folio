import React from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"

import lightModeImg from '@images/lightmode.png';
import darkModeImg from '@images/darkmode.png';

const LightMode = styled.div`
  background-image: url(${lightModeImg});
  background-repeat: no-repeat;
  background-size: cover;
`

const DarkMode = styled.div`
  background-image: url(${darkModeImg});
  background-repeat: no-repeat;
  background-size: cover;
`
  
const Toggle = ({ mode }) => {
    switch (mode) {
      case 'lightmode':
        return <LightMode/>;
      case 'darkmode':
        return <DarkMode/>;
      default:
        return <DarkMode/>;
    }
  };
  
  export default Toggle;