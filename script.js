// script.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const gameCardsContainer = document.getElementById('game-cards-container');
    const proxyInput = document.getElementById('proxy-input');
    const proxyButton = document.getElementById('proxy-button');
    const proxyFrame = document.getElementById('proxy-frame');
    const currentTimeElement = document.getElementById('current-time');
    const randomQuoteElement = document.getElementById('random-quote');

    const randomTexts = [
        "Low-key your new favorite corner of the net.",
        "Touch grass later — there's games to run.",
        "Built diff. For gamers, by gamers.",
        "Just vibes, no paywalls.",
        "Boot up and zone out. You earned this.",
        "Skip the mid, we got peak content here.",
        "Your browser's about to get interesting.",
        "No cap, this place slaps.",
        "Lag-free zone. Real ones only.",
        "Scroll less, play more.",
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "Proxy aint working RN sorry",
        "Made by two idiots with coding knowlage 🙏"
    ];

    function activateSection(sectionId) {
        sections.forEach(section => {
            section.classList.remove('active');
            section.style.display = 'none';
        });

        const activeSection = document.getElementById(sectionId);
        if (activeSection) {
            activeSection.classList.add('active');
            activeSection.style.display = 'flex';
        }

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === sectionId) {
                link.classList.add('active');
            }
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = link.getAttribute('data-section');
            activateSection(sectionId);
            history.pushState(null, '', `#${sectionId}`);
        });
    });

    if (window.location.hash) {
        activateSection(window.location.hash.substring(1));
    } else {
        activateSection('home-section');
    }

    function updateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
        currentTimeElement.textContent = now.toLocaleDateString(undefined, options);
    }
    
  
    updateTime();
    const randomIndex = Math.floor(Math.random() * randomTexts.length);
    randomQuoteElement.textContent = randomTexts[randomIndex];
    

    setInterval(updateTime, 1000); 

    function renderGameCards() {
        if (typeof GAMES_MANIFEST !== 'undefined' && gameCardsContainer) {
            gameCardsContainer.innerHTML = '';
            GAMES_MANIFEST.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.classList.add('game-card');

                gameCard.innerHTML = `
                    <div class="game-card-info">
                        <h3>${game.name}</h3>
                    </div>
                `;
                gameCard.addEventListener('click', () => {
                    window.location.href = `assets/load.html?gameId=${game.id}`;
                });
                gameCardsContainer.appendChild(gameCard);
            });
        } else {
            console.error("GAMES_MANIFEST is not defined or gameCardsContainer not found.");
        }
    }

    renderGameCards();

    proxyButton.addEventListener('click', () => {
        let url = proxyInput.value.trim();
        if (url) {
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            proxyFrame.src = url;
        }
    });

    // Particle Animation Logic
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const numParticles = 80;
    const connectionDistance = 120;

    function setCanvasSize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = Math.random() * 0.5 - 0.25;
            this.speedY = Math.random() * 0.5 - 0.25;
            this.color = 'rgba(255, 255, 255, 0.6)';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    function initParticlesGradually(delayBetween = 50, total = numParticles) {
        particles = [];
        let created = 0;

        const interval = setInterval(() => {
            particles.push(new Particle());
            created++;

            if (created >= total) {
                clearInterval(interval);
            }
        }, delayBetween);
    }


    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < connectionDistance) {
                    ctx.strokeStyle = `rgba(255, 255, 255, ${1 - (distance / connectionDistance) * 0.8})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
        }
        connectParticles();
        requestAnimationFrame(animateParticles);
    }

    initParticlesGradually(100);
    animateParticles();
});