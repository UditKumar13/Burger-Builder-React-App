import React, { Component } from 'react';
import Layout from '../src/hoc/Layout/Layout';
import '../src/index.css';
import BurgerBuilder from '../src//containers/BurgerBuilder/BurgerBuilder';

class App extends Component {

  render(){
  return (
    <div>
      <Layout>
        <BurgerBuilder/> 
      </Layout>
    </div>
  );
          }
}
export default App;
