import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from '../Layout/Layout.css';

const layout = (props) =>(
<Aux>
<div>Toolbar, SideDrawers , Backdrop </div>
<main className={classes.Content}>
{props.children}
</main>
</Aux>
);

export default layout;
