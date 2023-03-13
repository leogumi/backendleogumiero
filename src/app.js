const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');

const productManager = new ProductManager('./productos.txt');

// Endpoint para obtener todos los productos
app.get('/products', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : null;
    const products = productManager.getProducts(limit);
    res.json(products);
});

// Endpoint para obtener un producto por su ID
app.get('/products/:pid', (req, res) => {
    const productId = req.params.pid;
    const product = productManager.getProductById(productId);
    if (!product) {
        return res.status(404).send('Product not found');
    }
    res.json(product);
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});
