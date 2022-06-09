import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { login, starGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { removeError, setError } from '../../actions/ui';

export const LoginScreen = () => {

    const dispatch = useDispatch();
    
    const state = useSelector( state => state);

    const { msgError, loading } = state.ui;

    /*useEffect(() => {
      
        return () => {
          navigator('/');
        }
      }, [uid]);*/

    const [ formValues, handleInputChange ] = useForm({
        email: '', 
        password: ''
    });

    const { email, password } = formValues

    const handleSubmit = (e) => {
        e.preventDefault();

        if(isFormValid()){
            dispatch(startLoginEmailPassword(email, password) );
        }
    }

    const handleGoogleLogin = () => {
        dispatch(starGoogleLogin(email, password) );
    }

    const isFormValid = () => {
      
          if( !validator.isEmail(email) ){
            dispatch(setError('Email incorrecto'));
            return false;
          }

          if( password.trim().length === 0){
            dispatch(setError('Password is required'));
            return false;
          }

          dispatch( removeError() );

          return true;
    }
    
    return (
        <>
            <h3 className='auth__title'>Login</h3>

            {msgError && <div className='auth__alert-error'>{msgError}</div>}

            <form onSubmit={handleSubmit}
                className='animate__animated animate__fadeIn animate__faster'>
                <input type='text' onChange={handleInputChange} value={email} autoComplete='off' placeholder='Email' className='auth__input' name='email' />
                <input type='password' onChange={e => handleInputChange(e)} value={password} placeholder='Password' className='auth__input' name='password' />

                <button disabled={loading} className='btn btn-primary btn-block' type='submit' >Login</button>
                <hr />
                <div className='auth__social-networks'>
                    <p>Login with social networks</p>

                    <div 
                        className="google-btn"
                        onClick={handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link className='link' to="/auth/registrer">Create new acount</Link>
            </form>
        </>
    )
}
