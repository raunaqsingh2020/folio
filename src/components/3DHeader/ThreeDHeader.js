import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

import Scene1 from "./Scene1"
import { Canvas, useFrame } from '@react-three/fiber'
import { useProgress, Html } from '@react-three/drei'

import headerVid from '@images/headerVid.mp4';

import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile
} from "react-device-detect";

const StickyWrapper = styled.div`
  overflow: hidden;
  .sticky {
    background: #0A0A0A;
    width: 100%;
    height: 100vh;
    z-index: 5000;
  }
  box-shadow: rgba(var(--rgbShadow), 0.4) 0px 0px 10px 4px;
  z-index: 5000;
`;

const SceneContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  //top: 0;
  padding: 0;
  margin: 0;
`

const VideoContainer = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 0;
  margin: 0;
  background: #0A0A0A;
  display: flex;
  align-items: center;
  justify-content: center;
`

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      {/* <span style={{ color: '#FFFFFF' }}>{progress} % loaded</span> */}
      <span>LOADING</span>
    </Html>
  )
}

const ThreeDHeader = ({ sceneRef }) => (
  <>
    <MobileView>
      {/* <VideoContainer>
        <video autoPlay loop muted playsInline width="100%">
            <source src={headerVid} type='video/mp4' />
        </video>
      </VideoContainer> */}
      <SceneContainer ref={sceneRef}>
        <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
          <color attach="background" args={['#0A0A0A']} />
          <Suspense fallback={<Loader />}>
            <Scene1 />
          </Suspense>
          <ambientLight intensity={0.6} color={'#FFF'} />
        </Canvas>
      </SceneContainer>
    </MobileView>

    <BrowserView>
      <StickyWrapper>
        <Controller>
          <div>
            <Scene
              triggerHook="onLeave"
              duration={2900}
              pin
            >
              {(progress) => (
                <div className="sticky">
                  <Timeline totalProgress={progress} paused>
                    <SceneContainer ref={sceneRef}>
                      <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
                        <color attach="background" args={['#0A0A0A']} />
                        <Suspense fallback={<Loader />}>
                          <Scene1 />
                        </Suspense>
                        <ambientLight intensity={0.6} color={'#FFF'} />
                      </Canvas>
                    </SceneContainer>
                  </Timeline>
                </div>
              )}
            </Scene>
          </div>
        </Controller>
      </StickyWrapper>
    </BrowserView>
  </>
);

export default ThreeDHeader;
