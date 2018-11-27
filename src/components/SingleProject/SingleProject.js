import React, {Component} from 'react'
import PageLoader from '../../hoc/PageLoader/PageLoader';
import {Redirect} from 'react-router-dom';


import languageContext from '../../context/LanguageContext';
import ImageComponent from '../ImageComponent/ImageComponent';



class SingleProject extends Component  {
//// //// ////
////  SINGLE PROJECT PAGE 
////
// redirects to "/" if dont find project titleID in URL


    state={
        imagesToLoad: 0,
        imagesLoaded: 0,
        projectIndex: null,
    }


    componentDidMount(){
        console.log('1-1-1-1 COMPONENT DID MOUNT')

        this.updateState(this.props)
    }


    componentWillReceiveProps(props){
        console.log('2-2-2-2 COMPONENT WILL RECIVE PROPS')

        this.updateState(props)
    }

    componentWillUnmount(){
        console.log('9-9-9-9 COMPONENT WILL UNMONT !!!')
    }



    //deals with hiding page loader if all images are already loaded
    imgLoadedHandler = () => {
        const imagesLoaded = this.state.imagesLoaded + 1;

        if (imagesLoaded === this.state.imagesToLoad - 1) {
            console.log('all images loaded')
            this.props.hideLoading();
        } else {
            this.setState({
                imagesLoaded: imagesLoaded
            })
        }
    }


    //// //// ////
    ////  STATE UPDATE 
    ////
    //updates state after componentWillMount() and componentWillReciveProps()
    updateState = (props) => {
        console.log('UPDATE STATE')

        if ( props.posts.length > 0) {
            
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



    //// //// ////
    ////  PREPARING SINGLE PROJECT CONTENT 
    ////
    
    projectContent = (language) => {

        //IF THERE IS MATCH PROJECT
        if (this.state.projectIndex > -1 && this.state.projectIndex != null) {

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
                            if (image.alt) {
                                return (
                                    <ImageComponent 
                                        key={image.alt+index}
                                        src={image.src_full}
                                        alt={image.alt}
                                        imgLoaded={this.imgLoadedHandler}
                                    />
                                )
                            } else return null
                  
                        } else {
                            return null
                        }
                    })
                }
                </>
            )


        // IF THERE IS NO MATCH
        } else if (this.state.projectIndex === -1 ){
            return (
                <>
                    <Redirect to="/"/>
                </>
            )

        // THERE IS NO DATA TO LOAD    
        } else {
            return <h1>loading</h1>
        }
        
    }
  
    
    //// //// ////
    ////  RENDER 
    ////
    render(){

        const { Consumer } = languageContext;
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



export default PageLoader(SingleProject)