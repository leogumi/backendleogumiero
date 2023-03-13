const express = require('express');
const router = express.Router();
const productsData = require('../data/products');

// Ruta GET para obtener todos los productos
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit) || productsData.length;
    const products = productsData.slice(0, limit);
    res.json(products);
});

// Ruta GET para obtener un producto por ID
router.get('/:pid', (req, res) => {
    const product = productsData.find(p => p.id == req.params.pid);
    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
});

// Ruta POST para agregar un nuevo producto
router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;
    if (!title || !description || !code || !price || !stock || !category) {
        res.status(400).json({ message: 'Faltan campos obligatorios' });
    } else {
        const newProduct = {
            id: productsData.length + 1,
            title,
            description,
            code,
            price,
            status: true,
            stock,
            category,
            thumbnails
        };
        productsData.push(newProduct);
        res.status(201).json(newProduct);
    }
});

// Ruta PUT para actualizar un producto existente
router.put('/:pid', (req, res) => {
    const productIndex = productsData.findIndex(p => p.id == req.params.pid);
    if (productIndex === -1) {
        res.status(404).json({ message: 'Producto no encontrado' });
    } else {
        const product = productsData[productIndex];
        const { title, description, code, price, status, stock, category, thumbnails } = req.body;
        product.title = title || product.title;
        product.description = description || product.description;
        product.code = code || product.code;
        product.price = price || product.price;
        product.status = status !== undefined ? status : product.status;
        product.stock = stock || product.stock;
        product.category = category || product.category;
        product.thumbnails = thumbnails || product.thumbnails;
        res.json(product);
    }
});

// Ruta DELETE para eliminar un producto existente
router.delete('/:pid', (req, res) => {
    const productIndex = productsData.findIndex(p => p.id == req.params.pid);
    if (productIndex === -1) {
        res.status(404).json({ message: 'Producto no encontrado' });
    }
    else {
        productsData
    }
}); 