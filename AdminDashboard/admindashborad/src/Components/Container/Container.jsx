import React from 'react'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import { ForgotPassword, Login, Register } from '../../Pages'

import Footer from '../../Sections/Footer/Footer'
import Main from '../../Sections/Main/Main'
import SideBar from '../../Sections/SideBar/SideBar'
import TopBar from '../../Sections/TopBar/TopBar'

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
                        </Routes>
                        
                    </div>
                    <Footer/>
                </div>
            </div>
        </Router>
    )
}

export default Container