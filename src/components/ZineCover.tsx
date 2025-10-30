import { Megaphone, Link2Off, Mic2 } from 'lucide-react';

export function ZineCover() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-8 noise-bg photocopy-texture">
      <div className="max-w-4xl w-full punk-border bg-black p-12 relative">
        <div className="absolute top-4 right-4 flex gap-2">
          <div className="w-2 h-2 bg-white rotate-45"></div>
          <div className="w-2 h-2 bg-white rotate-45"></div>
          <div className="w-2 h-2 bg-white rotate-45"></div>
        </div>

        <div className="text-center space-y-8">
          <div className="relative inline-block">
            <div className="flex justify-center items-center gap-8 mb-8">
              <Megaphone className="w-16 h-16 animate-pulse" strokeWidth={3} />
              <Link2Off className="w-20 h-20" strokeWidth={3} />
              <Mic2 className="w-16 h-16 animate-pulse" strokeWidth={3} />
            </div>
          </div>

          <h1
            className="text-6xl md:text-8xl font-black ransom-text leading-none mb-4"
            style={{
              transform: 'rotate(-1deg)',
              letterSpacing: '0.1em'
            }}
          >
            A PALAVRA
          </h1>

          <div className="flex items-center justify-center gap-4">
            <div className="h-1 w-20 bg-white"></div>
            <h2 className="text-4xl md:text-6xl font-black ransom-text">
              É ARMA
            </h2>
            <div className="h-1 w-20 bg-white"></div>
          </div>

          <div
            className="text-3xl md:text-5xl font-black ransom-text mt-8"
            style={{ transform: 'rotate(1deg)' }}
          >
            A LUTA NÃO CANSA
          </div>

          <div className="mt-12 flex justify-center gap-8">
            <a
              href="#manifestos"
              className="border-2 border-white px-6 py-3 hover:bg-white hover:text-black transition-colors cursor-pointer ransom-text text-sm inline-block"
            >
              LER MANIFESTOS
            </a>
            <a
              href="#publicar"
              className="border-2 border-white px-6 py-3 hover:bg-white hover:text-black transition-colors cursor-pointer ransom-text text-sm inline-block"
            >
              PUBLICAR
            </a>
          </div>

          <div className="mt-12 space-y-2 text-xs ransom-text opacity-70">
            <p>/// ZINE DIGITAL DE RESISTÊNCIA ///</p>
            <p>EDIÇÃO PERPÉTUA - ATÉ A MORTE</p>
          </div>
        </div>

        <div className="absolute bottom-4 left-4 text-xs ransom-text opacity-50">
          DIY OR DIE
        </div>

        <div
          className="absolute top-1/2 left-0 w-full h-0.5 bg-white opacity-10"
          style={{ transform: 'translateY(-50%) rotate(-2deg)' }}
        ></div>
      </div>
    </div>
  );
}
