import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import Header from '../components/Header';
import Footer from '../components/Footer';
import almaImg from '../assets/img/alma.png';
import type { ContatoFormData } from '../types';

const Contato: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<ContatoFormData>();
  const [enviado, setEnviado] = useState(false);

  const onSubmit: SubmitHandler<ContatoFormData> = () => {
    reset();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Header />
      
      <main className="flex-1 pt-24 pb-20">
        <section className="container mx-auto px-6">
          <div className="flex flex-col items-center mb-16 text-center">
            <img src={almaImg} alt="Alma Digital" className="w-24 mb-6 animate-[float_4s_ease-in-out_infinite]" />
            <h2 className="text-4xl font-bold text-slate-800">Fale com a <span className="text-emerald-500">EcoGuia</span></h2>
            <p className="text-slate-500 mt-4 text-lg">Dúvidas sobre o Motor de Reputação ou sua evolução? Envie uma mensagem.</p>
          </div>

          <div className="max-w-6xl mx-auto grid md:grid-cols-[3fr_2fr] gap-12">
            {/* Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              {/* Feedback inline de sucesso */}
              {enviado && (
                <div className="flex items-start gap-3 bg-green-50 border border-green-200 border-l-4 border-l-emerald-500 rounded-xl px-5 py-4 mb-6 animate-slide-in-left">
                  <span className="text-xl">✅</span>
                  <div>
                    <p className="font-bold text-slate-800">Mensagem enviada com sucesso!</p>
                    <p className="text-slate-500 text-sm">Entraremos em contato em breve pelo e-mail informado.</p>
                  </div>
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <label className="block text-slate-800 font-medium mb-2">Nome Completo</label>
                  <input 
                    type="text" 
                    {...register("nome", { required: "O nome é obrigatório", minLength: { value: 3, message: "O nome deve ter no mínimo 3 caracteres" } })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                    placeholder="Seu nome"
                  />
                  {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome.message}</p>}
                </div>

                <div>
                  <label className="block text-slate-800 font-medium mb-2">E-mail</label>
                  <input 
                    type="email" 
                    {...register("email", { 
                      required: "O e-mail é obrigatório",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Endereço de e-mail inválido"
                      }
                    })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block text-slate-800 font-medium mb-2">Assunto</label>
                  <select 
                    {...register("assunto", { required: "Selecione um assunto" })}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors bg-white"
                  >
                    <option value="">Selecione uma opção...</option>
                    <option value="Dúvida Técnica">Dúvida Técnica</option>
                    <option value="Sugestão de Melhoria">Sugestão de Melhoria</option>
                    <option value="Relatar Erro no Motor">Relatar Erro no Motor</option>
                    <option value="Quero ser ONG parceira">Quero ser ONG parceira</option>
                    <option value="Quero patrocinar uma trilha">Quero patrocinar uma trilha</option>
                    <option value="Outros">Outros</option>
                  </select>
                  {errors.assunto && <p className="text-red-500 text-sm mt-1">{errors.assunto.message}</p>}
                </div>

                <div>
                  <label className="block text-slate-800 font-medium mb-2">Mensagem</label>
                  <textarea 
                    {...register("mensagem", { required: "A mensagem é obrigatória", minLength: { value: 10, message: "A mensagem deve ter no mínimo 10 caracteres" } })}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none transition-colors resize-y"
                    placeholder="Como podemos ajudar?"
                  ></textarea>
                  {errors.mensagem && <p className="text-red-500 text-sm mt-1">{errors.mensagem.message}</p>}
                </div>

                <button 
                  type="submit"
                  className="w-full bg-emerald-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition-colors shadow-lg shadow-green-200"
                >
                  Enviar Mensagem
                </button>
              </form>
            </div>

            {/* Info */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-emerald-500">
                <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span>📞</span> Canais de Atendimento
                </h4>
                <div className="space-y-3 text-slate-500">
                  <p><strong>E-mail:</strong> contato@ecoguia.com.br</p>
                  <p><strong>Suporte Técnico:</strong> suporte@ecoguia.com.br</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-emerald-500">
                <h4 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <span>📍</span> Localização
                </h4>
                <div className="space-y-3 text-slate-500">
                  <p>Av. Lins de Vasconcelos, 1222 - Aclimação, São Paulo</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer texto="© 2026 SoulUp - Suporte ao Usuário" />
    </div>
  );
};

export default Contato;