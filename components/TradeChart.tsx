'use client';
import { useEffect, useRef } from 'react';
import {
  createChart, CandlestickSeries, IChartApi, ISeriesApi,
  UTCTimestamp,
} from 'lightweight-charts';
import { Bar, Trade } from '@/lib/types';

interface Props {
  bars: Bar[];
  trades: Trade[];
  selectedTradeId: number | null;
}

export default function TradeChart({ bars, trades, selectedTradeId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const chart = createChart(containerRef.current, {
      width: containerRef.current.clientWidth,
      height: 500,
      layout: { background: { color: '#0a0a0a' }, textColor: '#d4d4d8' },
      grid: { vertLines: { color: '#27272a' }, horzLines: { color: '#27272a' } },
      timeScale: { timeVisible: true, secondsVisible: false },
      rightPriceScale: { borderColor: '#27272a' },
    });
    chartRef.current = chart;

    const series = chart.addSeries(CandlestickSeries, {
      upColor: '#22c55e',
      downColor: '#ef4444',
      borderUpColor: '#22c55e',
      borderDownColor: '#ef4444',
      wickUpColor: '#22c55e',
      wickDownColor: '#ef4444',
    });
    seriesRef.current = series;

    series.setData(bars.map(b => ({
      time: b.time as UTCTimestamp,
      open: b.open, high: b.high, low: b.low, close: b.close,
    })));

    const markers = trades.flatMap(t => [
      {
        time: t.entry_time as UTCTimestamp,
        position: (t.side === 'Long' ? 'belowBar' : 'aboveBar') as 'belowBar' | 'aboveBar',
        color: t.side === 'Long' ? '#22c55e' : '#ef4444',
        shape: (t.side === 'Long' ? 'arrowUp' : 'arrowDown') as 'arrowUp' | 'arrowDown',
        text: `#${t.trade_id}`,
      },
      {
        time: t.exit_time as UTCTimestamp,
        position: 'inBar' as const,
        color: t.pnl_usd > 0 ? '#22c55e' : '#ef4444',
        shape: 'circle' as const,
        text: `$${Math.round(t.pnl_usd)}`,
      },
    ]).sort((a, b) => (a.time as number) - (b.time as number));

    // Lightweight Charts v5: setMarkers moved to primitives plugin.
    // Cast to any for compatibility — markers may not render at runtime.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (series as any).setMarkers?.(markers);

    const onResize = () => {
      if (containerRef.current) chart.applyOptions({ width: containerRef.current.clientWidth });
    };
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      chart.remove();
    };
  }, [bars, trades]);

  // Zoom on selected trade
  useEffect(() => {
    if (!chartRef.current || selectedTradeId == null) return;
    const trade = trades.find(t => t.trade_id === selectedTradeId);
    if (!trade) return;
    const startBar = bars[trade.context_start_idx];
    const endBar = bars[trade.context_end_idx] ?? bars[bars.length - 1];
    if (!startBar || !endBar) return;
    chartRef.current.timeScale().setVisibleRange({
      from: startBar.time as UTCTimestamp,
      to: endBar.time as UTCTimestamp,
    });
  }, [selectedTradeId, bars, trades]);

  return <div ref={containerRef} className="w-full bg-zinc-950 rounded border border-zinc-800" />;
}
