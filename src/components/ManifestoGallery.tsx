import { useState, useEffect } from 'react';
import { db, Manifesto } from '../lib/dpaste';
import { ManifestoCard } from './ManifestoCard';
import { AlertCircle, Loader2 } from 'lucide-react';

export function ManifestoGallery() {
  const [manifestos, setManifestos] = useState<Manifesto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadManifestos();
  }, []);

  async function loadManifestos() {
    try {
      setLoading(true);
      const data = await db.listAll();
      setManifestos(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar manifestos');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center noise-bg">
        <Loader2 className="w-12 h-12 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center noise-bg p-8">
        <div className="punk-border bg-black p-8 max-w-md">
          <AlertCircle className="w-12 h-12 mb-4 mx-auto" />
          <p className="ransom-text text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black noise-bg photocopy-texture p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-black ransom-text mb-4">
            VOZES DA RESISTÊNCIA
          </h2>
          <div className="h-1 w-40 bg-white mx-auto"></div>
        </div>

        {manifestos.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl ransom-text opacity-70">
              NENHUM MANIFESTO AINDA. SEJA O PRIMEIRO A GRITAR!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {manifestos.map((manifesto) => (
              <ManifestoCard key={manifesto.id} manifesto={manifesto} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
