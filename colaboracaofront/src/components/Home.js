import React, { useContext } from "react";
import { UsuarioContext } from "../UsuarioContext";

const HomeColaboracoes = () => {

    const [usecon, setUsuario] = useContext(UsuarioContext);

    const apenasLogin = !usecon;

    var nomeUsuario = usecon ? usecon.nome : null;
    var roleUsuario = usecon ? usecon.role : null;

    return (
        <div style={{ visibility: (apenasLogin ? "visible" : "visible") }} className="home_center">

            <div className="home_bemvindo">

                <h1 className="lista_msg">SEJÁ BEM VINDO AO CENTRO DE COLABORAÇÕES!</h1>
                
                <div className="home_center">
                    <div className="home_img">
                        <div className="imgdiv"></div>
                    </div>     
                </div>
                

                <h1 className="lista_msg">{apenasLogin? "Faça login ou se cadastre!" : ""}</h1>

                <div>

                    <h1 className="lista_msg">{nomeUsuario? "Olá "+nomeUsuario+"!" : ""}</h1>

                    <div>
                        <h1 className="lista_msg">{roleUsuario? "Você é "+roleUsuario : ""}</h1>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default HomeColaboracoes;
