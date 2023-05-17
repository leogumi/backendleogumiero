const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    items: [{
        product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        quantity: { type: Number, required: true, min: 1 }
    }],
    totalPrice: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('Cart', messagesSchema);

const Product = require('../dao/models/Product');

function getAllProducts() {
    return Product.find();
}

function getProductById(id) {
    return Product.findById(id);
}

function addProduct(product) {
    const newProduct = new Product(product);
    return newProduct.save();
}

function updateProduct(id, product) {
    return Product.findByIdAndUpdate(id, product);
}

function deleteProduct(id) {
    return Product.findByIdAndDelete(id);
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};

