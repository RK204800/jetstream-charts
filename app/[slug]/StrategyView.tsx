'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { TradeViewPayload } from '@/lib/types';
import TradeList from '@/components/TradeList';
import SummaryPanel from '@/components/SummaryPanel';

const TradeChart = dynamic(() => import('@/components/TradeChart'), { ssr: false });

export default function StrategyView({ payload }: { payload: TradeViewPayload }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <main className="p-6 space-y-6 max-w-7xl mx-auto bg-zinc-950 min-h-screen text-zinc-100">
      <header>
        <h1 className="text-2xl font-bold">{payload.strategy_name}</h1>
        <div className="text-sm text-zinc-500 mt-1">
          {payload.instrument} · generated {payload.generated_utc}
        </div>
      </header>
      <SummaryPanel summary={payload.summary} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <TradeChart
            bars={payload.bars}
            trades={payload.trades}
            selectedTradeId={selectedId}
          />
        </div>
        <TradeList
          trades={payload.trades}
          selectedTradeId={selectedId}
          onSelect={setSelectedId}
        />
      </div>
    </main>
  );
}
