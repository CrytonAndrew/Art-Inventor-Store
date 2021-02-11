import React from "react"
// Implement the router
// Uses HTML 5 history api
import {BrowserRouter as Router, Route} from "react-router-dom"
import Header from './components/Header.js'
import Footer from "./components/Footer.js"
import HomeScreen from "./screens/HomeScreen"
import ProductScreen from "./screens/ProductScreen"
import { Container } from "react-bootstrap"

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
      <Container>
      <HomeScreen />
      </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
