import React, { useState } from 'react';
import { MapPin, Home, CreditCard, Lock, Plus, Info } from 'lucide-react';
import { CartItem } from '../types';

interface CheckoutSectionProps {
  cartItems: CartItem[];
  subtotal: number;
  pointsDiscount: number;
  couponDiscount: number;
  userAddress: string;
  onUpdateAddress: (newAddress: string) => void;
  onConfirmOrder: (orderData: {
    deliveryType: 'delivery' | 'pickup';
    address: string;
    instructions: string;
    paymentMethod: 'visa' | 'mastercard';
    total: number;
  }) => void;
}

export default function CheckoutSection({
  cartItems,
  subtotal,
  pointsDiscount,
  couponDiscount,
  userAddress,
  onUpdateAddress,
  onConfirmOrder
}: CheckoutSectionProps) {

  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [paymentMethod, setPaymentMethod] = useState<'visa' | 'mastercard'>('visa');
  const [instructions, setInstructions] = useState('');
  const [isChangingAddress, setIsChangingAddress] = useState(false);
  const [tempAddress, setTempAddress] = useState(userAddress);

  // Recalculate totals
  const deliveryFee = deliveryType === 'delivery' ? 3.50 : 0.00;
  const finalTotal = Math.max(0, subtotal + deliveryFee - pointsDiscount - couponDiscount);

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (tempAddress.trim() === '') return;
    onUpdateAddress(tempAddress);
    setIsChangingAddress(false);
  };

  const handleConfirmOrder = () => {
    onConfirmOrder({
      deliveryType,
      address: deliveryType === 'delivery' ? userAddress : 'Recoger en Sucursal Central (Via Roma 42, Roma)',
      instructions,
      paymentMethod,
      total: finalTotal
    });
  };

  return (
    <div className="w-full max-w-[800px] mx-auto space-y-6 pb-24 md:pb-6 relative z-10">
      
      {/* Segmented Control Selector: Delivery vs Pickup */}
      <div className="bg-gray-100 p-1 rounded-full flex relative shadow-3xs">
        <div 
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] bg-white rounded-full shadow-sm transition-all duration-300 ease-out"
          style={{
            transform: deliveryType === 'pickup' ? 'translateX(100%)' : 'translateX(0)'
          }}
        />
        <button 
          onClick={() => setDeliveryType('delivery')}
          className={`flex-1 py-3 text-center relative z-10 font-sans font-bold text-xs tracking-wide transition-colors duration-200 cursor-pointer ${
            deliveryType === 'delivery' ? 'text-gray-900' : 'text-gray-500'
          }`}
        >
          Delivery
        </button>
        <button 
          onClick={() => setDeliveryType('pickup')}
          className={`flex-1 py-3 text-center relative z-10 font-sans font-bold text-xs tracking-wide transition-colors duration-200 cursor-pointer ${
            deliveryType === 'pickup' ? 'text-gray-900' : 'text-gray-500'
          }`}
        >
          Pick-up
        </button>
      </div>

      {/* Delivery Address Details */}
      {deliveryType === 'delivery' ? (
        <section className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="font-display font-semibold text-base text-gray-900">Delivery Address</h2>
            <button 
              onClick={() => setIsChangingAddress(true)}
              className="text-[#af101a] font-sans font-bold text-xs tracking-wider uppercase hover:underline cursor-pointer"
            >
              Change
            </button>
          </div>

          {/* Interactive address field modal simulation */}
          {isChangingAddress ? (
            <form onSubmit={handleSaveAddress} className="bg-gray-50 p-4 rounded-xl space-y-3">
              <span className="block font-display text-xs font-bold text-gray-700">Editar Dirección</span>
              <input 
                type="text"
                value={tempAddress}
                onChange={(e) => setTempAddress(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-[#af101a]"
                placeholder="Ingresa tu dirección"
                required
              />
              <div className="flex gap-2">
                <button 
                  type="submit"
                  className="bg-[#af101a] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90"
                >
                  Guardar
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setTempAddress(userAddress);
                    setIsChangingAddress(false);
                  }}
                  className="bg-gray-200 text-gray-700 text-xs font-semibold px-4 py-2 rounded-lg"
                >
                  Cancelar
                </button>
              </div>
            </form>
          ) : (
            <>
              {/* Map Preview Image */}
              <div className="w-full h-[120px] rounded-xl overflow-hidden relative shadow-sm border border-gray-100">
                <img 
                  alt="Vista del mapa" 
                  className="w-full h-full object-cover grayscale opacity-80" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUBkE2DAQpTriZx092QzXgk7trYM9szTaKGGzEMLN5_tBaDvk6LsxAtNdhzNTCGmBL6c202G7tdSO4MO0soAvDqWFF7q8LrF7frclXsBXmoUdkjSWQOa2ug8-tbemh-7Nz8KIyy4FqPgf0cl2Xl0IA-pvPhZH_KmU32nFySoVXtWpw_uqnk3-8aQju3_1CyT8n2lhe4LLnpEirWnySj19P6klSTiitXLZjnZPWOCaSxu4Kkiq2v-RRhFVSzpXrcFAeS5526KeSg7pm" 
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute -inset-4 bg-[#af101a]/20 rounded-full animate-pulse-ring shrink-0"></div>
                    <MapPin className="text-[#af101a] drop-shadow-md relative z-10" size={32} />
                  </div>
                </div>
              </div>

              {/* Address descriptions */}
              <div className="flex items-start gap-3 mt-1">
                <div className="bg-red-50 text-[#af101a] p-2 rounded-lg shrink-0 mt-0.5">
                  <Home size={18} />
                </div>
                <div>
                  <p className="font-sans font-bold text-sm text-gray-800">{userAddress}</p>
                  <p className="font-sans text-xs text-gray-400">Roma, Italia</p>
                </div>
              </div>
            </>
          )}

          {/* Delivery instructions */}
          <div className="mt-2">
            <input 
              type="text" 
              placeholder="Añadir instrucciones de entrega (ej: tocar el timbre dos veces)" 
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-sans text-xs text-gray-800 placeholder:text-gray-400 focus:border-[#af101a] focus:ring-0 outline-none transition-all"
            />
          </div>
        </section>
      ) : (
        // Pickup Address detail
        <section className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
          <h2 className="font-display font-semibold text-base text-gray-900">Recogida en Tienda</h2>
          <div className="bg-amber-50 rounded-xl p-4 flex items-start gap-3">
            <Info className="text-amber-800 shrink-0 mt-0.5" size={18} />
            <div className="space-y-1">
              <span className="block font-display text-xs font-bold text-amber-900">Pizza Prime Central</span>
              <p className="font-sans text-xs text-amber-800">
                Tu pedido estará disponible para su recogida en 15 a 20 minutos en: <strong className="text-amber-950">Via Roma 42, Roma, Italia.</strong>
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Payment methods */}
      <section className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h2 className="font-display font-semibold text-base text-gray-900">Payment Method</h2>
          <button 
            onClick={() => alert("Simulación: Para añadir nuevas tarjetas, conéctate con la pasarela de pagos segura en producción.")}
            className="text-[#af101a] font-sans font-bold text-xs tracking-wider uppercase hover:underline flex items-center gap-1 cursor-pointer"
          >
            <Plus size={14} /> Add New
          </button>
        </div>

        <div className="flex flex-col gap-3">
          {/* Card 1 */}
          <label 
            className={`relative flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
              paymentMethod === 'visa' 
                ? 'border-[#af101a] bg-red-50/20' 
                : 'border-gray-100 hover:bg-gray-50'
            }`}
          >
            <input 
              type="radio" 
              name="payment"
              checked={paymentMethod === 'visa'}
              onChange={() => setPaymentMethod('visa')}
              className="absolute opacity-0 w-0 h-0"
            />
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                <CreditCard className="text-gray-500" size={18} />
              </div>
              <div>
                <p className="font-sans text-sm font-bold text-gray-800">Visa ending in 4242</p>
                <p className="font-sans text-xs text-gray-400">Exp. 12/25</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
              paymentMethod === 'visa' ? 'border-[#af101a] bg-[#af101a] text-white' : 'border-gray-300'
            }`}>
              {paymentMethod === 'visa' && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </label>

          {/* Card 2 */}
          <label 
            className={`relative flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
              paymentMethod === 'mastercard' 
                ? 'border-[#af101a] bg-red-50/20' 
                : 'border-gray-100 hover:bg-gray-50'
            }`}
          >
            <input 
              type="radio" 
              name="payment"
              checked={paymentMethod === 'mastercard'}
              onChange={() => setPaymentMethod('mastercard')}
              className="absolute opacity-0 w-0 h-0"
            />
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                <CreditCard className="text-gray-500" size={18} />
              </div>
              <div>
                <p className="font-sans text-sm font-bold text-gray-800">Mastercard ending in 8899</p>
                <p className="font-sans text-xs text-gray-400">Exp. 08/26</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
              paymentMethod === 'mastercard' ? 'border-[#af101a] bg-[#af101a] text-white' : 'border-gray-300'
            }`}>
              {paymentMethod === 'mastercard' && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </label>
        </div>
      </section>

      {/* Order Summary details */}
      <section className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm flex flex-col gap-4">
        <h2 className="font-display font-semibold text-base text-gray-900">Order Summary</h2>
        
        <div className="flex flex-col gap-3 font-sans text-sm text-gray-600 border-b border-gray-100 pb-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between items-start">
              <div className="flex gap-2.5 items-center">
                <span className="font-display text-xs font-bold bg-gray-100 text-gray-800 px-2 py-0.5 rounded">
                  {item.quantity}x
                </span>
                <p className="text-gray-800 font-semibold">{item.pizza.name}</p>
              </div>
              <span className="font-semibold text-gray-800">${item.totalPrice.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="space-y-2 text-sm font-sans text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Costo de envío</span>
            <span>${deliveryFee.toFixed(2)}</span>
          </div>
          {pointsDiscount > 0 && (
            <div className="flex justify-between text-[#735c00]">
              <span>Descuento de puntos</span>
              <span>-${pointsDiscount.toFixed(2)}</span>
            </div>
          )}
          {couponDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Descuento de cupón</span>
              <span>-${couponDiscount.toFixed(2)}</span>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center font-display font-bold text-lg text-gray-900 border-t border-gray-100 pt-4">
          <p>Total</p>
          <p className="text-[#af101a] font-extrabold text-2xl">${finalTotal.toFixed(2)}</p>
        </div>
      </section>

      {/* Sticky Bottom Actions inside Checkout */}
      <div className="fixed sm:absolute bottom-0 left-0 w-full bg-white border-t border-gray-100 p-4 z-40 pb-safe-bottom flex flex-col items-center">
        <button 
          onClick={handleConfirmOrder}
          className="w-full max-w-[700px] bg-[#af101a] hover:bg-[#ba1a20] text-white h-[56px] rounded-full font-sans font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:opacity-90 active:scale-95 transition-all cursor-pointer"
        >
          <Lock size={16} />
          <span>Confirmar Pedido - ${finalTotal.toFixed(2)}</span>
        </button>
        <p className="mt-2 font-sans text-[10px] text-gray-400 text-center">
          Al confirmar tu pedido aceptas nuestros Términos de Servicio y Condiciones.
        </p>
      </div>

    </div>
  );
}
