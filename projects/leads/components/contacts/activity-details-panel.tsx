import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { User, Facebook } from "lucide-react"

const activityData = {
  header: {
    title: "Activity",
    filter: "TODAY",
  },
  events: [
    {
      type: "Contact Created",
      timestamp: "9 hours ago",
      icon: "contact",
      details: [
        { key: "Source", value: "Paid Social" },
        { key: "Campaign", value: "Seconsat Seguros_rp_auto X Km Hom_venta_leldx" },
        { key: "From", value: "Facebook Lead Form" },
      ],
    },
    {
      type: "Facebook Lead Form",
      timestamp: "9 hours ago",
      icon: "facebook",
      details: [
        { key: "Source", value: "Paid Social" },
        { key: "Campaign", value: "Seconsat Seguros_rp_auto X Km Hom_venta_leldx" },
        { key: "Platform", value: "Facebook Lead Form" },
      ],
    },
  ],
  footer: {
    component: "AttributionPanel",
    fields: [
      { label: "First Attribution Source", value: "Paid Social" },
      { label: "Latest Attribution Source", value: "Paid Social" },
    ],
  },
}

const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "contact":
      return <User className="w-4 h-4 text-gray-400" />
    case "facebook":
      return <Facebook className="w-4 h-4 text-blue-500" />
    default:
      return <User className="w-4 h-4 text-gray-400" />
  }
}

export function ActivityDetailsPanel() {
  return (
    <>
      {/* Botones arriba del card de actividad */}
      <div className="flex gap-4 mb-4">
        <Button className="bg-[#1A1A1C] border border-[#374151] text-white hover:bg-[#23232a] h-10 px-6 rounded-md text-sm font-medium">Notas</Button>
        <Button className="bg-[#1A1A1C] border border-[#374151] text-white hover:bg-[#23232a] h-10 px-6 rounded-md text-sm font-medium">Resumen de Conversación</Button>
      </div>
      <Card className="bg-[#121212] border-[#1A1A1C] text-white h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg">{activityData.header.title}</CardTitle>
          <Button variant="outline" className="text-sm bg-[#0A0A0A] border-[#374151] hover:bg-[#1A1A1C]">
            {activityData.header.filter}
          </Button>
        </CardHeader>
        <CardContent className="flex-grow space-y-6 overflow-y-auto">
          {activityData.events.map((event, index) => (
            <div key={index} className="flex gap-4">
              <div className="bg-[#1A1A1C] h-8 w-8 rounded-full flex items-center justify-center shrink-0">
                <ActivityIcon type={event.icon} />
              </div>
              <div className="w-full">
                <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
                  <span>{event.type}</span>
                  <span>{event.timestamp}</span>
                </div>
                <div className="text-sm space-y-1 mt-2">
                  {event.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="flex justify-between">
                      <span className="text-gray-400">{detail.key}:</span>
                      <span className="text-white text-right font-medium">{detail.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
        <Separator className="bg-[#1A1A1C]" />
        <CardFooter className="p-4">
          <div className="w-full space-y-2">
              <h3 className="text-base font-semibold">Attribution</h3>
              {activityData.footer.fields.map((field, index) => (
                   <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-400">{field.label}:</span>
                      <span className="text-white font-medium">{field.value}</span>
                   </div>
              ))}
          </div>
        </CardFooter>
      </Card>
    </>
  )
} 