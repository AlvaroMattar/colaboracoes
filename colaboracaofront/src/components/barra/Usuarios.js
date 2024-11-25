import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UsuarioContext } from "../../UsuarioContext";

const Usuarios = () => {
    const [usuario, setUsuario] = useContext(UsuarioContext);

    var roleUsuario = usuario ? usuario.role : null;

    if (roleUsuario == "admin") {
        return (
            <div className="subnav_button">
                <div className="subnav_link"><Link className="sublink" to="/usuarios">Usuários</Link></div>                    
            </div>
        );
    } else {
        return null;
    }
};

export default Usuarios;
