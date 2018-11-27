import React, {Component} from 'react';
import PageLoader from '../../hoc/PageLoader/PageLoader';
import {Redirect} from 'react-router-dom';


import languageContext from '../../context/LanguageContext';
import ImageComponent from '../ImageComponent/ImageComponent';



class SingleProject extends Component {
//// //// ////
////  PAGE DISPLAYING SINGLE PROJECT 
////


    state={
        imagesToLoad: 0,
        imagesLoaded: 0,
        projectIndex: null,
    }


    componentWillMount = () =>{
        console.log('***** [singleProject] will mount')
        console.log('props', this.props)
    }


    componentWillReceiveProps (props){
        console.log('***** will recive props = ');
    }


    
    updateState = (props) => {
        console.log('updateState')
        
        if (props.posts.length > 0){
            const url = props.match.params.id;

    
            const projectNames = props.posts.map(element => {
                return element.titleID;
            })
    
            
            const projectIndex = projectNames.findIndex(element => {
                return element === url;
            })

            if (projectIndex > -1) {

                this.setState({
                    projectIndex: projectIndex,
                    imagesToLoad: props.posts[projectIndex].images.length
                })

            } else if (projectIndex === -1) {
                this.setState({
                    projectIndex: -1,
                })
            }

        }
    }



    imgLoadedHandler = () => { 
        this.props.hideLoading()

        const imagesLoaded = this.state.imagesLoaded + 1;

        imagesLoaded === this.state.imagesToLoad ? 
            this.props.hideLoading() : this.setState({imagesLoaded: imagesLoaded})
    }




    projectContent = (language) =>  {

  
 
        //IF THERE IS SUCH A PROJECT
        if (this.state.projectIndex != null && this.state.projectIndex > -1) {
  
            const project = this.props.posts[this.state.projectIndex]
            this.props.title(project.title);

            
            return (
                <>
                <ImageComponent 
                    src={project.images[0].src_thumb}
                    alt={project.images[0].alt}
                    imgLoaded={this.imgLoadedHandler}
                />

                <div className='projectInfo'>
                    <h3>
                        {project.title}
                    </h3>
                    <p>{language.investor + ': '}{project.investor}</p>
                    {project.colaboration != null ?
                        <p>{language.colaboration}</p> :
                        null}
                </div>
                
                {
                    project.images.map((image, index) => {
                        if (index > 0) {
                            return (
                                <ImageComponent 
                                    key={image.alt+index}
                                    src={image.src_thumb}
                                    alt={image.alt}
                                    imgLoaded={this.imgLoadedHandler}
                                />
                            )
                        } else {
                            return null
                        }
                    })
                }

                </>
            )


        } else if (this.state.projectIndex === -1) {
            //IF THERE IS NOT SUCH A PROJECT
            console.log('there is NOT such a project')
            return <Redirect to="/"/>   
        }
    }



    render() {
        const { Consumer } = languageContext;
        console.log('[single project RENDER]this.state = ', this.state);

        this.updateState(this.props)
        
        return (
            <Consumer>
                {language => {
                    return (
                        <div className="singleProject">
                            {this.projectContent(language)}
                        </div>
                    )
                }}
            </Consumer> 
            
        )
    }
    
}


export default PageLoader(SingleProject);