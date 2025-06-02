import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { Upload, CheckCircle, X, FileText, Image, AlertCircle, Download, Eye } from 'lucide-react';

interface FileData {
  name: string;
  size: number;
  type: string;
  lastModified: number;
  uploadDate: string;
  url: string;
}

interface FormikLike {
  values: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  setFieldValue: (field: string, value: any) => void;
  setFieldError?: (field: string, errorMsg: string) => void;
  setFieldTouched?: (field: string, touched: boolean) => void;
}

interface DocumentUploadProps {
  label?: string;
  name: string;
  formik: FormikLike;
  accept?: string;
  maxSize?: number;
  multiple?: boolean;
  required?: boolean;
  helpText?: string;
  previewEnabled?: boolean;
  allowReplace?: boolean;
  allowRemove?: boolean;
  onFileSelect?: (file: FileData) => void;
  onFileRemove?: (name: string) => void;
  className?: string;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({
  label,
  name,
  formik,
  accept = "image/*,.pdf",
  maxSize = 10 * 1024 * 1024,
  multiple = false,
  required = false,
  helpText,
  previewEnabled = true,
  allowReplace = true,
  allowRemove = true,
  onFileSelect,
  onFileRemove,
  className = ''
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const hasError = formik.touched[name] && formik.errors[name];
  const uploadedFile: FileData | null = formik.values[name];
  const hasFile = uploadedFile !== null && uploadedFile !== undefined;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (file: FileData | null) => {
    if (!file) return FileText;
    if (file.type?.startsWith('image/')) {
      return Image;
    } else if (file.type === 'application/pdf') {
      return FileText;
    }
    return FileText;
  };

  const validateFile = (file: File) => {
    const errors: string[] = [];
    if (file.size > maxSize) {
      errors.push(`File size must be less than ${formatFileSize(maxSize)}`);
    }
    const allowedTypes = accept.split(',').map(type => type.trim());
    const isValidType = allowedTypes.some(type => {
      if (type.endsWith('/*')) {
        return file.type.startsWith(type.replace('/*', ''));
      }
      return file.type === type || file.name.toLowerCase().endsWith(type.replace('.', ''));
    });
    if (!isValidType) {
      errors.push(`File type not supported. Allowed: ${accept}`);
    }
    return errors;
  };

  const handleFileUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    const validationErrors = validateFile(file);
    if (validationErrors.length > 0) {
      if (formik.setFieldError) formik.setFieldError(name, validationErrors[0]);
      return;
    }
    setIsUploading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const fileData: FileData = {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: file.lastModified,
        uploadDate: new Date().toISOString(),
        url: URL.createObjectURL(file)
      };
      formik.setFieldValue(name, fileData);
      if (formik.setFieldTouched) formik.setFieldTouched(name, true);
      if (onFileSelect) {
        onFileSelect(fileData);
      }
    } catch (error) {
      if (formik.setFieldError) formik.setFieldError(name, 'Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemove = () => {
    formik.setFieldValue(name, null);
    if (onFileRemove) {
      onFileRemove(name);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    handleFileUpload(files);
  };

  const handlePreview = () => {
    if (uploadedFile && uploadedFile.url) {
      window.open(uploadedFile.url, '_blank');
    }
  };

  const handleDownload = () => {
    if (uploadedFile) {
      const link = document.createElement('a');
      link.href = uploadedFile.url || '#';
      link.download = uploadedFile.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const FileIcon = getFileIcon(uploadedFile);

  return (
    <div className={`space-y-2 ${className}`}>
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      {/* Help Text */}
      {helpText && (
        <p className="text-xs text-gray-600">{helpText}</p>
      )}

      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg transition-all duration-200 cursor-pointer
          ${isDragOver ? 'border-blue-400 bg-blue-50' : ''}
          ${hasError ? 'border-red-300 bg-red-50' : hasFile ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-gray-400'}
          ${isUploading ? 'pointer-events-none' : ''}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={!hasFile ? handleClick : undefined}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          className="hidden"
          aria-describedby={hasError ? `${name}-error` : undefined}
        />

        {!hasFile ? (
          /* Upload State */
          <div className="p-6 text-center">
            <div className="flex flex-col items-center">
              {isUploading ? (
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mb-2"></div>
              ) : (
                <Upload className={`w-8 h-8 mb-2 ${isDragOver ? 'text-blue-600' : 'text-gray-400'}`} />
              )}
              <p className="text-sm font-medium text-gray-900 mb-1">
                {isUploading ? 'Uploading...' : label || 'Upload Document'}
              </p>
              <p className="text-xs text-gray-500 mb-3">
                {isDragOver ? 'Drop your file here' : `Drag & drop or click to browse`}
              </p>
              <p className="text-xs text-gray-400">
                {accept.replace(/,/g, ', ')} • Max {formatFileSize(maxSize)}
              </p>
            </div>
          </div>
        ) : (
          /* File Uploaded State */
          <div className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-white rounded-lg border flex items-center justify-center">
                  <FileIcon className="w-5 h-5 text-gray-600" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {uploadedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(uploadedFile.size)} • Uploaded {new Date(uploadedFile.uploadDate).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {previewEnabled && uploadedFile.type?.startsWith('image/') && (
                  <button
                    type="button"
                    onClick={handlePreview}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Preview"
                  >
                    <Eye size={16} />
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleDownload}
                  className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                  title="Download"
                >
                  <Download size={16} />
                </button>

                {allowRemove && (
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Remove"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>

            {allowReplace && (
              <div className="mt-3 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleClick}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  Replace file
                </button>
              </div>
            )}
          </div>
        )}

        {/* Success Indicator */}
        {hasFile && !hasError && (
          <div className="absolute top-2 right-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
        )}
      </div>

      {/* Error Message */}
      {hasError && (
        <div className="flex items-start gap-1 text-sm text-red-600">
          <AlertCircle size={14} className="mt-0.5 flex-shrink-0" />
          <span>{formik.errors[name]}</span>
        </div>
      )}
    </div>
  );
};

// Multiple File Upload Component
interface MultipleDocumentUploadProps extends Omit<DocumentUploadProps, 'name' | 'formik'> {
  label: string;
  name: string;
  formik: FormikLike;
  maxFiles?: number;
}

export const MultipleDocumentUpload: React.FC<MultipleDocumentUploadProps> = ({
  label,
  name,
  formik,
  maxFiles = 5,
  ...props
}) => {
  const files: File[] = formik.values[name] || [];

  const handleFileAdd = (file: File) => {
    if (files.length < maxFiles) {
      const newFiles = [...files, file];
      formik.setFieldValue(name, newFiles);
    }
  };

  const handleFileRemove = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index);
    formik.setFieldValue(name, newFiles);
  };

  return (
    <div className="space-y-4">
      <DocumentUpload
        {...props}
        label={`${label} (${files.length}/${maxFiles})`}
        name={`${name}_upload`}
        formik={{
          ...formik,
          values: { [`${name}_upload`]: null },
          setFieldValue: (_fieldName: string, value: File) => {
            if (value) handleFileAdd(value);
          }
        }}
      />

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Uploaded Files:</h4>
          {files.map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
              <span className="text-sm text-gray-700 truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => handleFileRemove(index)}
                className="text-red-600 hover:text-red-800"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentUpload;