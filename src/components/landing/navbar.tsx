"use client";

import { Menu, X, Loader2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { ConnectButton, darkTheme, useActiveAccount } from "thirdweb/react";
import { client } from "@/app/client";
import { baseSepolia } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const account = useActiveAccount();
  const [isClaimLoading, setIsClaimLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClaimTokens = async () => {
    if (!account) return;

    setIsClaimLoading(true);
    try {
      const resp = await fetch("/api/claimToken", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ address: account.address }),
      });

      if (!resp.ok) {
        const errorData = await resp.json().catch(() => ({ message: 'Failed to claim tokens' }));
        throw new Error(errorData.message || 'Failed to claim tokens');
      }

      toast({
        title: "Tokens Claimed!",
        description: "Your tokens have been successfully claimed.",
        duration: 5000,
      });
    } catch (error: unknown) {
      console.error("Claim error:", error);
      const errorMessage = (error as Error).message || "There was an error claiming your tokens. Please try again.";  
      toast({
        title: "Claim Failed",
        description: errorMessage || "There was an error claiming your tokens. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsClaimLoading(false);
    }
  };

  const connectButtonConfig = {
    client: client,
    theme: darkTheme({
      colors: {
        primaryButtonBg: "#7c3aed",
        primaryButtonText: "#ffffff",
        connectedButtonBg: "#1f2937",
        connectedButtonBgHover: "#374151",
      }
    }),
    chain: baseSepolia,
    connectButton: {
      style: {
        fontSize: '0.875rem',
        height: '2rem',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
      } as React.CSSProperties,
      label: 'Sign In',
    },
    detailsButton: {
      style: {
        fontSize: '0.875rem',
        height: '2rem',
        paddingLeft: '0.75rem',
        paddingRight: '0.75rem',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
      } as React.CSSProperties,
      displayBalanceToken: {
        [baseSepolia.id]: "0x4D9604603527322F44c318FB984ED9b5A9Ce9f71"
      }
    },
    wallets: [
      inAppWallet(),
    ],
    accountAbstraction: {
      chain: baseSepolia,
      sponsorGas: true,
    },
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/90 backdrop-blur-md shadow-lg' : 'bg-black/60 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white font-bold text-xl">
              FANLYNX
            </div>
          </div>

          <div className="hidden md:flex md:items-center md:ml-6">
            <div className="flex items-center gap-[32px] lg:space-x-8">
              <NavLink href="#" active>Home</NavLink>
              <NavLink href="#">Market</NavLink>
              
              {account && (
                <Button
                  onClick={handleClaimTokens}
                  disabled={isClaimLoading}
                  variant="outline"
                  size="sm"
                  className="border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-white ml-4"
                >
                  {isClaimLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Claiming...
                    </>
                  ) : (
                    'Claim Tokens'
                  )}
                </Button>
              )}
              <ConnectButton {...connectButtonConfig} />
            </div>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} border-t border-gray-700`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900/95 backdrop-blur-md">
          <MobileNavLink href="#" active>Home</MobileNavLink>
          <MobileNavLink href="#">Market</MobileNavLink>
          <div className="pt-4 pb-2 border-t border-gray-700 space-y-2 px-2">
            {account && (
              <Button
                onClick={handleClaimTokens}
                disabled={isClaimLoading}
                variant="outline"
                size="sm"
                className="w-full justify-center border-gray-600 text-gray-200 hover:bg-gray-700"
              >
                {isClaimLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Claiming...
                  </>
                ) : (
                  'Claim Tokens'
                )}
              </Button>
            )}
            <div className="flex justify-center">
              <ConnectButton {...connectButtonConfig} connectModal={{ size: "compact" }} />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  active?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, active = false }) => {
  return (
    <a
      href={href}
      className={`text-sm font-medium transition-all duration-200 whitespace-nowrap ${
        active
          ? 'text-white border-b-2 border-purple-500'
          : 'text-gray-300 hover:text-white hover:border-b-2 hover:border-purple-500/70'
      }`}
    >
      {children}
    </a>
  );
};

const MobileNavLink: React.FC<NavLinkProps> = ({ href, children, active = false }) => {
  return (
    <a
      href={href}
      className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
        active
          ? 'text-white bg-gray-800'
          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
      }`}
    >
      {children}
    </a>
  );
};

export default Navbar;