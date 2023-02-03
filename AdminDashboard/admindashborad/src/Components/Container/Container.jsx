import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ForgotPassword, Login, Register, NotFound } from '../../Pages'
import Filiere from '../../Pages/Filiere/Filiere'

import { Footer, Main, SideBar, TopBar } from '../../Sections'

function Container() {
    return (
        <Router>
            <div id="wrapper">
                <SideBar/>
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <TopBar/>
                        <Routes>
                            <Route path="/" element={<Main/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/register" element={<Register/>}/>
                            <Route path="/forgot-password" element={<ForgotPassword/>}/>
                            <Route path="/*" element={<NotFound/>}/>
                            <Route path="/allFiliere" element={<Filiere/>}/> 
                        </Routes>
                        
                    </div>
                    <Footer/>
                </div>
            </div>
        </Router>
    )
}

export default Container