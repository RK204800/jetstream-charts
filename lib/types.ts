export interface Bar {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface Trade {
  trade_id: number;
  entry_time: number;
  exit_time: number;
  side: 'Long' | 'Short';
  entry_price: number;
  exit_price: number;
  stop_price?: number | null;
  target_price?: number | null;
  qty: number;
  pnl_usd: number;
  rr_achieved?: number | null;
  regime_at_entry?: string | null;
  context_start_idx: number;
  context_end_idx: number;
}

export interface Summary {
  n_trades: number;
  win_rate: number;
  total_pnl_usd: number;
  biggest_winner_usd: number;
  biggest_loser_usd: number;
  avg_holding_minutes: number;
}

export interface TradeViewPayload {
  schema_version: number;
  strategy_slug: string;
  strategy_name: string;
  instrument: string;
  generated_utc: string;
  summary: Summary;
  bars: Bar[];
  trades: Trade[];
}
