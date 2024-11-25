import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { httpPost } from "../../utils/httpApi";
import { UsuarioContext } from "../../UsuarioContext";

const UsuarioCadastrar = () => {
    const [usecon, setUsuario] = useContext(UsuarioContext);
    const [objeto, setObjeto] = useState(
        { nome: '', email: '', senha: '' }
    );
    const [falha, setFalha] = useState(null);
    const navigate = useNavigate();

    const apenasLogin = !usecon;

    const salvar = e => {
        e.preventDefault();
        httpPost('usuarios', objeto, resp => {
            navigate('/');
        }, setFalha, setUsuario);
    };

    const voltar = e => {
        e.preventDefault();
        navigate('/');
    }

    const atualizarCampo = (nome, valor) => {
        let objNovo = { ...objeto };
        objNovo[nome] = valor;
        setObjeto(objNovo);
    };

    let mensagemFalha = null;

    if (falha) {
        mensagemFalha = (<div className="alert alert-danger">{falha}</div>);
        setTimeout(() => {
            setFalha(null);
        }, 10000);
    }

    return (
        <div style={{ visibility: (apenasLogin ? "visible" : "visible") }} className="registration_form">

            <h1 className="h1lista">Cadastrando Usuários</h1>

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

                <div>
                    <label>Senha</label>
                    <input className="inpts" value={objeto.senha} onChange={e => atualizarCampo('senha', e.target.value)} type="password" />
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

export default UsuarioCadastrar;
