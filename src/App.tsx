import { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { ModulesList } from './components/ModulesList';
import { Quiz } from './components/Quiz';
import { Community } from './components/Community';
import { Profile } from './components/Profile';
import { modules } from './data/modules';
import { regionalUsers } from './data/regionalUsers';
import { User } from './types';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentQuiz, setCurrentQuiz] = useState<string>('');
  
  const [currentUser, setCurrentUser] = useState<User>({
    id: '1',
    username: 'CryptoLearner',
    country: 'México',
    region: 'LATAM',
    level: 2,
    xp: 650,
    completedModules: ['1'],
    nfts: [
      {
        id: 'nft-1',
        name: 'Bitcoin Pioneer',
        description: 'Primer paso en tu journey crypto',
        image: '🪙',
        rarity: 'common',
        mintDate: '2025-01-07'
      }
    ],
    avatar: '🚀'
  });

  const [moduleData, setModuleData] = useState(() => {
    return modules.map(module => ({
      ...module,
      isCompleted: currentUser.completedModules.includes(module.id),
      isLocked: module.id !== '1' && !currentUser.completedModules.includes(String(parseInt(module.id) - 1))
    }));
  });

  const handleStartModule = (moduleId: string) => {
    setCurrentQuiz(moduleId);
  };

  const handleQuizComplete = (score: number) => {
    if (!currentQuiz) return;
    const module = moduleData.find(m => m.id === currentQuiz);
    if (!module) return;

    if (score >= module.quiz.passingScore) {
      // Marcar módulo como completado
      const updatedModules = moduleData.map(m => {
        if (m.id === currentQuiz) {
          return { ...m, isCompleted: true };
        }
        // Desbloquear siguiente módulo
        if (m.id === String(parseInt(currentQuiz) + 1)) {
          return { ...m, isLocked: false };
        }
        return m;
      });
      
      setModuleData(updatedModules);

      // Actualizar usuario
      const updatedUser = {
        ...currentUser,
        completedModules: [...currentUser.completedModules.filter(Boolean), currentQuiz],
        nfts: [...currentUser.nfts, { ...module.nftReward, mintDate: new Date().toISOString().split('T')[0] }],
        xp: currentUser.xp + 100,
        level: Math.floor((currentUser.xp + 100) / 250) + 1
      };
      
      setCurrentUser(updatedUser);
    }

    setCurrentQuiz('');
    setActiveTab('modules');
  };

  const handleSetActiveTab = (tab: string) => {
    setActiveTab(tab);
    setCurrentQuiz('');
  };

  if (currentQuiz) {
    const module = moduleData.find(m => m.id === currentQuiz);
    return (
      <div className="min-h-screen layer3-bg">
        <Header currentUser={currentUser} activeTab={activeTab} setActiveTab={handleSetActiveTab} />
        <Quiz 
          module={module} 
          onComplete={handleQuizComplete}
          onBack={() => setCurrentQuiz('')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen layer3-bg">
      <Header currentUser={currentUser} activeTab={activeTab} setActiveTab={handleSetActiveTab} />
      
      {activeTab === 'dashboard' && (
        <Dashboard currentUser={currentUser} modules={moduleData} />
      )}
      
      {activeTab === 'modules' && (
        <ModulesList modules={moduleData} onStartModule={handleStartModule} />
      )}
      
      {activeTab === 'community' && (
        <Community regionalUsers={regionalUsers} />
      )}
      
      {activeTab === 'profile' && (
        <Profile currentUser={currentUser} />
      )}
    </div>
  );
}

export default App;
