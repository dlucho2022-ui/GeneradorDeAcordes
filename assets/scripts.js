console.log("scripts.js loaded and executing."); // Add this line at the very beginning

const semitonos_display = ["Do", "Do#", "Reb", "Re", "Re#", "Mib", "Mi", "Fa", "Fa#", "Solb", "Sol", "Sol#", "Lab", "La", "La#", "Sib", "Si"];
const semitonos_calculo = ["Do", "Do#", "Re", "Re#", "Mi", "Fa", "Fa#", "Sol", "Sol#", "La", "La#", "Si"];

const enarmonicos_map = {
    "Do#": "Reb", "Reb": "Do#",
    "Re#": "Mib", "Mib": "Re#",
    "Fa#": "Solb", "Solb": "Fa#",
    "Sol#": "Lab", "Lab": "Sol#",
    "La#": "Sib", "Sib": "La#",
    "Mi#": "Fa", "Fab": "Mi",
    "Si#": "Do", "Dob": "Si"
};

const notasBase = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"];

const escalas_modos = {
    "Jónico": { "intervalos": [0, 2, 4, 5, 7, 9, 11], "grados": ["1", "2", "3", "4", "5", "6", "7"], "acordes": ["maj7", "m7", "m7", "maj7", "7", "m7", "m7b5"] },
    "Dórico": { "intervalos": [0, 2, 3, 5, 7, 9, 10], "grados": ["1", "2", "b3", "4", "5", "6", "b7"], "acordes": ["m7", "m7", "maj7", "7", "m7", "m7b5", "maj7"] },
    "Frigio": { "intervalos": [0, 1, 3, 5, 7, 8, 10], "grados": ["1", "b2", "b3", "4", "5", "b6", "b7"], "acordes": ["m7", "maj7", "7", "m7", "m7b5", "maj7", "m7"] },
    "Lidio": { "intervalos": [0, 2, 4, 6, 7, 9, 11], "grados": ["1", "2", "3", "#4", "5", "6", "7"], "acordes": ["maj7", "7", "m7", "m7b5", "maj7", "m7", "m7"] },
    "Mixolidio": { "intervalos": [0, 2, 4, 5, 7, 9, 10], "grados": ["1", "2", "3", "4", "5", "6", "b7"], "acordes": ["7", "m7", "m7b5", "maj7", "m7", "m7", "maj7"] },
    "Eólico": { "intervalos": [0, 2, 3, 5, 7, 8, 10], "grados": ["1", "2", "b3", "4", "5", "b6", "b7"], "acordes": ["m7", "m7b5", "maj7", "m7", "m7", "maj7", "7"] },
    "Locrio": { "intervalos": [0, 1, 3, 5, 6, 8, 10], "grados": ["1", "b2", "b3", "4", "b5", "b6", "b7"], "acordes": ["m7b5", "maj7", "m7", "m7", "maj7", "7", "m7"] },
    "Menor Armónica": { "intervalos": [0, 2, 3, 5, 7, 8, 11], "grados": ["1", "2", "b3", "4", "5", "b6", "7"], "acordes": ["m△7", "m7b5", "△7#5", "m7", "7", "maj7", "dim7"] },
    "Menor Húngara": { "intervalos": [0, 2, 3, 6, 7, 8, 11], "grados": ["1", "2", "b3", "#4", "5", "b6", "7"], "acordes": ["m△7", "m7b5", "△7#5", "7", "7", "m7b5", "dim7"] },
    "Hexatonal (Tonos Enteros)": { "intervalos": [0, 2, 4, 6, 8, 10], "grados": ["1", "2", "3", "#4", "#5", "b7"], "acordes": ["△7#5", "△7#5", "△7#5", "△7#5", "△7#5", "△7#5"] },
    "Pentatónica Mayor": { "intervalos": [0, 2, 4, 7, 9], "grados": ["1", "2", "3", "5", "6"], "acordes": ["7", "7", "7", "7", "7"] },
    "Pentatónica Menor": { "intervalos": [0, 3, 5, 7, 10], "grados": ["1", "b3", "4", "5", "b7"], "acordes": ["7", "7", "7", "7", "7"] },
    "Hirajōshi": { "intervalos": [0, 2, 3, 7, 8], "grados": ["1", "2", "b3", "5", "b6"], "acordes": [] },
    "Elefante": { "intervalos": [0, 1, 2, 4, 5, 8, 10], "grados": ["1", "b2", "2", "3", "4", "b6", "b7"], "acordes": ["7#5", "m△7", "m7b5", "7b5", "m△7", "maj7", "7"] },
    "Árabe": { "intervalos": [0, 1, 4, 5, 7, 8, 11], "grados": ["1", "b2", "3", "4", "5", "b6", "7"], "acordes": ["m△7", "maj7", "m7b5", "m7", "7", "maj7", "dim7"] },
    "Blues": { "intervalos": [0, 3, 5, 6, 7, 10], "grados": ["1", "b3", "4", "b5", "5", "b7"], "acordes": ["7", "7", "7", "7", "7", "7"] },
    "Disminuida Tono-Semitono": { "intervalos": [0, 2, 3, 5, 6, 8, 9, 11], "grados": ["1", "2", "b3", "4", "b5", "b6", "6", "7"], "acordes": ["7", "m7", "m7b5", "maj7", "m7b5", "maj7", "7", "m7"] },
    "Disminuida Semitono-Tono": { "intervalos": [0, 1, 3, 4, 6, 7, 9, 10], "grados": ["1", "b2", "b3", "3", "b5", "5", "6", "b7"], "acordes": ["dim7", "dim7", "dim7", "dim7", "dim7", "dim7", "dim7", "dim7"] },
    "Menor Melódica": { "intervalos": [0, 2, 3, 5, 7, 9, 11], "grados": ["1", "2", "b3", "4", "5", "6", "7"], "acordes": ["m△7", "m7", "△7#5", "7", "7", "m7b5", "m7b5"] },
    "Dórico b2": { "intervalos": [0, 1, 3, 5, 7, 9, 10], "grados": ["1", "b2", "b3", "4", "5", "6", "b7"], "acordes": ["m7", "△7", "7", "m7", "m7b5", "△7", "m7"] },
    "Lidio Aumentado": { "intervalos": [0, 2, 4, 6, 8, 9, 11], "grados": ["1", "2", "3", "#4", "#5", "6", "7"], "acordes": ["△7#5", "7", "m7", "m7b5", "m7b5", "m7", "m7"] },
    "Lidio b7": { "intervalos": [0, 2, 4, 6, 7, 9, 10], "grados": ["1", "2", "3", "#4", "5", "6", "b7"], "acordes": ["7", "m7", "m7b5", "△7", "m7", "m7", "△7"] },
    "Mixolidio b13": { "intervalos": [0, 2, 4, 5, 7, 8, 10], "grados": ["1", "2", "3", "4", "5", "b6", "b7"], "acordes": ["7", "m7", "m7b5", "△7", "m7", "m7", "△7"] },
    "Locrio #2": { "intervalos": [0, 2, 3, 5, 6, 8, 10], "grados": ["1", "2", "b3", "4", "b5", "b6", "b7"], "acordes": ["m7b5", "△7", "m7", "m7", "△7", "7", "m7"] },
    "Superlocria": { "intervalos": [0, 1, 3, 4, 6, 8, 10], "grados": ["1", "b2", "b3", "b4", "b5", "b6", "b7"], "acordes": ["m7b5", "△7", "m7", "m7", "△7", "7", "m7"] },
    "Locrio ♮6": { "intervalos": [0, 1, 3, 5, 6, 9, 10], "grados": ["1", "b2", "b3", "4", "b5", "6", "b7"], "acordes": ["m7b5", "△7#5", "m7", "7", "maj7", "dim7", "m△7"] },
    "Jónico Aumentado": { "intervalos": [0, 2, 4, 6, 8, 9, 11], "grados": ["1", "2", "3", "#4", "#5", "6", "7"], "acordes": ["△7#5", "7", "7", "m7b5", "m7b5", "m△7", "m7"] },
    "Dórico ♯4": { "intervalos": [0, 2, 3, 6, 7, 9, 10], "grados": ["1", "2", "b3", "#4", "5", "6", "b7"], "acordes": ["m7", "7", "maj7", "7", "m△7", "m7b5", "△7#5"] },
    "Frigio Dominante": { "intervalos": [0, 1, 4, 5, 7, 8, 10], "grados": ["1", "b2", "3", "4", "5", "b6", "b7"], "acordes": ["7", "maj7", "m7b5", "m△7", "m7b5", "△7#5", "m7"] },
    "Superlocrio 𝄫7": { "intervalos": [0, 1, 3, 4, 6, 8, 9], "grados": ["1", "b2", "b3", "b4", "b5", "b6", "bb7"], "acordes": ["m7b5", "m△7", "m7", "△7#5", "7", "7", "m7b5"] },
    "Menor Armónica Bebop": { "intervalos": [0, 2, 3, 5, 7, 8, 10, 11], "grados": ["1", "2", "b3", "4", "5", "b6", "b7", "7"], "acordes":["m7", "m7b5", "maj7", "m7", "m7", "maj7", "7", "dim7"] },
    "Doble Armónica": { "intervalos": [0, 1, 4, 5, 7, 8, 11], "grados": ["1", "b2", "3", "4", "5", "b6", "7"], "acordes": ["maj7", "maj7", "m7b5", "m△7", "7b5", "△7#5", "dim7"] },
    "Lidio ♯2": { "intervalos": [0, 3, 4, 6, 7, 9, 11], "grados": ["1", "#2", "3", "#4", "5", "6", "7"], "acordes": ["maj7", "dim7", "m△7", "7b5", "△7#5", "dim7", "maj7"] },
    "Ultrafrigio": { "intervalos": [0, 1, 3, 4, 7, 8, 9], "grados": ["1", "b2", "b3", "b4", "5", "b6", "bb7"], "acordes": ["m7b5", "m△7", "7b5", "△7#5", "dim7", "maj7", "maj7"] },
    "Gitana Mayor": { "intervalos": [0, 2, 3, 5, 6, 9, 10], "grados": ["1", "2", "b3", "4", "b5", "6", "b7"], "acordes": ["m△7", "7b5", "△7#5", "dim7", "maj7", "maj7", "m7b5"] },
    "Oriental": { "intervalos": [0, 1, 4, 5, 7, 8, 10], "grados": ["1", "b2", "3", "4", "5", "b6", "b7"], "acordes": ["7b5", "△7#5", "dim7", "maj7", "maj7", "m7b5", "m△7"] },
    "Jónico Aumentado ♯2": { "intervalos": [0, 3, 4, 5, 8, 9, 11], "grados": ["1", "#2", "3", "4", "#5", "6", "7"], "acordes": ["△7#5", "dim7", "maj7", "maj7", "m7b5", "m△7", "7b5"] },
    "Locrio ♭♭7": { "intervalos": [0, 1, 2, 5, 6, 8, 9], "grados": ["1", "b2", "bb3", "4", "b5", "b6", "bb7"], "acordes": ["dim7", "maj7", "maj7", "m7b5", "m△7", "7b5", "△7#5"] }

};


