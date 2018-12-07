import React, {Component} from 'react';

import './PageLoader.scss';



const PageLoader = (WrappedComponent) => {
//// //// ////
////  HOC SPININ LOADER DISPLAYED TILL A CHILD PAGE IS LOADED 
////
// REQIRED PROPS:
//     - hideLoading() - to hide the spinner screen
// 
// UNREQUIRED PROPS:
//     - showLoading() - to show back the spinner screen

   


    return class extends Component {

        state={
            loading: true,
            style: {
                opacity: 1,
                zIndex: 100,
            }
        }
    
    
        hideLoadingHandler = () => {
            this.setState({
                loading: false,
                style: {
                    opacity: 0,
                    zIndex: -1
                }
            })
        }


        showLoadingHandler = () => {
            this.setState({
                loading: false,
                style: {
                    opacity: 1,
                    zIndex: 100
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
                    hideLoading={this.hideLoadingHandler}
                    showLoading={this.showLoadingHandler}/>       
                </>
            )
        }
    }

}


export default PageLoader

