import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Menu, X, MapPin, Clock, Instagram, MessageCircle, Mail, Phone,
  ShieldCheck, Zap, ShoppingCart, Search, Award, Stethoscope,
  Plus, Minus, XCircle, Info, CheckCircle2, ChevronRight,
  Flame, Dumbbell, Leaf, FlaskConical, Star, Truck
} from 'lucide-react';

const WHATSAPP = '5492235170500';
const PHONE_DISPLAY = '223 517-0500';
const ADDRESS = 'Av. Patricio Peralta Ramos 2481, Mar del Plata';
const ADDRESS_MAPS = 'https://maps.google.com/?q=Av.+Patricio+Peralta+Ramos+2481,+Mar+del+Plata';
const HOURS = 'Todos los días 9 a 22hs';
const INSTAGRAM = 'https://www.instagram.com/farmaciamitre2mdp/';
const wa = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const PRODUCT_DATA = [
  // Proteínas
  { id: 1,  category: 'Proteínas',    name: 'Whey Protein Chocolate',     brand: 'Star Nutrition', size: '1 kg',  desc: 'Proteína de suero sabor chocolate. 24g por porción para recuperación post-entrenamiento.',                price: '$ 45.000', priceNumeric: 45000, stock: 'Disponible' },
  { id: 2,  category: 'Proteínas',    name: 'Whey Protein Vainilla',      brand: 'ENA Sport',      size: '1 kg',  desc: 'Proteína premium sabor vainilla con aminoácidos esenciales. 25g de proteína pura por servicio.',          price: '$ 42.500', priceNumeric: 42500, stock: 'Poco stock' },
  { id: 3,  category: 'Proteínas',    name: 'Proteína Isolate',           brand: 'Gold Nutrition', size: '900 g', desc: 'Proteína aislada de máxima pureza. Cero carbohidratos, cero grasas y máxima absorción.',                price: '$ 58.000', priceNumeric: 58000, stock: 'Disponible' },
  { id: 4,  category: 'Proteínas',    name: 'Protein Blend',              brand: 'BSN',            size: '2 kg',  desc: 'Mezcla de proteínas de rápida y lenta absorción para una nutrición proteica sostenida en el tiempo.',     price: '$ Consultar', priceNumeric: 0, stock: 'Consultar stock' },
  // Creatinas
  { id: 5,  category: 'Creatinas',    name: 'Creatina Monohidratada',     brand: 'Star Nutrition', size: '300 g', desc: '100% creatina monohidratada pura. Mayor fuerza, potencia explosiva y volumen muscular.',                price: '$ 22.000', priceNumeric: 22000, stock: 'Disponible' },
  { id: 6,  category: 'Creatinas',    name: 'Creatina Micronizada',       brand: 'ENA Sport',      size: '300 g', desc: 'Partículas micronizadas para absorción ultra rápida. Mejor solubilidad y biodisponibilidad.',            price: '$ 25.000', priceNumeric: 25000, stock: 'Disponible' },
  { id: 7,  category: 'Creatinas',    name: 'Creatina Saborizada',        brand: 'Gentech',        size: '350 g', desc: 'Creatina con sabor fruit punch. Fácil de disolver, deliciosa, mismo poder de la monohidratada.',          price: '$ 26.500', priceNumeric: 26500, stock: 'Poco stock' },
  { id: 8,  category: 'Creatinas',    name: 'Creatina Premium Creapure',  brand: 'Universal',      size: '500 g', desc: 'Creatina de grado farmacéutico con sello Creapure®. La más pura del mercado, certificada.',              price: '$ Consultar', priceNumeric: 0, stock: 'Consultar stock' },
  // Pre-entrenos
  { id: 9,  category: 'Pre-entrenos', name: 'Pre Workout Energy',         brand: 'Star Nutrition', size: '300 g', desc: 'Fórmula con cafeína, beta-alanina y arginina. Energía explosiva y concentración máxima.',                price: '$ 35.000', priceNumeric: 35000, stock: 'Disponible' },
  { id: 10, category: 'Pre-entrenos', name: 'Pre Workout Pump',           brand: 'ENA Sport',      size: '300 g', desc: 'Fórmula sin estimulantes. Bombeo muscular y vascularización extrema, ideal para la tarde/noche.',         price: '$ 33.500', priceNumeric: 33500, stock: 'Disponible' },
  { id: 11, category: 'Pre-entrenos', name: 'C4 Pre Entrenamiento',       brand: 'Cellucor',       size: '180 g', desc: 'El pre-workout más vendido del mundo. Efecto inmediato y prolongado, sabores exclusivos.',                price: '$ Consultar', priceNumeric: 0, stock: 'Disponible' },
  { id: 12, category: 'Pre-entrenos', name: 'Cafeína + Energía 200mg',    brand: 'Gentech',        size: '60 cáps', desc: 'Cápsulas de cafeína anhidra pura 200mg. Impulso rápido, sin azúcar, sin calorías extras.',              price: '$ 15.000', priceNumeric: 15000, stock: 'Disponible' },
  // Aminoácidos
  { id: 13, category: 'Aminoácidos',  name: 'BCAA 2:1:1 Instantizado',    brand: 'Star Nutrition', size: '300 g', desc: 'Aminoácidos ramificados en ratio 2:1:1 (leucina, isoleucina, valina). Evita la fatiga y recupera.',       price: '$ 18.500', priceNumeric: 18500, stock: 'Disponible' },
  { id: 14, category: 'Aminoácidos',  name: 'EAA Essential Amino',        brand: 'ENA Sport',      size: '400 g', desc: 'Los 9 aminoácidos esenciales completos. Soporte anabólico total y recuperación profunda.',                price: '$ 21.000', priceNumeric: 21000, stock: 'Disponible' },
  { id: 15, category: 'Aminoácidos',  name: 'L-Glutamina Micronizada',    brand: 'Nutrilab',       size: '300 g', desc: 'Aminoácido clave para recuperación intestinal, muscular e inmunológica. Pura, sin aditivos.',             price: '$ 16.000', priceNumeric: 16000, stock: 'Disponible' },
  { id: 16, category: 'Aminoácidos',  name: 'XTEND Recovery Blend',       brand: 'Xtend',          size: '420 g', desc: 'Fórmula hidratante con electrolitos, BCAAs y glutamina. Recuperación deportiva completa.',                price: '$ Consultar', priceNumeric: 0, stock: 'Consultar stock' },
  // Vitaminas
  { id: 17, category: 'Vitaminas',    name: 'Multivitamínico Sport',      brand: 'Centrum',        size: '60 cáps', desc: 'Complejo completo de vitaminas y minerales formulado para atletas con altas exigencias físicas.',       price: '$ 12.000', priceNumeric: 12000, stock: 'Disponible' },
  { id: 18, category: 'Vitaminas',    name: 'Magnesio Bisglicinato',      brand: 'Natufarma',      size: '90 cáps', desc: 'Forma quelada de alta absorción. Previene calambres, mejora el sueño y relaja la musculatura.',          price: '$ 9.500',  priceNumeric: 9500,  stock: 'Disponible' },
  { id: 19, category: 'Vitaminas',    name: 'Omega 3 Triple Concentrado', brand: 'Solgar',         size: '60 cáps', desc: 'Alta concentración de EPA y DHA. Soporte cardiovascular, articular y antiinflamatorio.',                  price: '$ 14.500', priceNumeric: 14500, stock: 'Disponible' },
  { id: 20, category: 'Vitaminas',    name: 'Vitamina D3 5000 IU',        brand: 'Solaray',        size: '60 cáps', desc: 'Dosis terapéutica de vitamina D3. Fijación de calcio, inmunidad y testosterona.',                        price: '$ 11.000', priceNumeric: 11000, stock: 'Poco stock' },
];