const acordes = {
    "Mayor Séptima (maj7)": { "intervalos": [0, 4, 7, 11], "grados": ["1", "3", "5", "7"], "notacion": "maj7" },
    "Menor Séptima (m7)": { "intervalos": [0, 3, 7, 10], "grados": ["1", "b3", "5", "b7"], "notacion": "m7" },
    "Séptima de Dominante (7)": { "intervalos": [0, 4, 7, 10], "grados": ["1", "3", "5", "b7"], "notacion": "7" },
    "Menor Séptima con Quinta Disminuida (m7b5)": { "intervalos": [0, 3, 6, 10], "grados": ["1", "b3", "b5", "b7"], "notacion": "m7b5" },
    "Disminuido Séptima (dim7)": { "intervalos": [0, 3, 6, 9], "grados": ["1", "b3", "b5", "bb7"], "notacion": "dim7" },
    "Menor Séptima Mayor (m△7)": { "intervalos": [0, 3, 7, 11], "grados": ["1", "b3", "5", "7"], "notacion": "m△7" },
    "Aumentado Séptima Mayor (△7#5)": { "intervalos": [0, 4, 8, 11], "grados": ["1", "3", "#5", "7"], "notacion": "△7#5" },
    "Séptima con Quinta Aumentada (7#5)": { "intervalos": [0, 4, 8, 10], "grados": ["1", "3", "#5", "b7"], "notacion": "7#5" },
    "Séptima con Quinta Disminuida (7b5)": { "intervalos": [0, 4, 6, 10], "grados": ["1", "3", "b5", "b7"], "notacion": "7b5" },
};

const todasLasOpciones = { ...escalas_modos, ...acordes };

const audios_acordes = {};
let audioContext;
let isPlaying = false;
let currentAudio = null;
let currentTimeout = null;
let currentProgressionIndex = 0;
let currentProgression = [];
let chordVolumeLinear = Math.pow(10, -6 / 20); // Default value from slider



let chordSampler;
let arpeggioSampler;
let pianoVolume;
let arpeggioVolume;

const acorde_audio_map = {
    "maj7": "maj7", "m7": "m7", "7": "7", "m7b5": "m7b5",
    "dim7": "dim7", "m△7": "m-maj7"
  , "△7#5": "aug-maj7", "△7": "maj7", "7#5": "7aug5", "7b5": "7b5",
    "7#9": "7", "7b9": "7"
};
const notaAudioMap = {
    "Do": "c", "Do#": "c-sharp", "Reb": "c-sharp", "Re": "d", "Re#": "d-sharp", "Mib": "d-sharp", "Mi": "e",
    "Fa": "f", "Fa#": "f-sharp", "Solb": "f-sharp", "Sol": "g", "Sol#": "g-sharp", "Lab": "g-sharp",
    "La": "a", "La#": "a-sharp", "Sib": "a-sharp", "Si": "b", "Si#": "c", "Mi#": "f", "Fab": "e",
    "Fax": "g", "Dox": "d", "Solx": "a", "Lax": "b", "Six": "c-sharp", "Mix": "f-sharp", "Rex": "e",
    "Sibb": "a", "Mibb": "d", "Labb": "g", "Rebb": "c", "Solbb": "f", "Dobb": "a-sharp", "Fabb": "d-sharp", "Sibbb": "g-sharp"
};

const toneNoteMap = {
    "Do": "C", "Do#": "C#", "Reb": "Db", "Re": "D", "Re#": "D#", "Mib": "Eb",
    "Mi": "E", "Fa": "F", "Fa#": "F#", "Solb": "Gb", "Sol": "G", "Sol#": "G#",
    "Lab": "Ab", "La": "A", "La#": "A#", "Sib": "Bb", "Si": "B"
};


// --- LÓGICA DEL METRÓNOMO INTEGRADO ---
let metronomeInterval = null;
let isMetronomePlaying = false;
let metronomeSound;
let metronomeGainNode;
let tapTimes = [];

async function loadMetronomeSound() {
    try {
        const response = await fetch('assets/audios/metronome_click.wav');
        const arrayBuffer = await response.arrayBuffer();
        metronomeSound = await audioContext.decodeAudioData(arrayBuffer);

        metronomeGainNode = audioContext.createGain();
        const metronomeVolume = document.getElementById('metronome-volume');
        // Convert initial dB value from slider to linear gain
        metronomeGainNode.gain.value = Math.pow(10, metronomeVolume.value / 20);
        metronomeGainNode.connect(audioContext.destination);

    } catch (e) {
        console.error("Error al cargar el sonido del metrónomo:", e);
    }
}

function playMetronomeClick() {
    if (metronomeSound) {
        const source = audioContext.createBufferSource();
        source.buffer = metronomeSound;
        source.connect(metronomeGainNode);
        source.start(0);
    }
}

function startMetronome() {
    const bpm = parseInt(document.getElementById('bpm-input').value);
    if (isNaN(bpm) || bpm <= 0) {
        alert('Por favor, ingresa un BPM válido.');
        return;
    }
    const intervalMs = 60000 / bpm;

    metronomeInterval = setInterval(playMetronomeClick, intervalMs);
    document.getElementById('metronome-start-stop').innerHTML = '<i class="fas fa-stop"></i> Stop';
    isMetronomePlaying = true;
}

function stopMetronome() {
    clearInterval(metronomeInterval);
    document.getElementById('metronome-start-stop').innerHTML = '<i class="fas fa-play"></i> Start';
    isMetronomePlaying = false;
}

function updateMetronomeBPM(bpm) {
    document.getElementById('bpm-input').value = bpm;
    document.getElementById('bpm-slider').value = bpm;
    document.getElementById('bpm-value-display').textContent = bpm;
    if (isMetronomePlaying) {
        clearInterval(metronomeInterval);
        const intervalMs = 60000 / bpm;
        metronomeInterval = setInterval(playMetronomeClick, intervalMs);
    }
    if(isPlaying){ // If progression is playing, update its tempo too
        Tone.Transport.bpm.value = bpm;
        // Stop and restart the chordLoop to ensure timing is re-calculated
        if (chordLoop) {
            chordLoop.stop().dispose(); // Stop and dispose the old loop
        }
        startChordLoop(); // Re-create and start the loop with the new BPM
    }
}

// --- FIN DE LA LÓGICA DEL METRÓNOMO INTEGRADO ---

