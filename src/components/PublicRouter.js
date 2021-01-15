import React from 'react'
import{Redirect,Route} from 'react-router'
import { useProfile } from '../context/ProfileContext';

const PublicRouter = ({children,...routeprops}) => {
    const profile=useProfile();
    if(profile){
       return <Redirect to='/' />
    }
    return (
        
   
        <Route {...routeprops}>
         {children}
        </Route>
    
    )
}

export default PublicRouter
