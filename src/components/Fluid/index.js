import React, { useRef, useState, useEffect } from "react";
import { Curtains, ShaderPass, PingPongPlane, useCurtains, useCurtainsEvent } from "react-curtains";
import { Vec2 } from "curtainsjs";
import { ripplesVs, ripplesFs, renderFs } from "../shaders";

import "./index.css";

function Fluid({children}) {

  const mouse = {
    last: useRef(new Vec2()),
    current: useRef(new Vec2()),
    velocity: useRef(new Vec2()),
    updateVelocity: useRef(false),
    lastTime: useRef(null),
  };

  //RIPPLES

  const ripplesUniforms = {
    mousePosition: {
      name: "uMousePosition",
      type: "2f",
      value: mouse.current.current,
    },
    // our velocity
    velocity: {
      name: "uVelocity",
      type: "2f",
      value: mouse.velocity.current,
    },
    // window aspect ratio to draw a circle
    resolution: {
      name: "uResolution",
      type: "2f",
      value: new Vec2(),//new Vec2(curtainsBBox.width, curtainsBBox.height),
    },
    pixelRatio: {
      name: "uPixelRatio",
      type: "1f",
      value: 0,//curtains.pixelRatio,
    },
    time: {
      name: "uTime",
      type: "1i",
      value: -1,
    },
    viscosity: {
      name: "uViscosity",
      type: "1f",
      value: 10.75,
    },
    speed: {
      name: "uSpeed",
      type: "1f",
      value: 6.75,
    },
    size: {
      name: "uSize",
      type: "1f",
      value: 2,
    },
    dissipation: {
      name: "uDissipation",
      type: "1f",
      value: 0.9875,
    }
  };

  const [ripples, setRipples] = useState();

  useCurtains(
    (curtains) => {
      //console.log("TEST 1");
      if (ripples) {

        //console.log("TEST 2");

        mouse.velocity.current.set(curtains.lerp(mouse.velocity.current.x, 0, 0.05), curtains.lerp(mouse.velocity.current.y, 0, 0.1));
        ripples.uniforms.velocity.value = mouse.velocity.current.clone();
        ripples.uniforms.time.value++;

        //

        const curtainsBBox = curtains.getBoundingRect();
        ripples.uniforms.resolution.value = new Vec2(curtainsBBox.width, curtainsBBox.height)
        ripples.uniforms.pixelRatio.value = curtains.pixelRatio
      } else {
          console.log("AHHH!")
      }
    },
    [ripples]
  );

  const setRipplesSizes = (ripples) => {
    //console.log("TEST 3");
    const boundingRect = ripples.getBoundingRect();
    ripples.uniforms.resolution.value.set(boundingRect.width, boundingRect.height);
  };

  const onRipplesReady = (ripples) => {
    console.log("TEST 4");
    setRipples(ripples);
    console.log(ripples);
    setRipplesSizes(ripples);
  };

  // mouse move
  useEffect(() => {
    //console.log("USEFECT");
    const onMouseMove = (e) => {

        //console.log("TEST 5");

        if(ripples) {

            console.log("TEST 6");

            const mousePos = {
              x: e.targetTouches ? e.targetTouches[0].clientX : e.clientX,
              y: e.targetTouches ? e.targetTouches[0].clientY : e.clientY,
            };
    
            mouse.last.current.copy(mouse.current.current);
    
            mouse.updateVelocity.current = true;
    
            if(!mouse.lastTime.current) {
              mouse.lastTime.current = (performance || Date).now();
            }
    
            if(
              mouse.last.current.x === 0
              && mouse.last.current.y === 0
              && mouse.current.current.x === 0
              && mouse.current.current.y === 0
            ) {
              mouse.updateVelocity.current = false;
            }
    
            mouse.current.current.set(mousePos.x, mousePos.y);
    
            const webglCoords = ripples.mouseToPlaneCoords(mouse.current.current);
            ripples.uniforms.mousePosition.value = webglCoords;
    
            // divided by a frame duration (roughly)
            if(mouse.updateVelocity.current) {
              const time = (performance || Date).now();
              const delta = Math.max(14, time - mouse.lastTime.current);
              mouse.lastTime.current = time;
    
              mouse.velocity.current.set(
                (mouse.current.current.x - mouse.last.current.x) / delta,
                (mouse.current.current.y - mouse.last.current.y) / delta
              );
            }
          } else {
              console.log("YIKES!")
              console.log(ripples)
          }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onMouseMove, {
      passive: true
    });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onMouseMove, {
        passive: true
      });
    };
  }, []);


//   useCurtains(
//     (curtains) => {
//       const onMouseMove = (e) => {
//         console.log("MOVED!");
        
//       };

//       window.addEventListener("mousemove", onMouseMove);
//       window.addEventListener("touchmove", onMouseMove, { passive: true });

//       return () => {
//         window.removeEventListener("mousemove", onMouseMove);
//         window.removeEventListener("touchmove", onMouseMove, { passive: true });
//       };
//     },
//     []
//   );


  //RENDER PASS

  const renderPassUniforms = {
    resolution: {
      name: "uResolution",
      type: "2f",
      value: new Vec2(),//new Vec2(curtainsBBox.width, curtainsBBox.height),
    },
    hue: {
      name: "uHue",
      type: "1f",
      value: 4.28
    },
    saturation: {
      name: "uSaturation",
      type: "1f",
      value: 1.5
    },
    bgColor: {
      name: "uBgColor",
      type: "3f",
      value: [0, 255, 255]
    },
  };

  const [renderPass, setRenderPass] = useState();

  const setRenderPassSizes = (renderPass) => {
    //console.log("TEST 7");
    const boundingRect = renderPass.getBoundingRect();
    renderPass.uniforms.resolution.value.set(boundingRect.width, boundingRect.height);
  };

  const onRenderPassReady = (renderPass) => {
    //console.log("TEST 8");
    setRenderPass(renderPass);
    setRenderPassSizes(renderPass);
  };

  useCurtainsEvent(
    "onRender",
    (curtains) => {
      //console.log("TEST 9");
      if (renderPass) {
        //console.log("TEST 10");
        const curtainsBBox = curtains.getBoundingRect();
        renderPass.uniforms.resolution.value = new Vec2(curtainsBBox.width, curtainsBBox.height)
      }
    },
    [renderPass]
  );

  useEffect(() => {
    //console.log("TEST 11");
    if (ripples && renderPass) {
      console.log("TEST 12");
      renderPass.createTexture({
        sampler: "uRipplesTexture",
        fromTexture: ripples.getTexture()
      });
    }
  }, [ripples, renderPass]);

  return (
    <div className="Fluid">
      <PingPongPlane
        className="Ripples"
        sampler="uRipples"
        vertexShader={ripplesVs}
        fragmentShader={ripplesFs}
        uniforms={ripplesUniforms}
        texturesOptions={{ floatingPoint: "half-float" }}
        watchScroll={false}
        autoloadSources={false}
        onReady={onRipplesReady}
        onAfterResize={setRipplesSizes}
      >
      </PingPongPlane>
      <ShaderPass
        className="RenderPass"
        fragmentShader={renderFs}
        depth={false}
        uniforms={renderPassUniforms}
        onReady={onRenderPassReady}
        onAfterResize={setRenderPassSizes}
      ></ShaderPass>
    </div>
  );
}

export default Fluid;