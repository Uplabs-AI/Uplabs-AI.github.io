import { create } from 'zustand';
import { 
  getCampaigns, 
  getSurveysByCampaignId, 
  getAssistantsByCampaignId 
} from '@/lib/services/dashboard-mock-service';
import type { Campaign, Survey, Assistant } from '@/lib/types/dashboard';

interface DashboardState {
  // Filter values
  selectedCampaign: string | null;
  selectedSurvey: string | null;
  selectedAssistant: string | null;

  // Filter options
  campaigns: Campaign[];
  surveys: Survey[];
  assistants: Assistant[];

  // Loading states
  isLoadingCampaigns: boolean;
  isLoadingSurveys: boolean;
  isLoadingAssistants: boolean;
  
  // Data - Asumiendo que estos datos se cargan basados en los filtros
  funnelData: any; // Reemplazar con tipos reales
  opportunityData: any; // Reemplazar con tipos reales

  // Actions
  fetchCampaigns: () => Promise<void>;
  setSelectedCampaign: (campaignId: string | null) => void;
  setSelectedSurvey: (surveyId: string | null) => void;
  setSelectedAssistant: (assistantId: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set, get) => ({
  // Initial state
  selectedCampaign: null,
  selectedSurvey: null,
  selectedAssistant: null,
  
  campaigns: [],
  surveys: [],
  assistants: [],

  isLoadingCampaigns: false,
  isLoadingSurveys: false,
  isLoadingAssistants: false,
  
  funnelData: null,
  opportunityData: null,

  // --- ACTIONS ---

  fetchCampaigns: async () => {
    set({ isLoadingCampaigns: true });
    try {
      const campaigns = await getCampaigns();
      set({ campaigns, isLoadingCampaigns: false });
    } catch (error) {
      console.error("Failed to fetch campaigns", error);
      set({ isLoadingCampaigns: false });
    }
  },

  setSelectedCampaign: async (campaignId: string | null) => {
    // Si la campaña es la misma, no hacer nada
    if (get().selectedCampaign === campaignId) return;

    // Resetear el estado
    set({ 
      selectedCampaign: campaignId,
      selectedSurvey: null, // Resetear filtro dependiente
      selectedAssistant: null, // Resetear filtro dependiente
      surveys: [], // Limpiar opciones
      assistants: [], // Limpiar opciones
    });

    if (campaignId) {
      set({ isLoadingSurveys: true, isLoadingAssistants: true });
      try {
        // Cargar datos dependientes en paralelo
        const [surveys, assistants] = await Promise.all([
          getSurveysByCampaignId(campaignId),
          getAssistantsByCampaignId(campaignId)
        ]);
        set({ surveys, assistants, isLoadingSurveys: false, isLoadingAssistants: false });
      } catch (error) {
        console.error("Failed to fetch dependent filters", error);
        set({ isLoadingSurveys: false, isLoadingAssistants: false });
      }
      // Aquí también se dispararía la carga de los datos del dashboard (funnel, etc.)
      // get().fetchDashboardData(campaignId, null, null);
    } else {
      // Si se deselecciona la campaña, cargar datos generales
      // get().fetchDashboardData(null, null, null);
    }
  },

  setSelectedSurvey: (surveyId: string | null) => {
    set({ selectedSurvey: surveyId });
    // Opcional: Recargar datos del dashboard si la selección de encuesta afecta los gráficos
    // const { selectedCampaign, selectedAssistant } = get();
    // get().fetchDashboardData(selectedCampaign, surveyId, selectedAssistant);
  },

  setSelectedAssistant: (assistantId: string | null) => {
    set({ selectedAssistant: assistantId });
    // Opcional: Recargar datos del dashboard si la selección de asistente afecta los gráficos
    // const { selectedCampaign, selectedSurvey } = get();
    // get().fetchDashboardData(selectedCampaign, selectedSurvey, assistantId);
  },
}));
