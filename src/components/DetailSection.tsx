import React, { useState } from 'react';
import { ChefHat, Star, Share2, ArrowLeft, ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';
import { Pizza, PizzaSize, PizzaCustomization, CartItem } from '../types';
import { EXTRAS } from '../data';

interface DetailSectionProps {
  pizza: Pizza;
  onGoBack: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export default function DetailSection({ pizza, onGoBack, onAddToCart }: DetailSectionProps) {
  // Set default pizza customizations
  const [size, setSize] = useState<PizzaSize>('M');
  const [crust, setCrust] = useState<PizzaCustomization['crust']>('Tradicional');
  const [selectedExtras, setSelectedExtras] = useState<string[]>(['ext_queso']); // extra queso checked by default in screen
  const [isNutritionOpen, setIsNutritionOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Helper size prices
  const getSizeDelta = (s: PizzaSize) => {
    switch (s) {
      case 'S': return -2.00;
      case 'M': return 0.00;
      case 'L': return 3.00;
      case 'XL': return 5.50;
      default: return 0.00;
    }
  };

  // Helper crust prices
  const getCrustPrice = (c: PizzaCustomization['crust']) => {
    return c === 'Borde Relleno de Queso' ? 3.00 : 0.00;
  };

  // Calculate customized total price
  const basePrice = pizza.price;
  const sizeDelta = getSizeDelta(size);
  const crustPrice = getCrustPrice(crust);
  const extrasPrice = selectedExtras.reduce((sum, extraId) => {
    const extra = EXTRAS.find(e => e.id === extraId);
    return sum + (extra ? extra.price : 0);
  }, 0);
  const selectedExtraDetails = EXTRAS.filter((extra) => selectedExtras.includes(extra.id));
  const visualToppings = [
    ...(pizza.name.toLowerCase().includes('pepperoni') ? ['Pepperoni'] : []),
    ...selectedExtraDetails.map((extra) => extra.name)
  ];

  const singleItemPrice = basePrice + sizeDelta + crustPrice + extrasPrice;
  const totalPrice = singleItemPrice * quantity;

  // Toggle checks
  const handleToggleExtra = (extraId: string) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) ? prev.filter(id => id !== extraId) : [...prev, extraId]
    );
  };

  // Handle addition
  const handleAddPress = () => {
    const customizableItem: CartItem = {
      id: `${pizza.id}-${size}-${crust}-${selectedExtras.sort().join(',')}-${Date.now()}`,
      pizza,
      customization: {
        size,
        crust,
        extras: selectedExtras
      },
      quantity,
      totalPrice: singleItemPrice * quantity
    };

    onAddToCart(customizableItem);
  };

  return (
    <div className="w-full max-w-[800px] mx-auto bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 pb-24 md:pb-6 relative z-10">
      
      {/* Hero Section Container */}
      <header className="relative w-full h-[280px] sm:h-[350px] overflow-hidden bg-gray-50">
        <img 
          alt={pizza.name} 
          className="w-full h-full object-cover" 
          src={pizza.image} 
        />
        <div className="absolute inset-x-4 bottom-4 z-10 flex flex-wrap gap-2">
          {visualToppings.map((topping) => (
            <span
              key={topping}
              className="bg-white/95 backdrop-blur-md text-gray-900 border border-white/60 rounded-full px-3 py-1 font-display text-[10px] font-black shadow-sm"
            >
              + {topping}
            </span>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent pointer-events-none"></div>
        
        {/* Floating Navigation */}
        <div className="absolute top-4 left-0 w-full px-5 flex justify-between items-center z-10">
          <button 
            onClick={onGoBack}
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Volver"
          >
            <ArrowLeft className="text-gray-800" size={20} />
          </button>
          <button 
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: pizza.name,
                  text: pizza.description,
                  url: window.location.href,
                }).catch(err => console.log(err));
              } else {
                alert(`¡Link de ${pizza.name} compartido con éxito!`);
              }
            }}
            className="w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Compartir"
          >
            <Share2 className="text-gray-800" size={18} />
          </button>
        </div>
      </header>

      {/* Main Panel Detail Content */}
      <div className="p-6 space-y-6">
        
        {/* Header Info */}
        <div className="space-y-2">
          <div className="flex justify-between items-start">
            <h1 className="font-display font-bold text-2xl md:text-3xl text-gray-900 leading-tight">
              {pizza.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full">
              <Star fill="#cca730" stroke="#cca730" size={14} className="shrink-0" />
              <span className="font-sans text-xs font-bold text-gray-800">{pizza.rating || 4.9}</span>
            </div>
            <span className="font-sans text-xs text-gray-500">({pizza.reviewsCount || 128} reseñas)</span>
          </div>
        </div>

        {/* Description */}
        <p className="font-sans text-sm md:text-base text-gray-600 leading-relaxed">
          {pizza.description}
        </p>

        {/* Divider */}
        <hr className="border-gray-100" />

        {/* Size Selector */}
        <section className="space-y-3">
          <h2 className="font-display font-semibold text-sm md:text-base text-gray-900">Tamaño</h2>
          <div className="flex gap-2">
            {(['S', 'M', 'L', 'XL'] as PizzaSize[]).map((sz) => {
              const isSelected = size === sz;
              const diff = getSizeDelta(sz);
              return (
                <button
                  key={sz}
                  onClick={() => setSize(sz)}
                  className={`flex-1 h-12 rounded-full border text-xs tracking-wide font-semibold flex flex-col items-center justify-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-gray-950 border-gray-950 text-white shadow-sm'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="font-display text-sm font-bold">{sz}</span>
                  <span className="text-[9px] opacity-80">
                    {diff === 0 ? 'Base' : diff > 0 ? `+$${diff.toFixed(2)}` : `-$${Math.abs(diff).toFixed(2)}`}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Crust Selection */}
        <section className="space-y-3">
          <h2 className="font-display font-semibold text-sm md:text-base text-gray-900">Tipo de Masa</h2>
          <div className="grid grid-cols-1 gap-2">
            {(['Tradicional', 'Fina y Crujiente', 'Borde Relleno de Queso'] as const).map((cr) => {
              const isSelected = crust === cr;
              const extraPrice = getCrustPrice(cr);
              return (
                <button
                  key={cr}
                  onClick={() => setCrust(cr)}
                  className={`flex items-center justify-between p-4 border rounded-xl text-left transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'border-gray-950 bg-gray-50'
                      : 'border-gray-100 bg-white hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <p className={`font-sans text-sm font-semibold ${isSelected ? 'text-gray-900' : 'text-gray-500'}`}>
                      {cr}
                    </p>
                    {extraPrice > 0 && <span className="text-xs text-[#af101a] font-medium">+${extraPrice.toFixed(2)}</span>}
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'border-gray-900' : 'border-gray-300'}`}>
                    {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Customization (Extras) */}
        <section className="space-y-3">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-display font-semibold text-sm md:text-base text-gray-900">Constructor visual</h2>
              <p className="font-sans text-xs text-gray-500 mt-0.5">La imagen y el total se actualizan al agregar toppings.</p>
            </div>
            <span className="font-display text-[10px] font-bold text-gray-500 uppercase bg-gray-100 px-2 py-0.5 rounded">Opcional</span>
          </div>
          
          <div className="grid grid-cols-1 gap-3">
            {EXTRAS.map((extra) => {
              const isChecked = selectedExtras.includes(extra.id);
              return (
                <button
                  key={extra.id}
                  onClick={() => handleToggleExtra(extra.id)}
                  className={`flex items-center justify-between cursor-pointer p-3.5 border rounded-xl text-left transition-all ${
                    isChecked ? 'border-[#af101a] bg-red-50/20' : 'border-gray-100 bg-white hover:bg-gray-50/70'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${isChecked ? 'bg-[#af101a] border-[#af101a] text-white' : 'border-gray-300'}`}>
                      {isChecked && (
                        <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                    <span className="font-sans text-sm font-semibold text-gray-800">{extra.name}</span>
                  </div>
                  <span className="font-sans text-sm font-bold text-gray-600">+${extra.price.toFixed(2)}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Nutrition Info Expandable */}
        <section className="border-t border-gray-100 pt-4">
          <button 
            onClick={() => setIsNutritionOpen(!isNutritionOpen)}
            className="w-full flex items-center justify-between py-2 group cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <ChefHat size={18} className="text-gray-400 group-hover:text-[#af101a]" />
              <span className="font-display font-semibold text-sm text-gray-800">Información Nutricional</span>
            </div>
            {isNutritionOpen ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
          </button>
          
          {isNutritionOpen && (
            <div className="pt-3 pb-2 grid grid-cols-3 gap-2 text-center bg-gray-50 rounded-xl p-3 mt-1">
              <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-2xs">
                <span className="block font-display text-xs font-bold text-gray-800">850 kcal</span>
                <span className="text-[10px] text-gray-400">Calorías</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-2xs">
                <span className="block font-display text-xs font-bold text-gray-800">32g</span>
                <span className="text-[10px] text-gray-400">Proteínas</span>
              </div>
              <div className="bg-white p-2 rounded-lg border border-gray-100 shadow-2xs">
                <span className="block font-display text-xs font-bold text-gray-800">95g</span>
                <span className="text-[10px] text-gray-400">Carbohidratos</span>
              </div>
            </div>
          )}
        </section>

      </div>

      {/* Fixed Bottom Bar inside detail */}
      <div className="fixed sm:absolute bottom-0 left-0 w-full bg-white/95 backdrop-blur-md border-t border-gray-100 px-5 py-4 flex items-center justify-between z-30 shadow-lg rounded-b-3xl">
        <div className="flex flex-col">
          <span className="font-sans text-xs text-gray-400">Total acumulado</span>
          <span className="font-display font-extrabold text-xl text-gray-900">${totalPrice.toFixed(2)}</span>
        </div>

        <div className="flex items-center gap-3">
          {/* Quantity selector */}
          <div className="flex items-center bg-gray-100 rounded-full p-1 border border-gray-200">
            <button 
              onClick={() => setQuantity(q => q > 1 ? q - 1 : 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-600 hover:text-[#af101a] cursor-pointer"
            >
              -
            </button>
            <span className="w-6 text-center font-sans text-sm font-semibold">{quantity}</span>
            <button 
              onClick={() => setQuantity(q => q + 1)}
              className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-gray-600 hover:text-[#af101a] cursor-pointer"
            >
              +
            </button>
          </div>

          <button 
            onClick={handleAddPress}
            className="bg-[#af101a] hover:bg-[#ba1a20] text-white h-[48px] px-5 rounded-full font-sans font-semibold text-sm flex items-center justify-center gap-2 transition-colors active:scale-95 shadow-md cursor-pointer"
          >
            <span>Agregar</span>
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>

    </div>
  );
}
