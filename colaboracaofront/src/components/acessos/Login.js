import React, { useState, useContext } from "react";
import { httpPost } from "../../utils/httpApi";
import { UsuarioContext } from "../../UsuarioContext";

const Login = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [objeto, setObjeto] = useState(
        { email: '', senha: '' }
    );
    const [falha, setFalha] = useState(null);

    const atualizarCampo = (nome, valor) => {
        let objNovo = { ...objeto };
        objNovo[nome] = valor;
        setObjeto(objNovo);
    };

    const sucessoLogin = (usuario) => {
        setUsuario(usuario);
    };

    const login = e => {
        e.preventDefault();
        httpPost('login/navegador', objeto, sucessoLogin, setFalha, setUsuario);
    }

    let mensagemFalha = null;

    if (falha) {
        mensagemFalha = (<div className="alert alert-danger">{falha}</div>);
        setTimeout(() => {
            setFalha(null);
        }, 10000);
    }

    return (
        <div className="registration_form">

            <h1 className="h1lista">Login</h1>

            <div>
                {mensagemFalha}    
            </div>

            <form>

                <label>E-mail</label>
                <input className="inpts" value={objeto.email} onChange={e => atualizarCampo('email', e.target.value)} type="email" />

                <label>Senha</label>
                <input className="inpts" value={objeto.senha} onChange={e => atualizarCampo('senha', e.target.value)} type="password" />

                <input type="submit" onClick={e => login(e)} value="Logar"/>

            </form>

        </div>
    );
};

export default Login;