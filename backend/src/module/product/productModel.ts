import mongoose from 'mongoose'

const product = new mongoose.Schema({
    ProductName: {
    type: String,
    required: true,
  },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});
const Product = mongoose.model('Product', product);

export default Product;