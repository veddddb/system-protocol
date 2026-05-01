// --- Configuration ---
const CONFIG = {
    level1: '0705',           // Departure Date (May 7th)
    level2: 'dosa',           // Or change to your favorite spot
    level3: 'revolution',     // Group name
    revealDelay: 1500
};

let currentLevel = 1;
const terminalInput = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');
const ghost = document.getElementById('ghost-layer');

// --- Focus Management ---
// This ensures that even if she clicks anywhere on the screen, the input stays active
document.addEventListener('click', () => terminalInput.focus());
window.onload = () => terminalInput.focus();

// --- Input Handling ---
terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const val = this.value.toLowerCase().trim();
        if (val !== "") {
            addLine(val, 'user-input'); // Shows what she typed
            processCommand(val);
        }
        this.value = '';
    }
});

function addLine(text, type = '') {
    const p = document.createElement('p');
    // If it's a user command, prefix with '>', otherwise leave it
    p.innerText = type === 'user-input' ? `> ${text}` : text;
    if (type) p.className = type;
    output.appendChild(p);
    
    // Auto-scroll to bottom
    const window = document.querySelector('.terminal-window');
    window.scrollTop = window.scrollHeight;
}

function processCommand(cmd) {
    console.log("Current Level:", currentLevel, "Input:", cmd); // For your testing

    if (currentLevel === 1) {
        if (cmd === CONFIG.level1) {
            addLine('LEVEL_01: ACCESS GRANTED.', 'success');
            addLine('NEW TASK: Identifying Coordinate... What is the name of our favorite breakfast spot in Mumbai?', 'hint');
            currentLevel = 2;
        } else {
            addLine('ACCESS DENIED. INCORRECT_KEY.', 'error');
        }
    } 
    else if (currentLevel === 2) {
        // Includes allows for some flexibility (e.g. "Rama Nayak" vs "Rama")
        if (cmd.includes(CONFIG.level2)) {
            addLine('LEVEL_02: COORDINATE LOCKED.', 'success');
            addLine('FINAL TASK: Enter the "Revolution" secret password...', 'hint');
            currentLevel = 3;
        } else {
            addLine('DATA MISMATCH. RETRY.', 'error');
        }
    }
    else if (currentLevel === 3) {
        if (cmd === CONFIG.level3) {
            addLine('ALL SYSTEMS GO. INITIATING REVEAL...', 'success');
            setTimeout(initiateProtocol, CONFIG.revealDelay);
        } else {
            addLine('UNAUTHORIZED. CHECK GROUP CREDENTIALS.', 'error');
        }
    }
}

function initiateProtocol() {
    // 1. Visual Reveal
    ghost.style.opacity = '0.6';
    ghost.style.filter = 'grayscale(0%) blur(0px)';

    // 2. Screen Transition
    document.getElementById('auth-screen').classList.remove('active');
    document.getElementById('reveal-screen').classList.add('active');
    
    startCountdown();
}

function startCountdown() {
    const target = new Date("May 7, 2026 00:00:00").getTime();
    
    setInterval(() => {
        const now = new Date().getTime();
        const diff = target - now;
        
        const d = Math.floor(diff / (1000 * 60 * 60 * 24));
        const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('countdown').innerHTML = 
            `T-MINUS ${d}D:${h}H:${m}M:${s}S`;
    }, 1000);
}
