

const express = require('express');
const router = express.Router();


router.get('/mockingproducts', (req, res) => {

    const products = [];
    for (let i = 1; i <= 100; i++) {
        const product = {
            id: i,
            name: `Producto ${i}`,
            price: Math.floor(Math.random() * 100) + 1,

        };
        products.push(product);
    }

    res.json(products);
});

module.exports = router;
