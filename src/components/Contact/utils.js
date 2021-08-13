// https://tympanus.net/codrops/2020/07/01/creating-a-menu-image-animation-on-hover/

// Map number x from range [a, b] to [c, d]
const map = (x, a, b, c, d) => (x - a) * (d - c) / (b - a) + c;

// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;

const clamp = (num, min, max) => num <= min ? min : num >= max ? max : num;

// Gets the mouse position
const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.clientX || e.clientY) {
        posx = e.clientX;
        posy = e.clientY;
    }
    // else if (e.clientX || e.clientY)    {
    //     // posx = e.clientX + body.scrollLeft + document.documentElement.scrollLeft;
    //     // posy = e.clientY + body.scrollTop + document.documentElement.scrollTop;
    // }
    
    return { x : posx, y : posy }
};

export { map, lerp, clamp, getMousePos };