import { create } from 'zustand';

// --- TYPES ---
interface CallDetails {
  transcription: { speaker: string; text: string; timestamp: string }[];
  cost: { item: string; value: string }[];
  recordingUrl: string;
}

interface MessageDetails {
  conversation: {
    sender: 'bot' | 'user';
    text: string;
    timestamp: string;
  }[];
}

export interface Phase {
  id: number;
  status: string;
  statusColor: string;
  statusBgColor: string;
  statusBorderColor: string;
  contactType: 'Llamada' | 'Mensaje';
  progressStatus: 'Realizado' | 'Pendiente'; // Eliminado 'Actual'
  details: CallDetails | MessageDetails | null;
}

export interface ContactFlow {
  contactId: string;
  contactName: string;
  phases: Phase[];
  commercial_stage: string; // <-- Añadir este campo
}

interface ContactFlowState {
  contacts: ContactFlow[];
  getContactById: (id: string) => ContactFlow | undefined;
  getContactSummary: () => { 
    id: string; 
    name: string; 
    lastContact: string; 
    date: string, 
    status: string,
    statusColor: string,
    statusBgColor: string,
    statusBorderColor: string,
    progressStatus: 'Realizado' | 'Pendiente'
    commercial_stage: string; // <-- Añadir este campo
  }[];
}

// --- MOCK DATA ---
const mockPhases = (completedCount: number): Phase[] => {
  type PhaseConfig = Omit<Phase, 'progressStatus' | 'details'>;

  const allPhases: PhaseConfig[] = [
    { id: 1, status: "Nuevos Lead", statusColor: "#897fd2", statusBgColor: "rgba(137, 127, 210, 0.1)", statusBorderColor: "rgba(137, 127, 210, 0.2)", contactType: 'Llamada' },
    { id: 2, status: "Primer Mensaje Enviado", statusColor: "#aa89fa", statusBgColor: "rgba(170, 137, 250, 0.1)", statusBorderColor: "rgba(170, 137, 250, 0.2)", contactType: 'Mensaje' },
    { id: 3, status: "Seguimiento 1", statusColor: "#ff89ed", statusBgColor: "rgba(255, 137, 237, 0.1)", statusBorderColor: "rgba(255, 137, 237, 0.2)", contactType: 'Mensaje' },
    { id: 4, status: "Seguimiento 2", statusColor: "#89fab7", statusBgColor: "rgba(137, 250, 183, 0.1)", statusBorderColor: "rgba(137, 250, 183, 0.2)", contactType: 'Mensaje' },
    { id: 5, status: "Seguimiento 3", statusColor: "#a370ff", statusBgColor: "rgba(163, 112, 255, 0.1)", statusBorderColor: "rgba(163, 112, 255, 0.2)", contactType: 'Mensaje' },
    { id: 6, status: "En conversación", statusColor: "#6ab7ff", statusBgColor: "rgba(106, 183, 255, 0.1)", statusBorderColor: "rgba(106, 183, 255, 0.2)", contactType: 'Llamada' },
    { id: 7, status: "No respondió", statusColor: "#9ca3af", statusBgColor: "rgba(156, 163, 175, 0.1)", statusBorderColor: "rgba(156, 163, 175, 0.2)", contactType: 'Llamada' },
    { id: 8, status: "No interesados", statusColor: "#9ca3af", statusBgColor: "rgba(156, 163, 175, 0.1)", statusBorderColor: "rgba(156, 163, 175, 0.2)", contactType: 'Llamada' },
    { id: 9, status: "Interesados", statusColor: "#7e22ce", statusBgColor: "rgba(126, 34, 206, 0.1)", statusBorderColor: "rgba(126, 34, 206, 0.2)", contactType: 'Llamada' },
    { id: 10, status: "Ganada", statusColor: "#a370ff", statusBgColor: "rgba(163, 112, 255, 0.1)", statusBorderColor: "rgba(163, 112, 255, 0.2)", contactType: 'Llamada' },
    { id: 11, status: "Perdida", statusColor: "#9ca3af", statusBgColor: "rgba(156, 163, 175, 0.1)", statusBorderColor: "rgba(156, 163, 175, 0.2)", contactType: 'Llamada' },
  ];

  return allPhases.map((phase, index) => ({
    ...phase,
    progressStatus: index < completedCount ? 'Realizado' : 'Pendiente',
    details: null, // Placeholder
  }));
};

const commercialStages = [ "Nuevos Lead", "Primer Mensaje Enviado", "Seguimiento 1 (60 min)", "Seguimiento 2 (24 hrs)", "Seguimiento 3 (7 días)", "En Conversión", "No Respondió", "No Interesados", "Interesados", "Ganada", "Perdida" ];

const firstNames = ["Juan", "Ana", "Luis", "Sofía", "Carlos", "Laura", "Pedro", "Marta", "David", "Elena"];
const lastNames = ["Pérez", "Gómez", "Fernández", "Martínez", "Rodríguez", "García", "Sánchez", "Jiménez", "Moreno", "Alonso"];

const generateMockContacts = (count: number): ContactFlow[] => {
  const contacts: ContactFlow[] = [];
  for (let i = 1; i <= count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const completedPhases = Math.ceil(Math.random() * 11);
    const commercialStageIndex = Math.floor(Math.random() * commercialStages.length);

    contacts.push({
      contactId: `contact-${i}`,
      contactName: `${firstName} ${lastName}`,
      phases: mockPhases(completedPhases),
      commercial_stage: commercialStages[commercialStageIndex],
    });
  }
  return contacts;
};

const mockContacts: ContactFlow[] = generateMockContacts(100);


// --- ZUSTAND STORE ---
export const useContactFlowStore = create<ContactFlowState>((set, get) => ({
  contacts: mockContacts,
  getContactById: (id) => {
    return get().contacts.find(c => c.contactId === id);
  },
  getContactSummary: () => {
    return get().contacts.map(contact => {
        const currentPhase = contact.phases.find(p => p.progressStatus === 'Pendiente') || contact.phases[contact.phases.length - 1];
        
        // This logic adds visual variety to the dashboard status chips
        const contactNum = parseInt(contact.contactId.split('-')[1]);
        let summaryProgressStatus: 'Realizado' | 'Pendiente' = contactNum % 2 !== 0 ? 'Realizado' : 'Pendiente';

        // Ensure that a fully completed contact is always 'Realizado'
        if (currentPhase.id === contact.phases.length && currentPhase.progressStatus === 'Realizado') {
            summaryProgressStatus = 'Realizado';
        }

        return {
            id: contact.contactId,
            name: contact.contactName,
            lastContact: currentPhase.contactType,
            date: new Date().toLocaleDateString('es-ES'),
            status: currentPhase.status,
            statusColor: currentPhase.statusColor,
            statusBgColor: currentPhase.statusBgColor,
            statusBorderColor: currentPhase.statusBorderColor,
            progressStatus: summaryProgressStatus,
            commercial_stage: contact.commercial_stage // <-- Añadir este campo
        }
    })
  }
})); 