function mapNotaToSemitone(nota) {
    const semitonoMap = {
        "Do": 0, "Do#": 1, "Reb": 1, "Re": 2, "Re#": 3, "Mib": 3, "Mi": 4,
        "Fa": 5, "Fa#": 6, "Solb": 6, "Sol": 7, "Sol#": 8, "Lab": 8,
        "La": 9, "La#": 10, "Sib": 10, "Si": 11,
        "Mi#": 5, "Si#": 0, "Fab": 4, "Dob": 11,
        "Dox": 2, "Fax": 7, "Solx": 9, "Lax": 11, "Six": 1, "Rex": 4, "Mix": 6,
        "Rebb": 0, "Mibb": 2, "Fabb": 3, "Solbb": 5, "Labb": 7, "Sibb": 9, "Dobb": 10, "Sibbb": 8
    };
    return semitonoMap[nota] !== undefined ? semitonoMap[nota] : -1;
}

function getIntervaloSemitonos(nota1, nota2) {
    let pos1 = mapNotaToSemitone(nota1);
    let pos2 = mapNotaToSemitone(nota2);

    if (pos1 === -1 || pos2 === -1) return -1;

    let diff = pos2 - pos1;
    if (diff < 0) {
        diff += 12;
    }
    return diff;
}

function getTipoAcorde(intervalos) {
    const acordesTriada = {
        "0,4,7": "maj", "0,3,7": "m", "0,4,8": "aug", "0,3,6": "dim"
    };
    const acordesSeptima = {
        "0,4,7,11": "maj7", "0,3,7,10": "m7", "0,4,7,10": "7", "0,3,6,10": "m7b5",
        "0,3,6,9": "dim7", "0,3,7,11": "m△7", "0,4,8,11": "△7#5", "0,4,8,10": "7#5", "0,4,6,10": "7b5"
    };

    const intervalosStr = intervalos.join(',');
    if (intervalos.length === 3) return acordesTriada[intervalosStr] || " (?) ";
    if (intervalos.length === 4) return acordesSeptima[intervalosStr] || " (?) ";
    return " (?) ";
}

async function loadAudioFiles() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Initialize Salamander Piano Sampler
    // Initialize volumes
    pianoVolume = new Tone.Volume(-6).toDestination();
    arpeggioVolume = new Tone.Volume(-12).toDestination(); // Default arpeggio volume

    // Initialize Samplers
    try {
        chordSampler = new Tone.Sampler({
            urls: { 'C4':'C4.mp3', 'D#4':'Ds4.mp3', 'F#4':'Fs4.mp3', 'A4':'A4.mp3' },
            release: 0.5,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).connect(pianoVolume);

        arpeggioSampler = new Tone.Sampler({
            urls: { 'C4':'C4.mp3', 'D#4':'Ds4.mp3', 'F#4':'Fs4.mp3', 'A4':'A4.mp3' },
            release: 0.5,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).connect(arpeggioVolume);
    } catch (e) {
        console.error("Error initializing Tone.Sampler:", e);
    }

    const notas_audio = ["c", "c-sharp", "d", "d-sharp", "e", "f", "f-sharp", "g", "g-sharp", "a", "a-sharp", "b"];
    const tipos_acorde = ["7", "m7", "dim7", "m7b5", "maj7", "m-maj7", "aug-maj7", "7b5", "7aug5", ];
    for (const nota of notas_audio) {
        for (const tipo of tipos_acorde) {
            const audioKey = `${nota}-${tipo}`;
            audios_acordes[audioKey] = new Audio(`assets/audios/${nota}-${tipo}.mp3`);
        }
    }
    
    await loadMetronomeSound();

    // Debugging: Check if samplers are loaded
    Promise.all([chordSampler.loaded, arpeggioSampler.loaded])
        .then(() => {
            console.log("Samplers de piano cargados correctamente.");
        })
        .catch(e => {
            console.error("Error al cargar los samplers de piano:", e);
        });
}

function getPlayablePianoNotes(chordNoteNames, startOctave = 4) {
    // 1. Map notes to objects with their pitch value (0-11)
    //    Do NOT sort here. Assume chordNoteNames is already in musical order.
    const notesWithPitch = chordNoteNames.map(name => ({
        name: name,
        pitch: mapNotaToSemitone(name)
    })).filter(n => n.pitch !== -1); // Filter out any notes that couldn't be mapped

    // 3. Assign octaves to ensure ascending order based on original sequence
    let lastPitch = -1; // Use -1 to ensure the first note doesn't trigger an octave jump
    let currentOctave = startOctave;
    const playableNotes = notesWithPitch.map(note => {
        // If the current note's pitch is lower than the previous one, it means we've crossed an octave boundary
        // For example, B (11) to C (0)
        if (lastPitch !== -1 && note.pitch < lastPitch) { // Only increment if it's not the very first note
            currentOctave++;
        }
        lastPitch = note.pitch;
        const mappedNote = toneNoteMap[note.name]; // Convert "Do" to "C"
        return mappedNote ? mappedNote + currentOctave : null;
    }).filter(n => n);

    return playableNotes;
}

function playChord(nota, tipo, duracion = null) {
    stopAudio();
    let notaParaAudio = nota;
    if (!notaAudioMap.hasOwnProperty(nota)) {
        if (enarmonicos_map.hasOwnProperty(nota)) {
            notaParaAudio = enarmonicos_map[nota];
        } else {
            console.warn(`No se encontró un mapeo de audio para la nota ${nota}.`);
            return;
        }
    }
    const notaAudio = notaAudioMap[notaParaAudio];
    const tipoAudio = acorde_audio_map[tipo] || tipo;
    const key = `${notaAudio}-${tipoAudio}`;

    const audio = audios_acordes[key];
    if (audio) {
        audio.volume = chordVolumeLinear;
        audio.currentTime = 0;
        audio.loop = false;
        audio.play().catch(e => console.error("Error al reproducir el audio:", e));
        currentAudio = audio;

        if (duracion !== null) {
            currentTimeout = setTimeout(() => {
                stopAudio();
            }, duracion);
        }
    } else {
        console.warn(`No se encontró el archivo de audio para ${notaParaAudio}-${tipoAudio}.`);
        currentAudio = null;
    }
}

function getPlayablePianoNotes(chordNoteNames, startOctave = 4) {
    // 1. Map notes to objects with their pitch value (0-11)
    //    Do NOT sort here. Assume chordNoteNames is already in musical order.
    const notesWithPitch = chordNoteNames.map(name => ({
        name: name,
        pitch: mapNotaToSemitone(name)
    })).filter(n => n.pitch !== -1); // Filter out any notes that couldn't be mapped

    // 3. Assign octaves to ensure ascending order based on original sequence
    let lastPitch = -1; // Use -1 to ensure the first note doesn't trigger an octave jump
    let currentOctave = startOctave;
    const playableNotes = notesWithPitch.map(note => {
        // If the current note's pitch is lower than the previous one, it means we've crossed an octave boundary
        // For example, B (11) to C (0)
        if (lastPitch !== -1 && note.pitch < lastPitch) { // Only increment if it's not the very first note
            currentOctave++;
        }
        lastPitch = note.pitch;
        const mappedNote = toneNoteMap[note.name]; // Convert "Do" to "C"
        return mappedNote ? mappedNote + currentOctave : null;
    }).filter(n => n);

    return playableNotes;
}

// New function to play a sequence of notes (scale or arpeggio)
async function playScaleOrArpeggio(notes, octave = 4, duration = '8n') { // Keep octave parameter
    if (!arpeggioSampler || !arpeggioSampler.loaded) {
        console.warn("Sampler de arpegio no cargado. No se puede reproducir la escala/arpegio.");
        return;
    }

    // Get the notes with correct octave assignments, starting from the specified octave
    const basePlayableNotes = getPlayablePianoNotes(notes, octave); // Pass octave here

    if (basePlayableNotes.length === 0) {
        console.warn("No hay notas válidas para reproducir.");
        return;
    }

    let fullAscendingSequence = [...basePlayableNotes];

    // Add the root note an octave higher to complete the scale/arpeggio
    const rootNoteTone = toneNoteMap[notes[0]]; // Get the Tone.js name for the original root note
    if (rootNoteTone) {
        // The octave of the root note in basePlayableNotes should be 'octave'
        fullAscendingSequence.push(`${rootNoteTone}${octave + 1}`);
    }

    const allNotesToPlay = [...fullAscendingSequence, ...fullAscendingSequence.slice(0, -1).reverse()];

    let time = Tone.now();
    const noteDuration = Tone.Time(duration).toSeconds();
    const delayBetweenNotes = noteDuration * 0.1;

    for (let i = 0; i < allNotesToPlay.length; i++) {
        const note = allNotesToPlay[i];
        arpeggioSampler.triggerAttackRelease(note, duration, time);
        time += noteDuration + delayBetweenNotes;
    }
}

function stopAudio() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
    if (currentTimeout) {
        clearTimeout(currentTimeout);
        currentTimeout = null;
    }
}

