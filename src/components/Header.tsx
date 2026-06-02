import React from 'react';
import { MapPin, ShoppingBag, ArrowLeft, HelpCircle } from 'lucide-react';

interface HeaderProps {
  currentScreen: string;
  cartCount: number;
  onNavigate: (screen: string) => void;
  onGoBack: () => void;
  userAddress: string;
  onSelectAddress?: () => void;
}

export default function Header({
  currentScreen,
  cartCount,
  onNavigate,
  onGoBack,
  userAddress,
  onSelectAddress
}: HeaderProps) {
  if (currentScreen === 'splash') return null;

  // For detail screen, we use floating actions implemented within DetailSection itself
  if (currentScreen === 'detail') return null;

  // Define layout based on the active screen
  const isMainTab = ['home', 'menu', 'rewards', 'profile'].includes(currentScreen);

  return (
    <header className="fixed top-0 left-0 w-full h-14 bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 flex items-center px-4 md:px-8 shadow-sm">
      <div className="flex justify-between items-center w-full max-w-[1440px] mx-auto">
        
        {/* Left Action */}
        <div className="w-10 flex justify-start">
          {isMainTab ? (
            <button
              onClick={onSelectAddress}
              aria-label="Ubicación"
              className="text-[#af101a] hover:opacity-80 transition-opacity active:scale-95 duration-150 flex items-center gap-1 cursor-pointer"
            >
              <MapPin size={24} className="shrink-0" />
            </button>
          ) : (
            <button
              onClick={onGoBack}
              aria-label="Volver"
              className="text-gray-700 hover:text-[#af101a] hover:opacity-80 transition-opacity active:scale-95 duration-150 cursor-pointer"
            >
              <ArrowLeft size={24} />
            </button>
          )}
        </div>

        {/* Center Title */}
        <div className="flex-1 text-center select-none">
          <h1 
            onClick={() => onNavigate('home')}
            className="font-display font-bold text-lg md:text-xl tracking-tighter text-[#af101a] cursor-pointer inline-block"
          >
            {currentScreen === 'checkout' ? 'CHECKOUT' : 'PIZZA PRIME'}
          </h1>
          
          {/* Subtle address highlight on main screen for desktop */}
          {isMainTab && (
            <span className="hidden md:ml-3 md:inline-block font-sans text-xs text-gray-500 bg-gray-50 px-2.5 py-1 rounded-full border border-gray-100">
              Entrega en: <strong className="text-gray-700">{userAddress}</strong>
            </span>
          )}
        </div>

        {/* Right Action */}
        <div className="w-10 flex justify-end">
          {currentScreen === 'tracking' ? (
            <button
              aria-label="Ayuda"
              className="text-[#af101a] hover:opacity-80 active:scale-95 transition-transform cursor-pointer"
              onClick={() => alert("Asistencia Pizza Prime: Llámanos al +1 800-PIZZA-PRIME o escribe al chat de soporte.")}
            >
              <HelpCircle size={24} />
            </button>
          ) : currentScreen === 'checkout' ? (
            <div className="w-6" /> // spacer
          ) : (
            <button
              onClick={() => onNavigate('cart')}
              aria-label="Ver carrito"
              className="text-[#af101a] hover:opacity-80 transition-opacity active:scale-95 transition-transform duration-150 relative cursor-pointer"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#ba1a1a] text-white font-display text-[10px] font-bold rounded-full w-4.5 h-4.5 flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>

      </div>
    </header>
  );
}
