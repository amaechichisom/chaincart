import React, { useState } from 'react';
import AppButton from "@/components/shared/AppButton";
import { cn } from "@/lib/utils";
import { 
  FileText, 
  Upload, 
  CheckCircle, 
  Clock, 
  XCircle, 
  AlertTriangle,
  Shield,
  X
} from 'lucide-react';

// Status Badge Component
const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const statusConfig = {
    VERIFIED: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      border: 'border-green-200',
      icon: CheckCircle,
      label: 'Verified'
    },
    PENDING: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      border: 'border-yellow-200',
      icon: Clock,
      label: 'Pending'
    },
    REJECTED: {
      bg: 'bg-red-100',
      text: 'text-red-800',
      border: 'border-red-200',
      icon: XCircle,
      label: 'Rejected'
    },
    default: {
      bg: 'bg-gray-100',
      text: 'text-gray-800',
      border: 'border-gray-200',
      icon: AlertTriangle,
      label: 'Not Submitted'
    }
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.default;
  const Icon = config.icon;

  return (
    <div className={cn(
      "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border",
      config.bg,
      config.text,
      config.border
    )}>
      <Icon size={14} />
      {config.label}
    </div>
  );
};

// Document Type Selector Component
interface DocumentTypeSelectorProps {
  value: string;
  onChange: (e: React.ChangeEvent<{ id: string; value: string }>) => void;
  error?: string;
}
const DocumentTypeSelector: React.FC<DocumentTypeSelectorProps> = ({ value, onChange, error }) => {
  const documentTypes = [
    { value: 'passport', label: 'Passport', icon: '🛂' },
    { value: 'drivers_license', label: 'Driver\'s License', icon: '🪪' },
    { value: 'national_id', label: 'National ID Card', icon: '🆔' },
    { value: 'voter_id', label: 'Voter ID', icon: '🗳️' }
  ];

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        Document Type <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 gap-3">
        {documentTypes.map((type) => (
          <button
            key={type.value}
            type="button"
            onClick={() => onChange({ target: { id: 'documentType', value: type.value } } as any)}
            className={cn(
              "p-3 border-2 rounded-lg text-left transition-all duration-200 hover:shadow-md",
              value === type.value
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 hover:border-gray-300"
            )}
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{type.icon}</span>
              <span className="text-sm font-medium">{type.label}</span>
            </div>
          </button>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertTriangle size={14} />
          {error}
        </p>
      )}
    </div>
  );
};

// File Upload Component
interface FileUploadProps {
  file?: File | null;
  onChange: (e: React.ChangeEvent<{ id: string; files: File[] }>) => void;
  error?: string;
}
const FileUpload: React.FC<FileUploadProps> = ({ file, onChange, error }) => {
  const [dragOver, setDragOver] = useState(false);
  const [preview, setPreview] = useState<{ name: string; size: string } | null>(null);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === 'application/pdf') {
      handleFileChange(droppedFile);
    }
  };

  const handleFileChange = (selectedFile: File) => {
    onChange({
      target: {
        id: 'kycDocuments',
        files: [selectedFile]
      }
    } as any);

    if (selectedFile) {
      setPreview({
        name: selectedFile.name,
        size: (selectedFile.size / 1024 / 1024).toFixed(2)
      });
    }
  };

  const removeFile = () => {
    onChange({
      target: {
        id: 'kycDocuments',
        files: []
      }
    } as any);
    setPreview(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-gray-700">
        Upload Document <span className="text-red-500">*</span>
      </label>
      <p className="text-xs text-gray-500 mb-3">
        Upload a clear, high-quality PDF of your selected document. Max file size: 10MB
      </p>
      
      {!file && !preview ? (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setDragOver(true);
          }}
          onDragLeave={() => setDragOver(false)}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer",
            dragOver
              ? "border-blue-400 bg-blue-50"
              : error
              ? "border-red-300 bg-red-50"
              : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
          )}
          onClick={() => {
            const input = document.getElementById('kycDocuments') as HTMLInputElement | null;
            if (input) input.click();
          }}
        >
          <Upload className={cn(
            "mx-auto mb-4",
            dragOver ? "text-blue-500" : "text-gray-400"
          )} size={32} />
          <p className="text-sm font-medium text-gray-700 mb-2">
            {dragOver ? 'Drop your file here' : 'Click to upload or drag and drop'}
          </p>
          <p className="text-xs text-gray-500">
            PDF files only • Maximum 10MB
          </p>
          <input
            type="file"
            id="kycDocuments"
            accept="application/pdf"
            onChange={(e) => handleFileChange(e.target.files?.[0] as File)}
            className="hidden"
          />
        </div>
      ) : (
        <div className="border border-green-200 bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded border flex items-center justify-center">
                <FileText className="text-red-600" size={20} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {preview?.name || file?.name || 'Document.pdf'}
                </p>
                <p className="text-xs text-gray-500">
                  {preview?.size ? `${preview.size} MB` : formatFileSize(file?.size || 0)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={removeFile}
                className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                title="Remove file"
              >
                <X size={16} />
              </button>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-green-200">
            <button
              type="button"
              onClick={() => {
                const input = document.getElementById('kycDocuments') as HTMLInputElement | null;
                if (input) input.click();
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium"
            >
              Replace file
            </button>
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <AlertTriangle size={14} />
          {error}
        </p>
      )}
    </div>
  );
};

