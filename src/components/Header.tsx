import React, { useState, useEffect, useRef } from 'react';
import { User, Trophy, Users, BookOpen, Wallet, ChevronDown, AlertTriangle } from 'lucide-react';
import { useEthersWallet } from '../hooks/useEthersWallet';

interface HeaderProps {
  currentUser: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentUser, activeTab, setActiveTab }) => {
  const { 
    address, 
    balance,
    isConnected, 
    isConnecting, 
    isOnBase,
    isMetaMaskInstalled,
    isRainbowWalletInstalled,
    error,
    connect, 
    disconnect, 
    switchToBaseNetwork,
    formatAddress,
    formatBalance
  } = useEthersWallet();

  const handleConnectRainbow = async () => {
    setShowWalletOptions(false);
    if (!isRainbowWalletInstalled) {
      setWalletDetectionError('Rainbow Wallet no detectado. Por favor instala Rainbow Wallet para conectar tu wallet.');
      setTimeout(() => setWalletDetectionError(null), 5000);
      return;
    }
    await connect();
  };

  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showWalletOptions, setShowWalletOptions] = useState(false);
  const [walletDetectionError, setWalletDetectionError] = useState<string | null>(null);

  const walletInfoRef = useRef<HTMLDivElement>(null);
  const walletOptionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isConnected && isOnBase) {
      setShowWalletInfo(true);
      const timer = setTimeout(() => setShowWalletInfo(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isConnected, isOnBase]);

  useEffect(() => {
    if (error) {
      setShowError(true);
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (walletInfoRef.current && !walletInfoRef.current.contains(event.target as Node)) {
        setShowWalletInfo(false);
      }
      if (walletOptionsRef.current && !walletOptionsRef.current.contains(event.target as Node)) {
        setShowWalletOptions(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Trophy },
    { id: 'modules', label: 'Learn', icon: BookOpen },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  const handleWalletAction = async () => {
    if (isConnected) {
      // Show wallet info dropdown instead of disconnecting
      setShowWalletInfo(true);
    } else {
      // Show wallet options modal instead of direct connect
      setShowWalletOptions(true);
    }
  };

  const handleConnectMetaMask = async () => {
    setShowWalletOptions(false);
    if (!isMetaMaskInstalled) {
      setWalletDetectionError('MetaMask no detectado. Por favor instala MetaMask para conectar tu wallet.');
      setTimeout(() => setWalletDetectionError(null), 5000);
      return;
    }
    await connect();
  };

  const formatAddressDisplay = (addr: string) => {
    return formatAddress(addr);
  };

  const formatBalanceDisplay = (bal: string) => {
    return formatBalance(bal);
  };

  return (
    <>
      <header className="glass-card border-b border-white/5 sticky top-0 z-50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#78dbe2] via-[#7877c6] to-[#ff77c6] flex items-center justify-center text-xl font-bold text-white">
                L3
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient-primary">CryptoLearn</h1>
                <p className="text-xs text-gray-400 font-medium">LATAM Edition</p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`nav-item px-6 py-2.5 rounded-lg font-medium text-sm transition-all ${
                    activeTab === item.id
                      ? 'active text-white bg-white/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {item.icon && <item.icon className="w-4 h-4" />}
                    <span>{item.label}</span>
                  </div>
                </button>
              ))}
            </nav>

            {/* User Info & Wallet */}
            <div className="flex items-center space-x-4">
              {/* Wallet Connection */}
              <div className="relative">
                <button
                  onClick={handleWalletAction}
                  disabled={isConnecting}
                  className={`flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-2 rounded-xl font-medium text-sm transition-all ${
                    isConnected
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'btn-secondary hover:bg-white/10'
                  } ${isConnecting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {isConnecting 
                      ? 'Connecting...' 
                      : isConnected 
                        ? formatAddressDisplay(address || '')
                        : 'Connect Wallet'
                    }
                  </span>
                  {!isConnected && <ChevronDown className="w-4 h-4 hidden sm:inline" />}
                </button>

                {/* Wallet Options Modal */}
                {showWalletOptions && (
                  <div
                    ref={walletOptionsRef}
                    className="absolute top-full right-1/2 translate-x-1/2 mt-2 w-80 bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-gray-900/90 backdrop-blur-md rounded-2xl p-5 shadow-lg z-50 border border-gray-700"
                    style={{ animation: 'fadeInScale 0.3s ease forwards' }}
                  >
                    <h3 className="text-white font-bold text-lg mb-5 tracking-wide text-center">Select Wallet</h3>
                    <div className="flex flex-col space-y-4">
                      <button
                        onClick={handleConnectMetaMask}
                        className="flex items-center justify-between w-full bg-gray-800 hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-600 transition-all duration-300 py-3 px-5 rounded-2xl shadow-md transform hover:scale-[1.03]"
                      >
                        <div className="flex items-center space-x-4">
                          <img src="/wallet-logos/MetaMask-icon-fox.svg" alt="MetaMask" className="w-7 h-7" />
                          <span className="font-semibold text-white text-lg">MetaMask</span>
                        </div>
                          {isMetaMaskInstalled && (
                            <span className="text-sm text-green-400 font-semibold tracking-wide ml-3">Detectado</span>
                          )}
                      </button>
                      <button
                        onClick={() => {
                          setShowWalletOptions(false);
                          setWalletDetectionError('WalletConnect no está disponible actualmente.');
                          setTimeout(() => setWalletDetectionError(null), 5000);
                        }}
                        className="flex items-center justify-between w-full bg-gray-800 hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-600 transition-all duration-300 py-3 px-5 rounded-2xl shadow-md transform hover:scale-[1.03]"
                      >
                        <div className="flex items-center space-x-4">
                          <img src="/wallet-logos/WalletConnect-icon.svg" alt="WalletConnect" className="w-7 h-7" />
                          <span className="font-semibold text-white text-lg">WalletConnect</span>
                        </div>
                        <span className="text-sm text-gray-400 font-semibold tracking-wide ml-3">No detectado</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowWalletOptions(false);
                          setWalletDetectionError('Coinbase Wallet no está disponible actualmente.');
                          setTimeout(() => setWalletDetectionError(null), 5000);
                        }}
                        className="flex items-center justify-between w-full bg-gray-800 hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-600 transition-all duration-300 py-3 px-5 rounded-2xl shadow-md transform hover:scale-[1.03]"
                      >
                        <div className="flex items-center space-x-4">
                          <img src="/wallet-logos/coinbase.svg" alt="Coinbase Wallet" className="w-7 h-7" />
                          <span className="font-semibold text-white text-lg">Coinbase Wallet</span>
                        </div>
                        <span className="text-sm text-gray-400 font-semibold tracking-wide ml-3">No detectado</span>
                      </button>
                      <button
                        onClick={handleConnectRainbow}
                        className="flex items-center justify-between w-full bg-gray-800 hover:bg-gradient-to-r hover:from-purple-700 hover:to-pink-600 transition-all duration-300 py-3 px-5 rounded-2xl shadow-md transform hover:scale-[1.03]"
                      >
                        <div className="flex items-center space-x-4">
                          <img src="/wallet-logos/rainbow.png" alt="Rainbow Wallet" className="w-7 h-7" />
                          <span className="font-semibold text-white text-lg">Rainbow Wallet</span>
                        </div>
                        {isRainbowWalletInstalled ? (
                          <span className="text-sm text-green-400 font-semibold tracking-wide ml-3">Detectado</span>
                        ) : (
                          <span className="text-sm text-gray-400 font-semibold tracking-wide ml-3">No detectado</span>
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {/* Network Warning */}
                {isConnected && !isOnBase && (
                  <div className="absolute top-full right-0 mt-2 w-64 glass-card rounded-xl p-3">
                    <div className="flex items-center space-x-2 text-yellow-400 mb-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs font-medium">Wrong Network</span>
                    </div>
                    <p className="text-xs text-gray-400 mb-3">
                      Please switch to Base network to use this app
                    </p>
                    <button
                      onClick={switchToBaseNetwork}
                      className="w-full px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-xs hover:bg-blue-500/30 transition-all"
                    >
                      Switch to Base
                    </button>
                  </div>
                )}

                {/* Wallet Info */}
                {isConnected && isOnBase && showWalletInfo && (
                  <div
                    ref={walletInfoRef}
                    className="absolute top-full right-0 mt-2 w-72 bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-gray-900/90 backdrop-blur-md rounded-2xl p-5 shadow-lg z-50 border border-gray-700"
                    style={{ animation: 'fadeInScale 0.3s ease forwards' }}
                  >
                    <div className="space-y-4 text-white">
                      <div>
                        <div className="text-xs font-semibold tracking-wide text-gray-400 mb-1">Address</div>
                        <div className="font-mono text-sm">{formatAddressDisplay(address || '')}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold tracking-wide text-gray-400 mb-1">Balance</div>
                        <div className="text-sm">{formatBalanceDisplay(balance)} ETH</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold tracking-wide text-gray-400 mb-1">Network</div>
                        <div className="text-sm text-green-400 font-semibold">Base</div>
                      </div>
                      <button
                        onClick={disconnect}
                        className="mt-3 w-full bg-gradient-to-r from-purple-700 to-pink-600 hover:from-pink-600 hover:to-purple-700 transition-all duration-300 py-2 rounded-2xl font-semibold shadow-md"
                      >
                        Disconnect
                      </button>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {error && showError && (
                  <div
                    className="absolute top-full right-0 mt-2 w-72 bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-gray-900/90 backdrop-blur-md rounded-2xl p-5 shadow-lg z-50 border border-red-600"
                    style={{ animation: 'fadeInScale 0.3s ease forwards' }}
                  >
                    <div className="flex items-center space-x-3 text-red-400 mb-3">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="text-lg font-semibold tracking-wide">Error</span>
                    </div>
                    <p className="text-sm text-red-300 break-words">{error}</p>
                  </div>
                )}
                {walletDetectionError && (
                  <div
                    className="absolute top-full right-0 mt-2 w-72 bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-gray-900/90 backdrop-blur-md rounded-2xl p-5 shadow-lg z-50 border border-red-600"
                    style={{ animation: 'fadeInScale 0.3s ease forwards' }}
                  >
                    <div className="flex items-center space-x-3 text-red-400 mb-3">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="text-lg font-semibold tracking-wide">Error</span>
                    </div>
                    <p className="text-sm text-red-300 break-words">{walletDetectionError}</p>
                  </div>
                )}
              </div>

              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-white">{currentUser.username}</p>
                <div className="flex items-center space-x-2 text-xs text-gray-400">
                  <span>Level {currentUser.level}</span>
                  <span>•</span>
                  <span>{currentUser.xp} XP</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#ff77c6] to-[#7877c6] flex items-center justify-center text-lg">
                {currentUser.avatar}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation fixed at bottom */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg border-t border-white/10 z-50 px-4 py-2">
        <nav className="flex items-center justify-between">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`nav-item flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all ${
                activeTab === item.id
                  ? 'active text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {item.icon && <item.icon className="w-5 h-5" />}
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};
