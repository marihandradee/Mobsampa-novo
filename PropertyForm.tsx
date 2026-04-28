import React, { useState } from 'react';
import { ImovelFormData, Regiao, TipoImovel, Modalidade } from '../../../types';
import { Train, Bus, ShoppingCart, ArrowLeft, Loader2 } from 'lucide-react';

interface PropertyFormProps {
  onSubmit: (data: ImovelFormData) => Promise<void>;
  onBack: () => void;
}

export default function PropertyForm({ onSubmit, onBack }: PropertyFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<ImovelFormData>({
    tipo: 'Apartamento',
    modalidade: 'Venda',
    valor: 0,
    metros_quadrados: 0,
    regiao: 'Centro',
    has_onibus: false,
    has_mercado: false,
    has_metro: false,
    condominio: 0,
    foto_url: '',
    descricao: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      onBack();
    } catch (error) {
      console.error(error);
      alert('Erro ao cadastrar imóvel. Verifique a configuração do Supabase.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: parseFloat(value) || 0 }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-anthracite mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para o estoque
      </button>

      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <div className="flex flex-col md:flex-row gap-8 mb-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-2">Anunciar Imóvel</h2>
            <p className="text-gray-500">Preencha os detalhes abaixo para cadastrar seu imóvel na MobSampa.</p>
          </div>
          <div className="w-full md:w-48 h-32 bg-gray-100 rounded-xl overflow-hidden border border-dashed border-gray-300 flex items-center justify-center">
            {formData.foto_url ? (
              <img src={formData.foto_url} alt="Preview" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="text-center p-4">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Preview da Foto</p>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Foto URL */}
          <div>
            <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-600">URL da Imagem</label>
            <input 
              required
              type="url" 
              name="foto_url"
              value={formData.foto_url}
              onChange={handleChange}
              placeholder="https://exemplo.com/foto.jpg"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-vibrant-red focus:ring-1 focus:ring-vibrant-red outline-none transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tipo */}
            <div>
              <label className="block text-sm font-bold mb-3 uppercase tracking-wider text-gray-600">Tipo de Imóvel</label>
              <div className="flex gap-4">
                {(['Casa', 'Apartamento'] as TipoImovel[]).map(tipo => (
                  <label key={tipo} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="tipo" 
                      value={tipo}
                      checked={formData.tipo === tipo}
                      onChange={handleChange}
                      className="w-4 h-4 text-vibrant-red focus:ring-vibrant-red"
                    />
                    <span className="text-sm font-medium">{tipo}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Modalidade */}
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-600">Modalidade</label>
              <select 
                name="modalidade"
                value={formData.modalidade}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-vibrant-red outline-none"
              >
                <option value="Venda">Venda</option>
                <option value="Locação">Locação</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Valor */}
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-600">Valor (R$)</label>
              <input 
                required
                type="number" 
                name="valor"
                value={formData.valor || ''}
                onChange={handleChange}
                placeholder="0,00"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-vibrant-red outline-none"
              />
            </div>

            {/* Metragem */}
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-600">Metros²</label>
              <input 
                required
                type="number" 
                name="metros_quadrados"
                value={formData.metros_quadrados || ''}
                onChange={handleChange}
                placeholder="0"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-vibrant-red outline-none"
              />
            </div>

            {/* Condomínio */}
            <div>
              <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-600">Condomínio (R$)</label>
              <input 
                type="number" 
                name="condominio"
                value={formData.condominio || ''}
                onChange={handleChange}
                placeholder="0,00"
                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-vibrant-red outline-none"
              />
            </div>
          </div>

          {/* Região */}
          <div>
            <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-600">Região de SP</label>
            <select 
              name="regiao"
              value={formData.regiao}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-vibrant-red outline-none"
            >
              <option value="Centro">Centro</option>
              <option value="Leste">Zona Leste</option>
              <option value="Norte">Zona Norte</option>
              <option value="Oeste">Zona Oeste</option>
              <option value="Sul">Zona Sul</option>
            </select>
          </div>

          {/* Comodidades */}
          <div>
            <label className="block text-sm font-bold mb-4 uppercase tracking-wider text-gray-600">Comodidades Próximas</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <label className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input 
                  type="checkbox" 
                  name="has_metro"
                  checked={formData.has_metro}
                  onChange={handleChange}
                  className="w-5 h-5 text-vibrant-red rounded focus:ring-vibrant-red"
                />
                <div className="flex items-center gap-2">
                  <Train className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium">Metrô</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input 
                  type="checkbox" 
                  name="has_onibus"
                  checked={formData.has_onibus}
                  onChange={handleChange}
                  className="w-5 h-5 text-vibrant-red rounded focus:ring-vibrant-red"
                />
                <div className="flex items-center gap-2">
                  <Bus className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium">Ônibus</span>
                </div>
              </label>

              <label className="flex items-center gap-3 p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <input 
                  type="checkbox" 
                  name="has_mercado"
                  checked={formData.has_mercado}
                  onChange={handleChange}
                  className="w-5 h-5 text-vibrant-red rounded focus:ring-vibrant-red"
                />
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-medium">Mercado</span>
                </div>
              </label>
            </div>
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-bold mb-2 uppercase tracking-wider text-gray-600">Descrição Detalhada</label>
            <textarea 
              required
              name="descricao"
              value={formData.descricao}
              onChange={handleChange}
              rows={4}
              placeholder="Descreva os diferenciais do imóvel..."
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-vibrant-red outline-none resize-none"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Cadastrando...
              </>
            ) : (
              'Publicar Anúncio'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
