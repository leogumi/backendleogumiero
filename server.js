const express = require('express');
const app = express();
const http = require('http').createServer(app);
const exphbs = require('express-handlebars').create({
    defaultLayout: 'main',
    extname: '.handlebars'
});
const io = require('socket.io')(http);

// Configurar Handlebars como motor de vistas
app.engine('.handlebars', exphbs.engine);
app.set('view engine', '.handlebars');

// Establecer el directorio de vistas
app.set('views', './views');

// configuración de socket.io
io.on('connection', (socket) => {
    console.log('Usuario conectado');
});

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

http.listen(function () {
    console.log('Servidor iniciado en el puerto 8080');
});

// Importar dependencias
const cors = require('cors');
const bodyParser = require('body-parser');
const pelotasRouter = require('./routes/pelotas');

// Configurar el servidor
const PORT = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use('/pelotas', pelotasRouter);

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`);
});
