import { Manifesto } from '../lib/dpaste';
import { Calendar, User } from 'lucide-react';

interface ManifestoCardProps {
  manifesto: Manifesto;
}

export function ManifestoCard({ manifesto }: ManifestoCardProps) {
  const formattedDate = new Date(manifesto.created_at).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  return (
    <div className="punk-border bg-black p-6 photocopy-texture hover:scale-[1.02] transition-transform">
      <div className="mb-4">
        <h3 className="text-2xl font-black ransom-text mb-2 leading-tight">
          {manifesto.titulo}
        </h3>
        <div className="flex gap-4 text-xs opacity-70">
          <div className="flex items-center gap-1">
            <User className="w-3 h-3" />
            <span>{manifesto.autor}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{formattedDate}</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="h-0.5 w-full bg-white opacity-20 mb-4"></div>
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {manifesto.conteudo}
        </p>
      </div>

      <div className="mt-4 flex justify-end">
        <div className="text-xs ransom-text opacity-50">
          /// RESISTIR É EXISTIR ///
        </div>
      </div>
    </div>
  );
}
