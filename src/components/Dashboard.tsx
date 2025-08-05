import React from 'react';
import { Star, Target, TrendingUp, Award, Clock, Zap } from 'lucide-react';
import { useEthersWallet } from '../hooks/useEthersWallet';

interface DashboardProps {
  currentUser: any;
  modules: any[];
}

export const Dashboard: React.FC<DashboardProps> = ({ currentUser, modules }) => {
  useEthersWallet();

  const completedModules = modules.filter(m => m.isCompleted).length;
  const totalModules = modules.length;
  const progress = (completedModules / totalModules) * 100;

  const stats = [
    {
      label: 'Level',
      value: currentUser.level,
      icon: Star,
      gradient: 'from-[#78dbe2] to-[#7877c6]',
      change: '+2 this week'
    },
    {
      label: 'Total XP',
      value: currentUser.xp.toLocaleString(),
      icon: Zap,
      gradient: 'from-[#7877c6] to-[#ff77c6]',
      change: '+150 today'
    },
    {
      label: 'NFTs Earned',
      value: currentUser.nfts.length,
      icon: Award,
      gradient: 'from-[#ff77c6] to-[#78dbe2]',
      change: '+1 this week'
    },
    {
      label: 'Completion',
      value: `${Math.round(progress)}%`,
      icon: Target,
      gradient: 'from-[#10b981] to-[#059669]',
      change: '+25% this month'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 pb-24 space-y-8">
      {/* Welcome Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary">
          Bienvenido, {currentUser.username}!
        </h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Continue your crypto journey and connect with the LATAM community
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="glass-card glass-card-hover rounded-2xl p-6 stat-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-400" />
            </div>
            <div className="space-y-2">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
              <p className="text-xs text-green-400 font-medium">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Learning Progress */}
        <div className="lg:col-span-2 glass-card glass-card-hover rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Learning Progress</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Updated now</span>
            </div>
          </div>

          {/* Overall Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-300">Overall Completion</span>
              <span className="text-sm font-bold text-[#78dbe2]">{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-white/5 rounded-full h-3 overflow-hidden">
              <div 
                className="progress-bar h-full rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Module List */}
          <div className="space-y-4">
            {modules.slice(0, 4).map((module) => (
              <div key={module.id} className="flex items-center justify-between p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold ${
                    module.isCompleted ? 'bg-green-500/20 text-green-400' : 
                    module.isLocked ? 'bg-gray-500/20 text-gray-400' : 'bg-[#7877c6]/20 text-[#7877c6]'
                  }`}>
                    {module.isCompleted ? '✓' : module.isLocked ? '🔒' : module.id}
                  </div>
                  <div>
                    <p className="font-semibold text-white">{module.title}</p>
                    <p className="text-sm text-gray-400">{module.duration}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  module.difficulty === 'beginner' ? 'difficulty-beginner text-white' :
                  module.difficulty === 'intermediate' ? 'difficulty-intermediate text-white' :
                  'difficulty-advanced text-white'
                }`}>
                  {module.difficulty === 'beginner' ? 'Beginner' :
                   module.difficulty === 'intermediate' ? 'Intermediate' : 'Advanced'}
                </div>
              </div>
            ))}
          </div>
        </div>

          {/* Recent NFTs & Achievements */}
          <div className="space-y-6">
            {/* Recent NFTs */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 hidden md:block">
              <h3 className="text-xl font-bold text-white mb-4">Recent NFTs</h3>
              {currentUser.nfts.length > 0 ? (
                <div className="space-y-4">
                  {currentUser.nfts.slice(-2).map((nft: any) => (
                    <div key={nft.id} className="flex items-center space-x-4 p-3 bg-white/5 rounded-xl">
                      <div className="text-3xl">{nft.image}</div>
                      <div className="flex-1">
                        <p className="font-semibold text-white text-sm">{nft.name}</p>
                        <p className="text-xs text-gray-400">{nft.description}</p>
                        <div className={`inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                          nft.rarity === 'common' ? 'rarity-common text-white' :
                          nft.rarity === 'rare' ? 'rarity-rare text-white' :
                          nft.rarity === 'epic' ? 'rarity-epic text-white' :
                          'rarity-legendary text-white'
                        }`}>
                          {nft.rarity}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-sm text-gray-400">Complete modules to earn NFTs</p>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="glass-card glass-card-hover rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full btn-primary text-white py-3 px-4 rounded-xl font-medium text-sm">
                  Continue Learning
                </button>
                <button className="w-full btn-secondary text-white py-3 px-4 rounded-xl font-medium text-sm">
                  Join Community Chat
                </button>
                <button className="w-full btn-secondary text-white py-3 px-4 rounded-xl font-medium text-sm">
                  View Leaderboard
                </button>
              </div>
            </div>

            {/* Community Stats */}
            <div className="glass-card glass-card-hover rounded-2xl p-6 hidden md:block">
              <h3 className="text-xl font-bold text-white mb-4">Community</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Active Users</span>
                  <span className="text-sm font-bold text-green-400">1,247</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Your Country Rank</span>
                  <span className="text-sm font-bold text-[#78dbe2]">#12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">LATAM Rank</span>
                  <span className="text-sm font-bold text-[#ff77c6]">#156</span>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};
