/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Obtiene todos los productos.
 *     responses:
 *       200:
 *         description: OK
 *   post:
 *     summary: Crea un nuevo producto.
 *     responses:
 *       201:
 *         description: Producto creado correctamente.
 *       400:
 *         description: Error al crear el producto.
 *
 * /api/products/{id}:
 *   get:
 *     summary: Obtiene un producto por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a obtener.
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Producto no encontrado.
 *   put:
 *     summary: Actualiza un producto existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a actualizar.
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente.
 *       400:
 *         description: Error al actualizar el producto.
 *       404:
 *         description: Producto no encontrado.
 *   delete:
 *     summary: Elimina un producto existente.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a eliminar.
 *     responses:
 *       204:
 *         description: Producto eliminado correctamente.
 *       404:
 *         description: Producto no encontrado.
 */
