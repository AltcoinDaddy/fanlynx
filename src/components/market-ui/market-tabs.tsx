"use client";

import { MarketCardSkeleton } from "../market-card-skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { MarketCard } from "../market-card";

interface Props {
  marketCount?: bigint;
  isLoading?: boolean;
}

const MarketTabs = ({ marketCount, isLoading }: Props) => {
  const skeletonCards = Array.from({ length: 6 }, (_, index) => (
    <MarketCardSkeleton key={index} />
  ));

  const marketCountNumber = Number(marketCount || 0);
  const hasNoMarkets = !isLoading && marketCountNumber === 0;

  const EmptyState = ({ type }: { type: string }) => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="w-16 h-16 mb-4 bg-gray-800 rounded-full flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-300 mb-2">
        No {type} Markets
      </h3>
      <p className="text-gray-500 max-w-sm">
        There are currently no {type.toLowerCase()} markets available. Check
        back later for new opportunities.
      </p>
    </div>
  );

  const renderContent = (filter: string, title: string) => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {skeletonCards}
        </div>
      );
    }

    if (hasNoMarkets) {
      return <EmptyState type={title} />;
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: marketCountNumber }, (_, index) => (
          <MarketCard key={index} index={index} filter={filter as "active" | "pending" | "resolved"} />
        ))}
      </div>
    );
  };

  return (
    <Tabs defaultValue="active" className="w-full px-4 py-6">
      <TabsList className="w-full grid grid-cols-3 bg-inherit border border-gray-700 h-12">
        <TabsTrigger
          value="active"
          className="w-full h-full text-base font-medium"
        >
          Active
        </TabsTrigger>
        <TabsTrigger
          value="pending"
          className="w-full h-full text-base font-medium"
        >
          Pending Resolution
        </TabsTrigger>
        <TabsTrigger
          value="resolved"
          className="w-full h-full text-base font-medium"
        >
          Resolved
        </TabsTrigger>
      </TabsList>

      <TabsContent value="active">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Active Markets</h2>
          {renderContent("active", "Active")}
        </div>
      </TabsContent>

      <TabsContent value="pending">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">
            Pending Resolution Markets
          </h2>
          {renderContent("pending", "Pending Resolution")}
        </div>
      </TabsContent>

      <TabsContent value="resolved">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Resolved Markets</h2>
          {renderContent("resolved", "Resolved")}
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default MarketTabs;
