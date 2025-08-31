// particles.js

document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');

    let particles1 = [];
    let particles2 = [];
    const particleCount1 = 100;
    const particleCount2 = 100;
    const maxLineDistance = 100;

    // Set canvas dimensions
    function setCanvasDimensions() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Particle Class 1 (Connecting Lines)
    class Particle1 {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1 + 0.5;
            this.speedX = Math.random() * 0.2 - 0.1;
            this.speedY = Math.random() * 0.2 - 0.1;
            this.color = 'rgba(255, 255, 255, 0.8)';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.x > canvas.width || this.x < 0) this.speedX *= -1;
            if (this.y > canvas.height || this.y < 0) this.speedY *= -1;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Particle Class 2 (Just Dots)
    class Particle2 {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2.5 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = 'rgba(255, 255, 255, 0.8)';
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.size > 0.2) this.size -= 0.01;
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize particles for both types
    function init() {
        particles1 = [];
        for (let i = 0; i < particleCount1; i++) {
            particles1.push(new Particle1());
        }

        particles2 = [];
        for (let i = 0; i < particleCount2; i++) {
            particles2.push(new Particle2());
        }
    }

    // Connect particles with lines (for Particle Type 1)
    function connectParticles() {
        let opacity = 1;
        for (let a = 0; a < particles1.length; a++) {
            for (let b = a; b < particles1.length; b++) {
                let distance = Math.sqrt(Math.pow(particles1[a].x - particles1[b].x, 2) + Math.pow(particles1[a].y - particles1[b].y, 2));
                if (distance < maxLineDistance) {
                    opacity = 1 - (distance / maxLineDistance);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles1[a].x, particles1[a].y);
                    ctx.lineTo(particles1[b].x, particles1[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        const particleType = document.getElementById('particle-select').value;
        if (particleType !== 'off') {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            if (particleType === 'particles1') {
                for (let i = 0; i < particles1.length; i++) {
                    particles1[i].update();
                    particles1[i].draw();
                }
                connectParticles();
            } else if (particleType === 'particles2') {
                for (let i = 0; i < particles2.length; i++) {
                    particles2[i].update();
                    particles2[i].draw();
                    if (particles2[i].size <= 0.2) {
                        particles2.splice(i, 1);
                        particles2.push(new Particle2());
                    }
                }
            }
        } else {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        requestAnimationFrame(animate);
    }

    // Start animation
    init();
    animate();
});
