//import logo from './logo.svg';
//import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Pays from "./pages/Pays";
import Regions from "./pages/Regions";
import Villes from "./pages/Villes";
import TypeUS from "./pages/TypeUS";
import Batiments from "./pages/Batiments";
import Fonctions from "./pages/Fonctions";
import Grades from "./pages/Grades";
import SpecDiplome from "./pages/SpecDiplome";
import NiveauEtu from "./pages/NiveauEtu";
import US from "./pages/US";
import Personnel from "./pages/Personnel";
import ShowPersonnel from "./pages/ShowPersonnel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/pays" element={<Pays />} />
        <Route path="/regions" element={<Regions />} />
        <Route path="/villes" element={<Villes />} />
        <Route path="/typeus" element={<TypeUS />} />
        <Route path="/batiments" element={<Batiments />} />
        <Route path="/fonctions/:idF" element={<Fonctions />} />
        <Route path="/fonctions" element={<Fonctions />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/specdiplome" element={<SpecDiplome />} />
        <Route path="/niveauetu" element={<NiveauEtu />} />
        <Route path="/us" element={<US />} />
        <Route path="/personnel/:typeFilter/:codeFilter" element={<Personnel />} />
        <Route path="/personnel/" element={<Personnel />} />
        <Route path="/showpersonnel/:cni" element={<ShowPersonnel />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
