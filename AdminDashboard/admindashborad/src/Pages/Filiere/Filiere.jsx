import React, { Component } from 'react'
import axios from "axios";
import swal from 'sweetalert';
import Swal from 'sweetalert2';
import FiliereRow from '../../Components/FiliereRow/FiliereRow';
import Search from '../../Components/Search/Search';

class Filiere extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
            filieres:[],
            filierById:[],
            errorMassage:'',
            selectValue:'tout',
            refresh:false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    //mazala
    handleChange(event) {
        this.setState({selectValue: event.target.value});
        console.log(this.state.selectValue)
    }
    
    getFilieres = ()=>{
        axios.get("http://localhost:1010/filieres/all")
            .then(response=>{
                this.setState({
                    filieres:response.data 
                })
            })
            
    }
    componentDidMount(){
        this.getFilieres();
    }

    searchWordFromGit  = (data)=>{
        if(data !==''){
            axios.get(`http://localhost:1010/filieres/find/${data}`)
            .then(response=>{
                this.setState({
                    filieres:[response.data],
                    errorMassage:''
                })
            }).catch(error => { 
                // your error handling goes here
                this.setState({
                    errorMassage:error.response.data.message,
                })
                swal({
                    icon: 'error',
                    title: 'Désolé ...',
                    text: 'Ce filiere n\'existe pas',
                });
            })
        }
    }
    searchWordFromGitCh  = (data)=>{
        
        /*if(data !=='' || data ==''){
            const listUser = this.state.users
            const result = []
            // console.log(data)
            listUser.map(function(user){
                if(user.nom.includes(data)){
                    result.push(user)
                    // console.log(user)
                    // listUser.push(user)
                    // console.log(this.state.users)
                }
            })
            console.log(result)
            // // console.log(this.state.users)
            
            // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            // console.log(this.state.users)
            
        }
            // console.log(this.listUser)
            this.setState({
                users:this.result,
                errorMassage:''
            })
            // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
            // console.log(this.state.users)
            */
    }
    handleMessage = (message) => {
        // console.log(message)
        // this.getFilieres();
        this.state.filieres.filter((item) => item.nom === message)
        this.componentDidMount();
    };
    handleMessage2 = (message) => {
        console.log(message)
        console.log(message)
        axios.get("http://localhost:1010/filieres/all")
            .then(response=>{
                this.setState({
                    filieres:response.data 
                })
            })
            
        this.componentDidMount();
    };

    handelAjouterFiliere(){
        Swal.fire({
            title: 'Mettre à jour le filiere ',
            html:
                `<input  id="swal-input1" class="swal2-input" placeholder="Entrez le nom du Filiere">`+
                `<input  id="swal-input2" class="swal2-input" placeholder="Entrez le prefixe">`,
            focusConfirm: false,
            preConfirm: () => {
                return [
                    document.getElementById('swal-input1').value,
                    document.getElementById('swal-input2').value
                ]
                
            }
        }).then((result) => {
            if (result.value) {
                // update row in DB
                const filiere = { nom: result.value[0], filierePrefix:result.value[1] };
                axios.post('http://localhost:1010/filieres/save', filiere)
                .then(response => this.setState({ filiereId: response.data.id }))
                .catch(error => {
                this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });

            }
        });
        this.componentDidMount()
    }

    render (){
        return (

        <div>
            <div className="container-fluid">
                    <div className="card shadow mb-4">
                    <h4 className="m-0 font-weight-bold text-primary my-3 ml-2">Gestion des Filières</h4>
                        <div className="card-header py-3 d-flex justify-content-between">
                            <li className=''>
                                <button onClick={() =>this.handelAjouterFiliere()}  className='btn btn-primary pl-2'>Ajouter</button>
                                <select onChange={this.handleChange} value={this.state.selectValue} className="selectpicker btn btn-primary ml-2">
                                    <option value="toute">Afficher</option>
                                    <option value="toute">toute</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="10">20</option>
                                </select>
                            </li>
                            
                            <Search getWordSearch={this.searchWordFromGit} test={this.searchWordFromGitCh}/> 
                        </div>
                        
                        {/* <p>{this.state.errorMassage}</p> */}
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
                                    <thead>
                                        <tr>
                                            {/* <th>#</th> */}
                                            <th>Nome de filiere</th>
                                            <th>prefix de filire </th>
                                            <th>Action</th>
                                            {/*<th>phone</th>
                                            <th>website</th>
                                            <th>company name</th> */}
                                        </tr>
                                    </thead>
                                    <tfoot>
                                        <tr>
                                            {/* <th>#</th> */}
                                            <th>Nome de filiere</th>
                                            <th>prefix de filire </th>
                                            <th>Action</th>
                                            {/*<th>phone</th>
                                            <th>website</th>
                                            <th>company name</th> */}
                                        </tr>
                                    </tfoot>
                                    <tbody>
                                    {
                                        Array.isArray(this.state.filieres)
                                        ? 
                                        this.state.filieres.map(filiere=>(
                                            <FiliereRow 
                                            filiere={filiere}
                                            sendMessage={this.handleMessage}
                                            sendMessage2={this.handleMessage2}
                                            />
                                        ))
                                        :null
                                    }
                                    </tbody>
                                </table>
                                {/* <button className='btn ' onClick={this.getFilieres}>vvv</button> */}
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    )}
}

export default Filiere