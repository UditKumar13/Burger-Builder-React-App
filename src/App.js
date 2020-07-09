import React, { Component } from 'react';
import Layout from '../src/hoc/Layout/Layout';
import '../src/index.css';
import BurgerBuilder from '../src//containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';


class App extends Component {

 


  render(){
  return (
    <div>
      <Layout>
      <Switch>
      <Route path="/checkout" component={Checkout}></Route>
        <Route path="/" exact component={BurgerBuilder}></Route>
      </Switch>
      </Layout>
    </div>
  );
          }
}
export default App;
