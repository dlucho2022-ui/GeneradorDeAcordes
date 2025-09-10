const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const profilesDir = path.join(__dirname, 'profiles');

// Ensure the profiles directory exists
if (!fs.existsSync(profilesDir)) {
    fs.mkdirSync(profilesDir);
}

// GET all profile names
app.get('/api/profiles', (req, res) => {
    fs.readdir(profilesDir, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'No se pudo leer la carpeta de perfiles.' });
        }
        const profileNames = files
            .filter(file => path.extname(file) === '.json')
            .map(file => path.basename(file, '.json'));
        res.json(profileNames);
    });
});

// GET a specific profile by name
app.get('/api/profiles/:name', (req, res) => {
    const profileName = path.basename(req.params.name);
    const filePath = path.join(profilesDir, `${profileName}.json`);

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({ message: 'El perfil no existe.' });
            }
            return res.status(500).json({ message: 'Error al leer el perfil.' });
        }
        res.json(JSON.parse(data));
    });
});

// POST (save) a profile
app.post('/api/profiles/:name', (req, res) => {
    const profileName = path.basename(req.params.name);
    if (!profileName || profileName.length === 0) {
        return res.status(400).json({ message: 'El nombre del perfil no puede estar vacío.' });
    }
    const filePath = path.join(profilesDir, `${profileName}.json`);
    const profileData = JSON.stringify(req.body, null, 2);

    fs.writeFile(filePath, profileData, 'utf8', (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error al guardar el perfil.' });
        }
        res.status(201).json({ message: `Perfil '${profileName}' guardado con éxito.` });
    });
});

// DELETE a profile
app.delete('/api/profiles/:name', (req, res) => {
    const profileName = path.basename(req.params.name);
    const filePath = path.join(profilesDir, `${profileName}.json`);

    fs.unlink(filePath, (err) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return res.status(404).json({ message: 'El perfil no existe.' });
            }
            return res.status(500).json({ message: 'Error al eliminar el perfil.' });
        }
        res.json({ message: `Perfil '${profileName}' eliminado con éxito.` });
    });
});

app.listen(port, () => {
    console.log(`Servidor de perfiles escuchando en http://localhost:${port}`);
});
