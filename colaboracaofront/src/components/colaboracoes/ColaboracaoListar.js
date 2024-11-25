import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { httpDelete, httpGet } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const ColaboracaoListar = () => {
    const [usecon, setUsuario] = useContext(UsuarioContext);
    const [objetos, setObjetos] = useState(null);
    const [objetosUs, setObjetosUs] = useState([{ colaboracaoId: '0'}]);
    const [falha, setFalha] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const carregarDados = () => {
            httpGet('colaboracoes', dados => setObjetos(dados), erro => setFalha(erro), setUsuario);
        };
        carregarDados();
        
        const carregarDs = () => {
            httpGet('usuarios', dados => setObjetosUs(dados), erro => setFalha(erro), setUsuario);
        };
        carregarDs();
    }, [setUsuario]);

    const excluir = (e, id) => {
        e.preventDefault();
        httpDelete('colaboracoes', id, _ => navigate(0), erro => setFalha(erro), setUsuario);
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

    var count = 0;

    var idUsecon = usecon ? usecon.id : null;

    return (
        <div className="registration_form">

            <div className="h1lista">
                <h1>Colaborações</h1>
            </div>
            <div className="h1lista">
                {mensagemFalha}
            </div>
            <div className="h1lista subnav_button">
                <Link to="/colaboracoes/inserir" className="subnav_link sublink me-4">Criar Colaboração</Link>
                <Link to={`/usuarios/participar/${idUsecon}`} className="subnav_link sublink ms-4">Participar de uma Colaboração</Link>
            </div>
            
            <div className="lista_tabela">
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Participantes</th>
                            <th>Endereço</th>
                            <th>Descrição</th>
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
                                        <td>
                                            <Link className="text-white" to={`/colaboracoes/participantes/${x.id}`}>
                                                {count = 0}
                                                {
                                                    objetosUs.map(objus => {
                                                        { x.id == objus.colaboracaoId ? count++ : count = count }   
                                                    })
                                                }
                                                {count}
                                                {" / "+x.numColaboradores}
                                            </Link>
                                        </td>
                                        <td>{x.endereco}</td>
                                        <td>{x.descricao}</td>
                                        <td>
                                            <Link className="tabela_link" to={`/colaboracoes/consultar/${x.id}`}>Consultar</Link>
                                        </td>
                                        <td>
                                            <Link className="tabela_link" to={`/colaboracoes/alterar/${x.id}`}>Alterar</Link>
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

export default ColaboracaoListar;
