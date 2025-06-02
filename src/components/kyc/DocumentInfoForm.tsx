import { useState } from 'react';
import DocumentUpload from './DocumentUpload';
import { FileText, Image, CreditCard, CheckCircle, AlertTriangle, Info } from 'lucide-react';

type DocumentType = 'standard' | 'enhanced' | 'business';

interface DocumentConfig {
  name: string;
  label: string;
  icon: React.ElementType;
  accept: string;
  required: boolean;
  helpText: string;
  examples?: string[];
}

interface DocumentFormProps {
  formik: {
    values: Record<string, any>;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    setFieldValue: (field: string, value: any) => void;
    setFieldError?: (field: string, errorMsg: string) => void;
    setFieldTouched?: (field: string, touched: boolean) => void;
  };
  documentTypes?: DocumentType;
  className?: string;
}

const DocumentForm: React.FC<DocumentFormProps> = ({
  formik,
  documentTypes = 'standard',
  className = ''
}) => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const documentConfigs: Record<DocumentType, DocumentConfig[]> = {
    standard: [
      {
        name: 'idCard',
        label: 'Government-Issued ID',
        icon: CreditCard,
        accept: 'image/*,.pdf',
        required: true,
        helpText: "Driver's license, passport, or national ID card",
        examples: ['Driver\'s License', 'Passport', 'National ID', 'State ID']
      },
      {
        name: 'proofOfAddress',
        label: 'Proof of Address',
        icon: FileText,
        accept: 'image/*,.pdf',
        required: true,
        helpText: 'Utility bill, bank statement, or lease agreement (issued within last 3 months)',
        examples: ['Utility Bill', 'Bank Statement', 'Lease Agreement', 'Government Mail']
      },
      {
        name: 'selfie',
        label: 'Selfie Photo',
        icon: Image,
        accept: 'image/*',
        required: true,
        helpText: 'Clear photo of yourself holding your ID document',
        examples: ['Hold ID next to face', 'Good lighting', 'Clear visibility']
      }
    ],
    enhanced: [
      {
        name: 'idCard',
        label: 'Government-Issued ID (Front)',
        icon: CreditCard,
        accept: 'image/*,.pdf',
        required: true,
        helpText: 'Front side of your government ID'
      },
      {
        name: 'idCardBack',
        label: 'Government-Issued ID (Back)',
        icon: CreditCard,
        accept: 'image/*,.pdf',
        required: true,
        helpText: 'Back side of your government ID'
      },
      {
        name: 'proofOfAddress',
        label: 'Proof of Address',
        icon: FileText,
        accept: 'image/*,.pdf',
        required: true,
        helpText: 'Recent utility bill or bank statement'
      },
      {
        name: 'proofOfIncome',
        label: 'Proof of Income',
        icon: FileText,
        accept: 'image/*,.pdf',
        required: true,
        helpText: 'Pay stub, tax return, or employment letter'
      },
      {
        name: 'selfie',
        label: 'Selfie with ID',
        icon: Image,
        accept: 'image/*',
        required: true,
        helpText: 'Photo of yourself holding your ID'
      },
      {
        name: 'additionalDocs',
        label: 'Additional Documents',
        icon: FileText,
        accept: 'image/*,.pdf',
        required: false,
        helpText: 'Any additional supporting documents'
      }
    ],
    business: [
      {
        name: 'businessRegistration',
        label: 'Business Registration Certificate',
        icon: FileText,
        accept: 'image/*,.pdf',
        required: true,
        helpText: 'Official business registration or incorporation documents'
      },
      {
        name: 'businessLicense',
        label: 'Business License',
        icon: FileText,
        accept: 'image/*,.pdf',
        required: true,
        helpText: 'Current business operating license'
      },
      {
        name: 'taxCertificate',
        label: 'Tax Registration Certificate',
        icon: FileText,
        accept: 'image/*,.pdf',
        required: true,
        helpText: 'Tax ID or EIN registration certificate'
      },
      {
        name: 'ownershipProof',
        label: 'Proof of Ownership',
        icon: FileText,
        accept: 'image/*,.pdf',
        required: true,
        helpText: 'Shareholder certificate or ownership documentation'
      },
      {
        name: 'financialStatements',
        label: 'Financial Statements',
        icon: FileText,
        accept: 'image/*,.pdf',
        required: false,
        helpText: 'Recent financial statements or bank statements'
      }
    ]
  };

  const currentDocuments = documentConfigs[documentTypes] || documentConfigs.standard;

  const getUploadedCount = () =>
    currentDocuments.filter(doc => formik.values[doc.name]).length;

  const getRequiredCount = () =>
    currentDocuments.filter(doc => doc.required).length;

  const getCompletionPercentage = () => {
    const uploaded = getUploadedCount();
    const total = currentDocuments.length;
    return total > 0 ? Math.round((uploaded / total) * 100) : 0;
  };

  const handleFileSelect = (docName: string, file: any) => {
    setUploadProgress(prev => ({ ...prev, [docName]: 100 }));
  };

  const handleFileRemove = (docName: string) => {
    setUploadProgress(prev => ({ ...prev, [docName]: 0 }));
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Progress Header */}
      <div className="bg-blue-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">Document Upload</h3>
          <span className="text-sm font-medium text-blue-700">
            {getUploadedCount()} of {currentDocuments.length} uploaded
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
            style={{ width: `${getCompletionPercentage()}%` }}
          ></div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1 text-green-700">
            <CheckCircle size={14} />
            <span>{getUploadedCount()} completed</span>
          </div>
          <div className="flex items-center gap-1 text-amber-700">
            <AlertTriangle size={14} />
            <span>
              {
                getRequiredCount() -
                currentDocuments.filter(doc => doc.required && formik.values[doc.name]).length
              } required remaining
            </span>
          </div>
        </div>
      </div>

      {/* Document Upload Guidelines */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
        <h4 className="font-medium text-amber-800 mb-2 flex items-center gap-2">
          <Info size={16} />
          Document Guidelines
        </h4>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Ensure all documents are clear and readable</li>
          <li>• File size should not exceed 10MB per document</li>
          <li>• Accepted formats: JPG, PNG, PDF</li>
          <li>• Documents should be recent (within 3 months for proof of address)</li>
          <li>• Ensure all corners and edges are visible</li>
        </ul>
      </div>

      {/* Document Upload Sections */}
      <div className="space-y-6">
        {currentDocuments.map((doc) => {
          const Icon = doc.icon;
          const isUploaded = formik.values[doc.name];

          return (
            <div key={doc.name} className="space-y-3">
              {/* Document Header */}
              <div className="flex items-center gap-3">
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    ${isUploaded ? 'bg-green-100' : doc.required ? 'bg-blue-100' : 'bg-gray-100'}
                  `}
                >
                  {isUploaded ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <Icon size={16} className={doc.required ? 'text-blue-600' : 'text-gray-600'} />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {doc.label}
                    {doc.required && <span className="text-red-500 ml-1">*</span>}
                  </h4>
                  {doc.examples && (
                    <p className="text-xs text-gray-500">
                      Examples: {doc.examples.join(', ')}
                    </p>
                  )}
                </div>
              </div>

              {/* Document Upload Component */}
              <DocumentUpload
                name={doc.name}
                formik={formik}
                accept={doc.accept}
                required={doc.required}
                helpText={doc.helpText}
                onFileSelect={(file) => handleFileSelect(doc.name, file)}
                onFileRemove={() => handleFileRemove(doc.name)}
                className="ml-11"
              />
            </div>
          );
        })}
      </div>

      {/* Additional Instructions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Additional Instructions</h4>
        <div className="text-sm text-gray-600 space-y-2">
          {documentTypes === 'standard' && (
            <>
              <p><strong>For ID Documents:</strong> Ensure the photo, name, date of birth, and expiration date are clearly visible.</p>
              <p><strong>For Proof of Address:</strong> Document must show your full name and current address, and be dated within the last 3 months.</p>
              <p><strong>For Selfie:</strong> Hold your ID next to your face with both clearly visible. Ensure good lighting and avoid shadows.</p>
            </>
          )}

          {documentTypes === 'enhanced' && (
            <>
              <p><strong>ID Verification:</strong> Upload both front and back sides of your government-issued ID.</p>
              <p><strong>Income Verification:</strong> Provide recent pay stubs, tax returns, or official employment letters.</p>
              <p><strong>Enhanced Security:</strong> Additional documents may be requested for verification purposes.</p>
            </>
          )}

          {documentTypes === 'business' && (
            <>
              <p><strong>Business Registration:</strong> Provide official documents proving your business is legally registered.</p>
              <p><strong>Ownership Documentation:</strong> Include proof of your ownership stake in the business.</p>
              <p><strong>Financial Records:</strong> Recent financial statements help verify business legitimacy.</p>
            </>
          )}
        </div>
      </div>

      {/* Completion Status */}
      {getUploadedCount() === currentDocuments.length && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 text-green-800">
            <CheckCircle size={20} />
            <span className="font-medium">All documents uploaded successfully!</span>
          </div>
          <p className="text-sm text-green-700 mt-1">
            You can now proceed to the next step. Our team will review your documents within 2-3 business days.
          </p>
        </div>
      )}
    </div>
  );
};


// Simplified Document Form
export const SimpleDocumentForm = ({ formik, className = '' } : { formik: any, className?: string }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <DocumentUpload
        label="Government ID"
        name="idCard"
        formik={formik}
        required
        helpText="Driver's license, passport, or national ID"
      />
      
      <DocumentUpload
        label="Proof of Address"
        name="proofOfAddress"
        formik={formik}
        required
        helpText="Utility bill or bank statement (within 3 months)"
      />
      
      <DocumentUpload
        label="Selfie Photo"
        name="selfie"
        formik={formik}
        accept="image/*"
        required
        helpText="Photo of yourself holding your ID"
      />
    </div>
  );
};


export default DocumentForm;