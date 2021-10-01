import { applyMiddleware, createStore, compose, combineReducers, } from 'redux';
import thunk from 'redux-thunk';
import { cartCreateReducer, cartDetailsReducer, cartReducer, cartUpdateReducer } from './reducers/cartReducers';
import { categoryCreateReducer, categoryDeleteReducer, categoryDetailsReducer, categoryListReducer, categoryUpdateReducer } from './reducers/categoryReducer';
import { listMyOrdersReducer, orderCreateReducer, orderDeleteReducer, orderDeliverReducer, orderDetailsReducer, orderListReducer, orderPayReducer } from './reducers/orderReducers';
import { productCategoryListReducer, productCreateReducer, productDeleteReducer, productDetailsReducer, productListReducer, productReviewReducer, productUpdateReducer } from './reducers/productReducers';
import { shippingAddressMyListReducer,shippingAddressDetailsReducer, shippingAddressCreateReducer, shippingAddressUpdateReducer } from './reducers/shippingReducers';
import { userDeleteReducer, userDetailsReducer, userEditReducer, userListReducer, userRegisterReducer, userSignInReducer, userUpdateProfileReducer } from './reducers/userReducers';

const initialState = {
    userSignIn: {
        userInfo: localStorage.getItem('userInfo')
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null,
    },
    cartDetails: {
        cart: [],
    },
    
    
  
  /*  cart: {
        cartItems: localStorage.getItem('cartItems')
            ? JSON.parse(localStorage.getItem('cartItems'))
            : [],
        paymentMethod: null,
       
    },
/*
    cartDetails: {
        cart: localStorage.getItem('cartItems')
        ? JSON.parse(localStorage.getItem('cartItems'))
        : [],
    },
*/
};
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    categoryCreate: categoryCreateReducer,
    categoryList: categoryListReducer,
    categoryDetails: categoryDetailsReducer,
    categoryUpdate: categoryUpdateReducer,
    categoryDelete: categoryDeleteReducer,
    cart: cartReducer,
    cartCreate: cartCreateReducer,
    cartDetails: cartDetailsReducer,
    cartUpdate: cartUpdateReducer,
    shippingAddressCreate: shippingAddressCreateReducer,
    shippingAddressDetails: shippingAddressDetailsReducer,
    shippingAddressUpdate: shippingAddressUpdateReducer,
    shippingAddressMyList: shippingAddressMyListReducer,
    userSignIn: userSignInReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userEdit: userEditReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: listMyOrdersReducer,
    orderList: orderListReducer,
    orderDelete: orderDeleteReducer,
    orderDeliver: orderDeliverReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    productCategoryList: productCategoryListReducer,
    productReview: productReviewReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
);

export default store;
