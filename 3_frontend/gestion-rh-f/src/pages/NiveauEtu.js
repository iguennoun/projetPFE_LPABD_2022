import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import axios from "axios";
import {useRef,  useEffect, useState } from "react";
import { Link } from "react-router-dom"

const NiveauEtu = () => {
    const effectRan       = useRef(false);
    const [niveauetus, setNiveauEtus] = useState([]);
    const HOST            = process.env.REACT_APP_HOST_URL;
    const PORT            = process.env.REACT_APP_HOST_PORT;
    const NIVEAUETU     = HOST+":"+PORT+process.env.REACT_APP_ALL_NIVEAUETU;

    useEffect(()=>{
        if(effectRan.current ===false){
            axios.get(NIVEAUETU)
            .then(result=>{
                setNiveauEtus(result.data);
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
                        <h1>Niveau d'étude</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li className="breadcrumb-item active">Niveau d'étude</li>
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
                            <table id="example1" className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>Code Niveau d'étude</th>
                                <th>Année apres le BAC</th>
                                <th>Titre du niveau</th>
                                <th>Niveau du diplome délivré</th>
                                <th>Opérations</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                niveauetus?.map(one_niveauetu =>{
                                return (
                                    <tr key={one_niveauetu.idNE}>
                                        <td>{one_niveauetu.idNE}</td>
                                        <td>{one_niveauetu.anneeABac}</td>
                                        <td>{one_niveauetu.titreDip}</td>
                                        <td>{one_niveauetu.niveauDip}</td>
                                        <td className="text-center">
                                            <div className="btn-group btn-group-sm">
                                                <Link className="btn btn-primary" to={"/personnel/niveauetu/"+one_niveauetu.idNE}>
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
                                <th>Code Niveau d'étude</th>
                                <th>Année apres le BAC</th>
                                <th>Titre du niveau</th>
                                <th>Niveau du diplome délivré</th>
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
                                    <h3 className="card-title">Formulaire - niveau d'étude</h3>
                                </div>
                                <form action="#">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="idNE">Code du niveau d'étude :</label>
                                            <input type="text" className="form-control" id="idNE" name="idNE" placeholder="ex : 9 - Autoincrement" disabled />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="anneeAbac">BAC + X :</label>
                                            <input type="text" className="form-control" id="anneeAbac" name="anneeAbac" placeholder="ex : BAC +3" required/>
                                            <label htmlFor="titreDip">Titre du diplôme du niveau d'étude :</label>
                                            <input type="text" className="form-control" id="titreDip" name="titreDip" placeholder="ex : LICENCE" required/>
                                            <label htmlFor="niveauDip">Niveau d'étude :</label>
                                            <input type="number" className="form-control" id="niveauDip" name="niveauDip" placeholder="ex : 6 celui de la licence, selon la nomenclature des diplômes" required/>
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

export default NiveauEtu;