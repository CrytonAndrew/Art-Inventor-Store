import React from "react"
// Implement the router
// Uses HTML 5 history api
import {BrowserRouter as Router, Route} from "react-router-dom"
import { Container } from "react-bootstrap"
import Header from './components/Header.js'
import Footer from "./components/Footer.js"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import CartScreen from "./screens/CartScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ShippingScreen from "./screens/ShippingScreen"
import PaymentScreen from "./screens/PaymentScreen.js"
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js"
import OrderScreen from "./screens/OrderScreen"
import MyOrders from "./screens/MyOrders"
import UserListScreen from "./screens/UserListScreen"
import UserEditScreen from "./screens/UserEditScreen"
import ProductListScreen from "./screens/ProductListScreen"

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
      <Container>
       <Route path="/" component={HomeScreen} exact/>
       <Route path="/login" component={LoginScreen} />
       <Route path="/register" component={RegisterScreen} />
       <Route path="/profile" component={ProfileScreen} />
       <Route path="/shipping" component={ShippingScreen} />
       <Route path="/payment" component={PaymentScreen} />
       <Route path="/placeorder" component={PlaceOrderScreen}/> 
       <Route path="/order/:id" component={OrderScreen} />
       <Route path="/orders" component={MyOrders} />

       <Route path="/admin/users" component={UserListScreen} />
       <Route path="/admin/user/:id/edit" component={UserEditScreen} />
       <Route path="/product/:id" component={ProductScreen} />
       <Route path="/admin/products" component={ProductListScreen}/>
       {/* id is optional  */}
       <Route path="/cart/:id?" component={CartScreen}/>
      </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
