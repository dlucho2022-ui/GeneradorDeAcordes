
document.addEventListener('DOMContentLoaded', () => {
    const chartContainer = document.getElementById('chart-container');
    const fontSizeSelector = document.getElementById('font-size-selector');
    let focusedMeasure = null;
    let focusedSectionTitle = null;

    // --- LÓGICA PARA ARRASTRAR ELEMENTOS ---
    function makeDraggable(element) {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        const dragHandle = element.querySelector('.comment-drag-handle');
        
        if (dragHandle) {
            dragHandle.onmousedown = dragMouseDown;
        } else {
            element.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            element.style.top = (element.offsetTop - pos2) + "px";
            element.style.left = (element.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null;
            saveSheetMusic(); // Save after drag ends
        }
    }

    // --- PERSISTENCIA DE DATOS ---
    function saveSheetMusic() {
        console.log('saveSheetMusic() called.');
        const data = {
            songTitle: document.getElementById('song-title').textContent,
            sections: [],
            comments: [] // Add comments array
        };

        document.querySelectorAll('.song-section').forEach(sectionDiv => {
            const section = {
                title: sectionDiv.querySelector('h2').textContent,
                measures: []
            };
            sectionDiv.querySelectorAll('.measures-grid > div').forEach(measureDiv => {
                section.measures.push({
                    content: measureDiv.textContent,
                    isPlaceholder: measureDiv.classList.contains('measure-placeholder')
                });
            });
            data.sections.push(section);
        });

        // Save comments
        document.querySelectorAll('.comment-box').forEach(commentBox => {
            data.comments.push({
                content: commentBox.querySelector('.comment-content').textContent,
                top: commentBox.style.top,
                left: commentBox.style.left
            });
        });

        localStorage.setItem('sheetMusicData', JSON.stringify(data));
        console.log('Partitura guardada automáticamente:', data);
    }

    function loadSheetMusic() {
        console.log('loadSheetMusic() called.');
        console.log('Intentando cargar partitura...');
        const savedData = localStorage.getItem('sheetMusicData');
        if (savedData) {
            console.log('Datos guardados encontrados:', savedData);
            const data = JSON.parse(savedData);
            console.log('Datos parseados:', data);

            // Clear ALL existing content in chartContainer and remove all comments
            chartContainer.innerHTML = '';
            document.querySelectorAll('.comment-box').forEach(comment => comment.remove()); // Remove existing comments
            console.log('Contenido de chartContainer y comentarios limpiados.');

            // Rebuild song title
            const songTitleElement = document.createElement('h1');
            songTitleElement.id = 'song-title';
            songTitleElement.contentEditable = 'true';
            songTitleElement.textContent = data.songTitle;
            chartContainer.appendChild(songTitleElement);
            console.log('Título de canción reconstruido.');

            // Rebuild sections
            data.sections.forEach(sectionData => {
                const newSection = document.createElement('div');
                newSection.className = 'song-section';

                const newTitle = document.createElement('h2');
                newTitle.contentEditable = 'true';
                newTitle.textContent = sectionData.title;
                
                const newGrid = document.createElement('div');
                newGrid.className = 'measures-grid';

                newSection.appendChild(newTitle);
                newSection.appendChild(newGrid);
                chartContainer.appendChild(newSection);
                console.log(`Sección "${sectionData.title}" reconstruida.`);

                sectionData.measures.forEach(measureData => {
                    const measureDiv = document.createElement('div');
                    measureDiv.className = measureData.isPlaceholder ? 'measure measure-placeholder' : 'measure';
                    measureDiv.contentEditable = 'true';
                    measureDiv.textContent = measureData.content;
                    newGrid.appendChild(measureDiv);
                });
                console.log(`Medidas para "${sectionData.title}" reconstruidas.`);
            });

            // Rebuild comments
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

                    // Add blur listener directly to comment content
                    contentArea.addEventListener('blur', saveSheetMusic);
                });
                console.log('Comentarios reconstruidos.');
            }

            console.log('Partitura cargada automáticamente.');
        } else {
            console.log('No se encontraron datos guardados. Usando estructura por defecto.');
            // If no saved data, ensure the default structure is present
            if (chartContainer.children.length === 0 || (chartContainer.children.length === 1 && chartContainer.querySelector('#song-title'))) {
                // Only if completely empty or only song title is present
                chartContainer.innerHTML = `
                    <h1 id="song-title" contenteditable="true">Nombre de la Canción</h1>
                    <div class="song-section">
                        <h2 contenteditable="true">Intro</h2>
                        <div class="measures-grid">
                            <div class="measure" contenteditable="true"></div>
                            <div class="measure" contenteditable="true"></div>
                            <div class="measure" contenteditable="true"></div>
                            <div class="measure" contenteditable="true"></div>
                        </div>
                    </div>
                `;
                console.log('Estructura por defecto inicializada.');
            }
        }
    }

    // --- MANEJO DE FOCO ---
    chartContainer.addEventListener('focusin', (event) => {
        if (event.target.classList.contains('measure')) {
            focusedMeasure = event.target;
            focusedSectionTitle = null; // Clear section title focus
        } else if (event.target.tagName === 'H2' && event.target.closest('.song-section')) {
            focusedSectionTitle = event.target;
            focusedMeasure = null; // Clear measure focus
        } else {
            focusedMeasure = null;
            focusedSectionTitle = null;
        }
        console.log('Foco cambiado. focusedMeasure:', focusedMeasure, 'focusedSectionTitle:', focusedSectionTitle);
    });

    // --- GUARDADO AUTOMÁTICO AL ESCRIBIR ---
    chartContainer.addEventListener('input', (event) => {
        console.log('Input event detected on:', event.target);
        if (event.target.classList.contains('measure') || 
            event.target.id === 'song-title' || 
            (event.target.tagName === 'H2' && event.target.closest('.song-section'))) {
            console.log('Input event on comment-content detected.');
            saveSheetMusic();
        }
    });

    // --- MANEJO DE CONTROLES ---

    // Selector de tamaño de fuente (Zoom)
    fontSizeSelector.addEventListener('change', (e) => {
        chartContainer.style.fontSize = e.target.value;
        saveSheetMusic(); // Save on zoom change
    });

    // --- CONTROLES DE FUENTE Y ALTURA DE COMPÁS ---
    const measureFontSizeSlider = document.getElementById('measure-font-size-slider');
    const measureHeightSlider = document.getElementById('measure-height-slider');

    function applyMeasureStyles(fontSize, minHeight) {
        document.documentElement.style.setProperty('--measure-font-size', `${fontSize}em`);
        document.documentElement.style.setProperty('--measure-min-height', `${minHeight}px`);
    }

    function saveMeasureSettings() {
        localStorage.setItem('measureFontSize', measureFontSizeSlider.value);
        localStorage.setItem('measureMinHeight', measureHeightSlider.value);
    }

    function loadMeasureSettings() {
        const savedFontSize = localStorage.getItem('measureFontSize');
        const savedMinHeight = localStorage.getItem('measureMinHeight');

        if (savedFontSize) {
            measureFontSizeSlider.value = savedFontSize;
        }
        if (savedMinHeight) {
            measureHeightSlider.value = savedMinHeight;
        }
        // Apply settings on load
        applyMeasureStyles(measureFontSizeSlider.value, measureHeightSlider.value);
    }

    // Event Listeners for sliders
    measureFontSizeSlider.addEventListener('input', () => {
        applyMeasureStyles(measureFontSizeSlider.value, measureHeightSlider.value);
        saveMeasureSettings();
    });

    measureHeightSlider.addEventListener('input', () => {
        applyMeasureStyles(measureFontSizeSlider.value, measureHeightSlider.value);
        saveMeasureSettings();
    });

    // Load settings on initial page load
    loadMeasureSettings();

    // Helper function to insert 4 measures
    function insertMeasures(grid, referenceElement = null) {
        for (let i = 0; i < 4; i++) {
            const measure = document.createElement('div');
            measure.className = 'measure';
            measure.contentEditable = 'true';
            measure.textContent = ''; // Ensure new measures are empty

            if (referenceElement) {
                grid.insertBefore(measure, referenceElement);
            } else {
                grid.appendChild(measure);
            }
        }
    }

    // Controles de compás
    document.getElementById('add-start-repeat-btn').addEventListener('click', () => {
        if (focusedMeasure && focusedMeasure.classList.contains('measure')) focusedMeasure.classList.toggle('repeat-start');
        else alert('Hacé clic en un compás primero.');
        saveSheetMusic(); // Save after repeat change
    });

    document.getElementById('add-end-repeat-btn').addEventListener('click', () => {
        if (focusedMeasure && focusedMeasure.classList.contains('measure')) focusedMeasure.classList.toggle('repeat-end');
        else alert('Hacé clic en un compás primero.');
        saveSheetMusic(); // Save after repeat change
    });

    document.getElementById('delete-measure-btn').addEventListener('click', () => {
        if (!focusedMeasure) {
            alert('Hacé clic en el compás que querés eliminar.');
            return;
        }
        if (confirm('¿Estás seguro de que querés eliminar este compás? Esto dejará un espacio vacío en la grilla.')) {
            const placeholder = document.createElement('div');
            placeholder.className = 'measure measure-placeholder';
            focusedMeasure.parentNode.replaceChild(placeholder, focusedMeasure);
            focusedMeasure = null;
            saveSheetMusic(); // Save after deleting measure
        }
    });

    document.getElementById('clear-measure-btn').addEventListener('click', () => {
        if (focusedMeasure && focusedMeasure.classList.contains('measure')) {
            focusedMeasure.textContent = '';
            focusedMeasure.classList.remove('repeat-start', 'repeat-end', 'double-bar');
        }
    });

    // Controles de estructura
    document.getElementById('add-row-btn').addEventListener('click', () => {
        if (focusedMeasure) {
            const grid = focusedMeasure.closest('.measures-grid');
            if (!grid) {
                alert('El compás seleccionado no está dentro de una grilla de medidas.');
                return;
            }

            const measures = Array.from(grid.children);
            const focusedIndex = measures.indexOf(focusedMeasure);
            const insertionStartIndex = Math.floor(focusedIndex / 4) * 4 + 4;

            let referenceElement = null;
            if (insertionStartIndex < measures.length) {
                referenceElement = measures[insertionStartIndex];
            }
            insertMeasures(grid, referenceElement); // Use helper
        } else if (focusedSectionTitle) {
            const grid = focusedSectionTitle.nextElementSibling;
            if (grid && grid.classList.contains('measures-grid')) {
                insertMeasures(grid, grid.firstChild); // Insert at beginning
            } else {
                alert('No se encontró la grilla de compases para esta sección.');
            }
        } else {
            alert('Hacé clic en un compás o en el título de una sección para indicar dónde querés agregar la fila.');
        }
        saveSheetMusic();
    });

    chartContainer.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent default Enter behavior (new line)

            const activeElement = document.activeElement;

            if (activeElement && activeElement.classList.contains('measure')) {
                const grid = activeElement.closest('.measures-grid');
                if (grid) {
                    const measures = Array.from(grid.children);
                    const focusedIndex = measures.indexOf(activeElement);
                    const insertionStartIndex = Math.floor(focusedIndex / 4) * 4 + 4; // After current row

                    let referenceElement = null;
                    if (insertionStartIndex < measures.length) {
                        referenceElement = measures[insertionStartIndex];
                    }
                    insertMeasures(grid, referenceElement);
                    saveSheetMusic();
                    // Optional: move focus to the first new measure
                    if (referenceElement) {
                        referenceElement.previousElementSibling.focus();
                    } else {
                        grid.lastElementChild.focus();
                    }
                }
            } else if (activeElement && activeElement.tagName === 'H2' && activeElement.closest('.song-section')) {
                const grid = activeElement.nextElementSibling;
                if (grid && grid.classList.contains('measures-grid')) {
                    insertMeasures(grid); // Append to end of section
                    saveSheetMusic();
                    grid.lastElementChild.focus(); // Move focus to first new measure
                }
            }
        }
    });

    document.getElementById('add-section-btn').addEventListener('click', () => {
        const sectionCount = chartContainer.getElementsByClassName('song-section').length + 1;
        const newSection = document.createElement('div');
        newSection.className = 'song-section';

        const newTitle = document.createElement('h2');
        newTitle.contentEditable = 'true';
        newTitle.textContent = `Sección ${sectionCount}`;
        
        const newGrid = document.createElement('div');
        newGrid.className = 'measures-grid';

        newSection.appendChild(newTitle);
        newSection.appendChild(newGrid);
        chartContainer.appendChild(newSection);
        addRow(newGrid);
        saveSheetMusic(); // Ensure save after adding section
    });

    document.getElementById('delete-row-btn').addEventListener('click', () => {
        if (!focusedMeasure) {
            alert('Hacé clic en un compás de la sección cuya última fila querés eliminar.');
            return;
        }
        const grid = focusedMeasure.closest('.measures-grid');
        if (grid) {
            const measures = grid.querySelectorAll('.measure');
            if (measures.length > 4) {
                if (confirm('¿Estás seguro de que querés eliminar la última fila de esta sección?')) {
                    for (let i = 0; i < 4; i++) {
                        grid.removeChild(grid.lastElementChild);
                    }
                }
            } else {
                alert('No se puede eliminar la única fila de una sección.');
            }
        }
        saveSheetMusic(); // Save after deleting row
    });

    document.getElementById('delete-section-btn').addEventListener('click', () => {
        if (!focusedMeasure) {
            alert('Hacé clic en un compás de la sección que querés eliminar.');
            return;
        }
        const section = focusedMeasure.closest('.song-section');
        if (section) {
            if (chartContainer.getElementsByClassName('song-section').length > 1) {
                if (confirm('¿Estás seguro de que querés eliminar esta sección completa?')) {
                    section.remove();
                    focusedMeasure = null; // Reset focus
                }
            } else {
                alert('No se puede eliminar la única sección.');
            }
        }
        saveSheetMusic(); // Save after deleting section
    });

    document.getElementById('add-comment-btn').addEventListener('click', () => {
        const commentBox = document.createElement('div');
        commentBox.className = 'comment-box';

        const dragHandle = document.createElement('div');
        dragHandle.className = 'comment-drag-handle';

        const contentArea = document.createElement('div');
        contentArea.className = 'comment-content';
        contentArea.contentEditable = 'true';
        contentArea.textContent = 'Escribí acá...';

        commentBox.appendChild(dragHandle);
        commentBox.appendChild(contentArea);
        
        // Posición inicial (centro de la vista)
        commentBox.style.top = `${window.innerHeight / 2 - 50}px`;
        commentBox.style.left = `${window.innerWidth / 2 - 75}px`;

        chartContainer.appendChild(commentBox);
        makeDraggable(commentBox);
        saveSheetMusic(); // Save after adding comment

        // Add blur listener directly to comment content
        contentArea.addEventListener('blur', saveSheetMusic);
    });

    document.getElementById('export-pdf-btn').addEventListener('click', async () => {
        const chartContainer = document.getElementById('chart-container');
        const songTitle = document.getElementById('song-title').textContent.trim();
        const filename = songTitle ? `${songTitle}.pdf` : 'cifrado.pdf';

        // Temporarily hide elements for a clean capture
        const elementsToHide = [
            document.querySelector('.floating-controls-container'),
            // Comments are now included by being children of chartContainer
        ];
        const placeholders = document.querySelectorAll('.measure-placeholder');

        elementsToHide.forEach(el => { if (el) el.style.visibility = 'hidden'; });
        placeholders.forEach(p => p.style.display = 'none');

        // Generate canvas from the chart container with explicit dimensions
        const canvas = await html2canvas(chartContainer, {
            width: chartContainer.scrollWidth, // Explicitly set width
            height: chartContainer.scrollHeight, // Explicitly set height
            scale: 2,
            useCORS: true,
            logging: false,
            backgroundColor: '#FFFFFF'
        });

        // Restore visibility of hidden elements
        elementsToHide.forEach(el => { if (el) el.style.visibility = 'visible'; });
        placeholders.forEach(p => p.style.display = '');

        // Get image data from canvas
        const imgData = canvas.toDataURL('image/jpeg', 0.8);

        // Setup PDF document
        const pdf = new window.jspdf.jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const marginTop = 10;
        const marginBottom = 10; // Revert to 10 for now for simplicity
        const marginHorizontal = 0;
        
        const usableWidth = pdfWidth - (marginHorizontal * 2);
        const usableHeight = pdfHeight - marginTop - marginBottom;

        // Calculate image dimensions to fit in PDF, maintaining aspect ratio
        const imgProps = pdf.getImageProperties(imgData);
        const imgAspectRatio = imgProps.height / imgProps.width;
        const pdfImageWidth = usableWidth; // Adjusted for right margin issue
        const pdfImageHeight = pdfImageWidth * imgAspectRatio;

        // --- HYBRID LOGIC ---
        if (pdfImageHeight <= usableHeight) {
            // --- SINGLE PAGE LOGIC ---
            // Content fits on one page, create a custom-height PDF
            const customPageHeight = pdfImageHeight + marginTop + marginBottom;
            const singlePagePdf = new window.jspdf.jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: [pdfWidth, customPageHeight]
            });
            singlePagePdf.addImage(imgData, 'JPEG', marginHorizontal, marginTop, pdfImageWidth, pdfImageHeight);
            singlePagePdf.save(filename);

        } else {
            // --- MULTI-PAGE LOGIC ---
            // Content is too long, use standard A4 pages
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
    
    // Cargar datos al iniciar
    loadSheetMusic();

    // --- FUNCIÓN PARA REINICIAR LA PARTITURA ---
    function resetChart() {
        if (confirm('¿Estás seguro de que quieres reiniciar la partitura? Se borrará todo el contenido.')) {
            // Limpiar el localStorage
            localStorage.removeItem('sheetMusicData');
            console.log('Datos de partitura borrados del localStorage.');

            // Reestablecer la estructura por defecto
            chartContainer.innerHTML = `
                <h1 id="song-title" contenteditable="true">Nombre de la Canción</h1>
                <div class="song-section">
                    <h2 contenteditable="true">Intro</h2>
                    <div class="measures-grid">
                        <div class="measure" contenteditable="true"></div>
                        <div class="measure" contenteditable="true"></div>
                        <div class="measure" contenteditable="true"></div>
                        <div class="measure" contenteditable="true"></div>
                    </div>
                </div>
            `;
            // Eliminar todos los comentarios existentes del DOM
            document.querySelectorAll('.comment-box').forEach(comment => comment.remove());
            console.log('Estructura de partitura reestablecida a la configuración por defecto.');
            // No es necesario llamar a saveSheetMusic() aquí, ya que loadSheetMusic() se encarga de la persistencia
            // al inicio si no hay datos guardados, y el estado inicial ya está establecido.
        }
    }

    // --- EVENT LISTENERS ---
    document.getElementById('reset-chart-btn').addEventListener('click', resetChart);
});
