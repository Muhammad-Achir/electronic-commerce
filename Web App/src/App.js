import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRouter';
import Products from './pages/Products';
import { useState } from 'react';
import AddProduct from './pages/AddProduct';
import Order from './pages/Order';

function App() {
  let check = !localStorage.getItem('token')
  const [ isLoggedIn, setIsLoggedIn ] = useState (!check)

  function setLogin () {
    setIsLoggedIn (true)
  }

  function logout () {
    localStorage.removeItem ('token')
    setIsLoggedIn (false)
  }

  return (
    <div className="App">
      <Navbar isLoggedIn={isLoggedIn} logout={logout}></Navbar>

      <Switch>
        <Route exact path='/'>
          <Home></Home>
        </Route>

        <Route exact path="/login">
          <Login setLogin={setLogin}></Login>
        </Route>

        <Route exact path="/register">
          <Register></Register>
        </Route>

        <PrivateRoute exact path="/products">
          <Products></Products>
        </PrivateRoute>

        <PrivateRoute path="/add">
          <AddProduct></AddProduct>
        </PrivateRoute>

        <PrivateRoute path="/order-processed">
          <Order></Order>
        </PrivateRoute>

      </Switch>
    </div>
  );
}

export default App;