const SUPPLEMENT_CATEGORIES = ['Todos', 'Proteínas', 'Creatinas', 'Pre-entrenos', 'Aminoácidos', 'Vitaminas'];

type CategoryKey = 'Proteínas' | 'Creatinas' | 'Pre-entrenos' | 'Aminoácidos' | 'Vitaminas';

const CATEGORY_META: Record<CategoryKey, {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>;
  color: string; bg: string; ring: string; gradFrom: string; gradTo: string; hex: string; format: string;
}> = {
  'Proteínas':    { icon: Dumbbell,     color: 'text-blue-600',   bg: 'bg-blue-50',   ring: 'ring-blue-200',   gradFrom: 'from-blue-100',   gradTo: 'to-blue-50',    hex: '#2563eb', format: 'Polvo'   },
  'Creatinas':    { icon: Zap,          color: 'text-amber-600',  bg: 'bg-amber-50',  ring: 'ring-amber-200',  gradFrom: 'from-amber-100',  gradTo: 'to-amber-50',   hex: '#d97706', format: 'Polvo'   },
  'Pre-entrenos': { icon: Flame,        color: 'text-orange-600', bg: 'bg-orange-50', ring: 'ring-orange-200', gradFrom: 'from-orange-100', gradTo: 'to-orange-50',  hex: '#ea580c', format: 'Polvo'   },
  'Aminoácidos':  { icon: FlaskConical, color: 'text-purple-600', bg: 'bg-purple-50', ring: 'ring-purple-200', gradFrom: 'from-purple-100', gradTo: 'to-purple-50',  hex: '#9333ea', format: 'Polvo'   },
  'Vitaminas':    { icon: Leaf,         color: 'text-green-600',  bg: 'bg-green-50',  ring: 'ring-green-200',  gradFrom: 'from-green-100',  gradTo: 'to-green-50',   hex: '#16a34a', format: 'Cápsulas' },
};

