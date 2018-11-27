import React, {Component} from 'react';
import './Projects.scss';

import PageLoader from '../../hoc/PageLoader/PageLoader'
import ProjectThumb from './ProjectThumb/ProjectThumb'



class Projects extends Component {
//// //// ////
////  MAIN PAGE 'projects' CONTENT, DISPLAYS PROJECTS THUMBNAILS 
////



    state={
        ready: 'no',
        noOfProjects: this.props.posts.length,
        loadedThumbs: 0
    }



    //// //// ////
    ////  checking if all thumbnails images are loaded 
    ////
    thumbsLoadedHandler = (thumb) => {

        const noLoadedThumbs = this.state.loadedThumbs;

        this.setState({
            loadedThumbs: noLoadedThumbs + 1
        })

        if (this.state.noOfProjects === noLoadedThumbs + 1){
            console.log('all images loaded')
            this.setState({
                ready: 'yes'
            });
            this.props.hideLoading();
        } else {
        }
  
    }



    render(){
        window.scrollTo(0, 0);
        

        const projects = this.props.posts.map(project => {
            return (
                <ProjectThumb 
                    project={project} 
                    key={project.title}
                    thumbLoaded={this.thumbsLoadedHandler}
                />
            )
        })

        return (
            <div className="projects">
                {projects}
            </div>
            
        )
    }

}

export default PageLoader(Projects);