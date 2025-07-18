export interface Campaign {
  id: string
  name: string
  surveyIds: string[]
  assistantIds: string[]
}

export interface Survey {
  id: string
  name: string
}

export interface Assistant {
  id: string
  name: string
}
