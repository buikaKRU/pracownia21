import React from 'react'
import { NavLink } from 'react-router-dom';

import './Nav.scss';
import LanguageContext from '../../../context/LanguageContext'



const nav = (props) => {
//// //// ////
////  NAVBAR FOR HEADER OR FOOTER
////

    const { Consumer } = LanguageContext;



    return (

        <Consumer>
    
            {language => {
 
                
                return (
                
                    <nav>
                        <ul>

                            <li>
                                <NavLink to='/'>{language.projects}</NavLink>
                            </li>

                            <li>
                                <NavLink to={'/'+language.about}>{language.about}</NavLink>
                            </li>

                                <li>
                                <NavLink to={'/'+language.contact}>{language.contact}</NavLink>
                            </li>

                        </ul>
                    </nav>
                  
                )
            }}

        </Consumer>
    );

}


export default nav;