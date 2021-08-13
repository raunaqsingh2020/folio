import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'

import gsap from 'gsap';

import {
  SPACE_REGULAR,
  NORTH_CAROSSELA,
} from '../../styles/font'

import sampleImg from '@images/sample.jpg';
import sampleImg2 from '@images/sample2.jpg';

import { map, lerp, clamp, getMousePos } from './utils';

const TitleWrapper = styled.div`
  width: 100%;
  padding: 3rem;
`

const HollowTitle = styled.h1`
  display: flex;
  overflow: hidden;
  font-size: 5vw;
  margin: 0;
  color: var(--text);
  -webkit-text-fill-color: transparent;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: var(--text);
  text-transform: uppercase;
  ${NORTH_CAROSSELA}
`

const SolidTitle = styled.h1`
  display: flex;
  overflow: hidden;
  font-size: 5vw;
  margin: 0;
  color: var(--text);
  text-transform: uppercase;
  ${NORTH_CAROSSELA}
`

const ContactText = styled.span`
    position: relative;
    display: block;
    font-weight: 300;
    white-space: nowrap;
    color: var(--text);
    font-size: 6vw;
    text-transform: uppercase;
    ${NORTH_CAROSSELA}
    &:before, after {
        content: '';
        position: absolute;
        width: 0%;
        height: 0.25vw;
        top: calc(0.2rem + 33%);
        // margin-top: -6px;
        background: var(--text);
        transition: width 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
    }
    &:before {
        left: -3px;
    }
    &:after {
        right: 3px;
        background: var(--text);
        // transition: width 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
    }
`

const ContactLink = styled.a`
    text-decoration: none;
    flex: none;
	display: flex;
	justify-content: center;
	position: relative;
    padding: 0.2rem 0rem 0.2rem 0rem;
    // margin: auto;
    // width: 100%;
    // padding: 0rem 1rem 0rem 1rem;
    // background-color: red;
    &:hover {
        ${ContactText} {
            // text-shadow: 0 0 5px var(--text);
            // color: red;
            &:before {
                background: var(--text);
                width: calc(100% + 6px);
                // transition: width 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
            }
            &:after {
                background: var(--text);
                width: calc(100% + 6px);
                // transition: width 0.3s cubic-bezier(0.22, 0.61, 0.36, 1);
            }
        }
    }
`

const HoverReveal = styled.div`
    position: absolute;
    z-index: -1; //z-index: 0;
    width: 220px;
    height: 320px;
    top: 0;
    left: 0;
    pointer-events: none;
    opacity: 0;
    // background-color: red;
`

const HoverRevealInner = styled.div`
    overflow: hidden;
    width: 100%;
	height: 100%;
	position: relative;
`

const HoverRevealImg = styled.div`
    width: 100%;
    height: 100%;
    position: relative;
    background-size: cover;
	background-position: 50% 50%;
    //background-image: url(${sampleImg});
`

let mousepos = {x: 0, y: 0};
let mousePosCache = mousepos;
let direction = {x: mousePosCache.x-mousepos.x, y: mousePosCache.y-mousepos.y};

class ContactItem extends React.Component {
    //adapted from https://tympanus.net/codrops/2020/07/01/creating-a-menu-image-animation-on-hover/

    constructor(props){
      super(props);

      this.animatableProperties = props.animatableProperties;
      this.image = props.image

      this.mouseEnter = this.mouseEnter.bind(this);
      this.mouseLeave = this.mouseLeave.bind(this);
      this.showImage = this.showImage.bind(this);
      this.hideImage = this.hideImage.bind(this);

      this.linkRef = React.createRef();
      this.revealRef = React.createRef();
      this.revealInnerRef = React.createRef();
      this.revealImgRef = React.createRef();
    }
  
    componentDidMount(){
        this.revealImgRef.current.style.backgroundImage = `url(${this.image})`;
        window.addEventListener('mousemove', ev => mousepos = getMousePos(ev));
    }

    mouseEnter(){
        this.showImage();
        this.firstRAFCycle = true;
        //start the render loop animation (rAF)
        this.loopRender();
    }

    mouseLeave(){
        this.stopRendering();
        this.hideImage();
    }

    loopRender() {
        if (!this.requestId) {
            this.requestId = requestAnimationFrame(() => this.animate());
        }
    }

    stopRendering() {
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    }

    calcBounds() {
        this.bounds = {
            el: this.linkRef.current.getBoundingClientRect(),
            reveal: this.revealRef.current.getBoundingClientRect()
        };
    }

    showImage() {
        // kill any current tweens
        gsap.killTweensOf(this.revealInnerRef.current);
        gsap.killTweensOf(this.revealImgRef.current);
        
        this.tl = gsap.timeline({
            onStart: () => {
                // show the image element
                //this.revealRef.current.style.opacity = 1;
                gsap.to(this.revealRef.current, 0.3, {opacity: 1});
                // set a high z-index value so image appears on top of other elements
                gsap.set(this.linkRef.current, {zIndex: 5});
            }
        })
        // animate the image wrap
        .to(this.revealInnerRef.current, 0.2, {
            ease: 'Sine.easeOut',
            startAt: {x: direction.x < 0 ? '-100%' : '100%'},
            x: '0%'
        })
        // animate the image element
        .to(this.revealImgRef.current, 0.2, {
            ease: 'Sine.easeOut',
            startAt: {x: direction.x < 0 ? '100%': '-100%'},
            x: '0%'
        }, 0);
    }
    // hide the image element
    hideImage() {
        // kill any current tweens
        gsap.killTweensOf(this.revealInnerRef.current);
        gsap.killTweensOf(this.revealImgRef.current);

        this.tl = gsap.timeline({
            onStart: () => {
                gsap.set(this.linkRef.current, {zIndex: 1});
            },
            onComplete: () => {
                gsap.set(this.revealRef.current, {opacity: 0});
            }
        })
        .to(this.revealInnerRef.current, 0.2, {
            ease: 'Sine.easeOut',
            x: direction.x < 0 ? '100%' : '-100%'
        })
        .to(this.revealImgRef.current, 0.2, {
            ease: 'Sine.easeOut',
            x: direction.x < 0 ? '-100%' : '100%'
        }, 0);
    }

