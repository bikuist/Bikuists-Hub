// assets/key.js
document.addEventListener('DOMContentLoaded', () => {
    const accessKey = "pepperonicheesepizza"; // The access key for the site
    const cookieName = "siteAccessGranted";
    const cookieExpiryDays = 7;

    const keyOverlay = document.getElementById('key-overlay');
    const keyInput = document.getElementById('key-input');
    const keySubmitButton = document.getElementById('key-submit-button');
    const keyMessage = document.getElementById('key-message');

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/; SameSite=Lax";
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i=0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function checkAccess() {
        if (getCookie(cookieName) === "true") {
            keyOverlay.style.display = 'none';
            document.body.style.overflow = '';
            return true;
        }
        return false;
    }

    function handleKeySubmission() {
        if (keyInput.value === accessKey) {
            setCookie(cookieName, "true", cookieExpiryDays);
            keyMessage.style.color = 'green';
            keyMessage.textContent = 'Access granted! Redirecting...';
            setTimeout(() => {
                keyOverlay.style.display = 'none';
                document.body.style.overflow = '';
            }, 500);
        } else {
            keyMessage.style.color = 'red';
            keyMessage.textContent = 'Incorrect key. Please try again.';
        }
    }

    if (!checkAccess()) {
        keyOverlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    keySubmitButton.addEventListener('click', handleKeySubmission);

    keyInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            handleKeySubmission();
        }
    });
});