import React, { useState } from 'react'
import './Sidebar.css'

import {Link} from 'react-router-dom'
import {Dashboard} from '../index'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import '../../styles/style.css';
import {Filieres,
    Matieres,CreateMatiere, UpdateMatiere,
    Fournisseur, CreateFornisseur,UpdateFournisseur, 
    Receptionnaire, CreateReceptionnaire, UpdateReceptionnaire, 
    Entree, UpdateEntree,
    Sortie,
    Errors} from'../../views/index'
// import Footer from '../Footer/Footer'
function Sidebar() {
    /*   
    import { FaBeer } from 'react-icons/fa'; 
    const style = { color: "white", fontSize: "1.5em" }
    <FaBeer onClick={changeStylePhone} style={style}/>
    */
    const [classe, setClasse] = useState("sidebar show")
    const [classeHeder, setclasseHeder] = useState("header space-toggle")
    const [classeDash, setclasseDash] = useState("dashboard-normal")
    const changeStylePhone = ()=>{
        if(classe==="sidebar show"){
            setClasse("sidebar toggle")
        }else{
            setClasse("sidebar show")
        }
        if(classeHeder==="header space-toggle"){
            setclasseHeder("header space-toggle2")
        }else{
            setclasseHeder("header space-toggle")
        }
        if(classeDash==="dashboard-normal"){
            setclasseDash("dashboard-toggel")
        }else{
            setclasseDash("dashboard-normal")
        }
    }
    return (
        <Router>
        
            <div>
                <main className='space-toggle'>
                    <header className={classeHeder}>
                        <div className="header-toggle">
                            <i onClick={changeStylePhone} className="fa fa-bars nav-logo-icon"></i>
                            {/* <i onClick={changeStylePhone} className="fa-solid fa-arrow-left nav-logo-icon"></i> */}
                        </div>
                    </header>
                    <aside className={classe}>
                        <nav className="nav">
                            <div>
                                <Link to="/" className="nav-logo">
                                    <i className="fas fa-home-alt nav-logo-icon"></i>
                                    {/* <i onClick={changeStylePhone} className="fa fa-bars nav-logo-icon"></i> */}

                                    <span className="nav-logo-name">Home</span>
                                </Link>
                                <div className="nav-list">
                                    <Link to="/dashboard" className="nav-link">
                                        <i className="fa fa-tachometer-alt nav-link-icon"></i>
                                        <span className="nav-link-name">Dashboard</span>
                                    </Link>
                                    
                                    <Link to="/dashboard/filiers" className="nav-link">
                                        <i className="fa-solid fa-chalkboard-user nav-link-icon"></i>
                                        <span className="nav-link-name">Filiere</span>
                                    </Link>
                                    <Link to="/dashboard/matieres" className="nav-link">
                                        {/* <i className="fa fa-tachometer-alt nav-link-icon"></i> */}
                                        {/* <i class="bi bi-boxes nav-link-icon"></i> */}
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-boxes nav-link-icon" viewBox="0 0 16 16">
                                            <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434L7.752.066ZM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567L4.25 7.504ZM7.5 9.933l-2.75 1.571v3.134l2.75-1.571V9.933Zm1 3.134 2.75 1.571v-3.134L8.5 9.933v3.134Zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567-2.742 1.567Zm2.242-2.433V3.504L8.5 5.076V8.21l2.75-1.572ZM7.5 8.21V5.076L4.75 3.504v3.134L7.5 8.21ZM5.258 2.643 8 4.21l2.742-1.567L8 1.076 5.258 2.643ZM15 9.933l-2.75 1.571v3.134L15 13.067V9.933ZM3.75 14.638v-3.134L1 9.933v3.134l2.75 1.571Z"/>
                                        </svg>
                                        <span className="nav-link-name">Matieres</span>
                                    </Link>
                                    <Link to="/dashboard/Intervenant/fournisseur" className="nav-link">
                                        {/* <i className="fa fa-tachometer-alt nav-link-icon"></i> */}
                                        <i className="fa-solid fa-truck-field nav-link-icon"></i>
                                        <span className="nav-link-name">Fornisseur</span>
                                    </Link>
                                    <Link to="/dashboard/Intervenant/receptionnaire" className="nav-link">
                                        {/* <i className="fa fa-tachometer-alt nav-link-icon"></i> */}
                                        {/* <i class="fa-thin fa-user-tie nav-link-icon"></i> */}
                                        <i className="fa-solid fa-user-tie nav-link-icon"></i>
                                        <span className="nav-link-name">Receptionnaire</span>
                                    </Link>
                                    <Link to="/dashboard/transactions/entree" className="nav-link">
                                        <i className="fa fa-dollar-sign nav-link-icon"></i>
                                        <span className="nav-link-name">Entree</span>
                                    </Link>
                                    <Link to="/dashboard/transactions/sortie" className="nav-link">
                                        <i className="fa fa-dollar-sign nav-link-icon"></i>
                                        <span className="nav-link-name">Sortie</span>
                                    </Link>
                                </div>
                            </div>
                            <Link to="/logout" className="nav-link">
                                {/* <i className="fa fa-tachometer-alt nav-link-icon"></i> */}
                                <i className="fa fa-sign-out-alt nav-link-icon" ></i>
                                <span className="nav-link-name">Logout</span>
                            </Link>
                        </nav>
                    </aside>
                </main>
                <div className={classeDash}>
                    <Routes>
                        <Route path="/" element={<Dashboard/>}/>

                        <Route path="/dashboard" element={<Dashboard/>}/>

                        <Route path="/dashboard/filiers" element={<Filieres/>}/>

                        <Route path="/dashboard/matieres" element={<Matieres/>}/>
                        <Route path="/dashboard/matieres/ajouter" element={<CreateMatiere/>}/>
                        <Route path="/dashboard/matieres/editMatiere/:code" element={<UpdateMatiere/>}/>

                        <Route path="/dashboard/intervenant/fournisseur" element={<Fournisseur/>}/>
                        <Route path="/dashboard/intervenant/fournisseur/ajouter" element={<CreateFornisseur/>}/>
                        <Route path="/dashboard/intervenant/fournisseur/editFournisseur/:id" element={<UpdateFournisseur/>}/>

                        <Route path="/dashboard/intervenant/receptionnaire" element={<Receptionnaire/>}/>
                        <Route path="/dashboard/intervenant/receptionnaire/ajouter" element={<CreateReceptionnaire/>}/>
                        <Route path="/dashboard/intervenant/receptionnaire/editReceptionnaire/:id" element={<UpdateReceptionnaire/>}/>

                        <Route path="/dashboard/transactions/entree" element={<Entree/>}/>
                        <Route path="/dashboard/transaction/entree/editEntree/:id" element={<UpdateEntree/>}/>

                        <Route path="/dashboard/transactions/sortie" element={<Sortie/>}/>




                        <Route path="/*" element={<Errors/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    )
}

export default Sidebar
