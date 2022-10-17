import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import axios from "axios";
import {useRef,  useEffect, useState } from "react";

const Dashboard = () =>{
    const effectRan       = useRef(false);
    const [stat, setStat] = useState({});
    const HOST            = process.env.REACT_APP_HOST_URL;
    const PORT            = process.env.REACT_APP_HOST_PORT;
    const STAT_URL     = HOST+":"+PORT+process.env.REACT_APP_STAT;

    useEffect(()=>{
        if(effectRan.current ===false){
            axios.get(STAT_URL)
            .then(result=>{
                setStat(result.data);
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
    return (<>
        <div className="wrapper" >
            <Navbar />
            <MainSidebar />
            
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1>Dashboard</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Dashboard</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>{stat.nbrPersonnel} &nbsp; <small>Employés</small></h3>
                                        <p><b>{stat.nbrPersonnelMale}</b> : Homme &nbsp;({(stat.nbrPersonnelMale*100/stat.nbrPersonnel).toFixed(0)}%)</p>
                                        <p><b>{stat.nbrPersonnelFemale}</b> : Femme &nbsp;({(stat.nbrPersonnelFemale*100/stat.nbrPersonnel).toFixed(0)}%)</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fas fa-user" style={{"top": "55px"}}></i>
                                    </div>
                                    <a href="#" className="small-box-footer">
                                        Plus &nbsp;
                                        <i className="fas fa-arrow-circle-right"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>{stat.nbrBatiment} &nbsp; <small>Bâtiments</small></h3>
                                        <p><b>{stat.nbrBatimentMarr}</b> : à Marrakech</p>
                                        <p><b>{(stat.nbrBatiment-stat.nbrBatimentMarr).toString()}</b> : autres villes</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-building" style={{"top": "55px"}}></i>
                                    </div>
                                    <a href="#" className="small-box-footer">
                                        Plus &nbsp;
                                        <i className="fas fa-arrow-circle-right"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>{stat.nbrUS} &nbsp; <small>US</small></h3>
                                        <p><b>{stat.nbrUSServ}</b> : Service</p>
                                        <p><b>{stat.nbrUSSub}</b> : Subdivision</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-sitemap" style={{"top": "55px"}}></i>
                                    </div>
                                    <a href="#" className="small-box-footer">
                                        Plus &nbsp;
                                        <i className="fas fa-arrow-circle-right"></i>
                                    </a>
                                </div>
                            </div>
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>&nbsp; <small>Délais importants</small></h3>
                                        <p><b>{stat.nbrPersonnelCloseToRetirement}</b> : A la retraite dans 6 mois</p>
                                        <p><b>0</b> : Fin de mise à disposition</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-eye" style={{"top": "55px"}}></i>
                                    </div>
                                    <a href="#" className="small-box-footer">
                                        Plus &nbsp;
                                        <i className="fas fa-arrow-circle-right"></i>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">

                                <div className="card card-primary card-outline">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                        <i className="far fa-chart-bar"></i>
                                            &nbsp; Nombre d'employés par bâtiment                                        
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Bâtiments</th>
                                                <th>Nbr personnel</th>
                                                <th style={{"width": "40px"}}>%</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                stat?.nbrPersonnelByBatiment?.map(NbrPersoByBatiment =>{
                                                    var rowValue = ((NbrPersoByBatiment.NbrPersonnelByBatiment*100)/stat.nbrPersonnel).toFixed(2)
                                                return (
                                                    <tr key={NbrPersoByBatiment.codeLocal}>
                                                        <td>{NbrPersoByBatiment.libelleBFr}</td>
                                                        <td>{NbrPersoByBatiment.NbrPersonnelByBatiment}</td>
                                                        <td><span className={`badge ${(NbrPersoByBatiment.NbrPersonnelByBatiment >= 10) ? ((NbrPersoByBatiment.NbrPersonnelByBatiment >= 80)?'bg-danger':'bg-warning') : 'bg-primary'}`}>{rowValue}%</span></td>
                                                    </tr>
                                                    )
                                                })
                                            } 
                                        </tbody>
                                        </table>
                                    </div>
                                </div>

                                <div className="card card-primary card-outline">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                        <i className="far fa-chart-bar"></i>
                                        &nbsp; Nombre d'employé par niveau d'étude
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Niveau d'étude</th>
                                                <th>Nbr personnel</th>
                                                <th style={{"width": "40px"}}>%</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                stat?.nbrPersonnelByNiveauEtude?.map(NbrPersoByNiveauEtude =>{
                                                    var rowValue = ((NbrPersoByNiveauEtude.NbrPersonnelByNiveauEtu*100)/stat.nbrPersonnel).toFixed(2)
                                                return (
                                                    <tr key={NbrPersoByNiveauEtude.idNE}>
                                                        <td>{NbrPersoByNiveauEtude.titreDip}</td>
                                                        <td>{NbrPersoByNiveauEtude.NbrPersonnelByNiveauEtu}</td>
                                                        <td><span className={`badge ${(NbrPersoByNiveauEtude.NbrPersonnelByNiveauEtu >= 10) ? ((NbrPersoByNiveauEtude.NbrPersonnelByNiveauEtu >= 80)?'bg-danger':'bg-warning') : 'bg-primary'}`}>{rowValue}%</span></td>
                                                    </tr>
                                                    )
                                                })
                                            } 
                                        </tbody>
                                        </table>
                                    </div>
                                </div>

                            </div>
                            <div className="col-md-6">
                                
                                <div className="card card-primary card-outline">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                        <i className="far fa-chart-bar"></i>
                                        &nbsp; Nombre d'employé par grade
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <table className="table table-striped">
                                        <thead>
                                            <tr>
                                                <th>Grade</th>
                                                <th>Nbr personnel</th>
                                                <th style={{"width": "40px"}}>%</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                stat?.nbrPersonnelByGrade?.map(NbrPersoByGrade =>{
                                                    var rowValue = ((NbrPersoByGrade.NbrPersonnelByGrade*100)/stat.nbrPersonnel).toFixed(2)
                                                return (
                                                    <tr key={NbrPersoByGrade.codeG}>
                                                        <td>{NbrPersoByGrade.libelleGFr}</td>
                                                        <td>{NbrPersoByGrade.NbrPersonnelByGrade}</td>
                                                        <td><span className={`badge ${(NbrPersoByGrade.NbrPersonnelByGrade >= 10) ? ((NbrPersoByGrade.NbrPersonnelByGrade >= 80)?'bg-danger':'bg-warning') : 'bg-primary'}`}>{rowValue}%</span></td>
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

                        <div className="row">
                            <div className="col-sm-12 col-md-6">

                                <div className="card card-primary card-outline">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                        <i className="far fa-chart-bar"></i>
                                            &nbsp; Autre Statistiques 1
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <div id="bar-chart" style={{"height": "300px"}}></div>
                                        
                                    </div>
                                </div>

                            </div>
                            <div className="col-sm-12 col-md-6">
                                <div className="card card-primary card-outline">
                                    <div className="card-header">
                                        <h3 className="card-title">
                                        <i className="far fa-chart-bar"></i>
                                        &nbsp; Autres Statistiques 2
                                        </h3>
                                    </div>
                                    <div className="card-body">
                                        <div id="donut-chart" style={{"height": "300px"}}></div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>

            <MainFooter />
        </div>
    </>)
}
export default Dashboard;