interface CartItem { product: typeof PRODUCT_DATA[0]; quantity: number; }

// ====================================================================
//  ProductVisual — generated supplement-container mockup per category.
//  Replaces broken/unreliable stock photos with a clean, on-brand visual.
// ====================================================================
const ProductVisual = ({ product, variant = 'card' }: {
  product: typeof PRODUCT_DATA[0];
  variant?: 'card' | 'modal' | 'thumb';
}) => {
  const meta = CATEGORY_META[product.category as CategoryKey];
  const Icon = meta.icon;
  const isThumb = variant === 'thumb';
  const isModal = variant === 'modal';

  return (
    <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br ${meta.gradFrom} ${meta.gradTo}`}>
      {/* Dotted pattern bg */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: `radial-gradient(circle, ${meta.hex} 1.4px, transparent 1.4px)`,
        backgroundSize: isThumb ? '12px 12px' : '22px 22px',
      }} />

      {/* Category icon faded as backdrop */}
      <div className={`absolute -bottom-4 -right-4 ${meta.color} opacity-[0.10]`}>
        <Icon size={isThumb ? 60 : isModal ? 240 : 180} strokeWidth={1.2} />
      </div>

      {/* Center: supplement container mockup */}
      <div className="absolute inset-0 flex items-center justify-center p-3">
        <div className={`relative ${isThumb ? 'w-[78%] h-[88%]' : 'w-[62%] h-[86%]'} bg-white rounded-[14%/8%] shadow-lg border border-gray-100 flex flex-col items-center justify-between overflow-hidden`}>
          {/* Cap band */}
          <div className={`absolute top-0 inset-x-0 ${meta.bg} h-[14%] flex items-center justify-center border-b border-gray-100`}>
            <div className={`w-12 h-[5px] rounded-full ${meta.color.replace('text-', 'bg-')}/40`} />
          </div>

          {/* Label area */}
          <div className="flex-1 w-full flex flex-col items-center justify-center pt-[14%] px-2 text-center">
            {!isThumb && (
              <p className={`text-[8px] sm:text-[9px] font-black uppercase tracking-[0.18em] ${meta.color} mb-1`}>
                {product.brand}
              </p>
            )}
            <div className={`${meta.color} my-1`}>
              <Icon size={isThumb ? 22 : isModal ? 56 : 38} strokeWidth={1.8} />
            </div>
            {!isThumb && (
              <>
                <p className={`text-[10px] sm:text-[11px] ${isModal ? 'sm:text-sm' : ''} font-black uppercase tracking-wide text-gray-900 leading-tight line-clamp-2 px-1 max-w-full`}>
                  {product.name}
                </p>
                <p className="text-[8px] sm:text-[9px] font-bold text-gray-400 mt-1 uppercase tracking-wider">
                  {meta.format} · {product.size}
                </p>
              </>
            )}
          </div>

          {/* Bottom band */}
          <div className={`w-full ${meta.bg} h-[8%] border-t border-gray-100 flex items-center justify-center`}>
            {!isThumb && (
              <span className={`text-[8px] font-black uppercase tracking-widest ${meta.color}`}>
                {product.category}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Logo ---
const Logo = () => (
  <a href="#inicio" className="flex items-center gap-2.5 select-none group">
    <div className="relative flex items-center justify-center w-11 h-11 bg-pharma-primary rounded-xl shadow-lg shadow-pharma-primary/30 group-hover:scale-105 transition-transform">
      <Plus size={26} strokeWidth={3.5} className="text-white absolute" />
      <span className="font-heading font-black text-white text-sm relative z-10 mt-5 ml-5 leading-none">2</span>
    </div>
    <div className="flex flex-col">
      <span className="font-heading font-black text-lg leading-none text-pharma-dark tracking-tight">farmacia</span>
      <span className="font-heading font-bold text-sm leading-none text-pharma-primary tracking-widest uppercase">mitre 2</span>
    </div>
  </a>
);

// --- Navbar ---
const Navbar = ({ cartCount, onOpenCart }: { cartCount: number; onOpenCart: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Suplementos', href: '#catalogo' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <header className={`fixed w-full z-40 transition-all duration-300 ${scrolled ? 'bg-white/97 backdrop-blur-md shadow-sm py-2.5' : 'bg-white py-4 border-b border-gray-100'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo />
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-semibold text-gray-600 hover:text-pharma-primary transition-colors">
                {link.name}
              </a>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={onOpenCart} className="relative flex items-center gap-2 px-4 py-2 text-pharma-dark hover:bg-pharma-light rounded-full transition-colors font-semibold text-sm">
              <ShoppingCart size={20} /> Pedido
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center bg-pharma-accent text-white text-[10px] font-black h-5 w-5 rounded-full border-2 border-white">
                  {cartCount}
                </span>
              )}
            </button>
            <a href={wa('Hola Farmacia Mitre 2, quería hacer una consulta.')} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 bg-pharma-primary text-white px-5 py-2.5 rounded-full font-bold text-sm hover:bg-pharma-dark transition-colors shadow-md shadow-pharma-primary/25">
              <MessageCircle size={16} /> Consultar
            </a>
          </div>
          <div className="md:hidden flex items-center gap-3">
            <button onClick={onOpenCart} className="relative p-2 text-pharma-dark">
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center bg-pharma-accent text-white text-[10px] font-black h-5 w-5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-pharma-dark bg-gray-100 rounded-lg" aria-label="Menu">
              {isOpen ? <X size={22} /> : <Menu size={22} />}
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
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <a key={link.name} href={link.href} onClick={() => setIsOpen(false)}
                  className="block px-4 py-3 text-base font-semibold text-gray-700 hover:bg-pharma-light hover:text-pharma-dark rounded-xl transition-colors">
                  {link.name}
                </a>
              ))}
              <a href={wa('Hola Farmacia Mitre 2, quería hacer una consulta.')} target="_blank" rel="noreferrer"
                className="mt-3 flex w-full items-center justify-center gap-2 bg-pharma-primary text-white px-5 py-3 rounded-xl font-bold shadow-md">
                <MessageCircle size={18} /> Consultar por WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

