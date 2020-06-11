import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigatonItem/NavigationItem';

const navigationItems = ()=>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" active={true}>Burger Builder</NavigationItem>
        <NavigationItem link="/" >CheckOut</NavigationItem>
    </ul>
);

export default navigationItems;