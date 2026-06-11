import { PortfolioData } from './types';

export const initialPortfolioData: PortfolioData = {
  personalInfo: {
    name: "Hugo Carnicero",
    tagline: "Especialista en Ciberseguridad & Desarrollador Web",
    roles: ["Especialista en Ciberseguridad", "Desarrollador Web"],
    description: "Especialista en Ciberseguridad y Desarrollo Web con formación avanzada en sistemas, redes y seguridad informática. Experiencia en el nexo entre el desarrollo de aplicaciones robustas, el bastionado de sistemas, administración de servidores (Linux & Windows) y el cumplimiento de estándares como ENS e ISO 27001.",
    profilePicUrl: "https://lh3.googleusercontent.com/d/1FFUiI3MaqSSzBoMx-1CiqRgZ6nabvj-S",
    cvUrl: "/CV_Carta_HugoCarnicero.pdf",
    version: "1.0.0",
    availableForHire: true,
    contactEmail: "hugocarni2004@gmail.com",
    linkedinUrl: "https://www.linkedin.com/in/hugocarni/",
    githubUrl: "https://github.com/hugocarni",
    phone: "611405105",
    whatsAppUrl: "https://wa.me/34611405105"
  },
  trajectory: [
    {
      id: "traj1",
      title: "Desarrollador Web y Técnico de Mantenimiento",
      subtitle: "Center Tecnificación",
      dateRange: "Nov 2025 - Actualidad",
      description: "Desarrollo y mantenimiento preventivo y correctivo de aplicaciones y portales web. Implementación de mejoras funcionales, corrección de incidencias en código y optimización de bases de datos. Soporte técnico continuado y administración de sistemas informáticos locales.",
      type: "development",
      category: "experience"
    },
    {
      id: "traj2",
      title: "Especialización en Ciberseguridad",
      subtitle: "IES El Cañaveral, Móstoles",
      dateRange: "2025 - 2026",
      description: "Especialización de Postgrado enfocada en seguridad ofensiva y defensiva. Análisis avanzado de vulnerabilidades, respuesta ante incidentes, criptografía aplicada, bastionado de sistemas informáticos complejos y auditoría bajo el Esquema Nacional de Seguridad (ENS) e ISO 27001.",
      type: "security",
      category: "education"
    },
    {
      id: "traj3",
      title: "Desarrollador de Software",
      subtitle: "Psinnova",
      dateRange: "Mar 2025 - Jun 2025",
      description: "Participación activa en el ciclo de vida del desarrollo de software cliente-servidor. Colaboración multidisciplinar para resolución de incidencias técnicas complejas, desarrollo de funcionalidades óptimas bajo directrices de pulcritud de código y control de versiones con Git.",
      type: "development",
      category: "experience"
    },
    {
      id: "traj4",
      title: "Técnico Superior en Desarrollo de Aplicaciones Web (DAW)",
      subtitle: "IES Gabriel García Márquez, Leganés",
      dateRange: "2023 - 2025",
      description: "Ciclo formativo de grado superior de desarrollo completo (Full-Stack). Sólidos conocimientos en maquetación interactiva, desarrollo frontend/backend, diseño estructurado de bases de datos relacionales y despliegue seguro de servicios de aplicación.",
      type: "development",
      category: "education"
    },
    {
      id: "traj5",
      title: "Técnico de Sistemas Informáticos",
      subtitle: "Alt Solutions",
      dateRange: "Mar 2023 - Jun 2023",
      description: "Instalación, configuración integral y soporte a usuarios de hardware y software. Configuración y resolución de incidencias en redes de área local, gestión de permisos, mantenimiento de servidores corporativos y soporte multiplataforma preventivo.",
      type: "systems",
      category: "experience"
    },
    {
      id: "traj6",
      title: "Técnico en Sistemas Microinformáticos y Redes (SMR)",
      subtitle: "Colegio La Inmaculada - Padres Escolapios",
      dateRange: "2021 - 2023",
      description: "Formación de base sólida en la configuración, tendido de cables y despliegue de redes corporativas. Administración de sistemas Linux y Windows, automatización de copias de seguridad, resolución de averías físicas de hardware y gestión de redes VLAN.",
      type: "systems",
      category: "education"
    }
  ],
  projects: [
    {
      id: "proj1",
      title: "VIRAL-CHALLENGE",
      description: "Red social de retos diarios donde cada 24 horas cambia el desafío. Los usuarios pueden participar en diferentes categorías, subir sus resultados y competir en una plataforma dinámica con temática renovada cada día.",
      imageUrl: "https://github.com/hugocarni/VIRAL-CHALLENGE/blob/main/img/Captura2.PNG?raw=true",
      tags: ["PHP", "JavaScript", "MySQL", "Social Network", "Bootstrap"],
      actionText: "Ver en GitHub",
      actionUrl: "https://github.com/hugocarni/VIRAL-CHALLENGE"
    },
    {
      id: "proj2",
      title: "Entorno Automatizado DevSecOps",
      description: "Simulación de tuberías de desarrollo seguro con escaneos de código estático automatizados (SAST), bastionado proactivo de servidores Linux y monitorización centralizada del cumplimiento con normas ISO 27001.",
      imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=600",
      tags: ["DevSecOps", "Linux Server", "ISO 27001", "Bash Scripting"],
      actionText: "Ver Detalles",
      actionUrl: "#"
    },
    {
      id: "proj3",
      title: "Portal Web Seguro & Base de Datos MySQL",
      description: "Desarrollo completo de un sitio web funcional con gestión segura de sesiones, sanamiento de consultas de base de datos SQL para prevenir inyecciones maliciosas y diseño adaptativo con Bootstrap.",
      imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600",
      tags: ["PHP", "JavaScript", "MySQL", "Bootstrap"],
      actionText: "Ver Proyecto",
      actionUrl: "#"
    },
  ],
  skillsMatrix: [
    {
      id: "skills_sec",
      title: "Ciberseguridad",
      icon: "security",
      skills: [
        { name: "Desarrollo DevSecOps", level: "active" },
        { name: "Bastionado de Sistemas & Redes", level: "active" },
        { name: "Respuesta ante Incidentes", level: "active" },
        { name: "ENS & ISO 27001 / ISO 27002", level: "active" }
      ]
    },
    {
      id: "skills_dev",
      title: "Desarrollo Web",
      icon: "development",
      skills: [
        { name: "HTML5 / CSS3 / JavaScript", level: "active" },
        { name: "Desarrollo Back-End PHP & MySQL", level: "active" },
        { name: "Maquetación con Bootstrap", level: "active" },
        { name: "Diseño de Interfaces de Usuario", level: "active" }
      ]
    },
    {
      id: "skills_sys",
      title: "Sistemas y Redes",
      icon: "systems",
      skills: [
        { name: "Gestión Servidores Linux/Windows", level: "active" },
        { name: "Diseño de Mapas & Servicios de Red", level: "active" },
        { name: "Montaje & Mant. de Equipos (SMR)", level: "active" },
        { name: "Soporte Técnico & Resol. Incidencias", level: "active" }
      ]
    }
  ]
};