function simplifyEnharmonic(note) {
    // This function translates theoretically correct but hard-to-read note names
    // into their simpler, more common enharmonic equivalents for display purposes.
    switch (note) {
        // User-specified enharmonics that were requested
        case "Mi#": return "Fa";
        case "Si#": return "Do";
        case "Fab": return "Mi";
        case "Dob": return "Si";

        // Double sharps (x)
        case "Dox": return "Re";
        case "Rex": return "Mi";
        case "Mix": return "Fa#";
        case "Fax": return "Sol";
        case "Solx": return "La";
        case "Lax": return "Si";
        case "Six": return "Do#";

        // Double flats (bb)
        case "Rebb": return "Do";
        case "Mibb": return "Re";
        case "Solbb": return "Fa";
        case "Labb": return "Sol";
        case "Sibb": return "La";
        case "Dobb": return "Sib";
        case "Fabb": return "Mib";
        
        // Triple sharps (xxx) - for completeness
        case "Doxxx": return "Re#";
        case "Rexxx": return "Fa";
        case "Mixxx": return "Sol";
        case "Faxxx": return "Sol#";
        case "Solxxx": return "La#";
        case "Laxxx": return "Do";

        // Triple flats (bbb) - for completeness
        case "Rebbb": return "Si";
        case "Mibbb": return "Do#";
        case "Solbbb": return "Mi";
        case "Labbb": return "Fa#";
        case "Sibbb": return "Sol#";
        case "Dobbb": return "La";
        case "Fabbb": return "Re";

        // Default case for notes that don't need simplification
        default: return note;
    }
}

