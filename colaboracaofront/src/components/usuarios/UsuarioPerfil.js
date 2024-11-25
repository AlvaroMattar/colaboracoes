import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { httpGet } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const UsuarioPerfil = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [objeto, setObjeto] = useState(null);
    const [colaboracao, setColaboracao] = useState({ nome: '', numColaboradores: 0, endereco: '', descricao: ''});
    const [falha, setFalha] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams();

    
    
    if (objeto == null) {
        httpGet(`usuarios/${id}`, dado => {
            setObjeto(dado);
        }, setFalha, setUsuario);
    }
    
    
    if (objeto != null && colaboracao.nome == '' && objeto.colaboracaoId != null) {
            httpGet(`colaboracoes/${objeto.colaboracaoId}`, dado => {
                setColaboracao(dado);
            }, setFalha, setUsuario);
    }

    const voltar = e => {
        e.preventDefault();
        navigate('/');
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

            <h1 className="h1lista">Bem vindo ao seu Perfil!</h1>

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

                <div className="lista_msg">
                    <h3>Colaborando em:</h3>
                    <p>{colaboracao.nome}</p>
                </div>

                <div className="lista_msg">
                    <h3>Descrição:</h3>
                    <p>{colaboracao.descricao}</p>
                </div>

                <input onClick={e => voltar(e)} value="Voltar" type="submit"/>

            </form>

        </div>
    );
}

export default UsuarioPerfil;
