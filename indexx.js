// Show splash for this many milliseconds before navigating
const SPLASH_DURATION = 2200;

function hideSplashAndNavigate() {
    const splash = document.getElementById('splash');
    if (!splash) {
        // If there's no splash element, navigate immediately
        const immediateTarget = determineLoginTarget();
        console.log('Navigating immediately to', immediateTarget);
        window.location.href = immediateTarget;
        return;
    }

    // add a class to body so CSS can restore overflow
    document.body.classList.add('splash-hidden');

    // fade out the splash
    splash.style.transition = 'opacity 400ms ease';
    splash.style.opacity = '0';

    setTimeout(() => {
        // remove splash from DOM after fade
        if (splash.parentNode) splash.parentNode.removeChild(splash);

        const target = determineLoginTarget();
        console.log('Navigating after splash to', target);
        window.location.href = target;
    }, 450);
}

function determineLoginTarget() {
    // If running on your GitHub Pages host, return an absolute repo path so "html/" is preserved.
    if (location.hostname === 'ama-ashar.github.io') {
        // repoBase should match the repo name or GitHub Pages path; change if needed.
        const repoBase = '/polimap';
        return `${location.origin}${repoBase}/html/login.html`;
    }

    // Default: resolve relative to the current document (works for local or custom servers).
    return new URL('html/login.html', location.href).href;
}

// Wait for DOM ready then start the timer
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(hideSplashAndNavigate, SPLASH_DURATION));
} else {
    setTimeout(hideSplashAndNavigate, SPLASH_DURATION);
}
