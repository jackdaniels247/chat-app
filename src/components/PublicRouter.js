import React from 'react'
import{Redirect,Route} from 'react-router'

const PublicRouter = ({children,...routeprops}) => {
    const profile=true;
    if(!profile){
       return <Redirect to='/' />
    }
    return (
        
   
        <Route {...routeprops}>
         {children}
        </Route>
    
    )
}

export default PublicRouter
