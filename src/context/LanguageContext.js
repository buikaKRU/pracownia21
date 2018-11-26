import React from 'react'

const language = React.createContext(
    {
        is: 'PL',
        projects: (is)=> ('test: ', is),
        about: '',
        contact: ''
    }
);

export default language;