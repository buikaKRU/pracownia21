import React from 'react';

import Layout from '../../hoc/Layout/Layout';


const singleProject = (props) => {


    props.title('some project')
    console.log('[singleProject]props = ', props);

    const url = props.match.params.id;

    if (props.posts.length > 0){
        const projectNames = props.posts.map(element => {
            console.log('element = ', element);
            return element.titleID;
        })
    
        console.log('projectNames = ', projectNames);
        
        const projectIndex = projectNames.findIndex(element => {
            return element === url;
        })
    
        console.log('projectIndex = ', projectIndex);
        
    }
    
    return (
        <>
        <p>single project</p>
        <h1>{props.match.params.id}</h1>
        </>
    )
}


export default Layout(singleProject);