import './Entree.css'
import React, { useEffect } from 'react'
import { useState } from 'react'
import api from '../../../../Api/FournisseurTransationApi'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


function Entree() {

    const [allTranEntree, setAllTranEntree] = useState([]);
    const navigate = useNavigate()
    const LoadUpdate = (id) =>{
        // navigate(`/dashboard/transaction/entree/editEntree/${id}`)
    }
    const LoadDelete = (transactionId) =>{
        console.log("transactionId")
        console.log(transactionId)
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
                api.delete(`/delete/${transactionId}`).then(Response=>{
                Swal.fire({
                    position:'top-end',
                    text:'Votre transaction a été supprimé.',
                    icon:'success',
                    showConfirmButton: false,
                    timer: 1000
                }).then((result) => {
                    // window.location.reload()
                    api.get("/all").then((response)=>(
                        setAllTranEntree(response.data)
                    ))
                })
            }).catch(error => {
                console.log(error.message)
            })
            } 
        })
    }
    
    const retrieveTransaction = async()=>{
        const response = await api.get("/all");
        return response.data;
    };
    const [name, setName] = useState('')
    useEffect(()=>{
        const getAllTranEntree= async()=>{
            const allTranEntree = await retrieveTransaction();
            if(allTranEntree) setAllTranEntree(allTranEntree);
        };
        if(name!==''){
            api.get(`/all-by-ice/${name}`).then((response)=>(
                setAllTranEntree(response.data)

            ))
        }else getAllTranEntree();
    },[name])

    const MvtStock = (idTransactionEntree,articleCode,quantiteLivre)=>{
    
        
        api.put(`/move-stock/${articleCode}/${quantiteLivre}/${idTransactionEntree}`).then((response)=>{
            console.log('le stock a ete mise ajoure')
                api.get("/all").then((response)=>(
                    setAllTranEntree(response.data)
                ))

        })
}
    return (
        <div className="table">
            <div className="table_header tab-header">
                <p>Gestion Des Transaction Entrée</p>
                <div className="">
                    <input value={name} onChange={e => setName(e.target.value)} placeholder='Transaction...'/>
                    {/* <Link to='/dashboard/intervenant/fournisseur/ajouter'><button className='ajouter'>+ Ajouter Fournisseur</button></Link> */}
                </div>
            </div>
            <div className="table_section">
                <table className="table tableMatiere">
                    <thead>
                        <tr>
                            <th>Code article</th>
                            <th>date Transaction</th>
                            <th>Fournisseur</th>
                            <th>Confirmé</th>
                            <th>Urgence</th>
                            <th>Modification</th>
                            <th>Quantité</th>
                            <th>Unite</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        Array.isArray(allTranEntree)
                        ? 
                        allTranEntree.map((transaction, index)=>(
                            <tr key={index}>
                                <td>{transaction.articleCode}</td>
                                <td>{transaction.dateTransaction.slice(0, 10)}</td>
                                <td>{transaction.fournisseurIce}</td>
                                {transaction.confirmed && <td>Oui</td>}
                                {!transaction.confirmed && <td>Non</td>}
                                {transaction.urgence && <td>Oui</td>}
                                {!transaction.urgence && <td>Non</td>}
                                <td>{transaction.lastModified.slice(0, 10)}</td>
                                <td>{transaction.quantiteLivre}</td>
                                <td>{transaction.unite}</td>
                                <td className='actions'>
                                    {/* {!transaction.confirmed &&<button onClick={()=>LoadUpdate(transaction.idTransactionEntree)}><i className="fa-solid fa-pen-to-square"></i></button>} */}
                                    <button className='delteButton' onClick={()=>LoadDelete(transaction.idTransactionEntree)}><i className="fa-solid fa-trash"></i></button>
                                    {!transaction.confirmed && <button className='confirmButton' onClick={()=>MvtStock(transaction.idTransactionEntree,transaction.articleCode,transaction.quantiteLivre)}><i className="fa-sharp fa-solid fa-check"></i></button>}
                                    {/* <button onClick={()=>test()}>test</button> */}
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

export default Entree
