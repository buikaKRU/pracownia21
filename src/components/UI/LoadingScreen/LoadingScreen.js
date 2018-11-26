import React from 'react';

import './LoadingScreen.scss';
import logo from '../../../assets/images/logo.jpeg'


const loadingScreen = (props) => {

 


    return (
        <div className="loadingScreen" style={{opacity: props.visible ? 1: 0}}>
            <img  src={logo} alt='logo'></img>
            <p>loadig screen</p>
        </div>
        
    )
}

export default loadingScreen;