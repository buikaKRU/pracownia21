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
                height: '100%',
                position: 'absolute',
                left: '50%',
                WebkitTransform: 'translateX(-50%)',
                transform: 'translateX(-50%)',
                width: 'unset'
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