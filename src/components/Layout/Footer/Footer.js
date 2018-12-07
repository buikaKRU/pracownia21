import React from 'react';

import './Footer.scss'

import Nav from '../Nav/Nav'
import instagramImg from '../../../assets/images/instagram.png'
import facebookImg from '../../../assets/images/facebook.png'

const footer = (props) => {
//// //// ////
////  DISPLAYS FOOTER IN THE LAYOUT 
////


    const socialJSX = (element)=>{
        if (props.contactData[element] !== ""){
            return (
                <a href={props.contactData[element]}
                    target="_blank"
                    rel="noopener noreferrer">
                    <img 
                        src={element === "instagram" ? instagramImg : facebookImg}
                        className="socialImg"
                        alt="instagramlogo"/>
                </a>
            )
        } else {
            return null
        }
    }

    return(
        <footer>

            <div className="socialContainer">
                {socialJSX("instagram")}
                {socialJSX("facebook")}
            </div>

            <div className="container">

                <div className='navbar'>
                    <Nav/>
                </div>

                

                <div className="contactContainer">

                    <div className="column">
                        <p> tel: 
                            <a href={`tel:${props.contactData.tel}`}>
                                {props.contactData.tel}
                            </a>
                        </p>

                        <p>
                            <a href={`mailto:${props.contactData.email}`}>
                                {props.contactData.email}
                            </a>
                        </p>
                    </div>

                    <div className="column">
                        <p>
                            <a href={`https://www.google.com/maps/search/${props.contactData.adressStreet} ${props.contactData.adressZip}`}
                                target="_blank"
                                rel="noopener noreferrer">        
                                {props.contactData.adressStreet}<br/>{props.contactData.adressZip}
                            </a>
                        </p>
                    </div>

                </div>
            </div>
        </footer>
    )
}

export default footer 
