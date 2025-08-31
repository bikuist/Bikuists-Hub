document.addEventListener('DOMContentLoaded', () => {
    // --- UI Elements ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');
    const gameCardsContainer = document.getElementById('game-cards-container');
    const currentTimeElement = document.getElementById('current-time');
    const randomQuoteElement = document.getElementById('random-quote');
    const batteryIcon = document.getElementById('battery-icon');
    const batteryLevel = document.getElementById('battery-level');
    const panicToggle = document.getElementById('panic-toggle');
    const panicButtonKeyInput = document.getElementById('panic-button-key');
    const panicButtonUrlInput = document.getElementById('panic-button-url');
    const panicButtonSet = document.getElementById('panic-button-set');
    const tabCloakTitleInput = document.getElementById('tab-cloak-title-input');
    const tabCloakIconSelect = document.getElementById('tab-cloak-icon-select');
    const particleSelect = document.getElementById('particle-select');
    let panicKey = localStorage.getItem('panicKey') || null;
    let panicUrl = localStorage.getItem('panicUrl') || 'https://google.com';

    // --- Key Overlay Logic ---
    const keyOverlay = document.getElementById('key-overlay');
    const keyInput = document.getElementById('key-input');
    const keySubmitBtn = document.getElementById('key-submit-button');
    const keyMessage = document.getElementById('key-message');
    const accessKey = '1234'; // Your desired access key

    function checkAccess() {
        const hasAccess = localStorage.getItem('hasAccess');
        if (hasAccess === 'true') {
            keyOverlay.style.display = 'none';
        } else {
            keyOverlay.style.display = 'flex';
        }
    }

    keySubmitBtn.addEventListener('click', () => {
        if (keyInput.value === accessKey) {
            localStorage.setItem('hasAccess', 'true');
            keyMessage.textContent = 'Access granted!';
            keyMessage.style.color = 'green';
            setTimeout(() => {
                keyOverlay.style.display = 'none';
            }, 500);
        } else {
            keyMessage.textContent = 'Invalid key. Please try again.';
            keyMessage.style.color = 'red';
        }
    });

    keyInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            keySubmitBtn.click();
        }
    });

    checkAccess();

    // --- Navigation Logic ---
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

    // --- Utility Displays (Time & Battery) ---
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
        const dateString = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        if (currentTimeElement) {
            currentTimeElement.textContent = `${timeString} on ${dateString}`;
        }
    }
    setInterval(updateTime, 1000);
    updateTime();

    if ('getBattery' in navigator) {
        navigator.getBattery().then(battery => {
            function updateBatteryStatus() {
                const level = Math.round(battery.level * 100);
                batteryLevel.textContent = `${level}%`;
                if (battery.charging) {
                    batteryIcon.className = 'fa-solid fa-battery-full';
                    batteryIcon.style.color = 'limegreen';
                } else if (level > 75) {
                    batteryIcon.className = 'fa-solid fa-battery-full';
                    batteryIcon.style.color = 'inherit';
                } else if (level > 50) {
                    batteryIcon.className = 'fa-solid fa-battery-three-quarters';
                } else if (level > 25) {
                    batteryIcon.className = 'fa-solid fa-battery-half';
                } else {
                    batteryIcon.className = 'fa-solid fa-battery-quarter';
                    batteryIcon.style.color = 'orangered';
                }
            }
            updateBatteryStatus();
            battery.addEventListener('levelchange', updateBatteryStatus);
            battery.addEventListener('chargingchange', updateBatteryStatus);
        });
    } else {
        if (batteryIcon && batteryLevel) {
            batteryIcon.style.display = 'none';
            batteryLevel.textContent = 'Battery info not supported';
        }
    }

    // --- Home Screen Features ---
    const quotes = [
        "Unblock your creativity.",
        "Breaking down digital walls.",
        "Your gateway to the web.",
        "Explore without limits.",
        "A portal to new adventures.",
        "The web, on your terms.",
    ];
    if (randomQuoteElement) {
        randomQuoteElement.textContent = quotes[Math.floor(Math.random() * quotes.length)];
    }

    // --- Games Section ---
    function renderGameCards() {
        if (typeof GAMES_MANIFEST !== 'undefined' && gameCardsContainer) {
            gameCardsContainer.innerHTML = '';
            GAMES_MANIFEST.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.classList.add('game-card');
                gameCard.innerHTML = `
                    <h3>${game.name}</h3>
                `;
                gameCard.addEventListener('click', () => {
                    window.location.href = `assets/load.html?gameId=${game.id}`;
                });
                gameCardsContainer.appendChild(gameCard);
            });
        }
    }
    renderGameCards();

    // --- Panic Button Settings ---
    panicButtonKeyInput.value = panicKey ? `Set to: ${panicKey.toUpperCase()}` : 'Press a key...';
    panicButtonUrlInput.value = panicUrl;

    panicButtonSet.addEventListener('click', () => {
        panicButtonKeyInput.value = 'Press a key...';
        panicButtonKeyInput.focus();
        panicButtonKeyInput.select();
    });

    panicButtonKeyInput.addEventListener('keydown', (e) => {
        e.preventDefault();
        panicKey = e.key.toLowerCase();
        panicButtonKeyInput.value = `Set to: ${e.key}`;
        localStorage.setItem('panicKey', panicKey);
    });
    
    panicButtonUrlInput.addEventListener('input', (e) => {
        panicUrl = e.target.value;
        localStorage.setItem('panicUrl', panicUrl);
    });
    
    panicToggle.addEventListener('click', () => {
        window.location.href = panicUrl;
    });

    document.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === panicKey && panicKey !== null) {
            window.location.href = panicUrl;
        }
    });

    // --- Tab Cloaking Settings ---
    const tabIcons = {
        'default': 'favicon.ico',
        'google-drive': 'https://ssl.gstatic.com/docs/doclist/images/drive_2022_3_21_0_15_52_630_1603585091.ico',
        'classroom': 'https://www.gstatic.com/images/icons/material/apps/untracked/classroom_128dp/2x/ic_classroom_48px.png',
    };

    function applyCloak() {
        const storedTitle = localStorage.getItem('tabCloakTitle');
        const storedIcon = localStorage.getItem('tabCloakIcon');

        const iconLink = document.querySelector("link[rel~='icon']");

        if (storedTitle) {
            document.title = storedTitle;
            tabCloakTitleInput.value = storedTitle;
        }
        if (storedIcon) {
            iconLink.href = tabIcons[storedIcon] || tabIcons['default'];
            tabCloakIconSelect.value = storedIcon;
        }
    }

    tabCloakTitleInput.addEventListener('input', (e) => {
        localStorage.setItem('tabCloakTitle', e.target.value);
        applyCloak();
    });
    
    tabCloakIconSelect.addEventListener('change', (e) => {
        localStorage.setItem('tabCloakIcon', e.target.value);
        applyCloak();
    });

    applyCloak();
    
    // --- Particle Settings ---
    function applyParticles() {
        const particleType = localStorage.getItem('particleType') || 'particles1';
        document.body.classList.remove('particles-off', 'particles1', 'particles2');
        if (particleType === 'off') {
            document.body.classList.add('particles-off');
        } else {
            document.body.classList.add(particleType);
        }
        if (particleSelect) {
            particleSelect.value = particleType;
        }
    }

    if (particleSelect) {
        particleSelect.addEventListener('change', (e) => {
            localStorage.setItem('particleType', e.target.value);
            applyParticles();
        });
    }

    applyParticles();
});
