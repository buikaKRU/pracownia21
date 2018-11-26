import React from 'react'
import { NavLink } from 'react-router-dom';

import LanguageContext from '../../../context/LanguageContext'


const header = (props) => {
//// //// ////
////  DISPLAYS HEADER IN LAYOUT 
////

    const { Consumer } = LanguageContext;



    return (

        <Consumer>
    
            {language => {
 
                
                return (
                    
                    <header>
                        <div className="container">
                            <div className="logo">
                            </div>

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
                        </div>
                    </header>
                     
                )
            }}

        </Consumer>
    );

}


export default header;