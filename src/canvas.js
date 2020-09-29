const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

const mousePos = { x: undefined, y: undefined };
const maxRadius = 30;

class CanvasText {
    text = "";
    x = 0;
    y = 0;
    xPx = 0;
    yPx = 0;
    color = "";
    fontSize = 0;
    maxWidth = 0;

    constructor(text, x, y, xPx, yPx, color, fontSize, maxWidth) {
        this.text = text;
        this.x = x;
        this.y = y;
        this.xPx = xPx;
        this.yPx = yPx;
        this.color = color;
        this.fontSize = fontSize;
        this.maxWidth = maxWidth;
    }

    create() {
        context.textAlign = "center";
        context.font = `${this.fontSize}px Poppins`;
        context.fillStyle = this.color;
        context.fillText(this.text, this.x, this.y);
    }

    update() {
        if ((this.x - (this.maxWidth / 2)) < 0 || (this.x + (this.maxWidth / 2)) > innerWidth) {
            this.xPx = -this.xPx;
        }
        if ((this.y - this.fontSize) < 0 || this.y > innerHeight) {
            this.yPx = -this.yPx;
        }
        this.x += this.xPx;
        this.y += this.yPx;
    }
}

class Circle {
    x = 0;
    y = 0;
    xPx = 0;
    yPx = 0;
    radiusMagnificationSpeed = 0;
    initRadius = 0;
    radius = 0;
    color = "";

    constructor(x, y, xPx, yPx, radius, radiusMagnificationSpeed, color) {
        this.x = x;
        this.y = y;
        this.xPx = xPx;
        this.yPx = yPx;
        this.initRadius = radius;
        this.radius = radius;
        this.radiusMagnificationSpeed = radiusMagnificationSpeed;
        this.color = color;
    }

    create() {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.strokeStyle = this.color;
        context.fillStyle = this.color;
        context.stroke();
        context.fill();
    }

    update() {
        if ((this.x - this.radius) < 0 || (this.x + this.radius) > innerWidth) {
            this.xPx = -this.xPx;
        }
        if ((this.y - this.radius) < 0 || (this.y + this.radius) > innerHeight) {
            this.yPx = -this.yPx;
        }
        if (mousePos.x - this.x < 80 && mousePos.x - this.x > -80 && mousePos.y - this.y < 80 && mousePos.y - this.y > -80) {
            this.radius += this.radiusMagnificationSpeed;
            if (this.radius > maxRadius) {
                this.radius = maxRadius;
            }
        } else if (this.radius > this.initRadius && this.radius - this.radiusMagnificationSpeed > 0) {
            this.radius -= this.radiusMagnificationSpeed;
        }
        this.x += this.xPx;
        this.y += this.yPx;
    }
}

let text = undefined;
let circles = [];

function getRandomColor() {
    const solutions = "0123456789abcdef";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += solutions[Math.floor(Math.random() * 16)];
    }
    return color;
}

const getRandomNumber = (value) => Math.round(Math.random() * value, 2);

function init() {
    canvas.style.backgroundColor = getRandomColor();
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    const textX = getRandomNumber(innerWidth);
    const textY = getRandomNumber(innerHeight);
    const textXpx = getRandomNumber(6);
    const textYpx = getRandomNumber(6);
    text = new CanvasText("Hello World", textX, textY, textXpx, textYpx, getRandomColor(), 64, 200);
    circles = [];
    for(let i = 0; i < 150; i++) {
        const circleX = getRandomNumber(innerWidth);
        const circleY = getRandomNumber(innerHeight);
        const circleXpx =getRandomNumber(6);
        const circleYpx = getRandomNumber(6);
        const radius = Math.round(Math.random() * 10, 2);
        const radiusMagnificationSpeed = Math.round(Math.random() * 5, 2);
        circles.push(new Circle(circleX, circleY, circleXpx, circleYpx, radius, radiusMagnificationSpeed, getRandomColor()));
    }
}

window.addEventListener("resize", () => init());
window.addEventListener("mousemove", (e) => {
    mousePos.x = e.clientX;
    mousePos.y = e.clientY;
});

function animation() {
    requestAnimationFrame(animation);
    context.clearRect(0, 0, innerWidth, innerHeight);
    for(let i = 0; i < circles.length; i++) {
        circles[i].create();
        circles[i].update();
    }
    text.create();
    text.update();
}

init();
animation();