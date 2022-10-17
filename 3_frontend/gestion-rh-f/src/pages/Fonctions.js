import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import axios from "axios";
import { Link } from "react-router-dom"
import {useRef,  useEffect, useState } from "react";
import Pagination from "../components/tools/Pagination";
import loadPages from "../components/tools/loadPages";

const Fonctions = () => {
    const effectRan       = useRef(false);
    const [fonctions, setFonctions] = useState({});
    const HOST            = process.env.REACT_APP_HOST_URL;
    const PORT            = process.env.REACT_APP_HOST_PORT;
    const SIZE            = process.env.REACT_APP_PAGINATION_SIZE;
    const FONCTIONS_URL   = HOST+":"+PORT+process.env.REACT_APP_RANGEOF_FONCTIONS+"?size="+SIZE+"&page=1";
    let url               = HOST+":"+PORT+process.env.REACT_APP_RANGEOF_FONCTIONS+"?size="+SIZE;
    

    useEffect(()=>{
        if(effectRan.current ===false){
            axios.get(FONCTIONS_URL)
            .then(result=>{
                setFonctions(result.data);
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
                        <h1>Fonctions</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li className="breadcrumb-item active">Fonctions</li>
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
                                    <h3 className="card-title">List des Fonctions</h3>
                                </div>

                                <div className="card-body">
                                <Pagination loadPages={loadPages} total={fonctions?.total} page={fonctions?.page} size={fonctions?.size} setObject={setFonctions} url={url}/>
                                        
                                    <div className="row">
                                        <table id="example1" className="table table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th>Code fonction</th>
                                            <th>Libellé fonction</th>
                                            <th>Opérations</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            fonctions?.items?.map(one_fonction =>{
                                            return (
                                                <tr key={one_fonction.idF}>
                                                    <td>{one_fonction.idF}</td>
                                                    <td>{one_fonction.libelleF}</td>
                                                    <td className="text-center">
                                                        <div className="btn-group btn-group-sm">
                                                            <Link className="btn btn-primary" to={"/personnel/fonction/"+one_fonction.idF}>
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
                                            <th>Code fonction</th>
                                            <th>Libellé fonction</th>
                                            <th>Opérations</th>
                                        </tr>
                                        </tfoot>
                                        </table>
                                    </div>

                                    
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-12">
                            <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Formulaire - fonction</h3>
                                </div>
                                <form action="#">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="idF">Code de la fonction :</label>
                                            <input type="text" className="form-control" id="idF" name="idF" placeholder="ex : 27 - Autoincrement" disabled />
                                            
                                            <label htmlFor="LibelleF">Libellé de la fonction :</label>
                                            <input type="text" className="form-control" id="LibelleF" name="LibelleF" placeholder="ex : Technicien en exploitation" required/>
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

export default Fonctions;