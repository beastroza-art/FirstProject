import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star } from 'lucide-react';
import { PIZZAS } from '../data';
import { Pizza as PizzaType } from '../types';

interface MenuSectionProps {
  activeCategory: 'Clásicas' | 'Premium' | 'Acompañamientos' | 'Bebidas' | 'Postres';
  onCategoryChange: (category: 'Clásicas' | 'Premium' | 'Acompañamientos' | 'Bebidas' | 'Postres') => void;
  onSelectPizza: (pizza: PizzaType) => void;
}

export default function MenuSection({
  activeCategory,
  onCategoryChange,
  onSelectPizza
}: MenuSectionProps) {

  // Map category tab labels to match the premium menu design in English/Spanish gracefully
  const tabs = [
    { id: 'Clásicas', label: 'Classic' },
    { id: 'Premium', label: 'Premium' },
    { id: 'Acompañamientos', label: 'Sides' },
    { id: 'Bebidas', label: 'Drinks' },
    { id: 'Postres', label: 'Desserts' }
  ] as const;

  // Filter pizzas based on active category
  const filteredPizzas = PIZZAS.filter(p => p.category === activeCategory);

  return (
    <div className="space-y-6">
      
      {/* Category Tabs */}
      <section className="sticky top-14 left-0 w-full z-40 bg-[#f9f9f9]/95 backdrop-blur-md py-4 border-b border-gray-100 -mx-4 px-4 sm:-mx-8 sm:px-8">
        <div className="flex space-x-2 overflow-x-auto hide-scrollbar snap-x max-w-[1440px] mx-auto">
          {tabs.map((tab) => {
            const isTabActive = activeCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => onCategoryChange(tab.id)}
                className={`snap-start shrink-0 px-5 py-2.5 rounded-full font-display text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isTabActive
                    ? 'bg-[#af101a] text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Grid List */}
      <section className="space-y-4 max-w-[1440px] mx-auto">
        <h2 className="font-display font-semibold text-lg md:text-xl text-gray-800 tracking-tight">
          {activeCategory === 'Clásicas' ? 'Selección Clásica' : 
           activeCategory === 'Premium' ? 'Selección Premium' : 
           activeCategory === 'Acompañamientos' ? 'Acompañamientos Prime' : 
           activeCategory === 'Bebidas' ? 'Bebidas Heladas' : 'Postres Deliciosos'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredPizzas.map((pizza) => (
              <motion.article
                key={pizza.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-row group hover:shadow-md transition-shadow duration-300"
              >
                {/* Product Image */}
                <div 
                  className="w-1/3 md:w-32 lg:w-40 h-full relative shrink-0 overflow-hidden cursor-pointer"
                  onClick={() => onSelectPizza(pizza)}
                >
                  <img 
                    alt={pizza.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    src={pizza.image} 
                  />
                  {pizza.rating && (
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shadow-sm">
                      <Star fill="#cca730" stroke="#cca730" size={10} />
                      <span className="font-sans text-[10px] font-bold text-gray-800">{pizza.rating}</span>
                    </div>
                  )}
                </div>

                {/* Info and button */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-start mb-1 h-12 overflow-hidden">
                      <h3 
                        onClick={() => onSelectPizza(pizza)}
                        className="font-display font-semibold text-sm md:text-base text-gray-900 leading-tight group-hover:text-[#af101a] transition-colors cursor-pointer"
                      >
                        {pizza.name}
                      </h3>
                      <span className="text-[#af101a] font-display font-bold text-sm md:text-base ml-2">
                        ${pizza.price.toFixed(2)}
                      </span>
                    </div>
                    <p className="font-sans text-xs text-gray-500 line-clamp-2 leading-relaxed mb-3">
                      {pizza.description}
                    </p>
                  </div>

                  <button 
                    onClick={() => onSelectPizza(pizza)}
                    className="w-full h-10 bg-gray-50 text-[#af101a] hover:bg-[#af101a] hover:text-white font-sans font-semibold text-xs tracking-wide rounded-full transition-colors duration-200 cursor-pointer"
                  >
                    Personalizar
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
}
