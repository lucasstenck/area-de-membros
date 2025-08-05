import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageCircle, Phone, Clock, HelpCircle, MessageSquare } from 'lucide-react';

const Suporte: React.FC = () => {
  const contatos = [
    {
      icon: Mail,
      titulo: 'Email',
      descricao: 'Envie suas dúvidas por email',
      valor: 'suporte@nomademilionario.com',
      acao: () => window.open('mailto:suporte@nomademilionario.com', '_blank'),
      cor: 'from-blue-400 to-blue-500'
    },
    {
      icon: MessageCircle,
      titulo: 'WhatsApp',
      descricao: 'Fale conosco pelo WhatsApp',
      valor: '+55 (11) 99999-9999',
      acao: () => window.open('https://wa.me/5511999999999', '_blank'),
      cor: 'from-green-400 to-green-500'
    },
    {
      icon: Phone,
      titulo: 'Telefone',
      descricao: 'Ligue para nosso suporte',
      valor: '+55 (11) 99999-9999',
      acao: () => window.open('tel:+5511999999999', '_blank'),
      cor: 'from-purple-400 to-purple-500'
    }
  ];

  const faqs = [
    {
      pergunta: 'Como acessar as aulas?',
      resposta: 'Após fazer login, você pode acessar as aulas através do Dashboard. Clique em "Continuar" na próxima aula ou navegue pelo menu de progresso.'
    },
    {
      pergunta: 'Como funciona o progresso?',
      resposta: 'O progresso é calculado automaticamente baseado nas aulas que você assistiu. Cada aula assistida aumenta seu percentual de conclusão.'
    },
    {
      pergunta: 'Posso assistir as aulas quantas vezes quiser?',
      resposta: 'Sim! Você pode assistir todas as aulas quantas vezes desejar. O acesso é ilimitado durante sua assinatura.'
    },
    {
      pergunta: 'Como participar da comunidade?',
      resposta: 'Acesse a seção "Comunidade" no menu principal. Lá você pode conversar com outros membros e compartilhar experiências.'
    },
    {
      pergunta: 'Preciso de ajuda técnica, o que fazer?',
      resposta: 'Entre em contato conosco através do email, WhatsApp ou telefone. Nossa equipe está pronta para ajudar!'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-2xl p-8 mb-8 border border-gray-700 text-center"
        >
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-3 rounded-lg">
              <HelpCircle className="w-8 h-8 text-black" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">
                Central de Suporte
              </h1>
              <p className="text-gray-300 text-lg">
                Estamos aqui para ajudar você em sua jornada
              </p>
            </div>
          </div>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {contatos.map((contato, index) => (
            <motion.div
              key={contato.titulo}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-gray-800 rounded-2xl p-6 border border-gray-700 cursor-pointer"
              onClick={contato.acao}
            >
              <div className={`bg-gradient-to-r ${contato.cor} p-3 rounded-lg w-fit mb-4`}>
                <contato.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                {contato.titulo}
              </h3>
              <p className="text-gray-300 mb-4">
                {contato.descricao}
              </p>
              <p className="text-yellow-400 font-medium">
                {contato.valor}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* FAQ */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <MessageSquare className="w-6 h-6 text-yellow-400" />
              <span>Perguntas Frequentes</span>
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <h4 className="font-semibold text-white mb-2">
                    {faq.pergunta}
                  </h4>
                  <p className="text-gray-300 text-sm">
                    {faq.resposta}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Support Info */}
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-2">
              <Clock className="w-6 h-6 text-yellow-400" />
              <span>Informações de Atendimento</span>
            </h3>
            
            <div className="space-y-6">
              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Horário de Atendimento</h4>
                <p className="text-gray-300 text-sm">
                  Segunda a Sexta: 9h às 18h<br />
                  Sábado: 9h às 14h<br />
                  Domingo: Fechado
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Tempo de Resposta</h4>
                <p className="text-gray-300 text-sm">
                  • Email: Até 24 horas<br />
                  • WhatsApp: Até 2 horas<br />
                  • Telefone: Imediato
                </p>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Tipos de Suporte</h4>
                <p className="text-gray-300 text-sm">
                  • Dúvidas sobre o curso<br />
                  • Problemas técnicos<br />
                  • Acesso às aulas<br />
                  • Comunidade<br />
                  • Pagamentos
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gray-800 rounded-2xl p-6 border border-gray-700"
        >
          <h3 className="text-xl font-bold text-white mb-6 text-center">
            Ações Rápidas
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('mailto:suporte@nomademilionario.com', '_blank')}
              className="bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-500 hover:to-blue-600 transition-all flex items-center justify-center space-x-2"
            >
              <Mail className="w-4 h-4" />
              <span>Enviar Email</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('https://wa.me/5511999999999', '_blank')}
              className="bg-gradient-to-r from-green-400 to-green-500 text-white font-bold py-3 px-4 rounded-lg hover:from-green-500 hover:to-green-600 transition-all flex items-center justify-center space-x-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.open('tel:+5511999999999', '_blank')}
              className="bg-gradient-to-r from-purple-400 to-purple-500 text-white font-bold py-3 px-4 rounded-lg hover:from-purple-500 hover:to-purple-600 transition-all flex items-center justify-center space-x-2"
            >
              <Phone className="w-4 h-4" />
              <span>Ligar</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/comunidade'}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold py-3 px-4 rounded-lg hover:from-yellow-500 hover:to-yellow-600 transition-all flex items-center justify-center space-x-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Comunidade</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Suporte; 