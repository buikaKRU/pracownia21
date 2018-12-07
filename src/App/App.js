import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from '../axios'

import './App.scss';

import Layout from '../components/Layout/Layout'
import Projects from '../components/Projects/Projects'
import LanguageContext from '../context/LanguageContext';
import LoadingScreen from '../components/UI/LoadingScreen/LoadingScreen';
import SingleProject from '../components/SingleProject/SingleProject'
import SinglePage from '../components/SinglePage/SinglePage';


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
    ],

    about: {
    },

    contact: {},
  }

  
  //  ////////////////////////////////////////////////////////////////
  //  === REACT METHODS ===   === REACT METHODS ===   === REACT METHODS === 
  //  === REACT METHODS ===   === REACT METHODS ===   === REACT METHODS === 
  //  ////////////////////////////////////////////////////////////////
  
  componentDidMount(){

    //// //// ////
    ////  LANGUAGE SETTING BASED ON URL 
    ////
    
    const currentLocation = window.location.host;
    const languageData = () => {
      
      if (currentLocation.includes('pracownia')){
        return {
          type: 'PL',
          projects: 'projekty',
          about: 'o nas',
          contact: 'kontakt',
          investor: 'inwestor',
          colaboration: 'współpraca',
          project: 'projekt',
          realization: 'realizacja',
          location: 'lokalizacja',
          office: 'sekretariat',
          architecture: 'architektura',
          uPlanning: 'urbanistyka',
        }
      } else{
        return {
          type: 'EN',
          projects: 'projects',
          about: 'about',
          contact: 'contact',
          investor: 'investor',
          colaboration: 'colaboration',
          project: 'project',
          realization: 'realization',
          location: 'location',
          office: 'office',
          architecture: 'architecture',
          uPlanning: 'urban planning',
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
        this.setState({
          posts: this.prepareDataPosts(response.data)
        })
        this.isLoadingHandler(true);
        
      })
      .catch(error => {
        console.log('error:', error)
      })

    
    axios.get('pages/')
      .then(response => {
        this.setState({
          contact: this.prepareDataPage(response.data, 'contact'),
          about: this.prepareDataPage(response.data, 'about')
        })
        this.isLoadingHandler(true);
      })
      .catch(error => {
        console.log('error:', error)
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
        location: element.acf.location,
        colaboration: element.acf.colaboration,
        colaborationLink: element.acf.colaborationLink,
        investor: element.acf[`${this.state.language.type}_investor`],
        yearProject: element.acf.yearProject,
        yearConstruction: element.acf.yearConstruction,
        description: element.acf[`${this.state.language.type}_description`],
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
  prepareDataPage(data, type){

    //ABOUT PAGE
    if (type === 'about'){
      const aboutIndex = data.findIndex((element) => {
        return element.title.rendered === 'o nas'
      })

      const page = data[aboutIndex].acf;
      
      return{
        titleID: this.state.language.about,
        content: page[`${this.state.language.type}_about`],
        image: {
          src: page.image.sizes.custom_thumb,
          alt: `${this.state.language.about}-picture`
        }
      }
    }


    //CONTACT PAGE
    else if (type === 'contact'){
      const contactIndex = data.findIndex((element) => {
        return element.title.rendered === 'kontakt'
      })

      const page = data[contactIndex].acf;

      return{
        name: page.name,
        titleID: this.state.language.contact,
        tel: '+48 ' + page.tel,
        email: page.email,
        emailArch: page.email_arch,
        adressStreet: page.adress_street,
        adressZip: page.adress_zip,
        nip: page.nip_itd,
        instagram: page.instagram,
        facebook: page.facebook,
        image: {
          src: page.image.sizes.custom_thumb,
          alt: `${this.state.language.contact}-picture`
        }
      }
    }
  }




  //// //// ////
  ////  managing the main loadin screen 
  ////
  isLoadingHandler = (loading) => {
    if (this.state.posts.length > 0 && this.state.about != null && this.state.contact != null){
      loading = false;
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
    document.title = `pracownia21: ${newTitle}`;
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
            posts={this.state.posts}>
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
        <Layout contactData={this.state.contact}>

          <Switch>
            <Route 
              path={`/${this.state.language.contact}`} render={(props => <SinglePage {...props}
                type="contact"
                pageData={this.state.contact}
                socialData={this.state.contact}/>)}
                />
            
            <Route 
              path={`/${this.state.language.about}`} render={(props => <SinglePage {...props}
                type="about"
                pageData={this.state.about}
                socialData={this.state.contact}/>)}
                />

            <Route 
              path='/:id' render={(props) => <SingleProject {...props} 
                posts={this.state.posts} 
                title={this.changeTitleHandler}
                loading={this.isLoadingHandler}/>}/>

            <Route render={projects}/>

          </Switch>
          
        </Layout>

        <LoadingScreen 
          visible={this.state.loading}
          type={this.state.loadingType}>
        </LoadingScreen>

      </Provider>

    );
  }
}

export default App;
