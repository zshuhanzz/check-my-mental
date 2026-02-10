import { useEffect } from 'react';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export interface ToastData {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}

export default function ToastContainer({ toasts, onDismiss }: any) {
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3">
      {toasts.map((toast: any) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }: any) {
  useEffect(() => {
    const timer = setTimeout(() => onDismiss(toast.id), 5000);
    return () => clearTimeout(timer);
  }, [toast.id]);

  let Icon = Info;
  let bg = '#e0f2fe';
  let border = '#7dd3fc';
  let color = '#0ea5e9';

  if (toast.type === 'success') {
    Icon = CheckCircle;
    bg = '#dcfce7';
    border = '#86efac';
    color = '#22c55e';
  } else if (toast.type === 'error') {
    Icon = AlertTriangle;
    bg = '#ffe4e6';
    border = '#fda4af';
    color = '#f43f5e';
  }

  return (
    <div
      style={{ backgroundColor: bg, borderColor: border, color: color }}
      className="flex items-center gap-3 px-4 py-3 border rounded-xl shadow-md min-w-[300px] max-w-md"
    >
      <Icon size={18} />
      <p className="flex-1 text-sm" style={{ color: '#374151' }}>{toast.message}</p>
      <button onClick={() => onDismiss(toast.id)} className="p-1 rounded-full hover:bg-white/50">
        <X size={14} />
      </button>
    </div>
  );
}
