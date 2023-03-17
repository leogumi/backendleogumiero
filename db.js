// Importar dependencias
const mongoose = require('mongoose');

// Conectar con la base de datos
mongoose.connect('mongodb://localhost/tienda_pelotas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conexión exitosa con la base de datos');
}).catch((error) => {
    console.log('Error al conectar con la base de datos:', error);
});
