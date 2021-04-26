import React from 'react'
import {Link} from 'react-router-dom'

const Home = () => {
    return (
        <div>
            <div className="intro">
                <h2>
                    Welcome to decentralized marketplace. <br></br>
                     Here you can buy or sell daily goods, <br></br>
                     electronic products,computer hardware,<br></br>
                      kitchen appliances etc. 
                     Hope you will <br></br> have a great time.
                </h2>
            </div>

            <div>
            <div className="options">
                <div className="optionmenu">
                   <ul>
                       <li><Link to='/Buy' style={{ textDecoration: 'none' }}><span id='mylink'>Buy</span></Link></li>
                       <li><Link to='/Sell' style={{ textDecoration: 'none' }}><span id='mylink'>Sell</span></Link></li>
                    </ul>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Home
