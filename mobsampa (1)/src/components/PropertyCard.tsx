import { Train, Bus, ShoppingCart, Maximize2 } from 'lucide-react';
import { Imovel } from '../types';

interface PropertyCardProps {
  imovel: Imovel;
}

export default function PropertyCard({ imovel }: PropertyCardProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="card-modern group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imovel.foto_url} 
          alt={imovel.descricao} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            {imovel.tipo}
          </span>
          <span className="bg-vibrant-red text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            {imovel.modalidade}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-anthracite">
            {formatCurrency(imovel.valor)}
          </h3>
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <Maximize2 className="w-4 h-4" />
            <span>{imovel.metros_quadrados}m²</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-4 line-clamp-2">
          {imovel.descricao}
        </p>

        <div className="flex items-center gap-2 mb-4">
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-medium">
            {imovel.regiao}
          </span>
        </div>

        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
          {imovel.has_metro && (
            <div className="flex items-center gap-1 text-gray-400" title="Próximo ao Metrô">
              <Train className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase">Metrô</span>
            </div>
          )}
          {imovel.has_onibus && (
            <div className="flex items-center gap-1 text-gray-400" title="Próximo ao Ônibus">
              <Bus className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase">Bus</span>
            </div>
          )}
          {imovel.has_mercado && (
            <div className="flex items-center gap-1 text-gray-400" title="Próximo ao Mercado">
              <ShoppingCart className="w-4 h-4" />
              <span className="text-[10px] font-bold uppercase">Market</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
