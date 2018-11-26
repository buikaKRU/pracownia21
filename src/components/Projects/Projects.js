import React, {Component} from 'react';
import './Projects.scss';

import Layout from '../../hoc/Layout/Layout'
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


    thumbsLoadedHandler = (thumb) => {
   

        const noLoadedThumbs = this.state.loadedThumbs;
        console.log('noLoadedThumbs = ', noLoadedThumbs);
        

        this.setState({
            loadedThumbs: noLoadedThumbs + 1
        })

        if (this.state.noOfProjects === noLoadedThumbs + 1){
            console.log('all images loaded')
            this.setState({
                ready: 'yes'
            });
            this.props.loading(false);
        } else {
        }
  
    }

    // componentWillUpdate(){

    //     console.log('component will update')
    //     console.log('this.state.ready = ', this.state.ready);
        

    //     if (this.state.ready === 'yes'){
    //         console.log('should remove screen')
    //         this.props.loading(false)
    //     }
    // }


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
                {this.state.ready === 'no' ? <h1>LOADING Images</h1> : null}
                {projects}
            </div>
            
        )
    }

}

export default Layout(Projects)