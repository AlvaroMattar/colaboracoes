import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ColaboracaoListar from './components/colaboracoes/ColaboracaoListar';
import ColaboracaoConsultar from './components/colaboracoes/ColaboracaoConsultar';
import ColaboracaoAlterar from './components/colaboracoes/ColaboracaoAlterar';
import ColaboracaoInserir from './components/colaboracoes/ColaboracaoInserir';
import ColaboracaoParticipantes from './components/colaboracoes/ColaboracaoParticipantes';
import Login from './components/acessos/Login';
import Layout from './components/Layout';
import HomeColaboracoes from './components/Home';
import UsuarioListar from './components/usuarios/UsuarioListar';
import UsuarioConsultar from './components/usuarios/UsuarioConsultar';
import UsuarioAlterar from './components/usuarios/UsuarioAlterar';
import UsuarioCadastrar from './components/usuarios/UsuarioCadastrar';
import UsuarioParticipar from './components/usuarios/UsuarioParticipar';
import UsuarioPerfil from './components/usuarios/UsuarioPerfil';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index path="/" element={<HomeColaboracoes />} />
          <Route path="/colaboracoes" element={<ColaboracaoListar />} />
          <Route path="/colaboracoes/listar" element={<ColaboracaoListar />} />
          <Route path="/colaboracoes/inserir" element={<ColaboracaoInserir />} />
          <Route path="/colaboracoes/consultar/:id" element={<ColaboracaoConsultar />} />
          <Route path="/colaboracoes/alterar/:id" element={<ColaboracaoAlterar />} />
          <Route path="/colaboracoes/participantes/:id" element={<ColaboracaoParticipantes />} />
          <Route path="/login" element={<Login />} />
          <Route path="/usuarios" element={<UsuarioListar />} />
          <Route path="/usuarios/listar" element={<UsuarioListar />} />
          <Route path="/usuarios/cadastrar" element={<UsuarioCadastrar />} />
          <Route path="/usuarios/consultar/:id" element={<UsuarioConsultar />} />
          <Route path="/usuarios/alterar/:id" element={<UsuarioAlterar />} />
          <Route path="/usuarios/participar/:id" element={<UsuarioParticipar />} />
          <Route path="/usuarios/perfil/:id" element={<UsuarioPerfil />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
