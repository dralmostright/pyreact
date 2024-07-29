import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/main.css'
import React from 'react'
import {createRoot} from 'react-dom/client'
import NavBar from './components/Navbar'
import SignUpPage from './components/SignUp'
import HomePage from './components/Home'
import LoginPage from './components/Login'
import CreateRecipePage from './components/CreateRecipe'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom"

const App=()=>{

    return (
        <Router>
            <div className="app">
                <NavBar />
                <Routes>
                    <Route exact path="/" element={<HomePage/>}/>
                    <Route exact path="/login" element={<LoginPage/>}/>
                    <Route exact path="/signup" element={<SignUpPage/>}/>
                    <Route exact path="/createrecipe" element={<CreateRecipePage/>}/>
                </Routes>
            </div>
        </Router>
    )
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
    <App />
);
