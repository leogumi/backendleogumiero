// routes/carts.js

const express = require('express');
const router = express.Router();
const Cart = require('../dao/carts'); // Importar el DAO de carts
const Product = require('../dao/products'); // Importar el DAO de products
const TicketService = require('../services/ticketService'); // Importar el servicio de Tickets

// Ruta para finalizar el proceso de compra de un carrito
router.post('/:cid/purchase', async (req, res) => {
    try {
        const cartId = req.params.cid;
        const cart = await Cart.getById(cartId); // Obtener el carrito por su ID

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const products = cart.products; // Obtener los productos del carrito
        const productsNotPurchased = []; // Almacenar los productos no comprados

        for (const item of products) {
            const product = await Product.getById(item.productId); // Obtener el producto por su ID

            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            // Verificar si el producto tiene suficiente stock
            if (product.stock >= item.quantity) {
                // Restar la cantidad del producto al stock
                product.stock -= item.quantity;
                await Product.update(product); // Actualizar el producto en la base de datos
            } else {
                // Agregar el producto al arreglo de productos no comprados
                productsNotPurchased.push(item.productId);
            }
        }

        // Generar el ticket con los datos de la compra
        const ticket = await TicketService.generateTicket(cart);

        // Actualizar el carrito del usuario con los productos no comprados
        cart.products = productsNotPurchased;
        await Cart.update(cart);

        return res.status(200).json({ message: 'Compra realizada con éxito', ticket });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Error en el servidor' });
    }
});

module.exports = router;

/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Obtiene el carrito de compras actual del usuario.
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     summary: Agrega un producto al carrito de compras.
 *     requestBody:
 *       description: Producto a agregar al carrito.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       201:
 *         description: Producto agregado al carrito correctamente.
 *       400:
 *         description: Error al agregar el producto al carrito.
 *
 * /api/carts/{id}:
 *   delete:
 *     summary: Elimina un producto del carrito de compras.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a eliminar del carrito.
 *     responses:
 *       204:
 *         description: Producto eliminado del carrito correctamente.
 *       404:
 *         description: Producto no encontrado en el carrito.
 */


