import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOrder, listOrders } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { ORDER_DELETE_RESET } from '../constants/orderConstants';

export default function OrderListScreen(props) {
    const orderList = useSelector((state) => state.orderList);
    const { loading, error, orders } = orderList;

    const orderDelete = useSelector((state) => state.orderDelete);
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = orderDelete;

    const dispatch = useDispatch();
    useEffect(() => {
        if(successDelete){
            dispatch({type:ORDER_DELETE_RESET});
        }
        dispatch(listOrders());
    }, [dispatch, successDelete]
    );
    // eslint-disable-next-line no-unused-vars
    const deleteHandler= (order) =>{
        if (window.confirm('Are you sure you want to delete this order?')){
            dispatch(deleteOrder(order._id));
        }
    };

    return (
        <div>
            <h1>Orders</h1>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MessageBox variant="danger">{errorDelete}</MessageBox>}
            {loading ? (<LoadingBox></LoadingBox>
            ): error ?( <MessageBox variant="danger">{error}</MessageBox>
                    ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>USER</th>
                                    <th>NUM PRODUCTS</th>
                                    <th>DATE</th>
                                    <th>TOTAL</th>
                                    <th>PAID</th>
                                    <th>DELIVERED</th>
                                    <th>ACTIONS</th>

                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                            
                                        <td>{order.user != null ? order.user.name : 'user deleted'}</td>
                                        <td>{order.orderItems.length}</td>
                                        <td>{order.createdAt.substring(0, 10)}</td>
                                        <td>{order.totalPrice} RSD</td>
                                        <td>{order.isPaid ? (
                                            <span className = "success">{order.paidAt.substring(0,10)}</span>) : (<span className="danger">Not Paid</span>)}</td>
                                        <td>{order.isDelivered ? (<span className = "success">{order.deliveredAt.substring(0,10)}</span>) : (<span className="danger">Not Delivered</span>)}</td>
                                        <td>
                                            <button
                                                type="button"
                                                className="small"
                                                onClick={() => { props.history.push(`/order/${order._id}`) }}
                                            >
                                                Details
                                        </button>
                                            <button
                                                type="button"
                                                className="small-d"
                                                onClick={() => deleteHandler(order)}
                                            >
                                                Delete
                                        </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
            }
        </div>
    );
}