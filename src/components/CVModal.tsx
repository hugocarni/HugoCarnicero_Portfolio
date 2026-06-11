import { motion } from 'motion/react';
import { X, Printer, Download, Mail, Phone, ExternalLink } from 'lucide-react';
import { PortfolioData } from '../types';

interface CVModalProps {
  data: PortfolioData;
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ data, isOpen, onClose }: CVModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#07090e]/90 backdrop-blur-md overflow-y-auto no-print">
      {/* Scrollable Container on Screen */}
      <div className="w-full max-w-4xl min-h-screen py-8 px-4 flex flex-col items-center">
        
        {/* Floating Controls Bar */}
        <div className="w-full max-w-3xl mb-4 bg-[#111] border border-[#333] p-3 flex justify-between items-center text-xs font-mono text-white">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-bold uppercase tracking-widest">Currículum Vitae: Hugo Carnicero</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary text-[#0a0a0a] font-bold hover:bg-[#38bdf8] transition-colors cursor-pointer rounded-none border border-secondary"
            >
              <Printer className="w-3.5 h-3.5" />
              Imprimir / Guardar PDF
            </button>
            <button
              onClick={onClose}
              className="p-1 px-2.5 bg-zinc-800 hover:bg-zinc-700 transition-colors text-[#ccc] cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* High-Fidelity Printable CV Card */}
        <div 
          id="printable-cv"
          className="printable-cv-display w-full max-w-3xl bg-white text-zinc-900 border border-[#333] shadow-2xl p-8 md:p-12 font-sans relative flex flex-col gap-8 leading-relaxed selection:bg-secondary/20 selection:text-zinc-900"
        >
          {/* Header Strip */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-zinc-900 pb-6 gap-4">
            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.3em] text-zinc-500 uppercase font-bold font-mono">Portafolio Curricular</span>
              <h1 className="text-4xl font-extrabold tracking-tighter text-zinc-900 uppercase">HUGO CARNICERO</h1>
              <p className="text-sm font-mono tracking-widest font-bold text-secondary uppercase bg-zinc-100 px-2 py-1 inline-block">
                Especialista en Ciberseguridad & Desarrollador Web
              </p>
            </div>
            
            {/* Contact Specs */}
            <div className="text-xs font-mono space-y-1.5 text-zinc-700 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-zinc-200">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-zinc-900" />
                <span>{data.personalInfo.contactEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-zinc-900" />
                <a href={data.personalInfo.whatsAppUrl} target="_blank" rel="noreferrer" className="underline hover:text-emerald-600 font-bold flex items-center gap-1">
                  +34 {data.personalInfo.phone || "611 405 105"} <span className="text-[9px] bg-emerald-50 text-emerald-600 px-1 py-0.2 border border-emerald-200 uppercase font-bold tracking-wider rounded-none">WhatsApp</span>
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-zinc-900" />
                <a href={data.personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="underline hover:text-secondary">
                  LinkedIn Profile
                </a>
              </div>
              <div className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-zinc-900" />
                <a href={data.personalInfo.githubUrl} target="_blank" rel="noreferrer" className="underline hover:text-secondary">
                  GitHub Profile
                </a>
              </div>
            </div>
          </div>

          {/* Profile Statement */}
          <div className="space-y-2">
            <h2 className="text-xs font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase">Sobre Mí</h2>
            <p className="text-sm text-zinc-700 leading-relaxed text-left">
              Especialista en Ciberseguridad y Desarrollo Web con sólida formación en implantación de sistemas, administración de redes corporativas y seguridad de la información. Experiencia en desarrollo full-stack, fortificación de arquitecturas computacionales, administración avanzada de entornos Windows/Linux y cumplimiento de estándares rigurosos como el Esquema Nacional de Seguridad (ENS) e ISO 27001. Interesado en potenciar defensas digitales activas en empresas con visión innovadora.
            </p>
          </div>

          {/* Main Content Grid: columns */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Left Column: Experiencia & Formación */}
            <div className="col-span-1 md:col-span-7 space-y-8">
              
              {/* Experiencia */}
              <div className="space-y-4">
                <h3 className="text-sm font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase border-b border-zinc-200 pb-1">
                  Experiencia Profesional
                </h3>
                
                <div className="space-y-5">
                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline font-semibold text-zinc-950 text-xs">
                      <h4 className="font-bold text-sm">Desarrollador Web y Técnico de Mantenimiento</h4>
                      <span className="font-mono text-[10px] text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded-none shrink-0 ml-2">2025 - Act.</span>
                    </div>
                    <p className="text-xs font-mono font-bold text-zinc-600">CENTER TECNIFICACIÓN</p>
                    <ul className="list-disc pl-4 text-xs text-zinc-700 space-y-1 mt-1.5">
                      <li>Desarrollo continuado y mantenimiento preventivo/correctivo de aplicaciones y portales corporativos.</li>
                      <li>Implementación proactiva de mejoras funcionales y optimización de flujos de código de cara al usuario.</li>
                      <li>Soporte técnico integral para asegurar el óptimo funcionamiento y robustez de infraestructuras informáticas.</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline font-semibold text-zinc-950 text-xs">
                      <h4 className="font-bold text-sm">Desarrollador de Software</h4>
                      <span className="font-mono text-[10px] text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded-none shrink-0 ml-2">2025 (4 meses)</span>
                    </div>
                    <p className="text-xs font-mono font-bold text-zinc-600">PSINNOVA</p>
                    <ul className="list-disc pl-4 text-xs text-zinc-700 space-y-1 mt-1.5">
                      <li>Participación activa en el diseño e ingeniería de módulos informáticos siguiendo directrices de pulcritud extrema de código.</li>
                      <li>Resolución sistemática de incidencias complejas y despliegue integrado bajo control de versiones Git.</li>
                    </ul>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between items-baseline font-semibold text-zinc-950 text-xs">
                      <h4 className="font-bold text-sm">Técnico de Sistemas Informáticos</h4>
                      <span className="font-mono text-[10px] text-zinc-500 bg-zinc-100 px-1.5 py-0.5 rounded-none shrink-0 ml-2">2023 (4 meses)</span>
                    </div>
                    <p className="text-xs font-mono font-bold text-zinc-600">ALT SOLUTIONS</p>
                    <ul className="list-disc pl-4 text-xs text-zinc-700 space-y-1 mt-1.5">
                      <li>Instalación, cableado y configuración de redes e infraestructuras locales de trabajo.</li>
                      <li>Atención técnica directa y reparación correctiva de hardware y software de forma presencial.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Formación */}
              <div className="space-y-4">
                <h3 className="text-sm font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase border-b border-zinc-200 pb-1">
                  Formación Académica
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-baseline text-xs font-semibold text-zinc-950">
                      <h4 className="font-bold text-sm">Curso de Especialización en Ciberseguridad</h4>
                      <span className="font-mono text-[10px] text-zinc-500 shrink-0 ml-2">2025 - 2026</span>
                    </div>
                    <p className="text-xs text-zinc-600">IES El Cañaveral, Móstoles</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline text-xs font-semibold text-zinc-950">
                      <h4 className="font-bold text-sm">Técnico Superior en Desarrollo de Aplicaciones Web (DAW)</h4>
                      <span className="font-mono text-[10px] text-zinc-500 shrink-0 ml-2">2023 - 2025</span>
                    </div>
                    <p className="text-xs text-zinc-600">IES Gabriel García Márquez, Leganés</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-baseline text-xs font-semibold text-zinc-950">
                      <h4 className="font-bold text-sm">Técnico en Sistemas Microinformáticos y Redes (SMR)</h4>
                      <span className="font-mono text-[10px] text-zinc-500 shrink-0 ml-2">2021 - 2023</span>
                    </div>
                    <p className="text-xs text-zinc-600">Colegio La Inmaculada - Padres Escolapios</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Habilidades & Recomendación */}
            <div className="col-span-1 md:col-span-5 space-y-8">
              
              {/* Categorías Técnicas */}
              <div className="space-y-4">
                <h3 className="text-sm font-mono font-bold tracking-[0.2em] text-zinc-500 uppercase border-b border-zinc-200 pb-1">
                  Aptitudes Técnicas
                </h3>
                
                <div className="space-y-4">
                  {/* Ciberseguridad */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest font-bold text-zinc-500 uppercase">Ciberseguridad</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {['DevSecOps', 'Bastionado', 'Incident Response', 'ENS', 'ISO 27001'].map(tag => (
                        <span key={tag} className="text-[10px] bg-zinc-100 text-zinc-800 px-2 py-0.5 border border-zinc-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Desarrollo */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest font-bold text-zinc-500 uppercase">Desarrollo Web</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {['HTML5 / CSS3', 'JavaScript', 'PHP', 'Bootstrap', 'MySQL', 'Diseño UI/UX'].map(tag => (
                        <span key={tag} className="text-[10px] bg-zinc-100 text-zinc-800 px-2 py-0.5 border border-zinc-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Sistemas */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest font-bold text-zinc-500 uppercase">Sistemas & Redes</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {['Linux Server', 'Windows Server', 'Servicios de Red', 'Mantenimiento'].map(tag => (
                        <span key={tag} className="text-[10px] bg-zinc-100 text-zinc-800 px-2 py-0.5 border border-zinc-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recomendación profesional highlights */}
              <div className="space-y-3 bg-zinc-50 p-4 border border-zinc-150">
                <h4 className="text-[10px] font-mono tracking-wider font-bold text-zinc-500 uppercase">
                  Extractos de Tutor Académico
                </h4>
                <div className="space-y-2 text-[11px] text-zinc-600 italic">
                  <p>
                    "Hugo destacó de manera sobresaliente... con rapidez mental y capacidad de análisis muy por encima de la media."
                  </p>
                  <p>
                    "En Aplicaciones Web, mostró vocación como desarrollador excepcional, destacando por su pulcritud en el código y compromiso con las buenas prácticas."
                  </p>
                  <p>
                    "Liderazgo natural, sinceridad, empatía y adaptabilidad absoluta a entornos TI complejos."
                  </p>
                </div>
                <div className="text-[9px] font-mono font-bold text-zinc-500 uppercase text-right mt-1.5">
                  — Jesús Millanes (Seminario Informática)
                </div>
              </div>

            </div>
          </div>
          
          {/* Footer of CV */}
          <div className="text-center border-t border-zinc-200 pt-6 mt-4">
            <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              Hugo Carnicero // Especialista en Ciberseguridad // hugocarni2004@gmail.com
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
