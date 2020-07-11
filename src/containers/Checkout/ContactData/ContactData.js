import React, {Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';




class ContactData extends Component {
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }

    orderHandler = (event) =>{
        event.preventDefault();
        
    this.setState({loading:true});

    const order = {
        ingredients : this.props.ingredients,
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
    .then(response=>{
        this.setState({loading:false});
        this.props.history.push('/');
    })
    .catch (error => {
        this.setState({loading:false});
    })
        //console.log(this.props.ingredients);

    }

    render(){
        let form =(<form>
            <input type="text" className={classes.Input} name="name" placeholder="Your Name" />
            <input type="email"  className={classes.Input} name="email" placeholder="Your Mail" />
            <input type="text"  className={classes.Input} name="street" placeholder="Your Street" />
            <input type="text"  className={classes.Input} name="postal" placeholder="Postal Code" />
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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

export default ContactData;