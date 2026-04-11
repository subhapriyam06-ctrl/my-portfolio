// --- Star Particle Background & Parallax ---
const canvas = document.getElementById('starsCanvas');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    initStars();
}

class Star {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.z = Math.random() * width; // depth for parallax
        this.size = Math.random() * 2;
        this.alpha = Math.random();
        this.alphaMod = Math.random() * 0.02 + 0.01;
    }

    update(scrollY) {
        // Twinkle effect
        this.alpha += this.alphaMod;
        if (this.alpha > 1 || this.alpha < 0) {
            this.alphaMod = -this.alphaMod;
        }

        // Parallax effect based on depth (z)
        let currentY = this.y - (scrollY * (width / this.z) * 0.1);
        
        // Wrap around
        if (currentY < 0) currentY = (currentY % height) + height;
        if (currentY > height) currentY = currentY % height;

        return currentY;
    }

    draw(scrollY) {
        let currentY = this.update(scrollY);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, currentY, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    const numStars = Math.floor((width * height) / 4000);
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animate() {
    ctx.clearRect(0, 0, width, height);
    const scrollY = window.scrollY;
    
    stars.forEach(star => {
        star.draw(scrollY);
    });
    
    requestAnimationFrame(animate);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
initStars();
animate();

// --- Reveal on Scroll ---
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const elementTop = reveals[i].getBoundingClientRect().top;
        const elementVisible = 100;

        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}

window.addEventListener('scroll', revealOnScroll);
// trigger once on load
revealOnScroll();
