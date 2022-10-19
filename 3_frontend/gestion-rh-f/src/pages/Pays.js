import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import axios from "axios";
import {useRef,  useEffect, useState } from "react";
import Pagination from "../components/tools/Pagination";
import loadPages from "../components/tools/loadPages";
import submitForm from "../components/tools/post_putAPI";
import deleteObject from "../components/tools/deleteAPI";
import getData from "../components/tools/getData";
import changeInputHandler from "../components/tools/changeInputHandler";

const Pays = () => {
    const effectRan       = useRef(false);
    const [pays, setPays] = useState([]);
    const [data,setData]  = useState({
        codeP: 0,
        isoAlpha2:"",
        isoAlpha3:"",
        nomPFr:"",
        nomPAr:""

    }) 
    const HOST             = process.env.REACT_APP_HOST_URL;
    const PORT             = process.env.REACT_APP_HOST_PORT;
    const SIZE             = process.env.REACT_APP_PAGINATION_SIZE;
    const PAYS_CRUD        = HOST+":"+PORT+process.env.REACT_APP_PAYS;
    const RANGEOF_PAYS_URL = HOST+":"+PORT+process.env.REACT_APP_PAYS+"?size="+SIZE+"&page=1";
    let url                = HOST+":"+PORT+process.env.REACT_APP_PAYS+"?size="+SIZE;

    const confirmDelete = (codeP) =>{
        var dialog = window.confirm("Voulez vous vraiment supprimer le pays, codeP = "+codeP+"?");
        if (dialog) {
            deleteObject(PAYS_CRUD+codeP)
            getData(RANGEOF_PAYS_URL,setPays);
        }
    }

    useEffect(()=>{
        if(effectRan.current ===false){
            getData(RANGEOF_PAYS_URL,setPays);
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
                                <h1>Pays</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                                    <li className="breadcrumb-item active">Pays</li>
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
                                        <h3 className="card-title">List des pays</h3>
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
                                        <div className="row">

                                        </div>
                                        <Pagination loadPages={loadPages} total={pays?.total} page={pays?.page} size={pays?.size} setObject={setPays} url={url}/>
                                        <div className="row col-sm-12">
                                            <table className="table table-hover table-bordered">
                                            <thead>
                                                <tr>
                                                <th style={{"width": "10px"}}>code</th>
                                                <th>iso Alpha2</th>
                                                <th>iso Alpha3</th>
                                                <th>Pays</th>
                                                <th>البلد</th>
                                                <th style={{"width": "40px"}}>Label</th>
                                                <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {
                                                pays?.items?.map(one_pays =>{
                                                return (
                                                    <tr key={one_pays.codeP}>
                                                    <td>{one_pays.codeP}</td>
                                                    <td>{one_pays.isoAlpha2}</td>
                                                    <td>{one_pays.isoAlpha3}</td>
                                                    <td>{one_pays.nomPFr}</td>
                                                    <td>{one_pays.nomPAr}</td>
                                                    <td><span className="badge bg-danger">55%</span></td>
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
                                                        <a className="btn btn-danger btn-sm" href="#" onClick={()=>{confirmDelete(one_pays.codeP)}}>
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
                                        <h3 className="card-title">Formulaire - pays</h3>
                                    </div>
                                    <form onSubmit={(e) => submitForm(e,PAYS_CRUD,data)}>
                                        <div className="card-body">
                                            <div className="form-group">
                                                <label htmlFor="codeP">Code pays :</label>
                                                <input type="text" className="form-control" id="codeP" name="codeP" placeholder="504" pattern="[0-9]{1,}" onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="isoAlpha2">Code iso-alpha2 du pays : </label>
                                                <input type="text" className="form-control" id="isoAlpha2" name="isoAlpha2" placeholder="XX - (ex : MA)" pattern="[A-Za-z]{2}" required onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                                <label htmlFor="isoAlpha3">Code iso-alpha3 du pays : </label>
                                                <input type="text" className="form-control" id="isoAlpha3" name="isoAlpha3" placeholder="XXX - (ex : MAR)" pattern="[A-Za-z]{3}" required onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="nomPFr">Nom du pays en français :</label>
                                                <input type="text" className="form-control" id="nomPFr" name="nomPFr" placeholder="ex : Maroc" required onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                                <label htmlFor="nomPAr">Nom du pays en arabe :</label>
                                                <input type="text" className="form-control" id="nomPAr" name="nomPAr" placeholder="ex : المغرب" required onChange={(e)=> changeInputHandler(e,data, setData)}/>
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

export default Pays;