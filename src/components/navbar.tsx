import { ConnectButton, lightTheme, useActiveAccount } from "thirdweb/react";
import { client } from "@/app/client";
import { baseSepolia } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function Navbar() {
    const account = useActiveAccount();
    const [isClaimLoading, setIsClaimLoading] = useState(false);
    const { toast } = useToast();

    const handleClaimTokens = async () => {
        setIsClaimLoading(true);
        try {
            const resp = await fetch("/api/claimToken", {
                method: "POST",
                body: JSON.stringify({ address: account?.address }),
            });
            
            if (!resp.ok) {
                throw new Error('Failed to claim tokens');
            }

            toast({
                title: "Tokens Claimed!",
                description: "Your tokens have been successfully claimed.",
                duration: 5000,
            });
        } catch (error) {
            console.error(error);
            toast({
                title: "Claim Failed",
                description: "There was an error claiming your tokens. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsClaimLoading(false);
        }
    };
    
    return (
        <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">FanLynx</h1>
            <div className="items-center flex gap-2">
                {account && (
                    <Button 
                        onClick={handleClaimTokens}
                        disabled={isClaimLoading}
                        variant="outline"
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
                <ConnectButton 
                    client={client} 
                    theme={lightTheme()}
                    chain={baseSepolia}
                    connectButton={{
                        style: {
                            fontSize: '0.75rem !important',
                            height: '2.5rem !important',
                        },
                        label: 'Sign In',
                    }}
                    detailsButton={{
                        displayBalanceToken: {
                            [baseSepolia.id]: "0x4D9604603527322F44c318FB984ED9b5A9Ce9f71"
                        }
                    }}
                    wallets={[
                        inAppWallet(),
                    ]}
                    accountAbstraction={{
                        chain: baseSepolia,
                        sponsorGas: true,
                    }}
                />
            </div>
        </div>
    );
}
