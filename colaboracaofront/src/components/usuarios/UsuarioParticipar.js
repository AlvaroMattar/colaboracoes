import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { httpGet, httpPut } from "../../utils/httpApi";
import Carregando from "../Carregando";
import { UsuarioContext } from "../../UsuarioContext";

const UsuarioParticipar = () => {
    const [, setUsuario] = useContext(UsuarioContext);
    const [objetosUs, setObjetosUs] = useState([{ colaboracaoId: '0'}]);
    const [objetos, setObjetos] = useState(null);
    const [objeto, setObjeto] = useState(null);
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
        httpPut(`usuarios/participar/${id}`, id, objeto, _ => {
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

    if (!objeto || !objetos) {
        return (<div>
            <Carregando mensagem="" />
            {mensagemFalha}
        </div>);
    }

    var count = 0;

    return (
        <div className="registration_form">

            <h1 className="h1lista">Colaborações Disponíveis</h1>

            <div>
                {mensagemFalha}
            </div>

            <form>

                <div className="lista_tabela">
                    <table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Participantes</th>
                                <th>Endereço</th>
                                <th>Descrição</th>
                                <th>SELECIONE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                objetos.map(x => {
                                    return (
                                        <tr key={x.id}>
                                            <td>{x.nome}</td>
                                            <td>
                                                <div className="text-white">
                                                    {count = 0}
                                                    {
                                                        objetosUs.map(objus => {
                                                            { x.id == objus.colaboracaoId ? count++ : count = count }   
                                                        })
                                                    }
                                                    {count}
                                                    {" / "+x.numColaboradores}
                                                </div>
                                            </td>
                                            <td>{x.endereco}</td>
                                            <td>{x.descricao}</td>
                                            <td>
                                                <input type="radio" name="colaboracao" value={`${x.id}`} onChange={e => atualizarCampo('colaboracaoId', e.target.value)} />
                                            </td>
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
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

export default UsuarioParticipar;
