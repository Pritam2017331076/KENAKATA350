import React, {useState, useEffect, useContext } from 'react'
import axios from 'axios'
import {UserContext} from '../App'

const Product = (props) => {

    const {state, dispatch} = useContext(UserContext)

    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState(0)
    const [use, setUse] = useState('')
    const {ptype}=props.location.state
    console.log('here is state')
    console.log(state)

    

    axios.get('http://localhost:5000/users/me',{
        headers: {
            'Authorization': localStorage.getItem('token')
          }
    })
    .then(res => {
        console.log('present user exists here');
        console.log(res.data) ;
        setUse(res.data.user);
        console.log(use)
    })
    .catch(error => {
        console.log('no one logged in')
        window.location.href='/login'
    })

    
    const onSubmit = (e) => {
        e.preventDefault()

        if(!desc){
            alert('Please enter description')
            return
        }

        if(!price){
            alert('Please enter price')
            return
        }

        const productDetails = {
          price: price,
          desc: desc,
        }
        
        console.log(productDetails)
        console.log(ptype)

        axios.post(`http://localhost:5000/${ptype}/add`,productDetails,{
                headers: {
                  'Authorization': localStorage.getItem('token')
                }
              })
             .then(res => {
               
              
              console.log(res.data)
              console.log('here is product')
              let prod=res.data
              if(ptype=='shirt') prod=res.data.newShirt
              else if(ptype=='jacket') prod=res.data.newJacket
              else if(ptype=='saree') prod=res.data.newSaree
              else if(ptype=='bulb') prod=res.data.newBulb
              else if(ptype=='fan') prod=res.data.newFan
              else if(ptype=='tubelight') prod=res.data.newTubelight
              else if(ptype=='bat') prod=res.data.newBat
              else if(ptype=='ball') prod=res.data.newBall
              else if(ptype=='football') prod=res.data.newFootball
              


              axios.get(`http://localhost:5000/users/${prod.owner}`)
              .then((ress) => {
                   console.log(ress.data.user)
                   
                   const prodDetails = {
                     productNumber: prod._id,
                     desc: prod.desc,
                     price: prod.price,
                     owner: ress.data.user,
                     productType: ptype,
                   }

                   console.log(prodDetails)
                   axios.post('http://localhost:5001/add', prodDetails)
                   .then(reso => {console.log(reso.data); }) 
              });
            
            }) ;

        setDesc('')
        setPrice('')

    }



    return (
        <div>
            <form className='signup' onSubmit={onSubmit} >
             <div className='form-control'>
                <label>Description</label> {' '} {' '} {' '}
                <input

                  type='text'
                  placeholder='Enter Product Description'
                  value={desc}
                  onChange={(e)=>setDesc(e.target.value)}

                ></input>
             </div>
             <br></br>

             <div className='form-control'>
                <label>Price</label> {' '}
                <input

                  type='text'
                  placeholder='Enter Price'
                  value={price}
                  onChange={(e)=>setPrice(e.target.value)}

                ></input>
             </div>

             <br></br>

             <input type='submit' value='product' className='registerbtn' />
        </form>
        </div>
    )
}

export default Product


/*

producttype

*/
