function initiateProtocol() {
    // 1. Sharpen the Ghost Layer
    const ghost = document.getElementById('ghost-layer');
    ghost.style.opacity = '0.4';
    ghost.style.filter = 'grayscale(0%) blur(2px)';

    // 2. Switch Screens
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
