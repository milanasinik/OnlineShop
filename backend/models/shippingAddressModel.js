import mongoose from 'mongoose';

const shippingAddressSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref:'User', required:true}
}, {
    timestamps:true,
});

const ShippingAddress = mongoose.model('ShippingAddress', shippingAddressSchema);
export default ShippingAddress;