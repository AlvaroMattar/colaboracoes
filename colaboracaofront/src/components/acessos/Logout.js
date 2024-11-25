import React, { useContext } from "react";
import { httpGet } from "../../utils/httpApi";
import { UsuarioContext } from "../../UsuarioContext";

const Logout = ({ setFalha }) => {
    const [usuario, setUsuario] = useContext(UsuarioContext);
    const realizarLogout = () => {
        httpGet('login/navegador/logout', () => {
            setUsuario(null);
        }, setFalha, setUsuario);
    }

    if (usuario) {
        return (
            <div className="subnav_button">
                <div className="subnav_link" onClick={realizarLogout}>Logout</div>
            </div>
        );
    } else {
        return null;
    }
};

export default Logout;
