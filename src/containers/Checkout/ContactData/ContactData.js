import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../Store/actions/index';





class ContactData extends Component {
    state={
        orderForm:{
                    name:{
                        elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Your Name'
                        },
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    },
                    street : {
                        elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Street'
                        },
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    },
                    zipcode:{
                        elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Zip Code'
                        },
                        value:'',
                        validation:{
                            required:true,
                            minLength:5,
                            maxLength:5
                        },
                        valid:false,
                        touched:false

                    },
                    country : {
                        elementType:'input',
                        elementConfig:{
                            type:'text',
                            placeholder:'Counrty'
                        },
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    },
                     email:{
                        elementType:'input',
                        elementConfig:{
                            type:'email',
                            placeholder:'Your Mail'
                        },
                        value:'',
                        validation:{
                            required:true
                        },
                        valid:false,
                        touched:false
                    },
                     deliveryMethod:{
                        elementType:'select',
                        elementConfig:{
                            options:[{
                                value:'fastest',
                                displayValue:'Fastest'},
                                {
                                    value:'cheapest',
                                    displayValue:'Cheapest'}
                            ],
                            type:'text',
                            placeholder:'Your Name'
                        },
                        valid:true,
                        validaton:{},
                        value:'fastest'
                    }
            },

            formIsValid:false,
          loading:false
    }

    orderHandler = (event) =>{
        event.preventDefault();
       // console.log(this.props);
    const formData={};
    for (let formElementIdentifier in this.state.orderForm){
        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
        ingredients : this.props.ings,
        price:this.props.price,
        orderData:formData
       
        }
    

    this.props.onOrderBurger(order);
   
        //console.log(this.props.ingredients);

    }


    checkValidity(value,rules){
        let isValid=true;

        if (!rules){
            return true;
        }

        if (rules.required){
            isValid=value.trim() !== '' && isValid;

        }

        if(rules.minLength){
            isValid=value.length>=rules.minLength  && isValid;

        }

        if(rules.maxLength){
            isValid=value.length<=rules.maxLength  && isValid;
        }

        return isValid;
    }

    inputChangeHandler = (event,inputIdentifier) =>{
       // console.log (event.target.value); to see the values get printed as user types

        const updatedOrderForm = {
            ...this.state.orderForm
        }

        const updatedFormElement ={
            ...updatedOrderForm[inputIdentifier]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value,updatedFormElement.validation);
        updatedFormElement.touched=true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        let formIsValid =true;
        for (let inputIdentifier in updatedOrderForm){
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({
            orderForm:updatedOrderForm,
            formIsValid:formIsValid
        });

    }
    render(){
        const formElementsArray=[];
        for (let key in this.state.orderForm){
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            });
        }
        let form =(<form onSubmit={this.orderHandler}>
            {formElementsArray.map(formElement=>(
                 <Input elementType={formElement.config.elementType}  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value} invalid={!formElement.config.valid} 
                  touched={formElement.config.touched}
                  shouldValidate={formElement.config.validation} key={formElement.id} changed={ (event)=>this.inputChangeHandler(event,formElement.id)} />
          
            ))}
           
            <Button btnType="Success" disabled={!this.state.formIsValid} >ORDER</Button>
        </form>);
        if (this.state.loading){
            form=<Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Data</h4>
                {form}
            </div>

        );
    }

}

const mapStateToProps = state =>{
    return {
        ings:state.ingredients,
        price:state.totalPrice
    }
};

const mapDispatchToProps = Dispatch =>{
    onOrderBurger : (orderData) =>dispatch(actions.purchaseBurgerStart(orderData))
}

export default connect(mapStateToProps)(withErrorHandler(ContactData,axios));