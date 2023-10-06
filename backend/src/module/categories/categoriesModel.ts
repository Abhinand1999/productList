import mongoose from 'mongoose'
const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  }],
  count: {
    type: Number,
    default: 0, 
  }
  
});

const Category = mongoose.model('Category', categorySchema);

export default Category;
