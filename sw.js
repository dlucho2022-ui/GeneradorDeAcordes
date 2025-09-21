self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

let countdownInterval = null;
let endTime = null;
let initialDuration = null; // in minutes
let profileName = null;

const LS_END_TIME_KEY = 'timer_end_time';
const LS_INITIAL_DURATION_KEY = 'timer_initial_duration';
const LS_PROFILE_NAME_KEY = 'timer_profile_name';

function broadcast(message) {
    console.log("SW: Broadcasting message:", message); // ADDED LOG
    self.clients.matchAll({ includeUncontrolled: true, type: 'window' }).then(clients => {
        clients.forEach(client => {
            client.postMessage(message);
        });
    });
}

function startSWTimer() {
    console.log("SW: startSWTimer() called."); // ADDED LOG
    if (countdownInterval) clearInterval(countdownInterval);

    countdownInterval = setInterval(() => {
        const remainingMs = endTime - Date.now();
        console.log("SW: Tick. Remaining:", remainingMs); // ADDED LOG
        broadcast({ command: 'tick', remaining: remainingMs, duration: initialDuration, profile: profileName });

        if (remainingMs <= 0) {
            console.log("SW: Timer finished condition met."); // ADDED LOG
            clearInterval(countdownInterval);
            countdownInterval = null;
            
            // Clear stored state
            localStorage.removeItem(LS_END_TIME_KEY);
            localStorage.removeItem(LS_INITIAL_DURATION_KEY);
            localStorage.removeItem(LS_PROFILE_NAME_KEY);

            broadcast({ command: 'timer-finished', duration: initialDuration, profile: profileName });
            broadcast({ command: 'stopped' }); // Also send stopped to reset UI
        }
    }, 1000);
}

function stopSWTimer() {
    clearInterval(countdownInterval);
    countdownInterval = null;
    localStorage.removeItem(LS_END_TIME_KEY);
    localStorage.removeItem(LS_INITIAL_DURATION_KEY);
    localStorage.removeItem(LS_PROFILE_NAME_KEY);
    broadcast({ command: 'stopped' });
}

self.addEventListener('message', event => {
    if (event.data.command === 'start') {
        const { duration, unit, name } = event.data;
        
        const durationMs = (unit === 'seconds') ? duration * 1000 : duration * 60 * 1000;
        const calculatedEndTime = Date.now() + durationMs;
        const durationInMinutes = (unit === 'seconds') ? duration / 60 : duration;

        console.log("SW: Type of self.localStorage (start):", typeof self.localStorage); // ADDED LOG
        self.localStorage.setItem(LS_END_TIME_KEY, calculatedEndTime.toString());
        self.localStorage.setItem(LS_INITIAL_DURATION_KEY, durationInMinutes.toString());
        self.localStorage.setItem(LS_PROFILE_NAME_KEY, name);

        endTime = calculatedEndTime;
        initialDuration = durationInMinutes;
        profileName = name;

        startSWTimer();

    } else if (event.data.command === 'stop') {
        stopSWTimer();

    } else if (event.data.command === 'query') {
        console.log("SW: Type of self.localStorage (query):", typeof self.localStorage); // ADDED LOG
        const storedEndTime = self.localStorage.getItem(LS_END_TIME_KEY);
        const storedInitialDuration = self.localStorage.getItem(LS_INITIAL_DURATION_KEY);
        const storedProfileName = self.localStorage.getItem(LS_PROFILE_NAME_KEY);

        if (storedEndTime && storedInitialDuration && storedProfileName) {
            endTime = parseInt(storedEndTime);
            initialDuration = parseFloat(storedInitialDuration);
            profileName = storedProfileName;
            
            const remainingMs = endTime - Date.now();
            if (remainingMs > 0) {
                broadcast({ command: 'tick', remaining: remainingMs, duration: initialDuration, profile: profileName });
                if (!countdownInterval) { // Restart timer if SW was asleep
                    startSWTimer();
                }
            } else {
                // Timer already finished while SW was asleep
                stopSWTimer(); // Clean up state
            }
        } else {
            broadcast({ command: 'stopped' });
        }
    }
});