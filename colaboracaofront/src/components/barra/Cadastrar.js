import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UsuarioContext } from "../../UsuarioContext";

const Cadastrar = () => {
    const [usuario, setUsuario] = useContext(UsuarioContext);

    if (!usuario) {
        return (
            <div className="subnav_button">     
                <div className="subnav_link"><Link className="sublink" to="/usuarios/cadastrar">Cadastrar</Link></div>
            </div>
        );
    } else {
        return null;
    }
};

export default Cadastrar;
