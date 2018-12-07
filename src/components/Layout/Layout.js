import React from 'react';

import './Layout.scss'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const layout = (props) => {
//// //// ////
////  THE MAIN LAYOUT ADDING FOOTER AND HEADER TO THE APP
////


    return (
        <div className="layout">
        
            <Header/>

                <main>
                    
                    {props.children}
                    
                </main>

            <Footer contactData={props.contactData}/>
        </div>
    )
}

export default layout;