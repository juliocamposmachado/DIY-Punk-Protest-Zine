import { useState } from 'react';
import { ZineCover } from './components/ZineCover';
import { ManifestoGallery } from './components/ManifestoGallery';
import { SubmitForm } from './components/SubmitForm';
import { BookOpen, PenTool, Home } from 'lucide-react';

type Page = 'cover' | 'gallery' | 'submit';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('cover');

  return (
    <div className="min-h-screen bg-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black border-b-2 border-white noise-bg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="ransom-text text-xl">
              A PALAVRA É ARMA
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setCurrentPage('cover')}
                className={`px-4 py-2 border-2 transition-colors ransom-text text-sm flex items-center gap-2 ${
                  currentPage === 'cover'
                    ? 'bg-white text-black border-white'
                    : 'border-white hover:bg-white hover:text-black'
                }`}
              >
                <Home className="w-4 h-4" />
                CAPA
              </button>
              <button
                onClick={() => setCurrentPage('gallery')}
                className={`px-4 py-2 border-2 transition-colors ransom-text text-sm flex items-center gap-2 ${
                  currentPage === 'gallery'
                    ? 'bg-white text-black border-white'
                    : 'border-white hover:bg-white hover:text-black'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                MANIFESTOS
              </button>
              <button
                onClick={() => setCurrentPage('submit')}
                className={`px-4 py-2 border-2 transition-colors ransom-text text-sm flex items-center gap-2 ${
                  currentPage === 'submit'
                    ? 'bg-white text-black border-white'
                    : 'border-white hover:bg-white hover:text-black'
                }`}
              >
                <PenTool className="w-4 h-4" />
                PUBLICAR
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {currentPage === 'cover' && <ZineCover />}
        {currentPage === 'gallery' && <ManifestoGallery />}
        {currentPage === 'submit' && <SubmitForm />}
      </div>

      <footer className="border-t-2 border-white bg-black noise-bg py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-xs ransom-text opacity-70">
            /// ZINE DIGITAL DE RESISTÊNCIA - EDIÇÃO PERPÉTUA ///
          </p>
          <p className="text-xs ransom-text opacity-50 mt-2">
            DIY OR DIE - RESISTIR É EXISTIR - ATÉ A MORTE
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
