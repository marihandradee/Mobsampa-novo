import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import { Imovel, ImovelFormData, Regiao } from '../../types';
import Header from './components/Header';
import Hero from './components/Hero';
import PropertyGrid from './components/PropertyGrid';
import PropertyForm from './components/PropertyForm';
import { Building2, ShieldCheck, Zap, AlertCircle, Settings } from 'lucide-react';

export default function App() {
  const [imoveis, setImoveis] = useState<Imovel[]>([]);
  const [filteredImoveis, setFilteredImoveis] = useState<Imovel[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<'home' | 'anunciar'>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegiao, setSelectedRegiao] = useState<Regiao | ''>('');

  const fetchImoveis = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('imoveis')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setImoveis(data || []);
      setFilteredImoveis(data || []);
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImoveis();
  }, [fetchImoveis]);

  useEffect(() => {
    let result = imoveis;

    if (selectedRegiao) {
      result = result.filter(i => i.regiao === selectedRegiao);
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(i => 
        i.descricao.toLowerCase().includes(term) || 
        i.tipo.toLowerCase().includes(term) ||
        i.regiao.toLowerCase().includes(term)
      );
    }

    setFilteredImoveis(result);
  }, [searchTerm, selectedRegiao, imoveis]);

  const cadastrarImovel = async (data: ImovelFormData) => {
    if (!isSupabaseConfigured) return;
    
    const { error } = await supabase
      .from('imoveis')
      .insert([data]);

    if (error) throw error;
    await fetchImoveis();
  };

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-vibrant-orange/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Settings className="text-vibrant-orange w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Configuração Necessária</h1>
          <p className="text-gray-600 mb-8">
            Para que a MobSampa funcione, você precisa configurar as chaves do Supabase no painel de <strong>Secrets</strong>.
          </p>
          <div className="space-y-4 text-left bg-gray-50 p-4 rounded-lg mb-8">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-vibrant-orange shrink-0 mt-0.5" />
              <code className="text-xs font-mono">VITE_SUPABASE_URL</code>
            </div>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-vibrant-orange shrink-0 mt-0.5" />
              <code className="text-xs font-mono">VITE_SUPABASE_ANON_KEY</code>
            </div>
          </div>
          <p className="text-sm text-gray-500">
            Após adicionar as chaves, a aplicação carregará automaticamente.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header 
        onSearch={setSearchTerm}
        onFilterRegiao={setSelectedRegiao}
        onNavigate={setCurrentPage}
      />

      {currentPage === 'home' ? (
        <main>
          <Hero />
          
          {/* About Us Section */}
          <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher a MobSampa?</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">Reinventamos o mercado imobiliário paulistano com tecnologia e transparência.</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                    <Zap className="text-vibrant-red w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">100% Online</h3>
                  <p className="text-gray-500">Desde a visita virtual até a assinatura do contrato, tudo sem sair de casa.</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                    <Building2 className="text-vibrant-red w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Estoque Curado</h3>
                  <p className="text-gray-500">Os melhores imóveis nas regiões mais estratégicas de São Paulo.</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6">
                    <ShieldCheck className="text-vibrant-red w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">Segurança Total</h3>
                  <p className="text-gray-500">Processos validados juridicamente para garantir sua tranquilidade.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Property Grid Section */}
          <section className="max-w-7xl mx-auto px-4 py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-2">Imóveis Disponíveis</h2>
                <p className="text-gray-500">Explore as melhores oportunidades em {selectedRegiao || 'São Paulo'}.</p>
              </div>
              <div className="text-sm font-medium text-gray-400">
                {filteredImoveis.length} {filteredImoveis.length === 1 ? 'imóvel encontrado' : 'imóveis encontrados'}
              </div>
            </div>
            
            <PropertyGrid 
              imoveis={filteredImoveis} 
              loading={loading} 
            />
          </section>
        </main>
      ) : (
        <PropertyForm 
          onSubmit={cadastrarImovel} 
          onBack={() => setCurrentPage('home')} 
        />
      )}

      <footer className="bg-anthracite text-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-anthracite font-bold">M</span>
            </div>
            <span className="text-xl font-bold">MobSampa</span>
          </div>
          
          <div className="text-gray-400 text-sm">
            © 2024 MobSampa Imobiliária Digital. Todos os direitos reservados.
          </div>
          
          <div className="flex gap-6 text-sm font-medium">
            <a href="#" className="hover:text-vibrant-red transition-colors">Termos</a>
            <a href="#" className="hover:text-vibrant-red transition-colors">Privacidade</a>
            <a href="#" className="hover:text-vibrant-red transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
