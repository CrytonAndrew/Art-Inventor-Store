import React from "react"
import Header from './components/Header.js'
import Footer from "./components/Footer.js"
import HomeScreen from "./screens/HomeScreen"
const App = () => {
  return (
    <>
      <Header />
      <HomeScreen />
      <Footer/>
    </>
  );
}

export default App;
