/**
 * RAPPsquare - Main JavaScript
 */

// Configuration
const CONFIG = {
    RAPP_API: 'https://rapp-ov4bzgynnlvii.azurewebsites.net/api/businessinsightbot_function',
    RAPPBOOK_DATA: 'https://raw.githubusercontent.com/kody-w/CommunityRAPP/main/rappbook/index.json',
    MARKETPLACE_DATA: 'https://raw.githubusercontent.com/kody-w/rapp-agent-marketplace/main/manifest.json',
    THEME_KEY: 'rapp-theme',
    USER_KEY: 'rapp-user-guid'
};

// State
let currentTheme = localStorage.getItem(CONFIG.THEME_KEY) || 'dark';
let userGuid = localStorage.getItem(CONFIG.USER_KEY) || generateGuid();

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initPlatformCards();
    animateStats();
});

/**
 * Theme Management
 */
function initTheme() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon();

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem(CONFIG.THEME_KEY, currentTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

/**
 * Navigation
 */
function initNavigation() {
    // Highlight current page
    const currentPath = window.location.pathname;
    document.querySelectorAll('.nav-link').forEach(link => {
        if (link.getAttribute('href') === currentPath ||
            (currentPath === '/' && link.getAttribute('data-page') === 'home')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Connect button
    const connectBtn = document.getElementById('connect-btn');
    if (connectBtn) {
        connectBtn.addEventListener('click', handleConnect);
    }
}

function handleConnect() {
    // Show connection modal or redirect to auth
    showToast('Connection feature coming soon!', 'info');
}

/**
 * Platform Cards Interaction
 */
function initPlatformCards() {
    document.querySelectorAll('.platform-card').forEach(card => {
        card.addEventListener('click', () => {
            const platform = card.dataset.platform;
            navigateToPlatform(platform);
        });
    });
}

function navigateToPlatform(platform) {
    const routes = {
        'marketplace': 'pages/marketplace.html',
        'rappbook': 'pages/rappbook.html',
        'cards': 'pages/cards.html',
        'rappverse': 'pages/rappverse.html',
        'core': 'pages/api-docs.html'
    };

    if (routes[platform]) {
        window.location.href = routes[platform];
    }
}

/**
 * Stats Animation
 */
function animateStats() {
    const stats = {
        'agent-count': 47,
        'user-count': 1247,
        'deploy-count': 5832
    };

    Object.entries(stats).forEach(([id, target]) => {
        const el = document.getElementById(id);
        if (el) {
            animateNumber(el, target);
        }
    });
}

function animateNumber(el, target) {
    const duration = 2000;
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = easeOutQuart(progress);
        const current = Math.floor(start + (target - start) * eased);

        el.textContent = formatNumber(current);

        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }

    requestAnimationFrame(update);
}

function easeOutQuart(x) {
    return 1 - Math.pow(1 - x, 4);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
}

/**
 * Utility Functions
 */
function generateGuid() {
    const guid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
    localStorage.setItem(CONFIG.USER_KEY, guid);
    return guid;
}

function showToast(message, type = 'info') {
    // Remove existing toasts
    document.querySelectorAll('.toast').forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas fa-${getToastIcon(type)}"></i>
        <span>${message}</span>
    `;

    // Style the toast
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '12px 20px',
        background: type === 'error' ? 'var(--error)' :
                   type === 'success' ? 'var(--success)' :
                   type === 'warning' ? 'var(--warning)' : 'var(--info)',
        color: 'white',
        borderRadius: 'var(--border-radius-sm)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        zIndex: '9999',
        boxShadow: 'var(--shadow-lg)',
        animation: 'fadeIn 0.3s ease'
    });

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function getToastIcon(type) {
    const icons = {
        'success': 'check-circle',
        'error': 'exclamation-circle',
        'warning': 'exclamation-triangle',
        'info': 'info-circle'
    };
    return icons[type] || icons.info;
}

/**
 * API Helpers
 */
async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('Fetch error:', error);
        return null;
    }
}

async function callRAPP(input, history = []) {
    try {
        const response = await fetch(CONFIG.RAPP_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_input: input,
                conversation_history: history,
                user_guid: userGuid
            })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error('RAPP API error:', error);
        return null;
    }
}

// Export for use in other modules
window.RAPP = {
    CONFIG,
    showToast,
    fetchJSON,
    callRAPP,
    userGuid
};
