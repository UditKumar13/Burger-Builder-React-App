import React, { Component } from 'react';
import Layout from '../src/hoc/Layout/Layout';
import '../src/index.css';
import BurgerBuilder from '../src//containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
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
    let routes=(
      <Switch>
      <Route path="/auth" component={Auth}></Route>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Redirect to="/" />
      </Switch>
    );
    if (this.props.isAuthenticated){
      routes=(
        <Switch>
          <Route path="/checkout" component={Checkout}></Route>
      <Route path="/orders" component={Orders}></Route>
      <Route path="/logout" component={Logout}></Route>
      <Route path="/auth" component={Auth}></Route>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Redirect to="/" />  
      </Switch>
      );
    }
  return (
    <div>
      <Layout>
        {routes}
      </Layout>
    </div>
  );
          }
}

const mapStateToProps = state =>{
  return {
    isAuthenticated:state.auth.token!==null
  };

};
const mapDispatchToProps = dispatch =>{
  return {
    onTryAutoSignup:()=> dispatch(actions.authCheckState)
  };
};
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
