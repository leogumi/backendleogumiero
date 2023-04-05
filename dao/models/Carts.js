const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true, min: 1 }
  }],
  totalPrice: { type: Number, required: true, min: 0 }
});

module.exports = mongoose.model('Cart', cartSchema);
