"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { 
  AlertTriangle, 
  Info, 
  CheckCircle, 
  XCircle, 
  Play, 
  Pause, 
  Edit, 
  Trash2,
  Download,
  Upload,
  Settings,
  User,
  Calendar,
  Phone,
  BarChart3,
  ArrowUp,
  ArrowRight,
  ArrowDown,
  Eye,
  Plus,
  ChevronDown
} from "lucide-react"
import { AreaChart as ReAreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface ComponentsSectionProps {
  section: "buttons" | "inputs" | "cards" | "badges" | "alerts" | "navigation" | "tables" | "modals" |
           "metric-cards" | "stats-cards" | "charts" | "filters" | "data-tables" | "toggles" |
           "export-buttons" | "date-pickers" | "loading-states" | "error-states" | "empty-states"
}

export function ComponentsSection({ section }: ComponentsSectionProps) {
  
  const renderButtonsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Buttons</h2>
        <p className="text-gray-400 mb-8">
          All button styles and variants available in the system
        </p>
      </div>

      {/* Variantes de Botones */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Variants</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Sizes</h3>
          <div className="flex items-center gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button size="icon"><Settings className="h-4 w-4" /></Button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">With Icons</h3>
          <div className="flex flex-wrap gap-4">
            <Button><Play className="h-4 w-4 mr-2" />Start</Button>
            <Button variant="outline"><Pause className="h-4 w-4 mr-2" />Pause</Button>
            <Button variant="secondary"><Download className="h-4 w-4 mr-2" />Download</Button>
            <Button variant="destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</Button>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Special Export Button</h3>
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {/* Botón Export Principal */}
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-all duration-200 hover:scale-105">
                <Download className="h-4 w-4 mr-2" />
                Export
              </button>
              
              {/* Variación sin scale */}
              <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-all duration-200">
                <Download className="h-4 w-4 mr-2" />
                Export (no scale)
              </button>
              
              {/* Estado disabled */}
              <button disabled className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white transition-all duration-200 hover:scale-105">
                <Download className="h-4 w-4 mr-2" />
                Export (disabled)
              </button>
            </div>
            
            <div className="bg-[#0A0A0A] border border-[#1a1a1c] rounded-lg p-4">
              <h4 className="text-sm font-medium text-white mb-2">Export Button Specifications:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                <div>
                  <p className="font-medium text-white mb-2">Base Styles:</p>
                  <ul className="space-y-1">
                    <li>• Color: <code className="bg-[#1a1a1c] px-1 rounded text-[#5E17EB]">#5E17EB</code></li>
                    <li>• Height: <code className="bg-[#1a1a1c] px-1 rounded">h-10</code> (40px)</li>
                    <li>• Padding: <code className="bg-[#1a1a1c] px-1 rounded">px-4 py-2</code></li>
                    <li>• Border radius: <code className="bg-[#1a1a1c] px-1 rounded">rounded-md</code></li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-white mb-2">Hover States:</p>
                  <ul className="space-y-1">
                    <li>• Hover bg: <code className="bg-[#1a1a1c] px-1 rounded">#5E17EB/90</code></li>
                    <li>• Transform: <code className="bg-[#1a1a1c] px-1 rounded">scale-105</code></li>
                    <li>• Transition: <code className="bg-[#1a1a1c] px-1 rounded">duration-200</code></li>
                    <li>• Disabled: <code className="bg-[#1a1a1c] px-1 rounded">opacity-50</code></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-[#0A0A0A] border border-[#1a1a1c] rounded-lg p-4">
              <h4 className="text-sm font-medium text-white mb-2">HTML Code:</h4>
              <pre className="text-xs text-gray-400 bg-[#121212] p-3 rounded overflow-x-auto">
{`<button class="inline-flex items-center justify-center gap-2 
  whitespace-nowrap rounded-md text-sm font-medium 
  ring-offset-background focus-visible:outline-none 
  focus-visible:ring-2 focus-visible:ring-ring 
  focus-visible:ring-offset-2 disabled:pointer-events-none 
  disabled:opacity-50 [&_svg]:pointer-events-none 
  [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2 
  bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white 
  transition-all duration-200 hover:scale-105">
  <svg>...</svg>
  Export
</button>`}
              </pre>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">States</h3>
          <div className="flex flex-wrap gap-4">
            <Button>Normal</Button>
            <Button disabled>Disabled</Button>
            <Button className="opacity-75">Loading...</Button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderInputsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Inputs & Forms</h2>
        <p className="text-gray-400 mb-8">
          Data input components and forms
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="input-default">Default Input</Label>
            <Input id="input-default" placeholder="Type here..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="input-email">Email</Label>
            <Input id="input-email" type="email" placeholder="user@email.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="input-password">Password</Label>
            <Input id="input-password" type="password" placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="textarea">Textarea</Label>
            <Textarea id="textarea" placeholder="Long description..." />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Switch</Label>
            <div className="flex items-center space-x-2">
              <Switch id="switch-1" />
              <Label htmlFor="switch-1">Enable notifications</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Checkbox</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="check-1" />
                <Label htmlFor="check-1">Option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check-2" />
                <Label htmlFor="check-2">Option 2</Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Radio Group</Label>
            <RadioGroup defaultValue="option-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-1" id="r1" />
                <Label htmlFor="r1">Option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option-2" id="r2" />
                <Label htmlFor="r2">Option 2</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Select</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )

  const renderCardsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Cards</h2>
        <p className="text-gray-400 mb-8">
          Containers and cards to organize information
        </p>
      </div>

      {/* Ejemplos básicos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Simple Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Basic card content with header and content.</p>
          </CardContent>
        </Card>

        <Card className="bg-[#0A0A0A] border-[#1a1a1c]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-5 w-5 mr-2" />
              With Icon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">Card with icon in title and custom styles.</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-[#5E17EB] to-[#8280FF]">
          <CardHeader>
            <CardTitle className="text-white">Gradient Card</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-white/80">Card with gradient background using brand colors.</p>
          </CardContent>
        </Card>
      </div>

      {/* Metric Cards estilo dashboard */}
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="shadow-sm border rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-[#000000] text-[#8280ff] border-[#8280ff]/20">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Llamadas Totales</div>
              <User className="h-4 w-4 text-white" />
            </div>
            <div className="text-2xl font-bold mt-2 text-white">100</div>
            <div className="flex items-center mt-2 text-xs text-gray-400">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>+12% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 2 */}
        <div className="shadow-sm border rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-[#000000] text-[#8280ff] border-[#8280ff]/20">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Llamadas Transferidas</div>
              <ArrowUp className="h-4 w-4 text-white" />
            </div>
            <div className="text-2xl font-bold mt-2 text-white">0</div>
            <div className="flex items-center mt-2 text-xs text-gray-400">
              <ArrowRight className="h-4 w-4 mr-1" />
              <span>0% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 3 */}
        <div className="shadow-sm border rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-[#000000] text-[#8280ff] border-[#8280ff]/20">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Llamadas Exitosas</div>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold mt-2 text-white">27</div>
            <div className="flex items-center mt-2 text-xs text-gray-400">
              <ArrowUp className="h-4 w-4 mr-1" />
              <span>+15% vs last month</span>
            </div>
          </div>
        </div>

        {/* Card 4 */}
        <div className="shadow-sm border rounded-xl transition-all duration-200 hover:shadow-lg hover:scale-[1.02] bg-[#000000] text-[#8280ff] border-[#8280ff]/20">
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">Llamadas Fallidas</div>
              <XCircle className="h-4 w-4 text-red-500" />
            </div>
            <div className="text-2xl font-bold mt-2 text-white">7</div>
            <div className="flex items-center mt-2 text-xs text-gray-400">
              <ArrowDown className="h-4 w-4 mr-1" />
              <span>-3% vs last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderBadgesSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Badges</h2>
        <p className="text-gray-400 mb-8">
          Labels and status indicators
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Default Variants</h3>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="destructive">Destructive</Badge>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Campaign States</h3>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-green-500 hover:bg-green-500">Active</Badge>
            <Badge className="bg-orange-500 hover:bg-orange-500">Paused</Badge>
            <Badge className="bg-gray-500 hover:bg-gray-500">Completed</Badge>
            <Badge className="bg-blue-500 hover:bg-blue-500">Scheduled</Badge>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-white mb-4">With Icons</h3>
          <div className="flex flex-wrap gap-3">
            <Badge className="bg-green-500 hover:bg-green-500">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
            <Badge className="bg-red-500 hover:bg-red-500">
              <XCircle className="h-3 w-3 mr-1" />
              Error
            </Badge>
            <Badge className="bg-blue-500 hover:bg-blue-500">
              <Info className="h-3 w-3 mr-1" />
              Information
            </Badge>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAlertsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Alerts</h2>
        <p className="text-gray-400 mb-8">
          Messages and notifications for the user
        </p>
      </div>

      <div className="space-y-6">
        <Alert className="bg-blue-500/10 border-blue-500/20">
          <Info className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-400">
            This is an informational message for the user.
          </AlertDescription>
        </Alert>

        <Alert className="bg-green-500/10 border-green-500/20">
          <CheckCircle className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-400">
            Operation completed successfully!
          </AlertDescription>
        </Alert>

        <Alert className="bg-yellow-500/10 border-yellow-500/20">
          <AlertTriangle className="h-4 w-4 text-yellow-400" />
          <AlertDescription className="text-yellow-400">
            Warning: Review the data before continuing.
          </AlertDescription>
        </Alert>

        <Alert className="bg-red-500/10 border-red-500/20">
          <XCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400">
            Error: Could not complete the operation.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )

  const renderTablesSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Tables</h2>
        <p className="text-gray-400 mb-8">
          Components to display tabular data
        </p>
      </div>

      <div className="space-y-6">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b bg-[#000000]">
              <tr className="transition-colors data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50">
                {[
                  "Contacto",
                  "Celular",
                  "Primer contacto",
                  "Último contacto",
                  "Asistente",
                  "Mensajes",
                  "Estado",
                  "Acciones",
                ].map((header) => (
                  <th
                    key={header}
                    className="h-12 px-4 text-left align-middle font-medium text-gray-400 [&:has([role=checkbox])]:pr-0"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {[
                {
                  name: "Juan Pérez",
                  phone: "+591 78592844",
                  first: "21/04/2024 10:23",
                  last: "21/04/2025 10:23",
                  assistant: "Auto x Km (VP)",
                  messages: 12,
                  status: { text: "Completada", color: "#82ecff" },
                },
                {
                  name: "María García",
                  phone: "+591 78920755",
                  first: "21/04/2024 11:05",
                  last: "21/04/2025 11:05",
                  assistant: "Auto x Km (VP)",
                  messages: 8,
                  status: { text: "Completada", color: "#82ecff" },
                },
                {
                  name: "Carlos Rodríguez",
                  phone: "+591 76645561",
                  first: "20/04/2024 15:47",
                  last: "20/04/2025 15:47",
                  assistant: "Auto x Km (VP)",
                  messages: 5,
                  status: { text: "Abandonada", color: "#fd82ff" },
                },
              ].map((row, idx) => (
                <tr
                  key={idx}
                  className="data-[state=selected]:bg-muted border-b border-[#1a1a1c] hover:bg-[#1a1a1c]/50 transition-colors duration-200 cursor-pointer"
                >
                  <td className="p-4 align-middle text-white font-medium">{row.name}</td>
                  <td className="p-4 align-middle text-white">{row.phone}</td>
                  <td className="p-4 align-middle text-white">{row.first}</td>
                  <td className="p-4 align-middle text-white">{row.last}</td>
                  <td className="p-4 align-middle text-white">{row.assistant}</td>
                  <td className="p-4 align-middle text-white">{row.messages}</td>
                  <td className="p-4 align-middle">
                    <span
                      className="text-sm font-medium"
                      style={{ color: row.status.color }}
                    >
                      {row.status.text}
                    </span>
                  </td>
                  <td className="p-4 align-middle">
                    <Button
                      variant="link"
                      className="text-[#9ca3af] hover:text-[#8280ff] p-0 h-auto text-sm font-medium underline-offset-4 hover:no-underline"
                    >
                      Ver chat
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )

  const renderTogglesSection = () => {
    const [activeOption1, setActiveOption1] = useState('voice')
    const [activeOption2, setActiveOption2] = useState('text')
    const [activeCompact, setActiveCompact] = useState('a')

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Advanced Toggles</h2>
          <p className="text-gray-400 mb-8">
            Toggle components with animations and advanced states
          </p>
        </div>

      <div className="space-y-8">
        {/* Toggle Principal - Agentes */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Agent Toggle</h3>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div 
                role="group" 
                dir="ltr" 
                className="flex rounded-[21.5px] bg-[#100030] border border-[#5e17eb] h-[43px] w-[273px] p-[5px]" 
                tabIndex={0} 
                style={{ outline: 'none' }}
              >
                <button 
                  type="button" 
                  role="radio" 
                  aria-checked={activeOption1 === 'voice'}
                  onClick={() => setActiveOption1('voice')}
                  className={`basis-1/2 h-full rounded-[17.5px] text-sm flex items-center justify-center whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                    activeOption1 === 'voice' 
                      ? 'bg-[#5e17eb] text-white font-bold shadow-lg scale-105' 
                      : 'bg-transparent text-[#5e17eb] font-normal scale-95 hover:bg-[#5e17eb]/5'
                  }`}
                >
                  Voice Agents
                </button>
                <button 
                  type="button" 
                  role="radio" 
                  aria-checked={activeOption1 === 'text'}
                  onClick={() => setActiveOption1('text')}
                  className={`basis-1/2 h-full rounded-[17.5px] text-sm flex items-center justify-center whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                    activeOption1 === 'text' 
                      ? 'bg-[#5e17eb] text-white font-bold shadow-lg scale-105' 
                      : 'bg-transparent text-[#5e17eb] font-normal scale-95 hover:bg-[#5e17eb]/5'
                  }`}
                >
                  Text Agents
                </button>
              </div>
            </div>
            
            {/* Estado alternativo */}
            <div className="flex justify-center">
              <div 
                role="group" 
                dir="ltr" 
                className="flex rounded-[21.5px] bg-[#100030] border border-[#5e17eb] h-[43px] w-[273px] p-[5px]" 
                tabIndex={0} 
                style={{ outline: 'none' }}
              >
                <button 
                  type="button" 
                  role="radio" 
                  aria-checked={activeOption2 === 'voice'}
                  onClick={() => setActiveOption2('voice')}
                  className={`basis-1/2 h-full rounded-[17.5px] text-sm flex items-center justify-center whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                    activeOption2 === 'voice' 
                      ? 'bg-[#5e17eb] text-white font-bold shadow-lg scale-105' 
                      : 'bg-transparent text-[#5e17eb] font-normal scale-95 hover:bg-[#5e17eb]/5'
                  }`}
                >
                  Voice Agents
                </button>
                <button 
                  type="button" 
                  role="radio" 
                  aria-checked={activeOption2 === 'text'}
                  onClick={() => setActiveOption2('text')}
                  className={`basis-1/2 h-full rounded-[17.5px] text-sm flex items-center justify-center whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                    activeOption2 === 'text' 
                      ? 'bg-[#5e17eb] text-white font-bold shadow-lg scale-105' 
                      : 'bg-transparent text-[#5e17eb] font-normal scale-95 hover:bg-[#5e17eb]/5'
                  }`}
                >
                  Text Agents
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Especificaciones técnicas */}
        <div className="bg-[#0A0A0A] border border-[#1a1a1c] rounded-lg p-6">
          <h4 className="text-lg font-medium text-white mb-4">Advanced Toggle Specifications</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-medium text-white mb-3">Base Structure:</p>
              <ul className="space-y-2 text-gray-400">
                <li>• Container: <code className="bg-[#1a1a1c] px-1 rounded">rounded-[21.5px]</code></li>
                <li>• Background: <code className="bg-[#1a1a1c] px-1 rounded">#100030</code></li>
                <li>• Border: <code className="bg-[#1a1a1c] px-1 rounded">border-[#5e17eb]</code></li>
                <li>• Dimensions: <code className="bg-[#1a1a1c] px-1 rounded">h-[43px] w-[273px]</code></li>
                <li>• Padding: <code className="bg-[#1a1a1c] px-1 rounded">p-[5px]</code></li>
              </ul>
            </div>
            
            <div>
              <p className="font-medium text-white mb-3">Button States:</p>
              <ul className="space-y-2 text-gray-400">
                <li>• Active: <code className="bg-[#1a1a1c] px-1 rounded">bg-[#5e17eb] scale-105</code></li>
                <li>• Inactive: <code className="bg-[#1a1a1c] px-1 rounded">bg-transparent scale-95</code></li>
                <li>• Inactive hover: <code className="bg-[#1a1a1c] px-1 rounded">bg-[#5e17eb]/5</code></li>
                <li>• Transition: <code className="bg-[#1a1a1c] px-1 rounded">duration-300 ease-in-out</code></li>
              </ul>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-medium text-white mb-3">Animations & Effects:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-400">
              <div>
                <p className="font-medium text-[#5e17eb] mb-2">Active State:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Scale: 105% (larger)</li>
                  <li>• Font: Bold</li>
                  <li>• Shadow: lg</li>
                  <li>• Color: White</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-[#5e17eb] mb-2">Inactive State:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Scale: 95% (smaller)</li>
                  <li>• Font: Normal</li>
                  <li>• Background: Transparent</li>
                  <li>• Color: #5e17eb</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-[#5e17eb] mb-2">Inactive Hover:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Background: #5e17eb/5</li>
                  <li>• Maintains scale 95%</li>
                  <li>• Smooth transition</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Código HTML */}
        <div className="bg-[#0A0A0A] border border-[#1a1a1c] rounded-lg p-6">
          <h4 className="text-lg font-medium text-white mb-4">Código HTML Completo</h4>
          <pre className="text-xs text-gray-400 bg-[#121212] p-4 rounded overflow-x-auto max-h-96 overflow-y-auto">
{`<div role="group" dir="ltr" 
     class="flex rounded-[21.5px] bg-[#100030] border border-[#5e17eb] 
            h-[43px] w-[273px] p-[5px]" 
     tabindex="0" style="outline: none;">
  
  <!-- Botón Activo -->
  <button type="button" data-state="on" role="radio" aria-checked="true" 
          class="basis-1/2 h-full rounded-[17.5px] text-sm 
                 flex items-center justify-center whitespace-nowrap 
                 transition-all duration-300 ease-in-out transform 
                 data-[state=on]:bg-[#5e17eb] 
                 data-[state=on]:text-white 
                 data-[state=on]:font-bold 
                 data-[state=on]:shadow-lg 
                 data-[state=on]:scale-105 
                 data-[state=off]:bg-transparent 
                 data-[state=off]:text-[#5e17eb] 
                 data-[state=off]:font-normal 
                 data-[state=off]:scale-95 
                 data-[state=off]:hover:bg-[#5e17eb]/5" 
          tabindex="-1">
    Agentes de Voz
  </button>
  
  <!-- Botón Inactivo -->
  <button type="button" data-state="off" role="radio" aria-checked="false" 
          class="basis-1/2 h-full rounded-[17.5px] text-sm 
                 flex items-center justify-center whitespace-nowrap 
                 transition-all duration-300 ease-in-out transform 
                 data-[state=on]:bg-[#5e17eb] 
                 data-[state=on]:text-white 
                 data-[state=on]:font-bold 
                 data-[state=on]:shadow-lg 
                 data-[state=on]:scale-105 
                 data-[state=off]:bg-transparent 
                 data-[state=off]:text-[#5e17eb] 
                 data-[state=off]:font-normal 
                 data-[state=off]:scale-95 
                 data-[state=off]:hover:bg-[#5e17eb]/5" 
          tabindex="0">
    Agentes de Texto
  </button>
</div>`}
          </pre>
        </div>

        {/* Variaciones del Toggle */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Variaciones del Toggle</h3>
          <div className="space-y-4">
            {/* Toggle más pequeño */}
            <div className="flex justify-center">
              <div 
                role="group" 
                dir="ltr" 
                className="flex rounded-[18px] bg-[#100030] border border-[#5e17eb] h-[36px] w-[220px] p-[4px]" 
                tabIndex={0} 
                style={{ outline: 'none' }}
              >
                <button 
                  type="button"
                  role="radio"
                  aria-checked={activeCompact === 'a'}
                  onClick={() => setActiveCompact('a')}
                  className={`basis-1/2 h-full rounded-[14px] text-xs flex items-center justify-center whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                    activeCompact === 'a' 
                      ? 'bg-[#5e17eb] text-white font-bold shadow-lg scale-105' 
                      : 'bg-transparent text-[#5e17eb] font-normal scale-95 hover:bg-[#5e17eb]/5'
                  }`}
                >
                  Opción A
                </button>
                <button 
                  type="button"
                  role="radio"
                  aria-checked={activeCompact === 'b'}
                  onClick={() => setActiveCompact('b')}
                  className={`basis-1/2 h-full rounded-[14px] text-xs flex items-center justify-center whitespace-nowrap transition-all duration-300 ease-in-out transform ${
                    activeCompact === 'b' 
                      ? 'bg-[#5e17eb] text-white font-bold shadow-lg scale-105' 
                      : 'bg-transparent text-[#5e17eb] font-normal scale-95 hover:bg-[#5e17eb]/5'
                  }`}
                >
                  Opción B
                </button>
              </div>
            </div>
            <p className="text-center text-gray-400 text-sm">Toggle Compacto (220x36px)</p>
          </div>
        </div>

        {/* Sección de Animaciones Funcionales */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Animaciones en Acción</h3>
          <div className="bg-[#0A0A0A] border border-[#1a1a1c] rounded-lg p-6">
            <p className="text-gray-400 mb-4">
              Los toggles de arriba son completamente funcionales. Haz clic en ellos para ver las animaciones:
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>• <span className="text-[#5e17eb]">Transición suave</span> de 300ms con ease-in-out</li>
              <li>• <span className="text-[#5e17eb]">Scale transform</span>: 105% para activo, 95% para inactivo</li>
              <li>• <span className="text-[#5e17eb]">Cambio de color</span>: fondo, texto y sombra</li>
              <li>• <span className="text-[#5e17eb]">Font weight</span>: bold para activo, normal para inactivo</li>
              <li>• <span className="text-[#5e17eb]">Hover effect</span>: fondo sutil en opciones inactivas</li>
            </ul>
          </div>
        </div>

        {/* Código React/JavaScript */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Implementación React</h3>
          <div className="bg-[#0A0A0A] border border-[#1a1a1c] rounded-lg p-6">
            <h4 className="text-lg font-medium text-white mb-4">Código React Funcional</h4>
            <pre className="text-xs text-gray-400 bg-[#121212] p-4 rounded overflow-x-auto max-h-96 overflow-y-auto">
{`import { useState } from 'react'

function AgentToggle() {
  const [activeOption, setActiveOption] = useState('voice')

  return (
    <div 
      role="group" 
      className="flex rounded-[21.5px] bg-[#100030] border border-[#5e17eb] 
                 h-[43px] w-[273px] p-[5px]" 
    >
      <button 
        type="button" 
        role="radio" 
        aria-checked={activeOption === 'voice'}
        onClick={() => setActiveOption('voice')}
        className={\`basis-1/2 h-full rounded-[17.5px] text-sm 
                   flex items-center justify-center whitespace-nowrap 
                   transition-all duration-300 ease-in-out transform \${
          activeOption === 'voice' 
            ? 'bg-[#5e17eb] text-white font-bold shadow-lg scale-105' 
            : 'bg-transparent text-[#5e17eb] font-normal scale-95 hover:bg-[#5e17eb]/5'
        }\`}
      >
        Agentes de Voz
      </button>
      
      <button 
        type="button" 
        role="radio" 
        aria-checked={activeOption === 'text'}
        onClick={() => setActiveOption('text')}
        className={\`basis-1/2 h-full rounded-[17.5px] text-sm 
                   flex items-center justify-center whitespace-nowrap 
                   transition-all duration-300 ease-in-out transform \${
          activeOption === 'text' 
            ? 'bg-[#5e17eb] text-white font-bold shadow-lg scale-105' 
            : 'bg-transparent text-[#5e17eb] font-normal scale-95 hover:bg-[#5e17eb]/5'
        }\`}
      >
        Agentes de Texto
      </button>
    </div>
  )
}`}
            </pre>
          </div>
        </div>
      </div>
    </div>
    )
  }

  const renderChartsSection = () => {
    const areaData = [
      { time: "00:00", minutes: 50 },
      { time: "02:00", minutes: 45 },
      { time: "04:00", minutes: 40 },
      { time: "06:00", minutes: 35 },
      { time: "08:00", minutes: 38 },
      { time: "10:00", minutes: 32 },
      { time: "12:00", minutes: 25 },
      { time: "14:00", minutes: 38 },
      { time: "16:00", minutes: 42 },
      { time: "18:00", minutes: 48 },
      { time: "20:00", minutes: 55 },
      { time: "22:00", minutes: 60 },
    ]

    const sparkData = [
      { date: "02/04/23", value: 310 },
      { date: "03/04/23", value: 330 },
      { date: "04/04/23", value: 350 },
      { date: "05/04/23", value: 360 },
      { date: "07/04/23", value: 378 },
    ]

    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Charts</h2>
          <p className="text-gray-400 mb-8">
            Example charts built with Recharts and styled with the NPS VOX palette.
          </p>
        </div>

        {/* Area Chart grande */}
        <Card className="bg-[#0A0A0A] border-[#1a1a1c]">
          <CardHeader>
            <CardTitle className="flex items-center">
              <BarChart3 className="h-5 w-5 mr-2" /> Minutes per Hour
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-60 mb-4">
              <ResponsiveContainer width="100%" height="100%">
                <ReAreaChart data={areaData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorMinutes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#5e17eb" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#5e17eb" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1c" />
                  <XAxis dataKey="time" stroke="#9ca3af" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <YAxis stroke="#9ca3af" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1a1a1c", border: "1px solid #374151", borderRadius: 8, color: "#fff" }} labelStyle={{ color: "#9ca3af" }} />
                  <Area type="monotone" dataKey="minutes" stroke="#5e17eb" fillOpacity={1} fill="url(#colorMinutes)" strokeWidth={2} activeDot={{ r: 4 }} />
                </ReAreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Sparkline pequeño */}
        <Card className="bg-[#0A0A0A] border-[#1a1a1c]">
          <CardContent className="p-4 pt-0">
            <div className="text-3xl font-bold text-white mb-4">378.46</div>
            <div className="h-[80px]">
              <ResponsiveContainer width="100%" height="100%">
                <ReAreaChart data={sparkData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotalMinutes" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8280ff" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#8280ff" stopOpacity={0.2} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" tick={{ fill: "#626262", fontSize: 8 }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={["dataMin", "dataMax"]} />
                  <Tooltip wrapperStyle={{ display: "none" }} />
                  <Area type="monotone" dataKey="value" stroke="#8280ff" fill="url(#colorTotalMinutes)" strokeWidth={2} dot={{ r: 2, strokeWidth: 0, fill: "#8280ff" }} isAnimationActive={false} />
                </ReAreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const renderModalsSection = () => {
    const [text, setText] = useState("")
    const fields = [
      { id: "nombres", label: "Nombres", placeholder: "Ej. Julio", value: "María" },
      { id: "apellidos", label: "Apellidos", placeholder: "Ej. Perez", value: "Rodríguez" },
      { id: "empresa", label: "Empresa", placeholder: "ej. Sofia", value: "Finanzas Plus" },
      { id: "edad", label: "Edad", placeholder: "ej. 40", value: "42" },
      { id: "estado-laboral", label: "Estado Laboral", placeholder: "ej. dependiente", value: "Directivo" },
    ]
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-4">Modals</h2>
          <p className="text-gray-400 mb-8">Dialog component examples</p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Mostrar Modal</Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0A0A0A] border-[#1A1A1C] text-white max-w-md">
            <DialogHeader>
              <DialogTitle>Pausar campaña</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <p className="text-gray-300">
                ¿Estás seguro de que deseas pausar la campaña: <span className="font-medium">Satisfacción Post-Compra</span>?
              </p>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300" htmlFor="confirm-text">Escribe "Pausar"</label>
                <Input
                  id="confirm-text"
                  placeholder="Pausar"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="bg-[#1A1A1C] border-[#374151] focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB] text-white"
                />
              </div>
              <p className="text-sm text-gray-400">Esta acción es para brindarte mayor control</p>
            </div>
            <div className="flex justify-end gap-3 pt-6">
              <Button variant="outline" className="border-[#374151] text-gray-400 hover:text-white hover:bg-[#374151]">
                Cancelar
              </Button>
              <Button disabled={text !== "Pausar"}>Pausar campaña</Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Modal Ejemplo 2: Editar Contacto */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Editar Contacto</Button>
          </DialogTrigger>
          <DialogContent className="bg-[#0A0A0A] border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-bold">Editar Contacto</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {fields.map((f) => (
                  <div key={f.id} className="space-y-2">
                    <label htmlFor={`edit-${f.id}`} className="text-sm font-medium leading-none text-[#D1D5DB]">
                      {f.label}
                    </label>
                    <Input
                      id={`edit-${f.id}`}
                      placeholder={f.placeholder}
                      defaultValue={f.value}
                      className="bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
                    />
                  </div>
                ))}

                {/* Celular con prefijo */}
                <div className="space-y-2 md:col-span-1">
                  <label htmlFor="edit-celular" className="text-sm font-medium text-[#D1D5DB] flex items-center">
                    Celular <span className="text-red-500 ml-1">*</span>
                  </label>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="w-24 bg-[#1A1A1C] border-[#4B5563] hover:bg-[#1A1A1C]/80 flex justify-between"
                    >
                      <span>+591</span>
                      <ChevronDown className="h-4 w-4 opacity-50" />
                    </Button>
                    <Input
                      id="edit-celular"
                      placeholder="123 45678"
                      defaultValue="623 456 789"
                      className="flex-1 bg-[#1A1A1C] border-[#4B5563] text-white focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]"
                    />
                  </div>
                </div>
              </div>

              {/* Botón agregar campo personalizado */}
              <div className="space-y-4">
                <Button className="w-full bg-[#5E17EB] hover:bg-[#5E17EB]/90">
                  <Plus className="h-4 w-4 mr-2" />Agregar Campo Personalizado
                </Button>
              </div>

              {/* Asignar Lista */}
              <div className="space-y-4">
                <label className="text-base font-medium text-[#D1D5DB]">Asignar Lista</label>
                <div className="space-y-4">
                  <label className="text-sm font-medium text-white">
                    Cambiar de lista <span className="text-red-500">*</span>
                  </label>
                  <Button
                    variant="outline"
                    className="w-full bg-[#1A1A1C] border-[#4B5563] hover:bg-[#1A1A1C]/80 flex justify-between"
                  >
                    <span>Proveedor salud</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </div>
              </div>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 gap-3">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white">
                Cancelar
              </Button>
              <Button>Guardar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    )
  }

  switch (section) {
    // Basic Components
    case "buttons":
      return renderButtonsSection()
    case "inputs":
      return renderInputsSection()
    case "cards":
      return renderCardsSection()
    case "badges":
      return renderBadgesSection()
    case "alerts":
      return renderAlertsSection()
    case "tables":
      return renderTablesSection()
    case "navigation":
      return <div className="text-white">Navegación - En desarrollo</div>
    case "modals":
      return renderModalsSection()
    
    // Dashboard Components
    case "metric-cards":
      return <div className="text-white">Metric Cards - En desarrollo</div>
    case "stats-cards":
      return <div className="text-white">Stats Cards - En desarrollo</div>
    case "charts":
      return renderChartsSection()
    case "filters":
      return <div className="text-white">Filtros - En desarrollo</div>
    case "data-tables":
      return <div className="text-white">Tablas de Datos - En desarrollo</div>
    case "toggles":
      return renderTogglesSection()
    
    // Utility Components
    case "export-buttons":
      return <div className="text-white">Export Buttons - En desarrollo</div>
    case "date-pickers":
      return <div className="text-white">Date Pickers - En desarrollo</div>
    case "loading-states":
      return <div className="text-white">Loading States - En desarrollo</div>
    case "error-states":
      return <div className="text-white">Error States - En desarrollo</div>
    case "empty-states":
      return <div className="text-white">Empty States - En desarrollo</div>
    
    default:
      return renderButtonsSection()
  }
} 