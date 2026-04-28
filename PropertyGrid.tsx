import { Imovel } from '../../../types';
import PropertyCard from './PropertyCard';
import { motion } from 'motion/react';

interface PropertyGridProps {
  imoveis: Imovel[];
  loading: boolean;
}

export default function PropertyGrid({ imoveis, loading }: PropertyGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 h-64 rounded-xl mb-4" />
            <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-full mb-2" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (imoveis.length === 0) {
    return (
      <div className="text-center py-20">
        <h3 className="text-2xl font-bold text-gray-400">Nenhum imóvel encontrado nesta região.</h3>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
      {imoveis.map((imovel, index) => (
        <motion.div
          key={imovel.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <PropertyCard imovel={imovel} />
        </motion.div>
      ))}
    </div>
  );
}
