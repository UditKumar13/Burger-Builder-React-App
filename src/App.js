import React, { Component } from 'react';
import Layout from '../src/components/Layout/Layout';
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
