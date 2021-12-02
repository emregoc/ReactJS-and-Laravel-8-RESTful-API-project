import React from 'react';
import { Navigate  , Route } from 'react-router-dom';
import AuthStore from './store/AuthStore';
AuthStore.getToken();
const isLoggedIn = AuthStore.appState != null && AuthStore.appState.isLoggedIn;

const PrivateRoute = ({
    component:Component,
    path,
    ...rest
}) => (
    <Route path={path} {...rest}
        render={
            props => isLoggedIn ? (
                <Component {...props}/>
            ) : (
                <Navigate to={{ 
                    pathname:"/login",
                    state:{
                        prevLocation:path,
                        error:'Önce giriş Yapmalısın'
                    }
                }}/>
            )
        } />
)
export default PrivateRoute;