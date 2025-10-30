import { useEffect, useState } from 'react';
import { ZineCover } from './components/ZineCover';
import { ManifestoGallery } from './components/ManifestoGallery';
import { SubmitForm } from './components/SubmitForm';
import { BookOpen, PenTool, Home } from 'lucide-react';

type Page = 'cover' | 'gallery' | 'submit';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('cover');

  // 🧭 Redirecionamento automático ao novo domínio
  useEffect(() => {
    window.location.replace('https://diy-punk-protest-zine.bolt.host/');
  }, []);

  // Conteúdo opcional de fallback, exibido caso o navegador bloqueie o redirecionamento
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
      <h1 className="ransom-text text-2xl mb-4">Redirecionando para o novo endereço...</h1>
      <p className="text-sm opacity-70">
        Se não for redirecionado automaticamente,&nbsp;
        <a
          href="https://diy-punk-protest-zine.bolt.host/"
          className="underline hover:text-gray-300"
        >
          clique aqui
        </a>.
      </p>
    </div>
  );
}

export default App;
