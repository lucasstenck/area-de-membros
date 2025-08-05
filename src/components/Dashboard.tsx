import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { aulas } from '../data/aulas';
import { Play, CheckCircle, Clock, TrendingUp, Target, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const aulasAssistidas = user?.aulas_assistidas || [];
  const totalAulas = aulas.length;
  const progresso = user?.progresso || 0;

  const proximaAula = aulas.find(aula => !aulasAssistidas.includes(aula.id));
  const ultimaAula = aulasAssistidas.length > 0 
    ? aulas.find(aula => aula.id === Math.max(...aulasAssistidas))
    : null;

  const stats = [
    {
      icon: Play,
      label: 'Aulas Assistidas',
      value: aulasAssistidas.length,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10',
      gradient: 'from-blue-400 to-blue-600'
    },
    {
      icon: Clock,
      label: 'Aulas Restantes',
      value: totalAulas - aulasAssistidas.length,
      color: 'text-yellow-400',
      bgColor: 'bg-yellow-500/10',
      gradient: 'from-yellow-400 to-yellow-600'
    },
    {
      icon: TrendingUp,
      label: 'Progresso',
      value: `${progresso}%`,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10',
      gradient: 'from-green-400 to-green-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary p-4">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-modern rounded-3xl p-8 mb-8 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="text-4xl font-bold text-white mb-2"
              >
                Bem-vindo, {user?.nome_completo}!
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-text-gray text-lg"
              >
                Continue sua jornada para se tornar um Nômade Milionário
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden md:block"
            >
              <Award className="w-20 h-20 text-primary-yellow animate-float" />
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="card-modern rounded-2xl p-6 hover-lift"
            >
              <div className="flex items-center space-x-4">
                <div className={`p-4 rounded-2xl ${stat.bgColor} relative overflow-hidden`}>
                  <stat.icon className={`w-8 h-8 ${stat.color} relative z-10`} />
                  <div className={`absolute inset-0 bg-gradient-to-r ${stat.gradient} opacity-20`}></div>
                </div>
                <div>
                  <p className="text-text-gray text-sm font-medium">{stat.label}</p>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-modern rounded-3xl p-8 mb-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-2xl bg-primary-yellow/10">
              <Target className="w-8 h-8 text-primary-yellow" />
            </div>
            <h2 className="text-2xl font-bold text-white">Seu Progresso</h2>
          </div>

          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <span className="text-text-gray font-medium">Progresso Geral</span>
              <span className="text-primary-yellow font-bold text-xl">{progresso}%</span>
            </div>
            <div className="w-full bg-white/10 rounded-2xl h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progresso}%` }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                className="h-full bg-gradient-primary rounded-2xl relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              </motion.div>
            </div>
          </div>

          {proximaAula && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/aula/${proximaAula.id}`)}
              className="w-full bg-gradient-primary text-black font-bold py-4 px-6 rounded-2xl hover:shadow-glow transition-all duration-300 hover-lift flex items-center justify-center space-x-3"
            >
              <Play className="w-6 h-6" />
              <span>Continuar: {proximaAula.titulo}</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          )}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Last Watched */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="card-modern rounded-3xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-green-500/10">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
              <span>Última Aula Assistida</span>
            </h3>
            {ultimaAula ? (
              <div className="space-y-4">
                <div className="bg-gradient-card rounded-2xl p-6 border border-white/5">
                  <h4 className="font-semibold text-white mb-3 text-lg">
                    {ultimaAula.titulo}
                  </h4>
                  <p className="text-text-gray text-sm mb-4 leading-relaxed">
                    {ultimaAula.descricao}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-text-gray">
                    <span className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{ultimaAula.duracao}</span>
                    </span>
                    <span className="flex items-center space-x-2 text-green-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>Concluída</span>
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-text-gray/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-text-gray" />
                </div>
                <p className="text-text-gray">Nenhuma aula assistida ainda.</p>
              </div>
            )}
          </motion.div>

          {/* Next Lesson */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="card-modern rounded-3xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-6 flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-primary-yellow/10">
                <Play className="w-6 h-6 text-primary-yellow" />
              </div>
              <span>Próxima Aula</span>
            </h3>
            {proximaAula ? (
              <div className="space-y-4">
                <div className="bg-gradient-card rounded-2xl p-6 border border-primary-yellow/20">
                  <h4 className="font-semibold text-white mb-3 text-lg">
                    {proximaAula.titulo}
                  </h4>
                  <p className="text-text-gray text-sm mb-4 leading-relaxed">
                    {proximaAula.descricao}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-text-gray mb-4">
                    <span className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{proximaAula.duracao}</span>
                    </span>
                    <span className="text-primary-yellow font-medium">
                      Próxima
                    </span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/aula/${proximaAula.id}`)}
                  className="w-full bg-gradient-primary text-black font-bold py-4 px-6 rounded-2xl hover:shadow-glow transition-all duration-300 hover-lift flex items-center justify-center space-x-3"
                >
                  <Play className="w-5 h-5" />
                  <span>Assistir Agora</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-primary-yellow/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary-yellow" />
                </div>
                <p className="text-text-gray">Parabéns! Você completou todas as aulas!</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 