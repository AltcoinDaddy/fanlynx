/* eslint-disable @next/next/no-img-element */
"use client"

import { useReadContract } from 'thirdweb/react';
import Banner from './market-ui/banner';
import Header from './market-ui/header';
import MarketTabs from './market-ui/market-tabs';
import { contract } from '@/constants/contract';



export function EnhancedPredictionMarketDashboard() {
    const {data: marketCount, isLoading: isLoadingMarketCount} = useReadContract({
        contract,
        method: "function marketCount() view returns (uint256)",
        params: []
    })

    return (
        <div className="min-h-screen flex flex-col bg-[#0A0C14] text-white w-full">
              <Header />
              <Banner />
              <MarketTabs 
               marketCount={marketCount}
               isLoading={isLoadingMarketCount}
              />
        </div>
    );
}
