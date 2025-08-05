import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { aulas } from '../data/aulas';
import { 
  Play, 
  SkipBack, 
  SkipForward, 
  CheckCircle, 
  Clock, 
  ArrowLeft,
  BookOpen,
  Eye,
  EyeOff
} from 'lucide-react';

const AulaView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [isWatched, setIsWatched] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aulaId = parseInt(id || '1');
  const aula = aulas.find(a => a.id === aulaId);
  const aulasAssistidas = useMemo(() => user?.aulas_assistidas || [], [user?.aulas_assistidas]);

  const aulaAnterior = aulas.find(a => a.id === aulaId - 1);
  const proximaAula = aulas.find(a => a.id === aulaId + 1);

  useEffect(() => {
    if (aula) {
      setIsWatched(aulasAssistidas.includes(aula.id));
      setIsLoading(false);
    }
  }, [aula, aulasAssistidas]);

  const marcarComoAssistida = async () => {
    if (!aula || isWatched || !user) return;

    try {
      const response = await fetch('http://localhost:8000/marcar-aula.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario_id: user.id,
          aula_id: aula.id
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          setIsWatched(true);
          
          // Atualizar o contexto do usuário com os novos dados
          const updatedUser = {
            ...user,
            progresso: data.progresso,
            aulas_assistidas: data.aulas_assistidas
          };
          updateUser(updatedUser);
        }
      }
    } catch (error) {
      console.error('Erro ao marcar aula como assistida:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <div className="flex items-center space-x-4">
          <div className="spinner-modern"></div>
          <div className="text-primary-yellow text-xl font-medium">Carregando...</div>
        </div>
      </div>
    );
  }

  if (!aula) {
    return (
      <div className="min-h-screen bg-gradient-secondary flex items-center justify-center">
        <div className="text-red-400 text-xl">Aula não encontrada</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-secondary p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-3 text-primary-yellow hover:text-white transition-all duration-300 hover-lift bg-white/5 px-4 py-2 rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar ao Dashboard</span>
          </motion.button>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-text-gray bg-white/5 px-4 py-2 rounded-xl">
              <Clock className="w-4 h-4" />
              <span>{aula.duracao}</span>
            </div>
            {isWatched && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center space-x-2 text-green-400 bg-green-500/10 px-4 py-2 rounded-xl"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Assistida</span>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-modern rounded-3xl p-8 mb-8"
        >
          <div className="aspect-video bg-black rounded-2xl overflow-hidden mb-8 relative">
            <iframe
              src={`https://www.youtube.com/embed/${aula.video_id}?rel=0&modestbranding=1`}
              title={aula.titulo}
              className="w-full h-full"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex-1">
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-3xl font-bold text-white mb-3"
              >
                {aula.titulo}
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-text-gray text-lg leading-relaxed"
              >
                {aula.descricao}
              </motion.p>
            </div>

            {!isWatched && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={marcarComoAssistida}
                className="bg-gradient-success text-white font-bold py-4 px-8 rounded-2xl hover:shadow-glow-success transition-all duration-300 hover-lift flex items-center space-x-3 ml-8"
              >
                <CheckCircle className="w-6 h-6" />
                <span>Marcar como Assistida</span>
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between mb-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => aulaAnterior && navigate(`/aula/${aulaAnterior.id}`)}
            disabled={!aulaAnterior}
            className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
              aulaAnterior
                ? 'bg-gradient-card text-white hover:shadow-lg hover-lift'
                : 'bg-white/5 text-text-gray cursor-not-allowed'
            }`}
          >
            <SkipBack className="w-5 h-5" />
            <span>Aula Anterior</span>
          </motion.button>

          <div className="text-center">
            <p className="text-text-gray text-sm mb-1">Aula</p>
            <p className="text-primary-yellow font-bold text-2xl">
              {aula.id} de {aulas.length}
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => proximaAula && navigate(`/aula/${proximaAula.id}`)}
            disabled={!proximaAula}
            className={`flex items-center space-x-3 px-6 py-4 rounded-2xl transition-all duration-300 ${
              proximaAula
                ? 'bg-gradient-primary text-black hover:shadow-glow hover-lift'
                : 'bg-white/5 text-text-gray cursor-not-allowed'
            }`}
          >
            <span>Próxima Aula</span>
            <SkipForward className="w-5 h-5" />
          </motion.button>
        </motion.div>

        {/* Course Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card-modern rounded-3xl p-8"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-3 rounded-2xl bg-primary-yellow/10">
              <BookOpen className="w-8 h-8 text-primary-yellow" />
            </div>
            <h3 className="text-2xl font-bold text-white">Progresso do Curso</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {aulas.map((a, index) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => navigate(`/aula/${a.id}`)}
                className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 hover-lift ${
                  a.id === aulaId
                    ? 'bg-gradient-primary text-black shadow-glow'
                    : aulasAssistidas.includes(a.id)
                    ? 'bg-gradient-success text-white shadow-glow-success'
                    : 'bg-gradient-card text-text-gray hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm mb-1">
                      Aula {a.id}
                    </p>
                    <p className="text-xs opacity-75 leading-relaxed">
                      {a.titulo.split(' - ')[1]}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {aulasAssistidas.includes(a.id) && (
                      <CheckCircle className="w-5 h-5" />
                    )}
                    {a.id === aulaId && (
                      <Play className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AulaView; 