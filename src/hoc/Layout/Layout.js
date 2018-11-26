import React from 'react';


import Header from '../../components/UI/Header/Header'
import Footer from '../../components/UI/Footer/Footer'

const layout = (WrapedComponent) => {
//// //// ////
////  HOC FOR ADDING HEADER MAIN FOOTER
////


    return (props) => (
        <>
            <h3>the layout</h3>
            <Header/>

            <main className="Layout">
                
                <WrapedComponent {...props}/>
                
            </main>

            <Footer/>
        </>
    )
}

export default layout;