    animate() {
        this.requestId = undefined;
        // calculate position/sizes the first time
        if ( this.firstRAFCycle ) {
            this.calcBounds();
        }

        // calculate the mouse distance (current vs previous cycle)
        const mouseDistanceX = clamp(Math.abs(mousePosCache.x - mousepos.x), 0, 100);
        // direction where the mouse is moving
        direction = {x: mousePosCache.x-mousepos.x, y: mousePosCache.y-mousepos.y};
        // updated cache values
        mousePosCache = {x: mousepos.x, y: mousepos.y};

        // new translation values
        // the center of the image element is positioned where the mouse is
        this.animatableProperties.tx.current = Math.abs(mousepos.x - this.bounds.el.left) - this.bounds.reveal.width/2;
        this.animatableProperties.ty.current = Math.abs(mousepos.y - this.bounds.el.top) - this.bounds.reveal.height/2;// + this.bounds.el.height/2 - this.bounds.reveal.height/2;//Math.abs(mousepos.y - this.bounds.el.top) - this.bounds.reveal.height/2;

        // new rotation value
        this.animatableProperties.rotation.current = this.firstRAFCycle ? 0 : map(mouseDistanceX,0,100,0,direction.x < 0 ? 60 : -60);
        // new filter value
        this.animatableProperties.brightness.current = this.firstRAFCycle ? 1 : map(mouseDistanceX,0,100,1,4);

        // set up the interpolated values
        // for the first cycle, both the interpolated values need to be the same so there's no "lerped" animation between the previous and current state
        this.animatableProperties.tx.previous = this.firstRAFCycle ? this.animatableProperties.tx.current : lerp(this.animatableProperties.tx.previous, this.animatableProperties.tx.current, this.animatableProperties.tx.amt);
        this.animatableProperties.ty.previous = this.firstRAFCycle ? this.animatableProperties.ty.current : lerp(this.animatableProperties.ty.previous, this.animatableProperties.ty.current, this.animatableProperties.ty.amt);
        this.animatableProperties.rotation.previous = this.firstRAFCycle ? this.animatableProperties.rotation.current : lerp(this.animatableProperties.rotation.previous, this.animatableProperties.rotation.current, this.animatableProperties.rotation.amt);
        this.animatableProperties.brightness.previous = this.firstRAFCycle ? this.animatableProperties.brightness.current : lerp(this.animatableProperties.brightness.previous, this.animatableProperties.brightness.current, this.animatableProperties.brightness.amt);
        
        // set styles
        gsap.set(this.revealRef.current, {
            x: this.animatableProperties.tx.previous,
            y: this.animatableProperties.ty.previous,
            rotation: this.animatableProperties.rotation.previous,
            filter: `brightness(${this.animatableProperties.brightness.previous})`
        });

        // loop
        this.firstRAFCycle = false;
        this.loopRender();
    }
  
    render(){
      return (
        <ContactLink ref={this.linkRef} href={this.props.url} target={"_blank"} spy={true} smooth={true} duration={5000} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
            <ContactText>{this.props.title}</ContactText>
            <HoverReveal ref={this.revealRef}>
                <HoverRevealInner ref={this.revealInnerRef}>
                    <HoverRevealImg ref={this.revealImgRef}/>
                </HoverRevealInner>
            </HoverReveal>
        </ContactLink>
      );;
    }
}


const Contact = () => {

    const animatableProperties = {
        tx: {previous: 0, current: 0, amt: 0.08},
        ty: {previous: 0, current: 0, amt: 0.08},
        rotation: {previous: 0, current: 0, amt: 0.08},
        brightness: {previous: 1, current: 1, amt: 0.08}
    };

    return (
      <>
        <TitleWrapper>
            <HollowTitle>Don't be shy,</HollowTitle>
            <SolidTitle>Make the first move.</SolidTitle>
        </TitleWrapper>
        <ContactItem title={'email'} image={sampleImg} url={"mailto: raunaq.singh@elativo.com"} animatableProperties={animatableProperties}/>
        <ContactItem title={'github'} image={sampleImg2} url={"https://github.com/raunaqsingh2020"} animatableProperties={animatableProperties}/>
        <ContactItem title={'linkedin'} image={sampleImg} url={"https://www.linkedin.com/in/raunaq-singh-2024/"} animatableProperties={animatableProperties}/>
        <ContactItem title={'instagram'} image={sampleImg2} url={"https://www.instagram.com/raunaq.singh70/"} animatableProperties={animatableProperties}/>
      </>
    );
  };
  
export default Contact;
