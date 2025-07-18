"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Copy,
  Activity,
  BarChart3,
  Users,
  Phone,
  Edit,
  Trash2,
  Plus,
  Filter,
  Calendar,
  Download,
  Eye,
  Settings
} from "lucide-react"

interface FoundationSectionProps {
  section: "colors" | "typography" | "spacing" | "shadows" | "iconography" | "animations"
}

export function FoundationSection({ section }: FoundationSectionProps) {
  const renderColorsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Color Palette</h2>
        <p className="text-gray-400 mb-8">
          Consistent color system for the entire NPS VOX application
        </p>
      </div>

      {/* Colores Principales */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Primary Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorCard color="#5e17eb" name="Royal" description="Primary brand color" />
          <ColorCard color="#9933ff" name="Indigo" description="Primary accent" />
          <ColorCard color="#9999ff" name="Purple" description="Light purple" />
          <ColorCard color="#b299ff" name="Violet" description="Violet" />
        </div>
      </div>

      {/* Colores de Estado y Notificación */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Status & Notification Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorCard color="#82FF90" name="Success" description="Success / Confirmation" />
          <ColorCard color="#99ffff" name="Info" description="Information / Cyan" />
          <ColorCard color="#ff99ff" name="Warning" aname="Magenta / Warning" />
          <ColorCard color="#cc99ff" name="Error" description="Error / Pink" />
        </div>
      </div>

      {/* Escala de Grises y Fondos */}
      <div>
        <h3 className="text-xl font-semibold text-white mb-4">Grayscale & Backgrounds</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <ColorCard color="#000000" name="Black" description="Sidebar background" />
          <ColorCard color="#0A0A0A" name="Card" description="Card background" />
          <ColorCard color="#1a1a1a" name="Charcoal" description="Borders & dark accents" />
          <ColorCard color="#4d4d4d" name="Gray Dark" description="Dark gray" />
          <ColorCard color="#7a7a7a" name="Gray Medium" description="Medium gray" />
          <ColorCard color="#121212" name="Background" description="Main background" />
        </div>
      </div>
    </div>
  )

  const renderTypographySection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Typography</h2>
        <p className="text-gray-400 mb-8">
          Typographic hierarchy and text styles of the system
        </p>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-white">Heading 1 - 4xl Bold</h1>
          <code className="text-sm text-gray-400 bg-[#1a1a1c] px-2 py-1 rounded">
            text-4xl font-bold
          </code>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-white">Heading 2 - 3xl Bold</h2>
          <code className="text-sm text-gray-400 bg-[#1a1a1c] px-2 py-1 rounded">
            text-3xl font-bold
          </code>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-white">Heading 3 - 2xl Semibold</h3>
          <code className="text-sm text-gray-400 bg-[#1a1a1c] px-2 py-1 rounded">
            text-2xl font-semibold
          </code>
        </div>

        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-white">Heading 4 - xl Semibold</h4>
          <code className="text-sm text-gray-400 bg-[#1a1a1c] px-2 py-1 rounded">
            text-xl font-semibold
          </code>
        </div>

        <div className="space-y-4">
          <p className="text-base text-white">Body Text - Base Regular</p>
          <code className="text-sm text-gray-400 bg-[#1a1a1c] px-2 py-1 rounded">
            text-base
          </code>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-gray-400">Small Text - SM Muted</p>
          <code className="text-sm text-gray-400 bg-[#1a1a1c] px-2 py-1 rounded">
            text-sm text-gray-400
          </code>
        </div>
      </div>
    </div>
  )

  const renderSpacingSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Spacing</h2>
        <p className="text-gray-400 mb-8">
          Consistent spacing system based on 4px multiples
        </p>
      </div>

      <div className="space-y-6">
        {[1, 2, 3, 4, 6, 8, 12, 16, 20, 24, 32].map((size) => (
          <div key={size} className="flex items-center space-x-4">
            <div className="w-16 text-white text-sm font-mono">{size * 4}px</div>
            <div className="w-20 text-gray-400 text-sm">p-{size}</div>
            <div 
              className="bg-[#5E17EB] h-4"
              style={{ width: size * 4 }}
            />
          </div>
        ))}
      </div>
    </div>
  )

  const renderShadowsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Shadows</h2>
        <p className="text-gray-400 mb-8">
          Elevation levels and visual depth
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ShadowCard 
          title="Shadow SM" 
          className="shadow-sm" 
          code="shadow-sm"
        />
        <ShadowCard 
          title="Shadow MD" 
          className="shadow-md" 
          code="shadow-md"
        />
        <ShadowCard 
          title="Shadow LG" 
          className="shadow-lg" 
          code="shadow-lg"
        />
        <ShadowCard 
          title="Shadow XL" 
          className="shadow-xl" 
          code="shadow-xl"
        />
        <ShadowCard 
          title="Shadow 2XL" 
          className="shadow-2xl" 
          code="shadow-2xl"
        />
      </div>
    </div>
  )

  const renderIconographySection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Iconography</h2>
        <p className="text-gray-400 mb-8">
          Custom icon system and visual elements of the project
        </p>
      </div>

      <div className="space-y-6">
        {/* Iconos SVG Personalizados */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Custom NPS Icons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[#0A0A0A] border-[#1a1a1c] p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👎</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">Detractor</h4>
                  <p className="text-sm text-gray-400">Score 0-6</p>
                  <code className="text-xs text-gray-300">/icons/detractor.svg</code>
                </div>
              </div>
            </Card>
            
            <Card className="bg-[#0A0A0A] border-[#1a1a1c] p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">😐</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">Passive</h4>
                  <p className="text-sm text-gray-400">Score 7-8</p>
                  <code className="text-xs text-gray-300">/icons/pasivo.svg</code>
                </div>
              </div>
            </Card>
            
            <Card className="bg-[#0A0A0A] border-[#1a1a1c] p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">👍</span>
                </div>
                <div>
                  <h4 className="text-white font-medium">Promoter</h4>
                  <p className="text-sm text-gray-400">Score 9-10</p>
                  <code className="text-xs text-gray-300">/icons/promotor.svg</code>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Avatares de Agentes */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Agent Avatars</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['sofia', 'maria', 'valeria', 'lucio'].map((agent) => (
              <Card key={agent} className="bg-[#0A0A0A] border-[#1a1a1c] p-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-[#5E17EB]/20 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h4 className="text-white font-medium capitalize">{agent}</h4>
                  <code className="text-xs text-gray-300">/agents/{agent}-icon.svg</code>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Lucide Icons */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Lucide Icons</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Activity", Icon: Activity },
              { name: "BarChart3", Icon: BarChart3 },
              { name: "Users", Icon: Users },
              { name: "Phone", Icon: Phone },
              { name: "Edit", Icon: Edit },
              { name: "Trash2", Icon: Trash2 },
              { name: "Plus", Icon: Plus },
              { name: "Filter", Icon: Filter },
              { name: "Calendar", Icon: Calendar },
              { name: "Download", Icon: Download },
              { name: "Eye", Icon: Eye },
              { name: "Settings", Icon: Settings },
            ].map(({ name, Icon }) => (
              <Card key={name} className="bg-[#0A0A0A] border-[#1a1a1c] p-4 text-center group">
                <div className="w-12 h-12 bg-[#1a1a1c] rounded-lg mx-auto flex items-center justify-center mb-3 transition-colors group-hover:bg-[#5e17eb]/20">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-white text-sm font-medium mb-1">{name}</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => navigator.clipboard.writeText(name)}
                  className="mx-auto"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderAnimationsSection = () => (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Animations</h2>
        <p className="text-gray-400 mb-8">
          Transitions and motion effects to enhance user experience
        </p>
      </div>

      <div className="space-y-6">
        {/* Hover Effects */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Hover Effects</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-[#0A0A0A] border-[#1a1a1c] p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
              <h4 className="text-white font-medium mb-2">Scale + Shadow</h4>
              <p className="text-sm text-gray-400 mb-2">Effect used in MetricCard</p>
              <code className="text-xs text-gray-300 bg-[#1a1a1c] px-2 py-1 rounded">
                hover:shadow-lg hover:scale-[1.02]
              </code>
            </Card>
            
            <Card className="bg-[#0A0A0A] border-[#1a1a1c] p-6 transition-all duration-200 hover:bg-[#1a1a1c]/50">
              <h4 className="text-white font-medium mb-2">Background Change</h4>
              <p className="text-sm text-gray-400 mb-2">Effect used in table rows</p>
              <code className="text-xs text-gray-300 bg-[#1a1a1c] px-2 py-1 rounded">
                hover:bg-[#1a1a1c]/50
              </code>
            </Card>
            
            <Card className="bg-[#0A0A0A] border-[#1a1a1c] p-6">
              <h4 className="text-white font-medium mb-2">Loading Pulse</h4>
              <p className="text-sm text-gray-400 mb-2">Skeleton loading state</p>
              <div className="w-full h-4 bg-[#1a1a1c] rounded animate-pulse"></div>
            </Card>
          </div>
        </div>

        {/* Button Animations */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Button Animations</h3>
          <div className="flex gap-4">
            <Button className="transition-all duration-200 hover:scale-105">
              Scale on Hover
            </Button>
            <Button variant="outline" className="transition-colors duration-200">
              Color Transition
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  switch (section) {
    case "colors":
      return renderColorsSection()
    case "typography":
      return renderTypographySection()
    case "spacing":
      return renderSpacingSection()
    case "shadows":
      return renderShadowsSection()
    case "iconography":
      return renderIconographySection()
    case "animations":
      return renderAnimationsSection()
    default:
      return renderColorsSection()
  }
}

function ColorCard({ color, name, description, aname }: { color: string; name: string; description?: string, aname?: string }) {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card className="bg-[#0A0A0A] border-[#1a1a1c] overflow-hidden">
      <div 
        className="h-24 w-full"
        style={{ backgroundColor: color }}
      />
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium text-white text-sm">{name}</h4>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => copyToClipboard(color)}
            className="h-6 w-6 p-0"
          >
            <Copy className="h-3 w-3" />
          </Button>
        </div>
        <p className="text-xs text-gray-400 mb-2">{description || aname}</p>
        <code className="text-xs font-mono text-gray-300 bg-[#1a1a1c] px-2 py-1 rounded">
          {color}
        </code>
      </CardContent>
    </Card>
  )
}

function ShadowCard({ title, className, code }: { title: string; className: string; code: string }) {
  return (
    <Card className={`bg-[#0A0A0A] border-[#1a1a1c] ${className}`}>
      <CardContent className="p-6">
        <h4 className="font-medium text-white mb-2">{title}</h4>
        <code className="text-xs font-mono text-gray-300 bg-[#1a1a1c] px-2 py-1 rounded">
          {code}
        </code>
      </CardContent>
    </Card>
  )
} 