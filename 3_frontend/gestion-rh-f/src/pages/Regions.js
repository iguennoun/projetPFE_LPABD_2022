import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import axios from "axios";
import {useRef,  useEffect, useState } from "react";

const Regions = () => {
    const effectRan       = useRef(false);
    const [regions, setRegions] = useState([]);
    const [pays, setPays] = useState([]);
    const HOST            = process.env.REACT_APP_HOST_URL;
    const PORT            = process.env.REACT_APP_HOST_PORT;
    const REGIONS_URL     = HOST+":"+PORT+process.env.REACT_APP_ALL_REGIONS;
    const ALL_PAYS_URL     = HOST+":"+PORT+process.env.REACT_APP_ALL_PAYS;

    useEffect(()=>{
        if(effectRan.current ===false){
            axios.get(REGIONS_URL)
            .then(result=>{
                setRegions(result.data);
                console.log(result.data);
            })
            .catch(error=>{
                console.log(error.message);
            });

            axios.get(ALL_PAYS_URL)
            .then(result=>{
                setPays(result.data);
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
                        <h1>Regions</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li className="breadcrumb-item active">Regions</li>
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
                                    <h3 className="card-title">List des régions</h3>
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
                                    <table id="example1" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Code région</th>
                                                <th>Libellé région Fr</th>
                                                <th>Libellé région Ar</th>
                                                <th>Nom pays Fr</th>
                                                <th>Nom pays Ar</th>
                                                <th>Opérations</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            regions?.map(one_region =>{
                                            return (
                                                <tr key={one_region.codeR}>
                                                    <td>{one_region.codeR}</td>
                                                    <td>{one_region.libelleRFr}</td>
                                                    <td>{one_region.libelleRAr}</td>
                                                    <td>{one_region?.paysObject?.nomPFr}</td>
                                                    <td>{one_region?.paysObject?.nomPAr}</td>
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
                                                <th>Code région</th>
                                                <th>Libellé région Fr</th>
                                                <th>Libellé région Ar</th>
                                                <th>Nom pays Fr</th>
                                                <th>Nom pays Ar</th>
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
                                    <h3 className="card-title">Formulaire - région</h3>
                                </div>
                                <form action="#">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="codeR">Code région :</label>
                                            <input type="text" className="form-control" id="codeR" name="codeR" placeholder="7" pattern="[0-9]{1,}"/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="libelleRFr">Nom de la région en français :</label>
                                            <input type="text" className="form-control" id="libelleRFr" name="libelleRFr" placeholder="ex : Région Marrakech-Safi " required/>
                                            <label htmlFor="libelleRAr">Nom de la région en arabe :</label>
                                            <input type="text" className="form-control" id="libelleRAr" name="libelleRAr" placeholder="ex : جهة مراكش آسفي" required/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="codeP">Pays de la région :</label>
                                            <select className="custom-select" id="codeP" name="codeP" defaultValue="504" required>
                                            {
                                                pays?.map(one_pays =>{
                                                return (
                                                    <option key={one_pays.codeP} value={one_pays.codeP}>{one_pays.nomPFr}</option>  
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

export default Regions;