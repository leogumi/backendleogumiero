
const ProductManager = require('./ProductManager.js');

const productManager = new ProductManager('./package.json');


// Agregar un producto
const newProduct = ProductManager.addProduct({
  title: "Spalding",
  description: 'Pelota de cuero basket NBA',
  price: 150,
  thumbnail: './fotos/spaldingnba',
  code: 'PelotaNba',
  stock: 200
});

const express = require('express');
const app = express();
const ProductManager = require('./ProductManager');


app.get('/products', (req, res) => {
  const limit = req.query.limit;
  const products = productManager.getProducts();

  if (limit) {
    res.send(products.slice(0, limit));
  } else {
    res.send(products);
  }
});

app.get('/products/:pid', (req, res) => {
  const productId = req.params.pid;
  const product = productManager.getProductById(productId);

  if (!product) {
    return res.status(404).send('Product not found');
  }

  res.send(product);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
