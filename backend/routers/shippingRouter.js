import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import ShippingAddress from '../models/shippingAddressModel.js';
import { isAdmin, isAuth } from '../utils.js';

const shippingRouter = express.Router();

shippingRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async(req,res) =>{
        const shipping = await ShippingAddress.find({});
        res.send(shipping);
    })
);

shippingRouter.get(
    '/my',
    isAuth,
    expressAsyncHandler(async (req,res) => {
        const shipping = await ShippingAddress.find({user: req.user._id});
        res.send(shipping);
    })
)

shippingRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req,res) => {
        const shipping = await ShippingAddress.findById(req.params.id);
        if(shipping){
        res.send(shipping);
        }
        else{
            res.status(404).send.toString({message: 'Shipping address not found'});
        }
    })
);

shippingRouter.post(
    '/',
    isAuth,
    expressAsyncHandler(async(req,res) =>{
        const shippingAddress = new ShippingAddress({
            fullName:'sample name' + Date.now(),
            address: 'sample address',
            city: 'sample city',
            country: 'sample country',
            postalCode: 'sample postal code',
            user: req.user._id,
        });
        const createdShippingAddress = await shippingAddress.save();
        res.status(201).send({message:'New address created', shippingAddress: createdShippingAddress});
    })
);

shippingRouter.put(
    '/:id',
    isAuth,
    expressAsyncHandler(async(req,res)=> {
        const addressUpdate = await ShippingAddress.findById(req.params.id);
        if(addressUpdate){
            addressUpdate.fullName = req.body.fullName || addressUpdate.fullName;
            addressUpdate.address = req.body.address || addressUpdate.address;
            addressUpdate.city = req.body.city || addressUpdate.city;
            addressUpdate.country = req.body.country || addressUpdate.country;
            addressUpdate.postalCode = req.body.postalCode || addressUpdate.postalCode;

            const updatedAddress = await addressUpdate.save();
            res.send({
                _id: updatedAddress._id,
                fullName: updatedAddress.fullName,
                address: updatedAddress.address,
                city: updatedAddress.city,
                country: updatedAddress.country,
                postalCode: updatedAddress.postalCode,
            });
        }
    })
);

export default shippingRouter;