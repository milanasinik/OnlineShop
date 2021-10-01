import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createShipping, listMyShippingAddresses } from '../actions/shippingActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { SHIPPING_ADDRESS_CREATE_RESET, SHIPPING_ADDRESS_DETAILS_RESET } from '../constants/shippingConstants';

export default function ShippingListScreen(props){
const shippingAddressMyList = useSelector((state) => state.shippingAddressMyList);
const {loading, error, addresses} = shippingAddressMyList;
const shippingAddressCreate = useSelector((state) => state.shippingAddressCreate);
const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    shippingAddress: createdShipping,
} = shippingAddressCreate;

const dispatch = useDispatch();
useEffect(() => {
    dispatch({type: SHIPPING_ADDRESS_DETAILS_RESET});
    if (successCreate) {
        dispatch({type: SHIPPING_ADDRESS_CREATE_RESET});
        props.history.push(`/shipping/${createdShipping._id}/edit`);
    }
    dispatch(listMyShippingAddresses());
}, [dispatch, createdShipping, props.history, successCreate]);

const createHandler= () => {
    dispatch(createShipping());
};

return(
    <div>
        <div className="row">
        <h1> My addresses</h1>
        <button type="button" className="small"
        onClick={createHandler}>
            Create new address
        </button>
        </div>
        {loadingCreate && <LoadingBox></LoadingBox>}
        {errorCreate && <MessageBox>{errorCreate}</MessageBox>}
        {loading? (<LoadingBox></LoadingBox>)
       : error?( <MessageBox>{error}</MessageBox>)
       : (
           <table className = "table">
               <thead>
                   <tr>
                       <th>FULL NAME</th>
                       <th>ADDRESS</th>
                       <th>CITY</th>
                       <th>COUNTRY</th>
                       <th>POSTAL CODE</th>
                   </tr>
               </thead>
               <tbody>
                   {addresses.map((myAddress) =>(
                       <tr key={myAddress._id}>
                           <td>{myAddress.fullName}</td>
                           <td>{myAddress.address}</td>
                           <td>{myAddress.city}</td>
                           <td>{myAddress.country}</td>
                           <td>{myAddress.postalCode}</td>
                           <td>
                               <button type="button" className="small"
                               onClick={() => {props.history.push(`/shipping/${myAddress._id}/edit`)}}>
                                   Select
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