/* eslint-disable no-case-declarations */
import {CART_ADD_ITEM_FAIL, CART_ADD_ITEM_REQUEST, CART_ADD_ITEM_SUCCESS, CART_CREATE_FAIL, CART_CREATE_REQUEST, CART_CREATE_RESET, CART_CREATE_SUCCESS, CART_DETAILS_FAIL, CART_DETAILS_REQUEST, CART_DETAILS_RESET, CART_DETAILS_SUCCESS, CART_EMPTY, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_UPDATE_FAIL, CART_UPDATE_REQUEST, CART_UPDATE_SUCCESS } from "../constants/cartConstants";
export const cartCreateReducer = (state = {}, action) => {
    switch (action.type){
        case CART_CREATE_REQUEST:
            return {loading: true};
        case CART_CREATE_SUCCESS:
            return {loading:false, success: true, cart: action.payload};
        case CART_CREATE_FAIL:
            return {loading:false, error: action.payload};
        case CART_CREATE_RESET:
            return {};
        default:
            return state;
    }
};

export const cartUpdateReducer = (state ={cartItems:[]}, action) => {
    switch(action.type){
        case CART_UPDATE_REQUEST:
            return {loading: true};
        case CART_UPDATE_SUCCESS:
            const item = action.payload;
            const existItem = state.cart.cartItems.find((x) => x.product === item.product);
            if (existItem){
                return{
                    ...state, cart: state.cart.map((x) =>
                    x.product === existItem.product ?
                    item : x),
                };
            }
            else {
                return {
                    ...state, cart: [...state.cartItems, item]
                };
            }
            //return {loading:false, cartItems:action.payload};
        case CART_UPDATE_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
};

export const cartDetailsReducer = (state = {loading:true}, action) => {
    switch(action.type){
        case CART_DETAILS_REQUEST:
            return {loading: true};
        case CART_DETAILS_SUCCESS:
            return {loading:false, success: true, cart: action.payload};
        case CART_DETAILS_FAIL:
            return {loading:false, error: action.payload};
            case CART_DETAILS_RESET:
                return {};
        default:
            return state;
    }
};

export const cartReducer = (state = { cartItems: [],  paymentMethod: {} }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM_REQUEST:
            return{loading:true};
        case CART_ADD_ITEM_SUCCESS:
            const item = action.payload;
            const existItem = state.cartItems.find((x) => x.product === item.product);
            if (existItem) {
                return {
                    ...state, cartItems: state.cartItems.map((x) =>
                        x.product === existItem.product ?
                            item : x),
                };
            }
            else {
                return {
                    ...state, cartItems: [...state.cartItems, item]
                };
            }
        case CART_ADD_ITEM_FAIL:
            return {loading: false, error: action.payload};
        case CART_REMOVE_ITEM:
            return{
                ...state, 
                cartItems: state.cartItems.filter((x)=> x.product !== action.payload)
            };
       /* case CART_SAVE_SHIPPING_ADDRESS:
            return{
                ...state, shippingAddress: {...action.payload}
            };*/
        case CART_SAVE_PAYMENT_METHOD:
            return{
                ...state, paymentMethod: (' ' + action.payload).slice(1)
            };
        case CART_EMPTY:
            return{
                ...state, cartItems: []
            };
        default:
            return state;
    }
};