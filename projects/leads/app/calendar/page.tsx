"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ChevronLeft,
  ChevronRight,
  Sun,
  Plus,
  Search,
} from "lucide-react"

const CalendarPage = () => {
  const [activeTab, setActiveTab] = useState("calendar_view")
  const [activeView, setActiveView] = useState("month")

  const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
  const dates = ["06", "07", "08", "09", "10", "11", "12"]
  const timeSlots = Array.from({ length: 11 }, (_, i) => `${i + 1} PM`)
  
  const miniCalDays = [
    {d: 29, m: 'prev'}, {d: 30, m: 'prev'}, {d: 1}, {d: 2}, {d: 3}, {d: 4}, {d: 5},
    {d: 6}, {d: 7}, {d: 8}, {d: 9}, {d: 10, selected: true}, {d: 11}, {d: 12},
    {d: 13}, {d: 14}, {d: 15}, {d: 16}, {d: 17}, {d: 18}, {d: 19},
    {d: 20}, {d: 21}, {d: 22}, {d: 23}, {d: 24}, {d: 25}, {d: 26},
    {d: 27}, {d: 28}, {d: 29}, {d: 30}, {d: 31}, {d: 1, m: 'next'}, {d: 2, m: 'next'}
  ];
  
  const users = [
    { id: "user_andres_barbery", name: "Andres Barbery" },
    { id: "user_ernesto_roca", name: "Ernesto Roca" },
    { id: "user_jose_carlos_blanco", name: "Jose Carlos Blanco Castedo" },
    { id: "user_rafael_quezada", name: "Rafael Quezada" },
    { id: "user_ruddy_paz", name: "Ruddy Paz (Dev)" },
    { id: "user_shogo_tarifa", name: "Shogo Tarifa Amo" },
  ]

  return (
    <DashboardLayout title="Calendario">
      <div className="flex flex-col h-full text-white">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent border-b border-[#1a1a1c] rounded-none p-0 h-14">
            <TabsTrigger value="calendar_view" className="h-full rounded-none data-[state=active]:bg-[#121212] data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-white text-gray-400 px-6">
              Vista de Calendario
            </TabsTrigger>
            <TabsTrigger value="appointment_list_view" className="h-full rounded-none data-[state=active]:bg-[#121212] data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-white text-gray-400 px-6">
              Lista de Citas
            </TabsTrigger>
            <TabsTrigger value="calendar_settings" className="h-full rounded-none data-[state=active]:bg-[#121212] data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-white text-gray-400 px-6">
              Ajustes de Calendario
            </TabsTrigger>
          </TabsList>
          <TabsContent value="calendar_view" className="flex-1 flex flex-col p-6 space-y-4">
            {/* Toolbar */}
            <div className="flex items-center gap-4">
              <span className="text-lg font-semibold">Jul 6 – 12, 2025</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#1A1A1C]">
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white hover:bg-[#1A1A1C]">
                <ChevronRight className="h-5 w-5" />
              </Button>
              <Button variant="outline" className="h-9 border-[#374151] hover:bg-[#1A1A1C]">Hoy</Button>
              <div className="flex-grow" />
              <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-white hover:bg-[#1A1A1C]">
                <Sun className="h-5 w-5" />
              </Button>
              <div className="flex items-center rounded-md bg-[#1A1A1C] p-0.5">
                <Button variant={activeView === 'day' ? 'default' : 'ghost'} onClick={() => setActiveView('day')} size="sm" className="h-8 text-xs px-3 bg-transparent hover:bg-[#374151] data-[state=active]:bg-[#374151]">Día</Button>
                <Button variant={activeView === 'week' ? 'default' : 'ghost'} onClick={() => setActiveView('week')} size="sm" className="h-8 text-xs px-3 bg-transparent hover:bg-[#374151] data-[state=active]:bg-[#374151]">Semana</Button>
                <Button variant={activeView === 'month' ? 'default' : 'ghost'} onClick={() => setActiveView('month')} size="sm" className="h-8 text-xs px-3 bg-transparent hover:bg-[#374151] data-[state=active]:bg-[#374151]" data-state={activeView === 'month' ? 'active' : 'inactive'}>Mes</Button>
                <Button variant={activeView === 'all' ? 'default' : 'ghost'} onClick={() => setActiveView('all')} size="sm" className="h-8 text-xs px-3 bg-transparent hover:bg-[#374151] data-[state=active]:bg-[#374151]">Todos</Button>
              </div>
              <Button className="bg-[#5E17EB] hover:bg-[#5E17EB]/90 h-9">
                <Plus className="h-4 w-4 mr-2" /> Nuevo
              </Button>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6 flex-1">
              {/* Calendar Grid */}
              <div className="bg-[#0A0A0A] border border-[#1A1A1C] rounded-lg p-4 flex flex-col">
                <div className="grid grid-cols-[60px_repeat(7,1fr)] text-center text-xs text-gray-400">
                  <div className="py-2">GMT-4</div>
                  {daysOfWeek.map((day, index) => (
                    <div key={day} className="py-2">
                      <p>{day}</p>
                      <p className={`font-semibold text-lg ${dates[index] === '10' ? 'text-primary' : 'text-white'}`}>{dates[index]}</p>
                    </div>
                  ))}
                </div>
                <div className="flex-1 grid grid-cols-[60px_repeat(7,1fr)] relative overflow-y-auto">
                   <div className="absolute left-[60px] top-[calc(100%/12*0.5)] w-[calc(100%-60px)] border-t border-dashed border-red-500"></div>
                  {/* Time Slots */}
                  <div className="col-start-1 text-xs text-gray-500 pr-2 text-right">
                    <div className="h-16 pt-2">Todo el día</div>
                    {timeSlots.map(time => <div key={time} className="h-16 pt-2">{time}</div>)}
                  </div>
                  {/* Grid cells */}
                  {Array.from({ length: 7 }).map((_, dayIndex) => (
                    <div key={dayIndex} className="col-start-auto border-l border-[#1A1A1C]">
                       <div className="h-16 border-b border-[#1A1A1C]"></div>
                       {Array.from({ length: 11 }).map((_, timeIndex) => (
                         <div key={timeIndex} className="h-16 border-b border-[#1A1A1C]"></div>
                       ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="bg-[#0A0A0A] border border-[#1A1A1C] rounded-lg p-4 space-y-6">
                {/* Mini Calendar */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <span className="font-semibold">Jul 2025</span>
                        <div className="flex items-center">
                            <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronLeft className="h-4 w-4"/></Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7"><ChevronRight className="h-4 w-4"/></Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 text-center text-xs text-gray-400 gap-y-2 place-items-center">
                        {daysOfWeek.map(day => <div key={day}>{day.slice(0,2)}</div>)}
                        {miniCalDays.map((day, i) => (
                            <div key={i} className={`
                                p-1 rounded-full w-7 h-7 flex items-center justify-center transition-colors
                                ${day.m ? 'text-gray-600' : 'text-white cursor-pointer hover:bg-[#1A1A1C]'}
                                ${day.selected ? 'bg-primary text-white font-bold hover:bg-primary/90' : ''}
                            `}>{day.d}</div>
                        ))}
                    </div>
                </div>

                {/* Resource Selector */}
                <div className="space-y-4">
                  <Tabs defaultValue="users" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-[#1A1A1C] h-9">
                      <TabsTrigger value="users">Usuarios</TabsTrigger>
                      <TabsTrigger value="calendars">Calendarios</TabsTrigger>
                      <TabsTrigger value="groups">Grupos</TabsTrigger>
                    </TabsList>
                    <TabsContent value="users" className="mt-4 space-y-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input placeholder="Buscar usuario..." className="pl-10 bg-transparent border-[#374151]" />
                      </div>
                      <ScrollArea className="h-48">
                        <div className="space-y-3 pr-4">
                          {users.map(user => (
                            <div key={user.id} className="flex items-center space-x-2">
                              <Checkbox id={user.id} className="border-gray-500 data-[state=checked]:bg-primary data-[state=checked]:border-primary" />
                              <Label htmlFor={user.id} className="text-sm font-light text-gray-200">{user.name}</Label>
                            </div>
                          ))}
                        </div>
                      </ScrollArea>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="appointment_list_view">
            <p className="p-6">Vista de lista de citas en construcción.</p>
          </TabsContent>
          <TabsContent value="calendar_settings">
            <p className="p-6">Ajustes de calendario en construcción.</p>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}

export default CalendarPage 