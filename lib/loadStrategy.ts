import fs from 'node:fs';
import path from 'node:path';
import { TradeViewPayload } from './types';

export function loadStrategy(slug: string): TradeViewPayload {
  const file = path.join(process.cwd(), 'public', 'data', `${slug}.json`);
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as TradeViewPayload;
}

export function listStrategies(): string[] {
  const dir = path.join(process.cwd(), 'public', 'data');
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir)
    .filter(f => f.endsWith('.json') && !f.startsWith('_'))
    .map(f => f.replace(/\.json$/, ''));
}
