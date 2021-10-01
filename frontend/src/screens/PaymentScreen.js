/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import CheckOutSteps from '../components/CheckOutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../actions/cartActions';
//import { detailsShipping } from '../actions/shippingActions';

export default function PaymentScreen(props) {
    /* const shippingAddressDetails = useSelector((state) => state.shippingAddressDetails);
    const {shippingAddress,} = shippingAddressDetails;
    if(!shippingAddress){
        props.history.push('/myaddress');
    }*/
    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        props.history.push('/placeorder');
    };
    return (
        <div>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Details</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="paypal"
                            value="PayPal"
                            name="paymentMethod"
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="stripe"
                            value="Stripe"
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            id="later"
                            value="PayLater"
                            name="paymentMethod"
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        ></input>
                        <label htmlFor="later">Pay Later</label>
                    </div>
                </div>
                <div>
                    <label></label>
                    <button className="primary" type="submit">
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
}