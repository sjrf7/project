import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight, Award } from 'lucide-react';

interface QuizProps {
  module: any;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ module, onComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = module.quiz.questions;
  const question = questions[currentQuestion];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calcular puntuación final
      const correctAnswers = selectedAnswers.reduce((acc, answer, index) => {
        return acc + (answer === questions[index].correctAnswer ? 1 : 0);
      }, 0);
      const finalScore = (correctAnswers / questions.length) * 100;
      setScore(finalScore);
      setQuizCompleted(true);
    }
  };

  const handleShowResult = () => {
    setShowResult(true);
  };

  const handleFinish = () => {
    onComplete(score);
  };

  if (quizCompleted) {
    const passed = score >= module.quiz.passingScore;
    
    return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="glass-card glass-card-hover rounded-2xl p-6 text-center">
          <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-6 ${
            passed ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-red-400 to-pink-500'
          }`}>
            {passed ? (
              <Award className="w-16 h-16 text-white" />
            ) : (
              <XCircle className="w-16 h-16 text-white" />
            )}
          </div>
          
          <h2 className="text-4xl font-bold text-white mb-4">
            {passed ? '¡Felicidades!' : '¡Sigue intentando!'}
          </h2>
          
          <div className="mb-6">
            <div className="text-6xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">{Math.round(score)}%</div>
            <p className="text-cyan-300 text-lg">
              {passed 
                ? `¡Has aprobado el módulo "${module.title}"!` 
                : `Necesitas ${module.quiz.passingScore}% para aprobar`
              }
            </p>
          </div>

          {passed && (
            <div className="bg-[#0a0a0a] rounded-2xl p-6 mb-6 crypto-glow">
              <div className="text-6xl mb-4">{module.nftReward.image}</div>
              <h3 className="font-bold text-2xl text-white mb-2">
                ¡Has ganado el NFT "{module.nftReward.name}"!
              </h3>
              <p className="text-cyan-300 text-lg">{module.nftReward.description}</p>
            </div>
          )}

          <div className="space-x-4">
            <button
              onClick={onBack}
            className="px-8 py-3 bg-[#0a0a0a] text-white rounded-xl hover-lift font-medium"
            >
              Volver a Módulos
            </button>
            <button
              onClick={handleFinish}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-xl hover-lift font-bold crypto-glow"
            >
              Continuar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-cyan-400 hover:text-cyan-300 mb-4 font-medium"
        >
          ← Volver a Módulos
        </button>
        
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-3xl font-bold text-white">{module.title}</h2>
          <span className="text-sm text-cyan-300 font-medium">
            Pregunta {currentQuestion + 1} de {questions.length}
          </span>
        </div>
        
        <div className="w-full bg-white/10 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 h-3 rounded-full transition-all duration-300 crypto-glow"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="glass-card glass-card-hover rounded-2xl p-6">
        <h3 className="text-2xl font-bold text-white mb-6">
          {question.question}
        </h3>

        <div className="space-y-4 mb-8">
          {question.options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              className={`w-full p-5 text-left rounded-xl border-2 transition-all hover-lift ${
                selectedAnswers[currentQuestion] === index
                  ? 'border-cyan-400 bg-[#0a0a0a] text-cyan-300 crypto-glow'
                  : 'border-white/20 bg-[#0a0a0a] text-white hover:border-cyan-400'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswers[currentQuestion] === index
                    ? 'border-cyan-400 bg-gradient-to-br from-cyan-400 to-purple-500'
                    : 'border-white/30'
                }`}>
                  {selectedAnswers[currentQuestion] === index && (
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  )}
                </div>
                <span className="font-semibold text-lg">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {showResult && (
          <div className={`p-6 rounded-xl mb-6 ${
            selectedAnswers[currentQuestion] === question.correctAnswer
              ? 'glass border border-green-400 crypto-glow'
              : 'glass border border-red-400 crypto-glow'
          }`}>
            <div className="flex items-start space-x-3">
              {selectedAnswers[currentQuestion] === question.correctAnswer ? (
                <CheckCircle className="w-6 h-6 text-green-400 mt-0.5" />
              ) : (
                <XCircle className="w-6 h-6 text-red-400 mt-0.5" />
              )}
              <div>
                <p className={`font-bold text-lg ${
                  selectedAnswers[currentQuestion] === question.correctAnswer
                    ? 'text-green-400'
                    : 'text-red-400'
                }`}>
                  {selectedAnswers[currentQuestion] === question.correctAnswer
                    ? '¡Correcto!'
                    : 'Incorrecto'
                  }
                </p>
                <p className="text-cyan-300 mt-2">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between">
          <div></div>
          <button
            onClick={showResult ? handleNext : handleShowResult}
            disabled={selectedAnswers[currentQuestion] === undefined}
            className="px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-500 text-white rounded-xl hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-bold crypto-glow"
          >
            <span>
              {showResult 
                ? (currentQuestion < questions.length - 1 ? 'Siguiente' : 'Finalizar')
                : 'Verificar'
              }
            </span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};