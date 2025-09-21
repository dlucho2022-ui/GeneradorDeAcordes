console.log("registro_de_tiempo.js loaded.");

let countdownInterval = null;

// --- Core Timer Functions ---

function startTimer() {
    const minutesInput = document.getElementById('time-tracker-minutes');
    const unitSelect = document.getElementById('time-tracker-unit');
    const profileSelect = document.getElementById('time-tracker-profile-select');

    const duration = parseInt(minutesInput.value, 10);
    const unit = unitSelect.value;
    const profileName = profileSelect.value;

    if (isNaN(duration) || duration <= 0) {
        alert('Por favor, ingresa un número válido.');
        return;
    }
    if (!profileName) {
        alert('Por favor, selecciona un perfil.');
        return;
    }

    let totalSeconds = unit === 'seconds' ? duration : duration * 60;
    const durationInMinutes = unit === 'seconds' ? duration / 60 : duration;

    // --- UI Updates on Start ---
    document.getElementById('time-tracker-start-btn').style.display = 'none';
    document.getElementById('time-tracker-stop-btn').style.display = 'inline-block';
    minutesInput.disabled = true;
    unitSelect.disabled = true;
    profileSelect.disabled = true;

    // --- Countdown Logic ---
    countdownInterval = setInterval(() => {
        totalSeconds--;
        updateDisplay(totalSeconds * 1000);

        if (totalSeconds <= 0) {
            stopTimer(); // This now just clears interval and resets UI
            showInPageNotification(`¡Tiempo completado! Se guardaron ${durationInMinutes.toFixed(2)} minutos en el perfil ${profileName}.`);
            saveStudyTime(durationInMinutes, profileName);
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
    const profileSelect = document.getElementById('time-tracker-profile-select');
    const unitSelect = document.getElementById('time-tracker-unit');

    if(startBtn) startBtn.style.display = 'inline-block';
    if(stopBtn) stopBtn.style.display = 'none';
    if(minutesInput) minutesInput.disabled = false;
    if(profileSelect) profileSelect.disabled = false;
    if(unitSelect) unitSelect.disabled = false;
    
    const duration = parseInt(minutesInput.value, 10) || (unitSelect.value === 'minutes' ? 15 : 10);
    const durationMs = (unitSelect.value === 'seconds') ? duration * 1000 : duration * 60 * 1000;
    updateDisplay(durationMs);
}

function showInPageNotification(message) {
    const notification = document.getElementById('in-page-notification');
    const messageSpan = document.getElementById('notification-message'); // Get the dedicated message span
    const closeButton = notification.querySelector('.close-btn'); // Get the close button

    if (!notification || !messageSpan) return;

    messageSpan.textContent = message; // Set text content of the dedicated span
    notification.classList.add('show');

    if (closeButton) {
        closeButton.onclick = () => {
            notification.classList.remove('show');
        };
    }
}

// --- LocalStorage Functions ---
function getProfileStudyTimeFromLocalStorage(profileName) {
    const data = localStorage.getItem(`studyTime_${profileName}`);
    return data ? parseFloat(data) : 0;
}

function setProfileStudyTimeInLocalStorage(profileName, time) {
    localStorage.setItem(`studyTime_${profileName}`, time.toString());
}

function saveStudyTime(duration, profile) {
    if (!profile) return;
    const currentTotal = getProfileStudyTimeFromLocalStorage(profile);
    const newTotal = currentTotal + duration;
    setProfileStudyTimeInLocalStorage(profile, newTotal);
    loadProfileStudyTime(); // Refresh total time display
}

// Modified loadProfileStudyTime to use localStorage
async function loadProfileStudyTime() {
    const profileSelect = document.getElementById('time-tracker-profile-select');
    const totalTimeSpan = document.getElementById('time-tracker-total-time');
    if (!profileSelect || !totalTimeSpan) return;

    const profileName = profileSelect.value;
    if (!profileName) {
        totalTimeSpan.textContent = '0 minutos';
        return;
    }

    const totalMinutes = getProfileStudyTimeFromLocalStorage(profileName);
    totalTimeSpan.textContent = `${totalMinutes.toFixed(2)} minutos`;
}

// Modified loadProfiles to only get names from server, then load time from localStorage
async function loadProfiles() {
    const profileSelect = document.getElementById('time-tracker-profile-select');
    if (!profileSelect) return;

    try {
        // Fetch only profile names from the server
        const response = await fetch('http://localhost:3000/api/profiles');
        if (!response.ok) throw new Error('Could not fetch profiles.');
        const profiles = await response.json();
        
        const currentProfile = profileSelect.value;
        profileSelect.innerHTML = '';
        if (profiles.length === 0) {
            profileSelect.innerHTML = '<option value="">No hay perfiles</option>';
            return;
        }

        profiles.forEach(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            if (name === currentProfile) {
                option.selected = true;
            }
            profileSelect.appendChild(option);
        });

        if (profileSelect.value) {
            profileSelect.dispatchEvent(new Event('change'));
        } else if (profiles.length > 0) {
            profileSelect.value = profiles[0];
            profileSelect.dispatchEvent(new Event('change'));
        }

    } catch (error) {
        console.error("Error loading profiles:", error);
        profileSelect.innerHTML = '<option value="">Error al cargar</option>';
    }
}

// --- Global Function for Button ---
window.handleClockButtonClick = function() {
    const modal = document.getElementById('time-tracker-modal');
    if (modal) {
        modal.style.display = 'block';
        loadProfiles(); // Load profiles and their local storage time
    }
}

// --- Main Execution ---
document.addEventListener('DOMContentLoaded', () => {
    // Register SW (optional, but good to keep)
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(reg => console.log('Service Worker registrado, pero inactivo para el timer.', reg))
            .catch(err => console.error('Error al registrar Service Worker', err));
    }

    // Get DOM Elements
    const modal = document.getElementById('time-tracker-modal');
    const closeBtn = document.getElementById('time-tracker-close-btn');
    const profileSelect = document.getElementById('time-tracker-profile-select');
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
    if (profileSelect) profileSelect.addEventListener('change', loadProfileStudyTime);
    
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
    loadProfiles();
    resetTimerUI();
});