import './Matieres.css'
import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../../../Api/MatiereApi'
import apiTransaction from '../../../Api/FournisseurTransationApi'
import apiTransactionRec from '../../../Api/ReceptionnaireTransationApi'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios'



function Matieres() {
    const [options, setOptions] = useState("");

    const handleOptionChange = (event) => {
        setOptions(event.target.value);
    };
    
    

    const [allMatieres, setAllMatieres] = useState([]);
    const navigate = useNavigate()
    const LoadUpdate = (code) =>{
        navigate(`/dashboard/matieres/editMatiere/${code}`)
    }
    const LoadDelete = (codeMatiere) =>{
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
                api.delete(`/delete/${codeMatiere}`).then(Response=>{
                Swal.fire({
                    position:'top-end',
                    text:'Votre matiére a été supprimé.',
                    icon:'success',
                    showConfirmButton: false,
                    timer: 1000
                }).then((result) => {
                    api.get("/all").then((response)=>(
                        setAllMatieres(response.data)
                    ))
                })
            }).catch(error => {
                console.log(error.message)
            })
            } 
        })
    }


    const [isChekeds, setIsChekeds] = useState([]);
    const [formattedIsChekeds, setFormattedIsChekeds] = useState([]);

    function handleOptionSelect(event) {
        const checkboxCode = event.target.value;
        const selectIsChecked = isChekeds.find(option => option.code === checkboxCode);

        if(options!==""){
            if(options==="entree"){
                Swal.fire({
                title: 'Ajouter Transaction ',
                html:`<input value=''  id="swal-input1" class="swal2-input" placeholder="Entrez la Quantite">`+
                `<input value=''  id="swal-input4" class="swal2-input" placeholder="Entrez le Lieu">`+
                `<input value=''  id="swal-input2" class="swal2-input" placeholder="Entrez le ICE">`+
                `<input value=''  id="swal-input3" class="swal2-input" placeholder="Entrez le PUHT">`,
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value,
                        document.getElementById('swal-input3').value,
                        document.getElementById('swal-input4').value,
                    ]
                    
                }
            }).then((result) => {
                let formattedCheckBox
                if (result.value[0]!==''&&result.value[1]!==''&&result.value[2]!=='') {
                    formattedCheckBox =(
                    { 
                        articleCode: selectIsChecked.code,
                        unite:selectIsChecked.unite,
                        fournisseurMatiereId:null,
                        matierePremiere:null,
                        fournisseur:null,
                        dateTransaction:'',
                        lastModified:'',
                        quantiteLivre:result.value[0],
                        isConfirmed:false,
                        isUrgence:false, 
                        fournisseurIce:result.value[1],
                        puHt:result.value[2],
                        lieuAffectation:result.value[3],
                        articleDesignation:selectIsChecked.designation
                    }
                    
                    );
                    setFormattedIsChekeds([...formattedIsChekeds,formattedCheckBox]);
                }
    
            })
            }else{
                Swal.fire({
                    title: 'Ajouter Transaction ',
                    html:`<input value=''  id="swal-input1" class="swal2-input" placeholder="Entrez la Quantite">`+
                    `<input value=''  id="swal-input2" class="swal2-input" placeholder="Entrez le CNE">`,
                    focusConfirm: false,
                    preConfirm: () => {
                        return [
                            document.getElementById('swal-input1').value,
                            document.getElementById('swal-input2').value,
                        ]
                        
                    }
                }).then((result) => {
                    let formattedCheckBox
                    if (result.value[0]!==''&&result.value[1]!=='') {
                        formattedCheckBox =(
                        { 
                            articleCode: selectIsChecked.code,
                            unite:selectIsChecked.unite,
                            receptionnaireMatiereId:null,
                            matierePremiere:null,
                            receptionnaire:null,
                            dateTransaction:'',
                            lastModified:'',
                            quantiteLivre:result.value[0],
                            isConfirmed:false,
                            isUrgence:false, 
                            receptionnaireCne:result.value[1],
                            articleDesignation:selectIsChecked.designation
    
                        }
                        );
                        setFormattedIsChekeds([...formattedIsChekeds,formattedCheckBox]);
                        // setIsChekeds([])
        
                    }
        
                })
            }
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Essayer de choisir un type de transaction!',
            })
        }
    }

    const retrieveMatieres = async()=>{
        const response = await api.get("/all");

        setIsChekeds(response.data)

        return response.data;
    };
    const [name, setName] = useState('')
    useEffect(()=>{
    const getAllMatieres = async()=>{
        const allMatieres = await retrieveMatieres();
        if(allMatieres) setAllMatieres(allMatieres);
    };
    if(name!==''){
        api.get(`/find/code/${name}`).then((response)=>(
            setAllMatieres(response.data)
        ))
    }else getAllMatieres();

    },[name])


    // *****************
    const apiUrl = 'http://localhost:1010/pdf/facturesortie';
    const apiUrlEntree = 'http://localhost:1010/pdf/facturereception';

    function hundlpdf() {
        // console.log("vvvvvvvvvvvvvvvv")
        if(options==="entree"){
            formattedIsChekeds.map((item)=>{
                apiTransaction.post("/save",item)
                axios({
                    url: apiUrlEntree,
                    method: 'POST',
                    data: formattedIsChekeds,
                    responseType: 'blob', // important
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'facture_de_reception.pdf'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
                
        })
        }else if(options==="sortie"){

            formattedIsChekeds.map((item)=>{
                apiTransactionRec.post("/save",item)
                axios({
                    url: apiUrl,
                    method: 'POST',
                    data: formattedIsChekeds,
                    responseType: 'blob', // important
                }).then((response) => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'facture_de_sortie.pdf'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                });
                
        })
        }

        setFormattedIsChekeds([])
    }
    
    return (
        <div>
            {/* <!-- Example split danger button --> */}
            <div className="btn-group">
            <button type="button" className="btn btn-info  dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Transaction
            </button>
            <div className="dropdown-menu">
           
                <div className="form-check">
                <input onChange={handleOptionChange} className="form-check-input" value="entree" type="radio" name="flexRadioDefault" id="flexRadioDefault1"/>
                <label className="form-check-label" htmlFor="flexRadioDefault1"> Entree </label>
                </div>

              
                <div className="form-check">
                <input onChange={handleOptionChange} className="form-check-input" value="sortie" type="radio" name="flexRadioDefault" id="flexRadioDefault2"/>
                <label className="form-check-label" htmlFor="flexRadioDefault2"> Sortie </label>
                </div>
            </div>
            </div>
            <div className="table">
                <div className="table_header tab-header">
                    <p>Gestion Des Maitieres</p>
                    <div className="">
                        <input value={name} onChange={e => setName(e.target.value)} placeholder='Matiere...'/>
                        <Link to='/dashboard/matieres/ajouter'><button className='ajouter'>+ Ajouter Maitiere</button></Link>
                        <button onClick={()=>hundlpdf()} className='btn btn-warning pdf'>PDF</button>
                    </div>
                </div>
                
                <div className="table_section">
                    <table className="table tableMatiere">
                        <thead>
                            <tr>
                                <th></th>
                                <th>code</th>
                                <th>designation</th>
                                <th>Numero BS</th>
                                <th>stock Actuel</th>
                                <th>stock Initial</th>
                                <th>totale Entree</th>
                                <th>totale Sortie</th>
                                <th>unite</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            Array.isArray(allMatieres)
                            ? 
                            allMatieres.map((matiere, index)=>(
                                <tr key={index}>
                                    <td>
                                    <div className="form-check form-switch">
                                        <input onChange={handleOptionSelect} value={matiere.code} className="form-check-input" type="checkbox" id={`checkbox-${index}`} />
                                        <label className="form-check-label" htmlFor={`checkbox-${index}`}>{matiere.name}</label>
                                    </div>
                                    </td>
                                    <td>{matiere.code}</td>
                                    <td>{matiere.designation}</td>
                                    <td>{matiere.numeroBrNumeroBs}</td>
                                    <td>{matiere.stockActuel}</td>
                                    <td>{matiere.stockInitial}</td>
                                    <td>{matiere.totaleEntree}</td>
                                    <td>{matiere.totaleSortie}</td>
                                    <td>{matiere.unite}</td>
                                    <td className='actions'>
                                        <button className='updateButton' onClick={()=>LoadUpdate(matiere.code)}><i className="fa-solid fa-pen-to-square"></i></button>
                                        <button className='delteButton' onClick={()=>LoadDelete(matiere.code)}><i className="fa-solid fa-trash"></i></button>
                                    </td>
                            </tr>
                            ))
                            :null
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Matieres