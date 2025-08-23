/**
 * Scales Definitions Module
 * Contains all scale definitions and related utility functions
 */
const ScalesModule = (() => {
    'use strict';
    
    // Private internal state
    const privateState = {
        activeScales: [],
        currentIndex: 0
    };
    
    // Scale definitions including intervals and chords
    const scalesConfig = {
        "Jónico": { 
            "intervals": [0, 2, 4, 5, 7, 9, 11], 
            "degrees": ["1", "2", "3", "4", "5", "6", "7"], 
            "chords": ["maj7", "m7", "m7", "maj7", "7", "m7", "m7b5"] 
        },
        "Dórico": { 
            "intervals": [0, 2, 3, 5, 7, 9, 10], 
            "degrees": ["1", "2", "b3", "4", "5", "6", "b7"], 
            "chords": ["m7", "m7", "maj7", "7", "m7", "m7b5", "maj7"] 
        },
        "Frigio": { 
            "intervals": [0, 1, 3, 5, 7, 8, 10], 
            "degrees": ["1", "b2", "b3", "4", "5", "b6", "b7"], 
            "chords": ["m7", "maj7", "7", "m7", "m7b5", "maj7", "m7"] 
        },
        "Lidio": { 
            "intervals": [0, 2, 4, 6, 7, 9, 11], 
            "degrees": ["1", "2", "3", "#4", "5", "6", "7"], 
            "chords": ["maj7", "7", "m7", "m7b5", "maj7", "m7", "m7"] 
        },
        "Mixolidio": { 
            "intervals": [0, 2, 4, 5, 7, 9, 10], 
            "degrees": ["1", "2", "3", "4", "5", "6", "b7"], 
            "chords": ["7", "m7", "m7b5", "maj7", "m7", "m7", "maj7"] 
        },
        "Eólico": { 
            "intervals": [0, 2, 3, 5, 7, 8, 10], 
            "degrees": ["1", "2", "b3", "4", "5", "b6", "b7"], 
            "chords": ["m7", "m7b5", "maj7", "m7", "m7", "maj7", "7"] 
        },
        "Locrio": { 
            "intervals": [0, 1, 3, 5, 6, 8, 10], 
            "degrees": ["1", "b2", "b3", "4", "b5", "b6", "b7"], 
            "chords": ["m7b5", "maj7", "m7", "m7", "maj7", "7", "m7"] 
        }
    };
    
    // Additional scale types beyond the basic modes
    const extendedScales = {
        "Menor Armónica": { 
            "intervals": [0, 2, 3, 5, 7, 8, 11],
            "degrees": ["1", "2", "b3", "4", "5", "b6", "7"],
            "chords": ["m△7", "m7b5", "△7#5", "m7", "7", "maj7", "dim7"] 
        },
        "Menor Húngara": { 
            "intervals": [0, 2, 3, 6, 7, 8, 11],
            "degrees": ["1", "2", "b3", "#4", "5", "b6", "7"],
            "chords": ["m△7", "m7b5", "△7#5", "7", "7", "m7b5", "dim7"] 
        },
        "Hexatonal": { 
            "intervals": [0, 2, 4, 6, 8, 10],
            "degrees": ["1", "2", "3", "#4", "#5", "b7"],
            "chords": ["△7#5"] 
        },
        "Pentatónica Mayor": { 
            "intervals": [0, 2, 4, 7, 9],
            "degrees": ["1", "2", "3", "5", "6"],
            "chords": ["7"] 
        }
    };
    
    // Interval maps for special calculations
    const intervalMaps = {
        diatonicIndexMap: {
            "1": 0, "b2": 1, "2": 1, "#2": 2, "b3": 2, "3": 2,
            "4": 3, "#4": 4, "5": 4, "b6": 5, "6": 5, "bb7": 6, "b7": 6
        },
        
        specialCaseIntervals: {
            "Blues": [0, 3, 5, 6, 7, 10]
        }
    };
    
    /**
     * Generate notes within a scale context
     * @param {string} rootNote - Root note of the scale
     * @param {Array} intervals - Interval pattern of the scale
     * @param {Array} degreePattern - Degree pattern of the scale
     * @returns {Array} Array of note names in the scale
     */
    function generateScaleNotes(rootNote, intervals, degreePattern) {
        const rootSemitone = AppUtils.noteConverter.noteToIndex(rootNote);
        if (rootSemitone === -1) return [];
        
        const scaleNotes = [];
        
        if (degreePattern) {
            for (const [index, interval] of intervals.entries()) {
                const diatonicIndex = intervalMaps.diatonicIndexMap[degreePattern[index]] || 0;
                scaleNotes.push(AppUtils.noteConverter.indexToNote((rootSemitone + interval + 12) % 12));
            }
        } else {
            // Simple case for special scales
            const octaves = 1;
            for (let i = 0; i < intervals.length; i++) {
                const noteIndex = (rootSemitone + intervals[i]) % 12;
                scaleNotes.push(AppUtils.noteConverter.indexToNote(noteIndex));
            }
        }
        
        return scaleNotes;
    }
    
    /**
     * Generate chords for a specific scale
     * @param {Array} scaleNotes - Notes in the scale
     * @param {Array} chordPattern - Pattern of chords for the scale
     * @returns {Array} Array of chord objects
     */
    function generateChordsForScale(scaleNotes, chordPattern = []) {
        AppUtils.logger.debug('Generating chords for scale', { scaleNotes, chordPattern });
        
        if (chordPattern.length === 0) {
            AppUtils.logger.warn('No chord pattern provided, using default majors');
            chordPattern = Array(scaleNotes.length).fill('maj7');
        }
        
        return scaleNotes.map((note, index) => ({
            note: note,
            chordType: chordPattern[index] || chordPattern[index - scaleNotes.length] || 'maj7',
            display: formatChordDisplay(chordPattern[index] || 'maj7'),
            notes: generateChordNotes(note, chordPattern[index] || 'maj7')
        }));
    }
    
    /**
     * Generate notes for a specific chord
     * @param {string} rootNote - Root note of the chord
     * @param {string} chordType - Type of chord (e.g., 'maj7')
     * @returns {Array} Array of notes in the chord
     */
    function generateChordNotes(rootNote, chordType) {
        AppUtils.logger.debug('Generating notes for chord', { rootNote, chordType });
        
        const normalizedType = chordType === 'dim' ? 'dim7' : chordType;
        const chord = ChordsModule.getChord(normalizedType);
        
        if (!chord) {
            AppUtils.logger.error('Chord not found', { chordType });
            return generateChordNotes(rootNote, 'maj7'); // Fallback default
        }
        
        const rootIndex = AppUtils.noteConverter.noteToIndex(rootNote);
        const notes = chord.intervals.map(interval => 
            AppUtils.noteConverter.indexToNote((rootIndex + interval) % 12)
        );
        
        return notes;
    }
    
    /**
     * Format chord display with special characters
     * @param {string} chordType - Type of chord to format
     * @returns {string} HTML-safe formatted string
     */
    function formatChordDisplay(chordType) {
        if (!chordType) return '';
        
        const formatted = chordType
            .replace('maj7', '△7')
            .replace('m7b5', 'ø7')
            .replace('dim7', '°');
        
        return `<span>${formatted}</span>`;
    }
    
    /**
     * Public API for the scales module
     */
    return {
        scalesConfig,
        extendedScales,
        intervalMaps,
        
        /**
         * Get scale by name or abbreviation
         * @param {string} scaleName - The name of the scale to retrieve
         * @returns {Object|null} Scale definition or null if not found
         */
        getScale(scaleName) {
            AppUtils.logger.debug('Getting scale', { scaleName });
            
            if (!scaleName) return null;
            
            // Try basic scale match
            const baseScale = scalesConfig[scaleName] || 
                Object.entries(scalesConfig).find(([name]) => 
                    name.toLowerCase().includes(scaleName.toLowerCase())
                )?.[1];
            
            if (baseScale) return baseScale;
            
            // Try extended scale match
            const extendedScale = extendedScales[scaleName] || 
                Object.entries(extendedScales).find(([name]) => 
                    name.toLowerCase().includes(scaleName.toLowerCase())
                )?.[1];
            
            if (extendedScale) return extendedScale;
            
            AppUtils.logger.warn(`Scale not found: ${scaleName}. Returning major scale.`);
            return scalesConfig.Jónico || { 
                intervals: [0, 2, 4, 5, 7, 9, 11],
                degrees: ["1", "2", "3", "4", "5", "6", "7"],
                chords: []
            };
        },
        
        /**
         * Get all available scale names
         * @returns {Array} Array of scale names
         */
        getAllScaleNames() {
            return Object.keys(scalesConfig)
                .concat(Object.keys(extendedScales));
        },
        
        /**
         * Calculate the scale notes
         * @param {string} rootNote - The root note of the scale
         * @param {string} scaleName - The name of the scale
         * @returns {Array} Array of note names in the scale
         */
        calculateScaleNotes(rootNote, scaleName) {
            AppUtils.logger.debug('Calculating scale notes', { rootNote, scaleName });
            
            const scale = this.getScale(scaleName);
            return generateScaleNotes(rootNote, scale.intervals, scale.degrees);
        },
        
        /**
         * Generate diatonic chords for a scale
         * @param {Array} scaleNotes - Notes in the scale
         * @param {string} scaleName - Name of the scale
         * @returns {Array} Array of chord objects
         */
        generateDiatonicChords(scaleNotes, scaleName) {
            AppUtils.logger.debug('Generating diatonic chords', { scaleName });
            
            const scale = this.getScale(scaleName);
            return generateChordsForScale(scaleNotes, scale.chords);
        },
        
        /**
         * Get all scale information for display
         * @param {string} rootNote - The root note of the scale
         * @param {string} scaleName - The name of the scale
         * @returns {Object} Object containing scale details
         */
        getScaleDisplayInfo(rootNote, scaleName) {
            AppUtils.logger.debug('Getting scale display info', { rootNote, scaleName });
            
            const scale = this.getScale(scaleName);
            const notes = this.calculateScaleNotes(rootNote, scaleName);
            const chords = this.generateDiatonicChords(notes, scaleName);
            
            return {
                name: scaleName,
                formattedName: AppUtils.format.toTitleCase(scaleName),
                notes: notes,
                displayNotes: notes.map(note => AppUtils.format.getFormattedNoteForDisplay(note)),
                degrees: scale.degrees || [],
                chords: chords
            };
        },
        
        // Utility functions that were in the original scripts.js
        generateBlueNotes(rootNote) {
            const intervalosBlues = intervalMaps.specialCaseIntervals.Blues || [0, 3, 5, 6, 7, 10];
            const rootSemitone = AppUtils.noteConverter.noteToIndex(rootNote);
            const escala = [];
            
            for (const semitono of intervalosBlues) {
                const notaIndex = (rootSemitone + semitono) % 12;
                escala.push(AppUtils.noteConverter.indexToNote(notaIndex));
            }
            
            return escala;
        },
        
        getDiatonicIndexFromGrade(grado) {
            const gradoMap = intervalMaps.diatonicIndexMap;
            const baseGrado = grado.replace(/[#b]/g, '');
            return gradoMap[baseGrado] || 0;
        }
    };
})();
