// Configuración de Farcaster
export const farcasterConfig = {
  // Usar el hub público de Farcaster
  hubUrl: 'https://nemes.farcaster.xyz:2283',
  // O usar el hub de desarrollo
  // hubUrl: 'https://dev.farcaster.xyz:2283',
};

// Tipos para Farcaster
export interface FarcasterUser {
  fid: number;
  username: string;
  displayName: string;
  avatar: string;
  isConnected: boolean;
}

export interface FarcasterMessage {
  id: string;
  text: string;
  timestamp: number;
  author: FarcasterUser;
}

// Función para inicializar Farcaster (se implementará más tarde)
export const initializeFarcaster = async () => {
  console.log('Farcaster initialization coming soon...');
  return null;
}; 