import React, { useState } from 'react';
import { User, Mail, MapPin, Award, History, Settings, ChevronRight, Check } from 'lucide-react';
import { Order } from '../types';

interface ProfileSectionProps {
  userAddress: string;
  onUpdateAddress: (address: string) => void;
  pastOrders: Order[];
  onReorderPastOrder: (order: Order) => void;
}

export default function ProfileSection({ userAddress, onUpdateAddress, pastOrders, onReorderPastOrder }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [addressInput, setAddressInput] = useState(userAddress);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (addressInput.trim() === '') return;
    onUpdateAddress(addressInput);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 pb-12 max-w-[1440px] mx-auto w-full">
      
      {/* Profile summary card */}
      <section className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-red-50 text-[#af101a] flex items-center justify-center border-2 border-red-100 shadow-inner shrink-0 relative">
          <User size={36} />
          <div className="absolute -bottom-1 -right-1 bg-[#cca730] text-[#241a00] p-1 rounded-full shadow-sm" title="Miembro Oro">
            <Award size={14} />
          </div>
        </div>

        <div className="text-center md:text-left flex-grow space-y-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2">
            <h2 className="font-display font-bold text-xl text-gray-900">Benjamín Astroza</h2>
            <span className="inline-block bg-amber-100 text-amber-900 text-[10px] font-display font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider self-center">
              Miembro Oro
            </span>
          </div>
          <p className="font-sans text-xs text-gray-400 flex items-center justify-center md:justify-start gap-1">
            <Mail size={12} />
            <span>benjiastroza@gmail.com</span>
          </p>
          <p className="font-sans text-xs text-gray-500 flex items-center justify-center md:justify-start gap-1">
            <MapPin size={12} className="text-[#af101a]" />
            <span>{userAddress}</span>
          </p>
        </div>
      </section>

      {/* Edit default address form */}
      <section className="bg-white border border-gray-100 rounded-[24px] p-6 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-display font-semibold text-base text-gray-900 flex items-center gap-2">
            <Settings size={18} className="text-gray-400" />
            <span>Configuración de cuenta</span>
          </h3>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-3">
            <label className="block font-sans text-xs text-gray-500">Dirección de Entrega Predeterminada</label>
            <div className="flex gap-2">
              <input 
                type="text"
                value={addressInput}
                onChange={(e) => setAddressInput(e.target.value)}
                className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#af101a] focus:bg-white"
                required
              />
              <button 
                type="submit"
                className="bg-[#af101a] text-white font-sans font-semibold text-xs px-4 rounded-xl hover:bg-[#ba1a20] transition-colors cursor-pointer"
              >
                Guardar
              </button>
            </div>
          </form>
        ) : (
          <div 
            onClick={() => setIsEditing(true)}
            className="flex justify-between items-center bg-gray-50 rounded-xl p-4 cursor-pointer hover:bg-gray-100/50 transition-colors"
          >
            <div>
              <span className="block font-display text-xs font-bold text-gray-700">Editar dirección de entrega</span>
              <span className="block font-sans text-xs text-gray-400 mt-0.5">{userAddress}</span>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>
        )}
      </section>

      {/* History Purchases / Past orders */}
      <section className="space-y-4">
        <h3 className="font-display font-semibold text-base text-gray-900 flex items-center gap-2">
          <History size={18} className="text-gray-400" />
          <span>Historial de Pedidos</span>
        </h3>

        {pastOrders.length === 0 ? (
          <div className="text-center py-8 bg-white rounded-[24px] border border-gray-100 p-6">
            <p className="font-sans text-xs text-gray-400">Aún no has realizado pedidos previos. ¡Ordena tu primera pizza hoy!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {pastOrders.map((ord) => (
              <div 
                key={ord.id}
                className="bg-white rounded-2xl border border-gray-100 p-5 shadow-2xs flex flex-col md:flex-row justify-between md:items-center gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2.5">
                    <span className="font-display text-xs font-black text-gray-800">Orden {ord.id}</span>
                    <span className="bg-green-50 text-green-800 text-[10px] font-sans font-bold px-2 rounded-full border border-green-100 flex items-center gap-1">
                      <Check size={10} strokeWidth={3} /> Entregado
                    </span>
                  </div>
                  
                  <div className="font-sans text-xs text-gray-600">
                    {ord.items.map((item, idx) => (
                      <span key={item.id}>
                        {idx > 0 && ', '}
                        {item.quantity}x {item.pizza.name} ({item.customization ? item.customization.size : 'M'})
                      </span>
                    ))}
                  </div>

                  <span className="block text-[10px] text-gray-400">{ord.timestamp}</span>
                </div>

                <div className="flex md:flex-col justify-between md:text-right items-center md:items-end border-t md:border-t-0 border-gray-100 pt-3 md:pt-0">
                  <div>
                    <span className="font-sans text-xs text-gray-400">Total cancelado</span>
                    <span className="block font-display font-extrabold text-lg text-[#af101a]">${ord.total.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => onReorderPastOrder(ord)}
                    className="mt-0 md:mt-3 h-9 px-4 rounded-full bg-[#af101a] text-white font-sans font-bold text-xs hover:bg-[#ba1a20] transition-colors cursor-pointer"
                  >
                    Pedir nuevamente
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
}
