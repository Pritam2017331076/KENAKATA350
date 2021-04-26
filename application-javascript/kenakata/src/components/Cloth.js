import React from 'react'
import {Link} from 'react-router-dom'


const Cloth = () => {
    return (
        <div>
            <div className='hello'>
                <h1>Choose your product catagory. Hope you will get what you want here.</h1>
            </div>
            <div className='product'>
                <ul>
                  <li>
                    <span>
                      <div className="jacket">
                         <h2><Link to={{
                           pathname: '/productlist',
                           state:{
                             ptype:'jacket'
                           }

                         }} style={{ textDecoration: 'none'  }}><span>Jacket</span></Link></h2>
                      </div>
                    </span>
                  </li>

                  <br></br>

                  <li>
                    <span>
                      <div className="saree">
                         <h2><Link to={{
                           pathname:'/productlist',
                           state:{
                             ptype:'saree'
                           }

                         }} style={{ textDecoration: 'none'  }}><span>Saree</span></Link></h2>
                      </div>
                    </span>
                  </li>

                  <br></br>

                  <li>
                    <span>
                      <div className="shirt">
                         <h2><Link to={{
                           pathname:'/productlist',
                           state:{
                             ptype:'shirt'
                           }

                         }} style={{ textDecoration: 'none'  }}><span>Shirt</span></Link></h2>
                      </div>
                    </span>
                  </li>
                </ul>
            </div>
        </div>
    )
}

export default Cloth
