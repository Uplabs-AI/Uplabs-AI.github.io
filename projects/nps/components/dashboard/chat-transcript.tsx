import { Bot, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export function ChatTranscript() {
  const messages = [
    {
      sender: "assistant",
      text: "¡Hola! Soy el asistente de NPSVox. ¿Podría tomar un momento para responder una breve encuesta sobre su experiencia reciente?",
      time: "10:00:05",
    },
    {
      sender: "user",
      text: "Claro, adelante.",
      time: "10:00:15",
    },
    {
      sender: "assistant",
      text: "¿Qué tan probable es que recomiende nuestro servicio a un amigo o colega? (En una escala del 0 al 10, donde 0 es 'nada probable' y 10 es 'muy probable')",
      time: "10:00:25",
    },
    {
      sender: "user",
      text: "Diría que un 9.",
      time: "10:00:40",
    },
    {
      sender: "assistant",
      text: "¡Excelente! Gracias por su calificación. ¿Podría explicarnos brevemente la razón principal de su puntuación?",
      time: "10:00:50",
    },
    {
      sender: "user",
      text: "El servicio al cliente fue excepcional y la plataforma es muy fácil de usar.",
      time: "10:01:10",
    },
    {
      sender: "assistant",
      text: "Agradecemos mucho sus comentarios. Nos alegra saber que tuvo una experiencia positiva. ¿Hay algo más que le gustaría añadir o alguna sugerencia para mejorar?",
      time: "10:01:20",
    },
    {
      sender: "user",
      text: "Por ahora no, todo estuvo perfecto.",
      time: "10:01:35",
    },
    {
      sender: "assistant",
      text: "Perfecto. Muchas gracias por su tiempo y por ayudarnos a mejorar. ¡Que tenga un excelente día!",
      time: "10:01:45",
    },
    {
      sender: "user",
      text: "Igualmente, gracias.",
      time: "10:01:55",
    },
  ]

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {message.sender === "assistant" && (
              <Avatar className="h-8 w-8 bg-brand-royal">
                <AvatarFallback className="bg-brand-royal text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}

            <div className={`flex flex-col max-w-[70%] ${message.sender === "user" ? "items-end" : "items-start"}`}>
              <Card
                className={`p-3 ${
                  message.sender === "user"
                    ? "bg-brand-royal text-white border-brand-royal"
                    : "bg-muted text-foreground border-border"
                }`}
              >
                <CardContent className="p-0">
                  <p className="text-sm">{message.text}</p>
                </CardContent>
              </Card>
              <Badge variant="outline" className="mt-1 text-xs bg-transparent border-muted-foreground/20">
                {message.time}
              </Badge>
            </div>

            {message.sender === "user" && (
              <Avatar className="h-8 w-8 bg-brand-gray">
                <AvatarFallback className="bg-brand-gray text-white text-xs font-medium">
                  <User className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
