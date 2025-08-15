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
let drumBuffer;
let drumSourceNode = null;
let drumGainNode = null;
let isPlaying = false;
let currentAudio = null;
let currentTimeout = null;
let progressionInterval = null;
let currentProgressionIndex = 0;
let currentProgression = [];

let currentToneNote = null;
let currentSynth = new Tone.Synth({
    oscillator: { type: 'sine' }
}).toDestination();
currentSynth.volume.value = -10;

const acorde_audio_map = {
    "maj7": "maj7", "m7": "m7", "7": "7", "m7b5": "m7b5",
    "dim7": "dim7", "m△7": "m-maj7", "maj": "maj", "m": "m",
    "aug": "maj", "dim": "dim", "△7#5": "aug-maj7", "△7": "maj7", "7#5": "7aug5", "7b5": "7b5",
    "7#9": "7", "7b9": "7"
};
const notaAudioMap = {
    "Do": "c", "Do#": "c-sharp", "Reb": "c-sharp", "Re": "d", "Re#": "d-sharp", "Mib": "d-sharp", "Mi": "e",
    "Fa": "f", "Fa#": "f-sharp", "Solb": "f-sharp", "Sol": "g", "Sol#": "g-sharp", "Lab": "g-sharp",
    "La": "a", "La#": "a-sharp", "Sib": "a-sharp", "Si": "b", "Si#": "c", "Mi#": "f", "Fab": "e",
    "Fax": "g", "Dox": "d", "Solx": "a", "Lax": "b", "Six": "c-sharp",
    "Sibb": "a", "Mibb": "d", "Labb": "g"
};

const toneNoteMap = {
    "Do": "C", "Do#": "C#", "Reb": "Db", "Re": "D", "Re#": "D#", "Mib": "Eb",
    "Mi": "E", "Fa": "F", "Fa#": "F#", "Solb": "Gb", "Sol": "G", "Sol#": "G#",
    "Lab": "Ab", "La": "A", "La#": "A#", "Sib": "Bb", "Si": "B"
};

const drumLoops = {
    "drumloop.wav": "assets/audios/drumloop.wav",
    "drumloop2.wav": "assets/audios/drumloop2.wav"
};

// --- NUEVAS VARIABLES Y FUNCIONES PARA EL METRÓNOMO ---
let metronomeInterval = null;
let metronomeBpm = 60;
let isMetronomePlaying = false;
let metronomeSound;
let metronomeGainNode;

async function loadMetronomeSound() {
    try {
        const response = await fetch('assets/audios/metronome_click.wav');
        const arrayBuffer = await response.arrayBuffer();
        metronomeSound = await audioContext.decodeAudioData(arrayBuffer);

        // Crear nodo de ganancia para el metrónomo y conectarlo
        metronomeGainNode = audioContext.createGain();
        const metronomeVolume = document.getElementById('metronome-volume');
        metronomeGainNode.gain.value = metronomeVolume.value;
        metronomeGainNode.connect(audioContext.destination);

    } catch (e) {
        console.error("Error al cargar el sonido del metrónomo:", e);
    }
}

function playMetronomeClick() {
    if (metronomeSound) {
        const source = audioContext.createBufferSource();
        source.buffer = metronomeSound;
        source.connect(metronomeGainNode); // Conectar al nodo de ganancia del metrónomo
        source.start(0);
    }
}

function toggleMetronome() {
    const toggleBtn = document.getElementById('toggle-metronome-btn');
    if (isMetronomePlaying) {
        clearInterval(metronomeInterval);
        isMetronomePlaying = false;
        toggleBtn.classList.remove('playing');
        toggleBtn.classList.add('stopped');
    } else {
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
        const intervalMs = 60000 / metronomeBpm;
        metronomeInterval = setInterval(playMetronomeClick, intervalMs);
        isMetronomePlaying = true;
        toggleBtn.classList.add('playing');
        toggleBtn.classList.remove('stopped');
    }
}

function updateMetronomeBPM(bpm) {
    metronomeBpm = bpm;
    document.getElementById('bpm-value').textContent = bpm;
    if (isMetronomePlaying) {
        // Reinicia el metrónomo con el nuevo BPM
        clearInterval(metronomeInterval);
        const intervalMs = 60000 / metronomeBpm;
        metronomeInterval = setInterval(playMetronomeClick, intervalMs);
    }
    
    if(isPlaying){
        clearInterval(progressionInterval);
        const progressionIntervalMs = (60000 / metronomeBpm) * 4;
        progressionInterval = setInterval(playNextChordInProgression, progressionIntervalMs);
    }
}
// --- FIN DE LAS NUEVAS FUNCIONES PARA EL METRÓNOMO ---

