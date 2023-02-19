import './Filieres.css'
import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../../../Api/FilieresApi'
import Swal from 'sweetalert2';

function Filieres() {
    const [allFiliers, setAllFiliers] = useState([]);
    const [refresh, setRefresh] = useState(false);

    const retrieveFiliere = async()=>{
        const response = await api.get("/all");
        return response.data;
    };
    const LoadUpdate = async(id,nom,error)=>{

        let html=""
        if(nom===''){
            html = `<div style="color:red;">Merci de remplir le nom</div>`+
            `<input value='' style="border-color:red;"  id="swal-input1" class="swal2-input" placeholder="Entrez le nom du Filiere">`
        }else if(error!==""){
            html = `<div style="color:red;">${error}</div>`+
            `<input value='' style="border-color:red;"  id="swal-input1" class="swal2-input" placeholder="Entrez le nom du Filiere">`
        }
        else if(nom!==''){
            html = `<input value=${nom}   id="swal-input1" class="swal2-input" placeholder="Entrez le nom du Filiere">`
        }
        Swal.fire({
            title: 'Modifier le filiere ',
            html:html,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                ]
                
            }
        }).then((result) => {
            if (result.value[0]==='') {
                LoadUpdate(id,result.value[0])
            }else{
                const filiere = {nom: result.value[0]};
                api.put(`/update/${id}`,filiere)
                .then(response=>{
                    Swal.fire(
                        'Modifier !',
                        'Votre filiére a été Modifier.',
                        'success'
                    )
                    api.get("/all").then((response)=>(
                        setAllFiliers(response.data)
                    ))
                }).catch(error => { 
                    console.log("from catch")
                    LoadUpdate(id,result.value[0],"Filiere déja existe")
                })
            }
        });
    }

    const LoadDelete = async(id)=>{
        console.log(id)
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
                api.delete(`/delete/${id}`).then(Response=>{
                Swal.fire({
                    position:'top-end',
                    text:'Votre matiére a été supprimé.',
                    icon:'success',
                    showConfirmButton: false,
                    timer: 1000
                }).then((result) => {
                    api.get("/all").then((response)=>(
                        setAllFiliers(response.data)
                    ))
                })
            }).catch(error => {
                console.log(error.message)
            })
            } 
        })
    }

    const LoadCreate = async(nom,error)=>{

        let html=""
        if(nom===''){
            html = `<div style="color:red;">Merci de remplir le nom</div>`+
            `<input value='' style="border-color:red;"  id="swal-input1" class="swal2-input" placeholder="Entrez le nom du Filiere">`
        }else if(error!==""){
            html = `<div style="color:red;">Filiere déja existe</div>`+
            `<input value='' style="border-color:red;"  id="swal-input1" class="swal2-input" placeholder="Entrez le nom du Filiere">`
        }
        else if(nom!==''){
            html = `<input value=${nom}   id="swal-input1" class="swal2-input" placeholder="Entrez le nom du Filiere">`
        }
        Swal.fire({
            title: 'Ajouter le filiere ',
            html:html,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                ]
                
            }
        }).then((result) => {
            if (result.value[0]==='') {
                LoadCreate(result.value[0],'')
            }else{
                console.log(result.value[0])
                const filiere = {nom: result.value[0]};
                api.post('/save/',filiere)
                .then(response=>{
                    Swal.fire(
                        'ajouter !',
                        'Votre filiére a été Ajouter.',
                        'success'
                    )
                    api.get("/all").then((response)=>(
                        setAllFiliers(response.data)
                    ))
                }).catch(error => { 
                    console.log("from catch")
                    LoadCreate(result.value[0],"Filiere déja existe")
                })
            }
        });
    }

    const [name, setName] = useState('')
    useEffect(()=>{
        const getAllFilieres = async()=>{
            const allFilieres = await retrieveFiliere();
            if(allFilieres) setAllFiliers(allFilieres);
        };
        
        if(name!==''){
            api.get(`/find/${name}`).then((response)=>(
            setAllFiliers(response.data)
            ))
        }else getAllFilieres();
        

    },[name])
    const [allMatiers, setAllMatiers]= useState();
    const LoadDisplyMatiere = (nom)=>{
        api.get(`/find/matieres-premieres-filiere/${nom}`).then((response)=>{
            setAllMatiers(response.data)

        })
        allMatiers.map((itm)=>(
            console.log(itm.code)
        ))
    }

    return (
        <div className="table">
            <div className="table_header">
                <p>Gestion Des Filieres</p>
                <div className="">
                    <input value={name} onChange={e => setName(e.target.value)}  placeholder='Filiere...'/>
                    <button onClick={()=>LoadCreate('','')} className='ajouter'>+ Ajouter Filiere</button>
                </div>
            </div>
            <div className="table_section">
                <table className="">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nom</th>
                            <th>Matieres</th>
                            <th>Actions</th>

                        </tr>
                    </thead>
                    <tbody>
                    {
                        Array.isArray(allFiliers)
                        ? 
                        allFiliers.map((filiere, index)=>(
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{filiere.nom}</td>
                                <td>
                                <select onClick={()=>LoadDisplyMatiere(filiere.nom)} class="form-select form-select-lg mb-3 allmatiereFiliere" aria-label=".form-select-lg example">
                                    <option selected>Voir les matieres premieres</option>
                                            
                                    {
                                        Array.isArray(allMatiers)
                                        ?
                                        allMatiers.map((item)=>(
                                            <option value="1">{item.code}</option>
                                        ))
                                        :null
                                    }
                                </select>
                                </td>
                                <td className='actions'>
                                    <button className='updateButton' onClick={()=>LoadUpdate(filiere.id, filiere.nom,'')}><i className="fa-solid fa-pen-to-square"></i></button>
                                    <button className='delteButton' onClick={()=>LoadDelete(filiere.id)}><i className="fa-solid fa-trash"></i></button>                                </td>
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

export default Filieres
