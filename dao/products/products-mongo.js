// dao/products/products-mongo.js
const Product = require('./models/product');

const getAll = async () => {
    try {
        const products = await Product.find();
        return products;
    } catch (error) {
        console.log('Error obteniendo productos de MongoDB', error);
        return null;
    }
};

module.exports = {
    getAll
};
