// Importar dependencias
const express = require('express');
const Pelota = require('../models/products');

// Configurar las rutas
const router = express.Router();

// Obtener todas las pelotas
router.get('/', async (req, res) => {
    try {
        const pelotas = await Pelota.find();
        res.json(pelotas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener una pelota por su ID
router.get('/:id', getPelota, (req, res) => {
    res.json(res.pelota);
});

// Crear una pelota
router.post('/', async (req, res) => {
    const pelota = new Pelota({
        nombre: req.body.nombre,
        precio: req.body.precio,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
    });

    try {
        const nuevaPelota = await pelota.save();
        res.status(201).json(nuevaPelota);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar una pelota
router.patch('/:id', getPelota, async (req, res) => {
    if (req.body.nombre != null) {
        res.pelota.nombre = req.body.nombre;
    }
    if (req.body.precio != null) {
        res.pelota.precio = req.body.precio;
    }
    if (req.body.descripcion != null) {
        res.pelota.descripcion = req.body.descripcion;
    }
    if (req.body.imagen != null) {
        res.pelota.imagen = req.body.imagen;
    }

    try {
        const pelotaActualizada = await res.pelota.save();
        res.json(pelotaActualizada);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una pelota
router.delete('/:id', getPelota, async (req, res) => {
    try {
        await res.pelota.remove();
        res.json({ message: 'Pelota eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Middleware para obtener una pelota por su ID
async function getPelota(req, res, next) {
    let pelota;

    try {
        pelota = await Pelota.findById(req.params.id);
        if (pelota == null) {
            return res.status(404).json({ message: 'Pelota no encontrada' });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    res.pelota = pelota;
    next();
}

// Exportar el router
module.exports = router;
