import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Cart from '../models/cartModel.js';
import { isAuth } from '../utils.js';

const cartRouter = express.Router();

cartRouter.get(
    '/my',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const cart = await Cart.find({user: req.user._id});
        if (cart){
            res.send(cart);
        }
        else{
            res.status(404).send({message: 'Cart not found'});
        }
    })
);/*
cartRouter.get(
    '/:id',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const cart = await Cart.findById(req.params.id);
        if (cart){
            res.send(cart);
        }
        else{
            res.status(404).send({message: 'Cart not found'});
        }
    })
);*/
cartRouter.post(
    '/create',
    isAuth,
    expressAsyncHandler(async(req,res) => {
        const user = await Cart.find({user: req.user._id});
        if (user){
            res.status(403).send({message: "User already has a cart"});
        }
        const cart = new Cart({
            cartItems: req.body.cartItems,
            user: req.user._id,
        });
        const createdCart = await cart.save();
        res.status(201).send({message: 'Cart created!', cart: createdCart});
    })
);

cartRouter.put(
    '/my',
    isAuth,
    expressAsyncHandler(async(req,res) => {
      //  const cartId = req.params.id;
        const cart = await Cart.find({user: req.user._id});
        if(cart){
            cart.cartItems = {
                id: req.body.id,
                name: req.body.name ,
                qty: req.body.qty ,
                image: req.body.image ,
                price: req.body.price ,//|| cart.cartItems.price,
                product: req.body.product,
            };

            const updatedCart = await cart.save();
            res.send({
                message: "Updated Cart", cart: updatedCart });
        }
        else{
            res.status(404).send({message: 'Cart not found'});
        }
    })
);

export default cartRouter;