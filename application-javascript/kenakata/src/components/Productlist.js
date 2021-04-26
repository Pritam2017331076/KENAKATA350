import React, {useState, useEffect } from 'react'
import ItemLayout from './ItemLayout'
import axios from 'axios'

const Productlist = (props) => {
    const [items,setItems] = useState([])

    const {ptype} = props.location.state

    useEffect(() => {
        if(ptype==='jacket')
        {
            axios.get('http://localhost:5000/jacket')
            .then(res => {
                console.log(res.data) 
                setItems(res.data)
           }) ;
        }
        else if(ptype==='saree')
        {
            axios.get('http://localhost:5000/saree')
            .then(res => {
                console.log(res.data) 
                setItems(res.data)
           }) ;
        }
        else if(ptype==='shirt')
        {
            axios.get('http://localhost:5000/shirt')
            .then(res => {
                console.log(res.data) 
                setItems(res.data)
           }) ;
        }
        else if(ptype==='bat')
        {
            axios.get('http://localhost:5000/bat')
            .then(res => {
                console.log(res.data) 
                setItems(res.data)
           }) ;
        }
        else if(ptype==='ball')
        {
            axios.get('http://localhost:5000/ball')
            .then(res => {
                console.log(res.data) 
                setItems(res.data)
           }) ;
        }
        else if(ptype==='football')
        {
            axios.get('http://localhost:5000/football')
            .then(res => {
                console.log(res.data) 
                setItems(res.data)
           }) ;
        }
        else if(ptype==='bulb')
        {
            axios.get('http://localhost:5000/bulb')
            .then(res => {
                console.log(res.data) 
                setItems(res.data)
           }) ;
        }
        else if(ptype==='fan')
        {
            axios.get('http://localhost:5000/fan')
            .then(res => {
                console.log(res.data) 
                setItems(res.data)
           }) ;
        }
        else if(ptype==='tubelight')
        {
            axios.get('http://localhost:5000/tubelight')
             .then(res => {
                 console.log(res.data) 
                 setItems(res.data)
            }) ;
        }

    },[])


    return (
        <div>
            
            <ul>
                {
                   items.map(item => (<li key={item._id}>
                       {
                           console.log(item)
                       }
                    <ItemLayout type={ptype} desc={item.desc} price={item.price} id={item._id} ownerId={item.owner} />
                   </li>))
                }
            </ul>
        </div>
    )
}

export default Productlist
