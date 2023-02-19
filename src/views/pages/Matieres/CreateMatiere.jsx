import React, { useEffect } from 'react'
import './Matieres.css'
import './CreateMatiere.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import api from '../../../Api/MatiereApi'
import apifiliere from '../../../Api/FilieresApi'
import Swal from 'sweetalert2';
function CreateMatiere() {

    const [options, setOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [formattedOptions, setFormattedOptions] = useState([])

    function handleOptionSelect(event) {
        const optionId = parseInt(event.target.value);
        const selectedOption = options.find(option => option.id === optionId);
        const updatedOptions = [...selectedOptions, selectedOption];
        const formattedOptions = updatedOptions.map(option => ({id:option.id,nom: option.nom }));
        setSelectedOptions(updatedOptions);
        setFormattedOptions(formattedOptions);
        console.log("setFormattedOptionscvvvcc")
        console.log(formattedOptions)
    }

    useEffect(()=>{
        apifiliere.get("/all")
    .then(response => {
        setOptions(response.data);
    })
    },[])
    const [code, setCode] = useState("");
    const [designation, setDesignation] = useState("");
    const [numeroBrNumeroBs, setNumeroBrNumeroBs] = useState("");
    const [stockActuel, setStockActuel] = useState("");
    const [stockInitial, setStockInitial] = useState("");
    const [totaleEntree, setTotalEntree] = useState("");
    const [totaleSortie, setTotalSortie] = useState("");
    const [unite, setUnite] = useState("");

    const navigate = useNavigate();

    const [classCode, setClassCode] = useState('form-control');
    const [classDesignation,setClassDesignation] = useState('form-control');
    const [classNumeroBrNumeroBs,setClassNumeroBrNumeroBs] = useState('form-control');
    const [classsTockActuel,setClasssTockActuel] = useState('form-control');
    const [classsTockinitial,setClasssTockinitial] = useState('form-control');
    const [classTotalEntrer,setClassTotalEntrer] = useState('form-control');
    const [classTotalSorter,setClassTotalSorter] = useState('form-control');
    const [classUnite,setClassUnite] = useState('form-control');
    const [classSelect,setClassClassSelect] = useState('form-control');

    const handleSubmit = async(e)=>{
        e.preventDefault();
        if(code===""){
            setClassCode('form-control is-invalid')
        }else setClassCode('form-control is-valid')
        if(designation===""){
            setClassDesignation('form-control is-invalid')
        }else setClassDesignation('form-control is-valid')
        if(numeroBrNumeroBs===""){
            setClassNumeroBrNumeroBs('form-control is-invalid')
        }else setClassNumeroBrNumeroBs('form-control is-valid')
        if(stockActuel===""){
            setClasssTockActuel('form-control is-invalid')
        }else setClasssTockActuel('form-control is-valid')
        if(stockInitial===""){
            setClasssTockinitial('form-control is-invalid')
        }else  setClasssTockinitial('form-control is-valid')
        if(totaleEntree===""){
            setClassTotalEntrer('form-control is-invalid')
        }else  setClassTotalEntrer('form-control is-valid')
        if(totaleSortie===""){
            setClassTotalSorter('form-control is-invalid')
        }else  setClassTotalSorter('form-control is-valid')
        if(unite===""){
            setClassUnite('form-control is-invalid')
        }else setClassUnite('form-control is-valid')
        if(formattedOptions.length===0){
            setClassClassSelect('form-control is-invalid')
        }else setClassClassSelect('form-control is-valid')
        if(code!=="" && designation!=="" && numeroBrNumeroBs!=="" && 
        stockActuel!=="" && stockInitial!=="" && totaleEntree!=="" &&
        totaleSortie!=="" && unite!=="" && formattedOptions.length>0){
            // const stockActuelNumber = parseInt(stockActuel);
            //const stockinitialNumber = parseInt(stockinitial);
            // const totalEntrerNumber = parseInt(totalEntrer);
            // const totalSorterNumber = parseInt(totalSorter);
            const matierData = {code,designation,numeroBrNumeroBs,
                stockActuel,stockInitial,totaleEntree,
                totaleSortie,unite,filieres:formattedOptions};
            await api.post("/save",matierData).then(Response=>{
                Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Votre filiére a été ajoutée.',
                    showConfirmButton: false,
                    timer: 500
                })
                navigate('/dashboard/matieres/')
            }).catch(error => {
                console.log(error.message)
                console.log(error)
                Swal.fire({
                    position: 'top-end',
                    icon: 'error',
                    title: error.message,
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
                    <p>Ajouter Une Maitiere</p>
                    <div className="">
                        <Link to='/dashboard/matieres/'><button className='ajouter'>Retour à Matières </button></Link>
                    </div>
                </div>
                <div className='form-main'>
                <div className="form-row">
                    <div className="form-group col-md-5">
                    <label for="inputCode">Code</label>
                    <input value={code} onChange={e=>setCode(e.target.value)} type="text" className={classCode} id="inputCode" placeholder="Code"/>
                    </div>
                    <div className="form-group col-md-5">
                    <label for="inputDesignation">Designation</label>
                    <input value={designation} onChange={e=>setDesignation(e.target.value)} type="text" className={classDesignation} id="inputDesignation" placeholder="Designation" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5">
                    <label for="inputNumeroBS">Numero BS</label>
                    <input value={numeroBrNumeroBs} onChange={e=>setNumeroBrNumeroBs(e.target.value)} type="text" className={classNumeroBrNumeroBs} id="inputNumeroBS" placeholder="Numero BS" />
                    </div>
                    <div className="form-group col-md-5">
                    <label for="inputStockActuel">Stock Actuel</label>
                    <input value={stockActuel} onChange={e=>setStockActuel(e.target.value)} type="number" className={classsTockActuel} id="inputStockActuel" placeholder="Stock Actuel" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5">
                    <label for="inputStockinitial">Stock initial</label>
                    <input value={stockInitial} onChange={e=>setStockInitial(e.target.value)} type="number" className={classsTockinitial} id="inputStockinitial" placeholder="Stock initial" />
                    </div>
                    <div className="form-group col-md-5">
                    <label for="inputTotalEntrer">Total Entrer</label>
                    <input value={totaleEntree} onChange={e=>setTotalEntree(e.target.value)} type="number" className={classTotalEntrer} id="inputTotalEntrer" placeholder="Total Entrer" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5">
                    <label for="inputTotalSorter">Total Sorter</label>
                    <input value={totaleSortie} onChange={e=>setTotalSortie(e.target.value)} type="number" className={classTotalSorter} id="inputTotalSorter" placeholder="Total Sorter" />
                    </div>
                    <div className="form-group col-md-5">
                    <label for="inputUnite">Unite</label>
                    <input value={unite} onChange={e=>setUnite(e.target.value)} type="text" className={classUnite} id="inputTotlaEntrer" placeholder="Unite"/>
                    </div>
                </div>
                <div className="form-row">
                <div className="form-group col-md-10">
                    <label for="inputState">Filieres</label>
                    <select  onChange={handleOptionSelect}  id="inputFilieres" className={classSelect}>
                        <option selected>Choisir...</option>
                        {
                            options.map((option)=>(
                                <option key={option.id} value={option.id}>{option['nom']}</option>
                            ))
                        }
                        
                        
                    </select>
                </div>
                </div>
                    <button type="submit" className="btn btn-primary col-md-6 btn-center">Ajouter</button>
                </div>
                
                
            </form>
        </div>
    )
}

export default CreateMatiere