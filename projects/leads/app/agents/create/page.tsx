"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Sidebar } from "@/components/layout/sidebar"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Volume2, Info, User, Upload } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useAgents } from "@/lib/contexts/agents-context"
import {
  SpainFlag,
  USAFlag,
  FranceFlag,
  BrazilFlag,
  ItalyFlag,
  GermanyFlag,
  MexicoFlag,
  ArgentinaFlag,
  ColombiaFlag,
  PeruFlag,
  ChileFlag,
  VenezuelaFlag,
  UKFlag,
  AustraliaFlag,
  CanadaFlag,
  IrelandFlag,
  SouthAfricaFlag,
  BelgiumFlag,
  SwitzerlandFlag,
  PortugalFlag,
  AustriaFlag,
  BoliviaFlag,
  NeutralFlag,
} from "@/components/flags/flag-icons"

interface FormData {
  agentName: string
  language: string
  accent: string
  voiceTone: string
  backgroundSound: string
  hipaaCompliance: boolean
  pciCompliance: boolean
  multilingualSupport: boolean
  avatarImage: string | null
}

// Agentes VOX disponibles
const voxAgents = [
  {
    id: "maria",
    name: "María",
    image: "/agents/maria-icon.svg",
    description: "Agente femenino profesional",
  },
  {
    id: "valeria",
    name: "Valeria",
    image: "/agents/valeria-icon.svg",
    description: "Agente femenino dinámico",
  },
  {
    id: "sofia",
    name: "Sofía",
    image: "/agents/sofia-icon.svg",
    description: "Agente femenino amigable",
  },
  {
    id: "lucio",
    name: "Lucio",
    image: "/agents/lucio-icon.svg",
    description: "Agente masculino profesional",
  },
]

// Configuración de idiomas y acentos con componentes de banderas
const languageOptions = [
  {
    code: "español",
    name: "Español",
    flag: SpainFlag,
    accents: [
      { code: "es-neutral", name: "Neutro", flag: NeutralFlag },
      { code: "es-es", name: "Español (España)", flag: SpainFlag },
      { code: "es-mx", name: "Mexicano", flag: MexicoFlag },
      { code: "es-ar", name: "Argentino", flag: ArgentinaFlag },
      { code: "es-co", name: "Colombiano", flag: ColombiaFlag },
      { code: "es-bo", name: "Boliviano", flag: BoliviaFlag },
      { code: "es-pe", name: "Peruano", flag: PeruFlag },
      { code: "es-cl", name: "Chileno", flag: ChileFlag },
      { code: "es-ve", name: "Venezolano", flag: VenezuelaFlag },
    ],
  },
  {
    code: "english",
    name: "English",
    flag: USAFlag,
    accents: [
      { code: "en-neutral", name: "Neutral", flag: NeutralFlag },
      { code: "en-us", name: "American", flag: USAFlag },
      { code: "en-gb", name: "British", flag: UKFlag },
      { code: "en-au", name: "Australian", flag: AustraliaFlag },
      { code: "en-ca", name: "Canadian", flag: CanadaFlag },
      { code: "en-ie", name: "Irish", flag: IrelandFlag },
      { code: "en-za", name: "South African", flag: SouthAfricaFlag },
    ],
  },
  {
    code: "français",
    name: "Français",
    flag: FranceFlag,
    accents: [
      { code: "fr-neutral", name: "Neutre", flag: NeutralFlag },
      { code: "fr-fr", name: "Français (France)", flag: FranceFlag },
      { code: "fr-ca", name: "Canadien", flag: CanadaFlag },
      { code: "fr-be", name: "Belge", flag: BelgiumFlag },
      { code: "fr-ch", name: "Suisse", flag: SwitzerlandFlag },
    ],
  },
  {
    code: "português",
    name: "Português",
    flag: BrazilFlag,
    accents: [
      { code: "pt-neutral", name: "Neutro", flag: NeutralFlag },
      { code: "pt-br", name: "Brasileiro", flag: BrazilFlag },
      { code: "pt-pt", name: "Português (Portugal)", flag: PortugalFlag },
    ],
  },
  {
    code: "italiano",
    name: "Italiano",
    flag: ItalyFlag,
    accents: [
      { code: "it-neutral", name: "Neutro", flag: NeutralFlag },
      { code: "it-it", name: "Italiano", flag: ItalyFlag },
    ],
  },
  {
    code: "deutsch",
    name: "Deutsch",
    flag: GermanyFlag,
    accents: [
      { code: "de-neutral", name: "Neutral", flag: NeutralFlag },
      { code: "de-de", name: "Deutsch", flag: GermanyFlag },
      { code: "de-at", name: "Österreichisch", flag: AustriaFlag },
      { code: "de-ch", name: "Schweizerdeutsch", flag: SwitzerlandFlag },
    ],
  },
]

