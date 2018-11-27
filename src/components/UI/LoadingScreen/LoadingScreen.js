import React, {Component} from 'react';

import './LoadingScreen.scss';
import logo from '../../../assets/images/logo.jpeg'


class loadingScreen extends Component {
//// //// ////
////  INITIAL LOADING SCREEN WHILE FETCHIN' DATA
////


    state = {
        logoLoaded: false,
        logoShow: true,
        showLoader: true,
        style: {
            opacity: 1,
            zIndex: 1000,
        }
    }








    componentWillReceiveProps(newProps){

        if (newProps.visible === false){
            this.setState({
                showLoader: false,

                style: {
                    opacity: 0,
                    zIndex: -1,
                }

            })
        } else {
            this.setState({
                showLoader: true,
                style: {
                    opacity: 1,
                    zIndex: 1000,
                }
            })
        }
    }


    //displays spinner only if logo image is already loaded
    imageLoaded = () => {
        this.setState({
            logoLoaded: true
        })

    }




    render () {
        return (
            <div className="loadingScreen" style={this.state.style}>
                <div className="inner">
                    <img  
                        src={logo} alt='logo'
                        onLoad={this.imageLoaded}
                        className='logo'>
                    </img>
                    <div 
                        className="loader"
                        style={{opacity: this.state.logoLoaded === true ? 1 : 0}}>
                    </div>
                </div>
            </div>
            
        )
    }
    
}

export default loadingScreen;