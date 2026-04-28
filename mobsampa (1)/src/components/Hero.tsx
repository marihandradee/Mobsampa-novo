import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative h-[650px] flex items-center justify-center overflow-hidden bg-anthracite">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1920" 
          alt="Modern Real Estate Building" 
          className="w-full h-full object-cover opacity-60"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-transparent to-anthracite/40" />
      </div>
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-6 inline-block bg-vibrant-red/10 backdrop-blur-md border border-vibrant-red/20 px-4 py-1.5 rounded-full"
        >
          <span className="text-vibrant-red text-sm font-bold uppercase tracking-widest">Líder em SP</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 tracking-tight leading-[1.1]"
        >
          O novo jeito de morar em <span className="text-vibrant-red">São Paulo</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl mx-auto"
        >
          MobSampa é a imobiliária 100% online que simplifica sua busca pelo lar perfeito na maior metrópole do Brasil.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <button className="btn-primary text-lg px-8 py-4">
            Explorar Estoque
          </button>
        </motion.div>
      </div>
    </section>
  );
}
