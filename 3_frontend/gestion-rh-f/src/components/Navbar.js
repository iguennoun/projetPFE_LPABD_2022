
const LeftNavbar = () => {
  return(
        <ul className="navbar-nav">
          <li className="nav-item">
              <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="/dashboard" className="nav-link">Home</a>
          </li>
          <li className="nav-item d-none d-sm-inline-block">
            <a href="#" className="nav-link">-</a>
          </li>
        </ul>
        )
  }

const SearchNavbar = () =>{
  return(
    <li className="nav-item">
        <a className="nav-link" data-widget="navbar-search" href="#" role="button">
          <i className="fas fa-search"></i>
        </a>
        <div className="navbar-search-block">
          <form className="form-inline">
            <div className="input-group input-group-sm">
              <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search"/>
              <div className="input-group-append">
                <button className="btn btn-navbar" type="submit">
                  <i className="fas fa-search"></i>
                </button>
                <button className="btn btn-navbar" type="button" data-widget="navbar-search">
                  <i className="fas fa-times"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </li>
  )
}

const MessagesNavbar = () =>{

}

const NotifNavbar = () => {
  let nbrNotif = 3
  let notifItems = { "msg" :[4,3],
                     "frd" :[8,12],
                     "rpt" :[3,2]
                    }
  return(
    <li className="nav-item dropdown">
        <a className="nav-link" data-toggle="dropdown" href="#">
          <i className="far fa-bell"></i>
          <span className="badge badge-warning navbar-badge">{nbrNotif}</span>
        </a>
        <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span className="dropdown-item dropdown-header">{nbrNotif} Notifications</span>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            <i className="fas fa-envelope mr-2"></i>{notifItems.msg[0]} Dmd réinit mdp
            <span className="float-right text-muted text-sm">{notifItems.msg[1]} mins</span>
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            <i className="fas fa-users mr-2"></i>{notifItems.frd[0]} Dmd de compte
            <span className="float-right text-muted text-sm">{notifItems.frd[1]} hours</span>
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item">
            <i className="fas fa-file mr-2"></i>{notifItems.rpt[0]} new reports
            <span className="float-right text-muted text-sm">{notifItems.rpt[1]} days</span>
          </a>
          <div className="dropdown-divider"></div>
          <a href="#" className="dropdown-item dropdown-footer">See All Notifications</a>
        </div>
      </li>
  )
}

const RightNavbar = () => {
  return(
    <ul className="navbar-nav ml-auto">
      <SearchNavbar />
      <NotifNavbar />
      {/* Additional Buttons */}
      <li className="nav-item">
        <a className="nav-link" data-widget="fullscreen" href="#" role="button">
          <i className="fas fa-expand-arrows-alt"></i>
        </a>
      </li>
    </ul>
    )
  }

const Navbar = () => {
  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <LeftNavbar />
      <RightNavbar />
    </nav>
  )
}

export default Navbar