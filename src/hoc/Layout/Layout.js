import React,{Component} from 'react';
import Aux from '../Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';




class  Layout extends Component{

    state={
        showSideDrawer:true
    }

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false})

    }

    sideDrawerToogleHandler = () =>{
        this.setState((prevState)=>{
            return{
            showSideDrawer:!prevState.showSideDrawer
            };
        });
        
    }

    render(){
        return(
                    <Aux>
                    <Toolbar drawerToggleClicked={this.sideDrawerToogleHandler}/>
                    <SideDrawer closed={this.sideDrawerClosedHandler}
                    open={this.state.showSideDrawer}/>
                    <main className={classes.Layout_Content}>
                    {this.props.children}
                    </main>
                    </Aux>
        );
    }

};

export default Layout;