// Status Message Component
const StatusMessage: React.FC<{ status: string }> = ({ status }) => {
  const messages = {
    VERIFIED: {
      icon: CheckCircle,
      title: "KYC Verification Complete",
      message: "Your identity has been successfully verified. You now have full access to all features.",
      color: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200"
    },
    PENDING: {
      icon: Clock,
      title: "Verification In Progress",
      message: "Your documents are being reviewed. This usually takes 1-3 business days. We'll notify you once complete.",
      color: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200"
    },
    REJECTED: {
      icon: XCircle,
      title: "Verification Unsuccessful",
      message: "Your KYC submission was rejected. Please review the requirements and submit again with valid documents.",
      color: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200"
    }
  };

  const config = messages[status as keyof typeof messages];
  if (!config) return null;

  const Icon = config.icon;

  return (
    <div className={cn("p-6 rounded-lg border-2", config.bg, config.border)}>
      <div className="flex items-start space-x-4">
        <div className={cn("p-2 rounded-full", config.bg)}>
          <Icon className={config.color} size={24} />
        </div>
        <div className="flex-1">
          <h4 className={cn("font-semibold mb-1", config.color)}>
            {config.title}
          </h4>
          <p className="text-sm text-gray-600">
            {config.message}
          </p>
          {status === "REJECTED" && (
            <button
              type="button"
              className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              View rejection details →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Main KYC Form Component
interface KycFormProps {
  data: any;
  kycForm: {
    documentType?: string;
    kycDocuments?: File[];
  };
  handleKYCChange: (e: React.ChangeEvent<{ id: string; value?: string; files?: File[] }>) => void;
  handleKYCSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

export const KycForm: React.FC<KycFormProps> = ({ data, kycForm, handleKYCChange, handleKYCSubmit, isLoading }) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    
    if (!kycForm.documentType) {
      newErrors.documentType = 'Please select a document type';
    }
    
    if (!kycForm.kycDocuments || kycForm.kycDocuments.length === 0) {
      newErrors.kycDocuments = 'Please upload a document';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      handleKYCSubmit(e);
    }
  };

  const currentStatus = data?.kyc?.status;
  const isCompleted = ["VERIFIED", "PENDING"].includes(currentStatus);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Header Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Shield className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">KYC Verification</h3>
                {/* <p className="text-sm text-gray-600">Verify your identity to unlock all features</p> */}
              </div>
            </div>
            {currentStatus && <StatusBadge status={currentStatus} />}
          </div>
        </div>

        <div className="p-6">
          {isCompleted ? (
            <StatusMessage status={currentStatus} />
          ) : (
            <div className="space-y-6">
              {/* Info Banner */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="text-blue-600 flex-shrink-0 mt-0.5" size={16} />
                  <div className="text-sm">
                    <p className="font-medium text-blue-800 mb-1">Required for Account Verification</p>
                    <p className="text-blue-700">
                      Please upload a clear, high-quality document. Ensure all text is readable and the document is not expired.
                    </p>
                  </div>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <DocumentTypeSelector
                  value={kycForm.documentType || ''}
                  onChange={handleKYCChange}
                  error={errors.documentType}
                />

                <FileUpload
                  file={kycForm.kycDocuments?.[0]}
                  onChange={handleKYCChange}
                  error={errors.kycDocuments}
                />

                {/* Security Notice */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Shield className="text-gray-500 flex-shrink-0 mt-0.5" size={16} />
                    <div className="text-sm text-gray-600">
                      <p className="font-medium mb-1">Your Privacy is Protected</p>
                      <p>All documents are encrypted and stored securely. We only use this information for identity verification purposes.</p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <AppButton 
                    label={isLoading ? "Submitting..." : "Submit KYC Verification"} 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Terms Notice */}
                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our{' '}
                  <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
                  and{' '}
                  <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                </p>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};