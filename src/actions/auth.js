import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { types } from "../types/types"
import { finishLoading, setError, startLoading } from './ui';
import Swal from 'sweetalert2'

export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {
        dispatch(startLoading());
        
        firebase.auth().signInWithEmailAndPassword( email, password )
        .then( ({ user }) => {
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
        }).catch(error => {
            dispatch(finishLoading());
            Swal.fire('Error', error.message, 'error');
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
            Swal.fire('Error', error.message, 'error');
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

export const startLogout = () => {
    return async (dispatch) => {        
        await firebase.auth().signOut();

        dispatch(logout());

    }
}

export const login = (uid, displayName) => ({
    type: types.login,
    payload: {
        uid,
        displayName
    }
})

export const logout = () => ({
    type: types.logout
})

