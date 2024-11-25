import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { httpGet } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const UsuarioConsultar = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [objeto, setObjeto] = useState(null);
    const [falha, setFalha] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams();

    if (objeto == null) {
        httpGet(`usuarios/${id}`, dado => {
            setObjeto(dado);
        }, setFalha, setUsuario);
    }

    const voltar = e => {
        e.preventDefault();
        navigate('/usuarios');
    };

    let mensagemFalha = null;

    if (falha) {
        mensagemFalha = (<div className="alert alert-danger">{falha}</div>);
        setTimeout(() => {
            setFalha(null);
        }, 10000);
    }

    if (!objeto) {
        return (<div>
            <Carregando mensagem="" />
            {mensagemFalha}
        </div>);
    }

    return (
        <div className="registration_form">

            <h1 className="h1lista">Consultando Usuário</h1>

            <div>
                {mensagemFalha}
            </div>

            <form>

                <div className="lista_msg">
                    <h3>Nome:</h3>
                    <p>{objeto.nome}</p>
                </div>

                <div className="lista_msg">
                    <h3>Email:</h3>
                    <p>{objeto.email}</p>
                </div>

                <div className="lista_msg">
                    <h3>Cargo:</h3>
                    <p>{objeto.role}</p>
                </div>


                <input onClick={e => voltar(e)} value="Voltar" type="submit"/>

            </form>

        </div>
    );
}

export default UsuarioConsultar;
