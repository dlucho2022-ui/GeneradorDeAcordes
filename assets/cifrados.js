document.addEventListener('DOMContentLoaded', () => {
    const chartContainer = document.getElementById('chart-container');
    const fontSizeSelector = document.getElementById('font-size-selector');
    let focusedMeasure = null;
    let focusedSectionTitle = null;
    let progressionSequence; // Referencia para la secuencia de acordes
    
    // --- Variables para selección por arrastre ---
    let isSelecting = false;
    let selectionStartMeasure = null;

    // --- LÓGICA DE AUDIO --- 
    const sampler = new Tone.Sampler({
        urls: { 'C4':'C4.mp3', 'D#4':'Ds4.mp3', 'F#4':'Fs4.mp3', 'A4':'A4.mp3' },
        release: 0.5,
        baseUrl: "https://tonejs.github.io/audio/salamander/",
    }).toDestination();

    const metronomeVolume = new Tone.Volume(-10).toDestination();
    const metronomePlayer = new Tone.Player("assets/audios/metronome_click.wav").connect(metronomeVolume);
    const metronomeLoop = new Tone.Loop(time => {
        metronomePlayer.start(time);
    }, "4n");

    // --- NUEVA LÓGICA DE ACORDES (DE SCRIPTS.JS) ---

    const notasBase = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"];

    const acordes = {
        "Mayor Séptima (maj7)": { "intervalos": [0, 4, 7, 11], "grados": ["1", "3", "5", "7"], "notacion": "maj7" },
        "Mayor Siete b9 (maj7b9)": { "intervalos": [0, 4, 7, 11, 1], "grados": ["1", "3", "5", "7", "b9"], "notacion": "maj7b9" },
        "Novena Mayor (maj9)": { "intervalos": [0, 4, 7, 11, 2], "grados": ["1", "3", "5", "7", "9"], "notacion": "maj9" },
        "Trecena Mayor (maj13)": { "intervalos": [0, 4, 7, 11, 2, 9], "grados": ["1", "3", "5", "7", "9", "13"], "notacion": "maj13" },
        "Mayor Siete #11 (maj7#11)": { "intervalos": [0, 4, 7, 11, 6], "grados": ["1", "3", "5", "7", "#11"], "notacion": "maj7#11" },
        "Menor Séptima (m7)": { "intervalos": [0, 3, 7, 10], "grados": ["1", "b3", "5", "b7"], "notacion": "m7" },
        "Novena Menor (m9)": { "intervalos": [0, 3, 7, 10, 2], "grados": ["1", "b3", "5", "b7", "9"], "notacion": "m9" },
        "Menor Novena b5 (m9b5)": { "intervalos": [0, 3, 6, 10, 2], "grados": ["1", "b3", "b5", "b7", "9"], "notacion": "m9b5" },
        "Trecena Menor (m13)": { "intervalos": [0, 3, 7, 10, 2, 9], "grados": ["1", "b3", "5", "b7", "9", "13"], "notacion": "m13" },
        "Menor Siete b9 (m7b9)": { "intervalos": [0, 3, 7, 10, 1], "grados": ["1", "b3", "5", "b7", "b9"], "notacion": "m7b9" },
        "Menor Siete #11 (m7#11)": { "intervalos": [0, 3, 7, 10, 6], "grados": ["1", "b3", "5", "b7", "#11"], "notacion": "m7#11" },
        "Séptima de Dominante (7)": { "intervalos": [0, 4, 7, 10], "grados": ["1", "3", "5", "b7"], "notacion": "7" },
        "7sus4": { "intervalos": [0, 5, 7, 10], "grados": ["1", "4", "5", "b7"], "notacion": "7sus4" },
        "Novena Dominante (9)": { "intervalos": [0, 4, 7, 10, 2], "grados": ["1", "3", "5", "b7", "9"], "notacion": "9" },
        "Trecena Dominante (13)": { "intervalos": [0, 4, 7, 10, 2, 9], "grados": ["1", "3", "5", "b7", "9", "13"], "notacion": "13" },
        "Siete b9 (7b9)": { "intervalos": [0, 4, 7, 10, 1], "grados": ["1", "3", "5", "b7", "b9"], "notacion": "7b9" },
        "Siete #9 (7#9)": { "intervalos": [0, 4, 7, 10, 3], "grados": ["1", "3", "5", "b7", "#9"], "notacion": "7#9" },
        "Siete #11 (7#11)": { "intervalos": [0, 4, 7, 10, 6], "grados": ["1", "3", "5", "b7", "#11"], "notacion": "7#11" },
        "Sexta (6)": { "intervalos": [0, 4, 7, 9], "grados": ["1", "3", "5", "6"], "notacion": "6" },
        "Menor Sexta (m6)": { "intervalos": [0, 3, 7, 9], "grados": ["1", "b3", "5", "6"], "notacion": "m6" },
        "Menor Séptima con Quinta Disminuida (m7b5)": { "intervalos": [0, 3, 6, 10], "grados": ["1", "b3", "b5", "b7"], "notacion": "m7b5" },
        "Disminuido Séptima (dim7)": { "intervalos": [0, 3, 6, 9], "grados": ["1", "b3", "b5", "bb7"], "notacion": "dim7" },
        "Menor Séptima Mayor (m△7)": { "intervalos": [0, 3, 7, 11], "grados": ["1", "b3", "5", "7"], "notacion": "m△7" },
        "Aumentado Séptima Mayor (△7#5)": { "intervalos": [0, 4, 8, 11], "grados": ["1", "3", "#5", "7"], "notacion": "△7#5" },
        "Mayor Séptima b5 (maj7b5)": { "intervalos": [0, 4, 6, 11], "grados": ["1", "3", "b5", "7"], "notacion": "maj7b5" },
        "Séptima con Quinta Aumentada (7#5)": { "intervalos": [0, 4, 8, 10], "grados": ["1", "3", "#5", "b7"], "notacion": "7#5" },
        "Séptima con Quinta Disminuida (7b5)": { "intervalos": [0, 4, 6, 10], "grados": ["1", "3", "b5", "b7"], "notacion": "7b5" },
        "Mayor Siete #9 (maj7#9)": { "intervalos": [0, 4, 7, 11, 3], "grados": ["1", "3", "5", "7", "#9"], "notacion": "maj7#9" },
        "Sexta/Novena (6/9)": { "intervalos": [0, 4, 7, 9, 2], "grados": ["1", "3", "5", "6", "9"], "notacion": "6/9" },
        "Menor Sexta/Novena (m6/9)": { "intervalos": [0, 3, 7, 9, 2], "grados": ["1", "b3", "5", "6", "9"], "notacion": "m6/9" },
        "Siete b9 #11 (7b9#11)": { "intervalos": [0, 4, 7, 10, 1, 6], "grados": ["1", "3", "5", "b7", "b9", "#11"], "notacion": "7b9#11" },
        "Siete #9 b13 (7#9b13)": { "intervalos": [0, 4, 7, 10, 3, 8], "grados": ["1", "3", "5", "b7", "#9", "b13"], "notacion": "7#9b13" },
        "Siete b5 #9 (7b5#9)": { "intervalos": [0, 4, 6, 10, 3], "grados": ["1", "3", "b5", "b7", "#9"], "notacion": "7b5#9" },
        "Siete #5 #9 (7#5#9)": { "intervalos": [0, 4, 8, 10, 3], "grados": ["1", "3", "#5", "b7", "#9"], "notacion": "7#5#9" },
        "Siete #5 b9 (7#5b9)": { "intervalos": [0, 4, 8, 10, 1], "grados": ["1", "3", "#5", "b7", "b9"], "notacion": "7#5b9" },
        "Novena Suspendida 4 (9sus4)": { "intervalos": [0, 5, 7, 10, 2], "grados": ["1", "4", "5", "b7", "9"], "notacion": "9sus4" },
        "Trecena Suspendida 4 (13sus4)": { "intervalos": [0, 5, 7, 10, 2, 9], "grados": ["1", "4", "5", "b7", "9", "13"], "notacion": "13sus4" },
        "Séptima Suspendida 2 (7sus2)": { "intervalos": [0, 2, 7, 10], "grados": ["1", "2", "5", "b7"], "notacion": "7sus2" },
        "Séptima Suspendida 4 b5 (7sus4b5)": { "intervalos": [0, 5, 6, 10], "grados": ["1", "4", "b5", "b7"], "notacion": "7sus4b5" },
        "Séptima Suspendida 4 #5 (7sus4#5)": { "intervalos": [0, 5, 8, 10], "grados": ["1", "4", "#5", "b7"], "notacion": "7sus4#5" },
        "Séptima Suspendida 2 b5 (7sus2b5)": { "intervalos": [0, 2, 6, 10], "grados": ["1", "2", "b5", "b7"], "notacion": "7sus2b5" },
        "Séptima Suspendida 2 #5 (7sus2#5)": { "intervalos": [0, 2, 8, 10], "grados": ["1", "2", "#5", "b7"], "notacion": "7sus2#5" },
        "Suspendida 4 b5 (sus4b5)": { "intervalos": [0, 5, 6], "grados": ["1", "4", "b5"], "notacion": "sus4b5" },
        "Suspendida 4 #5 (sus4#5)": { "intervalos": [0, 5, 8], "grados": ["1", "4", "#5"], "notacion": "sus4#5" },
        "Suspendida 2 b5 (sus2b5)": { "intervalos": [0, 2, 6], "grados": ["1", "2", "b5"], "notacion": "sus2b5" },
        "Add 9 (add9)": { "intervalos": [0, 4, 7, 2], "grados": ["1", "3", "5", "9"], "notacion": "add9" },
        "Cuarta Suspendida (sus4)": { "intervalos": [0, 5, 7], "grados": ["1", "4", "5"], "notacion": "sus4" },
        "Segunda Suspendida (sus2)": { "intervalos": [0, 2, 7], "grados": ["1", "2", "5"], "notacion": "sus2" },
        "Mayor (Triada)": { "intervalos": [0, 4, 7], "grados": ["1", "3", "5"], "notacion": "maj" },
        "Menor (Triada)": { "intervalos": [0, 3, 7], "grados": ["1", "b3", "5"], "notacion": "m" },
        "Aumentado (Triada)": { "intervalos": [0, 4, 8], "grados": ["1", "3", "#5"], "notacion": "aug" },
        "Disminuido (Triada)": { "intervalos": [0, 3, 6], "grados": ["1", "b3", "b5"], "notacion": "dim" }
    };
    
    const semitonos_display = ["Do", "Do#", "Reb", "Re", "Re#", "Mib", "Mi", "Fa", "Fa#", "Solb", "Sol", "Sol#", "Lab", "La", "La#", "Sib", "Si"];

    function mapNotaToSemitone(nota) {
        const semitonoMap = {
            "Do": 0, "Do#": 1, "Reb": 1, "Re": 2, "Re#": 3, "Mib": 3, "Mi": 4,
            "Fa": 5, "Fa#": 6, "Solb": 6, "Sol": 7, "Sol#": 8, "Lab": 8,
            "La": 9, "La#": 10, "Sib": 10, "Si": 11,
            "C": 0, "C#": 1, "Db": 1, "D": 2, "D#": 3, "Eb": 3, "E": 4,
            "F": 5, "F#": 6, "Gb": 6, "G": 7, "G#": 8, "Ab": 8,
            "A": 9, "A#": 10, "Bb": 10, "B": 11,
            "Mi#": 5, "Si#": 0, "Fab": 4, "Dob": 11, "E#": 5, "B#": 0, "Fb": 4, "Cb": 11,
            "Dox": 2, "Fax": 7, "Solx": 9, "Lax": 11, "Six": 1, "Rex": 4, "Mix": 6,
            "Rebb": 0, "Mibb": 2, "Fabb": 3, "Solbb": 5, "Labb": 7, "Sibb": 9, "Dobb": 10, "Sibbb": 8
        };
        return semitonoMap[nota] !== undefined ? semitonoMap[nota] : -1;
    }

    function getDiatonicIndexFromGrade(grado) {
        const gradoMap = { "1": 0, "b2": 1, "2": 1, "#2": 2, "b3": 2, "3": 2, "b4": 3, "4": 3, "#4": 4, "b5": 4, "5": 4, "b6": 5, "6": 5, "bb7": 6, "b7": 6, "7": 6, "b9": 1, "9": 1, "#9": 2, "b11": 3, "11": 3, "#11": 4, "b13": 5, "13": 5 };
        const baseGrado = grado.replace(/[#b]/g, '');
        return gradoMap[baseGrado] || 0;
    }

    function getProperNoteNameForScale(rootNote, intervalIndex, semitoneInterval) {
        const rootBaseNote = rootNote.replace(/[#b]/g, '').slice(0,1).toUpperCase() + rootNote.slice(1);
        const rootBaseIndex = notasBase.indexOf(rootBaseNote.slice(0,1).toUpperCase() + rootBaseNote.slice(1).replace(/[#b]/g, ''));
        const targetBaseNote = notasBase[(rootBaseIndex + intervalIndex) % 7];
        const rootSemitone = mapNotaToSemitone(rootNote);
        const targetNoteSemitone = (rootSemitone + semitoneInterval + 12) % 12;
        const targetBaseSemitone = mapNotaToSemitone(targetBaseNote);
        let diff = (targetNoteSemitone - targetBaseSemitone + 12) % 12;
        let accidental = "";
        
        if (diff === 1) accidental = "#";
        else if (diff === 2) accidental = "x";
        else if (diff === 11) accidental = "b";
        else if (diff === 10) accidental = "bb";
        else if (diff !== 0) {
            // Fallback para intervalos complejos, busca la mejor coincidencia enarmónica
            const enharmonic = semitonos_display.find(n => mapNotaToSemitone(n) === targetNoteSemitone);
            return enharmonic || targetBaseNote + ' (?)'; // Devuelve el enarmónico directamente
        }
    
        const finalNote = targetBaseNote + accidental;
    
        // Reemplazar notas enarmónicas no deseadas
        const replacements = {
            "Dob": "Si",
            "Fab": "Mi",
            "Mi#": "Fa",
            "Si#": "Do"
        };
    
        return replacements[finalNote] || finalNote;
    }
    function getChordNotes(rootNote, chordType) {
        let internalChordType = chordType;
        if (internalChordType === '△7') internalChordType = 'maj7';
        if (internalChordType === 'ø7') internalChordType = 'm7b5';
        if (internalChordType === '°') internalChordType = 'dim';
        if (internalChordType === '') internalChordType = 'maj';


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
    
    const toneNoteMap = { "Do": "C", "Do#": "C#", "Reb": "Db", "Re": "D", "Re#": "D#", "Mib": "Eb", "Mi": "E", "Fa": "F", "Fa#": "F#", "Solb": "Gb", "Sol": "G", "Sol#": "G#", "Lab": "Ab", "La": "A", "La#": "A#", "Sib": "Bb", "Si": "B" };

    function simplifyEnharmonic(note) {
        const simplificationMap = { "Mi#": "Fa", "Si#": "Do", "Fab": "Mi", "Dob": "Si", "Dox": "Re", "Rex": "Mi", "Mix": "Fa#", "Fax": "Sol", "Solx": "La", "Lax": "Si", "Six": "Do#", "Rebb": "Do", "Mibb": "Re", "Solbb": "Fa", "Labb": "Sol", "Sibb": "La", "Dobb": "Sib", "Fabb": "Mib" };
        return simplificationMap[note] || note;
    }

    function getPlayablePianoNotes(chordNoteNames, startOctave = 4) {
        const notesWithPitch = chordNoteNames.map(name => ({ name: simplifyEnharmonic(name), pitch: mapNotaToSemitone(simplifyEnharmonic(name)) })).filter(n => n.pitch !== -1);
        let lastPitch = -1;
        let currentOctave = startOctave;
        const playableNotes = notesWithPitch.map(note => {
            if (lastPitch !== -1 && note.pitch < lastPitch) {
                currentOctave++;
            }
            lastPitch = note.pitch;
            const mappedNote = toneNoteMap[note.name.charAt(0).toUpperCase() + note.name.slice(1)];
            return mappedNote ? mappedNote + currentOctave : null;
        }).filter(n => n);
        return playableNotes;
    }

    const spanishToEnglishMap = { 'do': 'C', 're': 'D', 'mi': 'E', 'fa': 'F', 'sol': 'G', 'la': 'A', 'si': 'B', 'do#': 'C#', 'reb': 'Db', 're#': 'D#', 'mib': 'Eb', 'fa#': 'F#', 'solb': 'Gb', 'sol#': 'G#', 'lab': 'Ab', 'la#': 'A#', 'sib': 'Bb' };
    const sortedSpanishNotes = Object.keys(spanishToEnglishMap).sort((a, b) => b.length - a.length);
    
    function parseChordName(chordName) {
        chordName = chordName.trim();
        let rootNote = '';
        let quality = '';

        // Handle Spanish note names first
        const lowerChord = chordName.toLowerCase();
        let foundSpanish = false;
        for (const spanishNote of sortedSpanishNotes) {
            if (lowerChord.startsWith(spanishNote)) {
                const englishNote = spanishToEnglishMap[spanishNote];
                rootNote = englishNote;
                quality = chordName.substring(spanishNote.length);
                foundSpanish = true;
                break;
            }
        }

        if (!foundSpanish) {
            // Standard English parsing
            const match = chordName.match(/^([A-G](?:#|b|x|bb)?)/);
            if (match) {
                rootNote = match[1];
                quality = chordName.substring(rootNote.length);
            } else {
                return null; // Could not parse
            }
        }
        
        // Handle special cases for quality
        const qualityLower = quality.toLowerCase();
        if (qualityLower === 'maj7#5') quality = '△7#5';
        else if (qualityLower === 'maj7b5') quality = 'maj7b5';
        else if (qualityLower === 'maj7b9') quality = 'maj7b9';
        else if (qualityLower === '7sus4') quality = '7sus4';
        else if (qualityLower === '7sus4b5') quality = '7sus4b5';
        else if (qualityLower === '7sus4#5') quality = '7sus4#5';
        else if (qualityLower === '7sus2b5') quality = '7sus2b5';
        else if (qualityLower === '7sus2#5') quality = '7sus2#5';
        else if (qualityLower === 'm9b5') quality = 'm9b5';
        else if (quality === '') quality = 'maj';
        else if (quality === 'm') quality = 'm';
        else if (quality === '°' || qualityLower === 'dim' || qualityLower === 'mb5') quality = 'dim';
        else if (quality === 'ø' || qualityLower === 'm7b5') quality = 'm7b5';
        else if (quality === '°7' || qualityLower === 'dim7') quality = 'dim7';
        else if (quality === 'M7' || qualityLower === 'maj7' || quality === '△7' || quality === '△') quality = 'maj7';

        return { rootNote, quality };
    }

    function playChord(fullChordName) {
        if (Tone.context.state !== 'running') { Tone.start(); }
        
        let chordPart = fullChordName;
        let bassPart = null;

        if (fullChordName.includes('/')) {
            const parts = fullChordName.split('/');
            chordPart = parts[0].trim();
            bassPart = parts[1].trim();
        }

        const parsed = parseChordName(chordPart);
        if (!parsed) {
            console.warn(`No se pudo interpretar el acorde: ${chordPart}`);
            return;
        }

        const { rootNote, quality } = parsed;
        const chordNotes = getChordNotes(rootNote, quality);
        
        if (chordNotes && chordNotes.length > 0) {
            let finalNotes = getPlayablePianoNotes(chordNotes);
            
            if (bassPart) {
                const parsedBass = parseChordName(bassPart);
                if(parsedBass) {
                    const bassNoteName = parsedBass.rootNote;
                    const bassNote = bassNoteName + '3'; // Assume octave 3 for bass
                    finalNotes.unshift(bassNote);
                }
            }
            
            sampler.triggerAttackRelease(finalNotes, '1n');
        } else {
            console.warn(`Acorde no encontrado o sin notas: ${fullChordName}`);
        }
    }

    // --- FIN DE LA NUEVA LÓGICA ---


    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const dragHandle = element.querySelector('.comment-drag-handle');
        if (dragHandle) { dragHandle.onmousedown = dragMouseDown; } else { element.onmousedown = dragMouseDown; }
        function dragMouseDown(e) { e = e || window.event; e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY; document.onmouseup = closeDragElement; document.onmousemove = elementDrag; }
        function elementDrag(e) { e = e || window.event; e.preventDefault(); pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY; pos3 = e.clientX; pos4 = e.clientY; element.style.top = (element.offsetTop - pos2) + "px"; element.style.left = (element.offsetLeft - pos1) + "px"; }
        function closeDragElement() { document.onmouseup = null; document.onmousemove = null; saveSheetMusicToLocalStorage(); }
    }

    // Lógica de guardado/cargado refactorizada
    function serializeChart() {
        const data = {
            songTitle: document.getElementById('song-title').textContent,
            sections: [],
            comments: [],
            settings: {
                zoom: document.getElementById('font-size-selector').value,
                measureFontSize: document.getElementById('measure-font-size-slider').value,
                measureHeight: document.getElementById('measure-height-slider').value,
                bpm: document.getElementById('metronome-bpm-input').value
            }
        };
        document.querySelectorAll('.song-section').forEach(sectionDiv => {
            const section = { title: sectionDiv.querySelector('h2').textContent, rows: [] };
            sectionDiv.querySelectorAll('.measure-row').forEach(rowDiv => {
                const row = { measures: [] };
                rowDiv.querySelectorAll('.measure').forEach(measureDiv => { 
                    row.measures.push({ 
                        content: measureDiv.textContent, 
                        isPlaceholder: measureDiv.classList.contains('measure-placeholder'),
                        isRepeatStart: measureDiv.classList.contains('repeat-start'),
                        isRepeatEnd: measureDiv.classList.contains('repeat-end')
                    }); 
                });
                section.rows.push(row);
            });
            data.sections.push(section);
        });
        document.querySelectorAll('.comment-box').forEach(commentBox => { data.comments.push({ content: commentBox.querySelector('.comment-content').textContent, top: commentBox.style.top, left: commentBox.style.left }); });
        return data;
    }

    function renderChart(data) {
        chartContainer.innerHTML = '';
        document.querySelectorAll('.comment-box').forEach(comment => comment.remove());

        const songTitleElement = document.createElement('h1');
        songTitleElement.id = 'song-title';
        songTitleElement.contentEditable = 'true';
        songTitleElement.textContent = data.songTitle || 'Nombre de la Canción';
        chartContainer.appendChild(songTitleElement);

        if (data.sections) {
            data.sections.forEach(sectionData => {
                const newSection = document.createElement('div');
                newSection.className = 'song-section';
                const newTitle = document.createElement('h2');
                newTitle.contentEditable = 'true';
                newTitle.textContent = sectionData.title;
                newSection.appendChild(newTitle);
                if (sectionData.rows) {
                    sectionData.rows.forEach(rowData => {
                        const newRow = document.createElement('div');
                        newRow.className = 'measure-row';
                        const numMeasures = rowData.measures.length;
                        newRow.style.gridTemplateColumns = `repeat(${numMeasures}, 1fr)`;
                        rowData.measures.forEach(measureData => {
                            const measureDiv = document.createElement('div');
                            measureDiv.className = 'measure';
                            if (measureData.isPlaceholder) measureDiv.classList.add('measure-placeholder');
                            if (measureData.isRepeatStart) measureDiv.classList.add('repeat-start');
                            if (measureData.isRepeatEnd) measureDiv.classList.add('repeat-end');
                            measureDiv.contentEditable = 'true';
                            measureDiv.textContent = measureData.content;
                            newRow.appendChild(measureDiv);
                        });
                        newSection.appendChild(newRow);
                    });
                }
                chartContainer.appendChild(newSection);
            });
        }

        if (data.comments) {
            data.comments.forEach(commentData => {
                const commentBox = document.createElement('div');
                commentBox.className = 'comment-box';
                const dragHandle = document.createElement('div');
                dragHandle.className = 'comment-drag-handle';
                const contentArea = document.createElement('div');
                contentArea.className = 'comment-content';
                contentArea.contentEditable = 'true';
                contentArea.textContent = commentData.content;
                commentBox.appendChild(dragHandle);
                commentBox.appendChild(contentArea);
                commentBox.style.top = commentData.top;
                commentBox.style.left = commentData.left;
                chartContainer.appendChild(commentBox);
                makeDraggable(commentBox);
                contentArea.addEventListener('blur', saveSheetMusicToLocalStorage);
            });
        }

        // Aplicar los ajustes de visualización guardados
        if (data.settings) {
            const { zoom, measureFontSize, measureHeight, bpm } = data.settings;
            const fontSizeSelector = document.getElementById('font-size-selector');
            const measureFontSizeSlider = document.getElementById('measure-font-size-slider');
            const measureHeightSlider = document.getElementById('measure-height-slider');
            const bpmInput = document.getElementById('metronome-bpm-input');
            const bpmSlider = document.getElementById('metronome-bpm-slider');

            if (zoom) {
                fontSizeSelector.value = zoom;
                chartContainer.style.fontSize = zoom;
            }
            if (measureFontSize) {
                measureFontSizeSlider.value = measureFontSize;
            }
            if (measureHeight) {
                measureHeightSlider.value = measureHeight;
            }
            if (bpm) {
                bpmInput.value = bpm;
                bpmSlider.value = bpm;
                Tone.Transport.bpm.value = bpm;
            }
            applyMeasureStyles(measureFontSizeSlider.value, measureHeightSlider.value);
        }
    }

    function saveSheetMusicToLocalStorage() {
        const data = serializeChart();
        localStorage.setItem('sheetMusicData', JSON.stringify(data));
    }

    function loadSheetMusicFromLocalStorage() {
        const savedData = localStorage.getItem('sheetMusicData');
        if (savedData) {
            const data = JSON.parse(savedData);
            renderChart(data);
        } else {
             chartContainer.innerHTML = `
                <h1 id="song-title" contenteditable="true">Nombre de la Canción</h1>
                <div class="song-section">
                    <h2 contenteditable="true">Intro</h2>
                    <div class="measure-row" style="grid-template-columns: repeat(4, 1fr);">
                        <div class="measure" contenteditable="true"></div>
                        <div class="measure" contenteditable="true"></div>
                        <div class="measure" contenteditable="true"></div>
                        <div class="measure" contenteditable="true"></div>
                    </div>
                </div>
            `;
        }
    }

    chartContainer.addEventListener('focusin', (event) => {
        if (event.target.classList.contains('measure')) { focusedMeasure = event.target; focusedSectionTitle = null; }
        else if (event.target.tagName === 'H2' && event.target.closest('.song-section')) { focusedSectionTitle = event.target; focusedMeasure = null; }
        else { focusedMeasure = null; focusedSectionTitle = null; }
    });

    chartContainer.addEventListener('input', (event) => {
        if (event.target.classList.contains('measure') || event.target.id === 'song-title' || (event.target.tagName === 'H2' && event.target.closest('.song-section'))) {
            saveSheetMusicToLocalStorage();
        }
    });

    fontSizeSelector.addEventListener('change', (e) => { chartContainer.style.fontSize = e.target.value; saveSheetMusicToLocalStorage(); });

    const measureFontSizeSlider = document.getElementById('measure-font-size-slider');
    const measureHeightSlider = document.getElementById('measure-height-slider');

    function applyMeasureStyles(fontSize, minHeight) {
        document.documentElement.style.setProperty('--measure-font-size', `${fontSize}em`);
        document.documentElement.style.setProperty('--measure-min-height', `${minHeight}px`);
    }
    function saveMeasureSettings() { localStorage.setItem('measureFontSize', measureFontSizeSlider.value); localStorage.setItem('measureMinHeight', measureHeightSlider.value); }
    function loadMeasureSettings() {
        const savedFontSize = localStorage.getItem('measureFontSize');
        const savedMinHeight = localStorage.getItem('measureMinHeight');
        if (savedFontSize) { measureFontSizeSlider.value = savedFontSize; }
        if (savedMinHeight) { measureHeightSlider.value = savedMinHeight; }
        applyMeasureStyles(measureFontSizeSlider.value, measureHeightSlider.value);
    }

    measureFontSizeSlider.addEventListener('input', () => { applyMeasureStyles(measureFontSizeSlider.value, measureHeightSlider.value); saveMeasureSettings(); });
    measureHeightSlider.addEventListener('input', () => { applyMeasureStyles(measureFontSizeSlider.value, measureHeightSlider.value); saveMeasureSettings(); });
    loadMeasureSettings();

    function insertMeasures(row, count, referenceElement = null) {
        for (let i = 0; i < count; i++) {
            const measure = document.createElement('div');
            measure.className = 'measure';
            measure.contentEditable = 'true';
            measure.textContent = '';
            if (referenceElement) { row.insertBefore(measure, referenceElement); } else { row.appendChild(measure); }
        }
        const numMeasures = row.children.length;
        row.style.gridTemplateColumns = `repeat(${numMeasures}, 1fr)`;
    }

    document.getElementById('add-start-repeat-btn').addEventListener('click', () => { if (focusedMeasure) focusedMeasure.classList.toggle('repeat-start'); saveSheetMusicToLocalStorage(); });
    document.getElementById('add-end-repeat-btn').addEventListener('click', () => { if (focusedMeasure) focusedMeasure.classList.toggle('repeat-end'); saveSheetMusicToLocalStorage(); });
    document.getElementById('delete-measure-btn').addEventListener('click', () => {
        if (!focusedMeasure) { alert('Hacé clic en el compás que querés eliminar.'); return; }
        const row = focusedMeasure.closest('.measure-row');
        if (row && row.children.length > 1) { focusedMeasure.remove(); const numMeasures = row.children.length; row.style.gridTemplateColumns = `repeat(${numMeasures}, 1fr)`; saveSheetMusicToLocalStorage(); } else { alert('No se puede eliminar el último compás de una fila.'); }
    });
    document.getElementById('clear-measure-btn').addEventListener('click', () => { if (focusedMeasure) { focusedMeasure.textContent = ''; focusedMeasure.classList.remove('repeat-start', 'repeat-end', 'double-bar'); } });
    document.getElementById('add-measure-btn').addEventListener('click', () => {
        if (!focusedMeasure) { alert('Hacé clic en un compás para agregar otro a su lado.'); return; }
        const row = focusedMeasure.closest('.measure-row');
        if (row) { const newMeasure = document.createElement('div'); newMeasure.className = 'measure'; newMeasure.contentEditable = 'true'; row.insertBefore(newMeasure, focusedMeasure.nextSibling); const numMeasures = row.children.length; row.style.gridTemplateColumns = `repeat(${numMeasures}, 1fr)`; saveSheetMusicToLocalStorage(); }
    });

    document.getElementById('add-row-btn').addEventListener('click', () => {
        let currentSection;
        if (focusedMeasure) { currentSection = focusedMeasure.closest('.song-section'); } else if (focusedSectionTitle) { currentSection = focusedSectionTitle.closest('.song-section'); } else { const sections = chartContainer.querySelectorAll('.song-section'); if (sections.length > 0) { currentSection = sections[sections.length - 1]; } }
        if (currentSection) { const newRow = document.createElement('div'); newRow.className = 'measure-row'; insertMeasures(newRow, 4); currentSection.appendChild(newRow); saveSheetMusicToLocalStorage(); } else { alert('No se encontró una sección para agregar la fila.'); }
    });

    document.getElementById('delete-row-btn').addEventListener('click', () => {
        if (!focusedMeasure) { alert('Hacé clic en un compás de la fila que querés eliminar.'); return; }
        const row = focusedMeasure.closest('.measure-row');
        if (row) { if (confirm('¿Estás seguro de que querés eliminar esta fila completa?')) { row.remove(); saveSheetMusicToLocalStorage(); } }
    });

    document.getElementById('add-section-btn').addEventListener('click', () => {
        const sectionCount = chartContainer.getElementsByClassName('song-section').length + 1;
        const newSection = document.createElement('div'); newSection.className = 'song-section';
        const newTitle = document.createElement('h2'); newTitle.contentEditable = 'true'; newTitle.textContent = `Sección ${sectionCount}`;
        newSection.appendChild(newTitle);
        const newRow = document.createElement('div'); newRow.className = 'measure-row'; insertMeasures(newRow, 4); newSection.appendChild(newRow);
        chartContainer.appendChild(newSection); saveSheetMusicToLocalStorage();
    });

    document.getElementById('delete-section-btn').addEventListener('click', () => {
        if (!focusedMeasure && !focusedSectionTitle) { alert('Hacé clic en un compás o título de la sección que querés eliminar.'); return; }
        let section;
        if(focusedMeasure) { section = focusedMeasure.closest('.song-section'); } else { section = focusedSectionTitle.closest('.song-section'); }
        if (section) { if (chartContainer.getElementsByClassName('song-section').length > 1) { if (confirm('¿Estás seguro de que querés eliminar esta sección completa?')) { section.remove(); focusedMeasure = null; focusedSectionTitle = null; saveSheetMusicToLocalStorage(); } } else { alert('No se puede eliminar la única sección.'); } }
    });

    document.getElementById('add-comment-btn').addEventListener('click', () => {
        const commentBox = document.createElement('div'); commentBox.className = 'comment-box';
        const dragHandle = document.createElement('div'); dragHandle.className = 'comment-drag-handle';
        const contentArea = document.createElement('div'); contentArea.className = 'comment-content'; contentArea.contentEditable = 'true'; contentArea.textContent = 'Escribí acá...';
        commentBox.appendChild(dragHandle); commentBox.appendChild(contentArea);
        commentBox.style.top = `${window.innerHeight / 2 - 50}px`; commentBox.style.left = `${window.innerWidth / 2 - 75}px`;
        chartContainer.appendChild(commentBox); makeDraggable(commentBox); saveSheetMusicToLocalStorage(); contentArea.addEventListener('blur', saveSheetMusicToLocalStorage);
    });

    document.getElementById('export-pdf-btn').addEventListener('click', async () => {
        const chartContainer = document.getElementById('chart-container');
        const songTitle = document.getElementById('song-title').textContent.trim();
        const filename = songTitle ? `${songTitle}.pdf` : 'cifrado.pdf';
        const elementsToHide = [document.querySelector('.floating-controls-container')];
        const placeholders = document.querySelectorAll('.measure-placeholder');
        elementsToHide.forEach(el => { if (el) el.style.visibility = 'hidden'; });
        placeholders.forEach(p => p.style.display = 'none');
        const canvas = await html2canvas(chartContainer, { width: chartContainer.scrollWidth, height: chartContainer.scrollHeight, scale: 2, useCORS: true, logging: false, backgroundColor: '#FFFFFF' });
        elementsToHide.forEach(el => { if (el) el.style.visibility = 'visible'; });
        placeholders.forEach(p => p.style.display = '');
        const imgData = canvas.toDataURL('image/jpeg', 0.8);
        const pdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const marginTop = 10, marginBottom = 10, marginHorizontal = 0;
        const usableWidth = pdfWidth - (marginHorizontal * 2);
        const usableHeight = pdfHeight - marginTop - marginBottom;
        const imgProps = pdf.getImageProperties(imgData);
        const imgAspectRatio = imgProps.height / imgProps.width;
        const pdfImageWidth = usableWidth;
        const pdfImageHeight = pdfImageWidth * imgAspectRatio;
        if (pdfImageHeight <= usableHeight) {
            const customPageHeight = pdfImageHeight + marginTop + marginBottom;
            const singlePagePdf = new window.jspdf.jsPDF({ orientation: 'portrait', unit: 'mm', format: [pdfWidth, customPageHeight] });
            singlePagePdf.addImage(imgData, 'JPEG', marginHorizontal, marginTop, pdfImageWidth, pdfImageHeight);
            singlePagePdf.save(filename);
        } else {
            let heightLeft = pdfImageHeight;
            let position = 0;
            pdf.addImage(imgData, 'JPEG', marginHorizontal, marginTop, pdfImageWidth, pdfImageHeight);
            heightLeft -= usableHeight;
            while (heightLeft > 0) {
                position -= usableHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'JPEG', marginHorizontal, position + marginTop, pdfImageWidth, pdfImageHeight);
                heightLeft -= usableHeight;
            }
            pdf.save(filename);
        }
    });
    
    loadSheetMusicFromLocalStorage();

    function clearChart() {
        localStorage.removeItem('sheetMusicData');
        loadSheetMusicFromLocalStorage(); // Esta función ya gestiona la creación de una partitura en blanco
    }

    function resetChart() {
        if (confirm('¿Estás seguro de que quieres reiniciar la partitura? Se borrará todo el contenido.')) {
            clearChart();
        }
    }

    document.getElementById('reset-chart-btn').addEventListener('click', resetChart);

    // --- LÓGICA DE TRANSPOSICIÓN ---
    const notesSharp = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
    const notesFlat = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

    const noteValues = {
        "C": 0, "B#": 0,
        "C#": 1, "Db": 1,
        "D": 2,
        "D#": 3, "Eb": 3,
        "E": 4, "Fb": 4,
        "F": 5, "E#": 5,
        "F#": 6, "Gb": 6,
        "G": 7,
        "G#": 8, "Ab": 8,
        "A": 9,
        "A#": 10, "Bb": 10,
        "B": 11, "Cb": 11
    };

    function transposeNote(note, semitones) {
        const value = noteValues[note];
        if (value === undefined) return note; // Devuelve la nota original si no se encuentra

        const transposedValue = (value + semitones + 12) % 12;
        
        // Preferir bemoles para ciertas tonalidades podría ser una mejora futura
        return notesSharp[transposedValue];
    }

    function transposeChord(chordName, semitones) {
        if (!chordName || chordName.trim() === '') return chordName;

        let root, quality, bass;
        const parts = chordName.split('/');
        const mainChord = parts[0];
        bass = parts.length > 1 ? parts[1] : null;

        const match = mainChord.match(/^([A-G](?:#|b)?)/);
        if (match) {
            root = match[1];
            quality = mainChord.substring(root.length);
        } else {
            return chordName; // No se pudo interpretar, devolver original
        }

        const newRoot = transposeNote(root, semitones);
        let newChord = newRoot + quality;

        if (bass) {
            const newBass = transposeNote(bass, semitones);
            newChord += '/' + newBass;
        }

        return newChord;
    }

    function transposeAllChords(semitones) {
        const measures = document.querySelectorAll('.measure');
        measures.forEach(measure => {
            const chords = measure.textContent.trim().split(/\s+/).filter(Boolean);
            const transposedChords = chords.map(chord => transposeChord(chord, semitones));
            measure.textContent = transposedChords.join(' ');
        });
        saveSheetMusicToLocalStorage(); // Guardar los cambios
    }

    document.getElementById('transpose-up-btn').addEventListener('click', () => transposeAllChords(1));
    document.getElementById('transpose-down-btn').addEventListener('click', () => transposeAllChords(-1));

    // --- LÓGICA DE GUARDADO/CARGA EN SERVIDOR ---
    const saveChartBtn = document.getElementById('save-chart-btn');
    
    // Load Modal Elements
    const openLoadChartModalBtn = document.getElementById('open-load-chart-modal-btn');
    const loadChartModal = document.getElementById('load-chart-modal');
    const loadChartModalCloseBtn = document.getElementById('load-chart-modal-close-btn');
    const chartListContainer = document.getElementById('chart-list-container');
    const chartSearchInput = document.getElementById('chart-search-input');

    // Save Modal Elements
    const saveChartModal = document.getElementById('save-chart-modal');
    const saveChartModalCloseBtn = document.getElementById('save-chart-modal-close-btn');
    const existingFolderSelect = document.getElementById('existing-folder-select');
    const newFolderInput = document.getElementById('new-folder-input');
    const confirmSaveBtn = document.getElementById('confirm-save-btn');

    const API_BASE_URL = 'http://localhost:3000/api';
    let allSheets = {}; // Cache for all loaded sheets

    // --- Load Modal Logic ---
    openLoadChartModalBtn.addEventListener('click', () => {
        loadChartModal.style.display = 'block';
        populateLoadModal();
    });
    loadChartModalCloseBtn.addEventListener('click', () => {
        loadChartModal.style.display = 'none';
    });
    chartSearchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const items = chartListContainer.querySelectorAll('.chart-list-item, h3');
        items.forEach(item => {
            const isFolder = item.tagName === 'H3';
            if (isFolder) {
                item.style.display = 'none';
            } else {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'flex';
                    let prev = item.previousElementSibling;
                    while(prev) {
                        if (prev.tagName === 'H3') {
                            prev.style.display = 'block';
                            break;
                        }
                        prev = prev.previousElementSibling;
                    }
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });

    async function populateLoadModal(showAlertOnError = true) {
        try {
            const response = await fetch(`${API_BASE_URL}/partituras`);
            if (!response.ok) throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
            allSheets = await response.json();
            
            chartListContainer.innerHTML = '';
            
            if (Object.keys(allSheets).length === 0) {
                chartListContainer.innerHTML = '<p>No hay partituras guardadas.</p>';
                return;
            }

            for (const folder in allSheets) {
                const groupTitle = document.createElement('h3');
                groupTitle.textContent = folder;
                chartListContainer.appendChild(groupTitle);

                allSheets[folder].forEach(sheetName => {
                    const item = document.createElement('div');
                    item.className = 'chart-list-item';
                    item.title = `Cargar: ${sheetName}`;
                    item.addEventListener('click', () => loadChartFromServer(folder, sheetName));

                    const nameSpan = document.createElement('span');
                    nameSpan.textContent = sheetName;
                    
                    const actionsDiv = document.createElement('div');
                    actionsDiv.className = 'actions';

                    const deleteBtn = document.createElement('button');
                    deleteBtn.textContent = 'Eliminar';
                    deleteBtn.className = 'btn-danger';
                    deleteBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        deleteChartFromServer(folder, sheetName);
                    });

                    actionsDiv.appendChild(deleteBtn);
                    item.appendChild(nameSpan);
                    item.appendChild(actionsDiv);
                    chartListContainer.appendChild(item);
                });
            }
        } catch (error) {
            console.error('Error al cargar partituras:', error);
            if (showAlertOnError) {
                alert('No se pudo conectar con el servidor para cargar la lista de partituras.');
            }
        }
    }

    async function loadChartFromServer(folder, name) {
        if (!folder || !name) {
            alert("La selección de la partitura no es válida.");
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/partituras/${folder}/${name}`);
            if (!response.ok) throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
            const chartData = await response.json();
            renderChart(chartData);
            saveSheetMusicToLocalStorage();
            loadChartModal.style.display = 'none';
        } catch (error) {
            console.error('Error al cargar la partitura:', error);
            alert(`No se pudo cargar la partitura: ${error.message}`);
        }
    }

    async function deleteChartFromServer(folder, name) {
        if (!folder || !name) {
            alert('La selección de la partitura no es válida.');
            return;
        }
        if (!confirm(`¿Estás seguro de que quieres eliminar la partitura "${name}" de la carpeta "${folder}"? Esta acción no se puede deshacer.`)) {
            return;
        }
        try {
            const response = await fetch(`${API_BASE_URL}/partituras/${folder}/${name}`, { method: 'DELETE' });
            if (!response.ok) throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
            const result = await response.json();
            alert(result.message);
            await populateLoadModal();
        } catch (error) {
            console.error('Error al eliminar la partitura:', error);
            alert(`No se pudo eliminar la partitura: ${error.message}`);
        }
    }

    // --- Save Modal Logic ---
    saveChartBtn.addEventListener('click', () => {
        const title = document.getElementById('song-title').textContent.trim();
        if (!title || title === 'Nombre de la Canción') {
            alert('Por favor, ponle un nombre a la canción antes de guardarla.');
            return;
        }
        
        // Populate existing folders
        existingFolderSelect.innerHTML = '<option value="">Seleccionar carpeta...</option>';
        const folders = Object.keys(allSheets);
        folders.forEach(folder => {
            const option = document.createElement('option');
            option.value = folder;
            option.textContent = folder;
            existingFolderSelect.appendChild(option);
        });
        newFolderInput.value = '';
        saveChartModal.style.display = 'block';
    });

    saveChartModalCloseBtn.addEventListener('click', () => {
        saveChartModal.style.display = 'none';
    });

    confirmSaveBtn.addEventListener('click', async () => {
        const chartData = serializeChart();
        const title = chartData.songTitle.trim();
        
        let folder = newFolderInput.value.trim();
        if (!folder) {
            folder = existingFolderSelect.value;
        }

        if (!folder) {
            alert('Por favor, selecciona una carpeta existente o crea una nueva.');
            return;
        }

        const fileName = title.replace(/[^a-z0-9\s_.-]/gi, '_');
        const folderName = folder.replace(/[^a-z0-9\s_.-]/gi, '_');

        try {
            const response = await fetch(`${API_BASE_URL}/partituras/${folderName}/${fileName}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(chartData)
            });

            if (!response.ok) throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);

            const result = await response.json();
            alert(result.message);
            saveChartModal.style.display = 'none';
            await populateLoadModal(false); // Update cache and list silently
        } catch (error) {
            console.error('Error al guardar la partitura:', error);
            alert(`No se pudo guardar la partitura: ${error.message}`);
        }
    });

    // --- General Modal Logic ---
    window.addEventListener('click', (event) => {
        if (event.target === loadChartModal) {
            loadChartModal.style.display = 'none';
        }
        if (event.target === saveChartModal) {
            saveChartModal.style.display = 'none';
        }
    });

    // Initial load
    populateLoadModal(false);

    // --- EVENT LISTENERS PARA AUDIO Y METRÓNOMO ---
    Tone.loaded().then(() => {
        console.log("Piano sampler y metrónomo listos.");

        // Iniciar el AudioContext con la primera interacción del usuario
        document.documentElement.addEventListener('click', () => {
            if (Tone.context.state !== 'running') {
                Tone.start();
                console.log("AudioContext iniciado.");
            }
        }, { once: true });

        // --- Lógica de Selección (Click y Arrastre) ---
        chartContainer.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('measure')) {
                isSelecting = true;
                selectionStartMeasure = e.target;
                document.querySelectorAll('.selected-measure').forEach(m => m.classList.remove('selected-measure'));
                selectionStartMeasure.classList.add('selected-measure');
            }
        });

        chartContainer.addEventListener('mouseover', (e) => {
            if (isSelecting && e.target.classList.contains('measure')) {
                const allMeasures = Array.from(document.querySelectorAll('.measure'));
                const startIndex = allMeasures.indexOf(selectionStartMeasure);
                const currentIndex = allMeasures.indexOf(e.target);
                const minIndex = Math.min(startIndex, currentIndex);
                const maxIndex = Math.max(startIndex, currentIndex);
                allMeasures.forEach((measure, index) => {
                    if (index >= minIndex && index <= maxIndex) {
                        measure.classList.add('selected-measure');
                    } else {
                        measure.classList.remove('selected-measure');
                    }
                });
            }
        });

        window.addEventListener('mouseup', () => {
            isSelecting = false;
        });

        // --- Controles del Metrónomo ---
        const bpmSlider = document.getElementById('metronome-bpm-slider');
        const bpmInput = document.getElementById('metronome-bpm-input');
        const volumeSlider = document.getElementById('metronome-volume-slider');
        
        bpmSlider.addEventListener('input', (e) => {
            const bpm = e.target.value;
            Tone.Transport.bpm.value = bpm;
            bpmInput.value = bpm;
        });

        bpmInput.addEventListener('input', (e) => {
            const bpm = e.target.value;
            Tone.Transport.bpm.value = bpm;
            bpmSlider.value = bpm;
        });

        volumeSlider.addEventListener('input', (e) => {
            const sliderValue = parseFloat(e.target.value);
            const minDb = parseFloat(e.target.min);
            const maxDb = parseFloat(e.target.max);

            // Normalizar el valor del slider a un rango de 0 a 1
            const normalizedValue = (sliderValue - minDb) / (maxDb - minDb);

            // Aplicar una curva de potencia (0.5 para una mayor sensibilidad en volúmenes bajos)
            const curvedNormalizedValue = Math.pow(normalizedValue, 0.5);

            // Escalar de nuevo al rango de decibelios
            const newDbValue = minDb + (maxDb - minDb) * curvedNormalizedValue;

            console.log("Slider value:", sliderValue, "Normalized:", normalizedValue, "Curved Normalized:", curvedNormalizedValue, "New dB value:", newDbValue);
            metronomeVolume.volume.value = newDbValue;
        });

        // --- Acordes y Progresión ---
        chartContainer.addEventListener('keydown', function(event) {
            if (event.target.classList.contains('measure')) {
                if (event.key === 'Enter' || event.key === 'Tab' || event.key === ' ') {
                    const fullMeasureText = event.target.textContent.trim();
                    const chordsInMeasure = fullMeasureText.split(/\s+/).filter(Boolean);
                    const lastChord = chordsInMeasure[chordsInMeasure.length - 1];

                    if (lastChord) {
                        playChord(lastChord);
                    }

                    if (event.key === 'Enter') { // Prevent default for Enter only
                        event.preventDefault();
                        event.target.blur(); // Blur only on Enter
                    }
                }
            }
        });

        const playProgressionBtn = document.getElementById('play-progression-btn');
        const loopCheckbox = document.getElementById('loop-progression-checkbox');

        playProgressionBtn.addEventListener('click', async function() {
            const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"><path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/></svg>`;
            const stopIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop-fill" viewBox="0 0 16 16"><path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/></svg>`;

            if (Tone.Transport.state === 'started') {
                Tone.Transport.stop();
                if (progressionSequence) {
                    progressionSequence.dispose();
                }
                metronomeLoop.stop();
                playProgressionBtn.innerHTML = playIcon;
                playProgressionBtn.classList.remove('playing');
            } else {
                const selectedMeasures = document.querySelectorAll('.selected-measure');
                let measuresToPlay = selectedMeasures.length > 0 ? Array.from(selectedMeasures) : Array.from(document.querySelectorAll('.measure'));
                
                const playbackEvents = [];
                measuresToPlay.forEach((measure, measureIndex) => {
                    const chords = measure.textContent.trim().split(/\s+/).filter(Boolean);
                    if (chords.length === 1 && chords[0]) {
                        playbackEvents.push([`${measureIndex}:0`, { chord: chords[0], duration: '1n' }]);
                    } else if (chords.length > 1) {
                        const duration = `${chords.length}n`;
                        chords.forEach((chord, i) => {
                             playbackEvents.push([`${measureIndex}:${i * (4 / chords.length)}`, { chord: chord, duration: duration }]);
                        });
                    }
                });

                if (playbackEvents.length === 0) return;
                
                // Asegurarse de que los samplers estén cargados antes de empezar
                await sampler.loaded;
                await metronomePlayer.loaded;

                if (progressionSequence) { progressionSequence.dispose(); }

                progressionSequence = new Tone.Part((time, value) => {
                    playChord(value.chord);
                }, playbackEvents);

                const lastEvent = playbackEvents[playbackEvents.length - 1];
                const lastMeasure = parseInt(lastEvent[0].split(':')[0]) + 1;
                progressionSequence.loopEnd = `${lastMeasure}m`;
                progressionSequence.loop = loopCheckbox.checked;

                metronomeLoop.start(0);
                progressionSequence.start(0);
                Tone.Transport.start();
                playProgressionBtn.innerHTML = stopIcon;
                playProgressionBtn.classList.add('playing');
            }
        });
    });
});