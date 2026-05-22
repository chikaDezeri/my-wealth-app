import { Shield } from "lucide-react";

interface QCStampProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export function QCStamp({ size = 'md', showText = true }: QCStampProps) {
  const sizes = {
    sm: { box: 'w-6 h-6', text: 'text-xs', badge: 'text-[10px]' },
    md: { box: 'w-8 h-8', text: 'text-sm', badge: 'text-xs' },
    lg: { box: 'w-10 h-10', text: 'text-base', badge: 'text-sm' },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2">
      <div className={`${s.box} bg-amber-500 rounded flex items-center justify-center`}>
        <span className={`text-slate-950 font-bold ${s.text}`}>QC</span>
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`text-white font-semibold ${s.text}`}>Quiet Capital</span>
          <span className={`text-slate-500 ${s.badge}`}>Wealth Architecture</span>
        </div>
      )}
    </div>
  );
}

export function QCWatermark() {
  return (
    <div className="fixed bottom-4 right-4 opacity-20 pointer-events-none select-none">
      <div className="flex items-center gap-2 bg-slate-800 border border-slate-700 px-3 py-2 rounded-lg">
        <div className="w-6 h-6 bg-amber-500 rounded flex items-center justify-center">
          <span className="text-slate-950 font-bold text-xs">QC</span>
        </div>
        <span className="text-slate-400 text-xs font-medium">Quiet Capital</span>
      </div>
    </div>
  );
}