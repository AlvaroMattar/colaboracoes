import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UsuarioContext } from "../UsuarioContext";
import Logout from "./acessos/Logout";
import Usuarios from "./barra/Usuarios";
import Cadastrar from "./barra/Cadastrar";
import Perfil from "./barra/Perfil";

const BarraNavegacao = ({ setFalha }) => {

    const [usecon, setUsuario] = useContext(UsuarioContext);

    const apenasLogin = !usecon;

    var roleUsuario = usecon ? usecon.role : null;

    return (
        <nav>
            <div className="subnav">
                <div className="subnav_button img_subnav">
                    <Link className="img_link" to="/">CLB</Link>
                </div>
            </div>
            <div className="subnav">
                <div className="subnav_button">
                    <div className="subnav_link"><Link className="sublink" to="/">Home</Link></div>
                </div>
                <div className="subnav_button">
                    <div className="subnav_link"><Link className="sublink" to="/colaboracoes">Colaborações</Link></div>
                </div>
                <Usuarios />
                <Cadastrar />
                <Logout setFalha={setFalha} />
                <Perfil />
            </div>
        </nav>
    );
};

export default BarraNavegacao;
