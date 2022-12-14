import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import axios from "axios";
import {useRef,  useEffect, useState } from "react";
import { Link } from "react-router-dom"
import submitForm from "../components/tools/post_putAPI";
import deleteObject from "../components/tools/deleteAPI";
import getData from "../components/tools/getData";
import changeInputHandler from "../components/tools/changeInputHandler";

const Grades = () => {
    const effectRan       = useRef(false);
    const [grades, setGrades] = useState([]);
    const [data,setData]  = useState({
        libelleGFr:"",
        libelleGAr:"",
    }) 
    const HOST            = process.env.REACT_APP_HOST_URL;
    const PORT            = process.env.REACT_APP_HOST_PORT;
    const GRADES_CRUD    = HOST+":"+PORT+process.env.REACT_APP_GRADES;
    const ALL_GRADES_URL     = HOST+":"+PORT+process.env.REACT_APP_GRADES;

    const confirmDelete = (codeG) =>{
        var dialog = window.confirm("Voulez vous vraiment supprimer le grade, codeG = "+codeG+"?");
        if (dialog) {
            deleteObject(GRADES_CRUD+codeG)
            getData(ALL_GRADES_URL,setGrades);
        }
    }

    useEffect(()=>{
        if(effectRan.current ===false){
            getData(ALL_GRADES_URL,setGrades);
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
                        <h1>Grades</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li className="breadcrumb-item active">Grades</li>
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
                            <h3 className="card-title">List des Grades</h3>
                        </div>
                        <div className="card-body">
                            <table id="example1" className="table table-bordered table-hover">
                            <thead>
                            <tr>
                                <th>Code grade</th>
                                <th>Libell?? grade Fr</th>
                                <th>Libell?? grade Ar</th>
                                <th>Op??rations</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                grades?.map(one_grade =>{
                                return (
                                    <tr key={one_grade.codeG}>
                                        <td>{one_grade.codeG}</td>
                                        <td>{one_grade.libelleGFr}</td>
                                        <td>{one_grade.libelleGAr}</td>
                                        <td className="text-center">
                                            <div className="btn-group btn-group-sm">
                                                <Link className="btn btn-primary" to={"/personnel/grade/"+one_grade.codeG}>
                                                    <i className="fas fa-users">
                                                    </i>
                                                </Link>
                                                <a className="btn btn-warning" href="#">
                                                    <i className="fas fa-pencil-alt">
                                                    </i>
                                                </a>
                                                <a className="btn btn-danger" href="#" onClick={()=>{confirmDelete(one_grade.codeG)}}>
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
                                <th>Code grade</th>
                                <th>Libell?? grade Fr</th>
                                <th>Libell?? grade Ar</th>
                                <th>Op??rations</th>
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
                                    <h3 className="card-title">Formulaire - grade</h3>
                                </div>
                                <form onSubmit={(e) => submitForm(e,GRADES_CRUD,data)}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="codeG">Code du grade :</label>
                                            <input type="text" className="form-control" id="codeG" name="codeG" placeholder="ex : 22 - Autoincrement" disabled />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="libelleGFr">Libell?? du grade en fran??ais :</label>
                                            <input type="text" className="form-control" id="libelleGFr" name="libelleGFr" placeholder="ex : TECHNICIEN DE 3EME GRADE" required onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                            <label htmlFor="libelleGAr">Libell?? du grade en arabe :</label>
                                            <input type="text" className="form-control" id="libelleGAr" name="libelleGAr" placeholder="ex : ???????? ???? ???????????? ??????????????" required onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                        </div>
                                    </div>
                                    <div className="card-footer">
                                        <button type="submit" className="btn btn-primary">Enregistrer</button>
                                        <button type="reset" className="btn btn-default float-right">R??initialiser</button>
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

export default Grades;