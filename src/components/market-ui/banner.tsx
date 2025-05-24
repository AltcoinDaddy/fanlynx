import { client } from "@/app/client";
import { chilizChainId, wallets } from "@/constants/contract";
import { ConnectButton, darkTheme } from "thirdweb/react";

const Banner = () => {
  return (
    <div className="w-full h-[500px] relative overflow-hidden bg-gradient-to-r from-[#0A0C14] via-[#1A1F2C] to-[#0A0C14]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%239b87f5' fillOpacity='0.4'%3E%3Ccircle cx='7' cy='7' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat'
        }}></div>
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Predict. <span className="text-[#9b87f5]">Win.</span> Repeat.
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join the ultimate prediction platform where your sports knowledge pays off. 
            Trade shares on real events and win big.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
           <ConnectButton 
            client={client}
            theme={darkTheme({
              colors: {
                primaryButtonBg: "#9b87f5",
                primaryButtonText: "white",
                secondaryButtonBg: "transparent",
                secondaryButtonText: "#9b87f5"
              }
            })}
            chain={{
              id: chilizChainId,
              rpc: "https://rpc.ankr.com/chiliz"
            }}
            connectButton={{
              style: {
                fontSize: '16px',
                height: 'fit-content',
              },
              label: 'Sign In',
            }}
            wallets={wallets}
          />
            <button className="border border-[#9b87f5] text-[#9b87f5] hover:bg-[#9b87f5] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      {/* Animated Background Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-[#9b87f5]/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#7c3aed]/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#9b87f5]/5 rounded-full blur-lg animate-bounce delay-500"></div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0A0C14] to-transparent"></div>
    </div>
  );
};

export default Banner;