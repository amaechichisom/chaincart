import React, { useState } from 'react';
import { CheckCircle, User, FileText, Camera, ArrowRight, ArrowLeft, Send } from 'lucide-react';

import { personalInfoValidation, documentValidation } from './ValidationSchemas';
import ApprovalModal from './ApprovalModal';
import RejectionModal from './RejectModal';
import StatusBadge from './StatusBadge';
import PersonalInfoForm, { QuickPersonalInfoForm, BusinessInfoForm } from './PersonalInfoForm';
import DocumentForm, { SimpleDocumentForm } from './DocumentInfoForm';
import { useFormik } from '@/hooks/useFormik';

interface KYCComponentProps {
  variant?: 'standard' | 'quick' | 'enhanced' | 'business';
  onComplete?: (result: any) => void;
  onStepChange?: (step: number, stepConfig: any) => void;
  initialData?: Record<string, any>;
  className?: string;
}

const KYCComponent: React.FC<KYCComponentProps> = ({
  variant = 'standard',
  onComplete,
  onStepChange,
  initialData = {},
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [kycStatus, setKycStatus] = useState<string>('pending');
  const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);
  const [showRejectionModal, setShowRejectionModal] = useState<boolean>(false);
  const [kycData, setKycData] = useState<Record<string, any>>(initialData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const stepConfigs: Record<string, Array<{ title: string; icon: React.ElementType; component: string }>> = {
    standard: [
      { title: 'Personal Information', icon: User, component: 'personal' },
      { title: 'Document Upload', icon: FileText, component: 'documents' },
      { title: 'Review & Submit', icon: Camera, component: 'review' }
    ],
    quick: [
      { title: 'Basic Info', icon: User, component: 'quick-personal' },
      { title: 'Documents', icon: FileText, component: 'simple-documents' },
      { title: 'Submit', icon: Send, component: 'review' }
    ],
    enhanced: [
      { title: 'Personal Details', icon: User, component: 'personal' },
      { title: 'Enhanced Documents', icon: FileText, component: 'enhanced-documents' },
      { title: 'Additional Verification', icon: Camera, component: 'additional' },
      { title: 'Review & Submit', icon: CheckCircle, component: 'review' }
    ],
    business: [
      { title: 'Personal Information', icon: User, component: 'personal' },
      { title: 'Business Information', icon: FileText, component: 'business' },
      { title: 'Business Documents', icon: FileText, component: 'business-documents' },
      { title: 'Review & Submit', icon: CheckCircle, component: 'review' }
    ]
  };

  const steps = stepConfigs[variant] || stepConfigs.standard;

  const rejectionReasons: string[] = [
    'Identity document is blurry or unreadable',
    'Address proof is older than 3 months',
    'Selfie does not match the ID photo',
    'Missing required information in forms'
  ];

  // Personal Info Formik
  const personalInfoFormik = useFormik({
    initialValues: {
      firstName: initialData.firstName || '',
      lastName: initialData.lastName || '',
      middleName: initialData.middleName || '',
      dateOfBirth: initialData.dateOfBirth || '',
      phone: initialData.phone || '',
      email: initialData.email || '',
      address: initialData.address || '',
      city: initialData.city || '',
      state: initialData.state || '',
      zipCode: initialData.zipCode || '',
      country: initialData.country || 'United States',
      ...initialData
    },
    validate: personalInfoValidation,
    onSubmit: (values: Record<string, any>) => {
      setKycData(prev => ({ ...prev, ...values }));
      handleNextStep();
    }
  });

  // Business Info Formik
  const businessInfoFormik = useFormik({
    initialValues: {
      businessName: initialData.businessName || '',
      businessRegNumber: initialData.businessRegNumber || '',
      taxId: initialData.taxId || '',
      businessType: initialData.businessType || '',
      businessAddress: initialData.businessAddress || '',
      industry: initialData.industry || '',
      annualRevenue: initialData.annualRevenue || '',
      ...initialData
    },
    validate: (values: Record<string, any>) => {
      const errors: Record<string, string> = {};
      if (!values.businessName) errors.businessName = 'Business name is required';
      if (!values.businessRegNumber) errors.businessRegNumber = 'Registration number is required';
      if (!values.taxId) errors.taxId = 'Tax ID is required';
      return errors;
    },
    onSubmit: (values: Record<string, any>) => {
      setKycData(prev => ({ ...prev, ...values }));
      handleNextStep();
    }
  });

  // Document Formik
  const documentFormik = useFormik({
    initialValues: {
      idCard: initialData.idCard || null,
      idCardBack: initialData.idCardBack || null,
      proofOfAddress: initialData.proofOfAddress || null,
      proofOfIncome: initialData.proofOfIncome || null,
      selfie: initialData.selfie || null,
      businessRegistration: initialData.businessRegistration || null,
      businessLicense: initialData.businessLicense || null,
      taxCertificate: initialData.taxCertificate || null,
      ownershipProof: initialData.ownershipProof || null,
      financialStatements: initialData.financialStatements || null,
      additionalDocs: initialData.additionalDocs || null,
      ...initialData
    },
    validate: documentValidation,
    onSubmit: (values: Record<string, any>) => {
      setKycData(prev => ({ ...prev, ...values }));
      handleNextStep();
    }
  });

  // Navigation
  const handleNextStep = () => {
    const nextStep = currentStep + 1;
    if (nextStep < steps.length) {
      setCurrentStep(nextStep);
      if (onStepChange) {
        onStepChange(nextStep, steps[nextStep]);
      }
    }
  };

  const handlePreviousStep = () => {
    const prevStep = Math.max(0, currentStep - 1);
    setCurrentStep(prevStep);
    if (onStepChange) {
      onStepChange(prevStep, steps[prevStep]);
    }
  };

  // Final Submission
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setKycStatus('submitted');
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const isApproved = Math.random() > 0.3;
      if (isApproved) {
        setKycStatus('approved');
        setShowApprovalModal(true);
        if (onComplete) {
          onComplete({ status: 'approved', data: kycData });
        }
      } else {
        setKycStatus('rejected');
        setShowRejectionModal(true);
        if (onComplete) {
          onComplete({ status: 'rejected', data: kycData, reasons: rejectionReasons });
        }
      }
    } catch (error) {
      setKycStatus('pending');
      // eslint-disable-next-line no-console
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Resubmission
  const handleResubmit = () => {
    setKycStatus('pending');
    setCurrentStep(0);
    personalInfoFormik.resetForm();
    businessInfoFormik.resetForm();
    documentFormik.resetForm();
    setKycData(initialData);
  };

  // Get current formik
  const getCurrentFormik = () => {
    const currentComponent = steps[currentStep]?.component;
    switch (currentComponent) {
      case 'personal':
      case 'quick-personal':
        return personalInfoFormik;
      case 'business':
        return businessInfoFormik;
      case 'documents':
      case 'simple-documents':
      case 'enhanced-documents':
      case 'business-documents':
        return documentFormik;
      default:
        return null;
    }
  };

  // Step validation
  const isCurrentStepValid = () => {
    const formik = getCurrentFormik();
    if (!formik) return true;
    const errors = formik.validate ? formik.validate(formik?.values) : {};
    return Object.keys(errors).length === 0;
  };

  // Render step content
  const renderStepContent = () => {
    const currentComponent = steps[currentStep]?.component;
    switch (currentComponent) {
      case 'personal':
        return (
          <PersonalInfoForm
            formik={personalInfoFormik}
            showAdvancedFields={variant === 'enhanced'}
          />
        );
      case 'quick-personal':
        return <QuickPersonalInfoForm formik={personalInfoFormik} />;
      case 'business':
        return <BusinessInfoForm formik={businessInfoFormik} />;
      case 'documents':
        return <DocumentForm formik={documentFormik} documentTypes="standard" />;
      case 'simple-documents':
        return <SimpleDocumentForm formik={documentFormik} />;
      case 'enhanced-documents':
        return <DocumentForm formik={documentFormik} documentTypes="enhanced" />;
      case 'business-documents':
        return <DocumentForm formik={documentFormik} documentTypes="business" />;
      case 'additional':
        return (
          <div className="text-center space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <Camera className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Additional Verification
              </h3>
              <p className="text-gray-600">
                Enhanced verification may require additional steps based on your profile.
              </p>
            </div>
          </div>
        );
      case 'review':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <CheckCircle className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2 text-center">
                Ready for Verification
              </h3>
              <p className="text-gray-600 mb-4 text-center">
                Please review your information before submitting for verification.
              </p>
              {/* Review Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {/* Personal Information Summary */}
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex justify-between">
                      <span>Name:</span>
                      <span className="font-medium">{kycData.firstName} {kycData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Date of Birth:</span>
                      <span className="font-medium">{kycData.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Phone:</span>
                      <span className="font-medium">{kycData.phone}</span>
                    </div>
                    {kycData.email && (
                      <div className="flex justify-between">
                        <span>Email:</span>
                        <span className="font-medium">{kycData.email}</span>
                      </div>
                    )}
                  </div>
                </div>
                {/* Document Summary */}
                <div className="bg-white rounded-lg p-4 border">
                  <h4 className="font-medium text-gray-900 mb-3">Documents</h4>
                  <div className="space-y-2 text-sm">
                    {Object.entries(kycData).map(([key, value]) => {
                      if (value && typeof value === 'object' && value.name) {
                        return (
                          <div key={key} className="flex justify-between items-center">
                            <span className="text-gray-600 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}:
                            </span>
                            <CheckCircle size={16} className="text-green-600" />
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
                {/* Business Information (if applicable) */}
                {variant === 'business' && kycData.businessName && (
                  <div className="bg-white rounded-lg p-4 border md:col-span-2">
                    <h4 className="font-medium text-gray-900 mb-3">Business Information</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Business Name:</span>
                        <span className="font-medium">{kycData.businessName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Registration:</span>
                        <span className="font-medium">{kycData.businessRegNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Tax ID:</span>
                        <span className="font-medium">{kycData.taxId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Business Type:</span>
                        <span className="font-medium">{kycData.businessType}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Handle form submission for current step
  const handleStepSubmit = () => {
    const formik = getCurrentFormik();
    if (formik) {
      formik.handleSubmit();
    } else {
      handleNextStep();
    }
  };

  return (
    <div className={`max-w-4xl mx-auto p-6 ${className}`}>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="border-b px-6 py-4 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {variant === 'business' ? 'Business KYC Verification' : 'KYC Verification'}
              </h1>
              <p className="text-gray-600 mt-1">
                {variant === 'quick' ? 'Quick identity verification' : 'Complete your identity verification process'}
              </p>
            </div>
            <StatusBadge status={kycStatus as any} animated />
          </div>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b bg-gray-50">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              const isAccessible = index <= currentStep;

              return (
                <React.Fragment key={index}>
                  <div
                    className={`flex items-center ${isAccessible ? 'cursor-pointer' : 'cursor-default'}`}
                    onClick={() => isAccessible && setCurrentStep(index)}
                  >
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200
                      ${isCompleted
                        ? 'bg-green-600 border-green-600 text-white'
                        : isActive
                          ? 'bg-blue-600 border-blue-600 text-white'
                          : 'bg-white border-gray-300 text-gray-400'
                      }
                    `}>
                      {isCompleted ? (
                        <CheckCircle size={20} />
                      ) : (
                        <StepIcon size={20} />
                      )}
                    </div>
                    <div className="ml-3">
                      <p className={`text-sm font-medium ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-xs text-gray-400">
                        Step {index + 1} of {steps.length}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`
                      flex-1 h-0.5 mx-4 transition-all duration-200
                      ${isCompleted ? 'bg-green-600' : 'bg-gray-300'}
                    `} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 min-h-[400px]">
          {renderStepContent()}
        </div>

        {/* Actions */}
        <div className="border-t px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <button
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ArrowLeft size={16} />
              Previous
            </button>
            <div className="flex items-center gap-3">
              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleStepSubmit}
                  disabled={!isCurrentStepValid()}
                  className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting || kycStatus === 'submitted'}
                  className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Submit for Verification
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
          {/* Progress Indicator */}
          <div className="mt-4">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Progress</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <ApprovalModal
        isOpen={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        customerName={`${kycData.firstName || 'Customer'} ${kycData.lastName || ''}`}
        applicationId={`KYC-${Date.now()}`}
        // onDownload={(id: string) => console.log('Download certificate:', id)}
        // onViewDetails={(id: string) => console.log('View details:', id)}
      />

      <RejectionModal
        isOpen={showRejectionModal}
        onClose={() => setShowRejectionModal(false)}
        customerName={`${kycData.firstName || 'Customer'} ${kycData.lastName || ''}`}
        applicationId={`KYC-${Date.now()}`}
        rejectionReasons={rejectionReasons}
        onResubmit={handleResubmit}
        onContactSupport={(id: string) => console.log('Contact support:', id)}
      />
    </div>
  );
};

// Quick KYC Component for simple use cases
export const QuickKYC = (props:any) => (
  <KYCComponent {...props} variant="quick" />
);

// Enhanced KYC Component for detailed verification
export const EnhancedKYC = (props:any) => (
  <KYCComponent {...props} variant="enhanced" />
);

// Business KYC Component for business verification
export const BusinessKYC = (props:any) => (
  <KYCComponent {...props} variant="business" />
);

export default KYCComponent;