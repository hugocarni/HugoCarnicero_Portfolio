import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Terminal,
  Shield,
  Code,
  Network,
  Eye,
  Mail,
  Linkedin,
  Github,
  X,
  ChevronRight,
  FileText,
  MessageCircle
} from 'lucide-react';
import { initialPortfolioData } from './data';
import { PortfolioData } from './types';

export default function App() {
  const data: PortfolioData = initialPortfolioData;
  const experienceItems = data.trajectory.filter(item => item.category === 'experience');
  const educationItems = data.trajectory.filter(item => item.category === 'education');

  // UI state
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'SYSTEM ONLINE - ENTORNO SEGURO ACTIVO',
    'Bienvenido a la consola interactiva de Hugo Carnicero.',
    'Escribe "help" para ver los comandos de control disponibles.',
    ''
  ]);
  const [activeSection, setActiveSection] = useState('intro');
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Refs
  const terminalHistoryEndRef = useRef<HTMLDivElement>(null);

  // Set document title dynamically
  useEffect(() => {
    document.title = `${data.personalInfo.name} | Especialista en Ciberseguridad & Desarrollo Web`;
  }, [data.personalInfo.name]);

  // Keep track of scroll positions to update active header link
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['intro', 'trajectory', 'projects', 'skills'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.clientHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Autofocus terminal index & scroll to bottom
  useEffect(() => {
    if (terminalHistoryEndRef.current) {
      terminalHistoryEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory]);

  // Copy email to clipboard
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(data.personalInfo.contactEmail);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  // Terminal command prompt handling
  const handleTerminalSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...terminalHistory, `guest@hugo_carni_portfolio:~$ ${terminalInput}`];

    switch (cmd) {
      case 'help':
        newHistory.push(
          'Comandos de Consola Disponibles:',
          '  about       - Describe mi especialidad y enfoque profesional.',
          '  skills      - Muestra mi matriz de competencias técnicas.',
          '  projects    - Lista los proyectos destacados desarrollados.',
          '  contact     - Proporciona coordenadas de contacto directo.',
          '  cv          - Abre el visor de Currículum para guardar como PDF.',
          '  clear       - Borra la pantalla actual de la terminal.',
          '  exit        - Cierra la interfaz de terminal interactiva.'
        );
        break;
      case 'about':
        newHistory.push(
          `Perfil: ${data.personalInfo.name}`,
          `Especialidad: ${data.personalInfo.tagline}`,
          `Descripción: ${data.personalInfo.description}`
        );
        break;
      case 'skills':
        newHistory.push('MATRIZ DE COMPETENCIAS TÉCNICAS:');
        data.skillsMatrix.forEach(cat => {
          newHistory.push(` • [${cat.title}]`);
          cat.skills.forEach(sk => {
            newHistory.push(`   - ${sk.name} [COMPETENCIA ACTIVA]`);
          });
        });
        break;
      case 'projects':
        newHistory.push('PROYECTOS DESTACADOS:');
        data.projects.forEach(p => {
          newHistory.push(` • ${p.title}: ${p.description} [Tags: ${p.tags.join(', ')}]`);
        });
        break;
      case 'contact':
        newHistory.push(
          'COORDENADAS DE CONTACTO DIRECTO:',
          `  Email: ${data.personalInfo.contactEmail}`,
          `  LinkedIn: ${data.personalInfo.linkedinUrl}`,
          `  GitHub: ${data.personalInfo.githubUrl}`
        );
        break;
      case 'cv':
        newHistory.push(
          'PROCESANDO SOLICITUD DE CV...',
          'Abriendo PDF del Currículum en nueva pestaña...'
        );
        window.open('/CV_Carta_HugoCarnicero.pdf', '_blank');
        break;
      case 'clear':
        setTerminalHistory(['Consola de sistemas reseteada con éxito.', '']);
        setTerminalInput('');
        return;
      case 'exit':
        setTerminalOpen(false);
        break;
      default:
        newHistory.push(`Comando no reconocido: "${cmd}". Escribe "help" para ver instrucciones.`);
    }

    setTerminalHistory(newHistory);
    setTerminalInput('');
  };

  return (
    <div className="font-sans text-[#ccc] bg-[#0a0a0a] min-h-screen overflow-x-hidden selection:bg-secondary/40 selection:text-white pb-10">
      
      {/* Main Grid Decorative Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-repeat cyber-grid h-full" />

      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-40 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#222] shadow-lg no-print">
        <div className="flex justify-between items-center h-20 px-6 sm:px-10 md:px-16 lg:px-24 max-w-7xl mx-auto w-full">
          {/* Logo / Title */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <Shield className="w-5 h-5 text-secondary animate-pulse" />
            <div className="font-mono text-xs tracking-[0.2em] font-bold text-white uppercase">
              {data.personalInfo.name}
            </div>
          </motion.div>

          {/* Nav for Desktop */}
          <nav className="hidden md:flex gap-6 font-mono text-[10px] items-center uppercase tracking-[0.2em]">
            {[
              { id: 'intro', label: 'Intro' },
              { id: 'trajectory', label: 'Experiencia' },
              { id: 'projects', label: 'Proyectos' },
              { id: 'skills', label: 'Competencias' },
            ].map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className={`transition-colors duration-200 uppercase pb-1 ${
                  activeSection === section.id
                    ? 'text-white font-semibold border-b border-secondary'
                    : 'hover:text-primary text-[#666]'
                }`}
              >
                {section.label}
              </a>
            ))}
          </nav>

          {/* Tools & Interactive actions */}
          <div className="flex items-center gap-sm">
            {/* Terminal Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTerminalOpen(!terminalOpen)}
              className="p-2 text-secondary hover:text-white transition-colors cursor-pointer rounded-none bg-[#111] border border-[#333] flex items-center gap-1.5"
              title="Consola Interactiva"
            >
              <Terminal className="w-4 h-4" />
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider">Terminal</span>
            </motion.button>

            {/* Currículum Button */}
            <a
              href="/CV_Carta_HugoCarnicero.pdf"
              target="_blank"
              rel="noreferrer"
              className="p-2 text-primary hover:text-white transition-colors cursor-pointer rounded-none bg-[#111] border border-[#333] flex items-center gap-1.5"
              title="Ver Currículum"
            >
              <FileText className="w-4 h-4" />
              <span className="hidden sm:inline font-mono text-[10px] uppercase tracking-wider">Ver CV</span>
            </a>

            {/* Quick Contact Action Button */}
            <a
              href="#contact"
              className="bg-secondary text-[#0a0a0a] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-none font-bold hover:scale-102 active:scale-98 transition-all text-center border border-[#333] cursor-pointer inline-block"
            >
              Contacto
            </a>
          </div>
        </div>
      </header>

      {/* Cyber Hero / Introduction Section */}
      <section className="relative min-h-[95vh] flex items-center px-6 sm:px-10 md:px-16 lg:px-24 max-w-7xl mx-auto py-24 md:py-36 md:pt-40" id="intro">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center w-full">
          
          {/* Main Info Blocks with Motion Entrances */}
          <div className="space-y-8 md:space-y-10 col-span-1 md:col-span-7 order-2 md:order-1">
            {/* Tagline / Available status pill */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#111] border border-[#333] rounded-none shadow-sm"
            >
              <span className={`w-2 h-2 rounded-full ${data.personalInfo.availableForHire ? 'bg-[#10B981]' : 'bg-[#404040]'}`}></span>
              <span className="font-mono text-[10px] text-secondary uppercase tracking-widest font-semibold">
                {data.personalInfo.availableForHire ? 'Disponible para Contratación' : 'No Disponible'}
              </span>
            </motion.div>

            {/* Main Header Taglines */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tighter leading-[1.05] uppercase font-sans"
            >
              CIBERSEGURIDAD <br />
              <span className="text-secondary">& DESARROLLO</span> <br />
              WEB ROBUSTO.
            </motion.h1>

            {/* Bio Description block */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-sm md:text-base text-[#AAA] max-w-xl leading-loose font-sans"
            >
              {data.personalInfo.description}
            </motion.p>

            {/* Main action CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 sm:gap-6 pt-4 md:pt-6"
            >
              <a
                href="/CV_Carta_HugoCarnicero.pdf"
                download="CV_Hugo_Carnicero.pdf"
                className="bg-secondary text-[#0a0a0a] border border-[#333] px-6 py-3 font-mono text-xs rounded-none glow-button font-bold flex items-center justify-center gap-2.5 transition-all duration-200 active:scale-95 shadow cursor-pointer text-center uppercase tracking-wider no-print inline-flex"
              >
                <FileText className="w-4 h-4" />
                Ver / Descargar CV
              </a>
              <a
                href="#projects"
                className="border border-[#333] text-white hover:bg-[#111] px-6 py-3 font-mono text-xs rounded-none transition-all duration-200 active:scale-95 flex items-center justify-center gap-2.5 uppercase tracking-wider text-center"
              >
                <Eye className="w-4 h-4" />
                Ver Proyectos
              </a>
            </motion.div>
          </div>

          {/* Profile Photo Side Component */}
          <div className="col-span-1 md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative group"
            >
              {/* Outer Cyan Cosmic Blur Glow */}
              <div className="absolute -inset-2 bg-secondary/5 rounded-none blur-2xl group-hover:bg-secondary/10 transition-all duration-500"></div>
              
              {/* Precise Squared Container Framework */}
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-none overflow-hidden border border-[#333] bg-[#111] p-3 transition-colors group-hover:border-secondary">
                <img
                  alt={data.personalInfo.tagline}
                  className="w-full h-full object-cover rounded-none grayscale contrast-110 hover:grayscale-0 transition-all duration-500 hover:scale-103"
                  src={data.personalInfo.profilePicUrl}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600";
                  }}
                />
              </div>

              {/* Float Arch Version badge */}
              <div className="absolute -bottom-2 -right-2 glass-card px-3 py-1.5 rounded-none border border-[#333] bg-[#0c0c0c]">
                <span className="font-mono text-[10px] text-[#555] tracking-widest uppercase">
                  VER: {data.personalInfo.version}
                </span>
              </div>
            </motion.div>
          </div>

        </div>
      </section>

      {/* Trajectory / Experience & Education Split Columns Section */}
      <section className="py-24 md:py-36 px-6 sm:px-10 md:px-16 lg:px-24 max-w-7xl mx-auto border-t border-[#222]" id="trajectory">
        {/* Module Header titles */}
        <div className="mb-16 md:mb-20 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-secondary rounded-none"></span>
            <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold text-[10px]">Estructura</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tighter uppercase font-sans">Trayectoria Académica y Profesional</h2>
          <div className="h-[1px] w-20 bg-secondary"></div>
        </div>

        {/* Columns Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Experiencia Profesional */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-[#222] pb-4">
              <span className="w-2 h-2 bg-secondary rounded-none"></span>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-sans">
                Experiencia Profesional
              </h3>
            </div>
            
            <div className="relative pl-6 space-y-10 mt-8">
              {/* Vertical timeline line for this column */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#222]"></div>
              
              {experienceItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative group pr-2"
                >
                  {/* Square indicator dot */}
                  <div className={`absolute left-[-28px] top-1.5 w-2.5 h-2.5 rounded-none transition-transform duration-300 group-hover:scale-125 ${
                    item.type === 'security' ? 'bg-[#10B981]' :
                    item.type === 'development' ? 'bg-secondary' :
                    'bg-[#cfcfcf]'
                  }`}></div>
                  
                  {/* Glass content card */}
                  <div className="glass-card p-6 border border-[#222] bg-[#111] hover:border-[#333] transition-all relative">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c1c1c] pb-3 mb-3">
                      <div>
                        <h4 className="text-sm md:text-base font-bold text-white uppercase">{item.title}</h4>
                        <p className="font-mono text-[10px] text-secondary tracking-widest uppercase mt-0.5">{item.subtitle}</p>
                      </div>
                      <span className="font-mono text-[9px] text-zinc-500 bg-[#161616] px-2 py-0.5 border border-[#222] self-start sm:self-center uppercase shrink-0">
                        {item.dateRange}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-[#999] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Formación Académica */}
          <div className="space-y-8">
            <div className="flex items-center gap-3 border-b border-[#222] pb-4">
              <span className="w-2 h-2 bg-emerald-500 rounded-none"></span>
              <h3 className="text-lg font-bold text-white uppercase tracking-wider font-sans">
                Formación Académica
              </h3>
            </div>
            
            <div className="relative pl-6 space-y-10 mt-8">
              {/* Vertical timeline line for this column */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-[#222]"></div>
              
              {educationItems.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative group pr-2"
                >
                  {/* Square indicator dot */}
                  <div className={`absolute left-[-28px] top-1.5 w-2.5 h-2.5 rounded-none transition-transform duration-300 group-hover:scale-125 ${
                    item.type === 'security' ? 'bg-[#10B981]' :
                    item.type === 'development' ? 'bg-secondary' :
                    'bg-[#cfcfcf]'
                  }`}></div>
                  
                  {/* Glass content card */}
                  <div className="glass-card p-6 border border-[#222] bg-[#111] hover:border-[#333] transition-all relative">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1c1c1c] pb-3 mb-3">
                      <div>
                        <h4 className="text-sm md:text-base font-bold text-white uppercase">{item.title}</h4>
                        <p className="font-mono text-[10px] text-emerald-400 tracking-widest uppercase mt-0.5">{item.subtitle}</p>
                      </div>
                      <span className="font-mono text-[9px] text-zinc-500 bg-[#161616] px-2 py-0.5 border border-[#222] self-start sm:self-center uppercase shrink-0">
                        {item.dateRange}
                      </span>
                    </div>
                    <p className="text-xs md:text-sm text-[#999] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Projects Grid Section Layout */}
      <section className="py-24 md:py-36 border-t border-[#222] px-6 sm:px-10 md:px-16 lg:px-24 max-w-7xl mx-auto" id="projects">
        {/* Module Header Title Section */}
        <div className="mb-12 md:mb-16 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-secondary rounded-none"></span>
            <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold text-[10px]">Ecosistemas</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tighter uppercase font-sans">Proyectos y Entornos de Laboratorio</h2>
          <div className="h-[1px] w-20 bg-secondary"></div>
        </div>

        {/* Highlighted projects grid structure */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mt-10 md:mt-12">
          {data.projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="glass-card group border border-[#222] bg-[#111] flex flex-col justify-between overflow-hidden hover:border-secondary transition-all"
            >
              <div className="relative">
                {/* Media representation box wrapper */}
                <div className="aspect-video w-full overflow-hidden border-b border-[#222] bg-[#0c0c0c]">
                  <img
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-104 grayscale group-hover:grayscale-0"
                    src={project.imageUrl}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600";
                    }}
                  />
                  <div className="absolute inset-0 bg-[#0a0a0a]/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <a
                      href={project.actionUrl === '#' ? '#intro' : project.actionUrl}
                      className="bg-secondary text-[#0a0a0a] px-6 py-2.5 rounded-none font-mono text-xs font-bold transition-all transform translate-y-2 group-hover:translate-y-0 duration-300 shadow-lg border border-[#333] uppercase tracking-wider"
                    >
                      {project.actionText}
                    </a>
                  </div>
                </div>

                {/* Information Details Card Body */}
                <div className="p-6 md:p-8 space-y-4">
                  <h3 className="text-base md:text-lg font-bold text-white tracking-tight group-hover:text-secondary transition-colors uppercase font-sans">
                    {project.title}
                  </h3>
                  <p className="text-[#999] text-xs md:text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Tags panel bottom placement */}
              <div className="p-6 md:p-8 pt-0 border-t border-[#1c1c1c] bg-[#131313]/50">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span 
                      key={tag}
                      className="font-mono text-[9px] px-2.5 py-0.5 rounded-none bg-[#161616] text-[#888] border border-[#262626] uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Cyber Skills Matrix Section */}
      <section className="py-24 md:py-36 border-t border-[#222] px-6 sm:px-10 md:px-16 lg:px-24 max-w-7xl mx-auto" id="skills">
        {/* Module Header Title Section */}
        <div className="mb-12 md:mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-2 justify-center">
            <span className="w-1.5 h-1.5 bg-secondary rounded-none"></span>
            <span className="font-mono text-xs text-secondary uppercase tracking-widest font-semibold text-[10px]">Matriz de Competencias</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tighter uppercase font-sans">Equilibrio Técnico de Especialista</h2>
          <p className="text-[#888] max-w-xl mx-auto text-xs md:text-sm leading-relaxed font-sans">
            Equilibrio de destrezas entre la defensa cibernética de sistemas, la construcción robusta en desarrollo y la orquestación e implantación de infraestructuras corporativas.
          </p>
          <div className="h-[1px] w-20 bg-secondary mx-auto"></div>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 mt-10 md:mt-12">
          {data.skillsMatrix.map((category, idx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="space-y-6 md:space-y-8"
            >
              {/* Category header titles */}
              <div className="flex items-center gap-3 mb-4 border-b border-[#222] pb-2">
                {category.icon === 'security' && <Shield className="w-5 h-5 text-tertiary" />}
                {category.icon === 'development' && <Code className="w-5 h-5 text-secondary" />}
                {category.icon === 'systems' && <Network className="w-5 h-5 text-primary" />}
                <h3 className="text-sm font-bold text-white uppercase tracking-wider font-sans">{category.title}</h3>
              </div>

              {/* Sub-skill cards list */}
              <div className="space-y-3 md:space-y-4">
                {category.skills.map((skill) => (
                  <div 
                    key={skill.name}
                    className="p-4 rounded-none border border-[#222] bg-[#111] flex items-center justify-between hover:border-secondary transition-all"
                  >
                    <span className="font-mono text-[11px] text-[#ccc]">
                      {skill.name}
                    </span>
                    
                    {/* Square indicator dot matching Geometric theme */}
                    <div className="flex items-center gap-1.5">
                      <span className={`w-1.5 h-1.5 rounded-none ${
                        category.icon === 'security' ? 'bg-[#10B981]' :
                        category.icon === 'development' ? 'bg-secondary' :
                        'bg-white'
                      }`}></span>
                      <span className="font-mono text-[9px] uppercase text-[#666] tracking-wider">
                        {skill.level}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Direct Section placement */}
      <section className="py-24 md:py-36 border-t border-[#222]" id="contact">
        <div className="max-w-5xl mx-auto px-6 sm:px-10 md:px-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card rounded-none p-10 md:p-16 text-center space-y-8 relative overflow-hidden border border-[#222] bg-[#111]"
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tighter max-w-2xl mx-auto leading-snug uppercase font-sans">
              ¿Preparado para asegurar y escalar tu próximo proyecto tecnológico?
            </h2>
            <p className="text-[10px] sm:text-xs text-[#888] tracking-widest uppercase font-mono max-w-xl mx-auto leading-relaxed">
              Actualmente busco nuevas oportunidades donde aplicar mi experiencia técnica en el nexo estratégico entre el desarrollo de software seguro y la administración de redes corporativas.
            </p>

            <div className="flex flex-col items-center gap-3 pt-4">
              <p className="font-mono text-xs text-secondary tracking-wider font-bold">
                {data.personalInfo.contactEmail}
              </p>
              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto bg-[#111] hover:bg-[#1c1c1c] text-white border border-[#333] px-8 py-3.5 font-mono text-xs rounded-none font-bold text-center flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer"
              >
                <Mail className="w-4 h-4 text-secondary" />
                {copiedEmail ? 'Copiado!' : 'Copiar Email'}
              </button>
              {data.personalInfo.whatsAppUrl && (
                <a
                  href={data.personalInfo.whatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-black px-8 py-3.5 font-mono text-xs rounded-none font-extrabold text-center flex items-center justify-center gap-2 uppercase tracking-widest cursor-pointer transition-all border border-emerald-500 hover:border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                >
                  <MessageCircle className="w-4 h-4 fill-black text-black" />
                  Escribir por WhatsApp
                </a>
              )}
              <a
                href={data.personalInfo.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto border border-[#333] hover:border-white text-white px-8 py-3.5 font-mono text-xs rounded-none hover:bg-[#161616] text-center flex items-center justify-center gap-2 transition-all duration-200 uppercase tracking-widest cursor-pointer"
              >
                <Linkedin className="w-4 h-4 text-secondary" />
                LinkedIn Profile
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Global Bottom Footer area */}
      <footer className="mt-20 border-t border-[#222] py-12 flex flex-col md:flex-row justify-between items-center text-[10px] tracking-[0.2em] uppercase text-zinc-550 max-w-7xl mx-auto px-6 sm:px-10 md:px-16 lg:px-24 bg-[#0a0a0a] no-print text-[#888]">
        <div className="text-zinc-500">© {new Date().getFullYear()} {data.personalInfo.name}</div>
        <div className="flex space-x-10 my-4 md:my-0">
          <a href={data.personalInfo.githubUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-secondary transition-colors font-mono">GitHub</a>
          <a href={data.personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-secondary transition-colors font-mono">LinkedIn</a>
          <button onClick={handleCopyEmail} className="text-zinc-400 hover:text-secondary transition-colors font-mono cursor-pointer bg-transparent border-none p-0">{copiedEmail ? 'Copiado!' : data.personalInfo.contactEmail}</button>
        </div>
        <div className="text-zinc-500">Designed for Precision</div>
      </footer>

      {/* ========================================================= */}
      {/* SECTION: INTERACTIVE OVERLAY TERMINAL PANEL */}
      {/* ========================================================= */}
      <AnimatePresence>
        {terminalOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 h-[60vh] md:h-[50vh] bg-[#0c0f16]/95 border-t-2 border-secondary/50 shadow-2xl z-55 overflow-hidden flex flex-col font-mono no-print"
          >
            {/* Terminal Header Action Bar */}
            <div className="bg-[#131a26] px-md py-sm flex justify-between items-center border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-secondary animate-pulse" />
                <span className="text-[10px] font-bold text-white uppercase tracking-widest select-none">HUGO_TERMINAL_SHELL: activo</span>
              </div>
              
              <div className="flex items-center gap-sm">
                <span className="text-[9px] text-zinc-500 hidden sm:inline">Escribe "help" para ver manual de comandos</span>
                <button 
                  onClick={() => setTerminalOpen(false)}
                  className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Terminal output content logs */}
            <div className="flex-1 overflow-y-auto p-md space-y-2 text-xs text-zinc-400">
              {terminalHistory.map((line, idx) => (
                <div key={idx} className="whitespace-pre-wrap leading-relaxed select-text">
                  {line.startsWith('guest@') ? (
                    <span className="text-secondary">{line}</span>
                  ) : line.startsWith('Comandos') || line.startsWith('MATRIZ') || line.startsWith('PROYECTOS') || line.startsWith('COORDENADAS') ? (
                    <span className="text-emerald-400 font-bold">{line}</span>
                  ) : (
                    <span>{line}</span>
                  )}
                </div>
              ))}
              <div ref={terminalHistoryEndRef} />
            </div>

            {/* Terminal Form input area */}
            <form 
              onSubmit={handleTerminalSubmit}
              className="bg-[#0b0c10] border-t border-[#1c1c1c] px-md py-sm flex items-center justify-between gap-sm"
            >
              <div className="flex-1 flex items-center gap-xs">
                <span className="text-secondary text-xs font-bold flex-shrink-0 select-none">guest@hugo_carni_portfolio:~$</span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Escribe comando (ayuda: help)..."
                  className="flex-1 bg-transparent text-xs text-white focus:outline-none border-none py-1 block font-mono"
                  autoFocus
                />
              </div>
              <button 
                type="submit"
                className="bg-secondary/15 hover:bg-secondary text-secondary hover:text-[#0a0a0a] border border-secondary/35 transition-all font-bold px-4 py-1.5 rounded-none text-[10px] cursor-pointer"
              >
                EJECUTAR
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
