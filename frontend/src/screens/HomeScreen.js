import React, { useEffect } from 'react';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { useDispatch, useSelector} from 'react-redux';
import { listProducts} from '../actions/productActions';
import { SHIPPING_ADDRESS_DETAILS_RESET, SHIPPING_ADDRESS_UPDATE_RESET } from '../constants/shippingConstants';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const {loading, error, products} = productList;

  useEffect(() => {
     dispatch(listProducts());
     dispatch({type: SHIPPING_ADDRESS_DETAILS_RESET});
     dispatch({type:SHIPPING_ADDRESS_UPDATE_RESET});
  }, [dispatch]);
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) :
        error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
          <div className="row center">
            {
              products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))
            }
          </div>
          </>
        )}
    </div>
  );
}