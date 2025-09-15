document.addEventListener('DOMContentLoaded', () => {
    const chartContainer = document.getElementById('chart-container');
    const fontSizeSelector = document.getElementById('font-size-selector');
    let focusedMeasure = null;
    let focusedSectionTitle = null;
    let progressionSequence; // Referencia para la secuencia de acordes

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

    const spanishToEnglishMap = {
        'do': 'C', 're': 'D', 'mi': 'E', 'fa': 'F', 'sol': 'G', 'la': 'A', 'si': 'B',
        'do#': 'C#', 'reb': 'Db',
        're#': 'D#', 'mib': 'Eb',
        'fa#': 'F#', 'solb': 'Gb',
        'sol#': 'G#', 'lab': 'Ab',
        'la#': 'A#', 'sib': 'Bb'
    };
    const sortedSpanishNotes = Object.keys(spanishToEnglishMap).sort((a, b) => b.length - a.length);

    const chordMappings = {
        'C': ['C4', 'E4', 'G4'], 'C#': ['C#4', 'F4', 'G#4'], 'Db': ['Db4', 'F4', 'Ab4'], 'D': ['D4', 'F#4', 'A4'], 'D#': ['D#4', 'G4', 'A#4'], 'Eb': ['Eb4', 'G4', 'Bb4'], 'E': ['E4', 'G#4', 'B4'], 'F': ['F4', 'A4', 'C5'], 'F#': ['F#4', 'A#4', 'C#5'], 'Gb': ['Gb4', 'Bb4', 'Db5'], 'G': ['G4', 'B4', 'D5'], 'G#': ['G#4', 'C5', 'D#5'], 'Ab': ['Ab4', 'C5', 'Eb5'], 'A': ['A4', 'C#5', 'E5'], 'A#': ['A#4', 'D5', 'F5'], 'Bb': ['Bb4', 'D5', 'F5'], 'B': ['B4', 'D#5', 'F#5'],
        'Cm': ['C4', 'Eb4', 'G4'], 'C#m': ['C#4', 'E4', 'G#4'], 'Dbm': ['Db4', 'E4', 'Ab4'], 'Dm': ['D4', 'F4', 'A4'], 'D#m': ['D#4', 'F#4', 'A#4'], 'Ebm': ['Eb4', 'Gb4', 'Bb4'], 'Em': ['E4', 'G4', 'B4'], 'Fm': ['F4', 'Ab4', 'C5'], 'F#m': ['F#4', 'A4', 'C#5'], 'Gbm': ['Gb4', 'A4', 'Db5'], 'Gm': ['G4', 'Bb4', 'D5'], 'G#m': ['G#4', 'B4', 'D#5'], 'Abm': ['Ab4', 'B4', 'Eb5'], 'Am': ['A4', 'C5', 'E5'], 'A#m': ['A#4', 'C#5', 'F5'], 'Bbm': ['Bb4', 'Db5', 'F5'], 'Bm': ['B4', 'D5', 'F#5'],
        'C7': ['C4', 'E4', 'G4', 'Bb4'], 'C#7': ['C#4', 'F4', 'G#4', 'B4'], 'Db7': ['Db4', 'F4', 'Ab4', 'B4'], 'D7': ['D4', 'F#4', 'A4', 'C5'], 'D#7': ['D#4', 'G4', 'A#4', 'C#5'], 'Eb7': ['Eb4', 'G4', 'Bb4', 'Db5'], 'E7': ['E4', 'G#4', 'B4', 'D5'], 'F7': ['F4', 'A4', 'C5', 'Eb5'], 'F#7': ['F#4', 'A#4', 'C#5', 'E5'], 'Gb7': ['Gb4', 'Bb4', 'Db5', 'Fb5'], 'G7': ['G4', 'B4', 'D5', 'F5'], 'G#7': ['G#4', 'C5', 'D#5', 'F#5'], 'Ab7': ['Ab4', 'C5', 'Eb5', 'Gb5'], 'A7': ['A4', 'C#5', 'E5', 'G5'], 'A#7': ['A#4', 'D5', 'F5', 'G#5'], 'Bb7': ['Bb4', 'D5', 'F5', 'Ab5'], 'B7': ['B4', 'D#5', 'F#5', 'A5'],
        'Cm7': ['C4', 'Eb4', 'G4', 'Bb4'], 'C#m7': ['C#4', 'E4', 'G#4', 'B4'], 'Dbm7': ['Db4', 'E4', 'Ab4', 'B4'], 'Dm7': ['D4', 'F4', 'A4', 'C5'], 'D#m7': ['D#4', 'F#4', 'A#4', 'C#5'], 'Ebm7': ['Eb4', 'Gb4', 'Bb4', 'Db5'], 'Em7': ['E4', 'G4', 'B4', 'D5'], 'Fm7': ['F4', 'Ab4', 'C5', 'Eb5'], 'F#m7': ['F#4', 'A4', 'C#5', 'E5'], 'Gbm7': ['Gb4', 'A4', 'Db5', 'Fb5'], 'Gm7': ['G4', 'Bb4', 'D5', 'F5'], 'G#m7': ['G#4', 'B4', 'D#5', 'F#5'], 'Abm7': ['Ab4', 'B4', 'Eb5', 'Gb5'], 'Am7': ['A4', 'C5', 'E5', 'G5'], 'A#m7': ['A#4', 'C#5', 'F5', 'G#5'], 'Bbm7': ['Bb4', 'Db5', 'F5', 'Ab5'], 'Bm7': ['B4', 'D5', 'F#5', 'A5'],
        'Cmaj7': ['C4', 'E4', 'G4', 'B4'], 'C#maj7': ['C#4', 'F4', 'G#4', 'C5'], 'Dbmaj7': ['Db4', 'F4', 'Ab4', 'C5'], 'Dmaj7': ['D4', 'F#4', 'A4', 'C#5'], 'D#maj7': ['D#4', 'G4', 'A#4', 'D5'], 'Ebmaj7': ['Eb4', 'G4', 'Bb4', 'D5'], 'Emaj7': ['E4', 'G#4', 'B4', 'D#5'], 'Fmaj7': ['F4', 'A4', 'C5', 'E5'], 'F#maj7': ['F#4', 'A#4', 'C#5', 'F5'], 'Gbmaj7': ['Gb4', 'Bb4', 'Db5', 'F5'], 'Gmaj7': ['G4', 'B4', 'D5', 'F#5'], 'G#maj7': ['G#4', 'C5', 'D#5', 'G5'], 'Abmaj7': ['Ab4', 'C5', 'Eb5', 'G5'], 'Amaj7': ['A4', 'C#5', 'E5', 'G#5'], 'A#maj7': ['A#4', 'D5', 'F5', 'A5'], 'Bbmaj7': ['Bb4', 'D5', 'F5', 'A5'], 'Bmaj7': ['B4', 'D#5', 'F#5', 'A#5'],
    };

    function translateChord(spanishChord) {
        const lowerChord = spanishChord.toLowerCase().trim();
        for (const spanishNote of sortedSpanishNotes) {
            if (lowerChord.startsWith(spanishNote)) {
                const englishNote = spanishToEnglishMap[spanishNote];
                const suffix = spanishChord.substring(spanishNote.length);
                return englishNote + suffix;
            }
        }
        return spanishChord;
    }

    function playChord(chordName) {
        if (Tone.context.state !== 'running') { Tone.start(); }
        const englishChord = translateChord(chordName);
        const notes = chordMappings[englishChord.trim()];
        if (notes) { 
            sampler.triggerAttackRelease(notes, '1n'); 
        } else {
            console.warn(`Acorde no encontrado: ${chordName} (traducido a ${englishChord})`);
        }
    }

    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const dragHandle = element.querySelector('.comment-drag-handle');
        if (dragHandle) { dragHandle.onmousedown = dragMouseDown; } else { element.onmousedown = dragMouseDown; }
        function dragMouseDown(e) { e = e || window.event; e.preventDefault(); pos3 = e.clientX; pos4 = e.clientY; document.onmouseup = closeDragElement; document.onmousemove = elementDrag; }
        function elementDrag(e) { e = e || window.event; e.preventDefault(); pos1 = pos3 - e.clientX; pos2 = pos4 - e.clientY; pos3 = e.clientX; pos4 = e.clientY; element.style.top = (element.offsetTop - pos2) + "px"; element.style.left = (element.offsetLeft - pos1) + "px"; }
        function closeDragElement() { document.onmouseup = null; document.onmousemove = null; saveSheetMusic(); }
    }

    function saveSheetMusic() {
        const data = { songTitle: document.getElementById('song-title').textContent, sections: [], comments: [] };
        document.querySelectorAll('.song-section').forEach(sectionDiv => {
            const section = { title: sectionDiv.querySelector('h2').textContent, rows: [] };
            sectionDiv.querySelectorAll('.measure-row').forEach(rowDiv => {
                const row = { measures: [] };
                rowDiv.querySelectorAll('.measure').forEach(measureDiv => { row.measures.push({ content: measureDiv.textContent, isPlaceholder: measureDiv.classList.contains('measure-placeholder') }); });
                section.rows.push(row);
            });
            data.sections.push(section);
        });
        document.querySelectorAll('.comment-box').forEach(commentBox => { data.comments.push({ content: commentBox.querySelector('.comment-content').textContent, top: commentBox.style.top, left: commentBox.style.left }); });
        localStorage.setItem('sheetMusicData', JSON.stringify(data));
    }

    function loadSheetMusic() {
        const savedData = localStorage.getItem('sheetMusicData');
        if (savedData) {
            const data = JSON.parse(savedData);
            if (data.sections.length > 0 && data.sections[0].measures) {
                data.sections.forEach(section => {
                    section.rows = [];
                    let currentRow = { measures: [] };
                    section.measures.forEach((measure, index) => {
                        if (index > 0 && index % 4 === 0) { section.rows.push(currentRow); currentRow = { measures: [] }; }
                        currentRow.measures.push(measure);
                    });
                    section.rows.push(currentRow);
                    delete section.measures;
                });
            }
            chartContainer.innerHTML = '';
            document.querySelectorAll('.comment-box').forEach(comment => comment.remove());
            const songTitleElement = document.createElement('h1');
            songTitleElement.id = 'song-title';
            songTitleElement.contentEditable = 'true';
            songTitleElement.textContent = data.songTitle;
            chartContainer.appendChild(songTitleElement);
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
                            measureDiv.className = measureData.isPlaceholder ? 'measure measure-placeholder' : 'measure';
                            measureDiv.contentEditable = 'true';
                            measureDiv.textContent = measureData.content;
                            newRow.appendChild(measureDiv);
                        });
                        newSection.appendChild(newRow);
                    });
                }
                chartContainer.appendChild(newSection);
            });
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
                    contentArea.addEventListener('blur', saveSheetMusic);
                });
            }
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
            saveSheetMusic();
        }
    });

    fontSizeSelector.addEventListener('change', (e) => { chartContainer.style.fontSize = e.target.value; saveSheetMusic(); });

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

    document.getElementById('add-start-repeat-btn').addEventListener('click', () => { if (focusedMeasure) focusedMeasure.classList.toggle('repeat-start'); else alert('Hacé clic en un compás primero.'); saveSheetMusic(); });
    document.getElementById('add-end-repeat-btn').addEventListener('click', () => { if (focusedMeasure) focusedMeasure.classList.toggle('repeat-end'); else alert('Hacé clic en un compás primero.'); saveSheetMusic(); });
    document.getElementById('delete-measure-btn').addEventListener('click', () => {
        if (!focusedMeasure) { alert('Hacé clic en el compás que querés eliminar.'); return; }
        const row = focusedMeasure.closest('.measure-row');
        if (row && row.children.length > 1) { focusedMeasure.remove(); const numMeasures = row.children.length; row.style.gridTemplateColumns = `repeat(${numMeasures}, 1fr)`; saveSheetMusic(); } else { alert('No se puede eliminar el último compás de una fila.'); }
    });
    document.getElementById('clear-measure-btn').addEventListener('click', () => { if (focusedMeasure) { focusedMeasure.textContent = ''; focusedMeasure.classList.remove('repeat-start', 'repeat-end', 'double-bar'); } });
    document.getElementById('add-measure-btn').addEventListener('click', () => {
        if (!focusedMeasure) { alert('Hacé clic en un compás para agregar otro a su lado.'); return; }
        const row = focusedMeasure.closest('.measure-row');
        if (row) { const newMeasure = document.createElement('div'); newMeasure.className = 'measure'; newMeasure.contentEditable = 'true'; row.insertBefore(newMeasure, focusedMeasure.nextSibling); const numMeasures = row.children.length; row.style.gridTemplateColumns = `repeat(${numMeasures}, 1fr)`; saveSheetMusic(); }
    });

    document.getElementById('add-row-btn').addEventListener('click', () => {
        let currentSection;
        if (focusedMeasure) { currentSection = focusedMeasure.closest('.song-section'); } else if (focusedSectionTitle) { currentSection = focusedSectionTitle.closest('.song-section'); } else { const sections = chartContainer.querySelectorAll('.song-section'); if (sections.length > 0) { currentSection = sections[sections.length - 1]; } }
        if (currentSection) { const newRow = document.createElement('div'); newRow.className = 'measure-row'; insertMeasures(newRow, 4); currentSection.appendChild(newRow); saveSheetMusic(); } else { alert('No se encontró una sección para agregar la fila.'); }
    });

    document.getElementById('delete-row-btn').addEventListener('click', () => {
        if (!focusedMeasure) { alert('Hacé clic en un compás de la fila que querés eliminar.'); return; }
        const row = focusedMeasure.closest('.measure-row');
        if (row) { if (confirm('¿Estás seguro de que querés eliminar esta fila completa?')) { row.remove(); saveSheetMusic(); } }
    });

    document.getElementById('add-section-btn').addEventListener('click', () => {
        const sectionCount = chartContainer.getElementsByClassName('song-section').length + 1;
        const newSection = document.createElement('div'); newSection.className = 'song-section';
        const newTitle = document.createElement('h2'); newTitle.contentEditable = 'true'; newTitle.textContent = `Sección ${sectionCount}`;
        newSection.appendChild(newTitle);
        const newRow = document.createElement('div'); newRow.className = 'measure-row'; insertMeasures(newRow, 4); newSection.appendChild(newRow);
        chartContainer.appendChild(newSection); saveSheetMusic();
    });

    document.getElementById('delete-section-btn').addEventListener('click', () => {
        if (!focusedMeasure && !focusedSectionTitle) { alert('Hacé clic en un compás o título de la sección que querés eliminar.'); return; }
        let section;
        if(focusedMeasure) { section = focusedMeasure.closest('.song-section'); } else { section = focusedSectionTitle.closest('.song-section'); }
        if (section) { if (chartContainer.getElementsByClassName('song-section').length > 1) { if (confirm('¿Estás seguro de que querés eliminar esta sección completa?')) { section.remove(); focusedMeasure = null; focusedSectionTitle = null; saveSheetMusic(); } } else { alert('No se puede eliminar la única sección.'); } }
    });

    document.getElementById('add-comment-btn').addEventListener('click', () => {
        const commentBox = document.createElement('div'); commentBox.className = 'comment-box';
        const dragHandle = document.createElement('div'); dragHandle.className = 'comment-drag-handle';
        const contentArea = document.createElement('div'); contentArea.className = 'comment-content'; contentArea.contentEditable = 'true'; contentArea.textContent = 'Escribí acá...';
        commentBox.appendChild(dragHandle); commentBox.appendChild(contentArea);
        commentBox.style.top = `${window.innerHeight / 2 - 50}px`; commentBox.style.left = `${window.innerWidth / 2 - 75}px`;
        chartContainer.appendChild(commentBox); makeDraggable(commentBox); saveSheetMusic(); contentArea.addEventListener('blur', saveSheetMusic);
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
    
    loadSheetMusic();

    function resetChart() {
        if (confirm('¿Estás seguro de que quieres reiniciar la partitura? Se borrará todo el contenido.')) {
            localStorage.removeItem('sheetMusicData');
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
            document.querySelectorAll('.comment-box').forEach(comment => comment.remove());
        }
    }

    document.getElementById('reset-chart-btn').addEventListener('click', resetChart);

    // --- EVENT LISTENERS PARA AUDIO Y METRÓNOMO ---
    Tone.loaded().then(() => {
        console.log("Piano sampler y metrónomo listos.");

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
            metronomeVolume.volume.value = e.target.value;
        });

        // --- Acordes y Progresión ---
        chartContainer.addEventListener('keydown', function(event) {
            if (event.target.classList.contains('measure')) {
                if (event.key === 'Enter' || event.key === 'Tab') {
                    const chordName = event.target.textContent;
                    playChord(chordName);

                    if (event.key === 'Enter') {
                        event.preventDefault();
                        event.target.blur();
                    }
                }
            }
        });

        const playProgressionBtn = document.getElementById('play-progression-btn');
        playProgressionBtn.addEventListener('click', function() {
            if (Tone.Transport.state === 'started') {
                Tone.Transport.stop();
                if (progressionSequence) {
                    progressionSequence.dispose();
                }
                metronomeLoop.stop();
                playProgressionBtn.textContent = 'Reproducir Progresión';
            } else {
                const measures = document.querySelectorAll('.measure');
                const chords = Array.from(measures).map(measure => measure.textContent.trim()).filter(Boolean);
                if (chords.length === 0) return;
                if (Tone.context.state !== 'running') { Tone.start(); }

                if (progressionSequence) {
                    progressionSequence.dispose();
                }

                progressionSequence = new Tone.Sequence((time, chord) => {
                    const englishChord = translateChord(chord);
                    const notes = chordMappings[englishChord];
                    if (notes) { sampler.triggerAttackRelease(notes, '1n', time); }
                }, chords, '1m');

                progressionSequence.loop = false;
                metronomeLoop.start(0);
                progressionSequence.start(0);
                Tone.Transport.start();
                playProgressionBtn.textContent = 'Detener Progresión';
            }
        });
    });
});
