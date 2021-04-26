import React from 'react'
import {Link} from 'react-router-dom'

export const Electronicssell = () => {
    return (
        <div>
            <div className='hello'>
                <h1>Choose your product catagory. Hope you will get what you want here.</h1>
            </div>
            <div className='product'>
                <ul>
                  <li>
                    <span>
                      <div className="bulb">
                         <h2><Link to={{
                           pathname: '/product',
                           state:{
                             ptype:'bulb'
                           }

                         }} style={{ textDecoration: 'none'  }}><span>Bulb</span></Link></h2>
                      </div>
                    </span>
                  </li>

                  <br></br>

                  <li>
                    <span>
                      <div className="fan">
                         <h2><Link to={{
                           pathname: '/product',
                           state:{
                             ptype:'fan'
                           }

                         }} style={{ textDecoration: 'none'  }}><span>Fan</span></Link></h2>
                      </div>
                    </span>
                  </li>

                  <br></br>

                  <li>
                    <span>
                      <div className="tubelight">
                         <h2><Link to={{
                           pathname: '/product',
                           state:{
                             ptype:'tubelight'
                           }

                         }} style={{ textDecoration: 'none'  }}><span>Tubelight</span></Link></h2>
                      </div>
                    </span>
                  </li>
                </ul>
            </div>
        </div>
    )
}

export default Electronicssell
