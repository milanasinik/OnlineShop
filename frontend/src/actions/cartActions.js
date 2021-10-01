import { CART_CREATE_REQUEST, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_CREATE_FAIL, CART_CREATE_SUCCESS, CART_ADD_ITEM_SUCCESS, CART_DETAILS_REQUEST, CART_DETAILS_FAIL, CART_DETAILS_SUCCESS, CART_UPDATE_REQUEST, CART_UPDATE_FAIL, CART_UPDATE_SUCCESS, /*CART_SAVE_SHIPPING_ADDRESS*/ } from "../constants/cartConstants";
import Axios from 'axios';

export const createCart = () => async (dispatch, getState) => {
    dispatch({ type: CART_CREATE_REQUEST});
    try {
        const { userSignIn: { userInfo }, } = getState();
        const { data } = await Axios.post('/api/carts/create', {}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: CART_CREATE_SUCCESS, payload: data });
    }
    catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({
            type: CART_CREATE_FAIL, payload: message

        });
    }
};

export const detailsCart = (cartId) => async(dispatch, getState) => {
    dispatch({type: CART_DETAILS_REQUEST });
    const {userSignIn : {userInfo}, }= getState();
    try{
        const{data} = await Axios.get(`/api/carts/${cartId}`, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({type: CART_DETAILS_SUCCESS, payload:data});
    }
    catch(error){
        const message=
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({type: CART_DETAILS_FAIL, payload: message});
    }
};

export const updateCart = (cart) => async(dispatch, getState) => {
    dispatch({type: CART_UPDATE_REQUEST});
    const {userSignIn: {userInfo},} = getState();
    try{
            const {data} = await Axios.put(`/api/carts/${cart._id}`,
            cart, {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                },
            });
            dispatch({type: CART_UPDATE_SUCCESS, payload: data});
        }
    catch(error){
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
                dispatch({type: CART_UPDATE_FAIL, payload: message});
    }
}
/*payload:{
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            product: data._id,
            qty,
        },
export const addToCart = (cart, productId, qty) => async (dispatch, getState) => {
    dispatch({ type: CART_ADD_ITEM_REQUEST, payload: { cart, productId, qty } });
    const { userSignIn: { userInfo }, } = getState();
    try {
        const { data } = await Axios.get(`/api/products/${productId}`);
        const { cart } = await Axios.put(`/api/carts/${cart._id}`, { productId, qty }, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({
            type: CART_ADD_ITEM_SUCCESS, payload: {
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
    catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: CART_ADD_ITEM_FAIL, payload: message });
    }
};*/
export const addToCart = ( productId, qty) => async(dispatch, getState) =>{
    const {data} = await Axios.get(`/api/products/${productId}`);
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
    localStorage.setItem('cartItems', JSON.stringify(getState().cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
    dispatch({ type: CART_REMOVE_ITEM, payload: productId });
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};

