import React, { Component } from 'react';
import Layout from '../src/hoc/Layout/Layout';
import '../src/index.css';
import BurgerBuilder from '../src//containers/BurgerBuilder/BurgerBuilder';

class App extends Component {

  state={show:true};

componentDidMount(){
  setTimeout(() => {
    this.setState({show:false})
  }, 5000);
}

  render(){
  return (
    <div>
      <Layout>
        {this.state.show?<BurgerBuilder/>:null} 
      </Layout>
    </div>
  );
          }
}
export default App;
