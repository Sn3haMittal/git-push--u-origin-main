import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from '../../common/header/Header';

export default function Home() {


    return (
        <div className="home">
            <h1>This is Home page</h1>
        </div>
    )

    // return(
    //     <Router>
    //         <div>
    //             <Route exact path='/' render={ () => <Header />} />
    //         </div>
            
    //     </Router>)
    
}