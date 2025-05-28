import { UploadIcon, X } from 'lucide-react';

interface UploadProps {
  label: string;    
  accept?: string;
  multiple?: boolean;
  onUpload: (files: FileList | null) => void;
  files?: File[];
  onRemove: (index: number) => void;
};

const FileUploadArea  = ({ label, accept, multiple = false, onUpload, files = [], onRemove }: UploadProps) => (
  <div className="space-y-3">
    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
      <UploadIcon className="mx-auto h-8 w-8 text-gray-400 mb-2" />
      <label className="cursor-pointer">
        <span className="text-sm text-gray-600">Click to upload {label.toLowerCase()}</span>
        <input
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={(e) => onUpload(e.target.files)}
        />
      </label>
    </div>
    
    {files && files.length > 0 && (
      <div className="space-y-2">
        {files.map((file, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
            <span className="text-sm text-gray-700 truncate">{file.name}</span>
            <button
              onClick={() => onRemove(index)}
              className="text-red-500 hover:text-red-700 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default FileUploadArea 