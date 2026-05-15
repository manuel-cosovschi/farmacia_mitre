import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, Phone, MapPin, Clock, Instagram, Facebook, MessageCircle,
  Stethoscope, ShieldCheck, Zap, ArrowRight, ShoppingCart, Search,
  Plus, Minus, Trash2, Heart, Award, RefreshCw, XCircle, Info
} from 'lucide-react';

/* 
  Future integration point: products can be loaded from CSV/API exported 
  from Touch&Sale or another billing/inventory system.
  Presently hardcoded for frontend showcase.
*/
const PRODUCT_DATA = [
  // Proteínas
  { id: 1, category: 'Proteínas', name: 'Whey Protein Chocolate', brand: 'Star Nutrition', description: 'Proteína de suero de leche sabor chocolate, ideal para recuperación muscular post-entrenamiento.', price: '$ 45.000', priceNumeric: 45000, img: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 2, category: 'Proteínas', name: 'Whey Protein Vainilla', brand: 'ENA Sport', description: 'Proteína premium sabor vainilla. 25g de proteína pura por servicio.', price: '$ 42.500', priceNumeric: 42500, img: 'https://images.unsplash.com/photo-1579722820308-d74e571900a9?auto=format&fit=crop&w=500&q=80', stock: 'Poco stock' },
  { id: 3, category: 'Proteínas', name: 'Proteína Isolate', brand: 'Gold Nutrition', description: 'Proteína aislada de máxima pureza, cero carbohidratos, máxima absorción.', price: '$ 58.000', priceNumeric: 58000, img: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 4, category: 'Proteínas', name: 'Protein Blend', brand: 'BSN', description: 'Mezcla de proteínas de rápida y lenta absorción para nutrición constante.', price: '$ Consultar', priceNumeric: 0, img: 'https://images.unsplash.com/photo-1616651239851-f76ea10dfa3a?auto=format&fit=crop&w=500&q=80', stock: 'Consultar stock' },
  // Creatinas
  { id: 5, category: 'Creatinas', name: 'Creatina Monohidratada', brand: 'Star Nutrition', description: '100% creatina pura para mayor fuerza, potencia y rendimiento.', price: '$ 22.000', priceNumeric: 22000, img: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 6, category: 'Creatinas', name: 'Creatina Micronizada', brand: 'ENA Sport', description: 'Absorción ultra rápida para mejores resultados en el mínimo tiempo.', price: '$ 25.000', priceNumeric: 25000, img: 'https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 7, category: 'Creatinas', name: 'Creatina Saborizada', brand: 'Gentech', description: 'Creatina con sabor a fruit punch, fácil y deliciosa de disolver.', price: '$ 26.500', priceNumeric: 26500, img: 'https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&w=500&q=80', stock: 'Poco stock' },
  { id: 8, category: 'Creatinas', name: 'Creatina Premium', brand: 'Universal', description: 'Creatina de grado farmacéutico importada, sello Creapure.', price: '$ Consultar', priceNumeric: 0, img: 'https://images.unsplash.com/photo-1579722822143-2616f73db1b3?auto=format&fit=crop&w=500&q=80', stock: 'Consultar stock' },
  // Pre-entrenos
  { id: 9, category: 'Pre-entrenos', name: 'Pre Workout Energy', brand: 'Star Nutrition', description: 'Energía explosiva y concentración para tus entrenamientos más intensos.', price: '$ 35.000', priceNumeric: 35000, img: 'https://images.unsplash.com/photo-1647427017013-0599cf0622c8?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 10, category: 'Pre-entrenos', name: 'Pre Workout Pump', brand: 'ENA Sport', description: 'Mayor bombeo muscular y vascularización extrema sin estimulantes.', price: '$ 33.500', priceNumeric: 33500, img: 'https://images.unsplash.com/photo-1648083838407-7e61ea70a599?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 11, category: 'Pre-entrenos', name: 'Fórmula Pre Entrenamiento', brand: 'Cellucor', description: 'Fama mundial por su efecto inmediato y prolongado.', price: '$ Consultar', priceNumeric: 0, img: 'https://images.unsplash.com/photo-1552689486-f6773047d89f?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 12, category: 'Pre-entrenos', name: 'Cafeína + Energía', brand: 'Gentech', description: 'Cápsulas de cafeína pura para un impulso rápido.', price: '$ 15.000', priceNumeric: 15000, img: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  // Aminoácidos
  { id: 13, category: 'Aminoácidos', name: 'BCAA 2:1:1', brand: 'Star Nutrition', description: 'Aminoácidos ramificados para evitar la fatiga y promover recuperación.', price: '$ 18.500', priceNumeric: 18500, img: 'https://images.unsplash.com/photo-1621570277341-35b1d4410e30?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 14, category: 'Aminoácidos', name: 'EAA Essential', brand: 'ENA Sport', description: 'Aminoácidos esenciales completos para soporte anabólico total.', price: '$ 21.000', priceNumeric: 21000, img: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 15, category: 'Aminoácidos', name: 'Glutamina Micronizada', brand: 'Nutrilab', description: 'Recuperación profunda del sistema inmune y digestivo.', price: '$ 16.000', priceNumeric: 16000, img: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 16, category: 'Aminoácidos', name: 'Recovery Amino Blend', brand: 'Xtend', description: 'Fórmula hidratante con electrolitos de máxima eficacia.', price: '$ Consultar', priceNumeric: 0, img: 'https://images.unsplash.com/photo-1600857948687-cc59aeb42323?auto=format&fit=crop&w=500&q=80', stock: 'Consultar stock' },
  // Vitaminas y bienestar
  { id: 17, category: 'Vitaminas', name: 'Multivitamínico Sport', brand: 'Centrum', description: 'Complejo de vitaminas y minerales para exigencias altas.', price: '$ 12.000', priceNumeric: 12000, img: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 18, category: 'Vitaminas', name: 'Magnesio Total', brand: 'Natufarma', description: 'Ideal para prevenir calambres y relajar musculatura.', price: '$ 9.500', priceNumeric: 9500, img: 'https://images.unsplash.com/photo-1640536417724-4ea0d6b63ca5?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 19, category: 'Vitaminas', name: 'Omega 3 Triple', brand: 'Fish Oil', description: 'Apoyo fundamental para salud cardiovascular y articular.', price: '$ 14.500', priceNumeric: 14500, img: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 20, category: 'Vitaminas', name: 'Vitamina D3 5000 IU', brand: 'Solaray', description: 'Fijación de calcio y soporte al sistema inmunitario.', price: '$ 11.000', priceNumeric: 11000, img: 'https://images.unsplash.com/photo-1584308666744-24d5e4b2d3af?auto=format&fit=crop&w=500&q=80', stock: 'Poco stock' },
  // Accesorios fitness
  { id: 21, category: 'Accesorios', name: 'Shaker Pro', brand: 'Star Nutrition', description: 'Vaso batidor con compartimento inferior para polvo, 600ml.', price: '$ 5.500', priceNumeric: 5500, img: 'https://images.unsplash.com/photo-1563223771-6c19f5068de4?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 22, category: 'Accesorios', name: 'Pastillero Deportivo', brand: 'Genérico', description: 'Pastillero rotativo semanal de 7 días, muy seguro.', price: '$ 3.200', priceNumeric: 3200, img: 'https://images.unsplash.com/photo-1585435421671-0c16764628ce?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 23, category: 'Accesorios', name: 'Bandas Elásticas Set', brand: 'ProFit', description: 'Set de 3 bandas de distintas resistencias para entrenar en casa.', price: '$ 8.900', priceNumeric: 8900, img: 'https://images.unsplash.com/photo-1598136490937-f77b0ce520fe?auto=format&fit=crop&w=500&q=80', stock: 'Disponible' },
  { id: 24, category: 'Accesorios', name: 'Botella Deportiva Inox', brand: 'TermoFit', description: 'Acero inoxidable, mantiene el frío por 12hs. Capacidad 750ml.', price: '$ 22.000', priceNumeric: 22000, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=500&q=80', stock: 'Poco stock' },
];

const CATEGORIES = ['Todos', 'Proteínas', 'Creatinas', 'Pre-entrenos', 'Aminoácidos', 'Vitaminas', 'Accesorios'];

interface CartItem {
  product: typeof PRODUCT_DATA[0];
  quantity: number;
}

// --- Logo Component ---
const Logo = () => (
  <div className="flex items-center gap-2 select-none group cursor-pointer">
    <div className="relative flex items-center justify-center w-12 h-12">
      <Plus size={44} strokeWidth={3.5} className="text-pharma-primary absolute drop-shadow-sm group-hover:scale-105 transition-transform" />
      <span className="font-heading font-black text-pharma-accent text-xl relative z-10 group-hover:scale-105 transition-transform" style={{WebkitTextStroke: '1.5px white'}}>24</span>
    </div>
    <div className="flex flex-col -ml-1">
      <span className="font-heading font-bold text-xl leading-none text-pharma-dark drop-shadow-sm tracking-tight">farmacia</span>
      <span className="font-heading font-bold text-lg leading-none text-pharma-dark tracking-tight" style={{textShadow: '0 1px 1px rgba(0,0,0,0.1)'}}>mitre</span>
    </div>
  </div>
);

// --- Header Component ---
const Navbar = ({ cartCount, onOpenCart }: { cartCount: number, onOpenCart: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Catálogo', href: '#catalogo' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-white/80 backdrop-blur-sm py-4 border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo />

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-bold text-gray-700 hover:text-pharma-primary transition-colors tracking-wide">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <button onClick={onOpenCart} className="relative p-2 text-pharma-dark hover:bg-pharma-light rounded-full transition-colors flex items-center justify-center">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center bg-pharma-accent text-white text-[10px] font-bold h-5 w-5 rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <a href="https://wa.me/5492230000000" target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-pharma-primary text-white px-5 py-2.5 rounded-full font-bold hover:bg-pharma-dark transition-colors shadow-lg shadow-pharma-primary/20">
              <MessageCircle size={18} />
              Consultar
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <button onClick={onOpenCart} className="relative p-2 text-pharma-dark hover:bg-pharma-light rounded-full transition-colors flex items-center justify-center">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center bg-pharma-accent text-white text-[10px] font-bold h-5 w-5 rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-pharma-dark bg-gray-100 rounded-md">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg absolute w-full"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-3 text-base font-bold text-gray-800 hover:bg-pharma-light hover:text-pharma-dark rounded-xl">
                  {link.name}
                </a>
              ))}
              <a href="https://wa.me/5492230000000" target="_blank" rel="noreferrer" className="mt-4 flex w-full items-center justify-center gap-2 bg-pharma-primary text-white px-5 py-3 rounded-xl font-bold shadow-md">
                <MessageCircle size={20} />
                Consultar por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Hero Section ---
const Hero = () => {
  return (
    <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-pharma-bg">
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(var(--color-pharma-primary) 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pharma-light text-pharma-dark text-sm font-bold mb-6 border border-pharma-primary/20">
              <span className="text-pharma-primary"><ShieldCheck size={16} /></span>
              Farmacia & Tienda Online
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading text-pharma-dark leading-tight mb-6 tracking-tight">
              Suplementos deportivos y productos de farmacia
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed font-medium">
              Consultá stock, precios y disponibilidad por WhatsApp. Atención rápida, asesoramiento profesional y los mejores productos de Mar del Plata.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#catalogo" className="flex items-center justify-center gap-2 bg-pharma-primary text-white px-8 py-4 rounded-full font-bold hover:bg-pharma-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                Ver suplementos
              </a>
              <a href="#catalogo" className="flex items-center justify-center gap-2 bg-white text-pharma-dark border-2 border-gray-200 px-8 py-4 rounded-full font-bold hover:border-pharma-primary hover:text-pharma-primary transition-colors shadow-sm">
                Armar pedido
              </a>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="relative hidden lg:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-pharma-primary/20 to-pharma-light rounded-[3rem] transform rotate-3 scale-105 -z-10"></div>
            <img src="https://images.unsplash.com/photo-1593095948071-474c5cc2989d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Suplementos deportivos" className="rounded-[3rem] shadow-2xl object-cover h-[500px] w-full border-4 border-white" />
            
            {/* Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-4 border border-gray-100">
              <div className="bg-pharma-light p-3 rounded-full text-pharma-primary">
                <Zap size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Energía y Recuperación</p>
                <p className="text-xs text-gray-500 font-medium">Marcas top nacionales e importadas</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Trust Features ---
const TrustFeatures = () => {
  const features = [
    { title: 'Atención farmacéutica', desc: 'Asesoramiento profesional.', icon: <Stethoscope size={24} /> },
    { title: 'Productos testeados', desc: 'Garantía de originalidad.', icon: <Award size={24} /> },
    { title: 'Consulta rápida vía Web', desc: 'WhatsApp directo.', icon: <MessageCircle size={24} /> },
    { title: 'Retiro 24 Horas', desc: 'Comodidad total en el local.', icon: <Clock size={24} /> },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 p-4 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="bg-pharma-light p-3 rounded-full text-pharma-primary mb-2 shadow-sm">{f.icon}</div>
              <span className="font-bold text-gray-900">{f.title}</span>
              <span className="text-xs text-gray-500">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Catalog Section ---
const Catalog = ({ onAddToCart, onShowModal }: { onAddToCart: (p: typeof PRODUCT_DATA[0]) => void, onShowModal: (p: typeof PRODUCT_DATA[0]) => void }) => {
  const [activeTab, setActiveTab] = useState('Todos');
  const [search, setSearch] = useState('');

  const filteredProducts = useMemo(() => {
    return PRODUCT_DATA.filter(p => {
      const matchCat = activeTab === 'Todos' || p.category === activeTab;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.brand.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [activeTab, search]);

  return (
    <section id="catalogo" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block bg-pharma-accent/10 text-pharma-accent font-bold px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-4">Catálogo Online</span>
          <h2 className="text-3xl md:text-5xl font-bold font-heading text-pharma-dark mb-4">Suplementos Deportivos</h2>
          <p className="text-gray-600 text-lg">Elegí lo que tu cuerpo necesita y armá tu pedido en segundos.</p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-10 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Search size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Buscar suplemento, marca o categoría..." 
            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pharma-primary focus:border-transparent shadow-sm text-gray-700 font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all ${
                activeTab === tab 
                  ? 'bg-pharma-dark text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
             <div className="inline-flex bg-gray-100 p-4 rounded-full text-gray-400 mb-4"><Search size={32}/></div>
             <h3 className="text-xl font-bold text-gray-700">No encontramos productos</h3>
             <p className="text-gray-500 mt-2">Intentá con otra búsqueda o categoría.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  key={product.id}
                  onClick={() => onShowModal(product)}
                  className="bg-white rounded-[2rem] p-5 border border-gray-100 shadow-sm hover:shadow-xl transition-all group flex flex-col justify-between cursor-pointer"
                >
                  <div>
                    <div className="relative aspect-square mb-5 bg-gray-50/50 rounded-2xl overflow-hidden flex items-center justify-center p-6">
                      <img src={product.img} alt={product.name} className="object-contain h-full w-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500 will-change-transform" />
                      <div className="absolute top-3 right-3 flex space-x-1">
                        <span className={`text-[10px] font-bold px-2 py-1.5 rounded-lg shadow-sm border ${product.stock === 'Disponible' ? 'bg-white text-pharma-primary border-pharma-light' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                          {product.stock}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-pharma-primary uppercase tracking-wider mb-1.5">{product.brand}</p>
                      <h4 className="font-bold text-gray-900 leading-tight mb-2 min-h-[2.5rem] line-clamp-2">{product.name}</h4>
                      <p className="font-heading font-black text-2xl text-gray-900 mb-4">
                        {product.price}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col gap-2 mt-auto">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                      className="w-full flex items-center justify-center gap-2 bg-gray-900 hover:bg-pharma-primary text-white py-3 rounded-xl font-bold transition-colors"
                    >
                      <Plus size={18} /> Agregar al pedido
                    </button>
                    <a 
                      href={`https://wa.me/5492230000000?text=Hola Farmacia Mitre, me interesa este producto visto en su catálogo web:%0A%0A*${product.name}* (${product.brand})%0A*Precio web:* ${product.price}%0A%0A¿Tienen disponibilidad para retirar?`} 
                      target="_blank" 
                      rel="noreferrer" 
                      onClick={(e) => e.stopPropagation()}
                      className="w-full flex items-center justify-center gap-2 bg-pharma-light hover:bg-[#25D366] text-pharma-dark hover:text-white py-3 rounded-xl font-bold transition-colors"
                    >
                      <MessageCircle size={18} /> Consultar
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

// --- Product Modal ---
const ProductModal = ({ product, onClose, onAddToCart }: { product: typeof PRODUCT_DATA[0] | null, onClose: () => void, onAddToCart: (p: typeof PRODUCT_DATA[0]) => void }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full overflow-hidden relative flex flex-col md:flex-row"
        >
          <button onClick={onClose} className="absolute top-4 right-4 z-10 w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full flex items-center justify-center transition-colors">
            <X size={20} />
          </button>
          
          <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 md:p-12 min-h-[300px]">
             <img src={product.img} alt={product.name} className="w-full h-auto object-contain mix-blend-multiply drop-shadow-xl" />
          </div>
          
          <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <span className="inline-block bg-pharma-light text-pharma-primary font-bold px-3 py-1 rounded-lg text-xs tracking-widest uppercase mb-4 w-fit">
              {product.category}
            </span>
            <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">{product.brand}</p>
            <h3 className="text-3xl font-heading font-black text-gray-900 leading-tight mb-4">{product.name}</h3>
            
            <p className="text-gray-600 mb-6 font-medium leading-relaxed">
              {product.description}
            </p>
            
            <div className="flex items-end gap-3 mb-8">
               <span className="text-4xl font-black font-heading text-pharma-dark">{product.price}</span>
            </div>

            <div className="flex items-center gap-3 mb-8 text-sm font-bold border-t border-b border-gray-100 py-4">
              <div className="flex items-center gap-2 text-pharma-primary"><CheckCircle2 size={18}/> {product.stock}</div>
              <div className="w-px h-4 bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-600"><Clock size={18}/> Retiro 24hs</div>
            </div>
            
            <div className="flex flex-col gap-3 mt-auto">
              <button 
                onClick={() => { onAddToCart(product); onClose(); }}
                className="w-full flex items-center justify-center gap-2 bg-pharma-primary hover:bg-pharma-dark text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-pharma-primary/20"
              >
                <ShoppingCart size={20} /> Agregar al pedido
              </button>
               <a 
                  href={`https://wa.me/5492230000000?text=Hola, necesito asesoramiento rápido sobre este producto de la web:%0A*${product.name}*`}
                  target="_blank" rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-200 hover:border-[#25D366] hover:text-[#25D366] text-gray-700 py-3.5 rounded-xl font-bold transition-colors"
                >
                  <MessageCircle size={20} /> Consultar por WhatsApp
                </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Cart Sidebar ---
const CartSidebar = ({ isOpen, onClose, cart, setCart }: { isOpen: boolean, onClose: () => void, cart: CartItem[], setCart: React.Dispatch<React.SetStateAction<CartItem[]>> }) => {
  
  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCart(prev => prev.filter(item => item.product.id !== id));
  };

  const { totalNumeric, hasConsultar } = useMemo(() => {
    let t = 0;
    let h = false;
    cart.forEach(c => {
      if (c.product.priceNumeric === 0) h = true;
      t += c.product.priceNumeric * c.quantity;
    });
    return { totalNumeric: t, hasConsultar: h };
  }, [cart]);

  const generateWhatsAppMessage = () => {
    let msg = "¡Hola Farmacia Mitre! Quiero hacer un pedido desde su catálogo web:%0A%0A";
    msg += "🛍️ *Mi Pedido:*%0A";
    cart.forEach(item => {
      msg += `- ${item.quantity}x ${item.product.name} (${item.product.brand})%0A`;
    });
    msg += "%0A";
    if (totalNumeric > 0) {
      msg += `💰 *Subtotal Estimado:* $ ${totalNumeric.toLocaleString('es-AR')}%0A`;
    }
    if (hasConsultar) {
      msg += "⚠️ _Hay productos marcados con 'Consultar', por favor confirmar precio final y stock._%0A";
    }
    msg += "%0A¿Cómo es el proceso para retirar y abonar?";
    return msg;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100]" 
            onClick={onClose} 
          />
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[110] flex flex-col"
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-white">
          <div className="flex items-center gap-3">
             <div className="bg-pharma-light p-2 rounded-xl text-pharma-primary">
                <ShoppingCart size={24} />
             </div>
             <h2 className="text-xl font-bold font-heading text-pharma-dark">Tu Pedido</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50/50 p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
              <ShoppingCart size={64} className="text-gray-300" />
              <p className="text-gray-500 font-bold text-lg">Tu carrito está vacío</p>
              <button onClick={onClose} className="text-pharma-primary font-bold hover:underline">Volver al catálogo</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex gap-4 relative">
                <button onClick={() => removeItem(item.product.id)} className="absolute -top-2 -right-2 bg-white text-gray-400 hover:text-red-500 rounded-full shadow-sm">
                   <XCircle size={20} />
                </button>
                <div className="w-20 h-20 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 p-2">
                  <img src={item.product.img} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 leading-tight mb-1">{item.product.name}</h4>
                    <p className="font-bold text-pharma-primary text-sm">{item.product.priceNumeric > 0 ? `$ ${(item.product.priceNumeric * item.quantity).toLocaleString('es-AR')}` : 'Consultar'}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center bg-gray-100 rounded-lg">
                      <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1.5 hover:bg-gray-200 rounded-l-lg text-gray-600"><Minus size={14}/></button>
                      <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1.5 hover:bg-gray-200 rounded-r-lg text-gray-600"><Plus size={14}/></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-6 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-gray-500 font-bold">Total Estimado</span>
              <span className="text-2xl font-black font-heading text-pharma-dark">
                {totalNumeric > 0 ? `$ ${totalNumeric.toLocaleString('es-AR')}` : 'A Confirmar'}
              </span>
            </div>
            {hasConsultar && (
               <p className="text-xs text-gray-500 mb-4 bg-gray-50 p-3 rounded-lg flex items-start gap-2">
                 <Info size={16} className="text-gray-400 shrink-0"/> 
                 Nota: El precio final considerará los productos a consultar.
               </p>
            )}
            <a 
              href={`https://wa.me/5492230000000?text=${generateWhatsAppMessage()}`}
              target="_blank" rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white py-4 rounded-xl font-bold text-lg transition-colors shadow-lg shadow-[#25D366]/30"
            >
              <MessageCircle size={22} /> Enviar pedido por WhatsApp
            </a>
            <button onClick={onClose} className="w-full text-center mt-4 text-sm font-bold text-gray-400 hover:text-gray-600">
               Seguir comprando
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
}

// --- Integration Warning ---
const IntegrationNotice = () => (
  <section className="py-8 bg-slate-50 border-y border-slate-200">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-bold text-slate-700 mb-3 border border-slate-100">
         <RefreshCw size={16} className="text-pharma-primary" />
         Catálogo preparado para actualización
      </div>
      <p className="text-sm text-slate-500 font-medium">
         Este escaparate digital está optimizado para integrarse directamente con el sistema de gestión de Farmacia Mitre (ej. Touch&Sale), permitiendo sincronizar precios y stock mediante la exportación de catálogos periódicamente o API.
      </p>
    </div>
  </section>
);


// --- Footer Section ---
const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="lg:col-span-1">
             <div className="flex items-center gap-2 mb-6 select-none grayscale contrast-200 opacity-90">
               <div className="relative flex items-center justify-center w-10 h-10">
                 <Plus size={36} strokeWidth={4} className="text-white absolute drop-shadow-sm" />
                 <span className="font-heading font-black text-gray-900 text-lg relative z-10" style={{WebkitTextStroke: '1px white'}}>24</span>
               </div>
               <div className="flex flex-col -ml-1 text-white">
                 <span className="font-heading font-bold text-lg leading-none tracking-tight">farmacia</span>
                 <span className="font-heading font-bold text-base leading-none tracking-tight">mitre</span>
               </div>
            </div>
            <p className="text-slate-400 text-sm mb-6 max-w-xs leading-relaxed">Tu farmacia de confianza en Mar del Plata. Lideres en suplementación deportiva, medicamentos y dermocosmética 24 horas.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-pharma-primary hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 hover:bg-[#25D366] hover:text-white transition-colors"><MessageCircle size={20} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Tienda</h4>
            <ul className="space-y-3">
              <li><a href="#catalogo" className="text-slate-400 hover:text-white text-sm transition-colors font-medium">Ver Suplementos</a></li>
              <li><a href="#catalogo" className="text-slate-400 hover:text-white text-sm transition-colors font-medium">Dermocosmética</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors font-medium">Cómo comprar</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors font-medium">Envíos</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Farmacia</h4>
            <ul className="space-y-3">
              <li><a href="#nosotros" className="text-slate-400 hover:text-white text-sm transition-colors font-medium">Sobre nosotros</a></li>
              <li><a href="#contacto" className="text-slate-400 hover:text-white text-sm transition-colors font-medium">Ubicación</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors font-medium">Servicios</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white text-sm transition-colors font-medium">Preguntas Frecuentes</a></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Atención al Cliente</h4>
             <ul className="space-y-4 text-sm text-slate-400 font-medium">
               <li className="flex items-start gap-3"><MapPin size={18} className="text-pharma-primary shrink-0" /> <span className="pt-0.5">Av. Independencia 1234<br/>Mar del Plata</span></li>
               <li className="flex items-center gap-3"><Clock size={18} className="text-pharma-primary shrink-0" /> Atención 24 Horas</li>
             </ul>
          </div>

        </div>
        
        <div className="pt-8 border-t border-slate-800 flex justify-between items-center text-xs font-bold text-slate-600">
          <p>© {new Date().getFullYear()} Farmacia Mitre. Todos los derechos reservados.</p>
          <div className="flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
             <ShieldCheck size={14}/>
             <span>Compra Local Segura</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Floating WhatsApp Button ---
const FloatingWhatsApp = () => {
  return (
    <a 
      href="https://wa.me/5492230000000" 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.5)] hover:bg-[#1ebd5a] hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
    >
      <MessageCircle size={32} />
      <span className="absolute right-[110%] w-32 text-center bg-white text-gray-800 text-sm font-bold py-2 px-4 rounded-xl shadow-lg opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all pointer-events-none before:content-[''] before:absolute before:top-1/2 before:-translate-y-1/2 before:-right-2 before:border-t-8 before:border-t-transparent before:border-b-8 before:border-b-transparent before:border-l-8 before:border-l-white">
        ¡Hacé tu consulta!
      </span>
    </a>
  );
};


function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCT_DATA[0] | null>(null);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: typeof PRODUCT_DATA[0]) => {
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen font-sans bg-pharma-bg selection:bg-pharma-primary selection:text-white">
      <Navbar cartCount={cartItemCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main>
        <Hero />
        <TrustFeatures />
        <Catalog 
          onAddToCart={handleAddToCart} 
          onShowModal={(product) => setSelectedProduct(product)} 
        />
        <IntegrationNotice />
      </main>
      
      <Footer />
      <FloatingWhatsApp />

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        setCart={setCart}
      />

      <ProductModal 
        product={selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}

export default App;
