import React, { useState } from 'react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../../../../Api/ReceptionnaireApi'
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
    const [cne, setCne] = useState("");
    
    

    const [classnom, setClassnom] = useState('form-control');
    const [classprenom, setClassprenom] = useState('form-control');
    const [classtelephone,setClasstelephone] = useState('form-control');
    const [classemail,setClassemail] = useState('form-control');
    const [classcne,setClasscne] = useState('form-control');
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
        if(cne===""){
            setClasscne('form-control is-invalid')
        }else setClasscne('form-control is-valid')
        if(nom!=="" && telephone!=="" && email!=="" && 
        cne!=="" && prenom!==""){
            // const cneNumber = parseInt(cne);
            //const stockinitialNumber = parseInt(stockinitial);
            // const totalEntrerNumber = parseInt(totalEntrer);
            // const totalSorterNumber = parseInt(totalSorter);
            const matierData = {id,nom,prenom,telephone,email,cne};
                
            await api.put(`/update/${cne}`,matierData).then(Response=>{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Votre receptionnaire a été modifier.',
                    showConfirmButton: false,
                    timer: 500
                })
                navigate('/dashboard/intervenant/receptionnaire')
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
            setCne(param.id)
            setId(Response.data[0]['id'])
            setTelephone(Response.data[0]['telephone'])
            setEmail(Response.data[0]['email'])
            setNom(Response.data[0]['nom'])
            setPrenom(Response.data[0]['prenom'])
        }).catch(error => {
            Swal.fire({
                position: 'top-center',
                icon: 'error',
                title: 'Matiere Introuvable!',
                showConfirmButton: true,
            })
            navigate("/dashboard/matieres")
        });
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit} className='conatiner'>
                <div className="table_header">
                    <p>Modifier Un Receptionnaire</p>
                    <div className="">
                        <Link to='/dashboard/Intervenant/fournisseur'><button className='ajouter'>Retour à Receptionnaire </button></Link>
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
                    <label for="inputcne">cne</label>
                    <input readOnly value={cne} disabled onChange={e=>setCne(e.target.value)} type="text" className={classcne} id="inputcne" placeholder="cne" />
                    </div>
                </div>
                    <button type="submit" className="btn btn-primary col-md-6 btn-center">Modifier</button>
                </div>
                
                
            </form>
        </div>
    )
}

export default UpdateFournisseur
