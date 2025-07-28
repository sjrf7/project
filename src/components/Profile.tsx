import React from 'react';
import { Trophy, Star, Award, Calendar } from 'lucide-react';

interface ProfileProps {
  currentUser: any;
}

export const Profile: React.FC<ProfileProps> = ({ currentUser }) => {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-yellow-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'Común';
      case 'rare': return 'Raro';
      case 'epic': return 'Épico';
      case 'legendary': return 'Legendario';
      default: return 'Común';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Información del perfil */}
        <div className="lg:col-span-1">
          <div className="glass-card glass-card-hover rounded-2xl p-6 text-center">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl text-white font-bold">
              {currentUser.avatar}
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-2">{currentUser.username}</h2>
            <p className="mb-4">🌎 {currentUser.country}, {currentUser.region}</p>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-1">
                  <Star className="w-5 h-5 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600">{currentUser.level}</div>
                <div className="text-sm text-white">Nivel</div>
              </div>
              
              <div className="glass-card glass-card-hover rounded-2xl p-4 flex flex-col items-center justify-center">
                <div className="flex items-center justify-center mb-1">
                  <Trophy className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-blue-600">{currentUser.xp}</div>
                <div className="text-sm text-white">XP Total</div>
              </div>
            </div>
 
            <div className="glass-card glass-card-hover rounded-2xl p-6">
              <h3 className="font-semibold mb-2">Progreso al siguiente nivel</h3>
              <div className="w-full bg-white/50 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                  style={{ width: '65%' }}
                ></div>
              </div>
              <p className="text-sm">650 / 1000 XP</p>
            </div>
          </div>

          {/* Logros */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 mt-6">
            <h3 className="text-xl font-bold mb-4">Logros Recientes</h3>
            <div className="space-y-3">
              <div className="glass-card glass-card-hover rounded-2xl p-6 flex items-center space-x-3">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                  🏆
                </div>
                <div>
                  <p className="font-medium">Primer Módulo</p>
                  <p className="text-sm">Completaste tu primera lección</p>
                </div>
              </div>
              
              <div className="glass-card glass-card-hover rounded-2xl p-6 flex items-center space-x-3">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  🎯
                </div>
                <div>
                  <p className="font-medium">Quiz Master</p>
                  <p className="text-sm">Aprobaste con 100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NFTs Coleccionados */}
        <div className="lg:col-span-2">
          <div className="glass-card glass-card-hover rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Mi Colección de NFTs</h3>
              <div className="flex items-center space-x-2">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="font-semibold text-purple-600">{currentUser.nfts.length} NFTs</span>
              </div>
            </div>

            {currentUser.nfts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentUser.nfts.map((nft: any) => (
                  <div
                    key={nft.id}
                    className="glass-card glass-card-hover rounded-2xl p-6"
                  >
                    <div className="text-center mb-4">
                      <div className="text-6xl mb-3">{nft.image}</div>
                <h4 className="text-xl font-bold mb-2">{nft.name}</h4>
                <p className="text-sm mb-3">{nft.description}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className={`px-3 py-1 rounded-full bg-gradient-to-r ${getRarityColor(nft.rarity)} text-white text-sm font-medium`}>
                        {getRarityText(nft.rarity)}
                      </div>
                      <div className="flex items-center space-x-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{nft.mintDate || 'Recién obtenido'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-8xl mb-4">🏆</div>
                <h4 className="text-xl font-semibold text-gray-800 mb-2">¡Comienza tu colección!</h4>
                <p className="text-gray-600 mb-6">
                  Completa módulos de aprendizaje para ganar tus primeros NFTs exclusivos
                </p>
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm text-gray-700">
                    💡 <strong>Tip:</strong> Cada módulo completado te otorga un NFT único que representa tu progreso en el mundo crypto
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Estadísticas de actividad */}
          <div className="glass-card glass-card-hover rounded-2xl p-6 mt-6">
            <h3 className="text-xl font-bold mb-4">Estadísticas de Aprendizaje</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="glass-card glass-card-hover rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-green-600">{currentUser.completedModules.length}</div>
                <div className="text-sm">Módulos Completados</div>
              </div>
              
              <div className="glass-card glass-card-hover rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">95%</div>
                <div className="text-sm">Promedio Quiz</div>
              </div>
              
              <div className="glass-card glass-card-hover rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">7</div>
                <div className="text-sm">Días Activo</div>
              </div>
              
              <div className="glass-card glass-card-hover rounded-2xl p-4 text-center">
                <div className="text-2xl font-bold text-yellow-600">3</div>
                <div className="text-sm">Logros</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};