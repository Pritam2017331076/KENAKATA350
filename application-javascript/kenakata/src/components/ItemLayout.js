import React from 'react'
import axios from 'axios'
import {useState, useContext } from 'react'
import {UserContext} from '../App'

const ItemLayout = (props) => {
    const [seller,setSeller]=useState('')
    const {state, dispatch} = useContext(UserContext)
    const [use, setUse] = useState('')


    console.log(props.desc)
    console.log(props.price)
    console.log(props.id)
    console.log(props.ownerId)
    console.log(props.type)
    console.log(use)
    console.log('done with information')

    

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

        window.location.href='/login'
        console.log('no one logged in')
    })

    console.log('present user')
    console.log(use)

    const purchase = () => {
        
        if(use===''){
            window.location.href='/login'
        }

        axios.get(`http://localhost:5000/users/${props.ownerId}`)
        .then(res => {
            console.log(res.data) 
            console.log('done with user')
            setSeller(res.data)
       }) ;

       axios.delete(`http://localhost:5000/${props.type}/${props.id}`)
       .then(res => {
        console.log(res.data) 
        console.log('product is deleted')
        setSeller(res.data)
       }) ;

       const data = {
           Id: props.id,
           newOwner: use
       }

       console.log(data)
       axios.post('http://localhost:5001/changeowner',data)
         .then(res =>{
             console.log(res.data)
         }) 

         window.location.href='/'
    } 


    return (
        <div className='cloth'>
            <span onClick={purchase}>
               <h4>Description: {props.desc}
               <br></br>
               Price: {props.price}</h4>
            </span>
        </div>
    )
}

/* ItemLayout.defaultProps={ 
    desc: 'redmi 8',
    price: 130
} */

export default ItemLayout
