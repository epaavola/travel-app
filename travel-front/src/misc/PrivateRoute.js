import { useKeycloak } from '@react-keycloak/web'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import LoadingBackdrop from '../components/Misc/LoadingBackdrop'

export function PrivateRoute({ component: Component, roles, ...rest }) {
    const { keycloak, initialized } = useKeycloak()

    const isAuthorized = () => {
        if(keycloak.hasRealmRole('app-admin') || keycloak.hasRealmRole('app-user')){
            return true
        }else{
            return false
        } 
        
    }

    if(!initialized){
        return(
            <LoadingBackdrop />
        )
    }

    return (
        <>
            <Route {...rest} render={props => (
                    keycloak.authenticated && isAuthorized() ? <Component {...props} /> : keycloak.login()
                )}
            />
        </>
    )
}