// --- Hero ---
const Hero = () => (
  <section id="inicio" className="relative pt-28 pb-12 lg:pt-36 lg:pb-20 overflow-hidden bg-white">
    <div className="absolute inset-0 opacity-[0.04]"
      style={{ backgroundImage: 'linear-gradient(to right, #0a4f32 1px, transparent 1px), linear-gradient(to bottom, #0a4f32 1px, transparent 1px)', backgroundSize: '48px 48px' }} />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pharma-light text-pharma-dark text-xs font-bold mb-6 border border-pharma-primary/20 tracking-wide">
            <ShieldCheck size={14} className="text-pharma-primary" />
            Farmacia Mitre 2 · Mar del Plata · 9 a 22hs
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black font-heading text-pharma-dark leading-[1.1] mb-5 tracking-tight">
            Suplementación <br />
            <span className="text-pharma-primary">de alto rendimiento</span><br />
            con respaldo farmacéutico
          </h1>
          <p className="text-base text-gray-500 mb-8 max-w-md leading-relaxed">
            Las mejores marcas nacionales e importadas. Asesoramiento real, stock actualizado y precios claros. Retirá el mismo día.
          </p>
          <div className="flex flex-wrap gap-3 mb-10">
            <a href="#catalogo"
              className="flex items-center gap-2 bg-pharma-primary text-white px-7 py-3.5 rounded-full font-bold hover:bg-pharma-dark transition-all shadow-lg shadow-pharma-primary/30 hover:-translate-y-0.5">
              Ver catálogo completo <ChevronRight size={18} />
            </a>
            <a href={wa('Hola, quiero consultar stock y precios de suplementos.')} target="_blank" rel="noreferrer"
              className="flex items-center gap-2 bg-white text-gray-700 border border-gray-200 px-7 py-3.5 rounded-full font-bold hover:border-pharma-primary hover:text-pharma-primary transition-colors shadow-sm">
              <MessageCircle size={18} /> Consultar stock
            </a>
          </div>
          <div className="flex gap-8 pt-6 border-t border-gray-100">
            {[
              { val: '+20', label: 'Marcas' },
              { val: '+100', label: 'Productos' },
              { val: '9-22hs', label: 'Horario' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-black font-heading text-pharma-dark">{s.val}</p>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Visual showcase — 5 floating category cards */}
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.15 }}
          className="relative hidden lg:block h-[520px]">
          <div className="absolute inset-0 bg-gradient-to-br from-pharma-light to-pharma-primary/5 rounded-[3rem]" />
          {(Object.keys(CATEGORY_META) as CategoryKey[]).map((cat, i) => {
            const meta = CATEGORY_META[cat];
            const Icon = meta.icon;
            const positions = [
              'top-[8%] left-[10%] rotate-[-6deg]',
              'top-[6%] right-[12%] rotate-[5deg]',
              'top-[40%] left-[25%] rotate-[2deg] scale-110 z-10',
              'bottom-[10%] left-[8%] rotate-[4deg]',
              'bottom-[8%] right-[10%] rotate-[-5deg]',
            ];
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                className={`absolute ${positions[i]} w-32 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 hover:scale-110 hover:rotate-0 transition-all cursor-default`}
              >
                <div className={`w-10 h-10 ${meta.bg} ${meta.color} rounded-xl flex items-center justify-center mb-2`}>
                  <Icon size={20} strokeWidth={2} />
                </div>
                <p className="text-xs font-black text-pharma-dark">{cat}</p>
                <p className="text-[10px] text-gray-400 font-semibold">4 productos</p>
              </motion.div>
            );
          })}
          <div className="absolute bottom-6 -left-3 z-20 bg-white px-3.5 py-2.5 rounded-2xl shadow-xl border border-gray-100 flex items-center gap-2.5">
            <div className="w-9 h-9 bg-yellow-50 rounded-lg flex items-center justify-center text-yellow-500">
              <Star size={18} fill="currentColor" />
            </div>
            <div>
              <p className="text-[11px] font-black text-gray-900">Productos originales</p>
              <p className="text-[10px] text-gray-400 font-medium">Garantía de autenticidad</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

// --- Nosotros section ---
const Nosotros = () => {
  const features = [
    { icon: Stethoscope,  title: 'Atención farmacéutica',  desc: 'Te asesora un profesional matriculado, no un vendedor.' },
    { icon: Award,        title: 'Productos originales',   desc: 'Solo marcas auditadas con trazabilidad de origen.' },
    { icon: Truck,        title: 'Retiro mismo día',        desc: 'Pedido listo el mismo día. Av. Peralta Ramos 2481.' },
    { icon: MessageCircle,title: 'Consulta directa',       desc: 'Hablás por WhatsApp con quien te va a atender.' },
  ];
  return (
    <section id="nosotros" className="py-16 lg:py-20 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-pharma-primary/10 text-pharma-primary font-bold px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-4">Nosotros</span>
          <h2 className="text-3xl md:text-4xl font-black font-heading text-pharma-dark mb-3">
            Una farmacia de barrio con espalda profesional
          </h2>
          <p className="text-gray-500">
            En Av. Peralta Ramos 2481, Mar del Plata. Todos los días de 9 a 22hs. Suplementación deportiva con la misma seriedad que un medicamento: marca, lote, vencimiento y consejo real.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div key={f.title} className="bg-pharma-bg rounded-2xl p-6 border border-gray-100 hover:border-pharma-primary/30 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-pharma-light text-pharma-primary rounded-xl flex items-center justify-center mb-4">
                <f.icon size={22} />
              </div>
              <h3 className="font-bold text-pharma-dark mb-1">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Category Showcase ---
const CategoryShowcase = ({ onSelectCategory }: { onSelectCategory: (cat: string) => void }) => (
  <section className="py-14 bg-pharma-bg">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <p className="text-xs font-bold tracking-widest uppercase text-pharma-primary mb-2">Explorá por categoría</p>
        <h2 className="text-2xl font-black font-heading text-pharma-dark">¿Qué buscás hoy?</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {(Object.entries(CATEGORY_META) as [CategoryKey, typeof CATEGORY_META[CategoryKey]][]).map(([cat, meta]) => {
          const Icon = meta.icon;
          const count = PRODUCT_DATA.filter(p => p.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className="group flex flex-col items-center gap-3 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
            >
              <div className={`w-12 h-12 ${meta.bg} ${meta.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon size={22} />
              </div>
              <div className="text-center">
                <p className="font-bold text-sm text-gray-900">{cat}</p>
                <p className="text-[11px] text-gray-400 font-medium">{count} productos</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  </section>
);

// --- Catalog ---
const Catalog = ({ onAddToCart, onShowModal, initialCategory, onCategoryUsed }: {
  onAddToCart: (p: typeof PRODUCT_DATA[0]) => void;
  onShowModal: (p: typeof PRODUCT_DATA[0]) => void;
  initialCategory: string | null;
  onCategoryUsed: () => void;
}) => {
  const [activeTab, setActiveTab] = useState('Todos');
  const [search, setSearch] = useState('');

  useEffect(() => {
    if (initialCategory) {
      setActiveTab(initialCategory);
      onCategoryUsed();
    }
  }, [initialCategory]);

  const filteredProducts = useMemo(() =>
    PRODUCT_DATA.filter(p => {
      const matchCat = activeTab === 'Todos' || p.category === activeTab;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    }),
    [activeTab, search]
  );

  const stockColor = (stock: string) => {
    if (stock === 'Disponible') return 'text-pharma-primary border-pharma-light bg-pharma-light/60';
    if (stock === 'Poco stock') return 'text-orange-600 border-orange-100 bg-orange-50';
    return 'text-gray-400 border-gray-100 bg-gray-50';
  };

  return (
    <section id="catalogo" className="py-20 bg-pharma-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block bg-pharma-primary/10 text-pharma-primary font-bold px-4 py-1.5 rounded-full text-xs tracking-widest uppercase mb-4">Catálogo Online</span>
          <h2 className="text-3xl md:text-4xl font-black font-heading text-pharma-dark mb-3">Suplementos Deportivos</h2>
          <p className="text-gray-500">Seleccioná, consultá y retirá. Simple.</p>
        </div>

        <div className="max-w-lg mx-auto mb-8 relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por nombre o marca..."
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pharma-primary/30 focus:border-pharma-primary bg-white shadow-sm text-gray-700 font-medium text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {SUPPLEMENT_CATEGORIES.map(tab => {
            const m = CATEGORY_META[tab as CategoryKey];
            const active = activeTab === tab;
            const Icon = m?.icon;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-bold transition-all ${
                  active ? 'bg-pharma-dark text-white shadow-md' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {Icon && <Icon size={16} className={active ? 'text-white' : m.color} />}
                {tab}
              </button>
            );
          })}
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-gray-100">
            <Search size={40} className="mx-auto text-gray-200 mb-4" />
            <h3 className="text-lg font-bold text-gray-600">Sin resultados</h3>
            <p className="text-gray-400 mt-1 text-sm">Probá con otra búsqueda o categoría.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => {
                const meta = CATEGORY_META[product.category as CategoryKey];
                const Icon = meta.icon;
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    key={product.id}
                    onClick={() => onShowModal(product)}
                    className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden">
                      <ProductVisual product={product} variant="card" />
                      <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-lg border ${stockColor(product.stock)}`}>
                        {product.stock}
                      </span>
                      <span className={`absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-xl bg-white ${meta.color} shadow-sm border border-gray-100`}>
                        <Icon size={16} />
                      </span>
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-[11px] font-bold text-pharma-primary uppercase tracking-wider mb-1">{product.brand}</p>
                      <h4 className="font-bold text-gray-900 text-sm leading-tight mb-3 line-clamp-2 flex-1">{product.name}</h4>
                      <p className="font-heading font-black text-xl text-pharma-dark mb-4">{product.price}</p>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                          className="w-full flex items-center justify-center gap-1.5 bg-pharma-dark hover:bg-pharma-primary text-white py-2.5 rounded-xl font-bold text-sm transition-colors"
                        >
                          <Plus size={15} /> Agregar al pedido
                        </button>
                        <a
                          href={wa(`Hola Farmacia Mitre 2, vi este producto en su catálogo web:\n\n*${product.name}* (${product.brand})\nPrecio: ${product.price}\n\n¿Tienen disponible?`)}
                          target="_blank" rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="w-full flex items-center justify-center gap-1.5 bg-pharma-light hover:bg-[#25D366] text-pharma-dark hover:text-white py-2.5 rounded-xl font-bold text-sm transition-colors"
                        >
                          <MessageCircle size={15} /> Consultar
                        </a>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

// --- Product Modal ---
const ProductModal = ({ product, onClose, onAddToCart }: {
  product: typeof PRODUCT_DATA[0] | null;
  onClose: () => void;
  onAddToCart: (p: typeof PRODUCT_DATA[0]) => void;
}) => {
  if (!product) return null;
  const meta = CATEGORY_META[product.category as CategoryKey];
  const Icon = meta.icon;

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm" onClick={onClose}>
        <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[2rem] shadow-2xl max-w-3xl w-full overflow-hidden relative flex flex-col md:flex-row max-h-[90vh]">
          <button onClick={onClose} className="absolute top-4 right-4 z-10 w-9 h-9 bg-white/90 hover:bg-gray-100 text-gray-700 rounded-full flex items-center justify-center transition-colors shadow">
            <X size={18} />
          </button>
          <div className="w-full md:w-2/5 aspect-square md:aspect-auto md:min-h-[400px] relative">
            <ProductVisual product={product} variant="modal" />
          </div>
          <div className="w-full md:w-3/5 p-8 flex flex-col justify-center overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <span className={`w-7 h-7 flex items-center justify-center rounded-lg ${meta.bg} ${meta.color}`}>
                <Icon size={16} />
              </span>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{product.category}</span>
            </div>
            <p className="text-xs font-bold text-pharma-primary uppercase tracking-wider mb-1">{product.brand}</p>
            <h3 className="text-2xl font-heading font-black text-gray-900 leading-tight mb-3">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-5 leading-relaxed">{product.desc}</p>
            <div className="flex items-center gap-4 mb-5 py-4 border-t border-b border-gray-100 text-sm font-semibold">
              <div className="flex items-center gap-1.5 text-pharma-primary"><CheckCircle2 size={16} /> {product.stock}</div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1.5 text-gray-500"><Clock size={16} /> Retiro mismo día</div>
            </div>
            <p className="text-3xl font-black font-heading text-pharma-dark mb-6">{product.price}</p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => { onAddToCart(product); onClose(); }}
                className="w-full flex items-center justify-center gap-2 bg-pharma-primary hover:bg-pharma-dark text-white py-3.5 rounded-xl font-bold transition-colors shadow-md shadow-pharma-primary/25"
              >
                <ShoppingCart size={18} /> Agregar al pedido
              </button>
              <a href={wa(`Hola, quiero consultar sobre: *${product.name}*`)} target="_blank" rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 border border-gray-200 hover:border-[#25D366] hover:text-[#25D366] text-gray-600 py-3 rounded-xl font-bold text-sm transition-colors">
                <MessageCircle size={18} /> Consultar por WhatsApp
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// --- Cart Sidebar ---
const CartSidebar = ({ isOpen, onClose, cart, setCart }: {
  isOpen: boolean; onClose: () => void;
  cart: CartItem[]; setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
}) => {
  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item =>
      item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };
  const removeItem = (id: number) => setCart(prev => prev.filter(item => item.product.id !== id));

  const { totalNumeric, hasConsultar } = useMemo(() => {
    let t = 0, h = false;
    cart.forEach(c => { if (c.product.priceNumeric === 0) h = true; t += c.product.priceNumeric * c.quantity; });
    return { totalNumeric: t, hasConsultar: h };
  }, [cart]);

  const generateWhatsAppMessage = () => {
    let msg = "¡Hola Farmacia Mitre 2! Quiero hacer un pedido desde su catálogo web:\n\n🛍️ *Mi Pedido:*\n";
    cart.forEach(item => { msg += `- ${item.quantity}x ${item.product.name} (${item.product.brand})\n`; });
    if (totalNumeric > 0) msg += `\n💰 *Subtotal:* $ ${totalNumeric.toLocaleString('es-AR')}\n`;
    if (hasConsultar) msg += "⚠️ _Confirmar precio de productos marcados como Consultar._\n";
    msg += "\n¿Cómo es el proceso para retirar?";
    return msg;
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-[100]" onClick={onClose} />
        )}
      </AnimatePresence>
      <motion.div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-[110] flex flex-col"
        initial={{ x: '100%' }} animate={{ x: isOpen ? 0 : '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 220 }}>
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="bg-pharma-light p-2 rounded-xl text-pharma-primary"><ShoppingCart size={20} /></div>
            <h2 className="text-lg font-bold font-heading text-pharma-dark">Tu Pedido</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-gray-50/50">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-3 opacity-40">
              <ShoppingCart size={56} className="text-gray-300" />
              <p className="text-gray-500 font-bold">Tu carrito está vacío</p>
              <button onClick={onClose} className="text-pharma-primary font-bold text-sm hover:underline">Explorar catálogo</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.product.id} className="bg-white p-3.5 rounded-2xl shadow-sm border border-gray-100 flex gap-3 relative">
                <button onClick={() => removeItem(item.product.id)}
                  className="absolute -top-2 -right-2 bg-white text-gray-300 hover:text-pharma-accent rounded-full shadow-sm transition-colors z-10">
                  <XCircle size={18} />
                </button>
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                  <ProductVisual product={item.product} variant="thumb" />
                </div>
                <div className="flex-1 flex flex-col justify-between min-w-0">
                  <div>
                    <h4 className="font-bold text-xs text-gray-900 leading-tight mb-0.5 truncate">{item.product.name}</h4>
                    <p className="font-bold text-pharma-primary text-sm">
                      {item.product.priceNumeric > 0 ? `$ ${(item.product.priceNumeric * item.quantity).toLocaleString('es-AR')}` : 'Consultar'}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center bg-gray-100 rounded-lg">
                      <button onClick={() => updateQuantity(item.product.id, -1)} className="p-1.5 hover:bg-gray-200 rounded-l-lg text-gray-600"><Minus size={13} /></button>
                      <span className="w-7 text-center text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, 1)} className="p-1.5 hover:bg-gray-200 rounded-r-lg text-gray-600"><Plus size={13} /></button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t border-gray-100 p-5 bg-white">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 font-semibold text-sm">Total Estimado</span>
              <span className="text-xl font-black font-heading text-pharma-dark">
                {totalNumeric > 0 ? `$ ${totalNumeric.toLocaleString('es-AR')}` : 'A Confirmar'}
              </span>
            </div>
            {hasConsultar && (
              <p className="text-xs text-gray-400 mb-4 flex items-start gap-1.5">
                <Info size={14} className="shrink-0 mt-0.5" />
                Precio final incluye los productos a consultar.
              </p>
            )}
            <a href={wa(generateWhatsAppMessage())} target="_blank" rel="noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebd5a] text-white py-3.5 rounded-xl font-bold transition-colors shadow-md shadow-[#25D366]/30">
              <MessageCircle size={20} /> Enviar pedido por WhatsApp
            </a>
            <button onClick={onClose} className="w-full text-center mt-3 text-xs font-semibold text-gray-400 hover:text-gray-600">
              Seguir viendo productos
            </button>
          </div>
        )}
      </motion.div>
    </>
  );
};

// --- Footer ---
const Footer = ({ onSelectCategory }: { onSelectCategory: (cat: string) => void }) => (
  <footer id="contacto" className="bg-pharma-dark pt-14 pb-8">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 bg-pharma-primary rounded-lg flex items-center justify-center">
              <Plus size={22} strokeWidth={3} className="text-white" />
            </div>
            <div>
              <p className="font-heading font-black text-base leading-none text-white">farmacia</p>
              <p className="font-heading font-bold text-sm leading-none text-pharma-primary tracking-wider uppercase">mitre 2</p>
            </div>
          </div>
          <p className="text-slate-400 text-sm mb-5 max-w-xs leading-relaxed">
            Tu farmacia de confianza en Mar del Plata. Especialistas en suplementación deportiva. Todos los días de 9 a 22hs.
          </p>
          <div className="flex gap-3">
            <a href={INSTAGRAM} target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 hover:bg-pharma-primary hover:text-white transition-colors" aria-label="Instagram">
              <Instagram size={17} />
            </a>
            <a href={wa('Hola Farmacia Mitre 2, quería hacer una consulta.')} target="_blank" rel="noreferrer"
              className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 hover:bg-[#25D366] hover:text-white transition-colors" aria-label="WhatsApp">
              <MessageCircle size={17} />
            </a>
            <a href="mailto:farmaciamitre2mdp@gmail.com"
              className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-300 hover:bg-pharma-primary hover:text-white transition-colors" aria-label="Email">
              <Mail size={17} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 tracking-wider uppercase text-xs">Suplementos</h4>
          <ul className="space-y-2.5">
            {(Object.keys(CATEGORY_META) as CategoryKey[]).map(c => (
              <li key={c}>
                <button onClick={() => onSelectCategory(c)}
                  className="text-slate-400 hover:text-white text-sm transition-colors text-left">
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 tracking-wider uppercase text-xs">Farmacia</h4>
          <ul className="space-y-2.5">
            <li><a href="#nosotros" className="text-slate-400 hover:text-white text-sm transition-colors">Sobre nosotros</a></li>
            <li><a href={wa('Hola, ¿cómo es el proceso de compra y retiro?')} target="_blank" rel="noreferrer"
              className="text-slate-400 hover:text-white text-sm transition-colors">Cómo comprar</a></li>
            <li><a href={wa('Hola, quería consultar por sus servicios de farmacia.')} target="_blank" rel="noreferrer"
              className="text-slate-400 hover:text-white text-sm transition-colors">Servicios</a></li>
            <li><a href={wa('Hola, tengo una consulta:')} target="_blank" rel="noreferrer"
              className="text-slate-400 hover:text-white text-sm transition-colors">Preguntas frecuentes</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-4 tracking-wider uppercase text-xs">Contacto</h4>
          <ul className="space-y-3 text-sm text-slate-400">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="text-pharma-primary shrink-0 mt-0.5" />
              <a href={ADDRESS_MAPS} target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                {ADDRESS}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Clock size={16} className="text-pharma-primary shrink-0" />
              {HOURS}
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={16} className="text-pharma-primary shrink-0" />
              <a href={`tel:+${WHATSAPP}`} className="hover:text-white transition-colors">{PHONE_DISPLAY}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500 font-medium">
        <p>© {new Date().getFullYear()} Farmacia Mitre 2. Todos los derechos reservados.</p>
        <div className="flex items-center gap-1 opacity-70">
          <ShieldCheck size={12} /> Compra local segura
        </div>
      </div>
    </div>
  </footer>
);

// --- Floating WhatsApp ---
const FloatingWhatsApp = () => (
  <a href={wa('Hola Farmacia Mitre 2, quería hacer una consulta.')} target="_blank" rel="noreferrer"
    className="fixed bottom-6 right-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgba(37,211,102,0.45)] hover:scale-110 active:scale-95 transition-all group flex items-center justify-center">
    <MessageCircle size={28} />
    <span className="absolute right-[110%] whitespace-nowrap bg-white text-gray-800 text-xs font-bold py-2 px-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
      ¡Consultanos!
    </span>
  </a>
);

// --- App ---
function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCT_DATA[0] | null>(null);
  const [jumpCategory, setJumpCategory] = useState<string | null>(null);

  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleAddToCart = (product: typeof PRODUCT_DATA[0]) => {
    setCart(prev => {
      const exists = prev.find(item => item.product.id === product.id);
      if (exists) return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleSelectCategory = (cat: string) => {
    setJumpCategory(cat);
    setTimeout(() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' }), 0);
  };

  return (
    <div className="min-h-screen font-sans bg-white selection:bg-pharma-primary selection:text-white">
      <Navbar cartCount={cartItemCount} onOpenCart={() => setIsCartOpen(true)} />
      <main>
        <Hero />
        <Nosotros />
        <CategoryShowcase onSelectCategory={handleSelectCategory} />
        <Catalog
          onAddToCart={handleAddToCart}
          onShowModal={(p) => setSelectedProduct(p)}
          initialCategory={jumpCategory}
          onCategoryUsed={() => setJumpCategory(null)}
        />
      </main>
      <Footer onSelectCategory={handleSelectCategory} />
      <FloatingWhatsApp />
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} setCart={setCart} />
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={handleAddToCart} />
    </div>
  );
}

export default App;
