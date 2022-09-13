/**
 *  File: index.js
 *  GUI Assignment: Creating Your First Web Page
 *  Sam Claflin, UMass Lowell Computer Science, samuel_claflin@student.uml.edu
 *  Copyright (c) 2023 by Sam Claflin. 
 */

/**
 * Classes 
 */

class Dot {
    constructor(x, y, r, color, vX, vY) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.color = color;
        this.vX = vX;
        this.vY = vY;
    }
}

/**
 * Globals 
 */

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const minOpacity = 0.5;
const maxOpacity = 1;
const minVelocity = -4;
const maxVelocity = 4;
const numDots = 75;
let dots = [];

/**
 * Functions
 */

const main = () => {
    // Initialize canvas
    sizeCanvas();

    // Initialize event listeners
    window.addEventListener("resize", handleWindowResize);

    // Initialize dots
    dots = generateDots();

    // Begin the animation
    setInterval(animateCanvas, 20);
}

const sizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

const animateCanvas = () => {
    clearCanvas();
    drawDots();
    moveDots();
}

const drawDots = () => {
    dots.forEach(dot => {
        ctx.fillStyle = dot.color;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, 2*Math.PI, false) 
        ctx.fill();
    });
}

const moveDots = () => {
    dots.forEach(dot => {
        dot.x += dot.vX;
        if (dot.x >= canvas.width || dot.x <= 0) {
            dot.vX *= -1;
        }

        dot.y += dot.vY;
        if (dot.y >= canvas.height || dot.y <= 0) {
            dot.vY *= -1;
        }
    });
}

const clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const generateDots = () => {
    const dots = [];
    for (let i = 0; i < numDots; i++) {
        dots.push(randDot());
    }

    return dots;
}

const randInt = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
};

const randDot = () => {
    const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity; 
    return new Dot(
        randInt(0, canvas.width),
        randInt(0, canvas.height),
        randInt(2, 5),
        `rgba(2, 252, 173, ${opacity})`,
        randInt(minVelocity, maxVelocity) * (opacity),
        randInt(minVelocity, maxVelocity) * (opacity)
    );
}

/**
 * Event Handlers
 */

const handleWindowResize = () => {
    // Resize the canvas and generate a new, adjusted array of dots
    sizeCanvas();
    dots = generateDots();
};

/**
 * Entry Point 
 */

main();
