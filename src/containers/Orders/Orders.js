import React , {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as  actions from '../../Store/actions/index';
class Orders extends Component {
    
    componentDidMount(){
      
       this.props.onFetchOrders(this.props.token);
    }
    render(){let orders=<Spinner/>;
        if(!this.props.loading){
            orders=this.props.orders.map(order=>(
                <Order key={order.id}
                ingredients={order.ingredients}
                price={order.price}/>
            ))
        };

    
        
    
        return (
            <div>
            {orders}
            </div>

        );
    }

}

const mapStateToProps = state=>{
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token
    };
}

const mapDispatchToProps = dispatch =>{
    return {
        onFetchOrders:(token)=>dispatch(actions.fetchOrders(token))
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));