import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import axios from "axios";
import {useRef,  useEffect, useState } from "react";
import submitForm from "../components/tools/post_putAPI";
import deleteObject from "../components/tools/deleteAPI";
import getData from "../components/tools/getData";
import changeInputHandler from "../components/tools/changeInputHandler";

const Regions = () => {
    const effectRan       = useRef(false);
    const [regions, setRegions] = useState([]);
    const [data,setData]  = useState({
        codeR: 0,
        libelleRFr:"",
        libelleRAr:"",
        codeP:504

    }) 
    const [pays, setPays] = useState([]);
    const HOST            = process.env.REACT_APP_HOST_URL;
    const PORT            = process.env.REACT_APP_HOST_PORT;
    const REGIONS_CRUD  = HOST+":"+PORT+process.env.REACT_APP_REGIONS;
    const ALL_REGIONS_URL  = HOST+":"+PORT+process.env.REACT_APP_REGIONS;
    const ALL_PAYS_URL     = HOST+":"+PORT+process.env.REACT_APP_ALL_PAYS;

    const confirmDelete = (codeR) =>{
        var dialog = window.confirm("Voulez vous vraiment supprimer la région, codeR = "+codeR+"?");
        if (dialog) {
            deleteObject(REGIONS_CRUD+codeR)
            getData(ALL_REGIONS_URL,setRegions);
        }
    }

    useEffect(()=>{
        if(effectRan.current ===false){
            getData(ALL_REGIONS_URL,setRegions);
            getData(ALL_PAYS_URL,setPays);
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
                                                        <a className="btn btn-danger btn-sm" href="#" onClick={()=>{confirmDelete(one_region.codeR)}}>
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
                                <form onSubmit={(e) => submitForm(e,REGIONS_CRUD,data)}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="codeR">Code région :</label>
                                            <input type="text" className="form-control" id="codeR" name="codeR" placeholder="7" pattern="[0-9]{1,}" onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="libelleRFr">Nom de la région en français :</label>
                                            <input type="text" className="form-control" id="libelleRFr" name="libelleRFr" placeholder="ex : Région Marrakech-Safi " required onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                            <label htmlFor="libelleRAr">Nom de la région en arabe :</label>
                                            <input type="text" className="form-control" id="libelleRAr" name="libelleRAr" placeholder="ex : جهة مراكش آسفي" required onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="codeP">Pays de la région :</label>
                                            <select className="custom-select" id="codeP" name="codeP" defaultValue="504" required onChange={(e)=> changeInputHandler(e,data, setData)}>
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