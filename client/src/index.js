import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useEffect, useState} from 'react'
import {createRoot} from 'react-dom/client'
import NavBar from './components/Navbar'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

const App=()=>{

    return (
        <Router>
            <div className="app container">
                <NavBar />
                <Switch>

                </Switch>
            </div>
        </Router>
    )
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <App />
);
