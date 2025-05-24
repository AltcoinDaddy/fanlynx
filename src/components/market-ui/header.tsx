import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { FC } from 'react';



/**
 * Main header component for the Fanlynx betting platform
 */
const Header: FC = () => {
  return (
    <header className="bg-[#0A0C14] border-b border-gray-900 w-full">
      {/* Removed the container max-width constraint for full width */}
      <div className="w-full px-4 py-3 flex items-center justify-between">
        {/* Logo and Search Section */}
        <div className="flex items-center space-x-6">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold text-white">Fanlynx</span>
          </div>
          
         
        </div>

        {/* Navigation and Authentication */}
        <div className="flex items-center space-x-2">
          {/* More Menu */}
          <Button variant="ghost" className="text-gray-300 flex items-center">
            More <ChevronDown className="ml-1 h-4 w-4" />
          </Button>
          
          {/* Authentication Button */}
          
        
        </div>
      </div>
    </header>
  );
};

export default Header;