

const express = require('express');
const loggerRouter = require('./routes/logger');

const app = express();

// ...

// Agregar el router de logger
app.use('/api/logger', loggerRouter);

// ...

// Iniciar el servidor
app.listen(8080, () => {
    console.log('Servidor en funcionamiento en el puerto 8080');
});
