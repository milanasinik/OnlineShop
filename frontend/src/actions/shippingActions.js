import Axios from 'axios';
import { SHIPPING_ADDRESS_CREATE_FAIL, SHIPPING_ADDRESS_CREATE_REQUEST, SHIPPING_ADDRESS_CREATE_SUCCESS, SHIPPING_ADDRESS_DETAILS_FAIL, SHIPPING_ADDRESS_DETAILS_REQUEST, SHIPPING_ADDRESS_DETAILS_SUCCESS, SHIPPING_ADDRESS_LIST_FAIL, SHIPPING_ADDRESS_LIST_REQUEST, SHIPPING_ADDRESS_LIST_SUCCESS, SHIPPING_ADDRESS_UPDATE_FAIL, SHIPPING_ADDRESS_UPDATE_REQUEST, SHIPPING_ADDRESS_UPDATE_SUCCESS } from '../constants/shippingConstants';

export const createShipping = () => async (dispatch, getState) => {
    dispatch({ type: SHIPPING_ADDRESS_CREATE_REQUEST });
    const { userSignIn: { userInfo }, } = getState();
    try {    
        const { data } = await Axios.post('/api/shippingaddress', {}, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: SHIPPING_ADDRESS_CREATE_SUCCESS, payload: data.shippingAddress });
      //ne radi nista..->  localStorage.setItem("shippingAddress", JSON.stringify(data.shippingAddress));
    }
    catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SHIPPING_ADDRESS_CREATE_FAIL, payload: message });
    }
};

export const detailsShipping = (shippingId) => async (dispatch, getState) => {
    dispatch({ type: SHIPPING_ADDRESS_DETAILS_REQUEST, payload: shippingId, });
    const { userSignIn: { userInfo }, } = getState();
    try {
        const { data } = await Axios.get(`/api/shippingaddress/${shippingId}`, {
            headers: { Authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: SHIPPING_ADDRESS_DETAILS_SUCCESS, payload: data });
    }
    catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SHIPPING_ADDRESS_DETAILS_FAIL, payload: message });
    }
};

export const listMyShippingAddresses = () => async (dispatch, getState) => {
    dispatch({ type: SHIPPING_ADDRESS_LIST_REQUEST });
    const { userSignIn: { userInfo }, } = getState();
    try {
        const { data } = await Axios.get('/api/shippingaddress/my', {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: SHIPPING_ADDRESS_LIST_SUCCESS, payload: data });
    }
    catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message;
        dispatch({ type: SHIPPING_ADDRESS_LIST_FAIL, payload: message });
    }
};

export const updateMyAddress = (address) => async (dispatch, getState) => {
    dispatch({type: SHIPPING_ADDRESS_UPDATE_REQUEST, payload: address});
    const {userSignIn: {userInfo},} = getState();
    try{
        const {data} = await Axios.put(`/api/shippingaddress/${address._id}`, address, {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        });
        dispatch({type:SHIPPING_ADDRESS_UPDATE_SUCCESS, payload: data});
        localStorage.setItem('shippingAddress', JSON.stringify(data));
    }
    catch(error){
        const message= 
        error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
        dispatch({type: SHIPPING_ADDRESS_UPDATE_FAIL, payload:message});
    }
};