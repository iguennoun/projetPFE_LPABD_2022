import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import { Link, useParams } from "react-router-dom"
import axios from "axios";
import {useRef,  useEffect, useState, Fragment } from "react";

const Personnel = () => {
    const HOST            = process.env.REACT_APP_HOST_URL;
    const PORT            = process.env.REACT_APP_HOST_PORT;

    const ALL_PERSONNEL     = HOST+":"+PORT+process.env.REACT_APP_ALL_PERSONNEL;

    const VILLES_URL      = HOST+":"+PORT+process.env.REACT_APP_ALL_VILLES;
    const NIVEAUETU_URL      = HOST+":"+PORT+process.env.REACT_APP_ALL_NIVEAUETU;
    const BATIMENT_URL      = HOST+":"+PORT+process.env.REACT_APP_ALL_BATIMENTS;

    let URL = ALL_PERSONNEL
    const {typeFilter,codeFilter} = useParams()


    const effectRan       = useRef(false);
    const [personnel, setPersonel] = useState([]);

    // For Form
    const [villes, setVilles] = useState([]);
    const [niveauetu, setNiveauEtu] = useState([]);
    const [batiments, setBatiments] = useState([]);
    //const [typeus, setTypeUS] = useState([]);
    // End For From

    const [index, setIndex] = useState(0);

    const shownNbr = 7;
    const haflShownNbr = Math.ceil(shownNbr/2);
    const initial = Array.from({ length: shownNbr }, (e, i) => i + 1);
    const [total, setTotal] = useState(0);
    const [nbrPages, setNbrPages] = useState(() => initial);
    const [maxPages, setMaxPages] = useState(0);

    function changePages(ind) {
        const fullArray = Array.from({ length: maxPages }, (e, i) => i + 1);
        let min = Math.max(0, ind - 4);
        let max = Math.min(ind + 3, maxPages);
        
        
        if (max - min === shownNbr) {
            setNbrPages(fullArray.slice(min, max));
        } else if (max < shownNbr) {
            const rest = shownNbr - max;
            setNbrPages(fullArray.slice(min, max + rest));
        }
        console.log(min)
        console.log(max)
        console.log(nbrPages)
      }
    
    useEffect(()=>{
        if(effectRan.current ===false){

            switch(typeFilter){
                case "us" : URL +="us/"+codeFilter;break;
                case "typeus" : URL +="typeus/"+codeFilter;break;
                case "batiment" : URL +="batiment/"+codeFilter;break;
                case "fonction" : URL +="fonction/"+codeFilter;break;
                case "grade" : URL +="grade/"+codeFilter;break;
                case "specdiplome" : URL +="specdiplome/"+codeFilter;break;
                case "niveauetu" : URL +="niveauetu/"+codeFilter;break;

                default : URL += "actif"
            }

            axios.get(ALL_PERSONNEL)
            .then(result=>{
                setTotal(result?.data?.length)
                const nbp = Math.ceil(result?.data?.length / (process.env.REACT_APP_PAGINATION_SIZE))
                setMaxPages(nbp);
                const dataListPages = Array.from({length:nbp}, (e,i) => {
                    return {
                        page: result?.data?.slice(i*(process.env.REACT_APP_PAGINATION_SIZE),(i+1)*(process.env.REACT_APP_PAGINATION_SIZE))
                    }
                })
                setPersonel(dataListPages);

            })
            .catch(error=>{
                console.log(error.message);
            });

            

            // For Form
            axios.get(VILLES_URL)
            .then(result=>{
                setVilles(result.data);
            })
            .catch(error=>{
                console.log(error.message);
            });

            axios.get(NIVEAUETU_URL)
            .then(result=>{
                setNiveauEtu(result.data);
            })
            .catch(error=>{
                console.log(error.message);
            });

            axios.get(BATIMENT_URL)
            .then(result=>{
                setBatiments(result.data);
            })
            .catch(error=>{
                console.log(error.message);
            });
            // End For Form

        }
        return () => {
            effectRan.current = true
        }
    },[personnel,index]);

    return (
        <div className="wrapper" >
            <Navbar />
            <MainSidebar />
            <div className="content-wrapper">
                <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1>Personnel</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li className="breadcrumb-item active">Personnel</li>
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
                                    <h3 className="card-title">List du personnel</h3>
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
                                    <div className="row justify-content-center">
                                        <a className="btn btn-app">
                                            <i className="fas fa-file-excel"></i> Excel
                                        </a>
                                        <a className="btn btn-app">
                                            <i className="fas fa-file-pdf"></i> PDF
                                        </a>
                                        <a className="btn btn-app">
                                            <i className="fas fa-print"></i> Print
                                        </a>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-12 col-md-5">
                                            <div className="dataTables_info" id="example1_info" role="status" aria-live="polite">
                                                Affichage de <b>{index+1}</b> à <b>{maxPages}</b> lignes sur un total de <b>{total}</b>
                                            </div>
                                        </div>
                                        <div className="col-sm-12 col-md-7">
                                            <div className="dataTables_paginate paging_simple_numbers" id="example1_paginate">
                                                <ul className="pagination" style={{"justifyContent" :"flex-end"}}>
                                                    <li className="paginate_button page-item" id="example1_first">
                                                        <button onClick={() => (index+1>0) && setIndex(0)}  className="page-link" href="#">&lsaquo;</button>
                                                    </li>
                                                    <li className="paginate_button page-item previous" id="example1_previous">
                                                        <button onClick={() => (index!==0) && setIndex(index-1)}  className="page-link" href="#">&laquo;</button>
                                                    </li>
                                                    {
                                                    nbrPages?.map((e,i) =>(
                                                            <li key={i} className={`paginate_button page-item ${i === index ? 'active' : ''}`}>
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => {
                                                                        setIndex(i)
                                                                        changePages(e)
                                                                    }}
                                                                    data-dt-idx={index+1}
                                                                    className="page-link" href="#">{e}
                                                                </button>
                                                            </li>
                                                        ))
                                                    }
                                                    <li className="paginate_button page-item next" id="example1_next">
                                                        <button onClick={() => (index<maxPages-1) && setIndex(index+1)}   className="page-link" href="#">&raquo;</button>
                                                    </li>
                                                    <li className="paginate_button page-item" id="example1_last">
                                                        <button onClick={() => ((index+1)< maxPages)&& setIndex(maxPages-1)}  className="page-link" href="#">&rsaquo;</button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <table id="example1" className="table table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>PPR</th>
                                                <th>CNI</th>
                                                <th>Nom Fr</th>
                                                <th>Prénom Fr</th>
                                                <th>Opérations</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            personnel[index]?.page?.map(one_personnel =>{
                                            return (
                                                <tr key={one_personnel.cni}>
                                                    <td>{one_personnel.ppr}</td>
                                                    <td>{one_personnel.cni}</td>
                                                    <td>{one_personnel.nomFr}</td>
                                                    <td>{one_personnel.prenomFr}</td>
                                                    <td className="text-center">
                                                        <div className="btn-group btn-group-sm">
                                                            <Link className="btn btn-info" to={"/showpersonnel/"+one_personnel.cni}>
                                                                <i className="fas fa-id-card">
                                                                </i>
                                                            </Link>
                                                            <a className="btn btn-primary" href="#">
                                                                <i className="fas fa-file-pdf">
                                                                </i>
                                                            </a>
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
                                                <th>PPR</th>
                                                <th>CNI</th>
                                                <th>Nom Fr</th>
                                                <th>Prénom Fr</th>
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
                                    <h3 className="card-title">Formulaire - Personnel</h3>
                                </div>
                                <form action="#">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <fieldset style={{"border":"1px solid #D2D2CF", "padding":"10px","marginBottom":"10px"}}>
                                                <legend>Informations personnelles :</legend>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label htmlFor="ppr">PPR :</label>
                                                    <input type="text" className="form-control" id="ppr" name="ppr" placeholder="3784469" pattern="[0-9]{4,}"/>
                                                    <label htmlFor="nomFr">Le nom en français :</label>
                                                    <input type="text" className="form-control" id="nomFr" name="nomFr" placeholder="ex : GUENNOUN" required/>
                                                    <label htmlFor="nomAr">Le nom en arabe :</label>
                                                    <input type="text" className="form-control" id="nomAr" name="nomAr" placeholder="ex : كنون" required/>
                                                    
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="cni">CNI :</label>
                                                    <input type="text" className="form-control" id="cni" name="cni" placeholder="EE123456" pattern="[A-Za-z]{3,}[0-9]{3,}" required/>
                                                    <label htmlFor="prenomFr">Le prénom en français :</label>
                                                    <input type="text" className="form-control" id="prenomFr" name="prenomFr" placeholder="ex : Ismail" required/>
                                                    <label htmlFor="prenomAr">Le prénom en arabe :</label>
                                                    <input type="text" className="form-control" id="prenomAr" name="prenomAr" placeholder="ex : اسماعيل" required/>
    
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label htmlFor="dateNaiss">Date de naissance</label>
                                                    <input type="date" className="form-control" id="dateNaiss" name="dateNaiss" required/>
                                                </div>
                                                <div className="col-md-6">
                                                    <label htmlFor="telPerso">Téléphone personnel : </label>
                                                    <input type="text" className="form-control" id="telPerso" name="telPerso" placeholder="06 XX XX XX XX"/>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-8">
                                                    <label htmlFor="ppr">Adresse de résidence :</label>
                                                    <input type="text" className="form-control" id="ppr" name="ppr" placeholder="xx Rue x No xx"/>
                                                </div>
                                                <div className="col-md-4">
                                                    <label htmlFor="codeV">Ville de naissance :</label>
                                                    <select className="custom-select" id="codeV" name="codeV" defaultValue="192" required>
                                                    {
                                                        villes?.map(one_ville =>{
                                                        return (
                                                            <option key={one_ville.codeV} value={one_ville.codeV}>{one_ville.nomVFr}</option>  
                                                            )
                                                        })
                                                    }
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label>Sexe : </label><br/>
                                                    <div className="form-check">
                                                    <input className="form-check-input" id="M" type="radio" name="sexe" value="M" defaultChecked/>
                                                    <label htmlFor="M">Homme </label></div>
                                                    <div className="form-check">
                                                    <input className="form-check-input" id="F" type="radio" name="sexe" value="F"/>
                                                    <label htmlFor="F">Femme </label></div>

                                                </div>
                                                <div className="col-md-4">
                                                    <label>Etat civil: </label><br/>
                                                    <div className="form-check">
                                                    <input className="form-check-input" id="Mr" type="radio" name="civilite" value="M" defaultChecked/>
                                                    <label htmlFor="Mr">M. </label></div>
                                                    <div className="form-check">
                                                    <input className="form-check-input" id="Mme" type="radio" name="civilite" value="Mme"/>
                                                    <label htmlFor="Mme">Mme. </label></div>
                                                    <div className="form-check">
                                                    <input className="form-check-input" id="Mlle" type="radio" name="civilite" value="Mlle"/>
                                                    <label htmlFor="Mlle">Mlle. </label></div>
                                                 </div>
                                                <div className="col-md-4">
                                                    <label>Situation familiale : </label><br/>
                                                    <div className="form-check">
                                                    <input className="form-check-input" id="celibataire" type="radio" name="situationFam" value="0" defaultChecked/>
                                                    <label htmlFor="celibataire">Célibataire </label></div>
                                                    <div className="form-check">
                                                    <input className="form-check-input" id="marie" type="radio" name="situationFam" value="1"/>
                                                    <label htmlFor="marie">Marié(e) </label></div>
                                                    <div className="form-check">
                                                    <input className="form-check-input" id="divorce" type="radio" name="situationFam" value="2"/>
                                                    <label htmlFor="divorce">Divorcé(e) </label></div>
                                                    <div className="form-check">
                                                    <input className="form-check-input" id="veuf" type="radio" name="situationFam" value="3"/>
                                                    <label htmlFor="veuf">Veuf(ou veuve) </label></div>
                                                </div>
                                            </div>
                                            </fieldset>
                                            <fieldset style={{"border":"1px solid #D2D2CF", "padding":"10px","marginBottom":"10px"}}>
                                            <legend>Informations professionnels:</legend>
                                            <div className="row">
                                                    
                                                    <div className="col-md-3">
                                                        <label htmlFor="dateRecrutement">Date de recrutement :</label>
                                                        <input type="date" className="form-control" id="dateRecrutement" name="dateRecrutement" required/>
                                                    </div>
                                                    <div className="col-md-3">
                                                        <label htmlFor="telProf">Téléphone professionnel : </label>
                                                        <input type="text" className="form-control" id="telProf" name="telProf" placeholder="06 XX XX XX XX ou 05 XX XX XX XX"/>
                                                    </div>
                                                    <div className="col-md-6">
                                                    <label htmlFor="email">Email administratif :</label>
                                                    <input type="email" className="form-control" id="email" name="email" placeholder="p.nom@tax.gov.ma"/>    
                                                    </div>
                                            </div>
                                            <div className="row">
                                                    <div className="col-md-4">
                                                    <label htmlFor="numCartComm">Numéro de la carte de commission :</label>
                                                    <input type="text" className="form-control" id="numCartComm" name="numCartComm" placeholder="4321" pattern="[0-9]{3,}"/>
                                                    </div>

                                                    <div className="col-md-4">
                                                    <label htmlFor="echelle">Echelle :</label>
                                                    <select className="custom-select" id="echelle" name="echelle" defaultValue="9" required>
                                                        <option value="6">6</option>  
                                                        <option value="7">7</option>
                                                        <option value="9">9</option>  
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>  
                                                        <option value="12">12</option>
                                                    </select>
                                                    </div>

                                                    <div className="col-md-4">
                                                    <label htmlFor="idNE">niveau d'étude :</label>
                                                    <select className="custom-select" id="idNE" name="idNE" defaultValue="3" required>
                                                        {
                                                        niveauetu?.map(one_niveauetu =>{
                                                        return (
                                                            <option key={one_niveauetu.idNE} value={one_niveauetu.idNE}>{one_niveauetu.titreDip}</option>  
                                                            )
                                                        })
                                                        }
                                                    </select>
                                                    </div>
                                                    
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4" style={{"paddingTop":"30px"}}>
                                                    <label htmlFor="agentComm">Agent communal :</label>
                                                    <input className="form-check-input" style={{"marginLeft":"20px","marginTop":"7px"}} id="agentComm" type="checkbox" name="agentComm" value="1" />
                                                 </div>
                                                 <div className="col-md-4" style={{"paddingTop":"30px"}}>
                                                    <label htmlFor="detacheDe">Détaché(e) d'un autre établissement :</label>
                                                    <input className="form-check-input" style={{"marginLeft":"20px","marginTop":"7px"}} id="detacheDe" type="checkbox" name="detacheDe" value="1" />
                                                 </div>
                                                 <div className="col-md-4">
                                                    <label htmlFor="codeLocal">Bâtiment d'affectation :</label>
                                                    <select className="custom-select" id="codeLocal" name="idNcodeLocal" defaultValue="1" required>
                                                        {
                                                        batiments?.map(one_batiment =>{
                                                        return (
                                                            <option key={one_batiment.codeLocal} value={one_batiment.codeLocal}>{one_batiment.libelleBFr}</option>  
                                                            )
                                                        })
                                                        }
                                                    </select>
                                                 </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <label htmlFor="photo">Photo :</label>
                                                    <input type="file" className="form-control" id="photo" name="photo" />
                                                </div>
                                            </div>
                                            </fieldset>
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

export default Personnel;