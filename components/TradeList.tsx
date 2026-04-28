'use client';
import { Trade } from '@/lib/types';

interface Props {
  trades: Trade[];
  selectedTradeId: number | null;
  onSelect: (id: number) => void;
}

export default function TradeList({ trades, selectedTradeId, onSelect }: Props) {
  return (
    <div className="border border-zinc-800 rounded overflow-hidden bg-zinc-950">
      <div className="bg-zinc-900 px-3 py-2 text-sm font-semibold border-b border-zinc-800">
        Last {trades.length} Trades
      </div>
      <ul className="divide-y divide-zinc-800 max-h-[460px] overflow-y-auto">
        {trades.map(t => (
          <li
            key={t.trade_id}
            onClick={() => onSelect(t.trade_id)}
            className={`p-3 cursor-pointer hover:bg-zinc-900 transition-colors ${
              selectedTradeId === t.trade_id ? 'bg-zinc-800' : ''
            }`}
          >
            <div className="flex justify-between text-sm">
              <span className="font-medium">
                #{t.trade_id} {t.side}
              </span>
              <span className={t.pnl_usd > 0 ? 'text-green-400' : 'text-red-400'}>
                ${t.pnl_usd.toFixed(2)}
              </span>
            </div>
            <div className="text-xs text-zinc-500 mt-1">
              {new Date(t.entry_time * 1000).toUTCString()}
            </div>
            <div className="text-xs text-zinc-500">
              entry {t.entry_price} → exit {t.exit_price}
              {t.regime_at_entry && ` · ${t.regime_at_entry}`}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
