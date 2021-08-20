import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import gsap from 'gsap'
import useRandomInterval from '../utils/useRandomInterval'

import { media } from "@styles"

import {
    NORTH_CAROSSELA,
    POPPINS_LIGHT,
    POPPINS_MEDIUM
} from '../styles/font'

const LoadingWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  background: var(--background);
  z-index: 9999;
  text-align: center;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(var(--rgbShadow), 0.4) 0px 0px 10px 4px;
//   border-bottom: 1px solid rgba(var(--rgbShadow), 1);
`

const TextWrapper = styled.div`
  overflow: hidden;
`

const LoadingText = styled.h1`
  font-size: max(5.5vw, 3.0rem);
  overflow: hidden;
  color: var(--text);
  text-transform: uppercase;
  margin: 0;
  padding: 0;
  ${NORTH_CAROSSELA}
`

const ProgressText = styled.h1`
  font-size: max(3.5vw, 2.0rem);
  overflow: hidden;
  color: var(--text);
  text-transform: uppercase;
  margin: 0;
  ${NORTH_CAROSSELA}
`

const Loading = ({ setIsLoading }) => {

    const loadingWrapper = useRef(null);
    const loadingText = useRef(null);
    const progressText = useRef(null);

    const [percent, setPercent] = useState(0);

    let delay = [10, 30];
    if (percent < 75) {
        delay = [10, 20];
    } else if (percent < 90) {
        delay = [30, 80];
    } else if (percent < 97) {
        delay = [80, 120];
    } else {
        delay = [140, 280];
    }

    useEffect(() => {
        if (percent === 100) {
            // gsap.timeline()
            gsap.to(loadingText.current,
                {
                    y: "-100%",
                    ease: 'power4.in',
                    duration: 1.1,
                    delay: 0.4
                })
            gsap.to(progressText.current,
                {
                    y: "-100%",
                    ease: 'power4.in',
                    duration: 1.1,
                    delay: 0.5
                })
            gsap.to(loadingWrapper.current,
                {
                    height: 0,
                    top: '-5px',
                    ease: 'power4.inOut',
                    delay: 1.6,
                    duration: 1,
                    onComplete: () => setIsLoading(false),
                },
            );
        }
    }, [percent, loadingWrapper, loadingText, setIsLoading]);

    useRandomInterval(() => percent < 100 && setPercent(percent => percent + 1), ...delay);

    return (
        <LoadingWrapper ref={loadingWrapper}>
            <TextWrapper>
                <LoadingText ref={loadingText}>LOADING</LoadingText>
            </TextWrapper>
            <TextWrapper>
                <ProgressText ref={progressText}>{percent}%</ProgressText>
            </TextWrapper>
        </LoadingWrapper>
    );
};

export default Loading;