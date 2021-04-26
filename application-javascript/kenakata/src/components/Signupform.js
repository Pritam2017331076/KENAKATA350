import axios from 'axios'
import React from 'react'
import { useState, useEffect, useContext } from 'react'

import {UserContext} from '../App'

const Signupform = () => {

  const {state, dispatch} = useContext(UserContext)
  
    const [user, setUser] = useState('')
    const [email, setMail] = useState('')
    const [password, setPass] = useState('')
    const [passwordr, setPassr] = useState('')
     

    const onSubmit = (e) => {
        e.preventDefault()

        if(!user){
            alert('Please enter user')
            return
        }

        if(!email){
            alert('Please enter email')
            return
        }

        if(!password){
            alert('Please enter password')
            return
        }

        if(!passwordr){
            alert('Please enter password again here')
            return
        }

        if(password!==passwordr){
            alert('wrong password entered')
            return
        }

        const userDetails = {
          user: user,
          email: email,
          password: password
        }
        
        console.log(userDetails)


         axios.post('http://localhost:5000/users/add',userDetails)
          .then(res => {
            console.log(res.data)
            console.log(res.data.token)
            localStorage.setItem('token', res.data.token);
            window.location.href='/login'
          })
          .catch((error) => {
            alert('stop it')
          })

        /* onAdd({user,email,password,passwordr}) */

        setUser('')
        setMail('')
        setPass('')
        setPassr('')
        

        
    }

    return (
        <form className='signup' onSubmit={onSubmit} >
             <div className='form-control'>
                <label>Username</label> {' '} {' '} {' '}
                <input

                  type='text'
                  placeholder='Enter Username'
                  value={user}
                  onChange={(e)=>setUser(e.target.value)}

                ></input>
             </div>
             <br></br>

             <div className='form-control'>
                <label>Email</label> {' '}
                <input

                  type='text'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e)=>setMail(e.target.value)}

                ></input>
             </div>

             <br></br>

             <div className='form-control'>
                <label>Password</label> {' '}
                <input

                  type='text'
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e)=>setPass(e.target.value)}

                ></input>
             </div>
             <br></br>

             <div className='form-control'>
                <label>Repeat Password</label> {' '}
                <input

                  type='text'
                  placeholder='Repeat Password'
                  value={passwordr}
                  onChange={(e)=>setPassr(e.target.value)}

                ></input>
             </div>
             <br></br>

             <input type='submit' value='sign up' className='registerbtn' />
        </form>
    )
}

export default Signupform
