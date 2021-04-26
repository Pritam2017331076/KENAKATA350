import React from 'react'
import {Link} from 'react-router-dom'

const Buy = () => {
    return (
        <div>
            <div className='hello'>
                <h1>Choose your product catagory. Hope you will get what you want here.</h1>
            </div>
            <div className="buyoption">
               <ul>
                  <li>
                    <span>
                      <div className="cloth">
                        <h2><span><Link to='/cloth' style={{ textDecoration: 'none'  }}>Cloths</Link></span></h2>
                      </div>
                    </span>
                  </li>

                  <br></br>

                  <li>
                    <span>
                      <div className="electronics">
                        <h2><Link to='/electronics' style={{ textDecoration: 'none' }}><span>Electronics</span></Link></h2>
                      </div>
                    </span>
                  </li>

                  <br></br>

                  <li>
                    <span>
                      <div className="sport">
                        <h2><Link to="/sport" style={{ textDecoration: 'none' }}><span>Sports</span></Link></h2>
                      </div>
                    </span>
                  </li>
                </ul>
            </div>
        </div>
    )
}

export default Buy
