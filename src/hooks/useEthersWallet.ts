import { useState, useEffect } from 'react';
import { connectWallet, getBalance, switchToBase, baseConfig } from '../config/ethers';

export const useEthersWallet = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('0');
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [chainId, setChainId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Verificar si MetaMask está instalado
  const isMetaMaskInstalled = typeof window !== 'undefined' && window.ethereum && window.ethereum.isMetaMask;

  // Verificar si Rainbow Wallet está instalado
  const isRainbowWalletInstalled = typeof window !== 'undefined' && window.ethereum && window.ethereum.isRainbow;

  // Conectar wallet
  const connect = async () => {
    try {
      setIsConnecting(true);
      setError(null);
      
      const result = await connectWallet();
      setAddress(result.address);
      setChainId(result.chainId);
      setIsConnected(true);
      
      // Obtener balance
      const balanceValue = await getBalance(result.address);
      setBalance(balanceValue);
      
      console.log('✅ Wallet connected successfully');
    } catch (err: any) {
      setError(err.message);
      console.error('❌ Error connecting wallet:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  // Desconectar wallet
  const disconnect = () => {
    setAddress(null);
    setBalance('0');
    setIsConnected(false);
    setChainId(null);
    setError(null);
    console.log('🔌 Wallet disconnected');
  };

  // Cambiar a Base network
  const switchToBaseNetwork = async () => {
    try {
      await switchToBase();
      console.log('✅ Switched to Base network');
    } catch (err: any) {
      setError(err.message);
      console.error('❌ Error switching to Base:', err);
    }
  };

  // Verificar si está en Base
  const isOnBase = chainId === baseConfig.chainId;

  // Formatear dirección
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  // Formatear balance
  const formatBalance = (bal: string) => {
    return parseFloat(bal).toFixed(4);
  };

  // Escuchar cambios de cuenta
  useEffect(() => {
    if (typeof window !== 'undefined' && window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else if (address !== accounts[0]) {
          setAddress(accounts[0]);
          getBalance(accounts[0]).then(setBalance);
        }
      };

      const handleChainChanged = (chainId: string) => {
        setChainId(parseInt(chainId, 16));
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, [address]);

  return {
    // Estado
    address,
    balance,
    isConnected,
    isConnecting,
    chainId,
    isOnBase,
    isMetaMaskInstalled,
    isRainbowWalletInstalled,
    error,
    
    // Acciones
    connect,
    disconnect,
    switchToBaseNetwork,
    
    // Utilidades
    formatAddress,
    formatBalance,
  };
}; 