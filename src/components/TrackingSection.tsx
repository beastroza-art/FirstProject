import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Bike, Home, Store, MessageSquare, ClipboardList, Star, X, Sparkles, Flame } from 'lucide-react';
import { Order } from '../types';

interface TrackingSectionProps {
  order: Order | null;
  onGoBack: () => void;
}

export default function TrackingSection({ order, onGoBack }: TrackingSectionProps) {
  const [manualStatus, setManualStatus] = useState<Order['status'] | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'courier', text: string, time: string }>>([
    { sender: 'courier', text: '¡Hola! Estoy recogiendo tu orden gourmet de Pizza Prime. Saldré en unos minutos.', time: '20:30' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const currentStatus = manualStatus ?? order?.status ?? 'preparing';
  const estimatedMinutesByStatus: Record<Order['status'], number> = {
    received: 22,
    preparing: 18,
    in_oven: 12,
    on_delivery: 7,
    delivered: 0
  };
  const estimatedMinutes = estimatedMinutesByStatus[currentStatus];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const userMsg = {
      sender: 'user' as const,
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setNewMessage('');

    // Simulate Courier fast response
    setTimeout(() => {
      const courierAnswers = [
        "¡Excelente, voy en camino! Debería llegar pronto.",
        "Entendido. Te aviso cuando esté afuera.",
        "¡Todo listo! Estoy doblando la esquina.",
        "Perfecto, muchas gracias por tu paciencia."
      ];
      const randomAnswer = courierAnswers[Math.floor(Math.random() * courierAnswers.length)];
      
      setChatMessages(prev => [...prev, {
        sender: 'courier',
        text: randomAnswer,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  // Status mapping
  const statuses = [
    { id: 'received', label: 'Pedido recibido', icon: ClipboardList },
    { id: 'preparing', label: 'Preparando', icon: Sparkles },
    { id: 'in_oven', label: 'En horno', icon: Flame },
    { id: 'on_delivery', label: 'En reparto', icon: Bike },
    { id: 'delivered', label: 'Entregado', icon: Home }
  ] as const;

  const activeIndex = statuses.findIndex(s => s.id === currentStatus);

  // Manual status simulations for user plays!
  const handleAdvanceStatus = () => {
    if (currentStatus === 'received') setManualStatus('preparing');
    else if (currentStatus === 'preparing') setManualStatus('in_oven');
    else if (currentStatus === 'in_oven') setManualStatus('on_delivery');
    else if (currentStatus === 'on_delivery') setManualStatus('delivered');
    else setManualStatus('received');
  };

  return (
    <div className="w-full relative h-[calc(100vh-3.5rem)] overflow-hidden rounded-3xl border border-gray-100 flex flex-col">
      
      {/* Map Area Component */}
      <div className="absolute inset-0 z-0 bg-gray-100">
        <div 
          className="w-full h-full grayscale opacity-90 filter brightness-95"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXu0zJ5LChi1kjlmqJnuRQ4nzkTRXjp_WcISoKhVvRM-1gS7eQQULtHjuaC-FyMrCgAkd1VZtBZ-CZKAYNpucqfO7rcOQW_2K-I_2Cr5j76xsqPQTmwvifWH4vvgJlkfyRFgvvmdqqZ556fOvTePYxtnW7D0Z06PnsftW5LWhf13ZpM3yVIbeX2nXAf3U-8lcBd1jfeX6F7Ie05HrEr4RgEL3_brinudAdhHW4HWHwFIRhP-rxUakShlAwdxy39rN6rnLkf4laHIvIwC')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Pizza Store Location Marker */}
          <div className="absolute top-[35%] left-[28%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="bg-white rounded-full p-2.5 shadow-md border-2 border-red-500 hover:scale-105 transition-transform">
              <Store className="text-[#af101a]" size={20} />
            </div>
            <div className="h-4 w-0.5 bg-[#af101a]"></div>
          </div>

          {/* Courier Position Marker */}
          <div 
            className="absolute z-20 transition-all duration-1000 ease-in-out"
            style={{
              top: currentStatus === 'received' ? '35%' : currentStatus === 'preparing' ? '42%' : currentStatus === 'in_oven' ? '48%' : currentStatus === 'on_delivery' ? '58%' : '72%',
              left: currentStatus === 'received' ? '28%' : currentStatus === 'preparing' ? '36%' : currentStatus === 'in_oven' ? '44%' : currentStatus === 'on_delivery' ? '54%' : '66%'
            }}
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-[#af101a]/20 rounded-full animate-pulse"></div>
              <div className="bg-[#af101a] text-white rounded-full p-2.5 shadow-lg flex items-center justify-center relative z-10">
                <Bike size={20} />
              </div>
            </div>
          </div>

          {/* User Location Marker */}
          <div className="absolute top-[72%] left-[66%] -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="bg-white rounded-full p-2.5 shadow-md border-2 border-gray-900">
              <MapPin className="text-gray-900" size={20} />
            </div>
            <div className="h-4 w-0.5 bg-gray-900"></div>
          </div>
        </div>

        {/* Top Floating Simulator Trigger */}
        <div className="absolute top-4 left-4 z-40">
          <button 
            onClick={handleAdvanceStatus}
            className="bg-white/90 backdrop-blur-md hover:bg-white text-[11px] font-display font-black text-gray-800 border border-gray-200 shadow-sm px-3.5 py-2 rounded-full cursor-pointer flex items-center gap-1.5 active:scale-95 transition-transform"
          >
            <span>Simular Estado 🚀</span>
          </button>
        </div>
      </div>

      {/* Bottom Tracking Process Card sheet */}
      <div className="absolute bottom-0 left-0 w-full z-30 bg-white rounded-t-[32px] shadow-[0px_-8px_30px_rgba(0,0,0,0.08)] border-t border-gray-100 flex flex-col max-h-[750px]">
        
        {/* Handle bar */}
        <div className="w-full flex justify-center pt-4 pb-2">
          <div className="w-12 h-1 bg-gray-200 rounded-full" />
        </div>

        <div className="p-6 space-y-6">
          
          {/* Time Estimate header */}
          <div className="text-center space-y-1">
            <span className="font-display font-extrabold text-2xl md:text-3xl text-gray-900">
              {currentStatus === 'delivered' ? '¡Pedido Entregado!' : `Tu pedido llegará en ${estimatedMinutes} minutos`}
            </span>
            <p className="font-sans text-xs text-gray-500">
              {currentStatus === 'delivered' ? 'Disfruta tu deliciosa orden gourmet' : statuses[activeIndex]?.label}
            </p>
          </div>

          {/* Step Progress indicators */}
          <div className="relative px-2">
            {/* Gray Background Line */}
            <div className="absolute top-[15px] left-6 right-6 h-[3px] bg-gray-100 rounded-full z-0" />
            
            {/* Active Red progress line */}
            <div 
              className="absolute top-[15px] left-6 h-[3px] bg-[#af101a] rounded-full z-0 transition-all duration-1000 ease-out" 
              style={{
                width: `${(activeIndex / (statuses.length - 1)) * 92}%`
              }}
            />

            <div className="flex justify-between relative z-10 text-center">
              {statuses.map((step, idx) => {
                const isStepActive = idx <= activeIndex;
                const isStepCurrent = idx === activeIndex;
                const StepIcon = step.icon;

                return (
                  <div key={step.id} className="flex flex-col items-center w-14">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-all duration-300 ${
                        isStepCurrent 
                          ? 'bg-[#af101a] text-white ring-4 ring-red-100 scale-110' 
                          : isStepActive 
                            ? 'bg-[#af101a] text-white' 
                            : 'bg-white border-2 border-gray-200 text-gray-400'
                      }`}
                    >
                      <StepIcon size={14} />
                    </div>
                    
                    <span className={`mt-2 font-display text-[10px] font-bold leading-tight ${isStepCurrent ? 'text-[#af101a]' : isStepActive ? 'text-gray-700' : 'text-gray-400'}`}>
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="h-4" /> {/* spacer for absolute labels */}
          </div>

          {/* Courier Card detail */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 relative border border-gray-200 shrink-0">
                <img 
                  alt="Carlos M." 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj4whwHFscCsUpYzdicVIoxcMzkiBMP0kZV6yBCuFWNN3s_DxUzmah1o8wnfxEnSTnDl5ENJfayPJX2CmrwW1FpI2bg1GroitaZ_-BKx5hrm_xc1HslUJ7lZag2JqoksTD0rytE69pghLHElHyptpcuCuWcefhBBrpz9xibRWla5tfXNFDF9jYB2HxHOD__9kwZPoLaxze62M7b7DPGs_8b6WNrBv2Xzl4cmItNllXH39l19dlmMGqcslkoev25FMHsl7DP1sPxK2" 
                />
              </div>
              <div className="space-y-0.5">
                <h3 className="font-display font-bold text-sm text-gray-900">Carlos M.</h3>
                <div className="flex items-center gap-1">
                  <Star fill="#cca730" stroke="#cca730" size={12} />
                  <span className="font-sans text-[11px] text-gray-500 font-semibold">4.9 · 120 entregas</span>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setIsChatOpen(true)}
              className="w-11 h-11 bg-white hover:bg-gray-100 text-[#af101a] border border-gray-100 rounded-full flex items-center justify-center transition-colors active:scale-95 shadow-3xs cursor-pointer"
              aria-label="Abrir Chat"
            >
              <MessageSquare size={18} />
            </button>
          </div>

          {/* Actions grid list */}
          <div className="flex gap-3">
            <button 
              onClick={() => setIsDetailOpen(true)}
              className="flex-1 bg-gray-50 border border-gray-100 text-gray-700 hover:text-black hover:bg-gray-100 h-14 rounded-full font-sans font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer transition-colors active:scale-[0.98]"
            >
              <ClipboardList size={16} />
              <span>Ver detalles</span>
            </button>
            <button 
              onClick={onGoBack}
              className="flex-1 bg-[#af101a] hover:bg-[#ba1a20] text-white h-14 rounded-full font-sans font-semibold text-sm flex items-center justify-center shadow-md cursor-pointer transition-colors active:scale-[0.98]"
            >
              <span>Volver a Inicio</span>
            </button>
          </div>

        </div>
      </div>

      {/* Orders Item modal dialog */}
      {isDetailOpen && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 shadow-2xl border border-gray-100 space-y-4"
          >
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="font-display font-bold text-lg text-gray-900">Detalles de la Orden</h3>
              <button 
                onClick={() => setIsDetailOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:bg-gray-50 hover:text-gray-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 max-h-[300px] overflow-y-auto no-scrollbar pr-1">
              <span className="block font-sans text-xs font-bold text-gray-400 tracking-wider">PRODUCTOS</span>
              
              {order ? (
                order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-xs font-bold text-gray-800 bg-gray-100 px-2 py-0.5 rounded">
                        {item.quantity}x
                      </span>
                      <div>
                        <p className="font-sans text-xs font-semibold text-gray-900">{item.pizza.name}</p>
                        <p className="font-sans text-[10px] text-gray-400">
                          {item.customization ? `${item.customization.size}, ${item.customization.crust}` : 'Mediana, Tradicional'}
                        </p>
                      </div>
                    </div>
                    <span className="font-display text-xs font-bold text-gray-800">${item.totalPrice.toFixed(2)}</span>
                  </div>
                ))
              ) : (
                <div className="flex justify-between items-center">
                  <div className="flex gap-2 items-center">
                    <span className="bg-gray-100 text-xs text-gray-700 px-2 py-0.5 rounded">1x</span>
                    <p className="text-xs">Pizza Prime Special (Mediana, Tradicional)</p>
                  </div>
                  <span className="text-xs font-bold">$24.99</span>
                </div>
              )}

              <hr className="border-gray-50" />

              <div className="text-xs font-sans text-gray-500 space-y-1.5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${order ? order.subtotal.toFixed(2) : '24.99'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Costo de envío</span>
                  <span>${order ? order.deliveryFee.toFixed(2) : '3.50'}</span>
                </div>
                {order && order.pointsDiscount > 0 && (
                  <div className="flex justify-between text-[#735c00]">
                    <span>Descuento de puntos</span>
                    <span>-${order.pointsDiscount.toFixed(2)}</span>
                  </div>
                )}
                {order && order.couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Descuento de cupón</span>
                    <span>-${order.couponDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
              <span className="font-display text-sm font-semibold text-gray-900">Total cancelado</span>
              <span className="font-display font-extrabold text-xl text-[#af101a]">
                ${order ? order.total.toFixed(2) : '28.49'}
              </span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Interactive Support chat modal dialog */}
      {isChatOpen && (
        <div className="absolute inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md h-[450px] bg-white rounded-t-3xl sm:rounded-3xl flex flex-col shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Chat header */}
            <div className="bg-[#af101a] p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcj4whwHFscCsUpYzdicVIoxcMzkiBMP0kZV6yBCuFWNN3s_DxUzmah1o8wnfxEnSTnDl5ENJfayPJX2CmrwW1FpI2bg1GroitaZ_-BKx5hrm_xc1HslUJ7lZag2JqoksTD0rytE69pghLHElHyptpcuCuWcefhBBrpz9xibRWla5tfXNFDF9jYB2HxHOD__9kwZPoLaxze62M7b7DPGs_8b6WNrBv2Xzl4cmItNllXH39l19dlmMGqcslkoev25FMHsl7DP1sPxK2" alt="Carlos" className="w-full h-full object-cover" />
                </div>
                <div>
                  <span className="block font-display text-xs font-bold leading-tight">Chat de Soporte</span>
                  <span className="text-[10px] text-red-100">Carlos M. - Repartidor Prime</span>
                </div>
              </div>
              <button 
                onClick={() => setIsChatOpen(false)}
                className="text-white hover:bg-white/10 p-1.5 rounded-full cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-4 overflow-y-auto space-y-3 bg-gray-50 hide-scrollbar scroll-smooth">
              {chatMessages.map((msg, idx) => {
                const isUser = msg.sender === 'user';
                return (
                  <div key={idx} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[75%] rounded-2xl p-3 shadow-2xs font-sans text-xs ${
                      isUser ? 'bg-[#af101a] text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none'
                    }`}>
                      <p>{msg.text}</p>
                      <span className={`block text-[9px] text-right mt-1 ${isUser ? 'text-red-200' : 'text-gray-400'}`}>
                        {msg.time}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Send panel */}
            <form onSubmit={handleSendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                placeholder="Escribe un mensaje..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#af101a]"
              />
              <button 
                type="submit"
                className="bg-[#af101a] text-white text-xs font-semibold px-4 rounded-xl hover:opacity-90 cursor-pointer"
              >
                Enviar
              </button>
            </form>

          </motion.div>
        </div>
      )}

    </div>
  );
}
