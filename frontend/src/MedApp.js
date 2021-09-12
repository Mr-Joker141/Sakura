import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

import {BrowserRouter, Link, Route} from 'react-router-dom'
import { listProductCategories } from './actions/productActions';
import { signout } from './actions/userActions';
import AdminRoute from './components/AdminRoute';
import LoadingBox from './components/LoadingBox';
import MessageBox from './components/MessageBox';
import PrivateRoute from './components/PrivateRoute';
import SearchBox from './components/SearchBox';
import SellerRoute from './components/SellerRoute';
import CartScreen from './Screens/CartScreen';
import HomeScreen from './Screens/HomeScreen';
import { OrderHistoryScreen } from './Screens/OrderHistoryScreen';
import OrderListScreen from './Screens/OrderListScreen';
import OrderScreen from './Screens/OrderScreen';
import PaymentMethodScreen from './Screens/PaymentMethodScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import ProductEditScreen from './Screens/ProductEditScreen';
import ProductListScreen from './Screens/ProductListScreen';
import ProductScreen from './Screens/ProductScreen';
import CusProfileScreen from './Screens/CusProfileScreen';
import CusRegisterScreen from './Screens/CusRegisterScreen';
import MedSearchScreen from './Screens/MedSearchScreen';
import SellerScreen from './Screens/SellerScreen';
import { ShippingAddressScreen } from './Screens/ShippingAddressScreen';
import CusSigninScreen from './Screens/CusSigninScreen';
import UserEditScreen from './Screens/UserEditScreen';
import UserListScreen from './Screens/UserListScreen';

function MedApp() {

  const cart =useSelector((state) => state.cart);
  const [sidebarIsOpen,setSidebarIsOpen]=useState(false);
  const {cartItems} =cart;
  const userSignin =useSelector((state) => state.userSignin);
  const {userInfo} =userSignin;
  const dispatch =useDispatch();

  const signoutHandler = () =>{
    dispatch(signout());
  } 
  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() =>{
    dispatch(listProductCategories());
  },[dispatch])
  return (
    <BrowserRouter>
     <div className="grid-container">
            <header className="row">
              <div>
                <button  type="button" className="open-sidebar" onClick={()=>setSidebarIsOpen(true)}>
                  <i className="fa fa-bars"></i>
                </button>
                <Link className="brand" to="/">Pharmacy</Link>
              </div>
              <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
              <div>
                <Link to="/cart">Cart
                {cartItems.length > 0 && (
                  <span className="badge">{cartItems.length}</span>
                )}
                </Link>
                {
                  userInfo ? (
                    <div className="dropdown"> 
                    <Link to="#">{userInfo.name}<i className="fa fa-caret-down"></i>{''}
                    </Link>
                    <ul className="dropdown-content">
                    <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                      <li>
                        <Link to ="/orderhistory">Order History</Link>
                      </li>
                    <li>
                      <Link to="#signout" onClick={signoutHandler}>
                        Sign Out</Link>
                      </li>
                    </ul>
                    </div>
                  ) :
                  (
                    <Link to="/signin">Sign In</Link>
                  )}
                  {userInfo && userInfo.isSeller && (
                     <div className="dropdown">
                     <Link to="#admin">
                     Seller<i className="fa fa-caret-down"></i>
                     </Link>
                     <ul className="dropdown-content">
                       <li>
                         <Link to="/productlist/seller">Products</Link>
                       </li>
                       <li>
                         <Link to="/orderlist/seller">Orders</Link>
                       </li>
                     </ul>
                   </div>
                  )}
                  {userInfo && userInfo.isAdmin && (
                    <div className="dropdown">
                      <Link to="#admin">
                      Admin<i className="fa fa-caret-down"></i>
                      </Link>
                      <ul className="dropdown-content">
                        <li>
                          <Link to="/dashboard">Dashboard</Link>
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
            <aside className={sidebarIsOpen?  'open' : ''}>
              <ul className="categories">
              <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
            <main>
              <Route path="/seller/:id" component={SellerScreen} ></Route>
              <Route path="/cart/:id?" component ={CartScreen}></Route>
              <Route path="/product/:id" component={ProductScreen} exact></Route>
              <Route path="/product/:id/edit" component={ProductEditScreen} exact></Route>
              <Route path="/signin" component={CusSigninScreen}></Route>
              <Route path="/register" component={CusRegisterScreen}></Route> 
              <Route path="/shipping" component={ShippingAddressScreen} ></Route>
              <Route path="/payment" component={PaymentMethodScreen} ></Route>
              <Route path="/placeorder" component={PlaceOrderScreen} ></Route>
              <Route path="/order/:id" component={OrderScreen}></Route>
              <Route path ="/orderhistory"component={OrderHistoryScreen}></Route>
              <Route path="/search/name/:name?" component={MedSearchScreen} exact></Route>
              <Route path="/search/category/:category"component={MedSearchScreen} exact></Route>
              <Route path="/search/category/:category/name/:name"component={MedSearchScreen}exact></Route>
              <Route path="/search/category/:category/name/:name/min/:min/max/:max"component={MedSearchScreen}exact></Route>
              <PrivateRoute path="/profile" component={CusProfileScreen}></PrivateRoute>
              <AdminRoute path ="/productlist" component={ProductListScreen} exact></AdminRoute>
              <AdminRoute path ="/orderlist" component={OrderListScreen} exact></AdminRoute>
              <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
              <AdminRoute path="/user/:id/edit" component={UserEditScreen}></AdminRoute>
              <SellerRoute path="/productlist/seller" component={ProductListScreen}></SellerRoute>
              <SellerRoute path="/orderlist/seller" component={OrderListScreen}></SellerRoute>
              <Route path="/" component={HomeScreen} exact></Route>

           
            </main>
            <footer className="row center">All right reserved</footer>
          </div>
    </BrowserRouter>
   
  );
}

export default MedApp;