function mapNotaToSemitone(nota) {
    const semitonoMap = {
        "Do": 0, "Do#": 1, "Reb": 1, "Re": 2, "Re#": 3, "Mib": 3, "Mi": 4,
        "Fa": 5, "Fa#": 6, "Solb": 6, "Sol": 7, "Sol#": 8, "Lab": 8,
        "La": 9, "La#": 10, "Sib": 10, "Si": 11,
        "Mi#": 5, "Si#": 0, "Fab": 4, "Dob": 11,
        "Dox": 2, "Fax": 7, "Solx": 9, "Lax": 11, "Six": 1,
        // Correcciones y adiciones para notas con doble bemol
        "Rebb": 0, "Mibb": 2, "Fabb": 3, "Labb": 7, "Sibb": 9, "Dobb": 10
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
    if (intervalos.length === 3) return acordesTriada[intervalosStr] || " (?)";
    if (intervalos.length === 4) return acordesSeptima[intervalosStr] || " (?)";
    return " (?)";
}

async function loadAudioFiles() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    drumGainNode = audioContext.createGain();
    const drumVolume = document.getElementById('drum-volume');
    drumGainNode.gain.value = drumVolume.value;
    drumGainNode.connect(audioContext.destination);

    const notas_audio = ["c", "c-sharp", "d", "d-sharp", "e", "f", "f-sharp", "g", "g-sharp", "a", "a-sharp", "b"];
    const tipos_acorde = ["maj", "m", "7", "m7", "dim7", "m7b5", "maj7", "m-maj7", "aug-maj7", "7b5", "7aug5", ];
    for (const nota of notas_audio) {
        for (const tipo of tipos_acorde) {
            const audioKey = `${nota}-${tipo}`;
            audios_acordes[audioKey] = new Audio(`assets/audios/${nota}-${tipo}.mp3`);
        }
    }
    const drumLoopSelect = document.getElementById('drum-loop-select');
    await loadDrumLoop(drumLoopSelect.value);
    await loadMetronomeSound();
}

async function loadDrumLoop(filename) {
    try {
        const url = drumLoops[filename];
        if (!url) {
            console.error(`No se encontró la URL para el loop: ${filename}`);
            return;
        }
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        drumBuffer = await audioContext.decodeAudioData(arrayBuffer);
    } catch (e) {
        console.error("Error al cargar o decodificar el loop de batería:", e);
    }
}

