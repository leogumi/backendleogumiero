// models/ticket.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definir el esquema del Ticket
const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true
    },
    purchase_datetime: {
        type: Date,
        required: true,
        default: Date.now
    },
    amount: {
        type: Number,
        required: true
    },
    purchaser: {
        type: String,
        required: true
    }
});

// Crear el modelo Ticket a partir del esquema
const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
