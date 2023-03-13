const express = require('express');
const app = express();
const products = require('../products');

// Configurar ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Resto del código de tu aplicación

// Iniciar servidor
app.listen(8080, () => {
    console.log('Servidor escuchando en el puerto 8080');
});

// Se importa el módulo body-parser para procesar las solicitudes HTTP entrantes
const bodyParser = require('body-parser');

// Se especifica que el cuerpo de las solicitudes se enviará en formato JSON
app.use(bodyParser.json());

// Se importan las rutas de productos
const productsRouter = require('./routes/products');

// Endpoint de productos
app.use('/api/products', productsRouter);

// Configuración del puerto
const PORT = process.env.PORT || 8080;

// Inicio del servidor
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

const Express = require('express');
const { generateId } = require('./utils'); // Importamos la función generateId del archivo utils.js

const port = 8080;

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// Middleware para validar que el id de un producto tenga el formato correcto
function validateProductId(req, res, next) {
    const { pid } = req.params;
    if (!/^\d{8}$/.test(pid)) {
        return res.status(400).json({ error: 'El id del producto debe ser un número de 8 dígitos' });
    }
    next();
}

// Middleware para validar que un producto tenga todos los campos obligatorios
function validateProductFields(req, res, next) {
    const { title, description, code, price, stock, category } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }
    next();
}

// Middleware para validar que la cantidad de productos a agregar en el carrito sea un número entero
function validateProductQuantity(req, res, next) {
    const { quantity } = req.body;
    if (!Number.isInteger(quantity)) {
        return res.status(400).json({ error: 'La cantidad de productos debe ser un número entero' });
    }
    next();
}

// Array para almacenar los productos y carritos
let carts = [];
let products = [];

// Ruta para listar todos los productos
app.get('/api/products', (req, res) => {
    const { limit } = req.query;
    let result = products;
    if (limit) {
        result = products.slice(0, limit);
    }
    res.json(result);
});

// Ruta para obtener un producto por id
app.get('/api/products/:pid', validateProductId, (req, res) => {
    const { pid } = req.params;
    const product = products.find(p => p.id === pid);
    if (!product) {
        return res.status(404).json({ error: 'No se encontró el producto solicitado' });
    }
    res.json(product);
});

// Ruta para agregar un nuevo producto
app.post('/api/products', validateProductFields, (req, res) => {
    const id = generateId(); // Generamos un nuevo id único para el producto
    const { title, description, code, price, status = true, stock, category, thumbnails } = req.body;
    const newProduct = { id, title, description, code, price, status, stock, category, thumbnails };
    products.push(newProduct);
    res.status(201).json(newProduct);
});

// Ruta para actualizar un producto por id
app.put('/api/products/:pid', validateProductId, validateProductFields, (req, res) => {
    const { pid } = req.params;
    const { title, description, code, price, status = true, stock, category, thumbnails } = req.body;
    const productIndex = products.findIndex(p => p.id === pid);
    if (productIndex === -1) {
        return res.status(404).json({ error: 'No se encontró el producto a actualizar' });
    }
    products[productIndex] = { ...products[productIndex], title, description, code, price, status, stock, category, thumbnails }
});

