import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch  } from 'react-router-dom'
import { firebase } from '../firebase/firebase-config';
import { HiloramasScreen } from '../components/hilorama/HiloramasScreen'
import { AuthRouter } from './AuthRouter'
import { useDispatch } from 'react-redux';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingHilorama } from '../actions/hilorama';

export const AppRouter = () => {

    const dispatch = useDispatch();

    const [checking, setChecking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        firebase.auth().onAuthStateChanged( async(user) => {
            if (user?.uid) {
              dispatch( login(user.uid, user.displayName) );
              setIsLoggedIn(true);

              dispatch( startLoadingHilorama( user.uid ) );
            }else{
                setIsLoggedIn(false);
            }

            setChecking(false);
        });
    }, [dispatch, setChecking, setIsLoggedIn]);
    
    if(checking) {
        return(
            <h1>Wait...</h1>
        );
    }

    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute path="/auth" isAuthenticated={ isLoggedIn } component={AuthRouter} />
                    <PrivateRoute exact path="/" isAuthenticated={ isLoggedIn } component={HiloramasScreen} />
                </Switch>
            </div>
        </Router>
    
    )
}
