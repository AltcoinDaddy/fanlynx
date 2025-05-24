import React from 'react';
import { Bookmark } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

type MarketCardProps = {
  title: string;
  image?: string;
  flag?: string;
  chance?: number;
  options?: Array<{
    name: string;
    value: string;
    yesPercent?: number;
    noPercent?: boolean;
  }>;
  volumeLabel: string;
  isPSG?: boolean;
};

const MarketCard: React.FC<MarketCardProps> = ({
  title,
  image,
  flag,
  chance,
  options,
  volumeLabel,
  isPSG,
}) => {
  return (
    <div className="bg-polymarket-card rounded-lg overflow-hidden h-full">
      <div className="flex p-4 space-x-3">
        {image && (
          <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden">
            <Image src={image} alt="" className="w-full h-full object-cover" />
          </div>
        )}
        {flag && (
          <div className="w-12 h-12 flex-shrink-0 rounded overflow-hidden bg-gray-700">
            <div className="w-full h-full flex items-center justify-center text-2xl">
              {flag}
            </div>
          </div>
        )}
        <div className="flex-1">
          <h3 className="font-medium text-white mb-2">{title}</h3>
          
          {options ? (
            <div className="space-y-2">
              {options.map((option) => (
                <div key={option.name} className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">{option.name}</span>
                  <div className="flex space-x-2 items-center">
                    <span className="text-sm font-medium">{option.value}</span>
                    {option.yesPercent !== undefined && (
                      <span className="bg-green-500/20 text-green-500 px-2 py-0.5 rounded text-xs">
                        Yes
                      </span>
                    )}
                    {option.noPercent && (
                      <span className="bg-red-500/20 text-red-500 px-2 py-0.5 rounded text-xs">
                        No
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-between items-center">
              {chance && (
                <div 
                  className={cn(
                    "text-white font-semibold text-lg rounded-full w-16 h-16 flex items-center justify-center",
                    isPSG ? "bg-purple-600" : chance >= 50 ? "bg-green-600" : "bg-red-600"
                  )}
                >
                  {chance}%
                </div>
              )}
              {isPSG && <div className="text-sm text-gray-400">PSG</div>}
              
              <div className="ml-auto space-y-2">
                <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded w-24 flex items-center justify-center">
                  Buy Yes <span className="ml-1">↑</span>
                </button>
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded w-24 flex items-center justify-center">
                  Buy No <span className="ml-1">↓</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t border-gray-700 p-2 flex justify-between items-center text-xs text-gray-400">
        <div>{volumeLabel}</div>
        <div className="flex space-x-2">
          <button className="hover:text-gray-300">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 7l-7 5-7-5" />
              <rect x="3" y="7" width="18" height="13" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
          </button>
          <button className="hover:text-gray-300">
            <Bookmark className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MarketCard;