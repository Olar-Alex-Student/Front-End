import React from 'react'
import { LoginForm } from './LoginForm'

export const Login = () => {
  return (
    <div className='container d-flex justify-content-center p-4'>
      <div className='box bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5'>
          <div className='title d-flex justify-content-center text-secondary fw-bold p-4'>
            Login
          </div>
          <LoginForm/>
      </div>
    </div>
  )
}
