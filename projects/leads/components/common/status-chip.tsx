import React from 'react';
import { cn } from "@/lib/utils";

interface StatusChipProps {
  status: string;
  className?: string;
}

const statusStyles: { [key: string]: string } = {
  'Nuevos Leads': 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  'Primer Mensaje Enviado': 'bg-[#aa89fa]/10 text-[#aa89fa] border-[#aa89fa]/20',
  'Seguimiento 1 (60min)': 'bg-[#89fac8]/10 text-[#89fac8] border-[#89fac8]/20',
  'Seguimiento 2 (24hrs)': 'bg-[#89fab7]/10 text-[#89fab7] border-[#89fab7]/20',
  'Seguimiento 3 (7dias)': 'bg-[#89faa0]/10 text-[#89faa0] border-[#89faa0]/20',
  'En conversación': 'bg-[#6ab7ff]/10 text-[#6ab7ff] border-[#6ab7ff]/20',
  'Interesados': 'bg-amber-400/10 text-amber-400 border-amber-400/20',
  'No interesados': 'bg-gray-400/10 text-gray-400 border-gray-400/20',
  'Ganada': 'bg-[#a370ff]/10 text-[#a370ff] border-[#a370ff]/20',
  'Perdida': 'bg-red-500/10 text-red-500 border-red-500/20',
  'Abandonada': 'bg-[#c83232]/10 text-[#c83232] border-[#c83232]/20',
  'Mensaje': 'bg-[#d782ff]/10 text-[#d782ff] border-[#d782ff]/20',
  'Llamada': 'bg-green-500/10 text-green-500 border-green-500/20',
  'Realizado': 'bg-[#1c3c29] text-[#22c55e] border-[#22c55e33]',
  'Pendiente': 'bg-[#261d2a] text-[#d782ff] border-[#d782ff33]',
  'Seguimiento 2': 'bg-[#89fab7]/10 text-[#89fab7] border-[#89fab7]/20',
  'default': 'bg-gray-400/10 text-gray-400 border-gray-400/20'
};

export const StatusChip: React.FC<StatusChipProps> = ({ status, className }) => {
  const styleClass = statusStyles[status] || statusStyles.default;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        styleClass,
        className
      )}
    >
      {status}
    </div>
  );
}; 