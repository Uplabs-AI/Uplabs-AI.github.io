"use client"

import { Sidebar } from "@/components/layout/sidebar"
import { Home, ChevronRight, Rocket, QrCode, UserCheck, ThumbsUp, HelpCircle, PlayCircle, Settings, Image as LucideImage, Music, Mic, Video, FileText, Smile, ArrowRight, Plus, Code, Trash2 } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import React, { useState } from "react"
import { useRouter } from "next/navigation"

// PathBar: barra superior con chips de eventos y settings
const events = [
  "messages",
  "statuses",
  "chats",
  "contacts",
  "groups",
  "presences",
  "channel",
  "users",
  "labels",
  "calls",
];

const chipColors = [
  '#897FD2',
  '#AA89FA',
  '#FF89ED',
  '#89FAB7',
  '#A370FF',
  '#6AB7FF',
  '#9CA3AF',
  '#9CA3AF',
  '#7E22CE',
  '#A370FF',
  '#9CA3AF',
];

// Utilidad para convertir hex a rgb
function hexToRgb(hex: string): [number, number, number] {
  hex = hex.replace('#', '');
  if (hex.length === 3) {
    hex = hex.split('').map((x: string) => x + x).join('');
  }
  const num = parseInt(hex, 16);
  return [
    (num >> 16) & 255,
    (num >> 8) & 255,
    num & 255
  ];
}

function PathBar() {
  return (
    <div className="flex border border-[#374151] rounded-md overflow-x-auto items-center mb-4 bg-[#1A1A1C] min-h-[48px]">
      {/* Título */}
      <div className="flex items-center px-4 py-2 text-white font-semibold min-w-[80px]">
        Path
      </div>
      {/* Chips */}
      <div className="flex items-center gap-2 px-2 flex-1 overflow-x-auto">
        {events.map((event, idx) => {
          const colorHex = chipColors[idx];
          const [r, g, b] = hexToRgb(colorHex);
          return (
            <span
              key={event}
              className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              style={{
                backgroundColor: `rgba(${r},${g},${b},0.1)`,
                color: `rgb(${r},${g},${b})`,
                borderColor: `rgba(${r},${g},${b},0.2)`
              }}
            >
              {event}
            </span>
          );
        })}
      </div>
      {/* Icono de settings */}
      <button
        type="button"
        className="flex items-center justify-center px-4 py-2 text-muted-foreground hover:text-white transition-colors"
        aria-label="Configuración"
      >
        <Settings className="w-6 h-6" />
      </button>
    </div>
  );
}

// Componente SwitchButton (igual que antes)
function SwitchButton({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-state={checked ? "checked" : "unchecked"}
      value="on"
      className="peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input"
      onClick={() => onChange(!checked)}
    >
      <span
        data-state={checked ? "checked" : "unchecked"}
        className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
      ></span>
    </button>
  );
}

