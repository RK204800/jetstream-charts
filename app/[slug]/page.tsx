import { loadStrategy, listStrategies } from '@/lib/loadStrategy';
import StrategyView from './StrategyView';

export function generateStaticParams() {
  return listStrategies().map(slug => ({ slug }));
}

export default async function StrategyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = loadStrategy(slug);
  return <StrategyView payload={payload} />;
}
