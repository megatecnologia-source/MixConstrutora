import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Menu,
  X,
  ArrowRight,
  HardHat,
  Truck,
  Building2,
  Shovel,
  CheckCircle2,
  Clock,
  Users,
  ShieldCheck,
  Phone,
  Mail,
  MapPin,
  FileText,
  BarChart3,
  Trees,
  Store,
  Landmark,
  Construction,
  FileCheck,
  ArrowUp
} from 'lucide-react';

// --- Types ---
interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

// --- Animation Variants ---
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: NavItem[] = [
    { label: 'Home', href: '#home' },
    {
      label: 'Institucional',
      href: '#institucional',
      children: [
        { label: 'Quem Somos', href: '#quem-somos' },
        { label: 'Nossa Estrutura', href: '#estrutura' },
        { label: 'Certificações', href: '#certificacoes' },
      ]
    },
    {
      label: 'Serviços',
      href: '#servicos',
      children: [
        { label: 'Urbanização', href: '#servicos' },
        { label: 'Gestão de Resíduos', href: '#servicos' },
        { label: 'Obras Civis', href: '#servicos' },
        { label: 'Infraestrutura', href: '#servicos' },
      ]
    },
    { label: 'Portfólio', href: '#portfolio' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-bg-main/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <img
            src="https://res.cloudinary.com/dplhygs4v/image/upload/v1773698420/SITE_LOGO_MIX_CONSTRUTORA_-_FERNANDO_v2hndi.png"
            alt="Mix Construtora"
            className={`h-18 md:h-24 w-auto transition-all duration-500 ${scrolled ? 'brightness-100' : 'brightness-0 invert'}`}
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a
                href={item.href}
                className={`text-sm font-semibold uppercase tracking-widest transition-all duration-500 flex items-center gap-1 ${scrolled ? 'text-teal-deep hover:text-brand-medium' : 'text-white hover:text-white/80'}`}
                style={{ textShadow: scrolled ? 'none' : '0 1px 3px rgba(0,0,0,0.5)' }}
              >
                {item.label}
                {item.children && <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} />}
              </a>

              {item.children && (
                <AnimatePresence>
                  {activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-4 w-64 bg-white text-teal-deep p-6 shadow-2xl rounded-[24px] border border-teal-deep/5"
                    >
                      <div className="flex flex-col gap-4">
                        {item.children.map((child) => (
                          <a
                            key={child.label}
                            href={child.href}
                            className="text-xs uppercase tracking-widest hover:text-brand-medium hover:translate-x-2 transition-all duration-300 font-bold"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
          <a
            href="#contato"
            className="btn-primary"
          >
            Falar com um Consultor
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`lg:hidden transition-colors duration-500 ${scrolled ? 'text-teal-deep' : 'text-white'}`}
          onClick={() => setIsOpen(!isOpen)}
          style={{ filter: scrolled ? 'none' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))' }}
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="fixed inset-0 bg-brand-dark text-white z-50 p-10 flex flex-col gap-8"
          >
            <div className="flex justify-between items-center">
              <span className="font-display font-bold text-2xl uppercase" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>Mix</span>
              <button onClick={() => setIsOpen(false)}><X size={32} /></button>
            </div>
            <div className="flex flex-col gap-6 mt-10">
              {navItems.map((item) => (
                <div key={item.label} className="flex flex-col gap-4">
                  <a
                    href={item.href}
                    onClick={() => !item.children && setIsOpen(false)}
                    className="text-4xl font-display font-bold uppercase tracking-tighter"
                    style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
                  >
                    {item.label}
                  </a>
                  {item.children && (
                    <div className="flex flex-col gap-3 pl-4 border-l-2 border-brand-medium/30">
                      {item.children.map((child) => (
                        <a
                          key={child.label}
                          href={child.href}
                          onClick={() => setIsOpen(false)}
                          className="text-xl font-medium text-white/80"
                          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.5)' }}
                        >
                          {child.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/dplhygs4v/video/upload/v1773694818/VIDEO_HERO_SITE_MIX_CONSTRUTORA_-_FERNANDO_1_crlai1.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        {/* Dark Green Overlay */}
        <div className="absolute inset-0 bg-brand-dark/70" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-2xl"
        >
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="inline-block text-white/80 uppercase tracking-[0.4em] text-xs font-bold mb-6"
            >
              Engenharia & Infraestrutura
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-10 text-white"
            >
              Engenharia sólida para obras que transformam cidades.
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6"
            >
              <a
                href="#contato"
                className="btn-primary bg-white !text-brand-dark hover:!bg-brand-action hover:!text-white flex items-center justify-center gap-2 group"
              >
                Falar com um Consultor
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#portfolio"
                className="px-10 py-5 text-sm font-bold uppercase tracking-widest text-white border-2 border-white/30 rounded-[24px] hover:bg-white/10 transition-all flex items-center justify-center"
              >
                Ver Obras
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-white/40 text-[10px] uppercase tracking-widest font-bold"
        >
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent" />
          Explore
        </motion.div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      title: "Urbanização e Pavimentação",
      description: "Execução de vias urbanas, calçadas, drenagem, recapeamento e melhorias estruturais com precisão e conformidade técnica.",
      icon: <MapPin size={32} />,
    },
    {
      title: "Coleta e Gestão de Resíduos",
      description: "Atuação em limpeza urbana, manejo de resíduos, equipes treinadas e operação contínua com frota própria.",
      icon: <Truck size={32} />,
    },
    {
      title: "Obras Civis e Reformas",
      description: "Construções, ampliações e manutenções com foco em segurança, planejamento e entrega dentro do prazo.",
      icon: <Building2 size={32} />,
    },
    {
      title: "Terraplanagem e Infraestrutura",
      description: "Movimentação de solo, nivelamento, preparação de terrenos e apoio operacional para projetos de grande escala.",
      icon: <Shovel size={32} />,
    },
    {
      title: "Praças e Áreas de Lazer",
      description: "Execução de projetos completos de urbanização e paisagismo, focados na criação de espaços de convivência, lazer e prática esportiva que promovem o bem-estar social e a valorização do entorno urbano.",
      icon: <Trees size={32} />,
    },
    {
      title: "Mercados Municipais",
      description: "Construção e modernização de centros comerciais públicos, integrando arquitetura funcional, logística eficiente e infraestrutura resistente para potencializar o comércio local e o atendimento à população.",
      icon: <Store size={32} />,
    },
    {
      title: "Portais de Cidades",
      description: "Desenvolvimento de marcos visuais e identidade urbana através de portais monumentais que valorizam a entrada dos municípios, reforçam o potencial turístico e transmitem a solidez da gestão pública.",
      icon: <Landmark size={32} />,
    }
  ];

  return (
    <section id="servicos" className="pt-20 pb-32 bg-white diagonal-section">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-24 items-start lg:items-end"
        >
          <div className="max-w-2xl">
            <span className="text-brand-medium uppercase tracking-widest text-sm font-bold mb-6 block">Nossa Expertise</span>
            <h2 className="text-3xl md:text-6xl font-bold text-teal-deep leading-tight">
              Soluções completas em engenharia e infraestrutura.
            </h2>
          </div>
          <div className="flex flex-col items-start gap-0">
            <img
              src="https://res.cloudinary.com/dplhygs4v/image/upload/v1773698420/SITE_LOGO_MIX_CONSTRUTORA_-_FERNANDO_v2hndi.png"
              alt="Mix Construtora"
              className="h-40 md:h-56 w-auto -ml-4"
              referrerPolicy="no-referrer"
            />
            <p className="text-teal-deep/60 text-[10px] md:text-base font-medium leading-relaxed max-w-2xl">
              Na Mix Construtora, desenvolvemos projetos de engenharia que aliam o uso de tecnologias de última geração a uma execução rigorosa e planejada, visando a transformação sustentável do cenário urbano. Nossa atuação é profundamente pautada pela solidez técnica, pela ética operacional e por um compromisso inabalável com resultados de alto impacto que geram valor para a sociedade e infraestrutura regional. Unimos tradição em execução com métodos inovadores para garantir que cada obra seja um marco de durabilidade, segurança e eficiência.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="card-modern p-10 group relative overflow-hidden flex flex-col w-full md:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)]"
            >
              <div className="relative z-10 flex-grow">
                <div className="w-16 h-16 bg-brand-medium/10 text-brand-medium rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-medium group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-4 uppercase tracking-tight text-teal-deep">{service.title}</h3>
                <p className="text-teal-deep/60 leading-relaxed font-medium text-sm">
                  {service.description}
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-brand-medium/5 organic-blob group-hover:scale-150 transition-transform duration-700" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const Stats = () => {
  const stats = [
    { label: "Anos de Experiência", value: "+10", icon: <Clock size={24} /> },
    { label: "Projetos Entregues", value: "+150", icon: <CheckCircle2 size={24} /> },
    { label: "Frota Própria", value: "100%", icon: <Truck size={24} /> },
    { label: "Equipe Certificada", value: "100%", icon: <Users size={24} /> },
  ];

  return (
    <section className="bg-teal-deep py-32 relative overflow-hidden diagonal-section">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <BarChart3 size={600} className="text-brand-medium" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="text-brand-medium uppercase tracking-widest text-sm font-bold mb-4 block">Capacidade Técnica</span>
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-8 leading-tight">
              Estrutura, equipe e equipamentos para grandes contratos.
            </h2>
            <p className="text-white/70 text-lg font-medium leading-relaxed mb-12">
              A Mix Construtora opera com processos padronizados, máquinas próprias e equipes especializadas em obras públicas. Toda operação segue normas técnicas, garantindo previsibilidade, segurança e eficiência.
            </p>
            <div className="grid grid-cols-2 gap-12">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-3">
                  <div className="text-brand-medium">{stat.icon}</div>
                  <span className="text-5xl font-display font-bold text-white">{stat.value}</span>
                  <span className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[40px] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=1000"
                alt="Equipe técnica"
                className="w-full h-full object-cover grayscale-0 md:grayscale md:hover:grayscale-0 transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-brand-action p-12 rounded-[32px] hidden md:block max-w-xs shadow-2xl">
              <p className="text-white font-display italic text-xl leading-snug">
                "Nossa missão é entregar infraestrutura que suporte o crescimento das cidades com responsabilidade."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Portfolio = () => {
  const projects = [
    {
      title: "Revitalização Urbana Central",
      location: "São Paulo, SP",
      type: "Urbanização",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Complexo Viário Norte",
      location: "Curitiba, PR",
      type: "Pavimentação",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Saneamento e Drenagem",
      location: "Belo Horizonte, MG",
      type: "Infraestrutura",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <section id="portfolio" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="text-brand-medium uppercase tracking-widest text-sm font-bold mb-4 block">Obras Realizadas</span>
            <h2 className="text-3xl md:text-6xl font-bold text-teal-deep leading-tight">
              Projetos que demonstram solidez e execução.
            </h2>
          </motion.div>
          <a href="#" className="text-brand-action font-bold uppercase tracking-widest text-sm border-b-2 border-brand-action pb-2 hover:text-brand-medium hover:border-brand-medium transition-all">
            Ver Portfólio Completo
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-[32px] bg-mineral mb-8 relative shadow-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover grayscale-0 md:grayscale group-hover:grayscale-0 md:group-hover:scale-110 scale-100 group-hover:scale-105 md:scale-100 transition-all duration-1000"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-medium/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
              <span className="text-brand-medium uppercase tracking-widest text-xs font-bold block mb-3">{project.type}</span>
              <h3 className="text-xl md:text-2xl font-bold text-teal-deep mb-2 group-hover:text-brand-medium transition-colors">{project.title}</h3>
              <p className="text-teal-deep/50 font-medium">{project.location}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const TechnicalPillars = () => {
  const pillars = [
    {
      title: "Locação de Equipamentos",
      description: "Frota própria de máquinas pesadas para suporte total à obra.",
      icon: <Construction size={32} />
    },
    {
      title: "Rigour Licitatório",
      description: "Experiência em processos públicos e conformidade técnica total.",
      icon: <FileCheck size={32} />
    },
    {
      title: "Engenharia de Ponta",
      description: "Corpo técnico especializado em obras de grande porte e infraestrutura.",
      icon: <HardHat size={32} />
    }
  ];

  return (
    <section className="py-32 bg-brand-medium/5 diagonal-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-20 h-20 bg-teal-deep text-white rounded-full flex items-center justify-center mb-8 shadow-xl group hover:scale-110 transition-transform">
                {pillar.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold text-teal-deep mb-4 uppercase tracking-tight">{pillar.title}</h3>
              <p className="text-teal-deep/60 text-base font-medium leading-relaxed max-w-xs">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Differentials = () => {
  const items = [
    { title: "Prazos Rigorosos", desc: "Planejamento e cronograma executado com precisão milimétrica.", icon: <Clock size={24} /> },
    { title: "Equipe Qualificada", desc: "Engenheiros e técnicos experientes em obras de alta complexidade.", icon: <Users size={24} /> },
    { title: "Máquinas Próprias", desc: "Maior controle operacional e agilidade na mobilização.", icon: <HardHat size={24} /> },
    { title: "Alta Conformidade", desc: "Ideal para contratos públicos e processos licitatórios.", icon: <ShieldCheck size={24} /> },
    { title: "Execução Segura", desc: "Processos padronizados e controle técnico rigoroso.", icon: <ShieldCheck size={24} /> },
    { title: "Atendimento Consultivo", desc: "Suporte direto ao gestor responsável em todas as etapas.", icon: <Users size={24} /> },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center max-w-3xl mx-auto mb-24"
        >
          <span className="text-brand-medium uppercase tracking-widest text-sm font-bold mb-4 block">Diferenciais Técnicos</span>
          <h2 className="text-5xl md:text-6xl font-bold text-teal-deep">Por que gestores confiam na Mix Construtora.</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-8 group"
            >
              <div className="flex-shrink-0 w-14 h-14 bg-brand-medium/10 text-brand-medium rounded-2xl flex items-center justify-center group-hover:bg-brand-medium group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight mb-3 text-teal-deep">{item.title}</h3>
                <p className="text-teal-deep/60 text-base font-medium leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formData, setFormData] = useState({
    nome: '',
    empresa: '',
    servico: '',
    descricao: '',
    telefone: '',
    email: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
    value = value.replace(/(\d)(\d{4})$/, '$1-$2');
    setFormData({ ...formData, telefone: value });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const formDataEncoded = new URLSearchParams();
    formDataEncoded.append('form-name', 'contact');
    formDataEncoded.append('nome', formData.nome);
    formDataEncoded.append('empresa', formData.empresa);
    formDataEncoded.append('servico', formData.servico);
    formDataEncoded.append('descricao', formData.descricao);
    formDataEncoded.append('telefone', formData.telefone);
    formDataEncoded.append('email', formData.email);

    try {
      await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDataEncoded.toString()
      });
      setStatus('success');
      setFormData({ nome: '', empresa: '', servico: '', descricao: '', telefone: '', email: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contato" className="py-32 bg-bg-main diagonal-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
          >
            <span className="text-brand-medium uppercase tracking-widest text-sm font-bold mb-4 block">Contato</span>
            <h2 className="text-3xl md:text-6xl font-bold text-teal-deep mb-10 leading-tight">
              Solicite um orçamento ou agende uma visita técnica.
            </h2>
            <p className="text-teal-deep/60 text-xl font-medium mb-16">
              Atendimento direto para gestores públicos, engenheiros e empresas privadas. Nossa equipe técnica está pronta para analisar seu projeto.
            </p>

            <div className="space-y-10">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-brand-medium/10 rounded-xl flex items-center justify-center text-brand-medium">
                  <Phone size={24} />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest font-bold text-teal-deep/40 mb-2">Telefone / Whatsapp</span>
                  <p className="text-2xl font-bold text-teal-deep">(99)98118-9591</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-brand-medium/10 rounded-xl flex items-center justify-center text-brand-medium">
                  <Mail size={24} />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest font-bold text-teal-deep/40 mb-2">E-mail</span>
                  <p className="text-2xl font-bold text-teal-deep">contato@mixconstrutora.com.br</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-brand-medium/10 rounded-xl flex items-center justify-center text-brand-medium">
                  <MapPin size={24} />
                </div>
                <div>
                  <span className="block text-xs uppercase tracking-widest font-bold text-teal-deep/40 mb-2">Endereço</span>
                  <p className="text-2xl font-bold text-teal-deep">Rodovia Br 316, 37 Bairro: Centro - Bacabal, MA</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-12 md:p-16 rounded-[48px] shadow-2xl border border-teal-deep/5"
          >
            <form name="contact" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit} className="space-y-8">
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden"><input name="bot-field" /></p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest font-bold text-teal-deep/40">Nome Completo</label>
                  <input type="text" name="nome" value={formData.nome} onChange={handleChange} required className="w-full bg-bg-main rounded-2xl px-6 py-4 text-teal-deep focus:ring-2 focus:ring-brand-medium outline-none transition-all font-medium" placeholder="Seu nome" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest font-bold text-teal-deep/40">Empresa / Órgão</label>
                  <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} className="w-full bg-bg-main rounded-2xl px-6 py-4 text-teal-deep focus:ring-2 focus:ring-brand-medium outline-none transition-all font-medium" placeholder="Nome da instituição" />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest font-bold text-teal-deep/40">Tipo de Serviço</label>
                <select name="servico" value={formData.servico} onChange={handleChange} className="w-full bg-bg-main rounded-2xl px-6 py-4 text-teal-deep focus:ring-2 focus:ring-brand-medium outline-none transition-all font-medium appearance-none">
                  <option value="">Selecione um serviço</option>
                  <option value="Urbanização e Pavimentação">Urbanização e Pavimentação</option>
                  <option value="Coleta e Gestão de Resíduos">Coleta e Gestão de Resíduos</option>
                  <option value="Obras Civis e Reformas">Obras Civis e Reformas</option>
                  <option value="Terraplanagem e Infraestrutura">Terraplanagem e Infraestrutura</option>
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-xs uppercase tracking-widest font-bold text-teal-deep/40">Descrição do Projeto</label>
                <textarea name="descricao" value={formData.descricao} onChange={handleChange} rows={4} className="w-full bg-bg-main rounded-2xl px-6 py-4 text-teal-deep focus:ring-2 focus:ring-brand-medium outline-none transition-all font-medium resize-none" placeholder="Conte-nos sobre sua necessidade"></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest font-bold text-teal-deep/40">Telefone</label>
                  <input type="tel" name="telefone" value={formData.telefone} onChange={handlePhoneChange} required minLength={14} className="w-full bg-bg-main rounded-2xl px-6 py-4 text-teal-deep focus:ring-2 focus:ring-brand-medium outline-none transition-all font-medium" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-3">
                  <label className="text-xs uppercase tracking-widest font-bold text-teal-deep/40">E-mail</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" className="w-full bg-bg-main rounded-2xl px-6 py-4 text-teal-deep focus:ring-2 focus:ring-brand-medium outline-none transition-all font-medium" placeholder="seu@email.com" />
                </div>
              </div>
              <div className="pt-6">
                <button type="submit" disabled={status === 'loading'} className="btn-primary w-full flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  {status === 'loading' ? 'Enviando...' : status === 'success' ? 'Enviado com sucesso!' : 'Enviar Solicitação'}
                  <ArrowRight size={20} />
                </button>
                {status === 'success' && <p className="text-green-600 text-center mt-4 font-medium">Obrigado! Em breve nossa equipe entrará em contato.</p>}
                {status === 'error' && <p className="text-red-600 text-center mt-4 font-medium">Erro ao enviar. Tente novamente.</p>}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-teal-deep text-white py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <div className="mb-10">
              <img
                src="https://res.cloudinary.com/dplhygs4v/image/upload/v1773698420/SITE_LOGO_MIX_CONSTRUTORA_-_FERNANDO_v2hndi.png"
                alt="Mix Construtora"
                className="h-24 w-auto brightness-0 invert"
                referrerPolicy="no-referrer"
              />
            </div>
            <p className="text-white/50 text-base leading-relaxed font-medium">
              Engenharia sólida para obras que transformam cidades. Executamos com rigor técnico e conformidade legal.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-10 text-brand-medium">Institucional</h4>
            <ul className="space-y-5 text-base font-medium opacity-60">
              <li><a href="#" className="hover:text-brand-medium transition-colors">Quem Somos</a></li>
              <li><a href="#" className="hover:text-brand-medium transition-colors">Nossa Estrutura</a></li>
              <li><a href="#" className="hover:text-brand-medium transition-colors">Certificações</a></li>
              <li><a href="#portfolio" className="hover:text-brand-medium transition-colors">Portfólio</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-10 text-brand-medium">Serviços</h4>
            <ul className="space-y-5 text-base font-medium opacity-60">
              <li><a href="#servicos" className="hover:text-brand-medium transition-colors">Urbanização</a></li>
              <li><a href="#servicos" className="hover:text-brand-medium transition-colors">Gestão de Resíduos</a></li>
              <li><a href="#servicos" className="hover:text-brand-medium transition-colors">Obras Civis</a></li>
              <li><a href="#servicos" className="hover:text-brand-medium transition-colors">Terraplanagem</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-10 text-brand-medium">Contato</h4>
            <ul className="space-y-5 text-base font-medium opacity-60">
              <li className="flex items-center gap-3"><MapPin size={16} className="text-brand-medium" /> Bacabal, MA</li>
              <li className="flex items-center gap-3"><Phone size={16} className="text-brand-medium" /> (99)98118-9591</li>
              <li className="pt-6 text-xs opacity-40">CNPJ: 00.000.000/0001-00</li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-xs uppercase tracking-widest font-bold text-white/30">
            © 2026 Mix Construtora. Todos os direitos reservados.
          </p>

          <div className="flex gap-10">
            <a href="#" className="text-white/30 hover:text-brand-medium transition-colors"><FileText size={20} /></a>
            <a href="#" className="text-white/30 hover:text-brand-medium transition-colors"><ShieldCheck size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.me/5599981189591?text=Olá,%20gostaria%20de%20agendar%20uma%20reunião%20com%20a%20Mix%20Construtora"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl group"
    >
      <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20 group-hover:opacity-40" />
      <svg
        viewBox="0 0 24 24"
        className="w-8 h-8 fill-white"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
    </motion.a>
  );
};

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      if (scrolled > 300) {
        setVisible(true);
      } else if (scrolled <= 300) {
        setVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          className="fixed bottom-8 right-28 z-50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-teal-deep/40 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-md shadow-sm">Voltar ao topo</span>
          <button
            onClick={scrollToTop}
            className="w-16 h-16 bg-white text-teal-deep rounded-full flex items-center justify-center shadow-2xl hover:bg-brand-medium hover:text-white transition-all duration-300 border border-teal-deep/5"
          >
            <ArrowUp size={24} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <Portfolio />
      <TechnicalPillars />
      <Differentials />
      <Contact />
      <Footer />
      <WhatsAppButton />
      <BackToTop />
    </div>
  );
}
