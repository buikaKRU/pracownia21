import React from 'react';
import './ImageComponent.scss';


const imageComponent = (props) => {

    return (
        <div className="imageComponent">
            <img 
                src={props.src} 
                alt={props.alt} 
                onLoad={()=> props.loaded(props.alt)}
                onError={()=> props.loaded('ERROR LOADING: '+props.alt+' image')}>
            </img>
        </div>
    )
}

export default imageComponent;