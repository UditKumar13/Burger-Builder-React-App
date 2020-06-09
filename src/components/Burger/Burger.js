import React from 'react';
import BurgerIngredient from '../Burger/BurgerIngredient/BurgerIngredient';
import classes from './Burger.css';
 
const burger= (props) => {
const transformedIngredients = Object.keys(props.ingredients)
.map(igkey=>{
   return [...Array(props.ingredients[igkey])].map((_,i)=>{
        return <BurgerIngredient key={igkey+i} type={igkey}/>
       });
});

// to see the arrays 
//console.log(transformedIngredients);

return (
<div className={classes.Burger}>
    <BurgerIngredient type='bread-top' />
    {transformedIngredients}
    <BurgerIngredient type='bread-bottom' />
</div>
);

}

export default burger;