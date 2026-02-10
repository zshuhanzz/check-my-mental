export default function Badge({ variant, children, className }: any) {
  let bg = '#F5F0FF';
  let color = '#7E57C2';

  if (variant === 'positive') {
    bg = '#dcfce7';
    color = '#22c55e';
  } else if (variant === 'negative') {
    bg = '#ffe4e6';
    color = '#f43f5e';
  } else if (variant === 'neutral') {
    bg = '#f3f4f6';
    color = '#6b7280';
  } else if (variant === 'warning') {
    bg = '#fef3c7';
    color = '#f59e0b';
  }

  return (
    <span
      style={{ backgroundColor: bg, color: color }}
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full ${className || ''}`}
    >
      {children}
    </span>
  );
}
