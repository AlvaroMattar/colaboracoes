import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { httpGet, httpPut } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const ColaboracaoAlterar = () => {
    const [usecon, setUsuario] = useContext(UsuarioContext);
    const [objeto, setObjeto] = useState(null);
    const [falha, setFalha] = useState(null);
    const navigate = useNavigate();

    const { id } = useParams();

    if (objeto == null) {
        httpGet(`colaboracoes/${id}`, dado => {
            setObjeto(dado);
        }, setFalha, setUsuario);
    }

    const atualizarCampo = (nome, valor) => {
        let objNovo = { ...objeto };
        objNovo[nome] = valor;
        setObjeto(objNovo);
    };

    const salvar = e => {
        e.preventDefault();
        httpPut(`colaboracoes/${id}`, id, objeto, _ => {
            navigate('/colaboracoes');
        }, setFalha, setUsuario);
    };

    const voltar = e => {
        e.preventDefault();
        navigate('/colaboracoes');
    }

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

    var roleUsuario = usecon ? usecon.role : null;

    if (roleUsuario == "organizador" || roleUsuario == "admin") {
        return (
            <div className="registration_form">

                <h1 className="h1lista">Alterando Colaboração</h1>

                <div>
                    {mensagemFalha}
                </div>

                <form>

                    <div>
                        <label>Nome</label>
                        <input className="inpts" value={objeto.nome} onChange={e => atualizarCampo('nome', e.target.value)} type="text" />
                    </div>

                    <div>
                        <label>Meta de Participantes</label>
                        <input className="inpts" value={objeto.numColaboradores} onChange={e => atualizarCampo('numColaboradores', e.target.value)} type="number" step=".1" />
                    </div>

                    <div>
                        <label>Endereço</label>
                        <input className="inpts" value={objeto.endereco} onChange={e => atualizarCampo('endereco', e.target.value)} type="text" />
                    </div>

                    <div>
                        <label>Descrição</label>
                        <textarea className="inpts" value={objeto.descricao} onChange={e => atualizarCampo('descricao', e.target.value)} rows="4" cols="50"></textarea>
                    </div>

                    <div>
                        <input onClick={e => salvar(e)} value="Salvar" type="submit"/>    
                    </div>
                    <div>
                        <input onClick={e => voltar(e)} value="Voltar" type="submit"/>
                    </div>

                </form>

            </div>
        );
    } else {
        return (
            <div className="registration_form">
                <h1 className="h1lista">ACESSO APENAS PARA ORGANIZADORES E ADMINS</h1>

                <div>
                    <form>
                        <input onClick={e => voltar(e)} value="Voltar" type="submit"/>
                    </form>
                </div>
            </div>
        );
    }
}

export default ColaboracaoAlterar;
