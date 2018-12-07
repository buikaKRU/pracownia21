import React from 'react';
import './ProjectThumb.scss';
import {NavLink} from 'react-router-dom';

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

                       <NavLink to={props.project.titleID}>
                        <div className="thumbImage">
                                <ImageComponent 
                                    src={props.project.images[0].src_thumb}
                                    alt={props.project.images[0].alt}
                                    imgLoaded={props.thumbLoaded}
                                    absolute={true}
                                />
                            </div>

                            <div className='projectInfo'>
                                <h2>
                                    {props.project.title}
                                </h2>
                            </div>
                       </NavLink>
                        
                    </div>
                )
            }}
        </Consumer>
        
    )
}

export default projectThumb;