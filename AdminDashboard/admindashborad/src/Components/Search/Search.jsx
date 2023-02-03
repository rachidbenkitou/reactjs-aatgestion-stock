import React, { Component } from 'react';

class Search extends Component {
    state = {
        search:'',
        swal: {}
    }
    handleForm = (e)=>{
        this.setState({
            search: e.target.value
        })
    }
    searchfunction = (e)=>{
        e.preventDefault();
        this.props.getWordSearch(this.state.search)
    }
    render() {
        const {search} = this.state
        return (
            <div>
                <form  onSubmit={this.searchfunction} className="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
                    <div className="input-group">
                        <input onChange={this.handleForm} value={search} type="text" id="search" className="form-control bg-light border-0 small" placeholder="Search for..."
                            aria-label="Search" aria-describedby="basic-addon2" required/>
                        <div className="input-group-append">
                            <button className="btn btn-primary" type="submit">
                                <i className="fas fa-search fa-sm"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Search;