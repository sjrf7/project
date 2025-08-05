import { ethers } from 'ethers';

// Configuración de Base
export const baseConfig = {
  chainId: 8453, // Base Mainnet
  chainName: 'Base',
  rpcUrl: 'https://mainnet.base.org',
  blockExplorer: 'https://basescan.org',
  nativeCurrency: {
    name: 'Ether',
    symbol: 'ETH',
    decimals: 18,
  },
};

// Crear provider de Base
export const getBaseProvider = () => {
  return new ethers.providers.JsonRpcProvider(baseConfig.rpcUrl);
};

// Función para conectar wallet
export const connectWallet = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      // Solicitar conexión
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      
      // Crear provider y signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      return {
        address: accounts[0],
        provider,
        signer,
        chainId: await signer.getChainId(),
      };
    } catch (error) {
      console.error('Error connecting wallet:', error);
      throw error;
    }
  } else {
    throw new Error('MetaMask not found');
  }
};

// Función para obtener balance
export const getBalance = async (address: string) => {
  const provider = getBaseProvider();
  const balance = await provider.getBalance(address);
  return ethers.utils.formatEther(balance);
};

// Función para cambiar a Base network
export const switchToBase = async () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${baseConfig.chainId.toString(16)}` }],
      });
    } catch (error: any) {
      // Si la red no existe, agregarla
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${baseConfig.chainId.toString(16)}`,
              chainName: baseConfig.chainName,
              nativeCurrency: baseConfig.nativeCurrency,
              rpcUrls: [baseConfig.rpcUrl],
              blockExplorerUrls: [baseConfig.blockExplorer],
            },
          ],
        });
      }
    }
  }
}; 