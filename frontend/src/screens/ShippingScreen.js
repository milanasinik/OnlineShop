/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsShipping, createShipping, updateMyAddress } from '../actions/shippingActions';
import CheckOutSteps from '../components/CheckOutSteps';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { SHIPPING_ADDRESS_UPDATE_RESET } from '../constants/shippingConstants';

export default function ShippingScreen(props) {
    const shippingId = props.match.params.id;
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo, } = userSignIn;
    
    const shippingAddressDetails = useSelector((state) => state.shippingAddressDetails);
    const { loading, error, shippingAddress } = shippingAddressDetails;
    const shippingAddressUpdate = useSelector((state) => state.shippingAddressUpdate);
    const {
        loading: loadingUpdate,
        success: successUpdate,
        error: errorUpdate,
    } = shippingAddressUpdate;

    if (!userInfo) {
        props.history.push('/signin');
    }
    const dispatch = useDispatch();
    useEffect(() => {
         if (successUpdate) {
            props.history.push('/payment');
        }
        if (!shippingAddress || shippingAddress._id !== shippingId || successUpdate) {
            dispatch({type: SHIPPING_ADDRESS_UPDATE_RESET});
            dispatch(detailsShipping(shippingId));
        }
       
        else {
            setFullName(shippingAddress.fullName);
            setAddress(shippingAddress.address);
            setCity(shippingAddress.city);
            setCountry(shippingAddress.country);
            setPostalCode(shippingAddress.postalCode);
        }
    }, [dispatch, shippingId, shippingAddress, props.history, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(
            updateMyAddress({
                _id: shippingId,
                fullName,
                address,
                city,
                country,
                postalCode,
            })
        );
    };

    return (
        <div>
            <CheckOutSteps step1 step2></CheckOutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Shipping Address</h1>
                </div>
                {loadingUpdate && <LoadingBox></LoadingBox>}
                {errorUpdate && <MessageBox>{errorUpdate}</MessageBox>}
                {loading ? (
                    <LoadingBox></LoadingBox>
                ) : error? (
                    <MessageBox >{error}</MessageBox>
                ) : (
                    <>
                <div>
                    <label htmlFor="fullName">Full name:</label>
                    <input
                        type="text"
                        id="fullName"
                        placeholder="Enter full name"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="address">Address:</label>
                    <input
                        type="text"
                        id="address"
                        placeholder="Enter address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="city">City:</label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Enter city"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="country">Country:</label>
                    <input
                        type="text"
                        id="country"
                        placeholder="Enter country"
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label htmlFor="postalCode">Postal code:</label>
                    <input
                        type="text"
                        id="postalCode"
                        placeholder="Enter postal code"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}>
                    </input>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit">
                        Submit
                    </button>
                </div>
                </>
                )}
            </form>
        </div>
    );
}