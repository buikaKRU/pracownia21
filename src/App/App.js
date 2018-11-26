import React, { Component, Context } from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from '../axios'

import './App.scss';

import Projects from '../components/Projects/Projects'
import LanguageContext from '../context/LanguageContext';
import LoadingScreen from '../components/UI/LoadingScreen/LoadingScreen';
import SingleProject from '../components/SingleProject/SingleProject'


class App extends Component {
//  ////////////////////////////////////////////////////////////////
//  === THE MAIN APP ===   === THE MAIN APP ===   === THE MAIN APP === 
//  === THE MAIN APP ===   === THE MAIN APP ===   === THE MAIN APP === 
//  ////////////////////////////////////////////////////////////////





  //  ////////////////////////////////////////////////////////////////
  //  === STATE ===   === STATE ===   === STATE === 
  //  === STATE ===   === STATE ===   === STATE === 
  //  ////////////////////////////////////////////////////////////////


  state = {
    language: {
    },

    loading: true,
    loadingType: 'data',

    posts: [
      // {
      //   title: '',
      //   title: '',
      //   colaboration: '',
      //   titleID: '',
      //   images: [
      //     {
      //       src: '',
      //       alt: '',
      //       ratio: ''
      //     }
      //   ]
      // }
    ],
    about: {
      titleID: '',
      content: '',
      image: {
        src_full: '',
        src_thumb: '',
        alt: '',
        ratio: ''
      }
    },
    contact: {},
  }

  
  //  ////////////////////////////////////////////////////////////////
  //  === REACT METHODS ===   === REACT METHODS ===   === REACT METHODS === 
  //  === REACT METHODS ===   === REACT METHODS ===   === REACT METHODS === 
  //  ////////////////////////////////////////////////////////////////
  
  componentDidMount(){

    const currentLocation = window.location.host;

    const languageData = () => {
      console.log('currentLocation = ', currentLocation);
      
      if (currentLocation.includes('local')){
        return {
          type: 'EN',
          projects: 'projects',
          about: 'about',
          contact: 'contact',
          investor: 'investor',
          colaboration: 'colaboration'
        }
      } else{
        return {
          type: 'PL',
          projects: 'projekty',
          about: 'o nas',
          contact: 'kontakt',
          investor: 'inwestor',
          colaboration: 'współpraca'
        }
      }
    }

    this.setState({
      language: languageData()
    })

    

    //// //// ////
    ////  AXIOS GET THE DATA 
    ////
    
    axios.get('posts/')
      .then(response => {
        console.log('POSTS.response = ', response.data);
        this.setState({
          posts: this.prepareDataPosts(response.data)
        })
        this.isLoadingHandler(true);
      })

    
    axios.get('pages/')
      .then(response => {
        console.log('PAGES.response = ', response);
        this.setState({
          about: this.preparePage(response.data, 'about'),
          contact: this.preparePage(response.data, 'contact')
        })
        this.isLoadingHandler(true);
      })
      
  }



  //  ////////////////////////////////////////////////////////////////
  //  === METHODS ===   === METHODS ===   === METHODS === 
  //  === METHODS ===   === METHODS ===   === METHODS === 
  //  ////////////////////////////////////////////////////////////////
  

  //// //// ////
  ////  PREPARE POST DATA FROM BACKEND
  ////
  
  prepareDataPosts(data){
    const posts = data.map(element => {
    
      const acfKeys = Object.keys(element.acf)
      let images = acfKeys.filter(el => {
        return el.includes('image_')
      })
      .slice(0,-1)
      .map(el => {
        return this.prepareDataImage(element.acf[el], element)
      })

      return {
        id: element.id,
        title: element.acf[`${this.state.language.type}_title`],
        titleID: element.acf[`${this.state.language.type}_title`].replace(/\s+/g, '_'),
        colaboration: element.acf[`${this.state.language.type}_colaboration`],
        investor: element.acf[`${this.state.language.type}_investor`],
        images: images
      }
    })
    return posts;
  }  


  //// //// ////
  ////  PREPARE IMAGE DATA 
  ////
  
  prepareDataImage(img, alt){
    return{
      src_full: img.sizes.custom_full,
      src_thumb: img.sizes.custom_thumb,
      ratio: img.sizes['custom_full-height'] / img.sizes['custom_full-width'],
      alt: alt.acf[`${this.state.language.type}_title`]
    }
  }


  //// //// ////
  ////  PREPARE PAGE DATA FROM BACKEND
  ////
  preparePage(data, type){
    if (type === 'about'){
      const aboutIndex = data.findIndex((element) => {
        return element.title.rendered === 'o nas'
      })
      return{
        titleID: this.state.language.about,
        content: data[aboutIndex]
      }
    }

    else if (type === 'contact'){
      const contactIndex = data.findIndex((element) => {
        return element.title.rendered === 'kontakt'
      })
      return{
        titleID: this.state.language.type.contact,
        content: data[contactIndex]
      }
    }
  }




  //// //// ////
  ////  managing the main loadin screen 
  ////
  isLoadingHandler = (loading) => {
    if (this.state.posts.length > 0 && this.state.about != null && this.state.contact != null){
      console.log('AAAAALLLL state loaded')

      this.setState({
        loadingType: 'content',
      })
    } else {
    }

    if (loading){
      this.setState({
        loading: true
      })
    } else {
      this.setState({
        loading: false
      })
    }
  }

  //// //// ////
  ////  managing page meta title 
  ////
  changeTitleHandler(newTitle){
    document.title = newTitle;
  }


 
  //  ////////////////////////////////////////////////////////////////
  //  === RENDER ===   === RENDER ===   === RENDER === 
  //  === RENDER ===   === RENDER ===   === RENDER === 
  //  ////////////////////////////////////////////////////////////////
  
  render() {
    //CONTEXT
    const { Provider } = LanguageContext;

    

    const projects = () =>{
      this.changeTitleHandler(this.state.language.projects)
      if (this.state.posts.length > 0) {
        return (
          <Projects 
            posts={this.state.posts}
            loading={this.isLoadingHandler}>
          </Projects>
        )
      } else {
        return <p>loading...</p>
      }
    
    }

    




    //// //// ////
    ////  RENDER RETURN 
    ////
    
    return (
      <Provider value={this.state.language}>
        <h1>
          THE APP
        </h1>

        <Switch>

          <Route 
            path='/:id' render={(props) => <SingleProject {...props} 
              posts={this.state.posts} 
              title={this.changeTitleHandler}
              loading={this.isLoadingHandler}/>}/>
          <Route render={projects}/>

        </Switch>

        {/* <LoadingScreen 
          visible={this.state.loading}
          type={this.state.loadingType}>
        </LoadingScreen> */}

      </Provider>

    );
  }
}

export default App;
