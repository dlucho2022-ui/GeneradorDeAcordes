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
    "Do": "C", "Do#": "C#", "Reb": "Db", "Re": "D", "Re#": "D#", "Mib": "Eb", "Mi": "E",
    "Fa": "F", "Fa#": "F#", "Solb": "Gb", "Sol": "G", "Sol#": "G#", "Lab": "Ab",
    "La": "A", "La#": "A#", "Sib": "Bb", "Si": "B"
};

const drumLoops = {
    "drumloop.wav": "assets/audios/drumloop.wav",
    "drumloop2.wav": "assets/audios/drumloop2.wav"
};

// --- NUEVAS VARIABLES Y FUNCIONES PARA EL METRÓNOMO ---
let metronomeInterval = null;
let currentDrumLoop = null;

async function loadAndPlayDrumLoop(loopFile) {
    if (audioContext) {
        if (drumSourceNode) {
            drumSourceNode.stop();
            drumSourceNode.disconnect();
        }
    } else {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    const response = await fetch(drumLoops[loopFile]);
    const arrayBuffer = await response.arrayBuffer();
    drumBuffer = await audioContext.decodeAudioData(arrayBuffer);

    drumSourceNode = audioContext.createBufferSource();
    drumSourceNode.buffer = drumBuffer;
    drumSourceNode.loop = true;

    drumGainNode = audioContext.createGain();
    drumGainNode.gain.value = 0.5;

    drumSourceNode.connect(drumGainNode);
    drumGainNode.connect(audioContext.destination);

    drumSourceNode.start(0);
}

function stopDrumLoop() {
    if (drumSourceNode) {
        drumSourceNode.stop();
        drumSourceNode.disconnect();
        drumSourceNode = null;
    }
}
// --- FIN NUEVAS VARIABLES Y FUNCIONES PARA EL METRÓNOMO ---


function cargarOpciones() {
    const semitonosDropdown = document.getElementById("semitonos-dropdown");
    const escalasDropdown = document.getElementById("escalas-dropdown");
    const acordesDropdown = document.getElementById("acordes-dropdown");
    const notaPedalDropdown = document.getElementById("nota-pedal-dropdown");
    const acordesPedalDropdown = document.getElementById("acordes-pedal-dropdown");

    // Tonalidades para todos los selectores
    semitonos_display.forEach(semitono => {
        const option = document.createElement("option");
        option.value = semitono;
        option.textContent = semitono;
        semitonosDropdown.appendChild(option);
        notaPedalDropdown.appendChild(option.cloneNode(true));
    });

    // Escalas
    Object.keys(escalas_modos).forEach(escala => {
        const option = document.createElement("option");
        option.value = escala;
        option.textContent = escala;
        escalasDropdown.appendChild(option);
    });

    // Acordes para Escalas y Nota Pedal
    Object.keys(acordes).forEach(acorde => {
        const option = document.createElement("option");
        option.value = acorde;
        option.textContent = acorde;
        acordesDropdown.appendChild(option);
        acordesPedalDropdown.appendChild(option.cloneNode(true));
    });
    
    // Asignar los valores iniciales para evitar un estado vacío
    semitonosDropdown.value = "Do";
    escalasDropdown.value = "Jónico";
    acordesDropdown.value = "Mayor Séptima (maj7)";
    notaPedalDropdown.value = "Do";
    acordesPedalDropdown.value = "Mayor Séptima (maj7)";

    semitonosDropdown.addEventListener("change", actualizarTodo);
    escalasDropdown.addEventListener("change", actualizarTodo);
    acordesDropdown.addEventListener("change", actualizarTodo);
    notaPedalDropdown.addEventListener("change", actualizarPiano);
    acordesPedalDropdown.addEventListener("change", actualizarPiano);
}

function actualizarTodo() {
    const semitonoSeleccionado = document.getElementById("semitonos-dropdown").value;
    const escalaSeleccionada = document.getElementById("escalas-dropdown").value;

    const notasEscala = calcularEscala(semitonoSeleccionado, escalas_modos[escalaSeleccionada].intervalos);
    const gradosEscala = escalas_modos[escalaSeleccionada].grados;
    const acordesEscala = escalas_modos[escalaSeleccionada].acordes;

    mostrarResultado(semitonoSeleccionado, escalaSeleccionada, notasEscala);
    mostrarContexto(semitonoSeleccionado, notasEscala, gradosEscala, acordesEscala);
    actualizarAcordesDisponibles(notasEscala, acordesEscala);
}

function calcularEscala(semitonoRaiz, intervalos) {
    const indiceRaiz = semitonos_calculo.indexOf(semitonoRaiz);
    if (indiceRaiz === -1) return [];

    const notas = intervalos.map(intervalo => {
        const indiceNota = (indiceRaiz + intervalo) % 12;
        return semitonos_calculo[indiceNota];
    });

    return notas;
}

function mostrarResultado(tonalidad, escala, notas) {
    const resultadoBox = document.getElementById("resultado-box");
    resultadoBox.innerHTML = `<h3>${tonalidad} ${escala}</h3>`;
    const listaNotas = document.createElement("ul");
    listaNotas.classList.add("acordes-list");
    notas.forEach(nota => {
        const li = document.createElement("li");
        li.textContent = nota;
        listaNotas.appendChild(li);
    });
    resultadoBox.appendChild(listaNotas);
}

function mostrarContexto(tonalidad, notas, grados, acordes) {
    const contextoBox = document.getElementById("contexto-box");
    contextoBox.innerHTML = `<h3>Armonía</h3>`;

    const listaAcordes = document.createElement("ul");
    listaAcordes.classList.add("acordes-list");

    if (acordes && acordes.length > 0) {
        notas.forEach((nota, i) => {
            if (i < acordes.length) { // Asegurarse de que hay un acorde para el grado
                const acordeElement = document.createElement("li");
                const acordeBtn = document.createElement("button");
                acordeBtn.classList.add("acorde-btn");

                // Mapear la notación del acorde si es necesario
                let notacionAcorde = acordes[i];
                if (notacionAcorde === "maj7") {
                    notacionAcorde = "△7";
                } else if (notacionAcorde === "m△7") {
                    notacionAcorde = "m△7";
                }
                
                acordeBtn.innerHTML = `${grados[i].replace("b", "♭").replace("#", "♯")}<br>${nota}${getNotacionSuperscript(notacionAcorde)}`;
                acordeBtn.dataset.nota = nota;
                acordeBtn.dataset.tipo = acordes[i];
                acordeBtn.onclick = () => reproducirAcorde(acordeBtn.dataset.nota, acordeBtn.dataset.tipo, acordeBtn);
                
                const progressionBtn = document.createElement("button");
                progressionBtn.classList.add("add-to-progression");
                progressionBtn.innerHTML = "+";
                progressionBtn.title = "Añadir a progresión";
                progressionBtn.onclick = (e) => {
                    e.stopPropagation();
                    añadirAcordeAProgresion(acordeBtn.dataset.nota, acordeBtn.dataset.tipo);
                };

                acordeElement.appendChild(acordeBtn);
                acordeElement.appendChild(progressionBtn);
                listaAcordes.appendChild(acordeElement);
            }
        });
    } else {
        const mensaje = document.createElement("p");
        mensaje.classList.add("no-chords-message");
        mensaje.textContent = "No hay acordes para esta escala.";
        listaAcordes.appendChild(mensaje);
    }
    
    contextoBox.appendChild(listaAcordes);
}

function getNotacionSuperscript(notacion) {
    // Esto se puede expandir para manejar más notaciones
    if (notacion === 'maj7' || notacion === '△7') {
        return '△7';
    } else if (notacion === 'm7') {
        return 'm7';
    } else if (notacion === '7') {
        return '7';
    } else if (notacion === 'm7b5') {
        return 'ø7';
    } else if (notacion === 'dim7') {
        return 'o7';
    } else if (notacion === 'm△7') {
        return 'm△7';
    } else if (notacion === '△7#5') {
        return '△7♯5';
    }
    return '';
}

function actualizarAcordesDisponibles(notas, acordes) {
    // Esto podría ser para una futura funcionalidad de acordes disponibles fuera del contexto.
}


// Reproducción de audio con Tone.js
function reproducirAcorde(nota, tipoAcorde, button) {
    if (currentAudio === button) {
        detenerReproduccion();
        return;
    }
    
    detenerReproduccion();

    let notacionTone = getNotacionTone(tipoAcorde);
    if (!notacionTone) {
        console.error("Tipo de acorde no reconocido:", tipoAcorde);
        return;
    }
    const notaTone = toneNoteMap[nota] + '4'; // Tonalidad base
    const notasAcorde = Tone.Midi(notaTone).notes.map(midi => Tone.Midi(midi).transpose(0).toNote());
    
    // Obtener los intervalos del acorde a partir de la notacionTone
    const intervalosAcorde = acordes[Object.keys(acordes).find(key => acordes[key].notacion === notacionTone)]?.intervalos;
    if (!intervalosAcorde) {
        console.error("Intervalos de acorde no encontrados para:", notacionTone);
        return;
    }

    const notasAcordeFinal = intervalosAcorde.map(intervalo => {
        const indiceNota = (semitonos_calculo.indexOf(nota) + intervalo) % 12;
        return toneNoteMap[semitonos_calculo[indiceNota]] + '4'; // Octava 4
    });

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.volume.value = -10;

    currentAudio = button;
    button.classList.add('playing');
    
    // Detener después de 1 segundo
    currentTimeout = setTimeout(() => {
        synth.releaseAll();
        if (button) button.classList.remove('playing');
        currentAudio = null;
    }, 1000);

    synth.triggerAttackRelease(notasAcordeFinal, "1s");
}

function detenerReproduccion() {
    if (currentTimeout) {
        clearTimeout(currentTimeout);
        currentTimeout = null;
    }
    if (currentAudio) {
        currentAudio.classList.remove('playing');
        currentAudio = null;
    }
    Tone.Transport.stop();
    if (currentSynth) {
        currentSynth.releaseAll();
    }
}

function getNotacionTone(tipoAcorde) {
    const tipo = tipoAcorde.split(" ")[0].toLowerCase();
    
    if (tipoAcorde.includes("Mayor Séptima") || tipoAcorde.includes("△7")) return "maj7";
    if (tipoAcorde.includes("Menor Séptima Mayor") || tipoAcorde.includes("m△7")) return "m-maj7";
    if (tipoAcorde.includes("Menor Séptima")) return "m7";
    if (tipoAcorde.includes("Séptima de Dominante")) return "7";
    if (tipoAcorde.includes("Menor Séptima con Quinta Disminuida") || tipoAcorde.includes("m7b5")) return "m7b5";
    if (tipoAcorde.includes("Disminuido Séptima") || tipoAcorde.includes("dim7")) return "dim7";
    if (tipoAcorde.includes("Aumentado Séptima Mayor") || tipoAcorde.includes("△7#5")) return "aug-maj7";
    if (tipoAcorde.includes("Séptima con Quinta Aumentada") || tipoAcorde.includes("7#5")) return "7aug5";
    if (tipoAcorde.includes("Séptima con Quinta Disminuida") || tipoAcordes.includes("7b5")) return "7b5";

    // Si es una notación de las escalas
    if (tipoAcorde in acorde_audio_map) return acorde_audio_map[tipoAcorde];
    
    return null;
}

// Progresiones de acordes
function añadirAcordeAProgresion(nota, tipo) {
    const progressionBuilder = document.getElementById("progression-builder");
    const acordeBtn = document.createElement("button");
    acordeBtn.classList.add("acorde-btn", "progression-acorde");

    let notacionAcorde = tipo;
    if (notacionAcorde === "maj7") {
        notacionAcorde = "△7";
    } else if (notacionAcorde === "m△7") {
        notacionAcorde = "m△7";
    }

    acordeBtn.innerHTML = `${nota}${getNotacionSuperscript(notacionAcorde)}`;
    acordeBtn.dataset.nota = nota;
    acordeBtn.dataset.tipo = tipo;
    acordeBtn.onclick = () => reproducirAcorde(acordeBtn.dataset.nota, acordeBtn.dataset.tipo, acordeBtn);
    
    const removeBtn = document.createElement("span");
    removeBtn.classList.add("remove-acorde");
    removeBtn.innerHTML = "&times;";
    removeBtn.onclick = (e) => {
        e.stopPropagation();
        progressionBuilder.removeChild(acordeBtn);
        // Actualizar la progresión interna
        const index = Array.from(progressionBuilder.children).indexOf(acordeBtn);
        currentProgression.splice(index, 1);
        if (currentProgressionIndex >= currentProgression.length) {
            currentProgressionIndex = 0; // Resetear si el índice actual es mayor
        }
    };

    acordeBtn.appendChild(removeBtn);
    progressionBuilder.appendChild(acordeBtn);

    currentProgression.push({ nota, tipo });
}

function tocarProgresion() {
    const playBtn = document.getElementById("toggle-progression-btn");
    
    if (isPlaying) {
        detenerProgresion();
        playBtn.classList.remove("playing");
        playBtn.classList.add("stopped");
        return;
    }

    if (currentProgression.length === 0) {
        alert("Añade acordes a la progresión primero.");
        return;
    }

    isPlaying = true;
    playBtn.classList.remove("stopped");
    playBtn.classList.add("playing");

    currentProgressionIndex = 0;
    
    progressionInterval = setInterval(() => {
        const acorde = currentProgression[currentProgressionIndex];
        const acordeBtn = document.querySelectorAll(".progression-acorde")[currentProgressionIndex];

        if (acordeBtn) {
            reproducirAcorde(acorde.nota, acorde.tipo, acordeBtn);
        }

        currentProgressionIndex++;
        if (currentProgressionIndex >= currentProgression.length) {
            currentProgressionIndex = 0; // Repetir la progresión
        }
    }, 2000); // Tocar cada 2 segundos
}

function detenerProgresion() {
    isPlaying = false;
    clearInterval(progressionInterval);
    progressionInterval = null;
    detenerReproduccion();
    document.querySelectorAll(".progression-acorde").forEach(btn => btn.classList.remove("playing"));
}

function limpiarProgresion() {
    detenerProgresion();
    const progressionBuilder = document.getElementById("progression-builder");
    progressionBuilder.innerHTML = '';
    currentProgression = [];
}

function generarProgresionAleatoria() {
    limpiarProgresion();
    const semitonoSeleccionado = document.getElementById("semitonos-dropdown").value;
    const escalaSeleccionada = document.getElementById("escalas-dropdown").value;

    const notasEscala = calcularEscala(semitonoSeleccionado, escalas_modos[escalaSeleccionada].intervalos);
    const acordesEscala = escalas_modos[escalaSeleccionada].acordes;

    if (!acordesEscala || acordesEscala.length === 0) {
        alert("La escala seleccionada no tiene acordes para generar una progresión.");
        return;
    }

    const numAcordes = 4; // Generar 4 acordes aleatorios
    for (let i = 0; i < numAcordes; i++) {
        const randomIndex = Math.floor(Math.random() * notasEscala.length);
        const nota = notasEscala[randomIndex];
        const tipo = acordesEscala[randomIndex];
        añadirAcordeAProgresion(nota, tipo);
    }
}


// Funcionalidad de Pestañas (Tabs)
function openTab(tabId, event) {
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));

    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(button => button.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Funcionalidad de Nota Pedal
function actualizarPiano() {
    const notaPedal = document.getElementById("nota-pedal-dropdown").value;
    const acordePedal = document.getElementById("acordes-pedal-dropdown").value;
    const pianoBox = document.getElementById("piano-box");
    
    const notasAcorde = calcularAcorde(notaPedal, acordePedal);
    const notasPedal = [notaPedal];

    pianoBox.innerHTML = '';

    const tonalidadElement = document.createElement("h3");
    tonalidadElement.textContent = `${notaPedal} como nota pedal`;
    pianoBox.appendChild(tonalidadElement);

    const acordesEnLista = generarAcordesSobreNotaPedal(notasAcorde, notasPedal);
    
    const listaAcordes = document.createElement("ul");
    listaAcordes.classList.add("acordes-list");

    acordesEnLista.forEach(acorde => {
        const li = document.createElement("li");
        const acordeBtn = document.createElement("button");
        acordeBtn.classList.add("acorde-btn");
        acordeBtn.textContent = acorde.display;
        acordeBtn.onclick = () => reproducirAcordeTonal(acorde.tonalidad, acorde.tipo, acordeBtn);
        
        li.appendChild(acordeBtn);
        listaAcordes.appendChild(li);
    });
    
    pianoBox.appendChild(listaAcordes);
}

function calcularAcorde(tonalidad, tipoAcorde) {
    const acordeInfo = acordes[tipoAcorde];
    if (!acordeInfo) return [];

    const indiceRaiz = semitonos_calculo.indexOf(tonalidad);
    if (indiceRaiz === -1) return [];

    const notas = acordeInfo.intervalos.map(intervalo => {
        const indiceNota = (indiceRaiz + intervalo) % 12;
        return semitonos_calculo[indiceNota];
    });

    return notas;
}

function generarAcordesSobreNotaPedal(notasAcorde, notasPedal) {
    // Esta función es un placeholder para la lógica de acordes sobre una nota pedal.
    // De momento, solo retorna los acordes de la primera pestaña.
    const acordesDisponibles = Object.keys(acordes).map(tipo => {
        const tonalidad = notasPedal[0];
        const acordeInfo = acordes[tipo];
        
        let notacionDisplay = acordeInfo.notacion;
        if (notacionDisplay === "maj7") notacionDisplay = "△7";
        if (notacionDisplay === "m7b5") notacionDisplay = "ø7";
        if (notacionDisplay === "dim7") notacionDisplay = "o7";
        if (notacionDisplay === "m△7") notacionDisplay = "m△7";
        if (notacionDisplay === "△7#5") notacionDisplay = "△7♯5";
        
        return {
            tonalidad: tonalidad,
            tipo: tipo,
            display: `${tonalidad}${notacionDisplay}`
        };
    });

    return acordesDisponibles;
}

function reproducirAcordeTonal(tonalidad, tipo, button) {
    if (currentAudio === button) {
        detenerReproduccion();
        return;
    }
    
    detenerReproduccion();

    let notacionTone = getNotacionTone(tipo);
    if (!notacionTone) {
        console.error("Tipo de acorde no reconocido:", tipo);
        return;
    }
    
    const acordeInfo = acordes[Object.keys(acordes).find(key => acordes[key].notacion === getNotacionTone(tipo))];
    if (!acordeInfo) {
        console.error("Información del acorde no encontrada para:", tipo);
        return;
    }

    const indiceRaiz = semitonos_calculo.indexOf(tonalidad);
    const notasAcordeFinal = acordeInfo.intervalos.map(intervalo => {
        const indiceNota = (indiceRaiz + intervalo) % 12;
        return toneNoteMap[semitonos_calculo[indiceNota]] + '4'; // Octava 4
    });

    const synth = new Tone.PolySynth(Tone.Synth).toDestination();
    synth.volume.value = -10;

    currentAudio = button;
    button.classList.add('playing');
    
    // Detener después de 1 segundo
    currentTimeout = setTimeout(() => {
        synth.releaseAll();
        if (button) button.classList.remove('playing');
        currentAudio = null;
    }, 1000);

    synth.triggerAttackRelease(notasAcordeFinal, "1s");
}

document.addEventListener("DOMContentLoaded", () => {
    cargarOpciones();
    actualizarTodo();
    actualizarPiano();
    
    document.getElementById("toggle-progression-btn").addEventListener("click", tocarProgresion);
    document.getElementById("clear-progression-btn").addEventListener("click", limpiarProgresion);
    document.getElementById("generate-random-progression-btn").addEventListener("click", generarProgresionAleatoria);
});