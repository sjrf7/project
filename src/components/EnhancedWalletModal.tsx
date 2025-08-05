import React, { useState, useEffect } from 'react';
import { X, Wallet, Shield, Zap, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useEthersWallet } from '../hooks/useEthersWallet';

interface EnhancedWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnhancedWalletModal: React.FC<EnhancedWalletModalProps> = ({ isOpen, onClose }) => {
  const { connect, isMetaMaskInstalled, isRainbowWalletInstalled } = useEthersWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const wallets = [
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'The most popular Ethereum wallet',
      icon: '/wallet-logos/MetaMask-icon-fox.svg',
      installed: isMetaMaskInstalled,
      color: 'from-orange-400 to-orange-600',
      features: ['Browser Extension', 'Mobile App', 'Hardware Wallet Support']
    },
    {
      id: 'rainbow',
      name: 'Rainbow Wallet',
      description: 'Beautiful & secure crypto wallet',
      icon: '/wallet-logos/rainbow.png',
      installed: isRainbowWalletInstalled,
      color: 'from-blue-400 to-purple-600',
      features: ['Mobile First', 'NFT Gallery', 'DeFi Ready']
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      description: 'Your gateway to web3',
      icon: '/wallet-logos/coinbase.svg',
      installed: true,
      color: 'from-blue-500 to-blue-700',
      features: ['Easy Setup', 'Multi-chain', 'DApp Browser']
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Connect any wallet via QR code',
      icon: '/wallet-logos/WalletConnect-icon.svg',
      installed: true,
      color: 'from-indigo-500 to-purple-600',
      features: ['Universal', 'Secure', 'Multi-platform']
    }
  ];

  const benefits = [
    { icon: <Trophy className="w-5 h-5" />, text: 'Track your learning progress' },
    { icon: <Zap className="w-5 h-5" />, text: 'Earn NFTs and rewards' },
    { icon: <Shield className="w-5 h-5" />, text: 'Secure your achievements' },
    { icon: <Sparkles className="w-5 h-5" />, text: 'Access exclusive content' }
  ];

  const handleWalletConnect = async (walletId: string) => {
    setSelectedWallet(walletId);
    setIsConnecting(true);
    
    try {
      await connect();
      onClose();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    } finally {
      setIsConnecting(false);
      setSelectedWallet(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 rounded-3xl border border-white/10 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="relative p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Wallet className="w-6 h-6 text-purple-400" />
                Connect Your Wallet
              </h2>
              <p className="text-sm text-gray-400 mt-1">
                Choose your preferred wallet to start your crypto journey
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10">
          <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            What you'll get
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                <div className="text-purple-400">{benefit.icon}</div>
                <span className="text-gray-300">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Wallet Options */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className={`
                relative group cursor-pointer rounded-2xl p-6 transition-all duration-300
                ${selectedWallet === wallet.id ? 'ring-2 ring-purple-500 bg-white/10' : 'hover:bg-white/5'}
                ${isConnecting && selectedWallet === wallet.id ? 'opacity-75' : ''}
              `}
              onClick={() => handleWalletConnect(wallet.id)}
            >
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${wallet.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <img src={wallet.icon} alt={wallet.name} className="w-10 h-10" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">{wallet.name}</h3>
                    {wallet.installed && (
                      <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                        Detected
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{wallet.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {wallet.features.map((feature, index) => (
                      <span key={index} className="px-2 py-1 bg-white/10 text-white text-xs rounded">
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                <ArrowRight className={`w-5 h-5 text-gray-400 group-hover:text-white transition-colors ${selectedWallet === wallet.id ? 'translate-x-1' : ''}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border-t border-white/10">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              {isConnecting ? 'Connecting...' : 'Secure & Private'}
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400">Encrypted Connection</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
