import React from 'react'
import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {UserContext} from '../App'


const Loginform = () => {

    const {state, dispatch} = useContext(UserContext)

    const [user, setUser] = useState('')
    const [password, setPass] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()

        if(!user){
            alert('Please enter user')
            return
        }

        if(!password){
            alert('Please enter password')
            return
        }
        /* onAdd({user,email,password,passwordr}) */

        const userDetails = {
            user: user,
            password: password
          }

        axios.post('http://localhost:5000/users/login',userDetails)
          .then(
              res => {
                  localStorage.setItem('token', res.data.token);
                  dispatch({type:"USER",payload:user})
                  console.log(state)
                  console.log(res.data)
                  window.location.href='/'
              }
           ) 
           .catch(err =>{
               console.log(err)
           })

        setUser('')
        setPass('')

        
    }
    return (
        <div>
            <h2>Login Form</h2>
            <form className='login' onSubmit={onSubmit}>

                <div className='data'>
                <label>Username</label> {' '}
                <input
                   type='text'
                   placeholder='Enter Username'
                   value={user}
                   onChange={(e) => setUser(e.target.value)}
                />
                </div>
                <br></br>

                <div className='data'>
                <label>Password</label> {' '}
                <input
                   type='text'
                   placeholder='Enter Password'
                   value={password}
                   onChange={(e) => setPass(e.target.value)}
                />
                </div>

                <br></br>

                <input type='submit' value='login' className='loginsubbtn' />
            </form>

        </div>
    )
}

export default Loginform
