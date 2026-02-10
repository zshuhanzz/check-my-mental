import { ButtonHTMLAttributes } from 'react';

// simple button component
export default function Button({
  variant = 'primary',
  loading,
  disabled,
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  loading?: boolean;
}) {
  let styles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-5 py-2.5 text-sm transition-colors disabled:opacity-50 ';

  if (variant === 'primary') {
    styles += 'bg-[#7E57C2] text-white hover:bg-[#6A3FB5] ';
  } else if (variant === 'secondary') {
    styles += 'bg-[#F5F0FF] text-[#7E57C2] border border-[#D4C4F5] hover:bg-[#EDE5FF] ';
  } else if (variant === 'ghost') {
    styles += 'text-gray-600 hover:bg-[#F5F0FF] hover:text-[#7E57C2] ';
  } else if (variant === 'danger') {
    styles += 'bg-red-100 text-red-400 hover:bg-red-200 ';
  }

  return (
    <button
      disabled={disabled || loading}
      className={styles + className}
      {...props}
    >
      {loading && <span className="animate-spin">⏳</span>}
      {children}
    </button>
  );
}
