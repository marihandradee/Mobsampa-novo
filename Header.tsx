import { Search, MapPin } from 'lucide-react';
import { Regiao } from '../../../types';

interface HeaderProps {
  onSearch: (term: string) => void;
  onFilterRegiao: (regiao: Regiao | '') => void;
  onNavigate: (page: 'home' | 'anunciar') => void;
}

export default function Header({ onSearch, onFilterRegiao, onNavigate }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-gray-100">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-4">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 bg-anthracite rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <span className="text-2xl font-bold tracking-tight hidden sm:block">MobSampa</span>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl flex items-center bg-gray-100 rounded-full px-4 py-2 gap-3">
          <Search className="text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar por rua, bairro..." 
            className="bg-transparent border-none focus:ring-0 flex-1 text-sm outline-none"
            onChange={(e) => onSearch(e.target.value)}
          />
          <div className="h-6 w-[1px] bg-gray-300 hidden sm:block" />
          <div className="flex items-center gap-1 sm:px-2">
            <MapPin className="text-gray-400 w-4 h-4" />
            <select 
              className="bg-transparent border-none focus:ring-0 text-sm font-medium cursor-pointer outline-none"
              onChange={(e) => onFilterRegiao(e.target.value as Regiao | '')}
            >
              <option value="">Todas as Regiões</option>
              <option value="Centro">Centro</option>
              <option value="Leste">Zona Leste</option>
              <option value="Norte">Zona Norte</option>
              <option value="Oeste">Zona Oeste</option>
              <option value="Sul">Zona Sul</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="text-sm font-semibold hover:text-vibrant-red transition-colors hidden md:block">
            Sou Comprador
          </button>
          <button 
            onClick={() => onNavigate('anunciar')}
            className="btn-primary text-sm py-2 px-4 sm:px-6"
          >
            Anunciar Imóvel
          </button>
        </div>
      </div>
    </header>
  );
}
