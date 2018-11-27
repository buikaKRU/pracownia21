import React from 'react';
import './ImageComponent.scss';


const imageComponent = (props) => {
//// //// ////
////  COMPONENT FOR DISPLAYING IMAGES 
////
// REQUIRED PROPS:
//     - src
//     - alt
// ADDITIONAL PROPS:
//     - absolute - bool - for displaying in absolute position
//     - imgLoaded - used for informin parent component that img is loaded (onLoad event) 



    const imgStyle = () => {
        if (props.absolute) {
            return {
                position: 'absolute',
                top: '50%',
                WebkitTransform: 'translateY(-50%)',
                transform: 'translateY(-50%)'
            }
            
        } else {
        }
    }

    return (
        <div className="imageComponent" style={{position: props.absolute ? 'absolute' : 'relative'}}>
            <img 
                src={props.src} 
                alt={props.alt}
                style={imgStyle()} 
                onLoad={()=> props.imgLoaded ? props.imgLoaded(props.alt) : null}
                onError={()=> props.imgLoaded ? props.imgLoaded('ERROR LOADING: '+props.alt+' image') : null}>
            </img>
        </div>
    )
}

export default imageComponent;