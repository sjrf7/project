import { Module } from '../types';

export const modules: Module[] = [
  {
    id: '1',
    title: 'Introducción a Bitcoin',
    description: 'Aprende los fundamentos de Bitcoin y la tecnología blockchain',
    difficulty: 'beginner',
    duration: '15 min',
    topics: ['Bitcoin', 'Blockchain', 'Descentralización'],
    quiz: {
      id: 'quiz-1',
      questions: [
        {
          id: '1',
          question: '¿Cuál es el límite máximo de Bitcoins que pueden existir?',
          options: ['21 millones', '100 millones', '50 millones', 'Ilimitado'],
          correctAnswer: 0,
          explanation: 'Bitcoin tiene un suministro fijo de 21 millones de monedas, lo que lo convierte en una reserva de valor escasa.'
        },
        {
          id: '2',
          question: '¿Qué es un bloque en la blockchain?',
          options: ['Un archivo de texto', 'Un contenedor de transacciones', 'Una aplicación', 'Una criptomoneda'],
          correctAnswer: 1,
          explanation: 'Un bloque es un contenedor que agrupa múltiples transacciones verificadas y las añade a la cadena de bloques.'
        }
      ],
      passingScore: 80
    },
    nftReward: {
      id: 'nft-1',
      name: 'Bitcoin Pioneer',
      description: 'Primer paso en tu journey crypto',
      image: '🪙',
      rarity: 'common'
    },
    isLocked: false,
    isCompleted: false
  },
  {
    id: '2',
    title: 'Ethereum y Smart Contracts',
    description: 'Descubre Ethereum y el poder de los contratos inteligentes',
    difficulty: 'intermediate',
    duration: '20 min',
    topics: ['Ethereum', 'Smart Contracts', 'DApps'],
    quiz: {
      id: 'quiz-2',
      questions: [
        {
          id: '1',
          question: '¿Qué hace único a Ethereum?',
          options: ['Solo transferencias', 'Smart contracts', 'Minería más rápida', 'Menos fees'],
          correctAnswer: 1,
          explanation: 'Ethereum permite ejecutar smart contracts, programas que se ejecutan automáticamente cuando se cumplen ciertas condiciones.'
        },
        {
          id: '2',
          question: '¿Qué es gas en Ethereum?',
          options: ['Combustible físico', 'Comisión por transacción', 'Una criptomoneda', 'Un token'],
          correctAnswer: 1,
          explanation: 'Gas es el costo computacional requerido para ejecutar operaciones en la red Ethereum.'
        }
      ],
      passingScore: 80
    },
    nftReward: {
      id: 'nft-2',
      name: 'Smart Contract Master',
      description: 'Dominas los contratos inteligentes',
      image: '⚡',
      rarity: 'rare'
    },
    isLocked: true,
    isCompleted: false
  },
  {
    id: '3',
    title: 'DeFi: Finanzas Descentralizadas',
    description: 'Explora el ecosistema DeFi y sus oportunidades',
    difficulty: 'advanced',
    duration: '25 min',
    topics: ['DeFi', 'Yield Farming', 'AMM', 'Lending'],
    quiz: {
      id: 'quiz-3',
      questions: [
        {
          id: '1',
          question: '¿Qué significa AMM?',
          options: ['Automated Money Maker', 'Automated Market Maker', 'Advanced Mining Machine', 'Anonymous Money Manager'],
          correctAnswer: 1,
          explanation: 'AMM (Automated Market Maker) es un protocolo que permite el intercambio automático de tokens usando pools de liquidez.'
        }
      ],
      passingScore: 80
    },
    nftReward: {
      id: 'nft-3',
      name: 'DeFi Explorer',
      description: 'Navegante experto del DeFi',
      image: '🚀',
      rarity: 'epic'
    },
    isLocked: true,
    isCompleted: false
  }
];