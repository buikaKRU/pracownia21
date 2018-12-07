import React from 'react'
import { NavLink } from 'react-router-dom';

import './Header.scss';
import Nav from '../Nav/Nav';
import logo from '../../../assets/images/logo.jpeg';



const header = (props) => {
//// //// ////
////  DISPLAYS HEADER IN THE LAYOUT 
////

    return (
                    
        <header>
            <div className="container">
                <div className="logo">
                    <NavLink to="/home">
                        <img src={logo} alt="logo"/>
                    </NavLink>
                </div>

                <div className='navbar'>
                    <Nav/>
                </div>


            </div>
        </header>
         
    )


}


export default header;