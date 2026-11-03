import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Button from '../components/Button';
import StatusMensagem from '../components/StatusMensagem';
import { useUser } from '../context/UserContext';
import type { PerfilFormData } from '../types';
import { atualizarUsuario } from '../services/usuarioService';

const EditarPerfil: React.FC = () => {
  const navigate = useNavigate();
  const { usuario, loading, erro, setUsuario, recarregar } = useUser();
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PerfilFormData>();
  const [salvando, setSalvando] = useState(false);
  const [erroSalvar, setErroSalvar] = useState('');
  const [salvo, setSalvo] = useState(false);

  // Preenche o formulário com os dados que vieram da API
  useEffect(() => {
    if (usuario) {
      reset({ nome: usuario.nome, email: usuario.email, cidade: usuario.cidade });
    }
  }, [usuario, reset]);

  // Depois de salvar, volta para o painel
  useEffect(() => {
    if (salvo) {
      const timer = setTimeout(() => navigate('/dashboard'), 2500);
      return () => clearTimeout(timer);
    }
  }, [salvo, navigate]);

  const onSubmit: SubmitHandler<PerfilFormData> = async (data) => {
    if (!usuario) return;

    setSalvando(true);
    setErroSalvar('');
    try {
      // Os campos que não aparecem na tela (senha, avatar, ofensiva) vão como vieram da API
      const usuarioSalvo = await atualizarUsuario({ ...usuario, ...data });
      setUsuario(usuarioSalvo);
      setSalvo(true);
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setErroSalvar(error.message);
      }
    } finally {
      setSalvando(false);
    }
  };

  const inputClass = "w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors";

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />

      <main className="flex-1 pt-24 pb-20">
        <section className="max-w-xl mx-auto px-6">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold text-slate-800">Editar <span className="text-emerald-500">perfil</span></h2>
            <p className="text-slate-500 mt-4 text-lg">Atualize seu nome, e-mail e cidade.</p>
          </div>

          {loading && <StatusMensagem status="carregando" mensagem="Carregando seus dados..." />}

          {!loading && (erro || !usuario) && (
            <StatusMensagem status="erro" mensagem={erro || 'Usuário não encontrado'} onTentarNovamente={recarregar} />
          )}

          {!loading && !erro && usuario && (
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              {/* Feedback de sucesso antes de voltar para o painel */}
              {salvo && (
                <div className="flex items-start gap-3 bg-green-50 border border-green-200 border-l-4 border-l-emerald-500 rounded-xl px-5 py-4 mb-6 animate-slide-in-left">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="font-bold text-slate-800">Perfil atualizado com sucesso!</p>
                    <p className="text-slate-500 text-sm">Voltando para o seu painel...</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div>
                  <label className="block mb-2 font-bold text-slate-800" htmlFor="nome">Nome</label>
                  <input
                    id="nome"
                    className={inputClass}
                    {...register('nome', {
                      required: 'O nome é obrigatório',
                      maxLength: { value: 15, message: 'Use no máximo 15 caracteres' },
                    })}
                  />
                  {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
                </div>

                <div>
                  <label className="block mb-2 font-bold text-slate-800" htmlFor="email">E-mail</label>
                  <input
                    id="email"
                    type="email"
                    className={inputClass}
                    {...register('email', {
                      required: 'O e-mail é obrigatório',
                      pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, message: 'Endereço de e-mail inválido' },
                      maxLength: { value: 100, message: 'Use no máximo 100 caracteres' },
                    })}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block mb-2 font-bold text-slate-800" htmlFor="cidade">Cidade</label>
                  <input
                    id="cidade"
                    className={inputClass}
                    {...register('cidade', {
                      maxLength: { value: 20, message: 'Use no máximo 20 caracteres' },
                    })}
                  />
                  {errors.cidade && <p className="text-red-500 text-sm mt-1">{errors.cidade.message}</p>}
                </div>

                {erroSalvar && <p className="text-red-500 text-sm font-bold">⚠️ {erroSalvar}</p>}

                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <Button
                    type="submit"
                    fullWidth
                    disabled={salvando || salvo}
                    className="disabled:bg-slate-300 disabled:cursor-not-allowed"
                  >
                    {salvando ? 'Salvando...' : 'Salvar alterações'}
                  </Button>
                  <Button type="button" variant="outline" fullWidth onClick={() => navigate('/dashboard')}>
                    Cancelar
                  </Button>
                </div>
              </form>
            </div>
          )}
        </section>
      </main>

      <Footer texto="© 2026 SoulUp - Dashboard de Impacto Verificado" />
    </div>
  );
};

export default EditarPerfil;
