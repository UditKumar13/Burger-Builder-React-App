import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';

const INGREDIENT_PRICES = {
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
}
class BurgerBuilder extends Component{

    state={
        ingredients : {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        }
        ,
        totalPrice:4,
        purchasable:false,
        purchasing:false

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
        
        this.setState({purchasable:sum>0});
        // to make it true if there is any item selected by user 

    }

    addIngrdientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount =oldCount+1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type]=updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice,
        ingredients:updatedIngredients});

        //calling the updatedpurchasable
        this.updatePurchasableState(updatedIngredients);


    }

    removeIngredientHandler=(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0){
            return;
        }
        const updatedCount =oldCount-1;
        const updatedIngredients = {
            ...this.state.ingredients
        };

        updatedIngredients[type]=updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice:newPrice,
        ingredients:updatedIngredients});
        this.updatePurchasableState(updatedIngredients);


    }

    purchasedHandler = () =>{
        this.setState({purchasing:true});


    }

    purchaseCancelHandler =()=>{
        this.setState({purchasing:false});
    }

    purchaseContinueHandler=()=>{

    const order = {
        ingredients : this.state.ingredients,
        price:this.state.totalPrice,
        customer : {
            name:'udit kumar',
            address : {
                street : 'Newyork street',
                zipcode:'41351',
                country : 'India'
            },

            email:'uk@test.com'
        },
        deliveryMethod:'fastest'
        }
    
    axios.post('/orders.json',order)
    .then(response=>console.log(response))
    .catch (error => console .log (error));

    }
    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key]<=0;
        }
          // checking the condition for  every element 
            //at last this loop will give {salad:true,bacon:true,cheese:true ,meat:true}
        
        
        return (
            <Aux>
                <Modal show ={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                <OrderSummary ingredients={this.state.ingredients} 
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                price={this.state.totalPrice}/> 
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                ingredientAdded={this.addIngrdientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchasable={this.state.purchasable}
                ordered={this.purchasedHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;