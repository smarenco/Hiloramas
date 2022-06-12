import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { startRegistrerWithEmailPasswordName } from '../../actions/auth';

export const RegistrerScreen = () => {

  const dispatch = useDispatch();  
  const { msgError } = useSelector( state => state.ui);

  const [ formValues, handleInputChange ] = useForm({
    name: 'Santii',
    email: 'santimarenco@gmail.com',
    password: 'Fusionar1',
    password2: 'Fusionar1',
  });

  const { name, email, password, password2 } = formValues;

  const handleRegistrer = (e) => {
    e.preventDefault();
    
    if(isFormValid()){
      dispatch(startRegistrerWithEmailPasswordName(email, password, name));
    }
  }

  const isFormValid = () => {
    if( name.trim().length === 0){
      dispatch(setError('Name is required'));
      return false;
    }

    if( !validator.isEmail(email) ){
      dispatch(setError('Email incorrecto'));
      return false;
    }

    if( password !== password2 || password !== password2){
      dispatch(setError('Password should be at least 6 characters and match each other'));
        return false;
    }

    dispatch( removeError() );

    return true;
  }

  return (
    <>
        <h3 className='auth__title'>Registrer</h3>
        {msgError && <div className='auth__alert-error'>{msgError}</div>}

        <form onSubmit={handleRegistrer} className='animate__animated animate__fadeIn animate__faster'>
            <input onChange={handleInputChange} value={name} type='text' autoComplete='off' placeholder='Name' className='auth__input' name='name' />
            <input onChange={handleInputChange} value={email} type='text' autoComplete='off' placeholder='Email' className='auth__input' name='email' />
            <input onChange={handleInputChange} value={password} type='password' placeholder='Password' className='auth__input' name='password' />
            <input onChange={handleInputChange} value={password2} type='password' placeholder='Confirm password' className='auth__input' name='password2' />

            <button className='btn btn-primary btn-block mb-5' type='submit' >Register</button>
            <hr />

            <Link className='link' to="/auth/login">Alredy registrered?</Link>
        </form>
    </>
  )
}
