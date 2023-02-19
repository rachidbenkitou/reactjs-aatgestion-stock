import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../../../../Api/FournisseurApi'
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

const UpdateFournisseur =() => {
    const navigate = useNavigate();
    const param = useParams();
    const [id, setId] = useState("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [telephone, setTelephone] = useState("");
    const [email, setEmail] = useState("");
    const [ice, setIce] = useState("");
    
    

    const [classnom, setClassnom] = useState('form-control');
    const [classprenom, setClassprenom] = useState('form-control');
    const [classtelephone,setClasstelephone] = useState('form-control');
    const [classemail,setClassemail] = useState('form-control');
    const [classice,setClassice] = useState('form-control');
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
            // const iceNumber = parseInt(ice);
            //const stockinitialNumber = parseInt(stockinitial);
            // const totalEntrerNumber = parseInt(totalEntrer);
            // const totalSorterNumber = parseInt(totalSorter);
            const matierData = {id,nom,prenom,telephone,email,ice};
                
            await api.put(`/update/${ice}`,matierData).then(Response=>{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Votre fournisseur a été modifier.',
                    showConfirmButton: false,
                    timer: 500
                })
                navigate('/dashboard/intervenant/fournisseur')
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
    useEffect(()=>{
        // console.log(param.id)
        api.get(`/find/${param.id}`).then(Response=>{
            setIce(param.id)
            setId(Response.data[0]['id'])
            setTelephone(Response.data[0]['telephone'])
            setEmail(Response.data[0]['email'])
            setNom(Response.data[0]['nom'])
            setPrenom(Response.data[0]['prenom'])
        }).catch(error => {
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Fournisseur Introuvable!',
                showConfirmButton: true,
            })
            navigate("/dashboard/Intervenant/fournisseur")
        });
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit} className='conatiner'>
                <div className="table_header">
                    <p>Modifier Un Fournisseur</p>
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
                    <div className="form-group col-md-5">
                    <label for="inputice">Ice</label>
                    <input readOnly value={ice} disabled onChange={e=>setIce(e.target.value)} type="text" className={classice} id="inputice" placeholder="Ice" />
                    </div>
                </div>
                    <button type="submit" className="btn btn-primary col-md-6 btn-center">Modifier</button>
                </div>
                
                
            </form>
        </div>
    )
}

export default UpdateFournisseur
