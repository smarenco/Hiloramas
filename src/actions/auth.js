import { useDispatch } from 'react-redux';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from "../types/types"
import { finishLoading, setError, startLoading } from './ui';

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        
        firebase.auth().signInWithEmailAndPassword( email, password )
        .then( ({ user }) => {
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
        }).catch(error => {
            dispatch(setError(error.message));
            dispatch(finishLoading());
        })
            
    }
}

export const startRegistrerWithEmailPasswordName = (email, password, name) => {
    return ( dispatch ) => {
        firebase.auth().createUserWithEmailAndPassword( email, password )
        .then( async ({ user }) => {
            await user.updateProfile({displayName: name});
            dispatch( login(user.uid, user.displayName))
        }).catch(error => {
            dispatch(setError(error.message));
        })
    }
}

export const starGoogleLogin = () => {
    return ( dispatch ) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
        .then( ({ user }) => {
            dispatch( login(user.uid, user.displayName))
        })
    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

