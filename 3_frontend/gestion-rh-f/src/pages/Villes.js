import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import axios from "axios";
import {useRef,  useEffect, useState } from "react";
import Pagination from "../components/tools/Pagination";
import loadPages from "../components/tools/loadPages";

const Villes = () => {
    const effectRan       = useRef(false);
    const [villes, setVilles] = useState({});
    const [regions, setRegions] = useState([]);
    const HOST            = process.env.REACT_APP_HOST_URL;
    const PORT            = process.env.REACT_APP_HOST_PORT;
    const SIZE            = process.env.REACT_APP_PAGINATION_SIZE;
    const VILLES_URL      = HOST+":"+PORT+process.env.REACT_APP_RANGEOF_VILLES+"?size="+SIZE+"&page=1";
    let url               = HOST+":"+PORT+process.env.REACT_APP_RANGEOF_VILLES+"?size="+SIZE;
    const ALL_REGION_URL  = HOST+":"+PORT+process.env.REACT_APP_ALL_REGIONS;

    useEffect(()=>{
        if(effectRan.current === false){
            axios.get(VILLES_URL)
            .then(result=>{
                setVilles(result.data);
                console.log(result.data);
            })
            .catch(error=>{
                console.log(error.message);
            });

            axios.get(ALL_REGION_URL)
            .then(result=>{
                setRegions(result.data);
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

    return (
        <div className="wrapper" >
            <Navbar />
            <MainSidebar />
            <div className="content-wrapper">
                <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Villes</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li className="breadcrumb-item active">Villes</li>
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
                            <h3 className="card-title">List des Villes</h3>
                            <div className="card-tools">
                                <div className="input-group input-group-sm" style={{"width": "150px"}}>
                                    <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-default">
                                            <i className="fas fa-search"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <Pagination loadPages={loadPages} total={villes?.total} page={villes?.page} size={villes?.size} setObject={setVilles} url={url}/>
                            <div className="row">
                                <table className="table table-hover table-bordered">
                                <thead>
                                <tr>
                                    <th>Code ville</th>
                                    <th>Libellé ville Fr</th>
                                    <th>Libellé ville Ar</th>
                                    <th>Libellé région Fr</th>
                                    <th>Libellé région Ar</th>
                                    <th>Opérations</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    villes?.items?.map(one_ville =>{
                                    return (
                                        <tr key={one_ville.codeV}>
                                            <td>{one_ville.codeV}</td>
                                            <td>{one_ville.nomVFr}</td>
                                            <td>{one_ville.nomVAr}</td>
                                            <td>{one_ville?.regionObject?.libelleRFr}</td>
                                            <td>{one_ville?.regionObject?.libelleRAr}</td>
                                            <td className="text-center">
                                                <a className="btn btn-primary btn-sm" href="#">
                                                    <i className="fas fa-folder">
                                                    </i>
                                                    View
                                                </a>
                                                <a className="btn btn-info btn-sm" href="#">
                                                    <i className="fas fa-pencil-alt">
                                                    </i>
                                                    Edit
                                                </a>
                                                <a className="btn btn-danger btn-sm" href="#">
                                                    <i className="fas fa-trash">
                                                    </i>
                                                    Delete
                                                </a>
                                            </td>
                                        </tr>
                                        )
                                    })
                                } 
                                </tbody>
                                <tfoot>
                                <tr>
                                    <th>Code ville</th>
                                    <th>Libellé ville Fr</th>
                                    <th>Libellé ville Ar</th>
                                    <th>Libellé région Fr</th>
                                    <th>Libellé région Ar</th>
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
                                    <h3 className="card-title">Formulaire - ville</h3>
                                </div>
                                <form action="#">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="codeV">Code ville :</label>
                                            <input type="text" className="form-control" id="codeV" name="codeV" placeholder="7" pattern="[0-9]{3,}"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="nomVFr">Nom de la ville en français :</label>
                                            <input type="text" className="form-control" id="nomVFr" name="nomVFr" placeholder="ex : Marrakech" required/>
                                            <label htmlFor="nomVAr">Nom de la ville en arabe :</label>
                                            <input type="text" className="form-control" id="nomVAr" name="nomVAr" placeholder="ex : مراكش" required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="codeR">Région de la ville :</label>
                                            <select className="custom-select" id="codeR" name="codeR" defaultValue="7" required>
                                            {
                                                regions?.map(one_region =>{
                                                return (
                                                    <option key={one_region.codeR} value={one_region.codeR}>{one_region.libelleRFr}</option>  
                                                    )
                                                })
                                            }
                                            </select>
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

export default Villes;