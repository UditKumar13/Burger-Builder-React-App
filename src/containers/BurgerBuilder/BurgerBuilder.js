import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad:0.5,
    bacon:0.7,
    cheese:0.4,
    meat:1.3
}
class BurgerBuilder extends Component{

    state={
        ingredients :null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
        error:false

    }

    componentDidMount(){
        console.log(this.props);
        axios.get('https://react-my-burger-72df3.firebaseio.com/orders/ingredients.json')
        .then(response=>{
            this.setState({ingredients:response.data});
            
        })
        .catch(error=>{this.setState({error:true})});
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

    // this.setState({loading:true});

    // const order = {
    //     ingredients : this.state.ingredients,
    //     price:this.state.totalPrice,
    //     customer : {
    //         name:'udit kumar',
    //         address : {
    //             street : 'Newyork street',
    //             zipcode:'41351',
    //             country : 'India'
    //         },

    //         email:'uk@test.com'
    //     },
    //     deliveryMethod:'fastest'
    //     }
    
    // axios.post('/orders.json',order)
    // .then(response=>{
    //     this.setState({loading:false,purchasing:false});
    // })
    // .catch (error => {
    //     this.setState({loading:false,purchasing:false});
    // })
    this.props.history.push('/checkout');

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
        let ordersummary = null;
        let burger = this.state.error?<p>Ingredients can't be loaded !</p>:<Spinner/>

        if (this.state.ingredients){
            burger =  (
                <Aux>
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


                ordersummary = <OrderSummary ingredients={this.state.ingredients} 
        purchaseCanceled={this.purchaseCancelHandler}
        purchaseContinued={this.purchaseContinueHandler}
        price={this.state.totalPrice}/> ;
               
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

export default withErrorHandler(BurgerBuilder,axios);