import React from 'react'
import './FiliereRow.css'
import { Component } from 'react'
import { GrUserSettings } from "react-icons/gr";
import Swal from 'sweetalert2';
import axios from 'axios';
class FiliereRow extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            filiereId:'',
            errorMessage:'',
        }
    }
    
    jobFinished= (filiereId) => {
        const message = filiereId;
        this.props.sendMessage(message);
    };
    updateFinished= (refreshe) => {
        const message2 = refreshe;
        this.props.sendMessage2(message2);
    };
    handeldeleteFiliere(filiereId){
        Swal.fire({
            title: 'Êtes-vous sûr?',
            text: "Vous ne pourrez pas revenir en arrière!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui, supprimez-le !'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:1010/filieres/delete/${filiereId}`)
                Swal.fire(
                    'Supprimé !',
                    'Votre filiére a été supprimé.',
                    'success'
                );
                this.updateFinished('refresh')
                
            }
        });
    };
    handelUpdateFiliere(nom,filierePrefix){
        Swal.fire({
            title: 'Mettre à jour le filiere '+nom,
            html:
                `<input value=${filierePrefix} id="swal-input2" class="swal2-input" placeholder="Entrez le nouveau prefixe">`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input2').value
                ]
                
            }
        }).then((result) => {
            if (result.value) {
                // update row in DB
                const filiere = { nom: nom, filierePrefix:result.value[0] };
                axios.put(`http://localhost:1010/filieres/update/${nom}`, filiere)
                this.updateFinished(nom)

            }
        });
    }    

    render(){
        const {nom, filierePrefix} = this.props.filiere;
        const style = { color: "", fontSize: "1.5em" };

        return (
            <tr key={nom}>
                <td>{nom}</td>
                <td>{filierePrefix}</td>
                <td className='d-flex justify-content-around'>
                    <button onClick={() =>this.handelUpdateFiliere(nom,filierePrefix)}  className='btn-circle btn-warning'><GrUserSettings style={style}/></button>
                    <button onClick={() =>this.handeldeleteFiliere(nom)}  className='btn-circle btn-danger'><i className='fas fa-trash'></i></button>
                </td>
            </tr>
        )
    }
}

export default FiliereRow
