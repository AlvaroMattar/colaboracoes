import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { httpGet } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const ColaboracaoConsultar = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [objeto, setObjeto] = useState(null);
    const [falha, setFalha] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams();

    if (objeto == null) {
        httpGet(`colaboracoes/${id}`, dado => {
            setObjeto(dado);
        }, setFalha, setUsuario);
    }

    const voltar = e => {
        e.preventDefault();
        navigate('/colaboracoes');
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

            <h1 className="h1lista">Consultando Colaboração</h1>

            <div>
                {mensagemFalha}
            </div>

            <form>

                <div className="lista_msg">
                    <h3>Nome:</h3>
                    <p>{objeto.nome}</p>
                </div>

                <div className="lista_msg">
                    <h3>Meta de Participantes:</h3>
                    <p>{objeto.numColaboradores}</p>
                </div>

                <div className="lista_msg">
                    <h3>Endereço:</h3>
                    <p>{objeto.endereco}</p>
                </div>

                <div className="lista_msg">
                    <h3>Descrição:</h3>
                    <p>{objeto.descricao}</p>
                </div>

                <input onClick={e => voltar(e)} value="Voltar" type="submit"/>

            </form>

        </div>
    );
}

export default ColaboracaoConsultar;
