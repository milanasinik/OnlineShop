import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { createOrder } from '../actions/orderActions';
import CheckOutSteps from '../components/CheckOutSteps';
import { ORDER_CREATE_RESET } from '../constants/orderConstants';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
export default function PlaceOrderScreen(props) {

    const cart = useSelector((state) => state.cart);
    const {cartItems, } =cart;
    const shippingDetails = useSelector((state) => state.shippingAddressDetails);
    const {shippingAddress, } = shippingDetails;
    if (!cart.paymentMethod) {
        props.history.push('/payment');
    }

    const orderCreate = useSelector((state) => state.orderCreate);
    const { loading, success, error, order } = orderCreate;

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce((a, c) =>
            a + c.qty * c.price, 0)
    );
    cart.shippingPrice = cart.itemsPrice > 10000 ? toPrice(0) : toPrice(10);
    cart.taxPrice = toPrice(0.10 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const dispatch = useDispatch();
    const placeOrderHandler = () => {
        //dispatch(createOrder({ ...cart, orderItems: cart.cartItems, shippingAddress: cart.shippingAddress._id}));
        dispatch(createOrder({... cart, orderItems: cartItems, shippingAddress: shippingAddress}));
    };

    useEffect(() => {
        if (success) {
            props.history.push(`/order/${order._id}`);
            dispatch({ type: ORDER_CREATE_RESET });
        }
    }, [dispatch, order, props.history, success]);
    return (
        <div>
            <CheckOutSteps step1 step2 step3></CheckOutSteps>
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2> Shipping</h2>
                                <p>
                                    <strong>Name:</strong> {shippingAddress.fullName}<br />
                                            <strong>Address:</strong> {shippingAddress.address},
                                    {shippingAddress.city}, {shippingAddress.country},
                                    {shippingAddress.postalCode}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2> Payment</h2>
                                <p>
                                    <strong>Method:</strong> {cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2> Order Items</h2>
                                <ul>
                                    {cart.cartItems.map((item) => (
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
                                    <div>RSD {cart.itemsPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Shipping</div>
                                    <div>RSD {cart.shippingPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Tax</div>
                                    <div>RSD {cart.taxPrice}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div><strong>Order Total</strong> </div>
                                    <div><strong>RSD {cart.totalPrice}</strong></div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type="primary"
                                    onClick={placeOrderHandler}
                                    className="primary block"
                                    disabled={cart.cartItems.length === 0}>
                                    Place Order
                                    </button>
                            </li>
                            {loading && <LoadingBox></LoadingBox>}
                            {error && <MessageBox variant="danger">{error}</MessageBox>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}