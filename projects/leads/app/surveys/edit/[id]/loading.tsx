export default function Loading() {
  return (
    <div className="flex h-screen bg-[#121212]">
      <div className="w-64 hidden md:block bg-[#0A0A0A] border-r border-[#262626]">{/* Sidebar placeholder */}</div>
      <div className="flex-1 flex items-center justify-center">
        <div className="text-white text-lg">Cargando encuesta...</div>
      </div>
    </div>
  )
}
