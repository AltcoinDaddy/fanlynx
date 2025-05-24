import React from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

type Tab = {
  name: string;
  active?: boolean;
  icon?: React.ReactNode;
};

const mainTabs: Tab[] = [
  { name: 'Trending', icon: <ArrowUpRight className="h-4 w-4" />, active: true },
  { name: 'Football' },
  { name: 'NBA' },
  { name: 'Tennis' },
  { name: 'F1' },
  { name: 'Cricket' },
  { name: 'Golf' },
  { name: 'Boxing' },
  { name: 'UFC' },
  { name: 'MLB' },
  { name: 'NHL' },
  { name: 'Olympics' },
];

const filterTabs: Tab[] = [
  { name: 'All', active: true },
  { name: 'Premier League' },
  { name: 'La Liga' },
  { name: 'Champions League' },
  { name: 'FA Cup' },
  { name: 'Arsenal' },
  { name: 'Man City' },
  { name: 'Liverpool' },
  { name: 'NBA Playoffs' },
  { name: 'NFL Draft' },
  { name: 'Roland Garros' },
];

const NavigationTabs = () => {
  return (
    <div className="bg-[#0A0C14] border-b border-gray-900 w-full">
      <div className="w-full px-4">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex space-x-8 py-4">
            {mainTabs.map((tab) => (
              <button
                key={tab.name}
                className={cn(
                  "flex items-center whitespace-nowrap text-sm font-medium",
                  tab.active ? "text-[#9b87f5]" : "text-gray-400 hover:text-gray-200"
                )}
              >
                {tab.icon && <span className="mr-1">{tab.icon}</span>}
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2 border-t border-gray-800 py-3 overflow-x-auto scrollbar-hide">
          <div className="flex items-center bg-[#1A1F2C] rounded-md p-2">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <button className="bg-[#1A1F2C] p-2 rounded-md">
            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
          </button>
          <button className="bg-[#1A1F2C] p-2 rounded-md">
            <svg className="h-4 w-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M19 9H5M19 15H5" />
            </svg>
          </button>

          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            {filterTabs.map((tab) => (
              <button
                key={tab.name}
                className={cn(
                  "whitespace-nowrap px-3 py-1.5 text-sm rounded-md",
                  tab.active
                    ? "bg-[#9b87f5]/10 text-[#9b87f5]"
                    : "hover:bg-[#1A1F2C]/70 text-gray-300"
                )}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationTabs;