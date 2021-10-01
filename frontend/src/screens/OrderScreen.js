import Axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deliverOrder, detailsOrder, payOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELIVER_RESET } from '../constants/orderConstants';

export default function OrderScreen(props) {
    const orderId = props.match.params.id;
    const [sdkReady, setSdkReady] = useState(false);
    const orderDetails = useSelector((state) => state.orderDetails);
    const { order, loading, error } = orderDetails;
    const userSignIn = useSelector((state) => state.userSignIn);
    const { userInfo, } = userSignIn;

    const shippingAddressDetails = useSelector((state) => state.shippingAddressDetails);
    // eslint-disable-next-line no-unused-vars
    const {shippingAddress : shippingInfo, } = shippingAddressDetails;

    const orderPay = useSelector(state => state.orderPay);
    const {
        loading: loadingPay,
        error: errorPay,
        success: successPay
    } = orderPay;
    const orderDeliver = useSelector((state) => state.orderDeliver);
    const {
        loading: loadingDeliver,
        error: errorDeliver,
        success: successDeliver
    } = orderDeliver;
    const dispatch = useDispatch();
    useEffect(() => {
        if (!order){
        dispatch(detailsOrder(orderId));
        }
       /* if(!shippingInfo){
        dispatch(detailsShipping(order.shippingAddress._id));
        }*/
    }, [dispatch, order, shippingInfo]);

   
    //PAYPAL    
    useEffect(() => {
        const addPayPalScript = async () => {
            const { data } = await Axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };
        if (
            !order ||
            successPay ||
            successDeliver ||
            (order && order._id !== orderId)
        )
         {
            //dispatch({ type: ORDER_PAY_RESET });
            dispatch({ type: ORDER_DELIVER_RESET });
            //******PAYPAL GRESKA!!!!
            //sdispatch(detailsOrder(orderId));
        }
        else {
            if (!order.isPaid) {
                if (!window.paypal) {
                    addPayPalScript();
                }
                else {
                    setSdkReady(true);
                }
            }
        }
    }, [dispatch, order, orderId, sdkReady, successPay, successDeliver]);

    const successPaymentHandler = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
    };

    const deliverHandler = () => {
        dispatch(deliverOrder(order._id));
    };
    return loading ? (<LoadingBox></LoadingBox>)
        :
        error ? (<MessageBox variant="danger">{error}</MessageBox>)
            :
            (
                <div>
                    <h1>Order {order._id}</h1>
                    <div className="row top">
                        <div className="col-2">
                            <ul>
                                <li>
                                    <div className="card card-body">
                                        <h2> Shipping</h2>
                                        <p>
                                            <strong>Name:</strong> {order.shippingAddress.fullName}<br />
                                            <strong>Address:</strong> {order.shippingAddress.address},
                                            {order.shippingAddress.city}, {order.shippingAddress.country},
                                            {order.shippingAddress.postalCode}
                                        </p>
                                        {order.isDelivered ? (
                                            <MessageBox variant="success">
                                                Delivered at {order.deliveredAt}
                                            </MessageBox>
                                        ) : (
                                            <MessageBox variant="danger">
                                                Not Delivered
                                            </MessageBox>
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2> Payment</h2>
                                        <p>
                                            <strong>Method:</strong> {order.paymentMethod}
                                        </p>
                                        {order.isPaid ? (
                                            <MessageBox variant="success">
                                                Paid at {order.paidAt}
                                            </MessageBox>
                                        ) : (
                                            <MessageBox variant="danger">
                                                Not Paid
                                            </MessageBox>
                                        )}
                                    </div>
                                </li>
                                <li>
                                    <div className="card card-body">
                                        <h2> Order Items</h2>
                                        <ul>
                                            {order.orderItems.map((item) => (
                                                <li key={item.product}>
                                                    <div className="row">
                                                        <div>
                                                            <img
                                                                src={item.image}
                                                                alt={item.name}
                                                                className="small"
                                                            ></img>
                                                        </div>
                                                        <div className="min-30">
                                                            <Link to={`/product/${item.product}`} >{item.name}</Link>
                                                        </div>
                                                        <div>
                                                            {item.qty} x RSD{item.price} = RSD{item.price * item.qty}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="col-1">
                            <div className="card card-body">
                                <ul>
                                    <li>
                                        <h2>Order Summary</h2>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Items</div>
                                            <div>RSD {order.itemsPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Shipping</div>
                                            <div>RSD {order.shippingPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div>Tax</div>
                                            <div>RSD {order.taxPrice}</div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="row">
                                            <div><strong>Order Total</strong> </div>
                                            <div><strong>RSD {order.totalPrice}</strong></div>
                                        </div>
                                    </li>
                                    {
                                        !order.isPaid && (
                                            <li>
                                                {!sdkReady ? (<LoadingBox></LoadingBox>)
                                                    : (
                                                        <>
                                                            {errorPay && (
                                                                <MessageBox
                                                                    variant="danger">
                                                                    {errorPay}
                                                                </MessageBox>
                                                            )
                                                            }
                                                            {loadingPay && <LoadingBox></LoadingBox>}

                                                            <PayPalButton
                                                                amount={order.totalPrice}
                                                                onSuccess={successPaymentHandler}>
                                                            </PayPalButton>
                                                        </>
                                                    )}
                                            </li>
                                        )
                                    }
                                    {userInfo.isAdmin && !order.isDelivered && (
                                        <li>
                                            {loadingDeliver && <LoadingBox></LoadingBox>}
                                            {errorDeliver && <MessageBox variant="danger">{errorDeliver}</MessageBox>}
                                            <button type="button" className="primary block" onClick={deliverHandler}>
                                                Deliver Order
                                            </button>

                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
}