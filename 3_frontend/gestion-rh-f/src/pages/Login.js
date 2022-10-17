const Login = () =>{
    return(<>
    <div className="login-page">
    <div className="login-box">
        <div className="login-logo">
            <b>Gest RH - DRI Marr</b>
        </div>
        <div className="card">
            <div className="card-body login-card-body">
            <p className="login-box-msg">Connectez-vous pour démarrer votre session</p>

            <form action="#" method="post">
                <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="p.nom@tax.gov.ma" />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-envelope"></span>
                    </div>
                </div>
                </div>
                <div className="input-group mb-3">
                <input type="password" className="form-control" placeholder="Mot de passe" />
                <div className="input-group-append">
                    <div className="input-group-text">
                    <span className="fas fa-lock"></span>
                    </div>
                </div>
                </div>
                <div className="row">
                <div className="col-6">
                    <div className="icheck-primary">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">
                        &nbsp;Se souvenir de moi
                    </label>
                    </div>
                </div>

                <div className="col-6">
                    <button type="submit" className="btn btn-primary btn-block">Connexion</button>
                </div>
                </div>
            </form>

            <p className="mb-1">
                <a href="forgot-password.html">Demander renouvelement du mot de passe</a>
            </p>
            <p className="mb-0">
                <a href="register.html" className="text-center">Demander un compte</a>
            </p>
            </div>
        </div>
        </div>
        </div>
    </>);
}
export default Login;