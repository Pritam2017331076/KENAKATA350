import Header from './components/Header'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Signupform from './components/Signupform'
import Home from './components/Home'
import React, { useReducer, useEffect} from 'react'
import Login from './components/Loginform'
import Buy from './components/Buy'
import Sell from './components/Sell'
import Cloth from './components/Cloth'
import Electronics from './components/Electronics'
import Sport from './components/Sport'
import Sportsell from './components/Sportsell'
import Electronicssell from './components/Electronicssell'
import Clothsell from './components/Clothsell'
import ItemLayout from './components/ItemLayout'
import Productlist from './components/Productlist'
import Product from './components/Product'
import {initialState, reducer} from './components/UseReducer'

export const UserContext = React.createContext();
function App() {
  const [state, dispatch] = useReducer(reducer, initialState) 


   /* useEffect(()=>{
    const parsedState = (localStorage.getItem('state'))
    dispatch({type:'USER',payload:parsedState})
  },[])

  useEffect(() => {
    localStorage.setItem('state', state)
  }, [state])    */
  console.log(state)
  return (
    <>
    <UserContext.Provider value={{state, dispatch}}>
    <Router>
    <div className="App">
      <Header/>
      
        <Route
          exact
          path="/" component={Home} 
        />

        <Route
          path="/home" component={Home} 
        />
        <Route
          path="/signup" component={Signupform} 
        />

        <Route
          path="/login" component={Login} 
        />

        <Route
          path="/buy" component={Buy} 
        />

        <Route
          path="/sell" component={Sell} 
        />

        <Route
          path="/cloth" component={Cloth} 
        />
        <Route
          path="/electronics" component={Electronics} 
        />

        <Route
          path="/sport" component={Sport} 
        />

        <Route
          path="/sportsell" component={Sportsell} 
        />

        <Route
          path="/electronicssell" component={Electronicssell} 
        />

        <Route
          path="/clothsell" component={Clothsell} 
        />
        <Route
          path="/iteminfo" component={ItemLayout} 
        />
        <Route
          path="/productlist" component={Productlist} 
        />
        <Route
          path="/product" component={Product} 
        />
    </div>
    </Router>
    </UserContext.Provider>
    </>
  );
}

export default App;
