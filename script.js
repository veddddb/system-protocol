let currentLevel = 1;
const terminalInput = document.getElementById('terminal-input');
const output = document.getElementById('terminal-output');

terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const val = this.value.toLowerCase().trim();
        processCommand(val);
        this.value = '';
    }
});

function addLine(text, type = '') {
    const p = document.createElement('p');
    p.innerText = `> ${text}`;
    if (type) p.className = type;
    output.appendChild(p);
    output.scrollTop = output.scrollHeight; // Auto-scroll
}

function processCommand(cmd) {
    if (currentLevel === 1) {
        if (cmd === '0705') { // Departure Date
            addLine('LEVEL_01: ACCESS GRANTED.', 'success');
            addLine('NEW TASK: Identifying Coordinate... What is the name of our favorite breakfast spot in Mumbai?', 'hint');
            currentLevel = 2;
        } else {
            addLine('ACCESS DENIED. INCORRECT_KEY.', 'error');
        }
    } 
    else if (currentLevel === 2) {
        if (cmd.includes('dosa') || cmd.includes('idli')) { // Or whatever your spot is
            addLine('LEVEL_02: COORDINATE LOCKED.', 'success');
            addLine('FINAL TASK: Enter the "Revolution" secret password...', 'hint');
            currentLevel = 3;
        } else {
            addLine('DATA MISMATCH. RETRY.', 'error');
        }
    }
    else if (currentLevel === 3) {
        if (cmd === 'revolution') {
            addLine('ALL SYSTEMS GO. INITIATING REVEAL...', 'success');
            setTimeout(initiateProtocol, 1500); // Calls your existing reveal function
        } else {
            addLine('UNAUTHORIZED. CHECK GROUP CREDENTIALS.', 'error');
        }
    }
}
