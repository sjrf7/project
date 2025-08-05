import React, { useState, useEffect, useRef } from 'react';
import { X, Wallet, Shield, Zap, CheckCircle, ArrowRight, Sparkles, Download, AlertCircle } from 'lucide-react';
import { useEthersWallet } from '../hooks/useEthersWallet';

interface ImprovedWalletModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ImprovedWalletModal: React.FC<ImprovedWalletModalProps> = ({ isOpen, onClose }) => {
  const { connect, isMetaMaskInstalled, isRainbowWalletInstalled } = useEthersWallet();
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [hoveredWallet, setHoveredWallet] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const wallets = [
    {
      id: 'metamask',
      name: 'MetaMask',
      description: 'Connect with MetaMask browser extension or mobile app',
      icon: '/wallet-logos/MetaMask-icon-fox.svg',
      installed: isMetaMaskInstalled,
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-500/10',
      borderColor: 'border-orange-500/20',
      hoverBorderColor: 'hover:border-orange-500/40',
      features: ['Browser Extension', 'Mobile App', 'Hardware Wallet Support'],
      installUrl: 'https://metamask.io/download/'
    },
    {
      id: 'rainbow',
      name: 'Rainbow Wallet',
      description: 'Beautiful, secure, and user-friendly mobile wallet',
      icon: '/wallet-logos/rainbow.png',
      installed: isRainbowWalletInstalled,
      color: 'from-blue-500 to-purple-600',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/20',
      hoverBorderColor: 'hover:border-blue-500/40',
      features: ['Mobile First', 'NFT Gallery', 'DeFi Ready'],
      installUrl: 'https://rainbow.me/'
    },
    {
      id: 'coinbase',
      name: 'Coinbase Wallet',
      description: 'Your gateway to web3 with easy setup',
      icon: '/wallet-logos/coinbase.svg',
      installed: true,
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-600/10',
      borderColor: 'border-blue-600/20',
      hoverBorderColor: 'hover:border-blue-600/40',
      features: ['Easy Setup', 'Multi-chain', 'DApp Browser'],
      installUrl: 'https://www.coinbase.com/wallet'
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      description: 'Connect any wallet via QR code scanning',
      icon: '/wallet-logos/WalletConnect-icon.svg',
      installed: true,
      color: 'from-indigo-600 to-purple-600',
      bgColor: 'bg-indigo-600/10',
      borderColor: 'border-indigo-600/20',
      hoverBorderColor: 'hover:border-indigo-600/40',
      features: ['Universal', 'Secure', 'Multi-platform'],
      installUrl: 'https://walletconnect.com/'
    }
  ];

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

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

  const handleInstall = (installUrl: string) => {
    window.open(installUrl, '_blank', 'noopener,noreferrer');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="wallet-modal-title"
    >
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      
      <div 
        ref={modalRef}
        className="relative w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden focus:outline-none"
        tabIndex={-1}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <h2 id="wallet-modal-title" className="text-xl font-bold text-gray-900 dark:text-white">
                Connect Wallet
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Choose a wallet to connect to the platform
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Wallet Options */}
        <div className="p-6 space-y-3 max-h-[60vh] overflow-y-auto">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className={`
                relative group rounded-xl border-2 transition-all duration-200
                ${selectedWallet === wallet.id 
                  ? 'border-purple-500 bg-purple-500/5' 
                  : `${wallet.borderColor} ${wallet.hoverBorderColor} ${wallet.bgColor} hover:shadow-lg`
                }
              `}
              onMouseEnter={() => setHoveredWallet(wallet.id)}
              onMouseLeave={() => setHoveredWallet(null)}
              onClick={() => wallet.installed ? handleWalletConnect(wallet.id) : handleInstall(wallet.installUrl)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  wallet.installed ? handleWalletConnect(wallet.id) : handleInstall(wallet.installUrl);
                }
              }}
              aria-label={`Connect ${wallet.name} wallet`}
            >
              <div className="p-4">
                <div className="flex items-start gap-4">
                  {/* Wallet Icon */}
                  <div className={`
                    w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0
                    bg-gradient-to-br ${wallet.color} shadow-md
                  `}>
                    <img 
                      src={wallet.icon} 
                      alt={`${wallet.name} icon`} 
                      className="w-8 h-8"
                    />
                  </div>

                  {/* Wallet Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {wallet.name}
                      </h3>
                      {wallet.installed && (
                        <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs rounded-full">
                          Ready
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {wallet.description}
                    </p>
                    
                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5">
                      {wallet.features.slice(0, 3).map((feature, index) => (
                        <span 
                          key={index}
                          className="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flexI have reviewed the current implementation of the 'Select Wallet' modal in `EnhancedWalletModal.tsx`. It already has a nice structure with wallet options, icons, descriptions, and some visual effects.

Information gathered:
- The modal uses a dark theme with gradients and some transparency.
- Wallet icons are shown inside colored gradient boxes with shadows.
- Wallet options highlight on hover and when selected.
- There is a benefits section with icons and text.
- The footer shows connection status and security info.
- The icons for wallets are images with fixed size 40x40 px inside a 64x64 px container.
- Text colors are mostly white or gray with some accent colors.
- The modal container has rounded corners and a border with shadow.

Plan to improve visibility, accessibility, and usability:
- Increase icon size and make icons sharper or use SVGs if possible for better clarity.
- Improve contrast by adjusting background overlays or text colors for better readability.
- Add focus styles for keyboard accessibility on wallet options.
- Rearrange wallet options for a more intuitive layout, e.g., grid or cards with clear separation.
- Add clearer visual feedback on selection and hover states with stronger highlights or animations.
- Possibly add labels or tooltips for wallet features for better clarity.
- Ensure the modal is responsive and easy to navigate on different screen sizes.
- Improve button sizes and spacing for easier clicking/tapping.
- Add ARIA attributes for accessibility.

Dependent files:
- Possibly `src/index.css` or Tailwind config for color adjustments.
- Wallet icon files in `public/wallet-logos/` if icon quality needs improvement.

Follow-up steps:
- Confirm the plan with you.
- Implement the UI/UX improvements in `EnhancedWalletModal.tsx` and related styles.
- Test the modal for visual clarity, accessibility, and usability.

<ask_followup_question>
<question>Do you approve this plan for improving the 'Select Wallet' modal? Would you like me to proceed with these specific improvements or add anything else?</question>
</ask_followup_question>
