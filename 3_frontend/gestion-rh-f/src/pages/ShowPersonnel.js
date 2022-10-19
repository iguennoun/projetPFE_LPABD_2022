import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import axios from "axios";
import {useRef,  useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ShowPersonnel = () =>{
    const effectRan       = useRef(false);
    const [one_personnel, setOnePersonnel] = useState({});
    const HOST            = process.env.REACT_APP_HOST_URL;
    const PORT            = process.env.REACT_APP_HOST_PORT;
    const {cni}           = useParams()    
    const ONE_PERSONNEL_URL     = HOST+":"+PORT+process.env.REACT_APP_PERSONNEL+cni;

    const today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    useEffect(()=>{
        if(effectRan.current ===false){
            axios.get(ONE_PERSONNEL_URL)
            .then(result=>{
                setOnePersonnel(result.data);
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
                                <h1>Profil</h1>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">ShowPersonnel</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3">
                                <div className="card card-primary card-outline">
                                    <div className="card-body box-profile">
                                        <div className="text-center">
                                        <img className="profile-user-img img-fluid img-circle"
                                            src={(one_personnel.photo)?"/pictures/"+one_personnel.photo:"/pictures/default-profile.png"}
                                            alt={one_personnel.cni} />
                                        </div>

                                        <h3 className="profile-username text-center">{one_personnel.civilite}. {one_personnel.nomFr} {one_personnel.prenomFr}</h3>

                                        <p className="text-muted text-center">Technicien en exploitation</p>

                                        <ul className="list-group list-group-unbordered mb-3">
                                            <li className="list-group-item">
                                                <b>CNI</b> <a className="float-right">{one_personnel.cni}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>PPR</b> <a className="float-right">{one_personnel.ppr}</a>
                                            </li>
                                            <li className="list-group-item">
                                                <b>N° carte de comission</b> <a className="float-right">{(one_personnel.numCartComm)?one_personnel.numCartComm:"Non défini"}</a>
                                            </li>
                                        </ul>
                                        <a href="#" className="btn btn-primary btn-block"><b>Contacter</b></a>
                                    </div>
                                </div>

                                <div className="card card-primary">
                                    <div className="card-header">
                                        <h3 className="card-title">À-propos</h3>
                                    </div>
                                    <div className="card-body">
                                        <strong><i className="fas fa-book mr-1"></i> Niveau d'étude</strong>
                                        <p className="text-muted">
                                            LICENCE
                                        </p>
                                        <hr/>

                                        <strong><i className="fas fa-pencil-alt mr-1"></i> Intitulé du diplôme</strong>
                                        <p className="text-muted">
                                            DEVELOPEMENT INFORMATIQUE
                                        </p>
                                        <hr/>
                                        
                                        <strong><i className="fas fa-building mr-1"></i> Local</strong>
                                        <p className="text-muted">Bâtiment Targa</p>

                                        
                                        <strong><i className="fas fa-phone"></i> Téléphone professionnel :</strong>
                                        <p className="text-muted">
                                            {(one_personnel.telProf)?one_personnel.telProf:"Non défini"}
                                        </p>
                                        <hr/>

                                        <strong><i className="fas fa-at"></i> Email :</strong>
                                        <p className="text-muted">
                                            {(one_personnel.email)?one_personnel.email:"Non défini"}
                                        </p>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-9">
                                <div className="card">
                                    <div className="card-header p-2">
                                        <ul className="nav nav-pills">
                                        <li className="nav-item"><a className="nav-link active" href="#general" data-toggle="tab">Infos Générales</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#histous" data-toggle="tab">Historique US</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#histofonction" data-toggle="tab">Historique Fonctions</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#histograde" data-toggle="tab">Historique Grades</a></li>
                                        <li className="nav-item"><a className="nav-link" href="#histospecdiplome" data-toggle="tab">Historique Diplômes</a></li>
                                        </ul>
                                    </div>
                                    <div className="card-body">
                                        <div className="tab-content">
                                            <div className="active tab-pane" id="general">
                                                <div className="post">
                                                
                                                <div className="user-block">
                                                    <i className={(one_personnel.sexe==="M")?"fas fa-mars":"fas fa-venus"} style={{"fontSize":"55px"}}></i>
                                                    <span className="username">
                                                        <a href="#">{one_personnel.nomFr} {one_personnel.prenomFr}</a>
                                                    </span>
                                                    <span className="username float-right">
                                                        <a href="#">{one_personnel.nomAr} {one_personnel.prenomAr}</a>
                                                    </span>
                                                    <span className="description">Recruté(e) le : {one_personnel.dateRecrutement} - 7 year ago</span>
                                                </div>

                                                <strong><i className="fas fa-phone"></i> Téléphone personnel :</strong>
                                                <p className="text-muted">
                                                    {(one_personnel.telPerso)?one_personnel.telPerso:"Non défini"}
                                                </p>
                                                
                                                <strong><i className="fas fa-map-marker-alt mr-1"></i> Adresse personnelle</strong>
                                                <p className="text-muted">{one_personnel.adressePerso}</p>
                                                
                                                <strong><i className="far fa-file-alt mr-1"></i> Notes</strong>
                                                <p className="text-muted">Autres informations complémentaires de l'employé(e)</p>
                                                
                                                <hr/>

                                                <p>
                                                    Lorem ipsum represents a long-held tradition for designers,
                                                    typographers and the like. Some people hate it and argue for
                                                    its demise, but others ignore the hate as they create awesome
                                                    tools to help create filler text for everyone from bacon lovers
                                                    to Charlie Sheen fans.
                                                </p>
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="histous">
                                                <div className="timeline timeline-inverse">
                                                <div className="time-label">
                                                    <span className="bg-danger">
                                                        {
                                                            date
                                                        }
                                                    </span>
                                                </div>
                                                <div>
                                                    <i className="fas fa-user bg-info"></i>

                                                    <div className="timeline-item">
                                                    <span className="time"><i className="far fa-clock"></i> 7 year ago</span>

                                                    <h3 className="timeline-header border-0">
                                                        <a href="#">SECTION EXPLOITATION</a>  - CENTRE REGIONAL D'INFORMATIQUE
                                                    </h3>
                                                    </div>
                                                </div>
                                                <div className="time-label">
                                                    <span className="bg-success">
                                                        {one_personnel.dateRecrutement}
                                                    </span>
                                                </div>
                                                <div>
                                                    <i className="far fa-clock bg-gray"></i>
                                                </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane" id="histofonction">
                                                
                                            </div>
                                            <div className="tab-pane" id="histograde">
                                                
                                            </div>
                                            <div className="tab-pane" id="histospecdiplome">
                                                
                                            </div>
                                        </div>
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
export default ShowPersonnel;