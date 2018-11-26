import React from 'react';
import './ProjectThumb.scss';

import languageContext from '../../../context/LanguageContext'
import ImageComponent from '../../ImageComponent/ImageComponent'

const projectThumb = (props) => {
//// //// ////
////  DISPLAYS THUMB PROJECT IN PROJECTS COMPONENT 
////

    const { Consumer } = languageContext;


    return (
        <Consumer>
         
            {language => {
                return (
                    <div className='projectThumb' id={props.project.titleID}>

                        <div className="thumbImage">
                            <ImageComponent 
                                src={props.project.images[0].src_thumb}
                                alt={props.project.images[0].alt}
                                loaded={props.thumbLoaded}
                            />
                        </div>

                        <div className='projectInfo'>
                            <h3>
                                {props.project.title}
                            </h3>

                            <p>{language.investor + ': '}{props.project.investor}</p>
                            
                            {props.project.colaboration != null ?
                                <p>{language.colaboration}</p> :
                                null}
                        </div>
                        
                    </div>
                )
            }}
        </Consumer>
        
    )
}

export default projectThumb;