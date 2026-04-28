import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';

export default function Home() {
  const dataDir = path.join(process.cwd(), 'public', 'data');
  let strategies: { slug: string; name: string }[] = [];
  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json') && !f.startsWith('_'));
    strategies = files.map(f => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(dataDir, f), 'utf-8'));
        return { slug: data.strategy_slug, name: data.strategy_name };
      } catch {
        return { slug: f.replace(/\.json$/, ''), name: f.replace(/\.json$/, '') };
      }
    });
  }
  return (
    <main className="p-8 max-w-3xl mx-auto bg-zinc-950 min-h-screen text-zinc-100">
      <h1 className="text-2xl font-bold mb-6">Jetstream Strategy Charts</h1>
      {strategies.length === 0 ? (
        <p className="text-zinc-500">No strategies loaded yet. Run the Python generator to populate <code>public/data/</code>.</p>
      ) : (
        <ul className="space-y-2">
          {strategies.map(s => (
            <li key={s.slug}>
              <Link href={`/${s.slug}/`} className="text-blue-400 hover:underline">
                {s.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
