import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { httpDelete, httpGet } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const UsuarioListar = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [objetos, setObjetos] = useState(null);
    const [falha, setFalha] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDados = () => {
            httpGet('usuarios', dados => setObjetos(dados), erro => setFalha(erro), setUsuario);
        };
        carregarDados();
    }, [setUsuario]);

    const excluir = (e, id) => {
        e.preventDefault();
        httpDelete('usuarios', id, _ => navigate(0), erro => setFalha(erro), setUsuario);
    };

    let mensagemFalha = null;

    if (falha) {
        mensagemFalha = (<div className="alert alert-danger">{falha}</div>);
    }

    if (!objetos) {
        return (<div>
            <Carregando mensagem="" />
            {mensagemFalha}
        </div>);
    }

    return (
        <div className="registration_form">

            <div className="h1lista">
                <h1>Usuários</h1>
            </div>
            <div className="h1lista">
                {mensagemFalha}
            </div>
            
            <div className="lista_tabela">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Cargo</th>
                            <th>Consultar</th>
                            <th>Alterar</th>
                            <th>Excluir</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            objetos.map(x => {
                                return (
                                    <tr key={x.id}>
                                        <td>{x.nome}</td>
                                        <td>{x.email}</td>
                                        <td>{x.role}</td>
                                        <td>
                                            <Link className="tabela_link" to={`/usuarios/consultar/${x.id}`}>Consultar</Link>
                                        </td>
                                        <td>
                                            <Link className="tabela_link" to={`/usuarios/alterar/${x.id}`}>Alterar</Link>
                                        </td>
                                        <td>
                                            <button onClick={e => excluir(e, x.id)}>Excluir</button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default UsuarioListar;
