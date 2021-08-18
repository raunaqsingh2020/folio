import React, { useEffect, useState } from "react"
import styled from "styled-components"

const TopBar = styled.div`
  position: fixed;
  top: calc(100% - 124px);
  right: 24px;
  height: ${props => props.inputHeight || '0px'};
  width: 2px;
  z-index: 500;
  display: flex;
  flex-direction: column;
  background-color: white;//var(--text);
  border-radius: 10px;
  opacity: ${props => props.opacity || 0};
  transition: opacity 0.8s;
  mix-blend-mode: difference;
`

const BottomBar = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  height: ${props => props.inputHeight || '0px'};
  width: 2px;
  z-index: 500;
  display: flex;
  flex-direction: column;
  background-color: white;//var(--text);
  border-radius: 10px;
  opacity: ${props => props.opacity || 0};
  transition: opacity 0.8s;
  mix-blend-mode: difference;
`


const ScrollIndicator = ( {opacity} ) => {

  const [topHeight, setTopHeight] = useState('0px');
  const [bottomHeight, setBottomHeight] = useState('75px');

  const onScroll = (ev) => {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height);

    setTopHeight((scrolled * 75).toString() + 'px');
    setBottomHeight((75 - scrolled * 75).toString() + 'px');
  }

  useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
        <TopBar inputHeight={topHeight} opacity={opacity}/>
        <BottomBar inputHeight={bottomHeight} opacity={opacity}/>
    </>
  )
}

export default ScrollIndicator
