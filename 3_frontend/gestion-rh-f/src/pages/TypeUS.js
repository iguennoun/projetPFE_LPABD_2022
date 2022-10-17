import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import axios from "axios";
import {useRef,  useEffect, useState } from "react";
import { Link } from "react-router-dom"

const TypeUS = () => {
    const effectRan       = useRef(false);
    const [typeus, setTypeUS] = useState([]);
    const HOST            = process.env.REACT_APP_HOST_URL;
    const PORT            = process.env.REACT_APP_HOST_PORT;
    const TYPEUS_URL     = HOST+":"+PORT+process.env.REACT_APP_ALL_TYPEUS;

    useEffect(()=>{
        if(effectRan.current ===false){
            axios.get(TYPEUS_URL)
            .then(result=>{
                setTypeUS(result.data);
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
                        <h1>Type d'unitées structurelles</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li className="breadcrumb-item active">TypeUS</li>
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
                                <h3 className="card-title">List des types d'unitées structurelles</h3>
                            </div>
                            <div className="card-body">
                                <table id="example1" className="table table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th>Code type US</th>
                                    <th>Libellé type US Fr</th>
                                    <th>Libellé type US Ar</th>
                                    <th>Opérations</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    typeus?.map(one_typeus =>{
                                    return (
                                        <tr key={one_typeus.codeTypeUS}>
                                            <td>{one_typeus.codeTypeUS}</td>
                                            <td>{one_typeus.libelleTypeUSFr}</td>
                                            <td>{one_typeus.libelleTypeUSAr}</td>
                                            <td className="text-center">
                                                <div className="btn-group btn-group-sm">
                                                    <Link className="btn btn-primary" to={"/personnel/typeus/"+one_typeus.codeTypeUS}>
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
                                    <th>Code type US</th>
                                    <th>Libellé type US Fr</th>
                                    <th>Libellé type US Ar</th>
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
                                    <h3 className="card-title">Formulaire - Type US</h3>
                                </div>
                                <form action="#">
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="codeTypeUS">Code pays :</label>
                                            <input type="text" className="form-control" id="codeTypeUS" name="codeTypeUS" placeholder="ex : 25 - Autoincrement" disabled />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="libelleTypeUSFr">Libellé Type US en français :</label>
                                            <input type="text" className="form-control" id="libelleTypeUSFr" name="libelleTypeUSFr" placeholder="ex : Section informatique" required/>
                                            <label htmlFor="libelleTypeUSAr">Libellé Type US en arabe :</label>
                                            <input type="text" className="form-control" id="libelleTypeUSAr" name="libelleTypeUSAr" placeholder="ex : شعبة المعلوميات" required/>
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

export default TypeUS;