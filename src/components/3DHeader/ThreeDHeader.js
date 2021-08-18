import React, { Suspense } from 'react';
import styled from 'styled-components';
import { Controller, Scene } from 'react-scrollmagic';
import { Tween, Timeline } from 'react-gsap';

import Scene1 from "./Scene1"
import { Canvas, useFrame } from '@react-three/fiber'
import { useProgress, Html } from '@react-three/drei'

import { NORTH_CAROSSELA } from "../../styles/font"

const StickyWrapper = styled.div`
  overflow: hidden;
  .sticky {
    background: black;
    width: 100%;
    height: 100vh;
    z-index: 5000;
  }
  box-shadow: rgba(var(--rgbShadow), 0.4) 0px 0px 10px 4px;
  // padding: 0;
  // margin: 0;
  // background: #F00;
  // border-bottom: 5px solid yellow;
  z-index: 5000;
`;

const SceneContainer = styled.div`
  height: 100vh;
  width: 100vw;
  position: absolute;
  padding: 0;
  margin: 0;
  // box-shadow: rgba(0, 0, 0, 0.28) 0px 0px 3px 3px;
`

const Temp = styled.div`
  height: 340px;
  width: 100vw;
  //background-color: var(--background);
  background-color: blue;
  position: absolute;
  // box-shadow: rgba(255, 255, 255, 0.14) 0px 1px;
  // padding: 5rem;
  // margin-bottom: 5rem;
  // z-index: 300;
`

function Loader() {
  const { progress } = useProgress()
  return (
    <Html center>
      <span style={{ color: '#FFFFFF' }}>{progress} % loaded</span>
    </Html>
  )
}

// const ThreeDHeader = ({ sceneRef }) => (
//   <StickyWrapper>
//     <Controller>
//       {/* <div> */}
//         <Scene
//           triggerHook="onLeave"
//           duration={3470}
//           pin
//         >
//           {(progress) => (
//             <div className="sticky">
//               <Temp>
//                   <span>HELLO</span><br/>
//                   <span>HELLO</span><br/>
//                   <span>HELLO</span><br/>
//                   <span>HELLO</span><br/>
//                   <span>HELLO</span><br/>
//                   <span>HELLO</span><br/>
//                   <span>HELLO</span><br/>
//                   <span>HELLO</span><br/>
//                   <span>HELLO</span><br/>
//                   <span>HELLO</span><br/>
//                   <span>HELLO</span><br/>
//                   <span>HELLO</span><br/>
//               </Temp>
//               <Timeline totalProgress={progress} paused>
//                 <Scene
//                   triggerHook="onLeave"
//                   offset={2920}
//                   duration={550}
//                   pin
//                 >
//                   {(progress2) => (
//                     <Timeline totalProgress={progress2} paused>
//                       <Tween
//                         from={{ y: '0%' }}
//                         to={{ y: '-100%' }}
//                       >
//                         <SceneContainer ref={sceneRef}>
//                           <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
//                             <color attach="background" args={['#000']} />
//                             <Suspense fallback={<Loader/>}>
//                               <Scene1 />
//                             </Suspense>
//                             <ambientLight intensity={0.6} color={'#FFF'} />
//                           </Canvas>
//                         </SceneContainer>
//                       </Tween>
//                     </Timeline>
//                   )}
//                 </Scene>
//               </Timeline>
//             </div>
//           )}
//         </Scene>
//       {/* </div> */}
//     </Controller>
//   </StickyWrapper>
// );

const ThreeDHeader = ({ sceneRef }) => (
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
);

export default ThreeDHeader;
