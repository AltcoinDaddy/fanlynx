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


      </div>
    </header>
  );
};

export default Header;