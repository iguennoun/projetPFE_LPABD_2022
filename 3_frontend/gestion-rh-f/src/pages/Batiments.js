import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import axios from "axios";
import {useRef,  useEffect, useState } from "react";
import { Link} from "react-router-dom"
import submitForm from "../components/tools/post_putAPI";
import deleteObject from "../components/tools/deleteAPI";
import getData from "../components/tools/getData";
import changeInputHandler from "../components/tools/changeInputHandler";

const Batiments = () => {
    const effectRan       = useRef(false);
    const [batiments, setBatiments] = useState([]);
    const [data,setData]  = useState({
        libelleBFr:"",
        libelleBAr:"",
        adresse:"",
        coordGPS:"",
        codeV:192,
    }) 
    const [villes, setVilles] = useState([]);
    const HOST            = process.env.REACT_APP_HOST_URL;
    const PORT            = process.env.REACT_APP_HOST_PORT;
    const BATIMENTS_CRUD    = HOST+":"+PORT+process.env.REACT_APP_BATIMENTS;
    const ALL_BATIMENTS_URL    = HOST+":"+PORT+process.env.REACT_APP_BATIMENTS;
    const ALL_VILLES_URL      = HOST+":"+PORT+process.env.REACT_APP_ALL_VILLES;

    const confirmDelete = (codeLocal) =>{
        var dialog = window.confirm("Voulez vous vraiment supprimer le bâtiment, codeLocal = "+codeLocal+"?");
        if (dialog) {
            deleteObject(BATIMENTS_CRUD+codeLocal)
            getData(ALL_BATIMENTS_URL,setBatiments);
        }
    } 

    useEffect(()=>{
        if(effectRan.current ===false){
            getData(ALL_BATIMENTS_URL,setBatiments);
            getData(ALL_VILLES_URL,setVilles);
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
                        <h1>Batiments</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li className="breadcrumb-item active">Batiments</li>
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
                            <h3 className="card-title">List des bâtiments de la DRI</h3>
                        </div>
                        <div className="card-body">
                            <table id="example1" className="table table-bordered table-hover">
                                <thead>
                                    <tr>
                                        <th>Code local</th>
                                        <th>Libellé bâtiment Fr</th>
                                        <th>Libellé bâtiment Ar</th>
                                        <th>Adresse</th>
                                        <th>Coordonnées gps</th>
                                        <th>Ville Fr</th>
                                        <th>Ville Ar</th>
                                        <th>Opérations</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {
                                    batiments?.map(one_batiment =>{
                                    return (
                                        <tr key={one_batiment.codeLocal}>
                                            <td>{one_batiment.codeLocal}</td>
                                            <td>{one_batiment.libelleBFr}</td>
                                            <td>{one_batiment.libelleBAr}</td>
                                            <td>{one_batiment.adresse}</td>
                                            <td>{one_batiment.coordGPS}</td>
                                            <td>{one_batiment?.villeObject?.nomVFr}</td>
                                            <td>{one_batiment?.villeObject?.nomVAr}</td>
                                            <td className="text-center">
                                                <div className="btn-group btn-group-sm">
                                                    <Link className="btn btn-primary" to={"/personnel/batiment/"+one_batiment.codeLocal}>
                                                        <i className="fas fa-users">
                                                        </i>
                                                    </Link>
                                                    <a className="btn btn-warning" href="#">
                                                        <i className="fas fa-pencil-alt">
                                                        </i>
                                                    </a>
                                                    <a className="btn btn-danger" href="#" onClick={()=>{confirmDelete(one_batiment.codeLocal)}}>
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
                                        <th>Code local</th>
                                        <th>Libellé bâtiment Fr</th>
                                        <th>Libellé bâtiment Ar</th>
                                        <th>Adresse</th>
                                        <th>Coordonnées gps</th>
                                        <th>Ville Fr</th>
                                        <th>Ville Ar</th>
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
                                    <h3 className="card-title">Formulaire - bâtiment</h3>
                                </div>
                                <form onSubmit={(e) => submitForm(e,BATIMENTS_CRUD,data)}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="codeLocal">Le code du local  :</label>
                                            <input type="text" className="form-control" id="codeLocal" name="codeLocal" placeholder="ex : 18 - Autoincrement" disabled/>
                                        
                                            <label htmlFor="libelleBFr">Libellé du bâtiment en français :</label>
                                            <input type="text" className="form-control" id="libelleBFr" name="libelleBFr" placeholder="ex : Bâtiment Targa" required onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                            <label htmlFor="libelleBAr">Libellé du bâtiment en arabe :</label>
                                            <input type="text" className="form-control" id="libelleBAr" name="libelleBAr" placeholder="ex : مبنى تاركة" required onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                        
                                            <label htmlFor="adresse">Adresse du bâtiment en français:</label>
                                            <textarea className="form-control" rows="3" id="adresse" name="adresse" placeholder="ex : Targua-Route de Souihla" required onChange={(e)=> changeInputHandler(e,data, setData)}></textarea>
                                            <label htmlFor="adresseAr">Adresse du bâtiment en arabe :</label>
                                            <textarea className="form-control" rows="3" id="adresse" name="adresse" placeholder="ex : تارغا - طريق سويهلا" disabled></textarea>
                                            
                                            <div className="form-group">
                                                <label htmlFor="coordGPS">Coordonnées GPS du bâtiment:</label>
                                                <input type="text" className="form-control" id="coordGPS" name="coordGPS" placeholder="31.65141045698988, -8.061197020938705" pattern="^-?[0-9]{1,3}(?:\.[0-9]{1,10})?$" onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                            </div>
                                            <div className="form-group">
                                            <label htmlFor="codeV">Ville du bâtiment :</label>
                                            <select className="custom-select" id="codeV" name="codeV" defaultValue="192" required onChange={(e)=> changeInputHandler(e,data, setData)}>
                                            {
                                                villes?.map(one_ville =>{
                                                return (
                                                    one_ville?.regionObject.codeR==7?(
                                                    <option key={one_ville.codeV} value={one_ville.codeV}>{one_ville.nomVFr}</option>  
                                                    ):""
                                                    )
                                                })
                                            }
                                            </select>
                                        </div>
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

export default Batiments;