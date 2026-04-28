import { Summary } from '@/lib/types';

export default function SummaryPanel({ summary }: { summary: Summary }) {
  const items = [
    ['Trades', summary.n_trades.toString()],
    ['Win rate', `${(summary.win_rate * 100).toFixed(0)}%`],
    ['Total P&L', `$${summary.total_pnl_usd.toFixed(2)}`],
    ['Biggest winner', `$${summary.biggest_winner_usd.toFixed(2)}`],
    ['Biggest loser', `$${summary.biggest_loser_usd.toFixed(2)}`],
    ['Avg hold', `${summary.avg_holding_minutes}m`],
  ];
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {items.map(([label, value]) => (
        <div key={label} className="bg-zinc-900 border border-zinc-800 rounded p-3">
          <div className="text-xs text-zinc-500 uppercase tracking-wide">{label}</div>
          <div className="text-lg mt-1">{value}</div>
        </div>
      ))}
    </div>
  );
}
