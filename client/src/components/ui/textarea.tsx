export default function Textarea({ label, error, className, ...props }: any) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium" style={{ color: '#374151' }}>
          {label}
        </label>
      )}
      <textarea
        className={`w-full px-4 py-3 bg-white border rounded-xl text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 resize-none ${error ? 'border-red-400 focus:ring-red-300' : ''} ${className || ''}`}
        style={{ borderColor: error ? undefined : '#E0D4F5', focusRingColor: '#C5B3E6' }}
        {...props}
      />
      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}
    </div>
  );
}