function getProperNoteNameForScale(rootNote, intervalIndex, semitoneInterval) {
    const rootBaseNote = rootNote.replace(/[#bx]/g, ''); 
    const rootBaseIndex = notasBase.indexOf(rootBaseNote);
    const targetBaseNote = notasBase[(rootBaseIndex + intervalIndex) % 7];
    const rootSemitone = mapNotaToSemitone(rootNote);
    const targetNoteSemitone = (rootSemitone + semitoneInterval + 12) % 12;

    const targetBaseSemitone = mapNotaToSemitone(targetBaseNote);
    let diff = (targetNoteSemitone - targetBaseSemitone + 12) % 12;

    // Nueva lógica para manejar todas las alteraciones posibles
    let accidental = "";
    if (diff === 0) {
        accidental = ""; // Sin alteración
    } else if (diff === 1) {
        accidental = "#";
    } else if (diff === 2) {
        accidental = "x";
    } else if (diff === 3) {
        accidental = "xxx"; // Triple sostenido
    } else if (diff === 11) {
        accidental = "b";
    } else if (diff === 10) {
        accidental = "bb";
    } else if (diff === 9) {
        accidental = "bbb"; // Triple bemol
    } else {
        // Enarmónico: busca un nombre de nota alternativo si la alteración es inusual
        const enharmonic = semitonos_display.find(n => mapNotaToSemitone(n) === targetNoteSemitone);
        return enharmonic || targetBaseNote + ' (?)';
    }

    return targetBaseNote + accidental;

}

function getFormattedNoteForDisplay(note) {
    return note.replace(/x/g, '<span class="alteration">x</span>').replace(/bb/g, '<span class="alteration flat">bb</span>');
}

function getBluesNotes(rootNote) {
    const semitonosBlues = [0, 3, 5, 6, 7, 10];
    const rootSemitone = mapNotaToSemitone(rootNote);
    const escala = [];

    for (const semitono of semitonosBlues) {
        const notaSemitono = (rootSemitone + semitono) % 12;
        let nota = semitonos_calculo[notaSemitono];

        if (rootNote.includes('b')) {
            nota = enarmonicos_map[nota] || nota;
        }
        escala.push(nota);
    }
    return escala;
}

function getDiatonicIndexFromGrade(grado) {
    const gradoMap = {
        "1": 0, "b2": 1, "2": 1, "#2": 2, "b3": 2, "3": 2, "b4": 3, "4": 3, "#4": 4, "b5": 4, "5": 4, "b6": 5, "6": 5, "bb7": 6, "b7": 6, "7": 6,
        "b9": 1, "9": 1, "#9": 2, "b11": 3, "11": 3, "#11": 4, "b13": 5, "13": 5,
    };
    const baseGrado = grado.replace(/[#b]/g, '');
    return gradoMap[baseGrado] || 0;
}

let selectedTonalidad = "Do";
let selectedEscala = "";
let selectedAcorde = "";

function renderSelectors() {
    const tonalidadOptionsContainer = document.getElementById('tonalidad-options');
    tonalidadOptionsContainer.innerHTML = '';
    semitonos_display.forEach(nota => {
        const option = document.createElement('div');
        option.className = 'card-option';
        option.textContent = nota;
        option.dataset.value = nota;
        if (nota === selectedTonalidad) {
            option.classList.add('selected');
        }
        option.addEventListener('click', () => {
            selectedTonalidad = nota;
            document.querySelectorAll('#tonalidad-options .card-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            calcularEscala();

            // Actualizar preview y patrón de batería si hay una progresión seleccionada
            const select = document.getElementById('predefined-progressions-select');
            if (select.value !== '') {
                const progression = predefinedProgressions[parseInt(select.value)];
                const event = new Event('change');
                select.dispatchEvent(event);
            }
        });
        tonalidadOptionsContainer.appendChild(option);
    });

    const escalaOptionsContainer = document.getElementById('escala-options');
    escalaOptionsContainer.innerHTML = '';
    const escalaDefaultOption = document.createElement('div');
    escalaDefaultOption.className = 'card-option';
    escalaDefaultOption.textContent = 'Ninguna';
    escalaDefaultOption.dataset.value = '';
    if (selectedEscala === '') {
        escalaDefaultOption.classList.add('selected');
    }
    escalaDefaultOption.addEventListener('click', () => {
        selectedEscala = '';
        selectedAcorde = '';
        document.querySelectorAll('#escala-options .card-option').forEach(opt => opt.classList.remove('selected'));
        escalaDefaultOption.classList.add('selected');
        document.querySelectorAll('#acorde-options .card-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelector('#acorde-options .card-option[data-value=""]').classList.add('selected');
        calcularEscala();
    });
    escalaOptionsContainer.appendChild(escalaDefaultOption);

    Object.keys(escalas_modos).forEach(opcion => {
        const option = document.createElement('div');
        option.className = 'card-option';
        option.textContent = opcion;
        option.dataset.value = opcion;
        if (opcion === selectedEscala) {
            option.classList.add('selected');
        }
        option.addEventListener('click', () => {
            selectedEscala = opcion;
            selectedAcorde = '';
            document.querySelectorAll('#escala-options .card-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            document.querySelectorAll('#acorde-options .card-option').forEach(opt => opt.classList.remove('selected'));
            document.querySelector('#acorde-options .card-option[data-value=""]').classList.add('selected');
            calcularEscala();
        });
        escalaOptionsContainer.appendChild(option);
    });

    const acordeOptionsContainer = document.getElementById('acorde-options');
    acordeOptionsContainer.innerHTML = '';
    const acordeDefaultOption = document.createElement('div');
    acordeDefaultOption.className = 'card-option';
    acordeDefaultOption.textContent = 'Ninguno';
    acordeDefaultOption.dataset.value = '';
    if (selectedAcorde === '') {
        acordeDefaultOption.classList.add('selected');
    }
    acordeDefaultOption.addEventListener('click', () => {
        selectedAcorde = '';
        selectedEscala = '';
        document.querySelectorAll('#acorde-options .card-option').forEach(opt => opt.classList.remove('selected'));
        acordeDefaultOption.classList.add('selected');
        document.querySelectorAll('#escala-options .card-option').forEach(opt => opt.classList.remove('selected'));
        document.querySelector('#escala-options .card-option[data-value=""]').classList.add('selected');
        calcularEscala();
    });
    acordeOptionsContainer.appendChild(acordeDefaultOption);

    Object.keys(acordes).forEach(opcion => {
        const option = document.createElement('div');
        option.className = 'card-option';
        option.textContent = opcion.replace("Menor Séptima con Quinta Disminuida", "Semidisminuido").replace("Disminuido Séptima", "Disminuido");
        option.dataset.value = opcion;
        if (opcion === selectedAcorde) {
            option.classList.add('selected');
        }
        option.addEventListener('click', () => {
            selectedAcorde = opcion;
            selectedEscala = '';
            document.querySelectorAll('#acorde-options .card-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            document.querySelectorAll('#escala-options .card-option').forEach(opt => opt.classList.remove('selected'));
            document.querySelector('#escala-options .card-option[data-value=""]').classList.add('selected');
            calcularEscala();
        });
        acordeOptionsContainer.appendChild(option);
    });
}

function formatChordDisplay(acorde) {
    if (!acorde) return '';
    let formatted = acorde.replace('maj7', '△7').replace('m7b5', 'ø7').replace('dim7', '°').replace('maj', '');
    if (formatted == 'aug') {
        return `<span class="acorde-subscript">${formatted}</span>`;
    }
    return `<span>${formatted}</span>`;
}


function calcularEscala() {
    // stopAllNotes(); // This function is removed
    const resultadoBox = document.getElementById('resultado-box');
    const contextoBox = document.getElementById('contexto-box');
    const selectedSemitono = selectedTonalidad;
    

    if (isPlaying) {
        togglePlay();
    }
    if(isMetronomePlaying){
        stopMetronome();
    }

    if (!selectedSemitono || (!selectedEscala && !selectedAcorde)) {
        resultadoBox.innerHTML = "Por favor, seleccione una tonalidad y una escala o acorde.";
        contextoBox.style.display = 'none';
        return;
    }

    if (selectedEscala) {
        const opcionesSeleccionadas = escalas_modos[selectedEscala];
        let escalaNotas = [];
        let grados = [];

        if (selectedEscala === "Blues") {
            escalaNotas = getBluesNotes(selectedSemitono);
            grados = opcionesSeleccionadas.grados;
        } else {
            const intervalos = opcionesSeleccionadas.intervalos;
            grados = opcionesSeleccionadas.grados;
            for (let i = 0; i < intervalos.length; i++) {
                const indiceDiatonico = getDiatonicIndexFromGrade(grados[i]);
                escalaNotas.push(getProperNoteNameForScale(selectedSemitono, indiceDiatonico, intervalos[i]));
            }
        }

        const escalaNotasDisplay = escalaNotas.map(nota => simplifyEnharmonic(nota)); // Get simplified notes for playback
        const gradosDisplay = grados; // Use original grades for display

        const acordesPredefinidos = opcionesSeleccionadas.acordes;
        let acordesHtml = "";

        if (acordesPredefinidos && acordesPredefinidos.length > 0) {
            if (selectedEscala === "Blues" || selectedEscala === "Pentatónica Mayor" || selectedEscala === "Pentatónica Menor") {
                acordesGenerados = generarAcordesDominantes(escalaNotas);
            } else {
                acordesGenerados = generarAcordesDiatonicos(escalaNotas, acordesPredefinidos);
            }
            acordesHtml = `
                <p><strong>Acordes Diatónicos (haz clic para añadir a la progresión):</strong></p>
                <ul class="acordes-list">${acordesGenerados}</ul>
            `;
            contextoBox.innerHTML = acordesHtml;
            updateProgressionDisplay();
        } else {
            acordesHtml = `
                <p class="no-chords-message">No hay acordes predeterminados para esta escala.</p>
            `;
            contextoBox.innerHTML = acordesHtml;
        }

        resultadoBox.innerHTML = `
            Escala de ${getFormattedNoteForDisplay(selectedSemitono)} ${selectedEscala}<br>
            Notas: <button class="result-button" id="playScaleNotes">${escalaNotasDisplay.map(nota => getFormattedNoteForDisplay(nota)).join(' - ')}</button><br>
            Grados: <button class="result-button" id="playScaleGrades">${gradosDisplay.join(' - ')}</button>
            <br>
        `;

        contextoBox.style.display = 'block';

        // Add event listeners after elements are in DOM
        document.getElementById('playScaleNotes').addEventListener('click', () => {
            playScaleOrArpeggio(escalaNotasDisplay); // Play the whole scale
        });

        document.getElementById('playScaleGrades').addEventListener('click', () => {
            playScaleOrArpeggio(escalaNotasDisplay); // Play the whole scale
        });
    }
    else if (selectedAcorde) {
        const opcionesSeleccionadas = acordes[selectedAcorde];
        const notasAcorde = getChordNotes(selectedSemitono, opcionesSeleccionadas.notacion);
        const notasAcordeDisplay = notasAcorde.map(nota => simplifyEnharmonic(nota)); // Get simplified notes for playback
        const gradosAcordeDisplay = opcionesSeleccionadas.grados; // Use original grades for display

        const acordeNotacion = formatChordDisplay(opcionesSeleccionadas.notacion);

        resultadoBox.innerHTML = `
            Acorde de ${getFormattedNoteForDisplay(selectedSemitono)} ${selectedAcorde}<br>
            Notas: <button class="result-button" id="playChordNotes">${notasAcordeDisplay.map(nota => getFormattedNoteForDisplay(nota)).join(' - ')}</button><br>
            Grados: <button class="result-button" id="playChordGrades">${gradosAcordeDisplay.join(' - ')}</button>
        `;

        // Add event listeners after elements are in DOM
        document.getElementById('playChordNotes').addEventListener('click', () => {
            playScaleOrArpeggio(notasAcordeDisplay); // Play the whole chord
        });

        document.getElementById('playChordGrades').addEventListener('click', () => {
            playScaleOrArpeggio(notasAcordeDisplay); // Play the whole chord
        });

        const acordesHtml = `
            <p><strong>Haz clic para añadir a la progresión:</strong></p>
            <ul class="acordes-list">
                <li class="acorde-btn" onclick="addChordToProgression('${selectedSemitono}', '${opcionesSeleccionadas.notacion}', '${acordeNotacion}')">${getFormattedNoteForDisplay(selectedSemitono)}${acordeNotacion}</li>
            </ul>
        `;

        contextoBox.innerHTML = acordesHtml;
        contextoBox.style.display = 'block';
    }
}

function generarAcordesDominantes(escala) {
    const acordesArray = [];
    for (const nota of escala) {
        acordesArray.push(`<li class="acorde-btn" onclick="addChordToProgression('${nota}', '7', '7')">${getFormattedNoteForDisplay(nota)}<span>7</span></li>`);
    }
    return acordesArray.join('');
}

function generarAcordesDiatonicos(escala, acordesPredefinidos) {
    if (acordesPredefinidos?.length > 0) {
        return acordesPredefinidos.map((acorde, index) => {
            const notaAcorde = escala[index];
            const acordeDisplay = formatChordDisplay(acorde);
            const tipoAudioKey = acorde_audio_map[acorde];
            return `<li class="acorde-btn" onclick="addChordToProgression('${notaAcorde}', '${acorde}', '${acordeDisplay}')">${getFormattedNoteForDisplay(notaAcorde)}${acordeDisplay}</li>`;
        }).join('');
    }

    const numNotas = escala.length;
    if (numNotas < 3) return `<p>Esta escala no tiene suficientes notas para generar acordes de forma diatónica.</p>`;

    const acordesArray = [];
    for (let i = 0; i < numNotas; i++) {
        const nota = escala[i];
        const tercera = escala[(i + 2) % numNotas];
        const quinta = escala[(i + 4) % numNotas];
        let tipoAcorde = " (?) ";
        let tipoAudio = "";

        if (tercera && quinta) {
            const intervalos = [0, getIntervaloSemitonos(nota, tercera), getIntervaloSemitonos(nota, quinta)];
            tipoAcorde = getTipoAcorde(intervalos);
            tipoAudio = acorde_audio_map[tipoAcorde] || tipoAcorde;
        }

        const acordeDisplay = formatChordDisplay(tipoAcorde);
        acordesArray.push(`<li class="acorde-btn" onclick="addChordToProgression('${nota}', '${tipoAudio}', '${acordeDisplay}')">${getFormattedNoteForDisplay(nota)}${acordeDisplay}</li>`);
    }

    return acordesArray.join('');
}

function openTab(tabName, event) {
    // stopAllNotes(); // This function is removed
    if (isPlaying) {
        togglePlay();
    }
    if(isMetronomePlaying){
        stopMetronome();
    }

    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].style.display = 'none';
    }
    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    document.getElementById(tabName).style.display = 'block';
    event.currentTarget.classList.add('active');
}

function getChordNotes(rootNote, chordType) {
    let internalChordType = chordType;
    if (internalChordType === '△7') {
        internalChordType = 'maj7';
    }
    const matchingChord = Object.values(acordes).find(c => c.notacion === internalChordType);
    if (!matchingChord) return [];

    let notes = [];
    for (let i = 0; i < matchingChord.intervalos.length; i++) {
        const interval = matchingChord.intervalos[i];
        const grade = matchingChord.grados[i];
        const diatonicIndex = getDiatonicIndexFromGrade(grade);
        const noteName = getProperNoteNameForScale(rootNote, diatonicIndex, interval);
        notes.push(noteName);
    }
    return notes;
}

function updateProgressionDisplay() {
    const builder = document.getElementById('progression-builder');
    builder.innerHTML = '';
    currentProgression.forEach((chord, index) => {
        const chordEl = document.createElement('div');
        chordEl.className = 'progression-chord';

        const chordNameEl = document.createElement('div');
        chordNameEl.className = 'chord-name-display';
        chordNameEl.innerHTML = chord.display;
        chordEl.appendChild(chordNameEl);

        if (chord.notes && chord.notes.length > 0) {
            const chordNotesEl = document.createElement('div');
            chordNotesEl.className = 'chord-notes-display';
            chordNotesEl.innerHTML = chord.notes.map(note => getFormattedNoteForDisplay(simplifyEnharmonic(note))).join(' - ');
            chordEl.appendChild(chordNotesEl);
        }

        chordEl.onclick = () => removeChordFromProgression(index);
        builder.appendChild(chordEl);
    });
}

function addChordToProgression(nota, tipo, display) {
    // stopAllNotes(); // This function is removed
    if (isPlaying) {
        togglePlay();
    }
    if(isMetronomePlaying){
        stopMetronome();
    }

    const notes = getChordNotes(nota, tipo);

    const chord = {
        nota: nota,
        tipo: tipo,
        display: `${getFormattedNoteForDisplay(nota)}${display}`,
        notes: notes
    };
    currentProgression.push(chord);
    updateProgressionDisplay();
    
    // Play original string sound for preview
    playChord(nota, tipo, 1000);

    // Play piano sampler for preview
    if (chordSampler && notes && notes.length > 0) {
        const simplifiedNotes = notes.map(n => simplifyEnharmonic(n));
        const pianoNotes = getPlayablePianoNotes(simplifiedNotes);
        if (pianoNotes.length > 0) {
            chordSampler.triggerAttackRelease(pianoNotes, '1s'); // Play for 1 second
        }
    }
}

function removeChordFromProgression(index) {
    if (isPlaying) {
        togglePlay();
    }
    if(isMetronomePlaying){
        stopMetronome();
    }
    currentProgression.splice(index, 1);
    updateProgressionDisplay();
}

function clearProgression() {
    if (isPlaying) {
        togglePlay();
    }
    if(isMetronomePlaying){
        stopMetronome();
    }
    currentProgression = [];
    updateProgressionDisplay();
}

function generateRandomProgression() {
    if (isPlaying) {
        togglePlay();
    }
    if(isMetronomePlaying){
        stopMetronome();
    }

    currentProgression = [];
    const notasPosibles = semitonos_display;
    const tiposDeAcordePosibles = Object.keys(acordes).filter(key => key.includes("Séptima"));

    for (let i = 0; i < 4; i++) {
        const randomNotaIndex = Math.floor(Math.random() * notasPosibles.length);
        const randomTipoIndex = Math.floor(Math.random() * tiposDeAcordePosibles.length);

        const nota = notasPosibles[randomNotaIndex];
        const tipoKey = tiposDeAcordePosibles[randomTipoIndex];
        const tipoData = acordes[tipoKey];

        const display = formatChordDisplay(tipoData.notacion);
        const notes = getChordNotes(nota, tipoData.notacion);

        const chord = {
            nota: nota,
            tipo: tipoData.notacion,
            display: `${getFormattedNoteForDisplay(nota)}${display}`,
            notes: notes
        };
        currentProgression.push(chord);
    }

    updateProgressionDisplay();
}

// Progresiones predefinidas con grados romanos
const predefinedProgressions = [
    {
        name: "Pop Clásico",
        roman: "I-VI-IV-V",
        description: "La progresión más popular en la música pop",
        chordTypes: ["maj7", "m7", "maj7", "7"],
    },
    {
        name: "Jazz Básico",
        roman: "II-V-I",
        description: "Progresión jazzística fundamental",
        chordTypes: ["m7", "7", "maj7"],
    },
    {
        name: "Rock Clásico",
        roman: "I-IV-V",
        description: "Progresión rock tradicional",
        chordTypes: ["maj7", "maj7", "7"],
    },
    {
        name: "Pop Moderno",
        roman: "VI-IV-I-V",
        description: "Progresión pop contemporánea",
        chordTypes: ["m7", "maj7", "maj7", "7"],
    },
    {
        name: "Balada Emocional",
        roman: "I-VII-VI-III",
        description: "Progresión emotiva para baladas",
        chordTypes: ["maj7", "dim7", "m7", "m7"],
    },
    {
        name: "Alternativo",
        roman: "I-III-VII-VI",
        description: "Progresión alternativa moderna",
        chordTypes: ["maj7", "m7", "dim7", "m7"],
    },
    {
        name: "Blues",
        roman: "I-IV-V",
        description: "Progresión blues tradicional",
        chordTypes: ["7", "7", "7"],
    },
    {
        name: "Funk",
        roman: "I-VII-VI",
        description: "Progresión funky con séptima",
        chordTypes: ["7", "dim7", "m7"],
    },
    {
        name: "Reggae",
        roman: "I-VII-IV",
        description: "Progresión reggae característica",
        chordTypes: ["maj7", "7", "maj7"],
    },
    {
        name: "Disco",
        roman: "I-III-IV-V",
        description: "Progresión disco de los 70s",
        chordTypes: ["maj7", "m7", "maj7", "7"],
    },
    {
        name: "Punk",
        roman: "I-V-IV",
        description: "Progresión punk rock simple",
        chordTypes: ["maj7", "7", "maj7"],
    },
    {
        name: "Bossa Nova",
        roman: "I-VI-II-V",
        description: "Progresión bossa nova brasileña",
        chordTypes: ["m7", "7", "m7", "7"],
    },
    {
        name: "Country",
        roman: "I-IV-I-V",
        description: "Progresión country tradicional",
        chordTypes: ["maj7", "maj7", "maj7", "7"],
    },
    {
        name: "R&B",
        roman: "I-VI-IV-VII",
        description: "Progresión R&B moderna",
        chordTypes: ["7", "m7", "maj7", "dim7"],
    },
    {
        name: "Indie",
        roman: "VI-IV-I-III",
        description: "Progresión indie rock",
        chordTypes: ["m7", "maj7", "maj7", "m7"],
    },
    {
        name: "Gospel",
        roman: "I-IV-V-IV",
        description: "Progresión gospel tradicional",
        chordTypes: ["maj7", "maj7", "7", "maj7"],
    }
];




// Función para determinar la notación preferida basada en la tonalidad
function getPreferredNotation(rootNote) {
    // Si la tonalidad tiene bemoles, usar notación con bemoles
    if (rootNote.includes('b')) {
        return semitonos_display; // Incluye notación con bemoles
    }
    // Si no, usar notación con sostenidos
    return semitonos_calculo;
}

// Función para convertir grados romanos a acordes reales basados en la tonalidad
function getChordFromRomanNumeral(romanNumeral, chordType, rootNote) {
    const romanToInterval = {
        "I": 0, "II": 2, "III": 4, "IV": 5, "V": 7, "VI": 9, "VII": 11,
        "bII": 1, "bIII": 3, "bV": 6, "bVI": 8, "bVII": 10,
        "#IV": 6, "#V": 8, "#VI": 10
    };

    const baseInterval = romanToInterval[romanNumeral.replace(/[#b]/g, '')];
    if (baseInterval === undefined) return null;

    const rootSemitone = mapNotaToSemitone(rootNote);
    const chordSemitone = (rootSemitone + baseInterval) % 12;

    // Usar la notación preferida basada en la tonalidad
    const preferredNotation = getPreferredNotation(rootNote);

    // Encontrar la nota que coincida con el semitono y tenga la notación preferida
    let noteName = null;

    // Primero intentar encontrar una nota con la misma notación que la raíz
    for (let i = 0; i < preferredNotation.length; i++) {
        if (mapNotaToSemitone(preferredNotation[i]) === chordSemitone) {
            // Si la raíz usa bemoles, preferir notación con bemoles
            if (rootNote.includes('b') && preferredNotation[i].includes('b')) {
                noteName = preferredNotation[i];
                break;
            }
            // Si la raíz usa sostenidos, preferir notación con sostenidos
            if (!rootNote.includes('b') && preferredNotation[i].includes('#')) {
                noteName = preferredNotation[i];
                break;
            }
            // Si no hay preferencia específica, usar la primera coincidencia
            if (!noteName) {
                noteName = preferredNotation[i];
            }
        }
    }

    // Si no se encontró, usar la notación de cálculo como fallback
    if (!noteName) {
        noteName = semitonos_calculo[chordSemitone];
    }

    return {
        nota: noteName,
        tipo: chordType
    };
}

// Función para generar acordes dinámicos de una progresión
function generateDynamicProgression(progressionIndex) {
    const progression = predefinedProgressions[progressionIndex];
    const romanNumerals = progression.roman.split('-');
    const chords = [];

    romanNumerals.forEach((roman, index) => {
        const chord = getChordFromRomanNumeral(roman, progression.chordTypes[index], selectedTonalidad);
        if (chord) {
            chords.push(chord);
        }
    });

    return chords;
}

function renderPredefinedProgressionsSelector() {
    const select = document.getElementById('predefined-progressions-select');
    select.innerHTML = '<option value="">Progresiones</option>';

    predefinedProgressions.forEach((progression, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${progression.name} (${progression.roman})`;
        option.title = progression.description; // Tooltip con descripción
        select.appendChild(option);
    });
}

function loadPredefinedProgression(index) {
    console.log('loadPredefinedProgression called with index:', index);
    if (isPlaying) {
        togglePlay();
    }
    if(isMetronomePlaying){
        stopMetronome();
    }

    const progression = predefinedProgressions[index];
    if (!progression) return;

    // Generar acordes dinámicos basados en la tonalidad actual
    const dynamicChords = generateDynamicProgression(index);

    currentProgression = [];

    dynamicChords.forEach(chord => {
        const display = formatChordDisplay(chord.tipo);
        const notes = getChordNotes(chord.nota, chord.tipo);

        const chordObj = {
            nota: chord.nota,
            tipo: chord.tipo,
            display: `${getFormattedNoteForDisplay(chord.nota)}${display}`,
            notes: notes
        };
        currentProgression.push(chordObj);
    });

    updateProgressionDisplay();
}


// Iconos SVG para el botón flotante
const playIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M8 5v14l11-7z"/></svg>`;
const stopIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M6 6h12v12H6z"/></svg>`;

function togglePlay() {
    // stopAllNotes(); // This function is removed

    const toggleBtn = document.getElementById('toggle-progression-btn');
    const floatingBtn = document.getElementById('floating-play-stop-button');

    if (isPlaying) {
        if (chordLoop) {
            chordLoop.stop(0).dispose();
        }
        Tone.Transport.stop();
        stopAudio(); // Stop any lingering chord audio
        if (chordSampler) {
            chordSampler.releaseAll();
        }
        if (arpeggioSampler) {
            arpeggioSampler.releaseAll();
        }

        isPlaying = false;
        toggleBtn.classList.remove('playing');
        toggleBtn.classList.add('stopped');

        // Actualizar botón flotante
        floatingBtn.innerHTML = playIconSVG;
        floatingBtn.classList.remove('playing');
        floatingBtn.classList.add('stopped');

        document.querySelectorAll('.progression-chord').forEach(el => el.classList.remove('playing-chord'));

    } else {
        if (currentProgression.length > 0) {
            startChordLoop();
        }
    }
}

// New function to encapsulate chord loop starting logic
function startChordLoop() {
    if (Tone.context.state === 'suspended') {
        Tone.context.resume();
    }

    isPlaying = true;
    currentProgressionIndex = 0;

    const bpm = document.getElementById('bpm-input').value;
    Tone.Transport.bpm.value = bpm;

    chordLoop = new Tone.Loop(time => {
        const chord = currentProgression[currentProgressionIndex];
        const indexToHighlight = currentProgressionIndex;

        playChord(chord.nota, chord.tipo);

        if (chordSampler && arpeggioSampler && chord.notes && chord.notes.length > 0) {
            const simplifiedNotes = chord.notes.map(n => simplifyEnharmonic(n));
            const pianoNotes = getPlayablePianoNotes(simplifiedNotes);
            if (pianoNotes.length > 0) {
                chordSampler.triggerAttackRelease(pianoNotes, '1n', time); // Use chordSampler for full chord
            }

            const rootNote = chord.notes[0]; // Get the root note
            if (rootNote) {
                const playableRootNote = getPlayablePianoNotes([simplifyEnharmonic(rootNote)]);
                if (playableRootNote.length > 0) {
                    arpeggioSampler.triggerAttackRelease(playableRootNote, '8n', Tone.Transport.now()); // Play root on beat 1
                }
            }

            const thirdNote = chord.notes[1];
            if (thirdNote) {
                const playableThirdNote = getPlayablePianoNotes([simplifyEnharmonic(thirdNote)]);
                if (playableThirdNote.length > 0) {
                    arpeggioSampler.triggerAttackRelease(playableThirdNote, '8n', Tone.Transport.now() + Tone.Time('0:1').toSeconds()); // Use arpeggioSampler
                }
            }

            const fifthNote = chord.notes[2];
            if (fifthNote) {
                const playableFifthNote = getPlayablePianoNotes([simplifyEnharmonic(fifthNote)]);
                if (playableFifthNote.length > 0) {
                    arpeggioSampler.triggerAttackRelease(playableFifthNote, '8n', Tone.Transport.now() + Tone.Time('0:2').toSeconds()); // Use arpeggioSampler
                }
            }

            const seventhNote = chord.notes[3];
            if (seventhNote) {
                const playableSeventhNote = getPlayablePianoNotes([simplifyEnharmonic(seventhNote)]);
                if (playableSeventhNote.length > 0) {
                    arpeggioSampler.triggerAttackRelease(playableSeventhNote, '8n', Tone.Transport.now() + Tone.Time('0:3').toSeconds()); // Use arpeggioSampler
                }
            }
        }

        Tone.Draw.schedule(() => {
            document.querySelectorAll('.progression-chord').forEach(el => el.classList.remove('playing-chord'));
            const currentChordEl = document.querySelectorAll('.progression-chord')[indexToHighlight];
            if (currentChordEl) {
                currentChordEl.classList.add('playing-chord');
            }
        }, time);
        currentProgressionIndex = (currentProgressionIndex + 1) % currentProgression.length;
    }, '1m').start(0);

    Tone.Transport.start();

    document.getElementById('toggle-progression-btn').classList.add('playing');
    document.getElementById('toggle-progression-btn').classList.remove('stopped');

    document.getElementById('floating-play-stop-button').innerHTML = stopIconSVG;
    document.getElementById('floating-play-stop-button').classList.add('playing');
    document.getElementById('floating-play-stop-button').classList.remove('stopped');
}


window.onload = () => {

    document.addEventListener('click', () => {
        if (Tone.Transport.state !== 'started') {
            Tone.start();
        }
    }, { once: true });

    renderSelectors();
    renderPredefinedProgressionsSelector();
    loadAudioFiles();
    
    calcularEscala();

    document.getElementById('toggle-progression-btn').addEventListener('click', togglePlay);
    document.getElementById('floating-play-stop-button').addEventListener('click', togglePlay);
    document.getElementById('floating-generate-random-btn').addEventListener('click', generateRandomProgression);
    document.getElementById('clear-progression-btn').addEventListener('click', clearProgression);
    document.getElementById('generate-random-btn').addEventListener('click', generateRandomProgression);
    // Event listener para el selector de progresiones
    document.getElementById('predefined-progressions-select').addEventListener('change', (e) => {
        const preview = document.getElementById('progression-preview');
        const description = document.getElementById('preview-description');
        const chords = document.getElementById('preview-chords');

        if (e.target.value === '') {
            preview.style.display = 'none';
        } else {
            const progression = predefinedProgressions[parseInt(e.target.value)];

            const loopName = 'Sin loop';
            description.textContent = `${progression.description} (Tonalidad: ${selectedTonalidad}) • ${loopName}`;

            // Generar acordes dinámicos para la preview
            const dynamicChords = generateDynamicProgression(parseInt(e.target.value));
            chords.innerHTML = dynamicChords.map(chord => {
                const display = formatChordDisplay(chord.tipo);
                return `<span class="chord-tag">${getFormattedNoteForDisplay(chord.nota)}${display}</span>`;
            }).join(' → ');

            preview.style.display = 'block';

            // Cargar automáticamente la progresión seleccionada
            loadPredefinedProgression(parseInt(e.target.value));
        }
    });

    // Inicializar estado del botón flotante
    const floatingBtn = document.getElementById('floating-play-stop-button');
    floatingBtn.innerHTML = playIconSVG;
    floatingBtn.classList.add('stopped');

    const chordVolumeControl = document.getElementById('chord-volume');
    chordVolumeControl.addEventListener('input', (event) => {
        // Convert dB to linear volume (amplitude)
        const linearVolume = Math.pow(10, event.target.value / 20);
        // Clamp the value between 0.0 and 1.0 to prevent errors
        chordVolumeLinear = Math.max(0, Math.min(1, linearVolume));
        // Update volume of currently playing audio if it exists
        if (currentAudio && !currentAudio.paused) {
            currentAudio.volume = chordVolumeLinear;
        }
    });

        const pianoVolumeControl = document.getElementById('piano-volume');
    if (pianoVolumeControl) {
        pianoVolumeControl.addEventListener('input', (event) => {
            if (pianoVolume) {
                pianoVolume.volume.value = event.target.value;
            }
        });
    }

    const arpeggioVolumeControl = document.getElementById('arpeggio-volume');
    if (arpeggioVolumeControl) {
        arpeggioVolumeControl.addEventListener('input', (event) => {
            if (arpeggioVolume) {
                arpeggioVolume.volume.value = event.target.value;
            }
        });
    }

    // --- EVENTOS PARA EL METRÓNOMO INTEGRADO ---
    const metronomeFab = document.getElementById('floating-metronome-button');
    const metronomeOptionsPopup = document.getElementById('metronome-options-popup');
    const bpmInput = document.getElementById('bpm-input');
    const bpmSlider = document.getElementById('bpm-slider');
    const metronomeStartStopBtn = document.getElementById('metronome-start-stop');
    const metronomeTapBtn = document.getElementById('metronome-tap');
    const metronomeVolume = document.getElementById('metronome-volume');

    metronomeFab.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent click from closing popup immediately
        metronomeOptionsPopup.classList.toggle('visible');
    });

    document.addEventListener('click', function(event) {
        if (!metronomeOptionsPopup.contains(event.target) && !metronomeFab.contains(event.target)) {
            metronomeOptionsPopup.classList.remove('visible');
        }
    });

    bpmInput.addEventListener('input', (event) => {
        updateMetronomeBPM(event.target.value);
    });
    bpmSlider.addEventListener('input', (event) => {
        updateMetronomeBPM(event.target.value);
    });

    metronomeStartStopBtn.addEventListener('click', function() {
        if (isMetronomePlaying) {
            stopMetronome();
        } else {
            startMetronome();
        }
    });

    metronomeTapBtn.addEventListener('click', function() {
        const now = new Date().getTime();
        tapTimes.push(now);

        if (tapTimes.length > 4) {
            tapTimes.shift();
        }

        if (tapTimes.length > 1) {
            let sumDiff = 0;
            for (let i = 1; i < tapTimes.length; i++) {
                sumDiff += (tapTimes[i] - tapTimes[i-1]);
            }
            const avgDiff = sumDiff / (tapTimes.length - 1);
            const calculatedBPM = Math.round(60000 / avgDiff);
            updateMetronomeBPM(calculatedBPM);
        }
    });

    metronomeVolume.addEventListener('input', (event) => {
        if (metronomeGainNode) {
            // Convert dB to linear gain
            metronomeGainNode.gain.value = Math.pow(10, event.target.value / 20);
        }
    });
    // Ensure metronome stops if page is closed or refreshed
    window.addEventListener('beforeunload', stopMetronome);
    // --- FIN DE LOS EVENTOS DEL METRÓNOMO INTEGRADO ---

    

    document.getElementById('floating-text-input').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Evita el salto de línea en el textarea
            addChordFromInput();
        }
    });

    
};

function addChordFromInput() {
    const inputElement = document.getElementById('floating-text-input');
    const inputText = inputElement.value.trim();

    if (inputText === '') {
        return;
    }

    let rootNoteInput = '';
    let chordTypeInput = '';

    const noteAliasMap = {
        "c": "Do", "c#": "Do#", "db": "Reb", "d": "Re", "d#": "Re#", "eb": "Mib", "e": "Mi",
        "f": "Fa", "f#": "Fa#", "gb": "Solb", "g": "Sol", "g#": "Sol#", "ab": "Lab",
        "a": "La", "a#": "La#", "bb": "Sib", "b": "Si",
        "cb": "Si", "fb": "Mi", "b#": "Do", "e#": "Fa",
        "do": "Do", "do#": "Do#", "reb": "Reb", "re": "Re", "re#": "Re#", "mib": "Mib", "mi": "Mi",
        "fa": "Fa", "fa#": "Fa#", "solb": "Solb", "sol": "Sol", "sol#": "Sol#", "lab": "Lab",
        "la": "La", "la#": "La#", "sib": "Sib", "si": "Si"
    };

    // Crear una lista de todas las posibles notas (en español e inglés, con y sin alteraciones)
    // y ordenarlas por longitud descendente para asegurar que "Do#" se encuentre antes que "Do"
    const allPossibleNotes = Array.from(new Set([
        ...semitonos_display,
        ...Object.keys(noteAliasMap).map(key => noteAliasMap[key]), // Valores del alias map
        ...Object.keys(noteAliasMap) // Claves del alias map (ej. "c", "c#")
    ])).sort((a, b) => b.length - a.length);

    // Intentar extraer la nota raíz y el tipo de acorde
    let foundNote = false;
    for (const possibleNote of allPossibleNotes) {
        const lowerCaseInputText = inputText.toLowerCase();
        const lowerCasePossibleNote = possibleNote.toLowerCase();

        if (lowerCaseInputText.startsWith(lowerCasePossibleNote)) {
            rootNoteInput = inputText.substring(0, possibleNote.length);
            chordTypeInput = inputText.substring(possibleNote.length).trim();
            foundNote = true;
            break;
        }
    }

    if (!foundNote) {
        console.warn(`No se pudo identificar la nota raíz en: ${inputText}`);
        inputElement.value = '';
        return;
    }

    // Normalizar la nota raíz
    let normalizedRootNote = null;
    const lowerCaseRootNoteInput = rootNoteInput.toLowerCase();
    if (noteAliasMap[lowerCaseRootNoteInput]) {
        normalizedRootNote = noteAliasMap[lowerCaseRootNoteInput];
    } else if (semitonos_display.includes(rootNoteInput)) {
        normalizedRootNote = rootNoteInput;
    } else {
        const capitalizedRootNote = rootNoteInput.charAt(0).toUpperCase() + rootNoteInput.slice(1).toLowerCase();
        if (semitonos_display.includes(capitalizedRootNote)) {
            normalizedRootNote = capitalizedRootNote;
        } else {
            const semitone = mapNotaToSemitone(rootNoteInput);
            if (semitone !== -1) {
                normalizedRootNote = semitonos_display.find(n => mapNotaToSemitone(n) === semitone);
            }
        }
    }

    // Normalizar el tipo de acorde
    let normalizedChordType = null;
    let chordDisplay = null;

    const chordAliasMap = {
        "maj7": "Mayor Séptima (maj7)", "major7": "Mayor Séptima (maj7)", "M7": "Mayor Séptima (maj7)", "△7": "Mayor Séptima (maj7)",
        "m7": "Menor Séptima (m7)", "minor7": "Menor Séptima (m7)",
        "7": "Séptima de Dominante (7)", "dom7": "Séptima de Dominante (7)",
        "m7b5": "Menor Séptima con Quinta Disminuida (m7b5)", "halfdim": "Menor Séptima con Quinta Disminuida (m7b5)", "ø7": "Menor Séptima con Quinta Disminuida (m7b5)",
        "dim7": "Disminuido Séptima (dim7)", "dim": "Disminuido Séptima (dim7)", "°7": "Disminuido Séptima (dim7)",
        "m-maj7": "Menor Séptima Mayor (m△7)", "mmaj7": "Menor Séptima Mayor (m△7)", "m△7": "Menor Séptima Mayor (m△7)",
        "aug-maj7": "Aumentado Séptima Mayor (△7#5)", "augmaj7": "Aumentado Séptima Mayor (△7#5)", "△7#5": "Aumentado Séptima Mayor (△7#5)",
        "7#5": "Séptima con Quinta Aumentada (7#5)", "7aug5": "Séptima con Quinta Aumentada (7#5)",
        "7b5": "Séptima con Quinta Disminuida (7b5)"
    };

    const lowerCaseChordTypeInput = chordTypeInput.toLowerCase();
    for (const key in acordes) {
        if (acordes[key].notacion.toLowerCase() === lowerCaseChordTypeInput) {
            normalizedChordType = acordes[key].notacion;
            chordDisplay = formatChordDisplay(normalizedChordType);
            break;
        }
    }

    if (!normalizedChordType) {
        // Intentar con el chordAliasMap
        if (chordAliasMap[lowerCaseChordTypeInput]) {
            const internalKey = chordAliasMap[lowerCaseChordTypeInput];
            const matchingChord = Object.values(acordes).find(c => c.notacion === internalKey.match(/\(([^)]+)\)/)[1]);
            if (matchingChord) {
                normalizedChordType = matchingChord.notacion;
                chordDisplay = formatChordDisplay(normalizedChordType);
            }
        }
    }

    if (!normalizedRootNote || !normalizedChordType) {
        console.warn(`No se pudo parsear el acorde: ${inputText}`);
        inputElement.value = '';
        return;
    }

    addChordToProgression(normalizedRootNote, normalizedChordType, chordDisplay);
    inputElement.value = ''; // Limpiar el input después de añadir
}
