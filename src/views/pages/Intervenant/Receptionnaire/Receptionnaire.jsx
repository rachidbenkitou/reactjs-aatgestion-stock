import './Receptionnaire.css'
import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../../../../Api/ReceptionnaireApi'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Fournisseur() {

    const [allReceptionnaire, setAllReceptionnaire] = useState([]);
    const navigate = useNavigate()
    const LoadUpdate = (id) =>{
        navigate(`/dashboard/intervenant/receptionnaire/editreceptionnaire/${id}`)
    }
    const LoadDelete = (cne) =>{
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
            })
            
            swalWithBootstrapButtons.fire({
            title: 'Êtes-vous sûr ?',
            text: "Vous ne pourrez pas revenir en arrière !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimez-le!',
            cancelButtonText: 'Non, annuler!',
            reverseButtons: true
            }).then((result) => {
            if (result.isConfirmed){
                api.delete(`/delete/${cne}`).then(Response=>{
                Swal.fire({
                    position:'top-end',
                    text:'Votre receptionnaire a été supprimé.',
                    icon:'success',
                    showConfirmButton: false,
                    timer: 1000
                }).then((result) => {
                    api.get("/all").then((response)=>(
                        setAllReceptionnaire(response.data)
                    ))
                })
            }).catch(error => {
                console.log(error.message)
            })
            } 
        })
    }
    
    const retrieveReceptionnaire = async()=>{
        const response = await api.get("/all");
        return response.data;
    };
    const [name, setName] = useState('')
    useEffect(()=>{
        const getallReceptionnaire = async()=>{
            const allMatieres = await retrieveReceptionnaire();
            if(allMatieres) setAllReceptionnaire(allMatieres);
        };
        if(name!==''){
            api.get(`/find/${name}`).then((response)=>(
                setAllReceptionnaire(response.data)
            ))
        }else getallReceptionnaire();
    },[name])

    return (
        <div className="table">
            <div className="table_header tab-header">
                <p>Gestion Des Receptionnaire</p>
                <div className="">
                    <input value={name} onChange={e => setName(e.target.value)} placeholder='Receptionnaire...'/>
                    <Link to='/dashboard/intervenant/receptionnaire/ajouter'><button className='ajouter'>+ Ajouter Receptionnaire</button></Link>
                </div>
            </div>
            <div className="table_section">
                <table className="table tableMatiere">
                    <thead>
                    {/* // [{"id":2,"nom":"ffff","telephone":"ffff","email":"fff","cne":"fff"}] */}
                        <tr>
                            <th>#</th>
                            <th>nom</th>
                            <th>prenom</th>
                            <th>telephone</th>
                            <th>email</th>
                            <th>cne</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Array.isArray(allReceptionnaire)
                        ? 
                        allReceptionnaire.map((fournisseur, index)=>(
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{fournisseur.nom}</td>
                                <td>{fournisseur.prenom}</td>
                                <td>{fournisseur.telephone}</td>
                                <td>{fournisseur.email}</td>
                                <td>{fournisseur.cne}</td>
                                <td className='actions'>
                                    <button className='updateButton' onClick={()=>LoadUpdate(fournisseur.cne)}><i className="fa-solid fa-pen-to-square"></i></button>
                                    <button className='delteButton' onClick={()=>LoadDelete(fournisseur.cne)}><i className="fa-solid fa-trash"></i></button>
                                </td>
                        </tr>
                        ))
                        :null
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Fournisseur
