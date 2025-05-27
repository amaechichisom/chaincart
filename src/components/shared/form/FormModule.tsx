

const FormModule = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return(
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden mb-6">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {children}
        </div>
      </div>
    </div>
  )
};


export default FormModule