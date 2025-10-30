import { useState } from 'react';
import { db } from '../lib/dpaste';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export function SubmitForm() {
  const [titulo, setTitulo] = useState('');
  const [conteudo, setConteudo] = useState('');
  const [autor, setAutor] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!titulo.trim() || !conteudo.trim()) {
      setError('Título e conteúdo são obrigatórios!');
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const key = db.generateKey(titulo);
      await db.create(key, {
        id: '',
        titulo: titulo.trim(),
        conteudo: conteudo.trim(),
        autor: autor.trim() || 'Anônimo',
        created_at: Date.now(),
        approved: true,
      });

      setSuccess(true);
      setTitulo('');
      setConteudo('');
      setAutor('');

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao enviar manifesto');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-black noise-bg photocopy-texture p-8 flex items-center justify-center">
      <div className="max-w-3xl w-full punk-border bg-black p-8">
        <div className="mb-8 text-center">
          <h2 className="text-4xl font-black ransom-text mb-4">
            QUEBRE OS GRILÕES DA SUA PRÓPRIA VOZ
          </h2>
          <div className="h-1 w-32 bg-white mx-auto mb-4"></div>
          <p className="text-sm opacity-70">
            Seu manifesto será publicado instantaneamente. A palavra é arma, use com força.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm ransom-text mb-2">
              TÍTULO DO MANIFESTO *
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              className="w-full bg-black border-2 border-white px-4 py-3 ransom-text focus:outline-none focus:border-white focus:shadow-[4px_4px_0px_rgba(255,255,255,0.5)]"
              placeholder="EX: RESISTIR É EXISTIR"
              maxLength={100}
              disabled={submitting}
            />
          </div>

          <div>
            <label className="block text-sm ransom-text mb-2">
              SEU MANIFESTO *
            </label>
            <textarea
              value={conteudo}
              onChange={(e) => setConteudo(e.target.value)}
              className="w-full bg-black border-2 border-white px-4 py-3 ransom-text focus:outline-none focus:border-white focus:shadow-[4px_4px_0px_rgba(255,255,255,0.5)] min-h-[200px]"
              placeholder="Grite aqui sua dor, seu protesto, sua observação sobre o rumo desta sociedade..."
              maxLength={2000}
              disabled={submitting}
            />
            <div className="text-xs opacity-50 mt-1 text-right">
              {conteudo.length} / 2000
            </div>
          </div>

          <div>
            <label className="block text-sm ransom-text mb-2">
              NOME OU PSEUDÔNIMO (OPCIONAL)
            </label>
            <input
              type="text"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              className="w-full bg-black border-2 border-white px-4 py-3 ransom-text focus:outline-none focus:border-white focus:shadow-[4px_4px_0px_rgba(255,255,255,0.5)]"
              placeholder="Deixe em branco para 'Anônimo'"
              maxLength={50}
              disabled={submitting}
            />
          </div>

          {error && (
            <div className="punk-border bg-black p-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {success && (
            <div className="punk-border bg-black p-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm">
                MANIFESTO PUBLICADO COM SUCESSO!
              </span>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full border-2 border-white px-6 py-4 hover:bg-white hover:text-black transition-colors ransom-text text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>ENVIANDO...</>
            ) : (
              <>
                <Send className="w-5 h-5" />
                PUBLICAR MANIFESTO
              </>
            )}
          </button>

          <div className="text-xs text-center opacity-50 ransom-text">
            /// ATÉ A MORTE - A LUTA NÃO CANSA ///
          </div>
        </form>
      </div>
    </div>
  );
}
