const express = require('express');
const Routes = require('./routes/Routes');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware para procesar JSON
app.use(bodyParser.json());

// Rutas
app.use('/', Routes);

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
