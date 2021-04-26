import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import {  useContext,useState } from 'react'
import {UserContext} from '../App'


const Header = () => {

    const {state, dispatch} = useContext(UserContext)

    const [use, setUse] = useState('')

    axios.get('http://localhost:5000/users/me',{
        headers: {
            'Authorization': localStorage.getItem('token')
          }
    })
    .then(res => {
        console.log('present user exists');
        console.log(res.data) ;
        setUse(res.data.user);
        console.log(use)
    })
    .catch(error => {
        console.log('no one logged in')
    })

    const logoutClick = ()=>{
        axios.get('http://localhost:5000/users/logout', {
            headers: {
              'Authorization': localStorage.getItem('token')
            }
          })
        .then(
            res => {
                localStorage.setItem('token', '1a');
                dispatch({type:"USER",payload:''})
                localStorage.setItem('state','')
                console.log(res.data)
                window.location.href = "/";
            }
         ) 
         .catch(err =>{
             console.log(err)
         })
    }

    const RenderMenu = () => {
         if(use===''){
             return(
            <div className="navigationbar">
            <div className='menu'>
                <ul>
                    <li><Link to='/' style={{ textDecoration: 'none' } }><span>Kenakata</span></Link></li>
                    <li className='signupbtn'><Link to='/signup' style={{ textDecoration: 'none' }}><span>Signup</span></Link></li>
                    <li className='loginbtn'><Link to='/login' style={{ textDecoration: 'none' }}><span>login</span></Link></li>
                </ul>
            </div>
            </div>
             )
         }else{
             return(
            <div className="navigationbar">
            <div className='menu'>
                <ul>
                    <li><Link to='/' style={{ textDecoration: 'none' } }><span>Kenakata</span></Link></li>
                    <li className='loginbtn' onClick={logoutClick} style={{ textDecoration: 'none' }}><span>Logout</span></li>
                </ul>
            </div>
            </div>
             )
         }
    }

    return (
        <div>

        <RenderMenu/>

        </div>
    )
}

export default Header
