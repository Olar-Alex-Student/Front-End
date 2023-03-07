import React from 'react'
import { SignUpForm } from './SignUpForm'

export const Signup = () => {
  return (
    <div className='container d-flex justify-content-center p-4'>
    <div className='box bg-primary p-5 d-flex justify-content-center align-items-center flex-column gap-5'>
    <div className='title d-flex justify-content-center text-dark fw-bold p-4'>Signup</div>
    <SignUpForm/>
    </div>
    </div>
  )
}
