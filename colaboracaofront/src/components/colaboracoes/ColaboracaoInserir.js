import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { httpPost } from "../../utils/httpApi";
import { UsuarioContext } from "../../UsuarioContext";

const ColaboracaoInserir = () => {
    const [usecon, setUsuario] = useContext(UsuarioContext);
    const [objeto, setObjeto] = useState(
        { nome: '', numColaboradores: 0, endereco: '', descricao: ''}
    );
    const [falha, setFalha] = useState(null);
    const navigate = useNavigate();

    const salvar = e => {
        e.preventDefault();
        httpPost('colaboracoes', objeto, resp => {
            navigate('/colaboracoes');
        }, setFalha, setUsuario);
    };

    const voltar = e => {
        e.preventDefault();
        navigate('/colaboracoes');
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

    var roleUsuario = usecon ? usecon.role : null;

    if (roleUsuario == "organizador" || roleUsuario == "admin") {
        return (
            <div className="registration_form">

                <h1 className="h1lista">Inserindo Colaboração</h1>

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

export default ColaboracaoInserir;
