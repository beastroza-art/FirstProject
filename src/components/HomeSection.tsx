import React from 'react';
import { motion } from 'motion/react';
import { Pizza, Plus, Star, Award, Beer, Cake, Utensils } from 'lucide-react';
import { PIZZAS } from '../data';
import { Pizza as PizzaType } from '../types';

interface HomeSectionProps {
  onNavigate: (screen: string) => void;
  onSelectCategory: (category: 'Clásicas' | 'Premium' | 'Acompañamientos' | 'Bebidas' | 'Postres') => void;
  onAddToCartDirectly: (pizza: PizzaType) => void;
  onSelectPizza: (pizza: PizzaType) => void;
}

export default function HomeSection({
  onNavigate,
  onSelectCategory,
  onAddToCartDirectly,
  onSelectPizza
}: HomeSectionProps) {
  
  // Filter top sold items (for instance Margherita and Pepperoni Trufa)
  const topSold = PIZZAS.filter(p => p.id === 'margherita-prime' || p.id === 'pepperoni-trufa');

  const categories = [
    { id: 'Clásicas', label: 'Clásicas', icon: Pizza },
    { id: 'Premium', label: 'Premium', icon: Award },
    { id: 'Acompañamientos', label: 'Acompañamientos', icon: Utensils },
    { id: 'Bebidas', label: 'Bebidas', icon: Beer },
    { id: 'Postres', label: 'Postres', icon: Cake }
  ] as const;

  const handleCategoryClick = (catId: 'Clásicas' | 'Premium' | 'Acompañamientos' | 'Bebidas' | 'Postres') => {
    onSelectCategory(catId);
    onNavigate('menu');
  };

  return (
    <div className="space-y-8 pb-10">
      
      {/* Hero Banner */}
      <section 
        className="relative rounded-[24px] overflow-hidden h-[300px] md:h-[400px] flex items-center shadow-lg group cursor-pointer transition-transform duration-300"
        style={{
          backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDpG2Ua6Bvh0tQ0-kJwLFdq_MVKZhahAzRN_R6WIH4TyBh58bXOjLcco3XCQNs78o-iokOuoI8YFSgyavHIJcRuubEjy7uS-Ewx8n6fFBNMtZGQHy40dnP047foJMiD50BZb1_HGjSSoNayFaQFLA26sxBY0udsYlhjH-1OX1MYaKoL0Zhl41d-eay7uf3GhDH_kMLu6rgqKuK1hunoGXkxJ57_m3JA-Y1iZ9MyxSh6AbIh_Bf-TsqneAPtjzRo3VCJh7Lwv_u03Pmq')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
        onClick={() => onNavigate('menu')}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent"></div>
        <div className="relative z-10 p-6 md:p-12 max-w-lg text-white">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="font-display font-bold text-2xl md:text-4xl text-[#ffffff] mb-3 leading-tight"
          >
            ¡Bienvenido a Pizza Prime!
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-sans text-sm md:text-lg mb-6 text-gray-200 opacity-90"
          >
            Disfruta de un 20% en tu primera orden Premium.
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-[#af101a] text-white font-sans font-semibold text-sm h-12 px-6 rounded-full hover:bg-[#ba1a20] transition-colors active:scale-95 shadow-md flex items-center justify-center cursor-pointer"
          >
            Ordenar Ahora
          </motion.button>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="space-y-3">
        <h3 className="font-display font-semibold text-sm text-gray-400 tracking-wider">CATEGORÍAS</h3>
        <div className="flex space-x-4 overflow-x-auto no-scrollbar py-2 -mx-4 px-4 snap-x">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className="flex flex-col items-center flex-shrink-0 snap-start active:scale-95 transition-transform group cursor-pointer"
              >
                <div className="w-[72px] h-[72px] bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 mb-2 group-hover:shadow-md group-hover:border-red-100 transition-all duration-200">
                  <Icon className="text-[#af101a] w-7 h-7" />
                </div>
                <span className="font-sans text-xs font-semibold text-gray-700 group-hover:text-[#af101a] transition-colors">
                  {cat.label}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Lo más vendido */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-display font-semibold text-lg md:text-xl text-gray-900">Lo más vendido</h3>
          <button 
            onClick={() => {
              onSelectCategory('Premium');
              onNavigate('menu');
            }} 
            className="font-sans text-sm font-semibold text-[#af101a] hover:underline cursor-pointer"
          >
            Ver todo
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {topSold.map((pizza) => (
            <div 
              key={pizza.id}
              className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col group relative"
            >
              {/* Image Container */}
              <div 
                className="h-48 overflow-hidden cursor-pointer relative"
                onClick={() => onSelectPizza(pizza)}
              >
                <img 
                  alt={pizza.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  src={pizza.image} 
                />
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star fill="#cca730" stroke="#cca730" size={14} />
                  <span className="font-sans text-xs font-bold text-gray-800">{pizza.rating || 4.9}</span>
                </div>
              </div>

              {/* Text detail */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h4 
                      className="font-display font-bold text-base md:text-lg text-gray-900 group-hover:text-[#af101a] transition-colors cursor-pointer"
                      onClick={() => onSelectPizza(pizza)}
                    >
                      {pizza.name}
                    </h4>
                    <span className="font-display font-bold text-base md:text-lg text-[#af101a]">
                      ${pizza.price.toFixed(2)}
                    </span>
                  </div>
                  <p 
                    className="font-sans text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4 cursor-pointer"
                    onClick={() => onSelectPizza(pizza)}
                  >
                    {pizza.description}
                  </p>
                </div>

                <div className="flex justify-between items-center pt-2">
                  <button
                    onClick={() => onSelectPizza(pizza)}
                    className="text-xs font-semibold text-gray-500 hover:text-[#af101a]"
                  >
                    Personalizar
                  </button>
                  <motion.button 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onAddToCartDirectly(pizza)}
                    aria-label={`Añadir ${pizza.name} al carrito`}
                    className="bg-gray-100 hover:bg-[#af101a] text-gray-700 hover:text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                  >
                    <Plus size={20} />
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
