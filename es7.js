const fs = require('fs');



class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = [];
        this.lastId = 0;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            this.products = JSON.parse(data);
            this.lastId = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0);
        } catch (err) {
            console.error(`Error loading products from file: ${err}`);
        }
    }

    saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data, 'utf-8');
        } catch (err) {
            console.error(`Error saving products to file: ${err}`);
        }
    }

    addProduct(product) {
        if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
            console.error('Missing product information');
            return;
        }

        if (this.products.some(p => p.code === product.code)) {
            console.error('Product with same code already exists');
            return;
        }

        const newProduct = { ...product, id: ++this.lastId };
        this.products.push(newProduct);
        this.saveProducts();
        console.log(`Product with id ${newProduct.id} has been added`);
        return newProduct;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(p => p.id === id);
        if (!product) {
            console.error(`Product with id ${id} not found`);
            return null;
        }
        return product;
    }

    updateProduct(id, updatedFields) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            console.error(`Product with id ${id} not found`);
            return null;
        }

        const updatedProduct = { ...this.products[productIndex], ...updatedFields };
        this.products[productIndex] = updatedProduct;
        this.saveProducts();
        console.log(`Product with id ${id} has been updated`);
        return updatedProduct;
    }

    deleteProduct(id) {
        const productIndex = this.products.findIndex(p => p.id === id);
        if (productIndex === -1) {
            console.error(`Product with id ${id} not found`);
            return false;
        }

        this.products.splice(productIndex, 1);
        this.saveProducts();
        console.log(`Product with id ${id} has been deleted`);
        return true;
    }
}
const newProduct = ProductManager.addProduct

module.exports = ProductManager;


