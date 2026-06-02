import React from 'react';
import { Trophy, Sparkles, Percent, Gift, Star, Truck } from 'lucide-react';
import { REWARDS, BENEFITS } from '../data';

interface RewardsSectionProps {
  userPoints: number;
  onRedeemPoints: (rewardId: string, pointsCost: number, rewardLabel: string) => void;
}

export default function RewardsSection({ userPoints, onRedeemPoints }: RewardsSectionProps) {
  
  // Progress ratio calculation for Gold Tier to Platinum Tier (Need 1500 points total, they have 1250)
  const currentPoints = userPoints;
  const targetPoints = 1500;
  const pointsRemaining = Math.max(0, targetPoints - currentPoints);
  const progressPercent = Math.min(100, (currentPoints / targetPoints) * 100);

  return (
    <div className="space-y-8 pb-12 max-w-[1440px] mx-auto w-full">
      
      {/* Loyalty Card / Gold Tier Card */}
      <section>
        <div className="gold-gradient rounded-[24px] p-6 shadow-md text-white flex flex-col justify-between min-h-[200px] relative overflow-hidden">
          {/* Circular abstract highlights */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl -ml-16 -mb-16 pointer-events-none" />

          <div className="relative z-10 flex justify-between items-start">
            <div>
              <span className="font-display text-[10px] font-bold uppercase tracking-widest text-[#fff2f0]">MIEMBRO ACTUAL</span>
              <h2 className="font-display font-extrabold text-2xl md:text-3xl text-white mt-1">Nivel Oro</h2>
            </div>
            <div className="bg-white/20 p-2.5 rounded-full shrink-0">
              <Trophy size={28} className="text-yellow-50" />
            </div>
          </div>

          <div className="relative z-10 mt-8 space-y-4">
            <div className="flex justify-between items-end">
              <div>
                <span className="font-sans text-xs text-yellow-50 font-normal">Balance de Puntos</span>
                <span className="block font-display font-extrabold text-4xl text-white leading-tight">
                  {currentPoints.toLocaleString()} <span className="font-sans text-lg font-medium">pts</span>
                </span>
              </div>
              <div className="text-right">
                <span className="font-sans text-xs text-yellow-50 font-normal">Próximo Nivel</span>
                <span className="block font-display font-bold text-base text-yellow-50">Platino</span>
              </div>
            </div>

            <div className="space-y-1.5">
              {/* Progress bar line */}
              <div className="w-full bg-black/20 rounded-full h-2.5">
                <div 
                  className="bg-white h-2.5 rounded-full shadow-inner transition-all duration-1000 ease-out" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              
              {pointsRemaining > 0 ? (
                <p className="font-sans text-[11px] text-right font-medium text-yellow-50 opacity-95">
                  Faltan {pointsRemaining} pts para Platino
                </p>
              ) : (
                <p className="font-sans text-[11px] text-right font-bold text-yellow-50 opacity-95">
                  ¡Felicidades! Alcanzaste el máximo nivel Platino 🎉
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Available Rewards Panel */}
      <section className="space-y-4">
        <h3 className="font-display font-semibold text-lg md:text-xl text-gray-900">Recompensas Disponibles</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REWARDS.map((rew) => {
            const canAfford = currentPoints >= rew.pointsCost;
            return (
              <div 
                key={rew.id}
                className={`glass-card rounded-[24px] p-5 shadow-xs hover:shadow-md transition-shadow bg-white flex flex-col items-center text-center relative overflow-hidden ${
                  rew.premium ? 'border-amber-200' : 'border-gray-100'
                }`}
              >
                {rew.premium && (
                  <div className="absolute top-0 right-0 bg-[#cca730] text-[#241a00] px-3 py-1 rounded-bl-xl font-display text-[9px] font-black uppercase tracking-wider">
                    PREMIUM
                  </div>
                )}

                {/* Circle Icon Badge */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 ${
                  rew.premium ? 'bg-amber-100/50 text-[#cca730]' : 'bg-red-50 text-[#af101a]'
                }`}>
                  {rew.icon === 'Percent' ? (
                    <Percent size={24} />
                  ) : rew.icon === 'CupSoda' ? (
                    <Trophy size={24} />
                  ) : (
                    <Sparkles size={24} />
                  )}
                </div>

                <h4 className="font-display font-bold text-base text-gray-900 mb-1 leading-tight">
                  {rew.name}
                </h4>
                <p className="font-sans text-xs text-gray-500 mb-6 leading-relaxed max-w-[180px] mx-auto">
                  {rew.description}
                </p>

                <button 
                  onClick={() => onRedeemPoints(rew.id, rew.pointsCost, rew.name)}
                  disabled={!canAfford}
                  className={`mt-auto w-full py-2.5 px-4 rounded-full font-sans font-bold text-xs tracking-wide transition-all cursor-pointer ${
                    canAfford
                      ? rew.premium 
                        ? 'bg-[#af101a] text-white hover:bg-[#ba1a20]' 
                        : 'border border-[#af101a] text-[#af101a] hover:bg-red-50/50'
                      : 'bg-gray-100 text-gray-400 border border-gray-100 cursor-not-allowed'
                  }`}
                >
                  {canAfford ? `Canjear ${rew.pointsCost} pts` : `Faltan ${rew.pointsCost - currentPoints} pts`}
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gold Member Benefits */}
      <section className="space-y-4">
        <h3 className="font-display font-semibold text-lg md:text-xl text-gray-900">Tus beneficios Oro</h3>
        
        <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm overflow-hidden divide-y divide-gray-100">
          {BENEFITS.map((ben) => {
            return (
              <div key={ben.id} className="flex items-center p-5 gap-4">
                <div className="bg-amber-50 p-3 rounded-full shrink-0 text-[#cca730]">
                  {ben.icon === 'Bike' ? (
                    <Truck size={20} />
                  ) : ben.icon === 'Gift' ? (
                    <Gift size={20} />
                  ) : (
                    <Star size={20} />
                  )}
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-gray-900">{ben.name}</h4>
                  <p className="font-sans text-xs text-gray-500">{ben.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
