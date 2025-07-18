import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Pencil, Tag, X } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

const contactData = {
  title: "Contact",
  action: "Hide empty fields",
  sections: [
    {
      title: "Contact",
      fields: [
        { component: "StaticField", label: "First Name", value: "Christian", is_editable: true },
        { component: "StaticField", label: "Last Name", value: "Castillo Luna", is_editable: true },
        { component: "StaticField", label: "Email", value: "christiancastilloluna@yahoo.com", is_editable: true },
        { component: "StaticField", label: "Phone", value: "72271106", is_editable: true },
        { component: "StaticField", label: "Date Of Birth", value: null, is_editable: true },
        { component: "StaticField", label: "Contact Source", value: "Facebook", is_editable: true },
        { component: "StaticField", label: "Contact Type", value: "Lead", is_editable: true },
        { component: "StaticField", label: "Producto", value: ["Auto > Km", "Autotal"], is_editable: true },
        { component: "StaticField", label: "Departamento", value: "SANTA CRUZ", is_editable: true },
        { component: "StaticField", label: "Clientify_ID", value: "63924649", is_editable: false },
        { component: "StaticField", label: "Opportunity_ID", value: "21027278", is_editable: false },
        { component: "AccordionItem", title: "General Info", is_expanded: false, content: "Contenido de General Info" },
        { component: "AccordionItem", title: "Additional Info", is_expanded: false, content: "Contenido de Additional Info" },
        { component: "SectionHeader", title: "ACTIONS" },
        {
          component: "CollapsiblePanel",
          title: "Tags",
          is_expanded: true,
          content: {
            component: "TagEditor",
            input_placeholder: "Add Tags",
            tags: [
              { text: "lead nuevo", is_removable: true },
              { text: "seguimiento", is_removable: true },
              { text: "llamada seguimiento 1", is_removable: true },
              { text: "santa cruz", is_removable: true },
            ],
          },
        },
      ],
    },
  ],
}

const TagEditor = ({ placeholder, tags }: { placeholder: string, tags: {text: string, is_removable: boolean}[] }) => {
  return (
    <div className="bg-[#0A0A0A] border border-[#374151] rounded-lg p-2">
       <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div key={index} className="flex items-center gap-1 bg-[#2a2a2c] px-2 py-1 rounded-md text-sm">
            <span>{tag.text}</span>
            {tag.is_removable && <X className="h-3 w-3 cursor-pointer" />}
          </div>
        ))}
       </div>
       <Input 
         type="text"
         placeholder={placeholder}
         className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 h-8"
       />
    </div>
  )
}

export function ContactDetailsPanel({ contact }: { contact: any }) { // Accept contact prop
  // Use the contact prop to build the data for the panel
  const [firstName, ...lastNameParts] = contact.name.split(" ")
  const lastName = lastNameParts.join(" ")

  const panelData = {
    title: "Contact",
    action: "Hide empty fields",
    sections: [
      {
        title: "Contact",
        fields: [
          { component: "StaticField", label: "First Name", value: firstName, is_editable: true },
          { component: "StaticField", label: "Last Name", value: lastName, is_editable: true },
          { component: "StaticField", label: "Email", value: contact.email, is_editable: true },
          { component: "StaticField", label: "Phone", value: contact.phone, is_editable: true },
          { component: "StaticField", label: "Date Of Birth", value: null, is_editable: true },
          { component: "StaticField", label: "Contact Source", value: "Facebook", is_editable: true }, // Example static value
          { component: "StaticField", label: "Contact Type", value: contact.status, is_editable: true },
          { component: "StaticField", label: "Producto", value: ["Auto > Km", "Autotal"], is_editable: true }, // Example static value
          { component: "StaticField", label: "Departamento", value: "SANTA CRUZ", is_editable: true }, // Example static value
          { component: "StaticField", label: "Clientify_ID", value: `mock_${contact.id}`, is_editable: false },
          { component: "StaticField", label: "Opportunity_ID", value: `mock_opp_${contact.id}`, is_editable: false },
          { component: "AccordionItem", title: "General Info", is_expanded: false, content: "Contenido de General Info" },
          { component: "AccordionItem", title: "Additional Info", is_expanded: false, content: "Contenido de Additional Info" },
          { component: "SectionHeader", title: "ACTIONS" },
          {
            component: "CollapsiblePanel",
            title: "Tags",
            is_expanded: true,
            content: {
              component: "TagEditor",
              input_placeholder: "Add Tags",
              tags: [
                { text: "lead nuevo", is_removable: true },
                { text: "seguimiento", is_removable: true },
              ],
            },
          },
        ],
      },
    ],
  }


  return (
    <Card className="bg-[#121212] border-[#1A1A1C] text-white h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg">{panelData.title}</CardTitle>
        <div className="flex items-center space-x-2">
          <Checkbox id="hide-empty" className="border-gray-500 data-[state=checked]:bg-[#5E17EB] data-[state=checked]:border-[#5E17EB]" />
          <Label htmlFor="hide-empty" className="text-sm font-medium text-gray-400 peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {panelData.action}
          </Label>
        </div>
      </CardHeader>
      <CardContent>
        {panelData.sections.map((section, index) => (
          <div key={index}>
            <div className="space-y-4">
              {section.fields.map((field, fieldIndex) => {
                if (field.component === 'StaticField') {
                  return (
                    <div key={fieldIndex} className="space-y-1">
                      <Label className="text-gray-400 text-xs">{field.label}</Label>
                      <div className="flex items-center gap-2">
                        {Array.isArray(field.value) ? (
                          <div className="flex flex-wrap gap-2">
                            {field.value.map((val, i) => (
                              <div key={i} className="flex items-center gap-1 bg-[#2a2a2c] px-2 py-1 rounded-md text-sm">
                                <Tag className="h-3 w-3 text-gray-400" />
                                <span>{val}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Input
                            type="text"
                            defaultValue={field.value || "N/A"}
                            readOnly={!field.is_editable}
                            className={`bg-[#0A0A0A] border-[#374151] text-white placeholder-gray-500 h-9 ${!field.is_editable ? 'text-gray-400' : ''}`}
                          />
                        )}
                        {field.is_editable && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-[#1A1A1C] shrink-0">
                            <Pencil className="h-4 w-4 text-gray-400" />
                          </Button>
                        )}
                      </div>
                    </div>
                  )
                }
                if (field.component === 'AccordionItem') {
                    return (
                        <Accordion type="single" collapsible key={fieldIndex}>
                            <AccordionItem value={field.title || `accordion-item-${fieldIndex}`} className="border-b-0">
                                <AccordionTrigger className="text-white hover:no-underline">{field.title}</AccordionTrigger>
                                <AccordionContent>
                                    {field.content as string}
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    )
                }
                if (field.component === 'SectionHeader') {
                    return (
                        <h3 key={fieldIndex} className="text-xs text-gray-400 font-bold tracking-widest uppercase pt-4">{field.title}</h3>
                    )
                }
                if (field.component === 'CollapsiblePanel' && typeof field.content === 'object' && field.content !== null && 'component' in field.content) {
                    const content = field.content as { component: string, input_placeholder: string, tags: {text: string, is_removable: boolean}[] };
                    if (content.component === 'TagEditor') {
                        return (
                           <div key={fieldIndex} className="space-y-2">
                             <Label className="text-white">{field.title}</Label>
                             <TagEditor placeholder={content.input_placeholder} tags={content.tags} />
                           </div>
                        )
                    }
                }
                return null
              })}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
} 