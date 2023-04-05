// dao/products/products-fs.js
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');

const getAll = () => {
    try {
        const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
        return products;
    } catch (error) {
        console.log('Error leyendo archivo de productos', error);
        return null;
    }
};

module.exports = {
    getAll
};
