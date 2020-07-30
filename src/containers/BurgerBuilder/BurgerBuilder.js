import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../Store/actions/actionTypes';



class BurgerBuilder extends Component{

    state={
        purchasing:false,
        loading:false,
        error:false

    }

    componentDidMount(){
        console.log(this.props);
        // axios.get('https://react-my-burger-72df3.firebaseio.com/ingredients.json')
        // .then(response=>{
        //     this.setState({ingredients:response.data});
            
        // })
        // .catch(error=>{this.setState({error:true})});
    }

    updatePurchasableState(ingredients){
        const sum = Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey];
        })// gives the value of ingredients
        .reduce((sum,el)=>{
            return sum + el;
        },0);
        //sum of all values ,like total values of ingredients
        
        return sum>0;
        // to make it true if there is any item selected by user 

    }

    // addIngrdientHandler=(type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount =oldCount+1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };

    //     updatedIngredients[type]=updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({totalPrice:newPrice,
    //     ingredients:updatedIngredients});

    //     //calling the updatedpurchasable
    //     this.updatePurchasableState(updatedIngredients);


    // }

    // removeIngredientHandler=(type)=>{
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount<=0){
    //         return;
    //     }
    //     const updatedCount =oldCount-1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };

    //     updatedIngredients[type]=updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({totalPrice:newPrice,
    //     ingredients:updatedIngredients});
    //     this.updatePurchasableState(updatedIngredients);


    // }

    purchasedHandler = () =>{
        this.setState({purchasing:true});


    }

    purchaseCancelHandler =()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{

        this.props.history.push('/checkout');
    // const queryParams = [];
    // for (let i in this.state.ingredients){
    //     queryParams.push(encodeURIComponent(i) + '=' +
    //     encodeURIComponent(this.state.ingredients[i]));
    // }
    // queryParams.push('price='+this.state.totalPrice);
    // const queryString = queryParams.join('&');

    // this.props.history.push({
    //     pathname:'/checkout',
    //     search:'?' + queryString
    // });

    }
    render(){
        const disabledInfo = {
            ...this.props.ings
        };
        console.log('BurgerBuilder[js]');
        console.log(disabledInfo);

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }

        
          // checking the condition for  every element 
            //at last this loop will give {salad:true,bacon:true,cheese:true ,meat:true}
        let ordersummary = null;
        let burger = this.state.error?<p>Ingredients can't be loaded !</p>:<Spinner/>

        if (this.props.ings){
            burger =  (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls
                    ingredientAdded={this.props.onIngredientsAdded}
                    ingredientRemoved={this.props.onIngredientsRemoved}
                    disabled={disabledInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchasableState(this.props.ings )}
                    ordered={this.purchasedHandler}/>
                </Aux>
                );


                ordersummary = <OrderSummary ingredients={this.props.ings} 
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.props.price}/> ;
               
        } 
        if (this.state.loading){
            ordersummary = <Spinner/>;
        }
        
        
        return (
            <Aux>
                <Modal show ={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {ordersummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state =>{
    return {
        ings:state.ingredients,
        price:state.totalPrice
    };

}

const mapDispatchToProps = dispatch =>{
    return {
        onIngredientsAdded : (ingName) =>dispatch ({
            type:actionTypes.ADD_INGREDIENT,
            ingredientName:ingName
        }),

        onIngredientsRemoved : (ingName) =>dispatch ({
            type:actionTypes.REMOVE_INGREDIENT,
            ingredientName:ingName
        })

    }
}

export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));