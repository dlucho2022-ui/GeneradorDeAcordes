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

const escalasAgrupadas = {
    "Modos Griegos": ["Jónico", "Dórico", "Frigio", "Lidio", "Mixolidio", "Eólico", "Locrio"],
    "Menor Armónica y Modos": ["Menor Armónica", "Locrio ♮6", "Jónico Aumentado", "Dórico ♯4", "Frigio Dominante", "Lidio ♯2", "Superlocrio 𝄫7"],
    "Menor Melódica y Modos": ["Menor Melódica", "Dórico b2", "Lidio Aumentado", "Lidio b7", "Mixolidio b13", "Locrio #2", "Superlocria"],
    "Pentatónicas": ["Pentatónica Mayor", "Pentatónica Menor", "Blues", "Hirajōshi", "Pentatónica Egipcia", "Pentatónica Kumoi"],
    "Simétricas y Bebop": ["Hexatonal (Tonos Enteros)", "Disminuida Tono-Semitono", "Disminuida Semitono-Tono", "Menor Armónica Bebop", "Bebop Dominante", "Bebop Mayor"],
    "Exóticas": ["Menor Húngara", "Elefante", "Árabe", "Doble Armónica", "Ultrafrigio", "Gitana Mayor", "Oriental", "Jónico Aumentado ♯2", "Escala de Prometeo", "Escala de Tritono", "Escala Enigmática"]
};

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
    "Menor Armónica Bebop": { "intervalos": [0, 2, 3, 5, 7, 8, 10, 11], "grados": ["1", "2", "b3", "4", "5", "b6", "b7", "7"], "acordes": ["m7", "m7b5", "maj7", "m7", "m7", "maj7", "7", "dim7"] },
    "Bebop Dominante": { "intervalos": [0, 2, 4, 5, 7, 9, 10, 11], "grados": ["1", "2", "3", "4", "5", "6", "b7", "7"], "acordes": ["7", "m7", "m7b5", "maj7", "m7", "m7", "maj7", "dim7"] },
    "Bebop Mayor": { "intervalos": [0, 2, 4, 5, 7, 8, 9, 11], "grados": ["1", "2", "3", "4", "5", "b6", "6", "7"], "acordes": ["maj7", "m7", "m7", "maj7", "7", "dim7", "m7", "m7b5"] },
    "Doble Armónica": { "intervalos": [0, 1, 4, 5, 7, 8, 11], "grados": ["1", "b2", "3", "4", "5", "b6", "7"], "acordes": ["maj7", "maj7", "m7b5", "m△7", "7b5", "△7#5", "dim7"] },
    "Lidio ♯2": { "intervalos": [0, 3, 4, 6, 7, 9, 11], "grados": ["1", "#2", "3", "#4", "5", "6", "7"], "acordes": ["maj7", "dim7", "m△7", "7b5", "△7#5", "dim7", "maj7"] },
    "Ultrafrigio": { "intervalos": [0, 1, 3, 4, 7, 8, 9], "grados": ["1", "b2", "b3", "b4", "5", "b6", "bb7"], "acordes": ["m7b5", "m△7", "7b5", "△7#5", "dim7", "maj7", "maj7"] },
    "Gitana Mayor": { "intervalos": [0, 2, 3, 5, 6, 9, 10], "grados": ["1", "2", "b3", "4", "b5", "6", "b7"], "acordes": ["m△7", "7b5", "△7#5", "dim7", "maj7", "maj7", "m7b5"] },
    "Oriental": { "intervalos": [0, 1, 4, 5, 7, 8, 10], "grados": ["1", "b2", "3", "4", "5", "b6", "b7"], "acordes": ["7b5", "△7#5", "dim7", "maj7", "maj7", "m7b5", "m△7"] },
    "Jónico Aumentado ♯2": { "intervalos": [0, 3, 4, 5, 8, 9, 11], "grados": ["1", "#2", "3", "4", "#5", "6", "7"], "acordes": ["△7#5", "dim7", "maj7", "maj7", "m7b5", "m△7", "7b5"] },
    "Locrio ♭♭7": { "intervalos": [0, 1, 2, 5, 6, 8, 9], "grados": ["1", "b2", "bb3", "4", "b5", "b6", "bb7"], "acordes": ["dim7", "maj7", "maj7", "m7b5", "m△7", "7b5", "△7#5"] },
    "Pentatónica Egipcia": { "intervalos": [0, 2, 5, 7, 10], "grados": ["1", "2", "4", "5", "b7"], "acordes": [] },
    "Pentatónica Kumoi": { "intervalos": [0, 2, 3, 7, 9], "grados": ["1", "2", "b3", "5", "6"], "acordes": ["m", "m6", "m7"] },
    "Escala de Prometeo": { "intervalos": [0, 2, 4, 6, 9, 10], "grados": ["1", "2", "3", "#4", "6", "b7"], "acordes": ["7b5", "7", ] },
    "Escala de Tritono": { "intervalos": [0, 1, 4, 6, 7, 10], "grados": ["1", "b2", "3", "#4", "5", "b7"], "acordes": ["7b5", "7#11", "dim7"] },
    "Escala Enigmática": { "intervalos": [0, 1, 4, 6, 8, 10, 11], "grados": ["1", "b2", "3", "#4", "#5", "#6", "7"], "acordes": ["maj7#5", "dim7", "7#5"] }

};


