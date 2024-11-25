import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Login from "./acessos/Login";
import { UsuarioContext } from "../UsuarioContext";
import BarraNavegacao from "./BarraNavegacao";

const Layout = () => {
    let usuarioLocalStorage;
    try {
        usuarioLocalStorage = JSON.parse(localStorage.getItem("usuario"));
    } catch {
        usuarioLocalStorage = null;
    }

    const [falha, setFalha] = useState(null);
    const [usuario, setUsuario] = useState(usuarioLocalStorage);

    const gravarUsuario = usuario => {
        try {
            localStorage.setItem("usuario", JSON.stringify(usuario));
        } catch {
            localStorage.setItem("usuario", null);
        }
        setUsuario(usuario);
    };

    let mensagemFalha = null;

    if (falha) {
        mensagemFalha = (<div className="alert alert-danger">{falha}</div>);
    }

    const apenasLogin = !usuario;

    var nomeUsuario = usuario ? usuario.nome : null;

    return (
        <UsuarioContext.Provider value={[usuario, gravarUsuario]}>
            <React.Fragment>
                <div className="home_grid">
                    <header>
                        <BarraNavegacao setFalha={setFalha} />
                    </header>    
                    <section>
                        <div className="w-100">
                            {mensagemFalha}
                            {apenasLogin ? (<Login reportarSucesso={gravarUsuario} />) : null}
                            <div className="mt-3" style={{ visibility: (apenasLogin ? "hidden" : "visible") }}>
                                <Outlet />
                            </div>
                        </div>
                    </section>
                    <footer>
                        <div className="nav_button">
                            Bem vindo {nomeUsuario? nomeUsuario+"!" : ""}
                        </div>
                    </footer>
                </div>
            </React.Fragment>
        </UsuarioContext.Provider>
    );
};
export default Layout;