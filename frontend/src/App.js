import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import SignInScreen from './screens/SignInScreen';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ShippingListScreen from './screens/ShippingAddressListScreen';
import CategoryListScreen from './screens/CategoryListScreen';
import CategoryEditScreen from './screens/CategoryEditScreen';
import SearchBox from './components/SearchBox';
import SearchScreen from './screens/SearchScreen';
//import { listProductCategories } from './actions/productActions';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import { listCategories } from './actions/categoryActions';

function App() {

  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  
    const cartDetails = useSelector((state) => state.cart);
    const {cartItems} = cartDetails;
    

  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signout());
  };
  const categoryList = useSelector((state) => state.categoryList);
  const {loading: loadingCategories,
    error:errorCategories,
    categories : allCategories} = categoryList;
  useEffect(() => {
    dispatch(listCategories());

  }, [dispatch]);

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <button
            type="button"
            className="open-sidebar"
            onClick={() => setSidebarIsOpen(true)}>
              <i className=" fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">Hamp Packs</Link>
          </div>
          <div>
            <Route
              render={({ history }) => <SearchBox history={history}></SearchBox>}
            ></Route>
          </div>
          <div className="rowheader">
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
                <span className="badge">{cartItems.length}</span>)}
              <></>
            </Link>
            {
              userInfo ? (
                <div className="dropdown">
                  <Link to="#">
                    {userInfo.name}  <i className="fa fa-caret-down">{" "}</i>
                  </Link>
                  <ul className="dropdown-content">
                    <li>
                      <Link to="/orderhistory">
                        My Orders
                      </Link>
                    </li>
                    <li>
                      <Link to="/myprofile">
                        My Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="#signout" onClick={signOutHandler}>
                        Sign Out
                      </Link>
                    </li>
                  </ul>
                </div>
              ) :
                (
                  <Link to="/signin">
                    Sign In
                  </Link>
                )
            }
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/categorylist">Categories</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}

          </div>
        </header>
        <aside className={sidebarIsOpen? 'open' : ''}>
              <ul className="categories">
                <li>
                  <strong>Categories</strong>
                  <button
                  onClick={() => setSidebarIsOpen(false)}
                  className="close-sidebar"
                  type="button">
                    <i className="fa fa-close"></i>
                  </button>
                </li>
                {loadingCategories ? (
                            <LoadingBox></LoadingBox>
                        ) : errorCategories ? (
                            <MessageBox variant="danger">{errorCategories}</MessageBox>
                        ) : (
                          allCategories.map((c) => (
                            <li key={c._id}>
                              <Link to={`/search/category/${c._id}`}
                              onClick={() => setSidebarIsOpen(false)}>{c.name}</Link>
                            </li>
                          ))
                        )}
              </ul>
        </aside>
        <main>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
          <Route path="/cart/:id?" component={CartScreen} ></Route>
          <Route path="/signin" component={SignInScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping/:id/edit" component={ShippingScreen}></Route>
          <Route path="/payment" component={PaymentScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route path="/search/name/:name?" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category?" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name" component={SearchScreen} exact></Route>
          <Route path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order" component={SearchScreen} exact></Route>
          <PrivateRoute path="/myprofile" component={ProfileScreen}></PrivateRoute>
          <PrivateRoute path="/myaddress" component={ShippingListScreen}></PrivateRoute>
          <AdminRoute path="/categorylist" component={CategoryListScreen}></AdminRoute>
          <AdminRoute path="/category/:id/edit" component={CategoryEditScreen}></AdminRoute>
          <AdminRoute path="/productlist" component={ProductListScreen}></AdminRoute>
          <AdminRoute path="/orderlist" component={OrderListScreen}></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row center">
          All rights reserved
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
