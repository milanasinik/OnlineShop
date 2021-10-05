import { CART_ADD_ITEM_FAIL, CART_ADD_ITEM_SUCCESS,CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants";
import Axios from "axios";

export const addToCart = ( productId, qty) => async(dispatch, getState) =>{
    const {data} = await Axios.get(`/api/products/${productId}`);
    const{
      cart: {cartItems},
    } = getState();
    if (cartItems.qty == 0){
      dispatch({
        type: CART_ADD_ITEM_FAIL,
        payload: 
        'Failed to add to cart',
      });
    }
    else{
      dispatch({
        type: CART_ADD_ITEM_SUCCESS,
        payload:{
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty,
        },
    });  
      localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));

    }
};

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
