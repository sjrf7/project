import React from 'react';
import { Lock, Clock, Trophy, Play, Users, Star } from 'lucide-react';

interface ModulesListProps {
  modules: any[];
  onStartModule: (moduleId: string) => void;
}

export const ModulesList: React.FC<ModulesListProps> = ({ modules, onStartModule }) => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">
          Learning Modules
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Master crypto and blockchain step by step. Earn exclusive NFTs as you progress.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="glass-card rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Your Progress</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <Trophy className="w-4 h-4" />
            <span>{modules.filter(m => m.isCompleted).length} / {modules.length} completed</span>
          </div>
        </div>
        <div className="w-full bg-white/5 rounded-full h-2">
          <div 
            className="progress-bar h-full rounded-full"
            style={{ width: `${(modules.filter(m => m.isCompleted).length / modules.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Modules Grid */}
      <div className="space-y-6">
        {modules.map((module, index) => (
          <div
            key={module.id}
            className={`module-card glass-card glass-card-hover rounded-2xl overflow-hidden ${
              module.isLocked ? 'opacity-60' : ''
            }`}
          >
            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Module Info */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                      module.isCompleted ? 'bg-green-500/20 text-green-400' : 
                      module.isLocked ? 'bg-gray-500/20 text-gray-400' : 'bg-[#7877c6]/20 text-[#7877c6]'
                    }`}>
                      {module.isCompleted ? '✓' : module.isLocked ? <Lock className="w-6 h-6" /> : index + 1}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{module.title}</h3>
                      {module.isCompleted && (
                        <div className="inline-flex items-center space-x-1 mt-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                          <Trophy className="w-4 h-4" />
                          <span>Completed</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed">{module.description}</p>

                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">{module.duration}</span>
                    </div>
                    <div className={`px-4 py-2 rounded-full text-sm font-bold text-white ${
                      module.difficulty === 'beginner' ? 'difficulty-beginner' :
                      module.difficulty === 'intermediate' ? 'difficulty-intermediate' :
                      'difficulty-advanced'
                    }`}>
                      {module.difficulty === 'beginner' ? 'Beginner' :
                       module.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced'}
                    </div>
                    <div className="flex items-center space-x-2 text-gray-400">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">{module.quiz.questions.length} questions</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {module.topics.map((topic: string) => (
                      <span
                        key={topic}
                        className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm font-medium"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>

                {/* NFT Reward & Action */}
                <div className="flex flex-col items-center space-y-4 lg:w-64">
                  <div className="text-center">
                    <div className="text-6xl mb-3 float-animation">{module.nftReward.image}</div>
                    <h4 className="font-bold text-white mb-1">{module.nftReward.name}</h4>
                    <p className="text-sm text-gray-400 mb-3">{module.nftReward.description}</p>
                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white ${
                      module.nftReward.rarity === 'common' ? 'rarity-common' :
                      module.nftReward.rarity === 'rare' ? 'rarity-rare' :
                      module.nftReward.rarity === 'epic' ? 'rarity-epic' :
                      'rarity-legendary'
                    }`}>
                      {module.nftReward.rarity.toUpperCase()}
                    </div>
                  </div>

                  <button
                    onClick={() => !module.isLocked && onStartModule(module.id)}
                    disabled={module.isLocked}
                    className={`w-full px-6 py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center space-x-2 ${
                      module.isLocked
                        ? 'bg-gray-600/20 text-gray-400 cursor-not-allowed'
                        : module.isCompleted
                        ? 'btn-secondary hover:bg-white/20'
                        : 'btn-primary'
                    }`}
                  >
                    <Play className="w-5 h-5" />
                    <span>
                      {module.isCompleted ? 'Review' : module.isLocked ? 'Locked' : 'Start Module'}
                    </span>
                  </button>

                  {!module.isLocked && (
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1 text-yellow-400 mb-1">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-bold">+100 XP</span>
                      </div>
                      <p className="text-xs text-gray-400">Reward for completion</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};