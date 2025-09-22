console.log("registro_de_tiempo.js loaded.");

let countdownInterval = null;

// --- Core Timer Functions ---

function startTimer() {
    const minutesInput = document.getElementById('time-tracker-minutes');
    const unitSelect = document.getElementById('time-tracker-unit');

    const duration = parseInt(minutesInput.value, 10);
    const unit = unitSelect.value;

    if (isNaN(duration) || duration <= 0) {
        alert('Por favor, ingresa un número válido.');
        return;
    }

    let totalSeconds = unit === 'seconds' ? duration : duration * 60;
    const initialDuration = duration; // Keep the original duration for the message
    const unitText = unit === 'seconds' ? 'segundos' : 'minutos';


    // --- UI Updates on Start ---
    document.getElementById('time-tracker-start-btn').style.display = 'none';
    document.getElementById('time-tracker-stop-btn').style.display = 'inline-block';
    minutesInput.disabled = true;
    unitSelect.disabled = true;

    // --- Countdown Logic ---
    countdownInterval = setInterval(() => {
        totalSeconds--;
        updateDisplay(totalSeconds * 1000);

        if (totalSeconds <= 0) {
            stopTimer(); // This now just clears interval and resets UI
            showInPageNotification(`¡Tiempo completado! Se cumplieron ${initialDuration} ${unitText}.`);
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(countdownInterval);
    countdownInterval = null;
    resetTimerUI();
}

// --- UI and Data Functions ---

function updateDisplay(remainingMs) {
    const display = document.getElementById('time-tracker-display');
    if (!display) return;

    if (remainingMs < 0) remainingMs = 0;
    const totalSeconds = Math.round(remainingMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function resetTimerUI() {
    const startBtn = document.getElementById('time-tracker-start-btn');
    const stopBtn = document.getElementById('time-tracker-stop-btn');
    const minutesInput = document.getElementById('time-tracker-minutes');
    const unitSelect = document.getElementById('time-tracker-unit');

    if(startBtn) startBtn.style.display = 'inline-block';
    if(stopBtn) stopBtn.style.display = 'none';
    if(minutesInput) minutesInput.disabled = false;
    if(unitSelect) unitSelect.disabled = false;
    
    const duration = parseInt(minutesInput.value, 10) || (unitSelect.value === 'minutes' ? 15 : 10);
    const durationMs = (unitSelect.value === 'seconds') ? duration * 1000 : duration * 60 * 1000;
    updateDisplay(durationMs);
}

function showInPageNotification(message) {
    const notification = document.getElementById('in-page-notification');
    const messageSpan = document.getElementById('notification-message');
    const closeButton = notification.querySelector('.close-btn');

    if (!notification || !messageSpan) return;

    messageSpan.textContent = message;
    notification.classList.add('show');

    if (closeButton) {
        closeButton.onclick = () => {
            notification.classList.remove('show');
        };
    }
}

// --- Global Function for Button ---
window.handleClockButtonClick = function() {
    const modal = document.getElementById('time-tracker-modal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// --- Main Execution ---
document.addEventListener('DOMContentLoaded', () => {
    // Optional: Service Worker registration can remain
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registrado.', reg))
            .catch(err => console.error('Error al registrar Service Worker', err));
    }

    // Get DOM Elements
    const modal = document.getElementById('time-tracker-modal');
    const closeBtn = document.getElementById('time-tracker-close-btn');
    const minutesInput = document.getElementById('time-tracker-minutes');
    const startBtn = document.getElementById('time-tracker-start-btn');
    const stopBtn = document.getElementById('time-tracker-stop-btn');
    const unitSelect = document.getElementById('time-tracker-unit');

    // Modal Handling
    if(closeBtn) closeBtn.onclick = () => { 
        modal.style.display = 'none'; 
    };
    window.onclick = (event) => { 
        if (event.target == modal) { 
            modal.style.display = 'none'; 
        }
    };

    // Event Listeners
    if (startBtn) startBtn.addEventListener('click', startTimer);
    if (stopBtn) stopBtn.addEventListener('click', stopTimer);
    
    const updateInputDisplay = () => {
        if (!countdownInterval) { // Check if timer is not running
            const duration = parseInt(minutesInput.value, 10) || 0;
            const unit = unitSelect.value;
            const durationMs = unit === 'seconds' ? duration * 1000 : duration * 60 * 1000;
            updateDisplay(durationMs);
        }
    };

    if (minutesInput) minutesInput.addEventListener('input', updateInputDisplay);
    if (unitSelect) unitSelect.addEventListener('change', updateInputDisplay);

    // Initial Load
    resetTimerUI();
});