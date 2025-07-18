"use client"

import { Sidebar } from "@/components/layout/sidebar"
import UserInfoBar from "@/components/layout/user-info-bar"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CloudUpload, Circle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useKnowledgebase } from "@/lib/contexts/knowledgebase-context"
import { useRouter } from "next/navigation"

export default function KnowledgebaseCreatePage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const [inputType, setInputType] = useState<'upload' | 'text'>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState("");
  const [hovered, setHovered] = useState<null | 'upload' | 'text'>(null);
  const [nombre, setNombre] = useState("");
  const [producto, setProducto] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const { knowledgebase, addKnowledge, updateKnowledge } = useKnowledgebase();
  const router = useRouter();

  // Si hay id, buscar el knowledgebase correspondiente
  const editingKb = id ? knowledgebase.find((k) => k.id === id) : null;

  useEffect(() => {
    if (editingKb) {
      setNombre(editingKb.title || "");
      setProducto(editingKb.category || "");
      setDescripcion(editingKb.description || "");
      setInputType(editingKb.contentType === 'document' ? 'upload' : 'text');
      if (editingKb.contentType === 'text') {
        setText(editingKb.description || "");
      }
    }
  }, [editingKb]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-white flex">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 border-b border-border">
          <h1 className="text-xl font-semibold">Base de Conocimientos</h1>
          <UserInfoBar email="usuario@empresa.com" />
        </header>
        <div className="flex-1 p-6 flex flex-col items-center">
          {/* Barra superior de acciones */}
          <div className="flex items-center justify-between mb-8 w-full max-w-5xl">
            <div className="flex items-center space-x-4">
              <Link href="/knowledgebase">
                <Button variant="ghost" className="justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:bg-accent py-2 inline-flex items-center gap-2 h-9 rounded-md px-3 text-gray-400 hover:text-white">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <h2 className="text-2xl font-bold">{id ? 'Editar Base de Conocimientos' : 'Crear Base de Conocimientos'}</h2>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" className="border-gray-600 text-gray-400 hover:text-white h-10 px-4 py-2">Cancelar</Button>
              <Button
                className="h-10 px-4 py-2 bg-[#5E17EB] hover:bg-[#5E17EB]/90 text-white"
                onClick={() => {
                  if (id && editingKb) {
                    updateKnowledge(editingKb.id, {
                      title: nombre,
                      description: descripcion,
                      category: producto,
                      contentType: inputType === 'upload' ? 'document' : 'text',
                    });
                  } else {
                    addKnowledge({
                      title: nombre,
                      description: descripcion,
                      category: producto,
                      tags: [],
                      active: true,
                      contentType: inputType === 'upload' ? 'document' : 'text',
                    });
                  }
                  router.push("/knowledgebase");
                }}
              >
                Guardar
              </Button>
            </div>
          </div>
          {/* Formulario de información general */}
          <form className="w-full max-w-5xl mb-8 space-y-6 bg-[#05000E] border border-[#1a1a1c] rounded-lg p-8">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#D1D5DB]">Nombre de la Base de Conocimiento</label>
              <input
                className="flex h-10 w-full rounded-md border px-3 py-2 text-base bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] focus:outline-none"
                placeholder="Ej: Preguntas Frecuentes, Manual de Ventas..."
                value={nombre}
                onChange={e => setNombre(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#D1D5DB]">Producto o Servicio</label>
              <input
                className="flex h-10 w-full rounded-md border px-3 py-2 text-base bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] focus:outline-none"
                placeholder="Ej: CRM SaaS, Consultoría, etc."
                value={producto}
                onChange={e => setProducto(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#D1D5DB]">Descripción</label>
              <textarea
                className="flex w-full rounded-md border px-3 py-2 text-base bg-[#1A1A1C] border-[#4B5563] text-white placeholder:text-[#6B7280] focus:border-[#5E17EB] focus:outline-none min-h-[100px]"
                placeholder="Describe brevemente el objetivo o alcance de esta base de conocimiento..."
                value={descripcion}
                onChange={e => setDescripcion(e.target.value)}
              />
            </div>
          </form>
          <Card className="rounded-lg border text-card-foreground shadow-sm bg-[#05000E] border-[#1a1a1c] max-w-5xl w-full">
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white">Base de conocimientos</h3>
                <p className="text-sm text-gray-400">Agrega la base de conocimientos que tendrá tu campaña</p>
              </div>
              <div role="radiogroup" aria-required="false" dir="ltr" className="grid gap-2" tabIndex={0} style={{outline: "none"}}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Opción subir archivo */}
                  <div className="flex flex-col gap-4">
                    <div
                      className="flex items-center gap-2"
                      onMouseEnter={() => setHovered('upload')}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <button
                        type="button"
                        role="radio"
                        aria-checked={inputType === "upload"}
                        data-state={inputType === "upload" ? "checked" : "unchecked"}
                        value="upload"
                        className={cn(
                          "aspect-square h-4 w-4 rounded-full border ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-[#4B5563] text-[#5E17EB] flex items-center justify-center",
                          inputType === "upload" && "border-[#5E17EB]"
                        )}
                        id="kb-upload"
                        tabIndex={-1}
                        onClick={() => setInputType("upload")}
                      >
                        {inputType === "upload" ? (
                          <span data-state="checked" className="flex items-center justify-center">
                            <Circle className="h-2.5 w-2.5 fill-current text-current" />
                          </span>
                        ) : null}
                      </button>
                      <label htmlFor="kb-upload" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-300 cursor-pointer" onClick={() => setInputType("upload")}>Subir</label>
                    </div>
                    <div
                      className={cn(
                        "rounded-lg border bg-[#0A0A0A] border-[#374151] p-6 flex flex-col items-center justify-center text-center space-y-2 cursor-pointer transition-all duration-150",
                        inputType !== "upload" && "opacity-50",
                        (inputType === "upload" || hovered === 'upload') && "hover:border-[#5E17EB] hover:bg-[#18102a] focus-within:border-[#5E17EB] focus-within:bg-[#18102a] border-[#5E17EB] bg-[#18102a]"
                      )}
                      onClick={() => {
                        if (inputType !== "upload") setInputType("upload");
                        else document.getElementById("kb-file-input")?.click();
                      }}
                      onMouseEnter={() => setHovered('upload')}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <CloudUpload className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-lg">Haz clic para subir o jalar el documento</p>
                      <p className="text-sm text-gray-400">Tamaño máximo 10&nbsp;MB</p>
                      <input
                        type="file"
                        id="kb-file-input"
                        className="hidden"
                        onChange={handleFileChange}
                        disabled={inputType !== "upload"}
                      />
                      <label htmlFor="kb-file-input" className="inline-flex items-center mt-2 gap-2 px-4 py-2 text-sm font-medium bg-[#EFEFEF] text-black rounded-md cursor-pointer">
                        Choose File
                      </label>
                      <span className="text-sm">{file ? file.name : "No file chosen"}</span>
                    </div>
                  </div>
                  {/* Opción usar texto */}
                  <div className="flex flex-col gap-4">
                    <div
                      className="flex items-center gap-2"
                      onMouseEnter={() => setHovered('text')}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <button
                        type="button"
                        role="radio"
                        aria-checked={inputType === "text"}
                        data-state={inputType === "text" ? "checked" : "unchecked"}
                        value="text"
                        className={cn(
                          "aspect-square h-4 w-4 rounded-full border ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border-[#4B5563] text-[#5E17EB] flex items-center justify-center",
                          inputType === "text" && "border-[#5E17EB]"
                        )}
                        id="kb-text"
                        tabIndex={-1}
                        onClick={() => setInputType("text")}
                      >
                        {inputType === "text" ? (
                          <span data-state="checked" className="flex items-center justify-center">
                            <Circle className="h-2.5 w-2.5 fill-current text-current" />
                          </span>
                        ) : null}
                      </button>
                      <label htmlFor="kb-text" className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-sm font-medium text-gray-300 cursor-pointer" onClick={() => setInputType("text")}>Usar texto</label>
                    </div>
                    <div
                      className={cn(
                        "rounded-lg border bg-[#0A0A0A] border-[#374151] p-4 cursor-pointer transition-all duration-150 group",
                        inputType !== "text" && "opacity-50",
                        (inputType === "text" || hovered === 'text') && "hover:border-[#5E17EB] hover:bg-[#18102a] focus-within:border-[#5E17EB] focus-within:bg-[#18102a] border-[#5E17EB] bg-[#18102a]"
                      )}
                      onClick={e => {
                        if (inputType !== "text") {
                          setInputType("text");
                          // Enfocar el textarea tras habilitarlo
                          setTimeout(() => {
                            const textarea = document.getElementById("kb-textarea");
                            if (textarea) (textarea as HTMLTextAreaElement).focus();
                          }, 0);
                        }
                      }}
                      onMouseEnter={() => setHovered('text')}
                      onMouseLeave={() => setHovered(null)}
                      tabIndex={0}
                      role="button"
                      aria-pressed={inputType === "text"}
                    >
                      <Textarea
                        id="kb-textarea"
                        className={cn(
                          "flex w-full rounded-md border-input px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm min-h-[200px] bg-transparent border-0 text-white focus-visible:ring-0 focus-visible:outline-none group-hover:cursor-pointer",
                          inputType !== "text" && "pointer-events-none"
                        )}
                        placeholder="Escribe o pega tu base de conocimientos"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        disabled={inputType !== "text"}
                        onClick={e => {
                          if (inputType !== "text") {
                            e.preventDefault();
                            setInputType("text");
                            setTimeout(() => {
                              const textarea = document.getElementById("kb-textarea");
                              if (textarea) (textarea as HTMLTextAreaElement).focus();
                            }, 0);
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          {/* Elimina la barra inferior debajo del card si existe */}
        </div>
      </div>
    </div>
  )
} 