import React from 'react'
import {Link} from 'react-router-dom'

const Sportsell = () => {
    return (
        <div>
            <div className='hello'>
                <h1>Choose your product catagory. Hope you will get what you want here.</h1>
            </div>
            <div className='product'>
                <ul>
                  <li>
                    <span>
                      <div className="bat">
                         <h2><Link to={{
                           pathname: '/product',
                           state:{
                             ptype:'bat'
                           }

                         }} style={{ textDecoration: 'none'  }}><span>Bat</span></Link></h2>
                      </div>
                    </span>
                  </li>

                  <br></br>

                  <li>
                    <span>
                      <div className="ball">
                         <h2><Link to={{
                           pathname: '/product',
                           state:{
                             ptype:'ball'
                           }

                         }} style={{ textDecoration: 'none'  }}><span>Ball</span></Link></h2>
                      </div>
                    </span>
                  </li>

                  <br></br>

                  <li>
                    <span>
                      <div className="football">
                         <h2><Link to={{
                           pathname: '/product',
                           state:{
                             ptype:'football'
                           }

                         }} style={{ textDecoration: 'none'  }}><span>Football</span></Link></h2>
                      </div>
                    </span>
                  </li>
                </ul>
            </div>
        </div>
    )
}

export default Sportsell
