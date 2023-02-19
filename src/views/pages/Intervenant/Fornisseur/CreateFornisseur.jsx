import React from 'react'
import './Fournisseur.css'
import './CreateFornisseur.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../../../Api/FournisseurApi'
import Swal from 'sweetalert2';
function CreateFornisseur() {

    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [ice, setIce] = useState("");

    const [classnom, setClassnom] = useState('form-control');
    const [classprenom, setClassprenom] = useState('form-control');
    const [classtelephone,setClasstelephone] = useState('form-control');
    const [classemail,setClassemail] = useState('form-control');
    const [classice,setClassice] = useState('form-control');

    const navigate = useNavigate();


    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(nom===""){
            setClassnom('form-control is-invalid')
        }else setClassnom('form-control is-valid')
        if(prenom===""){
            setClassprenom('form-control is-invalid')
        }else setClassprenom('form-control is-valid')
        if(telephone===""){
            setClasstelephone('form-control is-invalid')
        }else setClasstelephone('form-control is-valid')
        if(email===""){
            setClassemail('form-control is-invalid')
        }else setClassemail('form-control is-valid')
        if(ice===""){
            setClassice('form-control is-invalid')
        }else setClassice('form-control is-valid')
        if(nom!=="" && telephone!=="" && email!=="" && 
        ice!=="" && prenom!==""){
            // const stockActuelNumber = parseInt(stockActuel);
            //const stockinitialNumber = parseInt(stockinitial);
            // const totalEntrerNumber = parseInt(totalEntrer);
            // const totalSorterNumber = parseInt(totalSorter);
            const matierData = {nom,prenom,telephone,email,ice};
            await api.post("/save",matierData).then(Response=>{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Votre filiére a été ajoutée.',
                    showConfirmButton: false,
                    timer: 500
                })
                navigate('/dashboard/Intervenant/fournisseur')
            }).catch(error => {
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: 'Quelque chose s\'est mal passé!',
                    showConfirmButton: false,
                    timer: 2000
                })
            });
        }

    }
    return (
        <div>
            <form onSubmit={handleSubmit} className='conatiner'>
                <div className="table_header">
                    <p>Ajouter Une Fournisseur</p>
                    <div className="">
                        <Link to='/dashboard/Intervenant/fournisseur'><button className='ajouter'>Retour à Fournisseur </button></Link>
                    </div>
                </div>
                <div className='form-main'>
                <div className="form-row">
                    <div className="form-group col-md-5">
                    <label for="inputnom">nom</label>
                    <input value={nom} onChange={e=>setNom(e.target.value)} type="text" className={classnom} id="inputnom" placeholder="nom"/>
                    </div>
                    <div className="form-group col-md-5">
                    <label for="inputtelephone">prenom</label>
                    <input value={prenom} onChange={e=>setPrenom(e.target.value)} type="text" className={classprenom} id="inputtelephone" placeholder="prenom" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5">
                    <label for="inputNumeroBS">Eamil</label>
                    <input value={email} onChange={e=>setEmail(e.target.value)} type="email" className={classemail} id="inputNumeroBS" placeholder="Email" />
                    </div>
                    <div className="form-group col-md-5">
                    <label for="inputtelephone">telephone</label>
                    <input value={telephone} onChange={e=>setTelephone(e.target.value)} type="text" className={classtelephone} id="inputtelephone" placeholder="telephone" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-10">
                    <label for="inputice">Ice</label>
                    <input  value={ice} onChange={e=>setIce(e.target.value)} type="text" className={classice} id="inputice" placeholder="Ice" />
                    </div>
                </div>
                    <button type="submit" className="btn btn-primary col-md-6 btn-center">Ajouter</button>
                </div>
                
                
            </form>
        </div>
    )
}

export default CreateFornisseur