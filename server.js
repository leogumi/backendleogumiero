const express = require('express');
const app = express();
const http = require('http').createServer(app);
const exphbs = require('express-handlebars').create({
    defaultLayout: 'main',
    extname: '.handlebars'
});
const bcrypt = require('bcrypt');

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    // guardar datos del usuario en la base de datos
    res.redirect('/login');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (email === 'admin@example.com' && password === 'adminpassword') {
        req.session.user = { email, role: 'admin' };
        return res.redirect('/admin');
    }

    // Buscar al usuario en la base de datos
    // Si se encuentra, verificar que la contraseña coincida
    // Si todo está bien, crear la sesión del usuario y redirigir a la página de productos
    // Si algo falla, mostrar un mensaje de error y volver a la página de login
});

const io = require('socket.io')(http);

// Ruta para mostrar el formulario de login
app.get('/login', (req, res) => {
    res.render('login');
});


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
// server.js

const express = require('express');



const mockingRouter = require('./routes/mocking');

const errorHandler = require('./middlewares/errorHandler');
app.use(errorHandler);
