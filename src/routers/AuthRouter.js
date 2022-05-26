import React from 'react'
import { Switch } from 'react-router-dom'
import { Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import { LoginScreen } from '../components/auth/LoginScreen'
import { RegistrerScreen } from '../components/auth/RegistrerScreen'

export const AuthRouter = () => {
  return (
    <div className='auth__main'>
      <div className='auth__box-container'>
        <Switch>
            <Route path="/auth/login" component={LoginScreen} />
            <Route path="/auth/registrer" component={RegistrerScreen} />
            <Redirect to="/auth/registrer" component={RegistrerScreen} />
        </Switch>

      </div>
    </div>
  )
}
