import Navbar from "../components/Navbar";
import MainSidebar from "../components/MainSidebar";
import MainFooter from "../components/MainFooter";

import axios from "axios";
import {useRef,  useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom"
import submitForm from "../components/tools/post_putAPI";
import deleteObject from "../components/tools/deleteAPI";
import getData from "../components/tools/getData";
import changeInputHandler from "../components/tools/changeInputHandler";

const US = () => {
    const effectRan       = useRef(false);
    const [us, setUS] = useState([]);
    const [data,setData]  = useState({
        libelleUSFr:"",
        libelleUSAr:"",
        codeUSParent:11000,
        codeTypeUS:0,
        etat:1
    }) 
    const [typeus, setTypeUS] = useState([]);
    const HOST            = process.env.REACT_APP_HOST_URL;
    const PORT            = process.env.REACT_APP_HOST_PORT;
    const US_CRUD         = HOST+":"+PORT+process.env.REACT_APP_US;
    const ALL_US_URL      = HOST+":"+PORT+process.env.REACT_APP_US;
    const ALL_TYPEUS_URL     = HOST+":"+PORT+process.env.REACT_APP_TYPEUS;

    function IsParent (codeUS){
        let test = false
        // .find or some
        us?.map(one_us =>{
            if(one_us.codeUSParent === codeUS){
                test = true
            }
        })
        return test
    };

    const confirmDelete = (codeUS) =>{
        if(IsParent (codeUS)){
            alert("Vous ne pouvez supprimer un US Parent")
        }else{
            var dialog = window.confirm("Voulez vous vraiment supprimer l'US, codeUS = "+codeUS+"?");
            if (dialog) {
                deleteObject(US_CRUD+codeUS)
                getData(ALL_US_URL,setUS);
            }
        }
    } 

    useEffect(()=>{
        if(effectRan.current ===false){
            getData(ALL_US_URL,setUS);
            getData(ALL_TYPEUS_URL,setTypeUS);
        }
        return () => {
            effectRan.current = true
        }
    });

    const USChilds = (codeUSParent) => {
        const USChildArray = []
        us?.map(one_us =>{
            if(one_us.codeUSParent === codeUSParent){
                USChildArray.push(one_us)
            }
        })
        return USChildArray
    };

    const DrawTree = props =>{
        const {one_us} = props
        if(one_us !== undefined){
            return (
                (!IsParent(one_us.codeUS))?(
                    <tr>
                        <td className="border-0">{one_us.libelleUSFr}</td>
                        <td className="text-center">
                            <div className="btn-group btn-group-sm">
                                <Link className="btn btn-primary" to={"/personnel/us/"+one_us.codeUS}>
                                    <i className="fas fa-users">
                                    </i>
                                </Link>
                                <a className="btn btn-warning" href="#">
                                    <i className="fas fa-pencil-alt">
                                    </i>
                                </a>
                                <a className="btn btn-danger" href="#" onClick={()=>{confirmDelete(one_us.codeUS)}}>
                                    <i className="fas fa-trash">
                                    </i>
                                </a>
                            </div>
                        </td>
                    </tr>
                ):(
                    <Fragment>
                    <tr data-widget="expandable-table" aria-expanded="false">
                        <td>
                            <i className="expandable-table-caret fas fa-caret-right fa-fw"></i>
                            {one_us.libelleUSFr}
                        </td>
                        <td className="text-center">
                            <div className="btn-group btn-group-sm">
                                <Link className="btn btn-primary" to={"/personnel/us/"+one_us.codeUS}>
                                    <i className="fas fa-users">
                                    </i>
                                </Link>
                                <a className="btn btn-warning" href="#">
                                    <i className="fas fa-pencil-alt">
                                    </i>
                                </a>
                                <a className="btn btn-danger" href="#" onClick={()=>{confirmDelete(one_us.codeUS)}}>
                                    <i className="fas fa-trash">
                                    </i>
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr className="expandable-body d-none">
                        <td>
                        <div className="p-0">
                            <table className="table table-hover">
                            <tbody>
                                {
                                    USChilds(one_us.codeUS)?.map(child=>(
                                        <DrawTree key={child.codeUS}  one_us={child}/>
                                    ))
                                }
                            </tbody>
                            </table>
                        </div>
                        </td>
                    </tr>
                    </Fragment>
                )
            );
        } 
    }

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
                        <h1>US</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="/dashboard">Home</a></li>
                        <li className="breadcrumb-item active">US</li>
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
                                    <h3 className="card-title">List des unitées structurelles</h3>
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
                                    <div className="row" style={{"justifyContent" :"center"}}>
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
                                        <table className="table table-hover">
                                        <tbody>
                                            <DrawTree one_us={us[0]} />
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
                                    <h3 className="card-title">Formulaire - Unitée structurelle</h3>
                                </div>
                                <form onSubmit={(e) => submitForm(e,US_CRUD,data)}>
                                    <div className="card-body">
                                        <div className="form-group">
                                            <label htmlFor="codeUS">Code de l'unitée structurelle :</label>
                                            <input type="text" className="form-control" id="codeUS" name="codeUS" placeholder="11003" pattern="[0-9]{4,}" onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="libelleUSFr">Libellé de l'unitée structurelle en français :</label>
                                            <input type="text" className="form-control" id="libelleUSFr" name="libelleUSFr" placeholder="ex : CENTRE REGIONAL D'INFORMATIQUE MARRAKECH" required onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                            <label htmlFor="libelleUSAr">Libellé de l'unitée structurelle en arabe :</label>
                                            <input type="text" className="form-control" id="libelleUSAr" name="libelleUSAr" placeholder="ex : المركز الجهوي للمعلوميات مراكش" required onChange={(e)=> changeInputHandler(e,data, setData)}/>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="codeUSParent">US parent de l'unitée structurelle :</label>
                                            <select className="custom-select" id="codeUSParent" name="codeUSParent" defaultValue="11000" required onChange={(e)=> changeInputHandler(e,data, setData)}>
                                            {
                                                us?.map(one_us =>{
                                                return (
                                                    <option key={one_us.codeUS} value={one_us.codeUS}>{one_us.libelleUSFr}</option>  
                                                    )
                                                })
                                            }
                                            </select>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="codeTypeUS">Le type de l'unitée structurelle :</label>
                                            <select className="custom-select" id="codeTypeUS" name="codeTypeUS" defaultValue="2" required onChange={(e)=> changeInputHandler(e,data, setData)}>
                                            {
                                                typeus?.map(one_typeus =>{
                                                return (
                                                    <option key={one_typeus.codeTypeUS} value={one_typeus.codeTypeUS}>{one_typeus.libelleTypeUSFr}</option>  
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

export default US;