export default function CreateAgentPage() {
  const [formData, setFormData] = useState<FormData>({
    agentName: "",
    language: "español",
    accent: "es-neutral",
    voiceTone: "neutral",
    backgroundSound: "oficina",
    hipaaCompliance: true,
    pciCompliance: true,
    multilingualSupport: false,
    avatarImage: null,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showVoxAgents, setShowVoxAgents] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { addAgent } = useAgents()
  const { toast } = useToast()
  const router = useRouter()

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    // Clear error when field is filled
    if (formErrors[field]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
    }
  }

  const handleLanguageChange = (languageCode: string) => {
    const selectedLanguage = languageOptions.find((lang) => lang.code === languageCode)
    if (selectedLanguage && selectedLanguage.accents.length > 0) {
      setFormData((prev) => ({
        ...prev,
        language: languageCode,
        accent: selectedLanguage.accents[0].code,
      }))
    }
  }

  const getSelectedLanguage = () => {
    return languageOptions.find((lang) => lang.code === formData.language)
  }

  const getAvailableAccents = () => {
    const selectedLanguage = getSelectedLanguage()
    return selectedLanguage ? selectedLanguage.accents : []
  }

  const getSelectedAccent = () => {
    const accents = getAvailableAccents()
    return accents.find((accent) => accent.code === formData.accent)
  }

  const handleSelectVoxAgent = (agent: (typeof voxAgents)[0]) => {
    setFormData((prev) => ({ ...prev, avatarImage: agent.image }))
    setShowVoxAgents(false)
    toast({
      title: "Agente seleccionado",
      description: `Has seleccionado a ${agent.name} como avatar del agente.`,
    })
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const result = e.target?.result as string
          setFormData((prev) => ({ ...prev, avatarImage: result }))
          toast({
            title: "Imagen cargada",
            description: "La imagen ha sido cargada exitosamente.",
          })
        }
        reader.readAsDataURL(file)
      } else {
        toast({
          title: "Error",
          description: "Por favor selecciona un archivo de imagen válido.",
          variant: "destructive",
        })
      }
    }
  }

  const handleUploadFromPC = () => {
    fileInputRef.current?.click()
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.agentName.trim()) {
      errors.agentName = "El nombre del agente es obligatorio"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const generatePersonality = (voiceTone: string) => {
    const personalityMap: Record<string, string> = {
      neutral: "Neutral",
      casual: "Casual",
      amigable: "Amigable",
      profesional: "Profesional",
    }
    return personalityMap[voiceTone] || "Profesional"
  }

  const generateLanguageDisplay = (language: string, accent: string) => {
    const selectedLanguage = languageOptions.find((lang) => lang.code === language)
    const selectedAccent = selectedLanguage?.accents.find((acc) => acc.code === accent)

    if (selectedLanguage && selectedAccent) {
      // Determine gender based on accent or default
      const isFeminine = ["maria", "valeria", "sofia"].some((name) => formData.avatarImage?.includes(name))
      const gender = isFeminine ? "Femenino" : "Masculino"

      return `${selectedLanguage.name} - ${gender}`
    }

    return "Español - Masculino"
  }

  const generateAvatarInfo = () => {
    if (formData.avatarImage) {
      // If using VOX agent image, get the first letter of agent name
      const voxAgent = voxAgents.find((agent) => formData.avatarImage?.includes(agent.id))
      if (voxAgent) {
        return {
          avatar: voxAgent.name.charAt(0).toUpperCase(),
          avatarColor: getAvatarColor(voxAgent.name),
        }
      }
    }

    // Default to first letter of agent name
    return {
      avatar: formData.agentName.charAt(0).toUpperCase() || "A",
      avatarColor: getAvatarColor(formData.agentName),
    }
  }

  const getAvatarColor = (name: string) => {
    const colors = [
      "bg-blue-600",
      "bg-pink-600",
      "bg-purple-600",
      "bg-green-600",
      "bg-red-600",
      "bg-yellow-600",
      "bg-indigo-600",
      "bg-cyan-600",
    ]

    const index = name.length % colors.length
    return colors[index]
  }

  const handleSaveAgent = async () => {
    if (!validateForm()) {
      toast({
        title: "Error en el formulario",
        description: "Por favor, complete todos los campos obligatorios.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      const { avatar, avatarColor } = generateAvatarInfo()

      const newAgent = {
        name: formData.agentName,
        status: "Disponible",
        statusColor: "bg-green-500",
        description: "Llama a clientes para recopilar datos del NPS",
        language: generateLanguageDisplay(formData.language, formData.accent),
        personality: generatePersonality(formData.voiceTone),
        campaign: "Sin campaña asignada",
        resolutionRate: "0%",
        avgTime: "0:00 min",
        callsToday: 0,
        state: "Activo",
        active: true,
        avatar,
        avatarColor,
        avatarImage: formData.avatarImage,
        voiceTone: formData.voiceTone,
        accent: formData.accent,
        backgroundSound: formData.backgroundSound,
        hipaaCompliance: formData.hipaaCompliance,
        pciCompliance: formData.pciCompliance,
        multilingualSupport: formData.multilingualSupport,
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      addAgent(newAgent)

      // Verificar si venimos de campaigns/create
      const creationOrigin = localStorage.getItem("agentCreationOrigin")

      if (creationOrigin === "campaigns-create") {
        // Guardar información del nuevo agente para campaigns/create
        localStorage.setItem("agentCreationSuccess", "true")
        localStorage.setItem(
          "newAgentData",
          JSON.stringify({
            name: formData.agentName,
            language: generateLanguageDisplay(formData.language, formData.accent),
            accent: formData.accent,
            voiceTone: formData.voiceTone,
            backgroundSound: formData.backgroundSound,
            avatarImage: formData.avatarImage, // Añadir esta línea
          }),
        )

        // Limpiar el origen
        localStorage.removeItem("agentCreationOrigin")

        // Redirigir de vuelta a campaigns/create
        router.push("/campaigns/create")
      } else {
        // Comportamiento normal - ir a la lista de agentes
        router.push("/agents")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Ocurrió un error al crear el agente. Inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveDraft = () => {
    toast({
      title: "Borrador Guardado",
      description: "El agente ha sido guardado como borrador.",
    })
  }

  const handlePlayVoiceSample = () => {
    toast({
      title: "Reproduciendo muestra",
      description: "Reproduciendo muestra de voz del agente...",
    })
  }

  // Get components for rendering
  const selectedLanguage = getSelectedLanguage()
  const selectedAccent = getSelectedAccent()
  const LanguageFlagComponent = selectedLanguage?.flag
  const AccentFlagComponent = selectedAccent?.flag

  return (
    <div className="flex h-screen bg-[#121212] text-white">
      {/* Sidebar */}
      <div className="w-64 hidden lg:block">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <h1 className="text-xl font-semibold">Agentes</h1>
          <div className="flex space-x-3">
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
              Dashboard
            </Button>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
              Sign Out
            </Button>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Link
                href="/agents"
                onClick={(e) => {
                  e.preventDefault()
                  const creationOrigin = localStorage.getItem("agentCreationOrigin")
                  if (creationOrigin === "campaigns-create") {
                    localStorage.removeItem("agentCreationOrigin")
                    router.push("/campaigns/create")
                  } else {
                    router.push("/agents")
                  }
                }}
              >
                <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <h2 className="text-2xl font-bold">Crear Nuevo Agente</h2>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => {
                  const creationOrigin = localStorage.getItem("agentCreationOrigin")
                  if (creationOrigin === "campaigns-create") {
                    localStorage.removeItem("agentCreationOrigin")
                    router.push("/campaigns/create")
                  } else {
                    router.push("/agents")
                  }
                }}
                className="border-gray-600 text-gray-400 hover:text-white"
              >
                Cancelar
              </Button>
              <Button
                className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                onClick={handleSaveAgent}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Guardar Agente"}
              </Button>
            </div>
          </div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {/* Agente Section */}
            <Card className="bg-[#0A0A0A] border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Agente</h3>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <Label htmlFor="agentName" className="text-sm font-medium text-gray-300 flex items-center">
                      Nombre del Agente <span className="text-red-400 ml-1">*</span>
                      {formErrors.agentName && (
                        <span className="ml-2 text-red-400 text-xs">{formErrors.agentName}</span>
                      )}
                    </Label>
                    <Input
                      id="agentName"
                      placeholder="Ej: Asistente Carlos"
                      value={formData.agentName}
                      onChange={(e) => handleInputChange("agentName", e.target.value)}
                      className={`mt-2 bg-[#1A1A1C] border-gray-700 text-white placeholder-gray-400 ${
                        formErrors.agentName ? "border-red-400 focus:border-red-400 focus:ring-red-400" : ""
                      }`}
                    />
                  </div>

                  <div>
                    <div>
                      <div className="flex items-center space-x-6">
                        <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center overflow-hidden flex-shrink-0">
                          {formData.avatarImage ? (
                            <Image
                              src={formData.avatarImage || "/placeholder.svg"}
                              alt="Avatar del agente"
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="h-8 w-8 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <Label className="text-sm font-medium text-gray-300 mb-3 block">Personaliza tu agente</Label>
                          <div className="flex space-x-3">
                            <Button
                              variant="outline"
                              className="border-gray-600 text-gray-300 hover:text-white"
                              onClick={handleUploadFromPC}
                            >
                              <Upload className="h-4 w-4 mr-2" />
                              Cargar desde mi PC
                            </Button>
                            <Button
                              className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                              onClick={() => setShowVoxAgents(true)}
                            >
                              Agentes
                            </Button>
                          </div>
                        </div>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configuración de Voz Section */}
            <Card className="bg-[#0A0A0A] border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Configuración de Voz</h3>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Idioma y Acento */}
                  <div className="space-y-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-300 flex items-center">
                        Idioma <span className="text-red-400 ml-1">*</span>
                      </Label>
                      <Select value={formData.language} onValueChange={handleLanguageChange}>
                        <SelectTrigger className="mt-2 bg-[#1A1A1C] border-gray-700 text-white">
                          <div className="flex items-center">{selectedLanguage?.name}</div>
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A1C] border-gray-700">
                          {languageOptions.map((language) => {
                            return (
                              <SelectItem key={language.code} value={language.code}>
                                <div className="flex items-center">{language.name}</div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-sm font-medium text-gray-300 flex items-center">
                        Acento <span className="text-red-400 ml-1">*</span>
                      </Label>
                      <Select value={formData.accent} onValueChange={(value) => handleInputChange("accent", value)}>
                        <SelectTrigger className="mt-2 bg-[#1A1A1C] border-gray-700 text-white">
                          <div className="flex items-center">
                            {AccentFlagComponent && <AccentFlagComponent className="mr-3 w-5 h-4" />}
                            {selectedAccent?.name}
                          </div>
                        </SelectTrigger>
                        <SelectContent className="bg-[#1A1A1C] border-gray-700">
                          {getAvailableAccents().map((accent) => {
                            const FlagComponent = accent.flag
                            return (
                              <SelectItem key={accent.code} value={accent.code}>
                                <div className="flex items-center">
                                  <FlagComponent className="mr-3 w-5 h-4" />
                                  {accent.name}
                                </div>
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Middle Column - Tono de Voz */}
                  <div>
                    <Label className="text-sm font-medium text-gray-300 flex items-center mb-3">
                      Tono de Voz <span className="text-red-400 ml-1">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.voiceTone}
                      onValueChange={(value) => handleInputChange("voiceTone", value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="neutral" id="neutral" className="border-gray-600 text-[#5E17EB]" />
                        <Label htmlFor="neutral" className="text-sm text-gray-300">
                          Neutral
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="casual" id="casual" className="border-gray-600 text-[#5E17EB]" />
                        <Label htmlFor="casual" className="text-sm text-gray-300">
                          Casual
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="amigable" id="amigable" className="border-gray-600 text-[#5E17EB]" />
                        <Label htmlFor="amigable" className="text-sm text-gray-300">
                          Amigable/dinámico
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="profesional"
                          id="profesional"
                          className="border-gray-600 text-[#5E17EB]"
                        />
                        <Label htmlFor="profesional" className="text-sm text-gray-300">
                          Profesional
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Right Column - Sonido de fondo */}
                  <div>
                    <Label className="text-sm font-medium text-gray-300 flex items-center mb-3">
                      Sonido de fondo <span className="text-red-400 ml-1">*</span>
                    </Label>
                    <RadioGroup
                      value={formData.backgroundSound}
                      onValueChange={(value) => handleInputChange("backgroundSound", value)}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="oficina" id="oficina" className="border-gray-600 text-[#5E17EB]" />
                        <Label htmlFor="oficina" className="text-sm text-gray-300">
                          Oficina
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="ninguno" id="ninguno" className="border-gray-600 text-[#5E17EB]" />
                        <Label htmlFor="ninguno" className="text-sm text-gray-300">
                          Ninguno
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white" onClick={handlePlayVoiceSample}>
                    <Volume2 className="h-4 w-4 mr-2" />
                    Escuchar muestra de voz
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Configuración extra Section */}
            <Card className="bg-[#0A0A0A] border-gray-800">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Configuración extra</h3>

                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm font-medium text-gray-300">HIPAA Compliance</Label>
                          <Info className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Detecta el sentimiento del interlocutor y ajusta las respuestas en consecuencia.
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.hipaaCompliance}
                      onCheckedChange={(checked) => handleInputChange("hipaaCompliance", checked)}
                      className="data-[state=checked]:bg-[#82ECFF] data-[state=unchecked]:bg-gray-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm font-medium text-gray-300">PCI Compliance</Label>
                          <Info className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Detecta el sentimiento del interlocutor y ajusta las respuestas en consecuencia.
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.pciCompliance}
                      onCheckedChange={(checked) => handleInputChange("pciCompliance", checked)}
                      className="data-[state=checked]:bg-[#82ECFF] data-[state=unchecked]:bg-gray-600"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <Label className="text-sm font-medium text-gray-300">Soporte multilingüe</Label>
                          <Info className="h-4 w-4 text-gray-400" />
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                          Permite al agente cambiar de idioma si detecta que el interlocutor habla otro idioma.
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={formData.multilingualSupport}
                      onCheckedChange={(checked) => handleInputChange("multilingualSupport", checked)}
                      className="data-[state=checked]:bg-[#82ECFF] data-[state=unchecked]:bg-gray-600"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Footer Actions */}
            <div className="flex justify-between pt-6 pb-8">
              <Link
                href="/agents"
                onClick={(e) => {
                  e.preventDefault()
                  const creationOrigin = localStorage.getItem("agentCreationOrigin")
                  if (creationOrigin === "campaigns-create") {
                    localStorage.removeItem("agentCreationOrigin")
                    router.push("/campaigns/create")
                  } else {
                    router.push("/agents")
                  }
                }}
              >
                <Button variant="ghost" className="text-gray-400 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleSaveDraft}
                  className="border-gray-600 text-gray-400 hover:text-white"
                >
                  Guardar como borrador
                </Button>
                <Button
                  className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                  onClick={handleSaveAgent}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Guardando..." : "Guardar Agente"}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modal de Agentes VOX */}
      <Dialog open={showVoxAgents} onOpenChange={setShowVoxAgents}>
        <DialogContent className="bg-[#0A0A0A] border-gray-800 text-white max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">Seleccionar Agente</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-4">
            {voxAgents.map((agent) => (
              <div
                key={agent.id}
                className="flex flex-col items-center space-y-3 p-4 rounded-lg border border-gray-700 hover:border-[#5E17EB] cursor-pointer transition-colors"
                onClick={() => handleSelectVoxAgent(agent)}
              >
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-700 flex items-center justify-center">
                  <Image
                    src={agent.image || "/placeholder.svg"}
                    alt={agent.name}
                    width={60}
                    height={60}
                    className="w-15 h-15 object-contain"
                  />
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
