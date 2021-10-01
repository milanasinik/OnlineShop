import {  SHIPPING_ADDRESS_CREATE_FAIL, SHIPPING_ADDRESS_CREATE_REQUEST, SHIPPING_ADDRESS_CREATE_RESET, SHIPPING_ADDRESS_CREATE_SUCCESS, SHIPPING_ADDRESS_DETAILS_FAIL, SHIPPING_ADDRESS_DETAILS_REQUEST, SHIPPING_ADDRESS_DETAILS_RESET, SHIPPING_ADDRESS_DETAILS_SUCCESS, SHIPPING_ADDRESS_LIST_FAIL, SHIPPING_ADDRESS_LIST_REQUEST, SHIPPING_ADDRESS_LIST_SUCCESS, SHIPPING_ADDRESS_UPDATE_FAIL, SHIPPING_ADDRESS_UPDATE_REQUEST, SHIPPING_ADDRESS_UPDATE_RESET, SHIPPING_ADDRESS_UPDATE_SUCCESS } from "../constants/shippingConstants";

export const shippingAddressCreateReducer = ( state = {}, action) => {
    switch(action.type){
        case SHIPPING_ADDRESS_CREATE_REQUEST:
            return {loading:true};
        case SHIPPING_ADDRESS_CREATE_SUCCESS:
            /*return{
                ...state, shippingAddress: {...action.payload}
            };*/
            return {loading:false, success: true, shippingAddress: action.payload};
        case SHIPPING_ADDRESS_CREATE_FAIL:
            return {loading:false, error: action.payload};
        case SHIPPING_ADDRESS_CREATE_RESET:
            return{};
        default:
            return state;
    }
};

export const shippingAddressDetailsReducer = ( state= {loading:true}, action) => {
    switch(action.type){
        case SHIPPING_ADDRESS_DETAILS_REQUEST:
            return {loading: true};
        case SHIPPING_ADDRESS_DETAILS_SUCCESS:
            return {loading: false, shippingAddress: action.payload};
        case SHIPPING_ADDRESS_DETAILS_FAIL:
            return {loading:false, error: action.payload};
        case SHIPPING_ADDRESS_DETAILS_RESET:
            return {};
        default:
            return state;
    }
};

export const shippingAddressUpdateReducer = (state = {}, action)=> {
    switch(action.type){
        case SHIPPING_ADDRESS_UPDATE_REQUEST:
            return {loading:true};
        case SHIPPING_ADDRESS_UPDATE_SUCCESS:
            return {loading: false, success:true};
        case SHIPPING_ADDRESS_UPDATE_FAIL:
            return {loading:false, error: action.payload};
        case SHIPPING_ADDRESS_UPDATE_RESET:
            return {};
        default:
            return state;
    }
}

export const shippingAddressMyListReducer = (state = {addresses:[]}, action) => {
    switch(action.type){
        case SHIPPING_ADDRESS_LIST_REQUEST:
        return {loading:true};
        case SHIPPING_ADDRESS_LIST_SUCCESS:
            return {loading:false, addresses: action.payload};
        case SHIPPING_ADDRESS_LIST_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
};