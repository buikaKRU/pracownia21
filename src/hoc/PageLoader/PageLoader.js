import React, {Component} from 'react';

import './PageLoader.scss';



const PageLoader = (WrappedComponent) => {
//// //// ////
////  HOC SPININ LOADER DISPLAYED TILL A CHILD PAGE IS LOADED 
////
// REQIRED PROPS:
//     - hideLoading() - to hide the spinner screen

   


    return class extends Component {

        state={
            loading: true,
            style: {
                opacity: 1,
                zIndex: 1000,
            }
        }
    
    
        hideLoadingHandler = () => {

            console.log('[PageLoader loading: false]')
            this.setState({
                loading: false,
                style: {
                    opacity: 0,
                    zIndex: -1
                }
            })
        }

        render () {

            return(
                <>
                <div className="pageLoader" style={this.state.style}>
                    <div className="inner">
                          <div 
                            className="loader">
                        </div>
                    </div>
                </div>

                <WrappedComponent 
                    {...this.props} 
                    hideLoading={this.hideLoadingHandler}/>       
                </>
            )
        }
    }

}


export default PageLoader

