export const activitiesData = [
  // Activities for Fernando García (ID 1)
  {
    id: 1,
    contactId: 1,
    type: "note",
    author: "Sofia Hernandez",
    authorInitials: "SH",
    authorAvatarColor: "bg-purple-500",
    date: "2024-07-29T10:00:00Z",
    content: "Se realizó la primera llamada de contacto. Mostró interés en la solución de tecnología para su empresa. Se agendó una demo para el próximo viernes.",
  },
  {
    id: 2,
    contactId: 1,
    type: "email",
    author: "Sofia Hernandez",
    authorInitials: "SH",
    authorAvatarColor: "bg-purple-500",
    date: "2024-07-29T10:15:00Z",
    content: "Enviado correo de seguimiento con el resumen de la llamada y la confirmación de la demo.",
    subject: "Resumen de nuestra conversación y próximos pasos",
  },
  {
    id: 3,
    contactId: 1,
    type: "call",
    author: "Sofia Hernandez",
    authorInitials: "SH",
    authorAvatarColor: "bg-purple-500",
    date: "2024-07-26T15:30:00Z",
    content: "Llamada de seguimiento completada. Duración: 15 minutos. Resultado: Positivo.",
    duration: "15:23",
    recordingUrl: "/#",
  },

  // Activities for María Rodríguez (ID 2)
  {
    id: 4,
    contactId: 2,
    type: "note",
    author: "Admin",
    authorInitials: "AD",
    authorAvatarColor: "bg-gray-500",
    date: "2024-07-28T11:00:00Z",
    content: "El contacto fue importado desde la lista 'Proveedor salud'. Aún no se ha contactado.",
  },

  // Activities for Jesús Joffre (ID 3)
  {
    id: 5,
    contactId: 3,
    type: "email",
    author: "Automated System",
    date: "2024-07-25T09:00:00Z",
    content: "Se envió la campaña de email 'Novedades RPA'. El correo fue abierto.",
    subject: "Automatiza tus procesos con nuestras nuevas soluciones RPA",
  },
  
  // Activities for Carlos Eguez (ID 4)
  {
    id: 6,
    contactId: 4,
    type: "note",
    author: "Sofia Hernandez",
    authorInitials: "SH",
    authorAvatarColor: "bg-purple-500",
    date: "2024-07-29T14:00:00Z",
    content: "Se discutió sobre la campaña 'Auto xKm'. El cliente tiene dudas sobre la cobertura.",
  },
  {
    id: 7,
    contactId: 4,
    type: "task",
    author: "Sofia Hernandez",
    authorInitials: "SH",
    authorAvatarColor: "bg-purple-500",
    date: "2024-07-30T09:00:00Z",
    content: "Preparar una propuesta personalizada sobre la cobertura para enviársela mañana.",
    isCompleted: false,
  },

  // Activities for Lenny Mercado (ID 5)
  {
    id: 8,
    contactId: 5,
    type: "call",
    author: "Admin",
    authorInitials: "AD",
    authorAvatarColor: "bg-gray-500",
    date: "2024-07-27T12:00:00Z",
    content: "Llamada inicial no contestada. Se dejó un mensaje de voz.",
    duration: "01:15",
    recordingUrl: null,
  },
  
  // Activities for Ana Morales (ID 6)
  {
    id: 9,
    contactId: 6,
    type: "email",
    author: "Sofia Hernandez",
    authorInitials: "SH",
    authorAvatarColor: "bg-purple-500",
    date: "2024-07-29T16:00:00Z",
    content: "Se envió brochure de la constructora. Confirmó recepción.",
    subject: "Información - Constructora Boliviana",
  },

  // Activities for Roberto Silva (ID 7)
  {
    id: 10,
    contactId: 7,
    type: "note",
    author: "Admin",
    authorInitials: "AD",
    authorAvatarColor: "bg-gray-500",
    date: "2024-07-24T18:00:00Z",
    content: "Contacto interesado en maquinaria pesada. Requiere cotización formal.",
  },

  // Activities for Patricia Vega (ID 8)
  {
    id: 11,
    contactId: 8,
    type: "task",
    author: "Sofia Hernandez",
    authorInitials: "SH",
    authorAvatarColor: "bg-purple-500",
    date: "2024-07-31T10:00:00Z",
    content: "Llamar para seguimiento de la muestra de tela enviada.",
    isCompleted: false,
  },

  // Activities for Diego Mamani (ID 9)
  {
    id: 12,
    contactId: 9,
    type: "call",
    author: "Sofia Hernandez",
    authorInitials: "SH",
    authorAvatarColor: "bg-purple-500",
    date: "2024-07-28T14:20:00Z",
    content: "Llamada sobre insumos agrícolas. Enviará lista de requerimientos.",
    duration: "08:45",
    recordingUrl: "/#",
  },

  // Activities for Claudia Pérez (ID 10)
  {
    id: 13,
    contactId: 10,
    type: "email",
    author: "Automated System",
    date: "2024-07-29T11:30:00Z",
    content: "Enviado el paquete turístico para vacaciones de fin de año.",
    subject: "Tu próxima aventura te espera",
  },

  // Activities for Andrés Quiroga (ID 11)
  {
    id: 14,
    contactId: 11,
    type: "note",
    author: "Admin",
    authorInitials: "AD",
    authorAvatarColor: "bg-gray-500",
    date: "2024-07-29T09:00:00Z",
    content: "El cliente solicitó información sobre créditos de consumo.",
  },

  // Activities for Sofía Choque (ID 12)
  {
    id: 15,
    contactId: 12,
    type: "note",
    author: "Sofia Hernandez",
    authorInitials: "SH",
    authorAvatarColor: "bg-purple-500",
    date: "2024-07-26T17:00:00Z",
    content: "Interesada en cursos de postgrado. Se le envió la oferta académica.",
  },

  // Activities for Miguel Condori (ID 13)
  {
    id: 16,
    contactId: 13,
    type: "call",
    author: "Sofia Hernandez",
    authorInitials: "SH",
    authorAvatarColor: "bg-purple-500",
    date: "2024-07-29T13:10:00Z",
    content: "Se conversó sobre las rutas de transporte. Solicita una segunda llamada con el gerente de operaciones.",
    duration: "12:30",
    recordingUrl: "/#",
  },

  // Activities for Gabriela Quispe (ID 14)
  {
    id: 17,
    contactId: 14,
    type: "task",
    author: "Admin",
    authorInitials: "AD",
    authorAvatarColor: "bg-gray-500",
    date: "2024-08-01T15:00:00Z",
    content: "Verificar documentación para importación.",
    isCompleted: false,
  },
]; 