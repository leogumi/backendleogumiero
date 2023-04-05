// services/products.js
const productsDao = require('../dao/products/products-mongo');

const getAllProducts = async () => {
    const products = await productsDao.getAll();
    return products;
};

module.exports = {
    getAllProducts
};