const acordesAgrupados = {
    "Triadas": [
        "Mayor (Triada)", "Menor (Triada)", "Aumentado (Triada)", "Disminuido (Triada)",
        "Cuarta Suspendida (sus4)", "Segunda Suspendida (sus2)", "TEST_CHORD"
    ],
    "Séptima": [
        "Mayor Séptima (maj7)", "Menor Séptima (m7)", "Séptima de Dominante (7)",
        "Menor Séptima con Quinta Disminuida (m7b5)", "Disminuido Séptima (dim7)",
        "Menor Séptima Mayor (m△7)"
    ],
    "Extensiones y Alteraciones Mayores": [
        "Novena Mayor (maj9)", "Trecena Mayor (maj13)", "Mayor Siete #11 (maj7#11)",
        "Mayor Séptima b5 (maj7b5)", "Aumentado Séptima Mayor (△7#5)", "Mayor Siete #9 (maj7#9)",
        "Sexta (6)", "Sexta/Novena (6/9)", "Add 9 (add9)"
    ],
    "Extensiones y Alteraciones Menores": [
        "Novena Menor (m9)", "Trecena Menor (m13)", "Menor Siete b9 (m7b9)",
        "Menor Siete #11 (m7#11)", "Menor Sexta (m6)", "Menor Sexta/Novena (m6/9)"
    ],
    "Extensiones y Alteraciones Dominantes": [
        "Novena Dominante (9)", "Trecena Dominante (13)", "Siete b9 (7b9)", "Siete #9 (7#9)",
        "Siete #11 (7#11)", "Séptima con Quinta Aumentada (7#5)", "Séptima con Quinta Disminuida (7b5)",
        "Siete b9 #11 (7b9#11)", "Siete #9 b13 (7#9b13)", "Siete b5 #9 (7b5#9)",
        "Siete #5 #9 (7#5#9)", "Siete #5 b9 (7#5b9)"
    ],
    "Suspendidos con Extensiones": [
        "Novena Suspendida 4 (9sus4)", "Trecena Suspendida 4 (13sus4)",
        "Séptima Suspendida 2 (7sus2)", "Suspendida 4 b5 (sus4b5)", "Suspendida 4 #5 (sus4#5)", "Suspendida 2 b5 (sus2b5)",
        "Siete Suspendido 4 (7sus4)"
    ]
};

const acordes = {
    "Mayor Séptima (maj7)": { "intervalos": [0, 4, 7, 11], "grados": ["1", "3", "5", "7"], "notacion": "maj7" },
    "Novena Mayor (maj9)": { "intervalos": [0, 4, 7, 11, 2], "grados": ["1", "3", "5", "7", "9"], "notacion": "maj9" },
    "Trecena Mayor (maj13)": { "intervalos": [0, 4, 7, 11, 2, 9], "grados": ["1", "3", "5", "7", "9", "13"], "notacion": "maj13" },
    "Mayor Siete #11 (maj7#11)": { "intervalos": [0, 4, 7, 11, 6], "grados": ["1", "3", "5", "7", "#11"], "notacion": "maj7#11" },
    "Menor Séptima (m7)": { "intervalos": [0, 3, 7, 10], "grados": ["1", "b3", "5", "b7"], "notacion": "m7" },
    "Novena Menor (m9)": { "intervalos": [0, 3, 7, 10, 2], "grados": ["1", "b3", "5", "b7", "9"], "notacion": "m9" },
    "Trecena Menor (m13)": { "intervalos": [0, 3, 7, 10, 2, 9], "grados": ["1", "b3", "5", "b7", "9", "13"], "notacion": "m13" },
    "Menor Siete b9 (m7b9)": { "intervalos": [0, 3, 7, 10, 1], "grados": ["1", "b3", "5", "b7", "b9"], "notacion": "m7b9" },
    "Menor Siete #11 (m7#11)": { "intervalos": [0, 3, 7, 10, 6], "grados": ["1", "b3", "5", "b7", "#11"], "notacion": "m7#11" },
    "Séptima de Dominante (7)": { "intervalos": [0, 4, 7, 10], "grados": ["1", "3", "5", "b7"], "notacion": "7" },
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
    "Add 9 (add9)": { "intervalos": [0, 4, 7, 2], "grados": ["1", "3", "5", "9"], "notacion": "add9" },
    "Cuarta Suspendida (sus4)": { "intervalos": [0, 5, 7], "grados": ["1", "4", "5"], "notacion": "sus4" },
    "Segunda Suspendida (sus2)": { "intervalos": [0, 2, 7], "grados": ["1", "2", "5"], "notacion": "sus2" },
    "Mayor (Triada)": { "intervalos": [0, 4, 7], "grados": ["1", "3", "5"], "notacion": "maj" },
    "Menor (Triada)": { "intervalos": [0, 3, 7], "grados": ["1", "b3", "5"], "notacion": "m" },
    "Aumentado (Triada)": { "intervalos": [0, 4, 8], "grados": ["1", "3", "#5"], "notacion": "aug" },
    "Disminuido (Triada)": { "intervalos": [0, 3, 6], "grados": ["1", "b3", "b5"], "notacion": "dim" },
    "7sus4": { "intervalos": [0, 5, 7, 10], "grados": ["1", "4", "5", "b7"], "notacion": "7sus4" }
};

const todasLasOpciones = { ...escalas_modos, ...acordes };

let audioContext;
let isPlaying = false;
let currentProgressionIndex = 0;
let currentProgression = [];
let currentMidiPart = null; // Variable to hold the current MIDI part
let selectedDrumPattern = "midi_beat_1.mid"; // Default drum pattern



let chordSampler;
let arpeggioSampler;
let stringSampler; // For user's string samples
let pianoVolume;
let arpeggioVolume;
let stringVolume; // For user's string samples
let drumSampler;

