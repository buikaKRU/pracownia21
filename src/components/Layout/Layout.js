import React from 'react';

import './Layout.scss'
import Header from './Header/Header'
import Footer from './Footer/Footer'

const layout = (props) => {
//// //// ////
////  HOC FOR ADDING HEADER MAIN FOOTER
////


    return (
        <div className="layout">
        
            <Header/>

                <main className="Layout">
                    
                    {props.children}
                    
                </main>

            <Footer/>
        </div>
    )
}

export default layout;