// Componente WebhookConfig
function WebhookConfig({
  index,
  value,
  onChange,
  onRemove,
  showRemove
}: {
  index: number,
  value: WebhookState,
  onChange: (v: WebhookState) => void,
  onRemove: () => void,
  showRemove: boolean
}) {
  // Estado para switches de eventos
  const [eventSwitches, setEventSwitches] = useState<Record<string, boolean>>({
    messages: true,
    statuses: true,
    chats: false,
    contacts: false,
    groups: false,
    presences: false,
    channel: false,
    users: false,
    labels: false,
    calls: false,
  });

  const [selectedMode, setSelectedMode] = useState<'body' | 'path' | 'method'>('body');

  // Función para generar ID único de canal
  const generateChannelId = () => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    return `channel_${timestamp}_${random}`
  }

  return (
    <div className="bg-card p-6 rounded-lg border border-border">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-lg font-semibold">Webhook {index + 1}</h3>
          {index > 0 && showRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="text-red-500 hover:text-red-600"
              aria-label="Eliminar webhook"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          )}
        </div>
        <a href="#" className="flex items-center text-primary text-sm hover:underline">
          <PlayCircle className="h-4 w-4 mr-1" />
          Watch Tutorial
        </a>
      </div>
      <div className="space-y-2 mb-4">
        <label htmlFor="webhook-url" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#D1D5DB]">URL</label>
        <Input id="webhook-url" type="text" placeholder="https://your-domain.cloud/webhook-path" className="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] min-w-0" />
      </div>
      <div className="flex border border-input rounded-md overflow-x-auto items-stretch mb-4">
        {/* PathBar inline: título y chips a la izquierda, tuerca a la derecha */}
        <div className="flex flex-1 items-center min-w-0">
          <div className="flex items-center px-4 py-2 text-white font-semibold min-w-[60px]">
            Path
          </div>
          <div className="flex items-center gap-2 px-2 flex-1 overflow-x-auto">
            {events.map((event, idx) => {
              const colorHex = chipColors[idx];
              const [r, g, b] = hexToRgb(colorHex);
              return (
                <span
                  key={event}
                  className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  style={{
                    backgroundColor: `rgba(${r},${g},${b},0.1)`,
                    color: `rgb(${r},${g},${b})`,
                    borderColor: `rgba(${r},${g},${b},0.2)`
                  }}
                >
                  {event}
                </span>
              );
            })}
          </div>
        </div>
        <div className="flex items-center pr-4">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="settings-advanced" className="border-0">
              <AccordionTrigger className="!p-0 !bg-transparent hover:!bg-transparent group flex items-center justify-end">
                <Settings className="h-7 w-7 cursor-pointer text-muted-foreground group-data-[state=open]:text-primary transition-colors" />
              </AccordionTrigger>
              <AccordionContent className="p-0">
                {/* El acordeón de la tuerca queda vacío o solo con mensaje */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
      {/* Contenedor independiente para settings avanzados */}
      <div className="w-full space-y-8 mt-2">
        {/* Card: Mode */}
        <div className="w-full bg-card p-6 rounded-lg border border-border mb-0">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Mode</h2>
            <a href="#" className="flex items-center text-primary text-sm hover:underline">
              <PlayCircle className="h-4 w-4 mr-1" />
              Watch Tutorial
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Body */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-medium flex items-center mb-2">
                Body
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer ml-1">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                    <strong className="block mb-1">Cuerpo</strong>
                    Toda la información sobre el webhook y su evento se indicará en el cuerpo de la solicitud. Esto puede incluir varios detalles como el tipo de evento, ID del objeto, hora y fecha.
                  </PopoverContent>
                </Popover>
              </h3>
              <div
                className={
                  `bg-[#18181b] border rounded-lg p-4 mt-2 mb-2 w-40 h-40 flex justify-center items-center transition-colors duration-150 cursor-pointer ` +
                  (selectedMode === 'body'
                    ? 'border-primary shadow-lg'
                    : 'border-[#333] hover:border-primary hover:bg-[#23232a]')
                }
                onClick={() => setSelectedMode('body')}
              >
                <Code className="h-12 w-12 text-primary" />
              </div>
            </div>
            {/* Path */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-medium flex items-center mb-2">
                Path
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer ml-1">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                    <strong className="block mb-1">Ruta</strong>
                    Dependiendo del evento del webhook, la URL del webhook se aumentará. Por ejemplo, el evento 'message.post' enviará una devolución de llamada a 'https://example.com/message/post' en lugar de 'https://example.com/'. El cuerpo del evento se pasará al cuerpo de la solicitud. En este caso, ¡asegúrate de que tu script escuche exactamente la URL '/message/post'!
                  </PopoverContent>
                </Popover>
              </h3>
              <div
                className={
                  `bg-[#18181b] border rounded-lg p-4 mt-2 mb-2 w-40 h-40 flex justify-center items-center transition-colors duration-150 cursor-pointer ` +
                  (selectedMode === 'path'
                    ? 'border-primary shadow-lg'
                    : 'border-[#333] hover:border-primary hover:bg-[#23232a]')
                }
                onClick={() => setSelectedMode('path')}
              >
                <span className="text-foreground text-sm">http://</span>
              </div>
            </div>
            {/* Method */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-medium flex items-center mb-2">
                Method
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer">
                      <HelpCircle className="h-4 w-4 text-muted-foreground ml-1" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                    <strong className="block mb-1">Método</strong>
                    Funciona de manera similar a la Ruta, pero el método del evento se utilizará como método de solicitud. Por ejemplo, el evento 'messages.patch' convertiría 'POST https://example.com/' en 'PATCH https://example.com/messages'. En ese caso, ¡asegúrate de que tu script esté escuchando específicamente la URL '/message'!
                  </PopoverContent>
                </Popover>
              </h3>
              <div
                className={
                  `bg-[#18181b] border rounded-lg p-4 mt-2 mb-2 w-40 h-40 flex justify-center items-center transition-colors duration-150 cursor-pointer ` +
                  (selectedMode === 'method'
                    ? 'border-primary shadow-lg'
                    : 'border-[#333] hover:border-primary hover:bg-[#23232a]')
                }
                onClick={() => setSelectedMode('method')}
              >
                <div className="flex flex-wrap gap-2 justify-center">
                  {['POST', 'PUT', 'DELETE', 'PATCH'].map((method, idx) => {
                    // Colores: POST=azul, PUT=amarillo, DELETE=rojo, PATCH=verde
                    const methodColors = [
                      { bg: 'rgba(59,130,246,0.1)', color: 'rgb(59,130,246)', border: 'rgba(59,130,246,0.2)' }, // azul
                      { bg: 'rgba(253,224,71,0.1)', color: 'rgb(202,138,4)', border: 'rgba(253,224,71,0.2)' }, // amarillo
                      { bg: 'rgba(239,68,68,0.1)', color: 'rgb(239,68,68)', border: 'rgba(239,68,68,0.2)' }, // rojo
                      { bg: 'rgba(16,185,129,0.1)', color: 'rgb(16,185,129)', border: 'rgba(16,185,129,0.2)' }, // verde
                    ];
                    const style = methodColors[idx];
                    return (
                      <span
                        key={method}
                        className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        style={{
                          backgroundColor: style.bg,
                          color: style.color,
                          borderColor: style.border,
                        }}
                      >
                        {method}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Card: Events */}
        <div className="w-full bg-card p-6 rounded-lg border border-border">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Events</h2>
            <a href="#" className="flex items-center text-primary text-sm hover:underline">
              <PlayCircle className="h-4 w-4 mr-1" />
              Watch Tutorial
            </a>
          </div>
          <div className="space-y-4">
            {/* Evento: messages */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium">messages:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                    mensajes: Recibir mensajes nuevos / Editar, Eliminar mensajes
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <button className="h-8 w-14 rounded-md border border-[#333] bg-secondary text-xs font-semibold text-white">POST</button>
                <SwitchButton checked={eventSwitches.messages} onChange={(v) => setEventSwitches(prev => ({ ...prev, messages: v }))} />
                <button className="h-8 w-14 rounded-md border border-[#333] bg-card text-xs font-semibold text-white">PUT</button>
                <SwitchButton checked={eventSwitches.messages} onChange={(v) => setEventSwitches(prev => ({ ...prev, messages: v }))} />
                <button className="h-8 w-14 rounded-md border border-[#333] bg-card text-xs font-semibold text-white">DELETE</button>
                <SwitchButton checked={eventSwitches.messages} onChange={(v) => setEventSwitches(prev => ({ ...prev, messages: v }))} />
                <button className="h-8 w-14 rounded-md border border-[#333] bg-card text-xs font-semibold text-white">PATCH</button>
                <SwitchButton checked={eventSwitches.messages} onChange={(v) => setEventSwitches(prev => ({ ...prev, messages: v }))} />
              </div>
            </div>
            {/* Evento: statuses */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium">statuses:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                    estados: Recibir el estado de los mensajes
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <button className="h-8 w-14 rounded-md border border-[#333] bg-secondary text-xs font-semibold text-white">POST</button>
                <SwitchButton checked={eventSwitches.statuses} onChange={(v) => setEventSwitches(prev => ({ ...prev, statuses: v }))} />
                <button className="h-8 w-14 rounded-md border border-[#333] bg-card text-xs font-semibold text-white">PUT</button>
                <SwitchButton checked={eventSwitches.statuses} onChange={(v) => setEventSwitches(prev => ({ ...prev, statuses: v }))} />
              </div>
            </div>
            {/* Evento: chats */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium">chats:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                    chats: Obtener nuevos chats / Actualizar y eliminar chats
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <button className="h-8 w-14 rounded-md border border-[#333] bg-secondary text-xs font-semibold text-white">POST</button>
                <SwitchButton checked={eventSwitches.chats} onChange={(v) => setEventSwitches(prev => ({ ...prev, chats: v }))} />
                <button className="h-8 w-14 rounded-md border border-[#333] bg-card text-xs font-semibold text-white">PUT</button>
                <SwitchButton checked={eventSwitches.chats} onChange={(v) => setEventSwitches(prev => ({ ...prev, chats: v }))} />
                <button className="h-8 w-14 rounded-md border border-[#333] bg-card text-xs font-semibold text-white">DELETE</button>
                <SwitchButton checked={eventSwitches.chats} onChange={(v) => setEventSwitches(prev => ({ ...prev, chats: v }))} />
                <button className="h-8 w-14 rounded-md border border-[#333] bg-card text-xs font-semibold text-white">PATCH</button>
                <SwitchButton checked={eventSwitches.chats} onChange={(v) => setEventSwitches(prev => ({ ...prev, chats: v }))} />
              </div>
            </div>
            {/* Evento: contacts */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium">contacts:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                    contactos: Actualizar contactos
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <button className="h-8 w-14 rounded-md border border-[#333] bg-secondary text-xs font-semibold text-white">POST</button>
                <SwitchButton checked={eventSwitches.contacts} onChange={(v) => setEventSwitches(prev => ({ ...prev, contacts: v }))} />
                <button className="h-8 w-14 rounded-md border border-[#333] bg-card text-xs font-semibold text-white">PATCH</button>
                <SwitchButton checked={eventSwitches.contacts} onChange={(v) => setEventSwitches(prev => ({ ...prev, contacts: v }))} />
              </div>
            </div>
            {/* Evento: groups */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium">groups:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                    grupos: Nuevos grupos / Actualizar miembros / Modificar grupos
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <button className="h-8 w-14 rounded-md border border-[#333] bg-secondary text-xs font-semibold text-white">POST</button>
                <SwitchButton checked={eventSwitches.groups} onChange={(v) => setEventSwitches(prev => ({ ...prev, groups: v }))} />
                <button className="h-8 w-14 rounded-md border border-[#333] bg-card text-xs font-semibold text-white">PUT</button>
                <SwitchButton checked={eventSwitches.groups} onChange={(v) => setEventSwitches(prev => ({ ...prev, groups: v }))} />
                <button className="h-8 w-14 rounded-md border border-[#333] bg-card text-xs font-semibold text-white">PATCH</button>
                <SwitchButton checked={eventSwitches.groups} onChange={(v) => setEventSwitches(prev => ({ ...prev, groups: v }))} />
              </div>
            </div>
            {/* Evento: presences */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium">presences:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                    presencias: Recibir presencias
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <button className="h-8 w-14 rounded-md border border-[#333] bg-secondary text-xs font-semibold text-white">POST</button>
                <SwitchButton checked={eventSwitches.presences} onChange={(v) => setEventSwitches(prev => ({ ...prev, presences: v }))} />
              </div>
            </div>
            {/* Evento: channel */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium">channel:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                    canal: Estado de la instancia cambiado / Actualización de código QR
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <button className="h-8 w-14 rounded-md border border-[#333] bg-secondary text-xs font-semibold text-white">POST</button>
                <SwitchButton checked={eventSwitches.channel} onChange={(v) => setEventSwitches(prev => ({ ...prev, channel: v }))} />
                <button className="h-8 w-14 rounded-md border border-[#333] bg-card text-xs font-semibold text-white">PATCH</button>
                <SwitchButton checked={eventSwitches.channel} onChange={(v) => setEventSwitches(prev => ({ ...prev, channel: v }))} />
              </div>
            </div>
            {/* Evento: users */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium">users:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                    usuarios: Iniciar sesión de usuario / Cerrar sesión de usuario
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <button className="h-8 w-14 rounded-md border border-[#333] bg-secondary text-xs font-semibold text-white">POST</button>
                <SwitchButton checked={eventSwitches.users} onChange={(v) => setEventSwitches(prev => ({ ...prev, users: v }))} />
                <button className="h-8 w-14 rounded-md border border-[#333] bg-card text-xs font-semibold text-white">DELETE</button>
                <SwitchButton checked={eventSwitches.users} onChange={(v) => setEventSwitches(prev => ({ ...prev, users: v }))} />
              </div>
            </div>
            {/* Evento: labels */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium">labels:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                    etiquetas: Recibir nuevas etiquetas / eliminar etiquetas
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <button className="h-8 w-14 rounded-md border border-[#333] bg-secondary text-xs font-semibold text-white">POST</button>
                <SwitchButton checked={eventSwitches.labels} onChange={(v) => setEventSwitches(prev => ({ ...prev, labels: v }))} />
                <button className="h-8 w-14 rounded-md border border-[#333] bg-card text-xs font-semibold text-white">DELETE</button>
                <SwitchButton checked={eventSwitches.labels} onChange={(v) => setEventSwitches(prev => ({ ...prev, labels: v }))} />
              </div>
            </div>
            {/* Evento: calls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="font-medium">calls:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <span className="cursor-pointer">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </span>
                  </PopoverTrigger>
                  <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                    llamadas: Recibir eventos relacionados con llamadas
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center space-x-2">
                <button className="h-8 w-14 rounded-md border border-[#333] bg-secondary text-xs font-semibold text-white">POST</button>
                <SwitchButton checked={eventSwitches.calls} onChange={(v) => setEventSwitches(prev => ({ ...prev, calls: v }))} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Persistent webhook</span>
          <Popover>
            <PopoverTrigger asChild>
              <span className="cursor-pointer">
                <HelpCircle className="h-4 w-4 text-muted-foreground" />
              </span>
            </PopoverTrigger>
            <PopoverContent className="max-w-xs text-sm text-muted-foreground">
              <strong className="block mb-1">Webhook persistente</strong>
              Si hubo problemas en tu servidor al momento de recibir la devolución de llamada, enviaremos el webhook nuevamente hasta que sea exitoso. La cantidad de intentos es configurable a través de la API; por defecto, te enviaremos una devolución de llamada en un plazo de 15 minutos.
            </PopoverContent>
          </Popover>
        </div>
        <Switch id="persistent-webhook" />
      </div>
    </div>
  );
}

// Estado para cada webhook
interface WebhookState {
  url: string;
  mode: 'body' | 'path' | 'method';
  eventSwitches: Record<string, boolean>;
  persistent: boolean;
}

export default function Step4Page() {
  const router = useRouter();
  
  const [webhooks, setWebhooks] = useState<WebhookState[]>([
    {
      url: '',
      mode: 'body',
      eventSwitches: {
        messages: true,
        statuses: true,
        chats: false,
        contacts: false,
        groups: false,
        presences: false,
        channel: false,
        users: false,
        labels: false,
        calls: false,
      },
      persistent: false,
    },
  ]);

  const handleWebhookChange = (idx: number, newValue: WebhookState) => {
    setWebhooks(ws => ws.map((w, i) => i === idx ? newValue : w));
  };
  const handleAddWebhook = () => {
    setWebhooks(ws => [
      ...ws,
      {
        url: '',
        mode: 'body',
        eventSwitches: {
          messages: true,
          statuses: true,
          chats: false,
          contacts: false,
          groups: false,
          presences: false,
          channel: false,
          users: false,
          labels: false,
          calls: false,
        },
        persistent: false,
      }
    ]);
  };
  const handleRemoveWebhook = (idx: number) => {
    setWebhooks(ws => ws.length > 1 ? ws.filter((_, i) => i !== idx) : ws);
  };

  // Función para generar ID único de canal
  const generateChannelId = () => {
    const timestamp = Date.now()
    const random = Math.random().toString(36).substring(2, 8)
    return `channel_${timestamp}_${random}`
  }

  // Función para manejar el clic en "Siguiente"
  const handleNext = () => {
    const channelId = generateChannelId()
    // Usar el primer webhook como ejemplo para la configuración
    const channelConfig = {
      id: channelId,
      webhooks,
      createdAt: new Date().toISOString(),
      // Agregar más configuración según sea necesario
    }
    localStorage.setItem(`channel_${channelId}`, JSON.stringify(channelConfig))
    router.push(`/dashboard/channel/${channelId}`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <div className="w-64 hidden md:block">
        <Sidebar />
      </div>
      {/* Header superior */}
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-xl font-semibold">Channel</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 bg-[#121212] border border-[#1d1d20] rounded-md px-4 py-2">
              <div className="w-7 h-7 bg-[#241543] rounded-full flex items-center justify-center">
                <span className="text-[#ad84ff] text-sm font-medium select-none">U</span>
              </div>
              <span className="text-white text-sm font-medium whitespace-nowrap">usuario@empresa.com</span>
            </div>
            <a className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border hover:text-accent-foreground h-9 rounded-md px-3 bg-[#121212] border-[#1d1d20] text-white hover:bg-[#1a1a1c]" href="/auth/logout">Sign Out</a>
          </div>
        </header>
        {/* Header de breadcrumbs y título */}
        <div className="flex-1 flex flex-col p-6 font-sans">
          <header className="flex justify-between items-center py-4 border-b border-border mb-8">
            <h1 className="text-2xl font-semibold">Channel Connection</h1>
            <div className="flex items-center gap-4 text-muted-foreground text-sm">
              <Home className="h-4 w-4" />
              <span>Dashboard</span>
              <ChevronRight className="h-4 w-4" />
              <span>Finish Settings (optionally)</span>
            </div>
          </header>
          <main className="flex flex-col items-center w-full">
            {/* Steps visual */}
            <div className="flex flex-row justify-center items-stretch w-full max-w-5xl gap-8 mb-12 px-2 lg:px-0">
              {/* Step 1 */}
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2">
                  <Rocket className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="text-base text-primary font-medium">Start channel</span>
              </div>
              {/* Line + Arrow */}
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="w-full flex items-center">
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                  <ChevronRight className="mx-2 text-muted-foreground w-8 h-8" />
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                </div>
              </div>
              {/* Step 2 */}
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2">
                  <QrCode className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="text-base text-primary font-medium">Channel Connection</span>
              </div>
              {/* Line + Arrow */}
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="w-full flex items-center">
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                  <ChevronRight className="mx-2 text-muted-foreground w-8 h-8" />
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                </div>
              </div>
              {/* Step 3 */}
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2">
                  <UserCheck className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="text-base text-primary font-medium">Confirm Detail</span>
              </div>
              {/* Line + Arrow */}
              <div className="hidden lg:flex flex-1 items-center justify-center">
                <div className="w-full flex items-center">
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                  <ChevronRight className="mx-2 text-muted-foreground w-8 h-8" />
                  <div className="flex-1 border-t-2 border-dashed border-border" />
                </div>
              </div>
              {/* Step 4 (active) */}
              <div className="flex flex-col items-center flex-1 min-w-[120px]">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-2">
                  <ThumbsUp className="h-10 w-10 text-primary-foreground" />
                </div>
                <span className="text-base text-primary font-medium">Finish Settings (optionally)</span>
              </div>
            </div>
            {/* Título */}
            <h2 className="text-xl font-semibold mb-8 self-start max-w-5xl w-full px-2 lg:px-0">4. Finish Settings (Optionally)</h2>
            {/* Secciones de configuración */}
            <div className="w-full max-w-4xl flex flex-col space-y-8">
              {webhooks.map((wh, idx) => (
                <WebhookConfig
                  key={idx}
                  index={idx}
                  value={wh}
                  onChange={v => handleWebhookChange(idx, v)}
                  onRemove={() => handleRemoveWebhook(idx)}
                  showRemove={webhooks.length > 1}
                />
              ))}
              <div className="flex justify-center w-full mt-4">
                <button onClick={handleAddWebhook} className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background h-10 px-4 py-2 w-full max-w-md border-[#4B5563] text-[#9CA3AF] hover:bg-[#374151] hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plus h-4 w-4 mr-2"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
                  Agregar URL
                </button>
              </div>
              {/* Auto Download */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">Auto Download</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <span className="cursor-pointer">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </span>
                      </PopoverTrigger>
                      <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                        <strong className="block mb-1">Descarga automática</strong>
                        Elige los tipos de contenido multimedia que deseas guardar automáticamente en la nube y recibir un enlace en la nube en el mensaje. Si esta opción no se usa, puedes descargar los archivos necesarios con una solicitud separada.
                      </PopoverContent>
                    </Popover>
                  </div>
                  <a href="#" className="flex items-center text-primary text-sm hover:underline">
                    <PlayCircle className="h-4 w-4 mr-1" />
                    Watch Tutorial
                  </a>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center p-4 border border-border rounded-md bg-[#333333]">
                    <LucideImage className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm mb-2">Image</span>
                    <Switch id="auto-download-image" thumbClassName="bg-[#000000]" />
                  </div>
                  <div className="flex flex-col items-center p-4 border border-border rounded-md bg-[#333333]">
                    <Music className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm mb-2">Audio</span>
                    <Switch id="auto-download-audio" thumbClassName="bg-[#000000]" />
                  </div>
                  <div className="flex flex-col items-center p-4 border border-border rounded-md bg-[#333333]">
                    <Mic className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm mb-2">Voice</span>
                    <Switch id="auto-download-voice" thumbClassName="bg-[#000000]" />
                  </div>
                  <div className="flex flex-col items-center p-4 border border-border rounded-md bg-[#333333]">
                    <Video className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm mb-2">Video</span>
                    <Switch id="auto-download-video" thumbClassName="bg-[#000000]" />
                  </div>
                  <div className="flex flex-col items-center p-4 border border-border rounded-md bg-[#333333]">
                    <FileText className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm mb-2">Document</span>
                    <Switch id="auto-download-document" thumbClassName="bg-[#000000]" />
                  </div>
                  <div className="flex flex-col items-center p-4 border border-border rounded-md bg-[#333333]">
                    <Smile className="h-8 w-8 mb-2 text-muted-foreground" />
                    <span className="text-sm mb-2">Sticker</span>
                    <Switch id="auto-download-sticker" thumbClassName="bg-[#000000]" />
                  </div>
                </div>
              </div>
              {/* Proxy Port */}
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-2">
                    <h3 className="text-lg font-semibold">Individual Proxy Port</h3>
                    <Popover>
                      <PopoverTrigger asChild>
                        <span className="cursor-pointer">
                          <HelpCircle className="h-4 w-4 text-muted-foreground" />
                        </span>
                      </PopoverTrigger>
                      <PopoverContent className="max-w-xs text-sm text-muted-foreground">
                        <strong className="block mb-1">Puerto de proxy individual</strong>
                        Usa tu propio servidor proxy Socks5 si la actividad de tu cuenta es sospechosa para WhatsApp. Esto ayudará a crear una conexión más auténtica y segura a WhatsApp, asegurando que la API funcione sin problemas. ¡Asegúrate de que tu proxy esté disponible antes de conectarlo, de lo contrario podría afectar el canal!
                      </PopoverContent>
                    </Popover>
                  </div>
                  <a href="#" className="flex items-center text-primary text-sm hover:underline">
                    <span>Explore More</span>
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
                <div className="space-y-2">
                  <label htmlFor="proxy-port" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-[#D1D5DB]">Proxy</label>
                  <Input id="proxy-port" type="text" placeholder="socks5://login:password@ip:port" className="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB]" />
                </div>
              </div>
            </div>
            {/* Barra de navegación inferior */}
            <div className="flex justify-end space-x-3 w-full mt-6">
              <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:bg-accent h-10 px-4 py-2 border-gray-600 text-gray-400 hover:text-white">Atrás</button>
              <button 
                type="button" 
                onClick={handleNext}
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
              >
                Siguiente
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 