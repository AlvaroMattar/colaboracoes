import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { httpGet, httpPut } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const UsuarioAlterar = () => {
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

    const atualizarCampo = (nome, valor) => {
        let objNovo = { ...objeto };
        objNovo[nome] = valor;
        setObjeto(objNovo);
    };

    const salvar = e => {
        e.preventDefault();
        httpPut(`usuarios/${id}`, id, objeto, _ => {
            navigate('/usuarios');
        }, setFalha, setUsuario);
    };

    const voltar = e => {
        e.preventDefault();
        navigate('/usuarios');
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

    return (
        <div className="registration_form">

            <h1 className="h1lista">Alterando Usuários</h1>

            <div>
                {mensagemFalha}
            </div>

            <form>

                <div>
                    <label>Nome</label>
                    <input className="inpts" value={objeto.nome} onChange={e => atualizarCampo('nome', e.target.value)} type="text" />
                </div>

                <div>
                    <label>Email</label>
                    <input className="inpts" value={objeto.email} onChange={e => atualizarCampo('email', e.target.value)} type="email" />
                </div>

                <label>Cargos</label>

                <div>
                    <input type="radio" name="cargo" value="admin" onChange={e => atualizarCampo('role', e.target.value)} />
                    <label>ADMIN</label>
                </div>
                <div>
                    <input type="radio" name="cargo" value="organizador" onChange={e => atualizarCampo('role', e.target.value)} />
                    <label>ORGANIZADOR</label>
                </div>
                <div>
                    <input type="radio" name="cargo" value="comum" onChange={e => atualizarCampo('role', e.target.value)} />
                    <label>COMUM</label>
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
}

export default UsuarioAlterar;
