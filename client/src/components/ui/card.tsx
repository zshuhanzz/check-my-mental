export default function Card({ className = '', children, ...props }: any) {
  return (
    <div
      className={`bg-white border border-[#EDE5FF] rounded-2xl shadow-sm p-6 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
