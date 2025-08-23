/**
 * Chords Definitions Module
 * Contains all chord definitions and related utility functions
 */
const ChordsModule = (() => {
    'use strict';
    
    // Private internal state
    const privateState = {
        activeChords: [],
        currentChordIndex: 0
    };
    
    // Chord definitions
    const chords = {
        "Mayor Séptima": { 
            "notacion": "maj7", 
            "intervalos": [0, 4, 7, 11], 
            "grados": ["1", "3", "5", "7"],
            "abbreviation": "△7"
        },
        "Menor Séptima": { 
            "notacion": "m7", 
            "intervalos": [0, 3, 7, 10], 
            "grados": ["1", "b3", "5", "b7"],
            "abbreviation": "m7"
        },
        "Séptima Dominante": { 
            "notacion": "7", 
            "intervalos": [0, 4, 7, 10], 
            "grados": ["1", "3", "5", "b7"],
            "abbreviation": "7"
        },
        "Menor Séptima con Quinta Disminuida": { 
            "notacion": "m7b5", 
            "intervalos": [0, 3, 6, 10], 
            "grados": ["1", "b3", "b5", "b7"],
            "abbreviation": "ø7"
        }
    };
    
    // More complete chord definitions
    const extendedChords = {
        "m7b5": {
            "names": ["Semidisminuido", "Menor Séptima con Quinta Disminuida"],
            "intervals": [0, 3, 6, 10],
            "formula": "1 - b3 - b5 - b7"
        },
        "dim7": {
            "names": ["Disminuido", "Séptima Disminuida"],
            "intervals": [0, 3, 6, 9],
            "formula": "1 - b3 - b5 - bb7"
        },
        "m△7": {
            "names": ["Menor Mayor Séptima", "Menor Séptima con Séptima Mayor"],
            "intervals": [0, 3, 7, 11],
            "formula": "1 - b3 - 5 - 7"
        },
        "△7#5": {
            "names": ["Mayor Séptima con Quinta Aumentada", "Aumentado Séptima Mayor"],
            "intervals": [0, 4, 8, 11],
            "formula": "1 - 3 - #5 - 7"
        },
        "7#5": {
            "names": ["Séptima con Quinta Aumentada", "Séptima Aumentada"],
            "intervals": [0, 4, 8, 10],
            "formula": "1 - 3 - #5 - b7"
        },
        "7b5": {
            "names": ["Séptima con Quinta Disminuida", "Séptima Semidisminuida"],
            "intervals": [0, 4, 6, 10],
            "formula": "1 - 3 - b5 - b7"
        },
        "7#9": {
            "names": ["Séptima con Novena Aumentada", "Séptima Blues"],
            "intervals": [0, 4, 7, 10, 15],
            "formula": "1 - 3 - 5 - b7 - #9"
        },
        "7b9": {
            "names": ["Séptima con Novena Disminuida"],
            "intervals": [0, 4, 7, 10, 13],
            "formula": "1 - 3 - 5 - b7 - b9"
        }
    };
    
    // Chord groupings for different musical contexts
    const chordGroupings = {
        basicTypes: ["maj7", "m7", "7", "m7b5"],
        extendedChords: ["9", "11", "13", "6/9", "sus4"],
        alteredChords: ["7#5", "7b5", "7#9", "7b9"],
        specialChords: ["sus2", "sus4", "5"]
    };
    
    /**
     * Public API for the chords module
     */
    return {
        chords,
        extendedChords,
        chordGroupings,
        
        /** 
         * Get chord by notation or name
         * @param {string} identifier - Chord notation or name
         * @returns {Object|null} Chord definition or null if not found
         */
        getChord(identifier) {
            if (!identifier) return null;
            
            identifier = identifier.toLowerCase();
            
            // Try direct match by notation
            if (extendedChords[identifier]) {
                return {
                    ...extendedChords[identifier],
                    key: identifier
                };
            }
            
            // Try match by name
            return Object.entries(extendedChords).find(([_, chord]) => 
                chord.names.some(name => name.toLowerCase().includes(identifier))
            )?.[1] || null;
        },
        
        /**
         * Get chord notes from root and chord type
         * @param {string} root - Root note (e.g., "Do")
         * @param {string} chordType - Chord notation
         * @returns {Array} Array of note names
         */
        getChordNotes(root, chordType) {
            const rootIndex = AppUtils.noteConverter.noteToIndex(root);
            if (rootIndex === -1) return [];
            
            // Get chord definition
            const chordDef = this.getChord(chordType) || this.getChord("maj7");
            return chordDef.intervals.map(interval => 
                AppUtils.noteConverter.indexToNote((rootIndex + interval) % 12)
            );
        }
    };
})();