function handleDrumLoopChange(event) {
    if (isPlaying) {
        togglePlay();
    }
    loadDrumLoop(event.target.value);
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

function playNote(noteName) {
    const toneNoteName = toneNoteMap[noteName];
    if (!toneNoteName) {
        console.warn(`No se encontró un mapeo de Tone.js para la nota: ${noteName}`);
        return;
    }

    if (currentToneNote === noteName) {
        currentSynth.triggerRelease(Tone.now());
        document.querySelector(`.note-btn[data-note="${currentToneNote}"]`)?.classList.remove('active');
        currentToneNote = null;
    } else {
        if (currentToneNote) {
            currentSynth.triggerRelease(Tone.now());
            document.querySelector(`.note-btn[data-note="${currentToneNote}"]`)?.classList.remove('active');
        }

        currentSynth.triggerAttack(`${toneNoteName}4`);
        currentToneNote = noteName;
        document.querySelector(`.note-btn[data-note="${noteName}"]`).classList.add('active');
    }
}

function stopAllNotes() {
    if (currentToneNote) {
        currentSynth.triggerRelease(Tone.now());
        document.querySelector(`.note-btn[data-note="${currentToneNote}"]`)?.classList.remove('active');
        currentToneNote = null;
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

function getProperNoteNameForScale(rootNote, intervalIndex, semitoneInterval) {
    const rootBaseNote = rootNote.replace(/[#b]/g, '');
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

function renderSelectors() {
    const semitonosDropdown = document.getElementById('semitonos-dropdown');
    semitonos_display.forEach(nota => {
        const option = document.createElement('option');
        option.value = nota;
        option.textContent = nota;
        semitonosDropdown.appendChild(option);
    });

    const escalasDropdown = document.getElementById('escalas-dropdown');
    const defaultEscalaOption = document.createElement('option');
    defaultEscalaOption.value = '';
    defaultEscalaOption.textContent = 'Seleccionar escala...';
    defaultEscalaOption.selected = true;
    escalasDropdown.appendChild(defaultEscalaOption);
    Object.keys(escalas_modos).forEach(opcion => {
        const option = document.createElement('option');
        option.value = opcion;
        option.textContent = opcion;
        escalasDropdown.appendChild(option);
    });

    const acordesDropdown = document.getElementById('acordes-dropdown');
    const defaultAcordeOption = document.createElement('option');
    defaultAcordeOption.value = '';
    defaultAcordeOption.textContent = 'Seleccionar acorde...';
    defaultAcordeOption.selected = true;
    acordesDropdown.appendChild(defaultAcordeOption);
    Object.keys(acordes).forEach(opcion => {
        const option = document.createElement('option');
        option.value = opcion;
        option.textContent = opcion.replace("Menor Séptima con Quinta Disminuida", "Semidisminuido").replace("Disminuido Séptima", "Disminuido");
        acordesDropdown.appendChild(option);
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
    stopAllNotes();
    const resultadoBox = document.getElementById('resultado-box');
    const contextoBox = document.getElementById('contexto-box');
    const selectedSemitono = document.getElementById('semitonos-dropdown').value;
    const selectedEscala = document.getElementById('escalas-dropdown').value;
    const selectedAcorde = document.getElementById('acordes-dropdown').value;

    if (isPlaying) {
        togglePlay();
    }
    if(isMetronomePlaying){
        toggleMetronome();
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

        const escalaNotasDisplay = escalaNotas.map(nota => getFormattedNoteForDisplay(nota));
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
            Notas: ${escalaNotasDisplay.join(' - ')}<br>
            Grados: ${grados.join(' - ')}
            <br>
        `;

        contextoBox.style.display = 'block';
    }
    else if (selectedAcorde) {
        const opcionesSeleccionadas = acordes[selectedAcorde];
        const notasAcorde = getChordNotes(selectedSemitono, opcionesSeleccionadas.notacion);
        const notasAcordeDisplay = notasAcorde.map(nota => getFormattedNoteForDisplay(nota));

        const acordeNotacion = formatChordDisplay(opcionesSeleccionadas.notacion);

        resultadoBox.innerHTML = `
            Acorde de ${getFormattedNoteForDisplay(selectedSemitono)} ${selectedAcorde}<br>
            Notas: ${notasAcordeDisplay.join(' - ')}<br>
            Grados: ${opcionesSeleccionadas.grados.join(' - ')}
        `;

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
        let tipoAcorde = " (?)";
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
    stopAllNotes();
    if (isPlaying) {
        togglePlay();
    }
    if(isMetronomePlaying){
        toggleMetronome();
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
    const matchingChord = Object.values(acordes).find(c => c.notacion === chordType);
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
            chordNotesEl.innerHTML = chord.notes.map(getFormattedNoteForDisplay).join(' - ');
            chordEl.appendChild(chordNotesEl);
        }

        chordEl.onclick = () => removeChordFromProgression(index);
        builder.appendChild(chordEl);
    });
}

function addChordToProgression(nota, tipo, display) {
    stopAllNotes();
    if (isPlaying) {
        togglePlay();
    }
    if(isMetronomePlaying){
        toggleMetronome();
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
    playChord(nota, tipo, 1000);
}

function removeChordFromProgression(index) {
    if (isPlaying) {
        togglePlay();
    }
    if(isMetronomePlaying){
        toggleMetronome();
    }
    currentProgression.splice(index, 1);
    updateProgressionDisplay();
}

function clearProgression() {
    if (isPlaying) {
        togglePlay();
    }
    if(isMetronomePlaying){
        toggleMetronome();
    }
    currentProgression = [];
    updateProgressionDisplay();
}

function generateRandomProgression() {
    if (isPlaying) {
        togglePlay();
    }
    if(isMetronomePlaying){
        toggleMetronome();
    }

    currentProgression = [];
    const notasPosibles = semitonos_display;
    const tiposDeAcordePosibles = Object.keys(acordes).filter(key => key.includes("Séptima") || key.includes("Mayor") || key.includes("Menor") || key.includes("Disminuido") || key.includes("Aumentado"));

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


function togglePlay() {
    stopAllNotes();

    const toggleBtn = document.getElementById('toggle-progression-btn');
    
    if (isPlaying) {
        clearInterval(progressionInterval);
        progressionInterval = null;
        stopAudio();
        
        if (drumSourceNode) {
            drumSourceNode.stop();
            drumSourceNode = null;
        }

        if (isMetronomePlaying) {
            toggleMetronome();
        }
        
        isPlaying = false;
        toggleBtn.classList.remove('playing');
        toggleBtn.classList.add('stopped');
        document.querySelectorAll('.progression-chord').forEach(el => el.classList.remove('playing-chord'));

    } else {
        if (currentProgression.length > 0) {
            if (!drumBuffer) {
                console.error('El loop de batería aún no se ha cargado.');
                return;
            }

            if (audioContext.state === 'suspended') {
                audioContext.resume();
            }

            if (!isMetronomePlaying) {
                toggleMetronome();
            }
            
            isPlaying = true;
            currentProgressionIndex = 0;
            
            const bpm = document.getElementById('bpm-slider').value;
            const progressionIntervalMs = (60000 / bpm) * 4;

            playNextChordInProgression();
            progressionInterval = setInterval(() => {
                playNextChordInProgression();
            }, progressionIntervalMs);

            drumSourceNode = audioContext.createBufferSource();
            drumSourceNode.buffer = drumBuffer;
            drumSourceNode.loop = true;
            drumSourceNode.connect(drumGainNode);
            drumSourceNode.start(0);

            toggleBtn.classList.add('playing');
            toggleBtn.classList.remove('stopped');
        }
    }
}

function playNextChordInProgression() {
    if (currentProgression.length === 0) {
        togglePlay();
        return;
    }

    document.querySelectorAll('.progression-chord').forEach(el => el.classList.remove('playing-chord'));

    const chord = currentProgression[currentProgressionIndex];
    playChord(chord.nota, chord.tipo);

    const currentChordEl = document.querySelectorAll('.progression-chord')[currentProgressionIndex];
    if (currentChordEl) {
        currentChordEl.classList.add('playing-chord');
        console.log(`Resaltando acorde en el índice: ${currentProgressionIndex}`);
    }

    currentProgressionIndex = (currentProgressionIndex + 1) % currentProgression.length;
}

window.onload = () => {
    document.addEventListener('click', () => {
        if (Tone.Transport.state !== 'started') {
            Tone.start();
        }
    }, { once: true });

    renderSelectors();
    loadAudioFiles();

    document.getElementById('semitonos-dropdown').value = "Do";
    document.getElementById('escalas-dropdown').value = "";
    document.getElementById('acordes-dropdown').value = "";
    calcularEscala();

    document.getElementById('semitonos-dropdown').addEventListener('change', calcularEscala);
    document.getElementById('escalas-dropdown').addEventListener('change', () => {
        document.getElementById('acordes-dropdown').value = '';
        calcularEscala();
    });
    document.getElementById('acordes-dropdown').addEventListener('change', () => {
        document.getElementById('escalas-dropdown').value = '';
        calcularEscala();
    });

    document.getElementById('toggle-progression-btn').addEventListener('click', togglePlay);
    document.getElementById('clear-progression-btn').addEventListener('click', clearProgression);
    document.getElementById('generate-random-btn').addEventListener('click', generateRandomProgression);

    document.getElementById('drum-volume').addEventListener('input', (event) => {
        if (drumGainNode) {
            drumGainNode.gain.value = event.target.value;
        }
    });

    document.getElementById('drum-loop-select').addEventListener('change', handleDrumLoopChange);

    const noteButtons = document.querySelectorAll('.note-btn');
    noteButtons.forEach(button => {
        button.addEventListener('click', () => {
            const noteName = button.getAttribute('data-note');
            playNote(noteName);
        });
    });

    const noteVolumeControl = document.getElementById('note-volume');
    if (noteVolumeControl) {
        noteVolumeControl.addEventListener('input', (event) => {
            currentSynth.volume.value = event.target.value;
        });
    }

    // --- NUEVOS EVENTOS PARA EL METRÓNOMO ---
    document.getElementById('toggle-metronome-btn').addEventListener('click', toggleMetronome);
    const bpmSlider = document.getElementById('bpm-slider');
    bpmSlider.addEventListener('input', (event) => {
        updateMetronomeBPM(event.target.value);
    });

    // Nuevo evento para el slider de volumen del metrónomo
    document.getElementById('metronome-volume').addEventListener('input', (event) => {
        if (metronomeGainNode) {
            metronomeGainNode.gain.value = event.target.value;
        }
    });
    // --- FIN DE LOS NUEVOS EVENTOS ---
};