import { Link } from "react-router-dom"

const BrandLogo = () => {
    return(
        <Link to="/dashboard" className="brand-link">
            <img src="/template/dist/img/AdminLTELogo.png" alt="GestionRH DRI Marr" className="brand-image img-circle elevation-3" style={{opacity: .8}} />
            <span className="brand-text font-weight-light">Gest RH - DRI Marr</span>
        </Link>
    )
}

const UserSidebar = () => {
    const user ={ name : "GUENNOUN Ismail" , img : "user2-160x160.jpg"}
    return(
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
            <div className="image">
                <img src="/pictures/default-profile.png" className="img-circle elevation-2" alt={user.name} />
            </div>
            <div className="info">
                <a href="#" className="d-block">{user.name}</a>
            </div>
        </div>
    )
}

const SearchSidebar = () => {
    return(
        <div className="form-inline">
            <div className="input-group" data-widget="sidebar-search">
                <input className="form-control form-control-sidebar" type="search" placeholder="Search" aria-label="Search"/>
                <div className="input-group-append">
                    <button className="btn btn-sidebar">
                    <i className="fas fa-search fa-fw"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

const MenuAdmin = () =>{
    return(
        <li className="nav-item menu-open">
            <a href="#" className="nav-link">
                <i className="nav-icon fas fa-tachometer-alt"></i>
                <p>
                    Menu Admin
                    <i className="right fas fa-angle-left"></i>
                </p>
            </a>
            <ul className="nav nav-treeview">
                <li className="nav-header">Administration RH</li> 
                <li className="nav-item">
                    <Link to="/pays" className="nav-link">
                        <i className="nav-icon fas fa-plus"></i>
                        <p>Gestion des pays</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/regions" className="nav-link">
                        <i className="nav-icon fas fa-plus"></i>
                        <p>Gestion des régions</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/villes" className="nav-link">
                        <i className="nav-icon fas fa-plus"></i>
                        <p>Gestion des villes</p>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="#" className="nav-link">
                        <i className="nav-icon fas fa-plus"></i>
                        <p>Gestion des utilisateurs</p>
                    </Link>
                </li>
            </ul>
        </li>
        
    )
}

const MenuRespRH = () => {
    return (
        <ul className="nav nav-treeview">
            <li className="nav-header">Responsable RH</li> 
            <li className="nav-item">
                <Link to="/personnel" className="nav-link">
                    <i className="nav-icon fas fa-plus"></i>
                    <p>Gestion du Personnel</p>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/us" className="nav-link">
                    <i className="nav-icon fas fa-plus"></i>
                    <p>Gestion des US</p>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/typeus" className="nav-link">
                    <i className="nav-icon fas fa-plus"></i>
                    <p>Gestion des type US</p>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/batiments" className="nav-link">
                    <i className="nav-icon fas fa-plus"></i>
                    <p>Gestion des bâtiments</p>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/fonctions" className="nav-link">
                    <i className="nav-icon fas fa-plus"></i>
                    <p>Gestion des fonctions</p>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/grades" className="nav-link">
                    <i className="nav-icon fas fa-plus"></i>
                    <p>Gestion des grades</p>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/specdiplome" className="nav-link">
                    <i className="nav-icon fas fa-plus"></i>
                    <p>Gestion des diplomes</p>
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/niveauetu" className="nav-link">
                    <i className="nav-icon fas fa-plus"></i>
                    <p>Gestion niveaux d'études</p>
                </Link>
            </li>
        </ul>
)
}

const MenuConsultationRH = () => {
    return (
            <ul className="nav nav-treeview">
                <li className="nav-header">Consultation RH</li> 
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-plus"></i>
                        <p>Consultation du Personnel</p>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i className="nav-icon fas fa-plus"></i>
                        <p>Consultation des US</p>
                    </a>
                </li>
            </ul>
)
} 

const MenuRH = () =>{
    /*
        <MenuRespRH />
            OR
        <MenuConsultationRH />
    */
    return(
        <li className="nav-item menu-open">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Menu RH
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <MenuRespRH />
        </li>
    )
}

const MenuMateriel = () =>{
    return(
        <li className="nav-item menu-open">
            <a href="#" className="nav-link">
              <i className="nav-icon fas fa-tachometer-alt"></i>
              <p>
                Menu Matériel
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
            <li className="nav-header">Responsable Matériel</li> 
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far nav-icon"></i>
                  <p>Gestion Ordinateurs</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far nav-icon"></i>
                  <p>Gestion Imprimantes</p>
                </a>
              </li>
            </ul>
        </li>
    )
}

const SidebarMenu = () =>{
    return(
        <nav className="mt-2">
            <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                <MenuAdmin />
                <MenuRH />
            </ul>
        </nav>
    )
}

const Sidebar = () => {
    return(
        <div className="sidebar">
            <UserSidebar />
            <SearchSidebar />
            <SidebarMenu />
        </div>
    )
}

const MainSidebar = () => {
    return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <BrandLogo />
        <Sidebar />
    </aside>
    )
}

export default MainSidebar