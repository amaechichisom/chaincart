
function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
   <>
    <div className="flex items-start pt-2">
      <label className="text-sm font-medium text-gray-700">
        {label}
      </label>
    </div>
    <div>
      {children}
    </div>
  </>
  )
}

export default FormField