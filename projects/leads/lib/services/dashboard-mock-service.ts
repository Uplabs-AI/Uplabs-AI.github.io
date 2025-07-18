import type { Campaign, Survey, Assistant } from '@/lib/types/dashboard';

// --- MOCK DATA ---

const allAssistants: Assistant[] = [
  { id: 'asst_1', name: 'Lucio (Voz)' },
  { id: 'asst_2', name: 'Sofia (Voz)' },
  { id: 'asst_3', name: 'Valeria (Texto)' },
  { id: 'asst_4', name: 'Maria (Texto)' },
];

const allSurveys: Survey[] = [
  { id: 'surv_1', name: 'Encuesta de Satisfacción' },
  { id: 'surv_2', name: 'Encuesta Post-Venta' },
  { id: 'surv_3', name: 'Encuesta de Interés' },
  { id: 'surv_4', name: 'Encuesta NPS' },
];

const allCampaigns: Campaign[] = [
  { 
    id: 'camp_1', 
    name: 'Campaña de Marketing Q3', 
    surveyIds: ['surv_1', 'surv_3'],
    assistantIds: ['asst_1', 'asst_3'] 
  },
  { 
    id: 'camp_2', 
    name: 'Campaña de Ventas Fin de Año', 
    surveyIds: ['surv_2', 'surv_4'],
    assistantIds: ['asst_2', 'asst_4'] 
  },
  { 
    id: 'camp_3', 
    name: 'Campaña de Reactivación', 
    surveyIds: ['surv_3'],
    assistantIds: ['asst_1'] 
  },
];

// --- MOCK API FUNCTIONS ---

const mockApiCall = <T>(data: T, delay: number = 500): Promise<T> => {
    return new Promise(resolve => setTimeout(() => resolve(data), delay));
}

export const getCampaigns = (): Promise<Campaign[]> => {
    console.log("MOCK API: Fetching all campaigns...");
    return mockApiCall(allCampaigns);
}

export const getSurveysByCampaignId = (campaignId: string): Promise<Survey[]> => {
    console.log(`MOCK API: Fetching surveys for campaign ${campaignId}...`);
    const campaign = allCampaigns.find(c => c.id === campaignId);
    if (!campaign) {
        return mockApiCall([]);
    }
    const surveys = allSurveys.filter(s => campaign.surveyIds.includes(s.id));
    return mockApiCall(surveys, 800); // Slower delay for dependent calls
}

export const getAssistantsByCampaignId = (campaignId: string): Promise<Assistant[]> => {
    console.log(`MOCK API: Fetching assistants for campaign ${campaignId}...`);
    const campaign = allCampaigns.find(c => c.id === campaignId);
    if (!campaign) {
        return mockApiCall([]);
    }
    const assistants = allAssistants.filter(a => campaign.assistantIds.includes(a.id));
    return mockApiCall(assistants, 800); // Slower delay for dependent calls
}
