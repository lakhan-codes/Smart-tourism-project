import React from 'react';
import { Utensils, Check, ArrowRight, Heart } from 'lucide-react';
import { FOODS } from '../data/travelData.ts';

interface FoodViewProps {
  onSelectFood: (foodItem: any) => void;
}

export const FoodView: React.FC<FoodViewProps> = ({ onSelectFood }) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-bold mb-3">
          <Utensils className="w-3.5 h-3.5" />
          <span>Authentic Himalayan Gastronomy</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
          🍴 Shimla & Mountain Food
        </h1>
        <p className="mt-3 text-slate-600 text-sm sm:text-base">
          Enjoy the delicious and traditional cuisine of Shimla and the Himachal hills. From slow-cooked royal Dham to steaming hot Siddu and mountain momos.
        </p>
      </div>

      {/* Food Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {FOODS.map((food) => (
          <div
            key={food.id}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative h-56 overflow-hidden">
                <img
                  src={food.imageUrl}
                  alt={food.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3.5 left-3.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold shadow">
                  {food.category}
                </span>
                <span className="absolute bottom-3.5 right-3.5 px-3 py-1 rounded-xl bg-orange-500 text-white text-sm font-black shadow-md">
                  ₹{food.priceINR}
                </span>
              </div>

              <div className="p-6 space-y-3">
                <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block">
                  {food.highlight}
                </span>

                <h3 className="text-xl font-black text-slate-900 group-hover:text-orange-600 transition-colors">
                  {food.name}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {food.description}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase">Price</span>
                  <span className="text-lg font-black text-orange-600">
                    ₹{food.priceINR}
                  </span>
                </div>

                <button
                  onClick={() =>
                    onSelectFood({
                      destination: 'Shimla',
                      serviceType: 'package',
                      itemName: `Traditional Food Tasting: ${food.name}`,
                      totalPriceINR: food.priceINR * 2,
                      guests: 2,
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Select Food</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
