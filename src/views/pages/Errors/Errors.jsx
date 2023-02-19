import React from 'react'
import { Link } from 'react-router-dom'
import './Errors.css'
import logo from '../../../assets/images/5203299.jpg'

function Errors() {
    return (
            
            <div className="wrapper">
                <img className='image' src={logo} alt=''/>
                <h3 className="">Page introuvable</h3>
                <p className='message'>Voici quelque chose que vous pouvez toujoures trouver.
                    ou essayez l'une de ces recherches: Gestion des filieres Gestion des matieres
                </p>
                <Link className='btn' to='/'> la page d'accueil</Link>
            </div>
    )
}

export default Errors
