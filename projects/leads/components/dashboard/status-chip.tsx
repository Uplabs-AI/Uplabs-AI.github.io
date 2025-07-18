import React from 'react';
import { cn } from '@/lib/utils';

interface StatusChipProps {
  text: string;
}

const statusStyles: { [key: string]: string } = {
    "Nuevos Lead": "bg-[#252528] text-[#868686] border-[#373739]",
    "Primer Mensaje Enviado": "bg-[#282538] text-[#8781a5] border-[#3a364d]",
    "Seguimiento 1 (60 min)": "bg-[#382538] text-[#a481a5] border-[#4d364d]",
    "Seguimiento 2 (24 hrs)": "bg-[#25382c] text-[#81a58a] border-[#364d3c]",
    "Seguimiento 3 (7 días)": "bg-[#332538] text-[#9781a5] border-[#46364d]",
    "En Conversión": "bg-[#253238] text-[#8199a5] border-[#36464d]",
    "No Respondió": "bg-[#313133] text-[#939393] border-[#424244]",
    "No Interesados": "bg-[#313133] text-[#939393] border-[#424244]",
    "Interesados": "bg-[#382538] text-[#a481a5] border-[#4d364d]",
    "Ganada": "bg-[#332538] text-[#9781a5] border-[#46364d]",
    "Perdida": "bg-[#313133] text-[#939393] border-[#424244]",
};

const defaultStyle = "bg-gray-700 text-gray-300 border-gray-600";

const StatusChip: React.FC<StatusChipProps> = ({ text }) => {
  const anEnum = statusStyles[text] || defaultStyle;

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        anEnum
      )}
    >
      {text}
    </div>
  );
};

export default StatusChip; 