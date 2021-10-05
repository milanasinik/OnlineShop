import mongoose from 'mongoose';
import Product from './productModel.js';

const categorySchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    description: {type: String, required: true},
}, {
    timeStamps:true,
});

categorySchema.pre('remove', function(next){
    Product.remove({category : this._id}).exec();
    next();
});

const Category = mongoose.model('Category', categorySchema);
export default Category;

