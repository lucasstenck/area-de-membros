import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Send, Users, MessageCircle, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { MensagemChat } from '../types';

const Comunidade: React.FC = () => {
  const { user } = useAuth();
  const [mensagens, setMensagens] = useState<MensagemChat[]>([]);
  const [novaMensagem, setNovaMensagem] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [mensagens]);

  useEffect(() => {
    // Carregar mensagens existentes
    carregarMensagens();
    
    // Simular usuários online
    setOnlineUsers(Math.floor(Math.random() * 50) + 20);
  }, []);

  const carregarMensagens = async () => {
    try {
      const response = await fetch('http://localhost:8000/mensagens.php');
      if (response.ok) {
        const data = await response.json();
        setMensagens(data.mensagens || []);
      }
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
    }
  };

  const enviarMensagem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaMensagem.trim() || !user) return;

    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8000/enviar-mensagem.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: user.id,
          mensagem: novaMensagem.trim()
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setNovaMensagem('');
          // Recarregar mensagens
          carregarMensagens();
        }
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatarData = (dataString: string) => {
    const data = new Date(dataString);
    const agora = new Date();
    const diffMs = agora.getTime() - data.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Agora';
    if (diffMins < 60) return `${diffMins}m atrás`;
    if (diffHours < 24) return `${diffHours}h atrás`;
    if (diffDays < 7) return `${diffDays}d atrás`;
    
    return data.toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-6 mb-6 border border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-3 rounded-lg">
                <Users className="w-6 h-6 text-black" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Comunidade Nômade Milionário
                </h1>
                <p className="text-gray-300">
                  Conecte-se com outros membros e compartilhe experiências
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center space-x-2 text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">{onlineUsers} online</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Chat Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gray-800 rounded-2xl border border-gray-700 overflow-hidden"
        >
          {/* Messages Area */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {mensagens.length === 0 ? (
              <div className="text-center py-12">
                <MessageCircle className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">Nenhuma mensagem ainda. Seja o primeiro a falar!</p>
              </div>
            ) : (
              mensagens.map((mensagem, index) => (
                <motion.div
                  key={mensagem.id}
                  initial={{ opacity: 0, x: mensagem.usuario_id === user?.id ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${mensagem.usuario_id === user?.id ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                      mensagem.usuario_id === user?.id
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black'
                        : 'bg-gray-700 text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <User className="w-4 h-4" />
                      <span className="text-sm font-medium">
                        {mensagem.nome_usuario}
                      </span>
                    </div>
                    <p className="text-sm">{mensagem.mensagem}</p>
                    <p className={`text-xs mt-1 ${
                      mensagem.usuario_id === user?.id ? 'text-gray-700' : 'text-gray-400'
                    }`}>
                      {formatarData(mensagem.data_envio)}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-gray-700 p-4">
            <form onSubmit={enviarMensagem} className="flex space-x-4">
              <div className="flex-1">
                <input
                  type="text"
                  value={novaMensagem}
                  onChange={(e) => setNovaMensagem(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all"
                  disabled={isLoading}
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={isLoading || !novaMensagem.trim()}
                className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold px-6 py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Enviar</span>
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* Community Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <h3 className="text-lg font-bold text-white mb-4">
            Diretrizes da Comunidade
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="space-y-2">
              <p>✅ Compartilhe suas experiências e conquistas</p>
              <p>✅ Ajude outros membros com dúvidas</p>
              <p>✅ Mantenha o respeito e a cordialidade</p>
            </div>
            <div className="space-y-2">
              <p>❌ Não faça spam ou propaganda</p>
              <p>❌ Não compartilhe informações pessoais</p>
              <p>❌ Não use linguagem inadequada</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Comunidade; 