import React, { Component } from 'react';
import Layout from '../src/hoc/Layout/Layout';
import '../src/index.css';
import BurgerBuilder from '../src//containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './Store/actions/index';



class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render(){
  return (
    <div>
      <Layout>
      <Switch>
      <Route path="/checkout" component={Checkout}></Route>
      <Route path="/orders" component={Orders}></Route>
      <Route path="/auth" component={Auth}></Route>
      <Route path="/logout" component={Logout}></Route>
      <Route path="/" exact component={BurgerBuilder}></Route>
      </Switch>
      </Layout>
    </div>
  );
          }
}

const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignup:()=> dispatch(actions.authCheckState);
  };
};
export default connect(null,mapDispatchToProps)(App);
