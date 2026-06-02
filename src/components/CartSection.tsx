import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, Plus, Minus, Ticket, Award, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartSectionProps {
  cartItems: CartItem[];
  onUpdateQty: (itemId: string, increment: boolean) => void;
  onRemoveItem: (itemId: string) => void;
  onProceedToCheckout: (discountPoints: boolean, couponCode: string) => void;
}

export default function CartSection({
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onProceedToCheckout
}: CartSectionProps) {

  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [usePoints, setUsePoints] = useState(false);
  const [couponError, setCouponError] = useState('');

  // Calculate prices
  const subtotal = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  const deliveryFee = subtotal > 0 ? 3.50 : 0;
  
  // Point values: 400 pts gives $5.00 discount
  const pointsDiscount = usePoints && subtotal >= 5.00 ? 5.00 : 0.00;

  // Coupon premium 20% discount if code is 'PRIME20'
  let couponDiscount = 0;
  if (appliedCoupon.toUpperCase() === 'PRIME20') {
    couponDiscount = parseFloat((subtotal * 0.20).toFixed(2));
  }

  const finalTotal = Math.max(0, subtotal + deliveryFee - pointsDiscount - couponDiscount);

  const handleApplyCoupon = () => {
    if (couponInput.toUpperCase() === 'PRIME20') {
      setAppliedCoupon('PRIME20');
      setCouponError('');
    } else if (couponInput.trim() === '') {
      setCouponError('Por favor ingresa un código.');
    } else {
      setCouponError('Cupón inválido. Prueba con "PRIME20"');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setCouponInput('');
  };

  const handleCheckoutPress = () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío. Agrega una deliciosa pizza para continuar.");
      return;
    }
    onProceedToCheckout(usePoints, appliedCoupon);
  };

  return (
    <div className="space-y-6 pb-20">
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 p-8 space-y-4">
          <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-2">
            <Ticket size={32} />
          </div>
          <h3 className="font-display font-bold text-lg text-gray-800">Tu carrito está vacío</h3>
          <p className="font-sans text-xs text-gray-500 max-w-xs mx-auto">
            ¡Explora nuestro menú y añade tus sabores preferidos para comenzar tu experiencia gourmet!
          </p>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Items List */}
          <div className="flex-grow space-y-4">
            <AnimatePresence mode="popLayout">
              {cartItems.map((item) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.25 }}
                  className="bg-white rounded-2xl border border-gray-100 p-4 shadow-2xs flex items-center gap-4 hover:-translate-y-0.5 transition-transform"
                >
                  <img 
                    alt={item.pizza.name} 
                    className="w-20 h-20 md:w-24 md:h-24 object-cover rounded-lg border border-gray-100" 
                    src={item.pizza.image} 
                  />
                  
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-start">
                      <div className="truncate">
                        <h3 className="font-display font-bold text-sm md:text-base text-gray-900 truncate">
                          {item.pizza.name}
                        </h3>
                        <p className="font-sans text-[11px] text-gray-400 capitalize mt-0.5">
                          {item.customization ? (
                            `Masa ${item.customization.size}, ${item.customization.crust}`
                          ) : (
                            'Mediana, Masa Tradicional'
                          )}
                        </p>
                      </div>
                      <button 
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                        aria-label="Eliminar producto"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <span className="font-display font-extrabold text-sm md:text-base text-gray-900">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                      
                      {/* Qty controller */}
                      <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-100 rounded-full px-2 py-1">
                        <button 
                          onClick={() => onUpdateQty(item.id, false)}
                          className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-gray-600 hover:text-[#af101a] active:scale-90 transition-transform cursor-pointer"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-sans text-xs font-semibold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQty(item.id, true)}
                          className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-gray-600 hover:text-[#af101a] active:scale-90 transition-transform cursor-pointer"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Checkout sidebar */}
          <div className="w-full lg:w-96 space-y-6">
            
            {/* Coupon field */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs space-y-3">
              <h4 className="font-display font-semibold text-xs tracking-wider text-gray-400">CUPÓN DE DESCUENTO</h4>
              
              {appliedCoupon ? (
                <div className="flex justify-between items-center bg-green-50 border border-green-100 rounded-xl p-3">
                  <div>
                    <span className="font-display text-xs font-bold text-green-800">¡Cupón {appliedCoupon} Aplicado!</span>
                    <span className="block text-[10px] text-green-600">20% de descuento Premium</span>
                  </div>
                  <button 
                    onClick={handleRemoveCoupon}
                    className="text-xs font-semibold text-red-500 hover:underline cursor-pointer"
                  >
                    Quitar
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <div className="flex-grow">
                    <input 
                      type="text" 
                      placeholder="Ingresa tu código (ej: PRIME20)" 
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#af101a] focus:ring-0 transition-all font-sans text-xs outline-none"
                    />
                    {couponError && <span className="text-[10px] text-red-500 mt-1 block">{couponError}</span>}
                  </div>
                  <button 
                    onClick={handleApplyCoupon}
                    className="bg-[#cca730] text-[#241a00] font-sans font-bold text-xs px-4 h-[44px] rounded-xl hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-xs whitespace-nowrap"
                  >
                    Aplicar
                  </button>
                </div>
              )}
            </div>

            {/* Loyalty points */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-amber-50 text-[#cca730] rounded-full shrink-0">
                  <Award size={20} />
                </div>
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h4 className="font-display font-semibold text-sm text-gray-900 leading-tight">Tienes 450 puntos Prime</h4>
                  <p className="font-sans text-xs text-gray-500">¿Aplicar 400 puntos para recibir $5.00 de descuento inmediato?</p>
                  
                  <div className="pt-2 flex items-center justify-between">
                    <span className="font-sans text-xs font-bold text-gray-700">Canjear 400 pts</span>
                    
                    {/* Toggle Switch */}
                    <label className="relative inline-flex items-center cursor-pointer select-none">
                      <input 
                        type="checkbox" 
                        checked={usePoints} 
                        onChange={() => setUsePoints(!usePoints)} 
                        className="sr-only peer" 
                        disabled={subtotal < 5.00}
                      />
                      <div className={`w-11 h-6 rounded-full peer transition-all duration-200 outline-none ${
                        usePoints ? 'bg-[#cca730]' : 'bg-gray-200'
                      }`}>
                        <div className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full shadow-xs transition-transform duration-200 ${
                          usePoints ? 'translate-x-[20px]' : 'translate-x-0'
                        }`} />
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Price breakdown */}
            <div className="bg-white rounded-a-xl border border-gray-100 p-5 shadow-2xs rounded-2xl space-y-4">
              <h4 className="font-display font-semibold text-xs tracking-wider text-gray-400">RESUMEN DE ORDEN</h4>
              <div className="space-y-2.5 font-sans text-sm text-gray-600 border-b border-gray-100 pb-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-800">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Costo de envío</span>
                  <span className="font-semibold text-gray-800">${deliveryFee.toFixed(2)}</span>
                </div>
                {pointsDiscount > 0 && (
                  <div className="flex justify-between text-[#735c00] font-medium">
                    <span>Descuento de puntos</span>
                    <span>-${pointsDiscount.toFixed(2)}</span>
                  </div>
                )}
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600 font-medium">
                    <span>Descuento de cupón (20%)</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-display font-semibold text-base text-gray-900">Total</span>
                <span className="font-display font-extrabold text-2xl text-[#af101a]">${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Action purchase */}
            <button 
              onClick={handleCheckoutPress}
              className="w-full bg-[#af101a] hover:bg-[#ba1a20] text-white font-sans font-semibold text-sm h-14 rounded-full flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              <span>Ir a Pagar</span>
              <ArrowRight size={18} />
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
