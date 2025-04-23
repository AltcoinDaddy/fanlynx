import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState, useEffect } from "react";
import { useActiveAccount, useSendAndConfirmTransaction } from "thirdweb/react";
import { prepareContractCall, readContract, toWei } from "thirdweb";
import { contract, tokenContract } from "@/constants/contract";
import { approve } from "thirdweb/extensions/erc20";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

// Types
interface MarketBuyInterfaceProps {
    marketId: number;
    market: {
        optionA: string;
        optionB: string;
        question: string;
    };
}

type BuyingStep = 'select_option' | 'enter_amount' | 'needs_approval' | 'confirm_purchase';
type Option = 'A' | 'B';

export function MarketBuyInterface({ marketId, market }: MarketBuyInterfaceProps) {
    // Hooks
    const account = useActiveAccount();
    const { mutateAsync: sendTx } = useSendAndConfirmTransaction();
    const { toast } = useToast();

    // State
    const [step, setStep] = useState<BuyingStep>('select_option');
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const [amount, setAmount] = useState<string>(""); // Use string for input control
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Reset state on account change or market change
    useEffect(() => {
        resetState();
    }, [account, marketId]);

    // Derived state
    const amountWei = amount ? BigInt(toWei(amount)) : BigInt(0);
    const displayOption = selectedOption === 'A' ? market.optionA : market.optionB;

    // Functions
    const resetState = () => {
        setStep('select_option');
        setSelectedOption(null);
        setAmount("");
        setIsLoading(false);
        setError(null);
    };

    const handleSelectOption = (option: Option) => {
        setSelectedOption(option);
        setStep('enter_amount');
        setError(null); // Clear previous errors
    };

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // Allow empty string, positive integers, or decimals
        if (value === "" || /^\d*\.?\d*$/.test(value)) {
            // Prevent leading zeros unless it's "0." or just "0"
             if (value.length > 1 && value.startsWith('0') && !value.startsWith('0.')) {
                 setAmount(value.substring(1));
             } else {
                 setAmount(value);
             }
            setError(null); // Clear error on valid input
        }
    };

    const validateAmount = (): boolean => {
        const numericAmount = parseFloat(amount);
        if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
            setError("Please enter a valid amount greater than 0.");
            return false;
        }
        setError(null);
        return true;
    };

    const proceedToNextStep = async () => {
        if (!account || !validateAmount()) return;

        setIsLoading(true);
        setError(null);
        try {
            const allowance = await readContract({
                contract: tokenContract,
                method: "function allowance(address owner, address spender) view returns (uint256)",
                params: [account.address, contract.address]
            });

            if (allowance < amountWei) {
                setStep('needs_approval');
            } else {
                setStep('confirm_purchase');
            }
        } catch (err) {
            console.error("Failed to check allowance:", err);
            setError("Failed to check token allowance. Please try again.");
            toast({ title: "Error", description: "Could not check token allowance.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleApprove = async () => {
        if (!account || !validateAmount()) return;

        setIsLoading(true);
        setError(null);
        try {
            const tx = await approve({
                contract: tokenContract,
                spender: contract.address,
                amount: amount // Use the string amount directly if approve handles it, otherwise parse
            });
            await sendTx(tx);
            toast({ title: "Approval Successful", description: "You can now confirm your purchase." });
            setStep('confirm_purchase');
        } catch (err) {
            console.error("Approval failed:", err);
            setError("Approval failed. Please try again.");
            toast({ title: "Approval Failed", description: "Could not approve token spending.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleConfirmPurchase = async () => {
        if (!account || !selectedOption || !validateAmount()) return;

        setIsLoading(true);
        setError(null);
        try {
            const tx = await prepareContractCall({
                contract,
                method: "function buyShares(uint256 _marketId, bool _isOptionA, uint256 _amount)",
                params: [BigInt(marketId), selectedOption === 'A', amountWei]
            });
            await sendTx(tx);
            toast({
                title: "Purchase Successful!",
                description: `You bought ${amount} ${displayOption} shares.`,
            });
            resetState(); // Reset after successful purchase
        } catch (err) {
            console.error("Purchase failed:", err);
            setError("Purchase failed. Please try again.");
            toast({ title: "Purchase Failed", description: "There was an error processing your purchase.", variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    // Render logic based on step
    const renderContent = () => {
        switch (step) {
            case 'select_option':
                return (
                    <div className="flex justify-between gap-4">
                        <Button
                            className="flex-1"
                            onClick={() => handleSelectOption('A')}
                            aria-label={`Vote ${market.optionA} for "${market.question}"`}
                            disabled={!account || isLoading}
                        >
                            {market.optionA}
                        </Button>
                        <Button
                            className="flex-1"
                            onClick={() => handleSelectOption('B')}
                            aria-label={`Vote ${market.optionB} for "${market.question}"`}
                            disabled={!account || isLoading}
                        >
                            {market.optionB}
                        </Button>
                    </div>
                );

            case 'enter_amount':
                return (
                    <div className="flex flex-col gap-4">
                         <span className="text-xs text-gray-500">
                            {`1 ${displayOption} = 1 PREDICT`}
                        </span>
                        <div className="flex items-start gap-2">
                            <div className="flex-grow relative">
                                <Input
                                    type="text" // Use text to better handle decimal input
                                    inputMode="decimal" // Hint for mobile keyboards
                                    min="0"
                                    placeholder="Enter amount"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    disabled={isLoading}
                                    className={cn(error && "border-red-500 focus-visible:ring-red-500")}
                                    aria-invalid={!!error}
                                    aria-describedby="amount-error"
                                />
                                 <div id="amount-error" className="min-h-[20px] mt-1">
                                    {error && (
                                        <span className="text-sm text-red-500">
                                            {error}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <span className="font-bold whitespace-nowrap pt-2">{displayOption}</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <Button
                                onClick={proceedToNextStep}
                                className="flex-1"
                                disabled={isLoading || !amount || parseFloat(amount) <= 0}
                            >
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Next'}
                            </Button>
                            <Button onClick={resetState} variant="outline" className="flex-1" disabled={isLoading}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                );

            case 'needs_approval':
                return (
                    <div className="flex flex-col border border-border rounded-lg p-4 gap-4">
                        <h2 className="text-lg font-semibold">Approval Needed</h2>
                        <p>
                            You need to approve the contract to spend <span className="font-bold">{amount} PREDICT</span> tokens on your behalf before buying shares.
                        </p>
                        {error && <p className="text-sm text-red-500">{error}</p>}
                        <div className="flex justify-end gap-2">
                            <Button onClick={handleApprove} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Approving...
                                    </>
                                ) : (
                                    'Approve'
                                )}
                            </Button>
                            <Button onClick={resetState} variant="outline" disabled={isLoading}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                );

            case 'confirm_purchase':
                return (
                    <div className="flex flex-col border border-border rounded-lg p-4 gap-4">
                        <h2 className="text-lg font-semibold">Confirm Purchase</h2>
                        <p>
                            You are about to buy <span className="font-bold">{amount} {displayOption}</span> share(s).
                        </p>
                         {error && <p className="text-sm text-red-500">{error}</p>}
                        <div className="flex justify-end gap-2">
                            <Button onClick={handleConfirmPurchase} disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Confirming...
                                    </>
                                ) : (
                                    'Confirm Purchase'
                                )}
                            </Button>
                            <Button onClick={resetState} variant="outline" disabled={isLoading}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="w-full mb-4">
            {!account && (
                 <p className="text-center text-muted-foreground">Please connect your wallet to buy shares.</p>
            )}
            {account && renderContent()}
        </div>
    );
}
