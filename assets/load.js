// assets/load.js

document.addEventListener('DOMContentLoaded', () => {
    const gameFrame = document.getElementById('gameFrame');
    const loadingMessage = document.getElementById('loadingMessage');
    const fullscreenButton = document.getElementById('fullscreenButton');
    const backButton = document.getElementById('backButton');
    const launchBlankButton = document.getElementById('launchBlankButton');
    const favButton = document.getElementById('favButton');
    const gamePrefetchLink = document.getElementById('gamePrefetch');
    const mobileBackButton = document.querySelector('.mobile-back-button');

    const urlParams = new URLSearchParams(window.location.search);
    const gameId = urlParams.get('gameId');

    function loadGame() {
        loadingMessage.classList.remove('hidden');
        gameFrame.classList.remove('loaded');
        gameFrame.style.display = 'none';
        loadingMessage.style.display = 'flex';

        if (gameId) {
            if (typeof GAMES_MANIFEST === 'undefined' || typeof getGameDataById === 'undefined') {
                loadingMessage.innerHTML = '<p class="error-message">Error: Game manifest or helper function missing. Ensure games.js is correctly linked BEFORE load.js.</p>';
                loadingMessage.style.display = 'flex';
                gameFrame.style.display = 'none';
                return;
            }

            const gameData = getGameDataById(gameId);

            if (gameData) {
                if (gamePrefetchLink) {
                    gamePrefetchLink.href = gameData.url;
                }

                gameFrame.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-forms allow-pointer-lock allow-popups allow-top-navigation-by-user-activation');

                gameFrame.src = gameData.url;

                gameFrame.onload = () => {
                    gameFrame.classList.add('loaded');
                    loadingMessage.classList.add('hidden');
                    gameFrame.style.display = 'block';
                };

                gameFrame.onerror = () => {
                    loadingMessage.innerHTML = `<p class="error-message">Failed to load game: ${gameData.name}. Please check the URL, file path, or if the game supports embedding.</p>`;
                    loadingMessage.classList.remove('hidden');
                    gameFrame.classList.remove('loaded');
                    gameFrame.style.display = 'none';
                };

                loadingMessage.innerHTML = `
                    <i class="fas fa-spinner fa-spin text-5xl text-gray-500 mb-4"></i>
                    <p>Please wait, ${gameData.name} is loading...</p>
                    <p>This might take a moment to bypass security features.</p>
                    <p>For a faster experience, try the "Launch in New Tab" button.</p>
                `;

            } else {
                loadingMessage.innerHTML = '<p class="error-message">Error: Invalid game ID. The game could not be found in the manifest.</p>';
                loadingMessage.classList.remove('hidden');
                gameFrame.classList.remove('loaded');
                gameFrame.style.display = 'none';
            }
        } else {
            loadingMessage.innerHTML = '<p class="error-message">Error: No game ID specified in the URL. Please select a game from the main list.</p>';
            loadingMessage.classList.remove('hidden');
            gameFrame.classList.remove('loaded');
            gameFrame.style.display = 'none';
        }
    }

    loadGame();

    fullscreenButton.addEventListener('click', () => {
        if (gameFrame.requestFullscreen) {
            gameFrame.requestFullscreen();
        } else if (gameFrame.mozRequestFullScreen) {
            gameFrame.mozRequestFullScreen();
        } else if (gameFrame.webkitRequestFullscreen) {
            gameFrame.webkitRequestFullscreen();
        } else if (gameFrame.msRequestFullscreen) {
            gameFrame.msRequestFullscreen();
        }
    });

    backButton.addEventListener('click', () => {
        window.location.href = '../index.html#games';
        setTimeout(() => {
            const targetElement = document.getElementById('games');
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
    });

    if (mobileBackButton) {
        mobileBackButton.addEventListener('click', (event) => {
            event.preventDefault();
            window.location.href = '../index.html#games-section';
            setTimeout(() => {
                const targetElement = document.getElementById('games');
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        });
    }

    launchBlankButton.addEventListener('click', () => {
        const gameData = getGameDataById(gameId);
        if (gameData && gameData.url) {
            window.open(gameData.url, '_blank');
        } else {
            alert('Game URL not found for launching in a new tab.');
        }
    });

    favButton.addEventListener('click', () => {
        alert('Favorite button clicked! (Functionality to be implemented)');
    });

});
