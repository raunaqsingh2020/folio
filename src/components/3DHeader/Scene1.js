import React, { useEffect, useMemo, useRef, useState, useResource } from 'react'
import * as THREE from 'three'
import { useFrame, useThree } from '@react-three/fiber'
import { Text, Box, useMatcapTexture, Octahedron } from '@react-three/drei'
import { useTransform, useViewportScroll } from 'framer-motion';

import useSlerp from './use-slerp'
import useLayers from './use-layers'
import useRenderTarget from './use-render-target'

import { mirrorsData } from './data'

import NORTH_CAROSSELA from '../../styles/fonts/North-Carossela.otf'

const TEXT_PROPS = {
  textAlign: 'center',
  font: NORTH_CAROSSELA,
}

const titleWords = ["RAUNAQ", "SINGH", "DEVELOPER", "DESIGNER"];
var titleCopyWords = [];
for (let i = 0; i < 12; i++) {
  titleCopyWords.push(titleWords[Math.floor(Math.random() * titleWords.length)]);
}

function Title({ layers, ...props }) {
  const group = useRef()
  useEffect(() => {
    group.current.lookAt(0, -0.3, 0)
  }, [])

  const textRef = useLayers(layers)
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text')
  const { viewport } = useThree()
  var fontSize = 4.5;//Math.min(viewport.height/1.35, viewport.width/1.35)

  return (
    <group {...props} ref={group}>
      <Text ref={textRef} name="header" fontSize={fontSize} depthTest={false} material-toneMapped={false} material-color={textColor} {...TEXT_PROPS}>
        RAUNAQ{`\n`}SINGH{`\n`}DEVELOPER{`\n`}DESIGNER
      </Text>
    </group>
  )
}

function TitleCopy({ layers, text, ...props }) {
  const group = useRef()
  useEffect(() => {
    group.current.lookAt(0, 0, 0)
  }, [])

  const textRef = useLayers(layers)
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text')
  const { viewport } = useThree()
  var fontSize = 4.5;//Math.min(viewport.height/1.35, viewport.width/1.35)

  return (
    <group {...props} ref={group}>
      <Text ref={textRef} name="header" fontSize={fontSize} depthTest={false} material-toneMapped={false} material-color={textColor} {...TEXT_PROPS}>
        {text}
      </Text>
    </group>
  )
}

function Mirror({ sideMaterial, reflectionMaterial, args, layers, ...props }) {
  const ref = useLayers(layers)

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.001
      ref.current.rotation.z += 0.01
    }
  })

  return (
    <Box
      {...props}
      ref={ref}
      args={args}
      material={[sideMaterial, sideMaterial, sideMaterial, sideMaterial, reflectionMaterial, reflectionMaterial]}
    />
  )
}

function Mirrors({ envMap, layers, ...props }) {

  const [sideMaterial, setSide] = useState()
  const [reflectionMaterial, setReflection] = useState()

  return (
    <group name="mirrors" {...props}>
      {/* <meshLambertMaterial ref={setSide} map={thinFilmFresnelMap} color='#0F0' />
      <meshLambertMaterial ref={setReflection} map={thinFilmFresnelMap} envMap={envMap} /> */}
      <meshPhysicalMaterial 
        ref={setSide} 
        envMap={envMap} 
        color={'#000270'} 
        roughness={0}
        metalness={1}
      />
      <meshPhysicalMaterial 
        ref={setReflection} 
        envMap={envMap} 
        color={'#000270'} 
        roughness={0}
        metalness={1}
        opacity={0.90}
        transparent
      />
      {mirrorsData.mirrors.map((mirror, index) => (
        <Mirror
          key={`mirror-${index}`}
          layers={layers}
          {...mirror}
          name={`mirror-${index}`}
          sideMaterial={sideMaterial}
          reflectionMaterial={reflectionMaterial}
        />
      ))}
    </group>
  )

}

function TitleCopies({ layers }) {

  const vertices = useMemo(() => {
    const y = new THREE.IcosahedronGeometry(9)
    var vertices = []
    let pos = y.attributes.position; 
    for (var i = 0; i < y.getAttribute('position').count; i++) {
      vertices.push(new THREE.Vector3().fromBufferAttribute(pos, i));
    }
    
    return vertices
  }, [])

  const uniqueVertices = vertices.filter((e, i) => {
    return vertices.findIndex((x) => {
    return x.x == e.x && x.y == e.y && x.z == e.z;}) == i;
  });

  return (
    <group name="titleCopies">
      {uniqueVertices.map((vertex, i) => (
        <TitleCopy name={'titleCopy-' + i} position={vertex} text={titleCopyWords[i]} layers={layers} />
      ))}
    </group>
  )
}

function equation(x, x1, y1, x2, y2) {
  return ((y2 - y1) / (x2 - x1)) * (x - x1) + y1;
}

function Scene({ theme }) {
  const [cubeCamera, renderTarget] = useRenderTarget()

  const [matcapTexture] = useMatcapTexture('C8D1DC_575B62_818892_6E747B')

  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--mirrors')

  const { camera } = useThree();
  const [changed, setChanged] = useState(false);
  const scrollY = useRef(0);

  const scroll = (ev) => { // <-- DOM-EventListener
    
    scrollY.current += ev.deltaY * 0.01;

    if ((window.innerHeight + window.pageYOffset) < document.body.offsetHeight - 500) {
      scrollY.current += ev.deltaY * 0.01;
    }

    if (scrollY.current < 0) {
      scrollY.current = 0;
    }

    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;

    const { x, y } = camera.position;

    camera.position.lerp(new THREE.Vector3(x, y, 5-scrollY.current/3), 1);

    // console.log(
    //   `winScroll : ${winScroll},\nheight : ${height},\nscrolled : ${scrolled},\nposition.z : ${camera.position.z}`
    // );

  };

  useEffect(() => {
    window.addEventListener("wheel", scroll);
    return () => {
      window.removeEventListener("wheel", scroll);
    };
  }, [scroll, changed]);
  
  return (
    <>
      <group name="sceneContainer">
        <Octahedron layers={[11]} name="background" args={[20, 4, 4]} position={[0, 0, -5]}>
          {theme === "light" ? (
            <meshMatcapMaterial matcap={matcapTexture} side={THREE.BackSide} transparent opacity={1} color="#CCC"/>
          ) : (
            // <meshMatcapMaterial matcap={matcapTexture} side={THREE.BackSide} transparent opacity={1} color="#000"/>
            <meshMatcapMaterial matcap={matcapTexture} side={THREE.BackSide} transparent opacity={0.3} color="#FFFFFF"/>
          )}
        </Octahedron>
        <cubeCamera
          layers={[11]}
          name="cubeCamera"
          ref={cubeCamera}
          args={[0.1, 100, renderTarget]}
          position={[0, 0, 5]}
        />
        <Title name="title" position={[0, -0.3, -10]}/>
        <TitleCopies layers={[11]}/>
        <Mirrors layers={[0, 11]} envMap={renderTarget.texture} />
      </group>
    </>
  )
}

export default Scene


