export interface User {
  id: string;
  username: string;
  country: string;
  region: string;
  level: number;
  xp: number;
  completedModules: string[];
  nfts: NFTReward[];
  avatar: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: string;
  topics: string[];
  quiz: Quiz;
  nftReward: NFTReward;
  isLocked: boolean;
  isCompleted: boolean;
}

export interface Quiz {
  id: string;
  questions: Question[];
  passingScore: number;
}

export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface NFTReward {
  id: string;
  name: string;
  description: string;
  image: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  mintDate?: string;
}

export interface RegionalUser {
  id: string;
  username: string;
  country: string;
  level: number;
  isOnline: boolean;
  expertise: string[];
}