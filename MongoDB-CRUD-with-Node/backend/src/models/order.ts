import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: false,
  },
  products: {
    type: Array,
    required: true,
  },
});

const OrderModel = mongoose.model('order', OrderSchema);

export default OrderModel;
