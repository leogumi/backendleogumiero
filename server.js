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

    
});

const io = require('socket.io')(http);


app.get('/login', (req, res) => {
    res.render('login');
});


app.engine('.handlebars', exphbs.engine);
app.set('view engine', '.handlebars');


app.set('views', './views');

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
    console.log('Servidor iniciado en puerto 8080');
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
app.use(errorHandler.js)


const winston = require('winston');
const { LOG_LEVELS } = require('./config');


const developmentLogger = winston.createLogger({
    level: 'debug',
    transports: [
        new winston.transports.Console(),
    ],
});



const winston = require('winston');
const { LOG_LEVELS } = require('./config');


const productionLogger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'errors.log', level: 'error' }),
    ],
});

const express = require('express');

// ...

// Importa el archivo swagger.js
const configureSwagger = require('./swagger');
configureSwagger(app);

// ...
const express = require('express');

const usersRouter = require('./routes/usersRouter');

app.use(express.json());

app.use('/api/users', usersRouter);

app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
