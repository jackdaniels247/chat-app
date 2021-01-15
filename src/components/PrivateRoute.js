import React from 'react'
import { Redirect,Route } from 'react-router';
import { useProfile } from '../context/ProfileContext';


const PrivateRoute = ({children, ...routeprops}) => {


    const profile=useProfile();
    if(!profile){
       return <Redirect to='/signin' />
    }
    return (
        <Route {...routeprops}>
         {children}
        </Route>
    )
}

export default PrivateRoute
