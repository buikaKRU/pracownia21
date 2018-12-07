import React, {Component} from 'react'
import PageLoader from '../../hoc/PageLoader/PageLoader';

import './SinglePage.scss'

import ImageComponent from '../ImageComponent/ImageComponent'
import LanguageContext from '../../context/LanguageContext';
import facebookImg from '../../assets/images/facebook.png';
import instagramImg from '../../assets/images/instagram.png';

class SinglePage extends Component {
//// //// ////
////  PAGE DISPLAYI'N 'about or 'contact'  
////


    state={
        pageType: null,
        imagesToLoad: 0,
        imagesLoaded: 0,
    }


    componentDidMount(){
        
        this.updateState(this.props)
        document.querySelector('.socialContainer').style.display="none"
    }


    componentWillUnmount(){
        document.querySelector('.socialContainer').style.display="block" 
    }


    componentWillReceiveProps(props){
        

        if (props.type !== this.state.pageType){
            props.showLoading();
        }
        this.updateState(props)
    }



    updateState(props){
        window.scrollTo(0, 0);

        if (props.pageData.titleID) {
            this.setState({
                pageType: props.type
            })
        }
    }

    imgLoadedHandler = () => {
        this.props.hideLoading();
    }


    pageContent = () => {
        
        if (this.state.pageType != null){
            const { Consumer } = LanguageContext;
            
            return (

                <Consumer>
                {language => {
                    return (
                        <>
                        <div className="imageContainer">
                            <ImageComponent 
                                src={this.props.pageData.image.src}
                                alt={this.props.pageData.image.alt}
                                imgLoaded={this.imgLoadedHandler}
                                absolute={true}
                                
                            />
                        </div>
        
                        <div className="contentContainer">
                            <div className="inner">
                                {this.state.pageType === 'contact' ? 
                                    this.contactPage(language) : 
                                    this.aboutPage(language)} 
                                {this.social("instagram")}
                                {this.social("facebook")}
                            </div>
                        </div>
        
                    </>
                    )
                }}
   
                </Consumer>
            )
        } else {
            return <p>loading</p>
        }
    }


    aboutPage = (language) => {

        return (
            <>
                <div dangerouslySetInnerHTML={{__html: this.props.pageData.content}}>
                </div>
            </>
        )
    }


    contactPage = (language) => {

        return (
            <>
              
                <h3>{language.contact}:</h3>

                <p>{this.props.pageData.name}</p>
                <p>
                    <a href={`https://www.google.com/maps/search/${this.props.pageData.adressStreet} ${this.props.pageData.adressZip}`}
                        target="_blank"
                        rel="noopener noreferrer">        
                        {this.props.pageData.adressStreet}<br/>{this.props.pageData.adressZip}
                    </a>
                </p>

                <p> tel: 
                    <a href={`tel:${this.props.pageData.tel}`}>
                        {this.props.pageData.tel}
                    </a>
                </p>

                <p>{language.office}: <br/>
                    <a href={`mailto:${this.props.pageData.email}`}>
                        {this.props.pageData.email}
                    </a>
                </p>

                 <p>{language.architecture}: <br/>
                    <a href={`mailto:${this.props.pageData.email_arch}`}>
                        {this.props.pageData.email}
                    </a>
                </p>

                 <p>{language.uPlanning}: <br/>
                    <a href={`mailto:${this.props.pageData.email_urb}`}>
                        {this.props.pageData.email}
                    </a>
                </p>

             

                <div dangerouslySetInnerHTML={{__html: this.props.pageData.nip}}>
                    {/* {this.props.pageData.nip}  */}
                </div>
                    
 

            </>
        )
    }

    social = (element) => {
        if (this.props.socialData[element] !== ""){
            
            return (
                <a href={this.props.socialData[element]}
                    target="_blank"
                    rel="noopener noreferrer">
                    <img 
                        src={element === "instagram" ? instagramImg : facebookImg}
                        className="socialImg"
                        alt="instagramlogo"/>
                </a>
            )
        } else {
            return null
        }
    }


    render(){
        return(
            <div className="singlePage">
                {this.pageContent()}
            </div>
        )
    }
}



export default PageLoader(SinglePage);