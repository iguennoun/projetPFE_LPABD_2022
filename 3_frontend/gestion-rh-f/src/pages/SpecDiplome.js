import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import axios from "axios";
import {useRef,  useEffect, useState } from "react";
import { Link } from "react-router-dom"
import Pagination from "../components/tools/Pagination";
import loadPages from "../components/tools/loadPages";

const SpecDiplome = () => {
    const effectRan       = useRef(false);
    const [specdiplomes, setSpecDiplomes] = useState({});
    const HOST            = process.env.REACT_APP_HOST_URL;
    const PORT            = process.env.REACT_APP_HOST_PORT;
    const SIZE            = process.env.REACT_APP_PAGINATION_SIZE;
    const SPECDIPLOME_URL   = HOST+":"+PORT+process.env.REACT_APP_RANGEOF_SPECDIPLOME+"?size="+SIZE+"&page=1";
    let url               = HOST+":"+PORT+process.env.REACT_APP_RANGEOF_SPECDIPLOME+"?size="+SIZE;

    useEffect(()=>{
        if(effectRan.current ===false){
            axios.get(SPECDIPLOME_URL)
            .then(result=>{
                setSpecDiplomes(result.data);
                console.log(result.data);
            })
            .catch(error=>{
                console.log(error.message);
            });
        }
        return () => {
            effectRan.current = true
        }
    });

//Test

//Fin Test

    return (
        <div className="wrapper" >
            <Navbar />
            <MainSidebar />
            <div className="content-wrapper">
                <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Les Specialitées diplômes</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li className="breadcrumb-item active">Les Specialitées diplômes</li>
                        </ol>
                    </div>
                    </div>
                </div>
                </section>

                <section className="content">
                <div className="container-fluid">
                    <div className="row">
                    <div className="col-12">
                        <div className="card">
                        <div className="card-header">
                            <h3 className="card-title">List des specialitées des diplômes</h3>
                        </div>
                        <div className="card-body">
                        <Pagination loadPages={loadPages} total={specdiplomes?.total} page={specdiplomes?.page} size={specdiplomes?.size} setObject={setSpecDiplomes} url={url}/>
                            <table id="example1" className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>Code Specialitée diplôme</th>
                                <th>Intitulé de la Specialitée diplôme</th>
                                <th>Opérations</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                specdiplomes?.items?.map(one_specdiplome =>{
                                return (
                                    <tr key={one_specdiplome.codeSpecDip}>
                                        <td>{one_specdiplome.codeSpecDip}</td>
                                        <td>{one_specdiplome.intituleSpec}</td>
                                        <td className="text-center">
                                            <div className="btn-group btn-group-sm">
                                                <Link className="btn btn-primary" to={"/personnel/specdiplome/"+one_specdiplome.codeSpecDip}>
                                                    <i className="fas fa-users">
                                                    </i>
                                                </Link>
                                                <a className="btn btn-warning" href="#">
                                                    <i className="fas fa-pencil-alt">
                                                    </i>
                                                </a>
                                                <a className="btn btn-danger" href="#">
                                                    <i className="fas fa-trash">
                                                    </i>
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                    )
                                })
                            } 
                            </tbody>
                            <tfoot>
                            <tr>
                                <th>Code Specialitée diplôme</th>
                                <th>Intitulé de la Specialitée diplôme</th>
                                <th>Opérations</th>
                            </tr>
                            </tfoot>
                            </table>
                        </div>
                        </div>
                    </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Formulaire - la spécialitée du diplôme</h3>
                                </div>
                                <form action="#">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="codeSpecDip">Code de la spécialitée du diplôme :</label>
                                            <input type="text" className="form-control" id="codeSpecDip" name="codeSpecDip" placeholder="ex : 27 - Autoincrement" disabled />
                                            
                                            <label htmlFor="intituleSpec">Intitulé la spécialitée du diplôme :</label>
                                            <input type="text" className="form-control" id="intituleSpec" name="intituleSpec" placeholder="ex : Technicien en exploitation" required/>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Enregistrer</button>
                                        <button type="reset" className="btn btn-default float-right">Réinitialiser</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
                </section>

            </div>
            <MainFooter />
        </div>
    );
}

export default SpecDiplome;