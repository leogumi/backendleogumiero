const express = require('express');
const router = express.Router();
const { generateId } = require('../utils');
const carts = [];

//Crear un nuevo carrito
router.post('/', (req, res) => {
    const newCart = {
        id: generateId(),
        products: []
    };
    carts.push(newCart);
    res.status(201).json(newCart);
});

//Listar los productos que pertenezcan al carrito con el parámetro cid proporcionados.
router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = carts.find(c => c.id === cid);
    if (!cart) {
        res.status(404).json({ message: 'Cart not found' });
    } else {
        res.json(cart.products);
    }
});

//Agregar el producto al arreglo “products” del carrito seleccionado
router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const cart = carts.find(c => c.id === cid);
    if (!cart) {
        res.status(404).json({ message: 'Cart not found' });
    } else {
        const product = { id: pid, quantity: 1 };
        cart.products.push(product);
        res.status(201).json(cart);
    }
});

module.exports = router;
