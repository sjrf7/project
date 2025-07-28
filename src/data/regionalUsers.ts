import { RegionalUser } from '../types';

export const regionalUsers: RegionalUser[] = [
  {
    id: '1',
    username: 'CryptoMario',
    country: 'México',
    level: 5,
    isOnline: true,
    expertise: ['Bitcoin', 'Trading']
  },
  {
    id: '2',
    username: 'BlockchainAna',
    country: 'Colombia',
    level: 7,
    isOnline: true,
    expertise: ['DeFi', 'Ethereum']
  },
  {
    id: '3',
    username: 'BTCPedro',
    country: 'Argentina',
    level: 4,
    isOnline: false,
    expertise: ['Bitcoin', 'Lightning Network']
  },
  {
    id: '4',
    username: 'DeFiLucia',
    country: 'Chile',
    level: 6,
    isOnline: true,
    expertise: ['DeFi', 'Yield Farming']
  },
  {
    id: '5',
    username: 'EthereumCarlos',
    country: 'Perú',
    level: 3,
    isOnline: true,
    expertise: ['Ethereum', 'Smart Contracts']
  }
];