let pianoVolumeValue;
let arpeggioVolumeValue;
let stringVolumeValue;
let drumVolumeValue;

function initializeSamplersAndVolumes() {
    // Get current slider values
    const pianoSliderValue = document.getElementById('piano-volume') ? parseFloat(document.getElementById('piano-volume').value) : -6;
    const arpeggioSliderValue = document.getElementById('arpeggio-volume') ? parseFloat(document.getElementById('arpeggio-volume').value) : -12;
    const stringSliderValue = document.getElementById('string-volume') ? parseFloat(document.getElementById('string-volume').value) : -6;
    const drumSliderValue = document.getElementById('drum-volume') ? parseFloat(document.getElementById('drum-volume').value) : -6;

    // Initialize volumes with current slider values
    pianoVolume = new Tone.Volume(pianoSliderValue).toDestination();
    arpeggioVolume = new Tone.Volume(arpeggioSliderValue).toDestination();
    stringVolume = new Tone.Volume(stringSliderValue).toDestination();
    drumVolume = new Tone.Volume(drumSliderValue).toDestination();

    // Store current volumes (now directly from sliders)
    pianoVolumeValue = pianoVolume.volume.value;
    arpeggioVolumeValue = arpeggioVolume.volume.value;
    stringVolumeValue = stringVolume.volume.value;
    drumVolumeValue = drumVolume.volume.value;

    // --- Generate URLs for user's custom string samples ---
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const fileNotes = ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a', 'as', 'b'];
    const octaves = [3, 4, 5];
    const stringUrls = {};

    for (const octave of octaves) {
        for (let i = 0; i < notes.length; i++) {
            const toneNote = notes[i] + octave;
            const fileNote = fileNotes[i] + octave + '.wav';
            stringUrls[toneNote] = fileNote;
        }
    }

    // Initialize Samplers
    try {
        chordSampler = new Tone.Sampler({
            urls: { 'C4': 'C4.mp3', 'D#4': 'Ds4.mp3', 'F#4': 'Fs4.mp3', 'A4': 'A4.mp3' },
            release: 0.5,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).connect(pianoVolume);

        arpeggioSampler = new Tone.Sampler({
            urls: { 'C4': 'C4.mp3', 'D#4': 'Ds4.mp3', 'F#4': 'Fs4.mp3', 'A4': 'A4.mp3' },
            release: 0.5,
            baseUrl: "https://tonejs.github.io/audio/salamander/",
        }).connect(arpeggioVolume);

        stringSampler = new Tone.Sampler({
            urls: stringUrls,
            release: 0.5,
            baseUrl: "assets/audios/",
        }).connect(stringVolume);

        drumSampler = new Tone.Sampler({
            urls: {
                'C2': 'kick.wav',
                'D2': 'snare_hit.wav',
                'E2': 'snare_rim.wav',
                'F#2': 'closed_hihat.wav',
                'A#2': 'half_hihat.wav',
                'D#3': 'ride.wav',
            },
            baseUrl: "assets/audios/drum_sample/",
        }).connect(drumVolume);

    } catch (e) {
        console.error("Error initializing Tone.Sampler:", e);
    }
}
const acorde_audio_map = {
    "maj7": "maj7", "m7": "m7", "7": "7", "m7b5": "m7b5",
    "dim7": "dim7", "m△7": "m-maj7",
    "△7#5": "aug-maj7", "△7": "maj7", "7#5": "7aug5", "7b5": "7b5",
    "7b9": "7b9", "7#9": "7#9", "maj7#11": "maj7#11", "7#11": "7#11", "m7b9": "m7b9", "m7#11": "m7#11",
    "6": "maj6", "m6": "m6",
    "maj9": "maj9", "m9": "m9", "9": "9", "add9": "add9",
    "maj13": "maj13", "m13": "m13", "13": "13",
    "sus4": "sus4",
    "sus2": "sus2",
    "maj": "maj",
    "m": "m",
    "aug": "aug",
    "dim": "dim"
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
        Tone.Transport.bpm.value = bpm; // Set the new BPM first
        togglePlay(); // Stop everything cleanly
        togglePlay(); // Start again with the new BPM
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
        "0,4,7": "maj", "0,3,7": "m", "0,4,8": "aug", "0,3,6": "dim",
        "0,5,7": "sus4", "0,2,7": "sus2"
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

    // Solo inicializar volúmenes y samplers si no existen
    if (!pianoVolume) { // Check if any of the volumes/samplers are not initialized
        const pianoSliderValue = document.getElementById('piano-volume') ? parseFloat(document.getElementById('piano-volume').value) : -6;
        const arpeggioSliderValue = document.getElementById('arpeggio-volume') ? parseFloat(document.getElementById('arpeggio-volume').value) : -12;
        const stringSliderValue = document.getElementById('string-volume') ? parseFloat(document.getElementById('string-volume').value) : -6;
        const drumSliderValue = document.getElementById('drum-volume') ? parseFloat(document.getElementById('drum-volume').value) : -6;

        pianoVolume = new Tone.Volume(pianoSliderValue).toDestination();
        arpeggioVolume = new Tone.Volume(arpeggioSliderValue).toDestination();
        stringVolume = new Tone.Volume(stringSliderValue).toDestination();
        drumVolume = new Tone.Volume(drumSliderValue).toDestination();

        pianoVolumeValue = pianoVolume.volume.value;
        arpeggioVolumeValue = arpeggioVolume.volume.value;
        stringVolumeValue = stringVolume.volume.value;
        drumVolumeValue = drumVolume.volume.value;

        const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
        const fileNotes = ['c', 'cs', 'd', 'ds', 'e', 'f', 'fs', 'g', 'gs', 'a', 'as', 'b'];
        const octaves = [3, 4, 5];
        const stringUrls = {};

        for (const octave of octaves) {
            for (let i = 0; i < notes.length; i++) {
                const toneNote = notes[i] + octave;
                const fileNote = fileNotes[i] + octave + '.wav';
                stringUrls[toneNote] = fileNote;
            }
        }

        try {
            chordSampler = new Tone.Sampler({
                urls: { 'C4': 'C4.mp3', 'D#4': 'Ds4.mp3', 'F#4': 'Fs4.mp3', 'A4': 'A4.mp3' },
                release: 0.5,
                baseUrl: "https://tonejs.github.io/audio/salamander/",
            }); // No connect here, will connect later

            arpeggioSampler = new Tone.Sampler({
                urls: { 'C4': 'C4.mp3', 'D#4': 'Ds4.mp3', 'F#4': 'Fs4.mp3', 'A4': 'A4.mp3' },
                release: 0.5,
                baseUrl: "https://tonejs.github.io/audio/salamander/",
            }); // No connect here, will connect later

            stringSampler = new Tone.Sampler({
                urls: stringUrls,
                release: 0.5,
                baseUrl: "assets/audios/",
            }); // No connect here, will connect later

            drumSampler = new Tone.Sampler({
                urls: {
                    'C2': 'kick.wav',
                    'D2': 'snare_hit.wav',
                    'E2': 'snare_rim.wav',
                    'F#2': 'closed_hihat.wav',
                    'A#2': 'half_hihat.wav',
                    'D#3': 'ride.wav',
                },
                baseUrl: "assets/audios/drum_sample/",
            }); // No connect here, will connect later

        } catch (e) {
            console.error("Error initializing Tone.Sampler:", e);
        }
    }

    // Ensure samplers are loaded (this part remains, as it loads the audio buffers)
    await Promise.all([
        chordSampler ? chordSampler.loaded : Promise.resolve(),
        arpeggioSampler ? arpeggioSampler.loaded : Promise.resolve(),
        stringSampler ? stringSampler.loaded : Promise.resolve(),
        drumSampler ? drumSampler.loaded : Promise.resolve()
    ])
    .then(() => {
        console.log("Todos los samplers cargados correctamente.");
    })
    .catch(e => {
        console.error("Error al cargar los samplers:", e);
    });

    await loadMetronomeSound();
}

function getPlayablePianoNotes(chordNoteNames, startOctave = 4) {
    // 1. Map notes to objects with their pitch value (0-11)
    //    Do NOT sort here. Assume chordNoteNames is already in musical order.
    const notesWithPitch = chordNoteNames.map(name => ({
        name: simplifyEnharmonic(name),
        pitch: mapNotaToSemitone(simplifyEnharmonic(name))
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

function playStringChord(nota, tipo, duracion = '1n', time = undefined) {
    const chordNotes = getChordNotes(nota, tipo);

    if (chordNotes.length === 0) {
        console.warn(`No se pudieron obtener las notas para el acorde (strings) ${nota}${tipo}`);
        return;
    }

    // Reordenar notas a tónica, quinta, tercera, séptima.
    let reorderedNotes = chordNotes;
    if (chordNotes.length === 4) {
        reorderedNotes = [chordNotes[0], chordNotes[2], chordNotes[1], chordNotes[3]];
    }
    
    const playableNotes = getPlayablePianoNotes(reorderedNotes);

    const toneToFileNoteMap = {
        'C': 'c', 'C#': 'cs', 'D': 'd', 'D#': 'ds', 'E': 'e', 'F': 'f', 'F#': 'fs', 'G': 'g', 'G#': 'gs', 'A': 'a', 'A#': 'as', 'B': 'b'
    };

    const fileNoteNames = playableNotes.map(toneNote => {
        const noteName = toneNote.replace(/[0-9]/g, '');
        const octave = toneNote.replace(/[^0-9]/g, '');
        const fileNoteName = toneToFileNoteMap[noteName];
        return fileNoteName ? fileNoteName + octave : toneNote;
    });
    console.log("Buscando samples de cuerdas:", fileNoteNames);

    if (stringSampler && playableNotes.length > 0) {
        stringSampler.triggerAttackRelease(playableNotes, duracion, time);
    } else {
        // console.warn(`Sampler de cuerdas no está listo o no hay notas para reproducir para el acorde ${nota}${tipo}`);
    }
}


// New function to play a sequence of notes (scale or arpeggio)
async function playScaleOrArpeggio(notes, octave = 4, duration = '8n') { // Keep octave parameter
    // Ensure samplers are initialized and loaded before playing
    if (!arpeggioSampler || !arpeggioSampler.loaded) { // Check if arpeggioSampler is not loaded
        initializeSamplersAndVolumes(); // Ensure samplers are created
        await loadAudioFiles(); // Ensure audio files are loaded into samplers
    }

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
    const noteDuration = Tone.Time('8n').toSeconds(); // Forzar a corchea
    const delayBetweenNotes = noteDuration * 0.1;

    for (let i = 0; i < allNotesToPlay.length; i++) {
        const note = allNotesToPlay[i];
        arpeggioSampler.triggerAttackRelease(note, '8n', time); // Forzar a corchea
        time += noteDuration + delayBetweenNotes;
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

function smartSimplify(notes) {
    const simplified = notes.map(n => simplifyEnharmonic(n));
    const baseNotes = simplified.map(n => n.replace(/[#bx]/g, ''));
    const uniqueBaseNotes = new Set(baseNotes);
    if (uniqueBaseNotes.size === baseNotes.length) {
        return simplified;
    } else {
        return notes;
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

function escapeHtmlQuotesForJs(str) {
    return str.replace(/'/g, "'" ).replace(/"/g, '"');
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
            const select = document.getElementById('predefined-progressions-select');
            if (select.value !== '') {
                const event = new Event('change');
                select.dispatchEvent(event);
            }
        });
        tonalidadOptionsContainer.appendChild(option);
    });

    const escalaOptionsContainer = document.getElementById('escala-options-modal');
    escalaOptionsContainer.innerHTML = '';

    // Add default option
    const escalaDefaultOption = document.createElement('div');
    escalaDefaultOption.className = 'card-option';
    escalaDefaultOption.textContent = 'Ninguna';
    escalaDefaultOption.dataset.value = '';
    escalaDefaultOption.addEventListener('click', () => {
        selectedEscala = '';
        selectedAcorde = '';
        document.getElementById('open-escala-modal-btn').textContent = 'Seleccionar Escala';
        document.getElementById('open-acorde-modal-btn').textContent = 'Seleccionar Acorde';
        document.getElementById('escala-modal').style.display = "none";
        calcularEscala();
    });
    escalaOptionsContainer.appendChild(escalaDefaultOption);

    // Render grouped scales
    const escalasGrid = document.createElement('div');
    escalasGrid.className = 'escalas-grid';

    for (const grupo in escalasAgrupadas) {
        const grupoContainer = document.createElement('div');
        grupoContainer.className = 'escala-group';
        
        const grupoTitle = document.createElement('h3');
        grupoTitle.className = 'escala-group-title';
        grupoTitle.textContent = grupo;
        grupoContainer.appendChild(grupoTitle);

        escalasAgrupadas[grupo].forEach(opcion => {
            if (escalas_modos[opcion]) { // Check if scale exists
                const option = document.createElement('div');
                option.className = 'card-option';
                option.textContent = opcion;
                option.dataset.value = opcion;
                option.addEventListener('click', () => {
                    selectedEscala = opcion;
                    selectedAcorde = '';
                    document.getElementById('open-escala-modal-btn').textContent = `Escala: ${opcion}`;
                    document.getElementById('open-acorde-modal-btn').textContent = 'Seleccionar Acorde';
                    document.getElementById('escala-modal').style.display = "none";
                    calcularEscala();
                });
                grupoContainer.appendChild(option);
            }
        });
        escalasGrid.appendChild(grupoContainer);
    }
    escalaOptionsContainer.appendChild(escalasGrid);

    const acordeOptionsContainer = document.getElementById('acorde-options-modal');
    acordeOptionsContainer.innerHTML = '';

    // Add default option
    const acordeDefaultOption = document.createElement('div');
    acordeDefaultOption.className = 'card-option';
    acordeDefaultOption.textContent = 'Ninguno';
    acordeDefaultOption.dataset.value = '';
    acordeDefaultOption.addEventListener('click', () => {
        selectedAcorde = '';
        selectedEscala = '';
        document.getElementById('open-acorde-modal-btn').textContent = 'Seleccionar Acorde';
        document.getElementById('open-escala-modal-btn').textContent = 'Seleccionar Escala';
        document.getElementById('acorde-modal').style.display = "none";
        calcularEscala();
    });
    acordeOptionsContainer.appendChild(acordeDefaultOption);

    // Render grouped chords
    const acordesGrid = document.createElement('div');
    acordesGrid.className = 'acordes-grid';
    
    for (const grupo in acordesAgrupados) {
        const grupoContainer = document.createElement('div');
        grupoContainer.className = 'acorde-group';
        
        const grupoTitle = document.createElement('h3');
        grupoTitle.className = 'acorde-group-title';
        grupoTitle.textContent = grupo;
        grupoContainer.appendChild(grupoTitle);

        acordesAgrupados[grupo].forEach(opcion => {
            // TEMPORARY DEBUGGING: Force 7sus4 to appear
            if (grupo === "Suspendidos con Extensiones" && opcion === "Novena Suspendida 4 (9sus4)") { // Find a known first element in the group
                const tempOption = document.createElement('div');
                tempOption.className = 'card-option';
                tempOption.textContent = "7sus4"; // Hardcoded text
                tempOption.dataset.value = "7sus4";
                tempOption.addEventListener('click', () => {
                    selectedAcorde = "7sus4";
                    selectedEscala = '';
                    document.getElementById('open-acorde-modal-btn').textContent = `Acorde: 7sus4`;
                    document.getElementById('open-escala-modal-btn').textContent = 'Seleccionar Escala';
                    document.getElementById('acorde-modal').style.display = "none";
                    calcularEscala();
                });
                grupoContainer.appendChild(tempOption);
            }
            // END TEMPORARY DEBUGGING
            if (acordes[opcion]) { // Check if chord exists
                const option = document.createElement('div');
                option.className = 'card-option';
                option.textContent = opcion.replace("Menor Séptima con Quinta Disminuida", "Semidisminuido").replace("Disminuido Séptima", "Disminuido");
                option.dataset.value = opcion;
                option.addEventListener('click', () => {
                    selectedAcorde = opcion;
                    selectedEscala = '';
                    document.getElementById('open-acorde-modal-btn').textContent = `Acorde: ${opcion}`;
                    document.getElementById('open-escala-modal-btn').textContent = 'Seleccionar Escala';
                    document.getElementById('acorde-modal').style.display = "none";
                    calcularEscala();
                });
                grupoContainer.appendChild(option);
            }
        });
        acordesGrid.appendChild(grupoContainer);
    }
    acordeOptionsContainer.appendChild(acordesGrid);
}

function formatChordDisplay(acorde, forOnClick = false) {
    if (!acorde) return '';
    let formattedSuffix = '';

    if (acorde === 'sus4') {
        formattedSuffix = 'sus4';
    } else if (acorde === 'sus2') {
        formattedSuffix = 'sus2';
    } else if (acorde === 'maj') {
        formattedSuffix = ''; // Mayor (triada) se muestra sin sufijo
    } else if (acorde === 'm') {
        formattedSuffix = 'm';
    } else if (acorde === 'aug') {
        formattedSuffix = 'aug';
    } else if (acorde === 'dim') {
        formattedSuffix = 'dim'; // O '°' si se prefiere
    } else if (acorde === '6') {
        formattedSuffix = '6';
    } else if (acorde === 'm6') {
        formattedSuffix = 'm6';
    } else if (acorde === 'maj9') {
        formattedSuffix = 'maj9';
    } else if (acorde === 'm9') {
        formattedSuffix = 'm9';
    } else if (acorde === '9') {
        formattedSuffix = '9';
    } else if (acorde === 'add9') {
        formattedSuffix = 'add9';
    } else if (acorde === 'maj13') {
        formattedSuffix = 'maj13';
    } else if (acorde === 'm13') {
        formattedSuffix = 'm13';
    } else if (acorde === '13') {
        formattedSuffix = '13';
    } else if (acorde === '7b9') {
        formattedSuffix = '7b9';
    } else if (acorde === '7#9') {
        formattedSuffix = '7#9';
    } else if (acorde === 'maj7#11') {
        formattedSuffix = 'maj7#11';
    } else if (acorde === '7#11') {
        formattedSuffix = '7#11';
    } else if (acorde === 'm7b9') {
        formattedSuffix = 'm7b9';
    } else if (acorde === 'm7#11') {
        formattedSuffix = 'm7#11';
    } else {
        // Existing logic for 7th chords
        formattedSuffix = acorde.replace('maj7', '△7').replace('m7b5', 'ø7').replace('dim7', '°');
    }

    if (forOnClick) {
        return formattedSuffix; // Return plain text for onclick
    } else {
        // Add a non-breaking space before the suffix if it's not empty
        // This ensures "Do aug" instead of "Doaug"
        if (formattedSuffix === '') return ''; // No space for empty suffix
        if (formattedSuffix === 'm') return `<span>m</span>`; // Special case for minor
        if (formattedSuffix === 'aug') return `&nbsp;<span class="acorde-subscript">aug</span>`;
        if (formattedSuffix === 'dim') return `&nbsp;<span class="acorde-subscript">dim</span>`;
        return `&nbsp;<span>${formattedSuffix}</span>`;
    }
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

        const escalaNotasDisplay = smartSimplify(escalaNotas); // Get simplified notes for playback
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
        const escapedAcordeNotacion = escapeHtmlQuotesForJs(formatChordDisplay(opcionesSeleccionadas.notacion, true)); // Pass true for forOnClick

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
                <li class="acorde-btn" onclick="addChordToProgression('${selectedSemitono}', '${opcionesSeleccionadas.notacion}', '${escapedAcordeNotacion}')">${getFormattedNoteForDisplay(selectedSemitono)}${acordeNotacion}</li>
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
            const escapedAcordeDisplay = escapeHtmlQuotesForJs(formatChordDisplay(acorde, true)); // Pass true for forOnClick
            return `<li class="acorde-btn" onclick="addChordToProgression('${notaAcorde}', '${acorde}', '${escapedAcordeDisplay}')">${getFormattedNoteForDisplay(notaAcorde)}${acordeDisplay}</li>`;
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
        const escapedAcordeDisplay = escapeHtmlQuotesForJs(formatChordDisplay(tipoAcorde, true)); // Pass true for forOnClick
        acordesArray.push(`<li class="acorde-btn" onclick="addChordToProgression('${nota}', '${tipoAudio}', '${escapedAcordeDisplay}')">${getFormattedNoteForDisplay(nota)}${acordeDisplay}</li>`);
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
        display: `${getFormattedNoteForDisplay(nota)}${formatChordDisplay(tipo)}`,
        notes: notes
    };
    currentProgression.push(chord);
    updateProgressionDisplay();
    
    // Play piano preview
    if (chordSampler && notes && notes.length > 0) {
        const simplifiedNotes = notes.map(n => simplifyEnharmonic(n));
        const pianoNotes = getPlayablePianoNotes(simplifiedNotes);
        if (pianoNotes.length > 0) {
            chordSampler.triggerAttackRelease(pianoNotes, '1s');
        }
    }

    // Play string preview
    playStringChord(nota, tipo, '1s');
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
    const tiposDeAcordePosibles = Object.keys(acordes);

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
            display: `${getFormattedNoteForDisplay(nota)}${formatChordDisplay(tipoData.notacion)}`,
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
            display: `${getFormattedNoteForDisplay(chord.nota)}${formatChordDisplay(chord.tipo)}`,
            notes: notes
        };
        currentProgression.push(chordObj);
    });

    updateProgressionDisplay();
}


// Iconos SVG para el botón flotante
const playIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M8 5v14l11-7z"/></svg>`;
const stopIconSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M6 6h12v12H6z"/></svg>`;

async function togglePlay() {
    const toggleBtn = document.getElementById('toggle-progression-btn');
    const floatingBtn = document.getElementById('floating-play-stop-button');

    if (isPlaying) {
        // Stop all sound immediately and definitively
        Tone.Transport.stop();
        Tone.Transport.cancel();

        if (chordLoop) {
            chordLoop.stop(0).dispose();
        }
        if (currentMidiPart) {
            currentMidiPart.stop(0).dispose();
            currentMidiPart = null;
        }

        // Dispose of samplers and volumes to prevent residual sound
        if (chordSampler) chordSampler.dispose();
        if (arpeggioSampler) arpeggioSampler.dispose();
        if (stringSampler) stringSampler.dispose();
        if (drumSampler) drumSampler.dispose();
        if (pianoVolume) pianoVolume.dispose();
        if (arpeggioVolume) arpeggioVolume.dispose();
        if (stringVolume) stringVolume.dispose();
        if (drumVolume) drumVolume.dispose();

        // Set samplers and volumes to null so they are re-initialized on next play
        chordSampler = null;
        arpeggioSampler = null;
        stringSampler = null;
        drumSampler = null;
        pianoVolume = null;
        arpeggioVolume = null;
        stringVolume = null;
        drumVolume = null;

        isPlaying = false;
        toggleBtn.classList.remove('playing');
        toggleBtn.classList.add('stopped');
        floatingBtn.innerHTML = playIconSVG;
        floatingBtn.classList.remove('playing');
        floatingBtn.classList.add('stopped');
        document.querySelectorAll('.progression-chord').forEach(el => el.classList.remove('playing-chord'));

    } else {
        if (currentProgression.length > 0) {
            // Re-initialize samplers and volumes when starting playback
            initializeSamplersAndVolumes();
            await startChordLoop();
        }
    }
}

// New function to encapsulate chord loop starting logic
async function startChordLoop() {
    if (Tone.context.state === 'suspended') {
        await Tone.start();
    }

    isPlaying = true;
    currentProgressionIndex = 0;

    const bpm = document.getElementById('bpm-input').value;
    Tone.Transport.bpm.value = bpm;

    await playMidiBeat(); // Start MIDI beat when progression starts

    chordLoop = new Tone.Loop(time => {
        const chord = currentProgression[currentProgressionIndex];
        const indexToHighlight = currentProgressionIndex;

        // Play String Chord
        playStringChord(chord.nota, chord.tipo, '1n', time);

        if (chordSampler && arpeggioSampler && chord.notes && chord.notes.length > 0) {
            
            // Play Piano Chord (not reordered)
            const simplifiedNotes = chord.notes.map(n => simplifyEnharmonic(n));
            const pianoNotes = getPlayablePianoNotes(simplifiedNotes);
            if (pianoNotes.length > 0) {
                chordSampler.triggerAttackRelease(pianoNotes, '1n', time);
            }

            const rootNote = chord.notes[0]; // Get the root note
            if (rootNote) {
                const playableRootNote = getPlayablePianoNotes([simplifyEnharmonic(rootNote)]);
                if (playableRootNote.length > 0) {
                    arpeggioSampler.triggerAttackRelease(playableRootNote, '8n', time); // Use time from loop
                }
            }

            const thirdNote = chord.notes[1];
            if (thirdNote) {
                const playableThirdNote = getPlayablePianoNotes([simplifyEnharmonic(thirdNote)]);
                if (playableThirdNote.length > 0) {
                    arpeggioSampler.triggerAttackRelease(playableThirdNote, '8n', time + Tone.Time('0:1').toSeconds()); // Use time from loop
                }
            }

            const fifthNote = chord.notes[2];
            if (fifthNote) {
                const playableFifthNote = getPlayablePianoNotes([simplifyEnharmonic(fifthNote)]);
                if (playableFifthNote.length > 0) {
                    arpeggioSampler.triggerAttackRelease(playableFifthNote, '8n', time + Tone.Time('0:2').toSeconds()); // Use time from loop
                }
            }

            // NEW: Repeat the third note for 3-note chords
            if (chord.notes.length === 3) {
                const thirdNoteRepeat = chord.notes[1];
                if (thirdNoteRepeat) {
                    const playableThirdNoteRepeat = getPlayablePianoNotes([simplifyEnharmonic(thirdNoteRepeat)]);
                    if (playableThirdNoteRepeat.length > 0) {
                        arpeggioSampler.triggerAttackRelease(playableThirdNoteRepeat, '8n', time + Tone.Time('0:3').toSeconds()); // Use time from loop
                    }
                }
            }

            const seventhNote = chord.notes[3];
            if (seventhNote) {
                const playableSeventhNote = getPlayablePianoNotes([simplifyEnharmonic(seventhNote)]);
                if (playableSeventhNote.length > 0) {
                    arpeggioSampler.triggerAttackRelease(playableSeventhNote, '8n', time + Tone.Time('0:3').toSeconds()); // Use time from loop
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

    // Modal Logic
    const escalaModal = document.getElementById('escala-modal');
    const acordeModal = document.getElementById('acorde-modal');

    const openEscalaBtn = document.getElementById('open-escala-modal-btn');
    const openAcordeBtn = document.getElementById('open-acorde-modal-btn');

    const closeEscalaBtn = document.getElementById('close-escala-modal-btn');
    const closeAcordeBtn = document.getElementById('close-acorde-modal-btn');

    openEscalaBtn.onclick = () => escalaModal.style.display = "block";
    openAcordeBtn.onclick = () => acordeModal.style.display = "block";

    closeEscalaBtn.onclick = () => escalaModal.style.display = "none";
    closeAcordeBtn.onclick = () => acordeModal.style.display = "none";

    window.onclick = function(event) {
        if (event.target == escalaModal) {
            escalaModal.style.display = "none";
        }
        if (event.target == acordeModal) {
            acordeModal.style.display = "none";
        }
    }

    // Search Logic
    document.getElementById('escala-search').addEventListener('keyup', function() {
        let filter = this.value.toUpperCase();
        let options = document.getElementById('escala-options-modal').getElementsByClassName('card-option');
        for (let i = 0; i < options.length; i++) {
            let txtValue = options[i].textContent || options[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                options[i].style.display = "";
            } else {
                options[i].style.display = "none";
            }
        }
    });

    document.getElementById('acorde-search').addEventListener('keyup', function() {
        let filter = this.value.toUpperCase();
        let options = document.getElementById('acorde-options-modal').getElementsByClassName('card-option');
        for (let i = 0; i < options.length; i++) {
            let txtValue = options[i].textContent || options[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                options[i].style.display = "";
            } else {
                options[i].style.display = "none";
            }
        }
    });
    renderPredefinedProgressionsSelector();
    initializeSamplersAndVolumes(); // Call the new function to create samplers and volumes
    loadAudioFiles(); // Still call this to load the audio buffers into the samplers
    
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
                return `<span class="chord-tag">${getFormattedNoteForDisplay(chord.nota)}${formatChordDisplay(chord.tipo)}</span>`;
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

    const stringVolumeControl = document.getElementById('string-volume');
    if (stringVolumeControl) {
        stringVolumeControl.addEventListener('input', (event) => {
            if (stringVolume) {
                stringVolume.volume.value = event.target.value;
            }
        });
    }

    const drumVolumeControl = document.getElementById('drum-volume');
    if (drumVolumeControl) {
        drumVolumeControl.addEventListener('input', (event) => {
            if (drumVolume) {
                drumVolume.volume.value = event.target.value;
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

    document.getElementById('play-midi-btn').addEventListener('click', playMidiBeat);

    const drumPatternSelect = document.getElementById('drum-pattern-select');
    if (drumPatternSelect) {
        drumPatternSelect.addEventListener('change', (event) => {
            selectedDrumPattern = event.target.value;
            // If progression is playing, restart it to apply new drum pattern
            if (isPlaying) {
                togglePlay(); // This will stop and then restart the progression, applying the new MIDI
            }
        });
    }

    
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
        "maj7#5": "Aumentado Séptima Mayor (△7#5)",
        "maj7b5": "Mayor Séptima b5 (maj7b5)",
        "maj7": "Mayor Séptima (maj7)", "major7": "Mayor Séptima (maj7)", "M7": "Mayor Séptima (maj7)", "△7": "Mayor Séptima (maj7)",
        "m7": "Menor Séptima (m7)", "minor7": "Menor Séptima (m7)",
        "7": "Séptima de Dominante (7)", "dom7": "Séptima de Dominante (7)",
        "m7b5": "Menor Séptima con Quinta Disminuida (m7b5)", "halfdim": "Menor Séptima con Quinta Disminuida (m7b5)", "ø7": "Menor Séptima con Quinta Disminuida (m7b5)",
        "dim7": "Disminuido Séptima (dim7)", "dim": "Disminuido Séptima (dim7)", "°7": "Disminuido Séptima (dim7)",
        "m-maj7": "Menor Séptima Mayor (m△7)", "mmaj7": "Menor Séptima Mayor (m△7)", "m△7": "Menor Séptima Mayor (m△7)",
        "aug-maj7": "Aumentado Séptima Mayor (△7#5)", "augmaj7": "Aumentado Séptima Mayor (△7#5)", "△7#5": "Aumentado Séptima Mayor (△7#5)",
        "7#5": "Séptima con Quinta Aumentada (7#5)", "7aug5": "Séptima con Quinta Aumentada (7#5)",
        "7b5": "Séptima con Quinta Disminuida (7b5)",
        "sus4": "Cuarta Suspendida (sus4)", "cuartasuspendida": "Cuarta Suspendida (sus4)",
        "sus2": "Segunda Suspendida (sus2)", "segundasuspendida": "Segunda Suspendida (sus2)",
        "maj": "Mayor (Triada)", "major": "Mayor (Triada)",
        "m": "Menor (Triada)", "minor": "Menor (Triada)",
        "aug": "Aumentado (Triada)",
        "dim": "Disminuido (Triada)"
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

async function playMidiBeat() {
    try {
        if (Tone.context.state === 'suspended') {
            await Tone.start();
        }

        await Tone.loaded();

        const midi = await Midi.fromUrl(`assets/midi_drum_patterns/${selectedDrumPattern}`);
        
        // --- FINAL FIX: Synchronize the transport's PPQ with the MIDI file's PPQ ---
        Tone.Transport.PPQ = midi.header.ppq;

        const track = midi.tracks[0];

        // Convert notes to use ticks for time, so they scale with BPM
        const events = track.notes.map(note => ({
            time: note.ticks + 'i',
            name: note.name,
            duration: note.duration,
            velocity: note.velocity
        }));

        if (currentMidiPart) {
            currentMidiPart.dispose();
        }

        currentMidiPart = new Tone.Part((time, event) => {
            drumSampler.triggerAttackRelease(event.name, event.duration, time, event.velocity);
        }, events).start(0);

        currentMidiPart.loop = true;
        currentMidiPart.loopEnd = '1m';

    } catch (error) {
        console.error("Error al reproducir el MIDI:", error);
        alert("Hubo un error al cargar o reproducir el archivo MIDI. Revisa la consola para más detalles.");
    }
}
    
    
