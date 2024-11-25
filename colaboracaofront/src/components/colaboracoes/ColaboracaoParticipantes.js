import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { httpGet } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const ColaboracaoParticipantes = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [objetos, setObjetos] = useState([{ nome: ''}]);
    const [objeto, setObjeto] = useState(null);
    const [falha, setFalha] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDados = () => {
            httpGet('usuarios', dados => setObjetos(dados), erro => setFalha(erro), setUsuario);
        };
        carregarDados();
    }, [setUsuario]);

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

            <h1 className="h1lista">Participantes da Colaboração</h1>

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

                <div className="lista_msg">
                    <h3>Participantes:</h3>
                    {
                        objetos.map(x => {
                            return (
                                x.colaboracaoId == objeto.id ? <p>{x.nome+" ("+x.role+"). "}</p> : ''
                            );
                        })
                    }
                </div>

                <input onClick={e => voltar(e)} value="Voltar" type="submit"/>

            </form>

        </div>
    );
}

export default ColaboracaoParticipantes;
