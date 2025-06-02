import { XCircle, AlertCircle, RefreshCw, MessageCircle } from 'lucide-react';
import Modal from '../modal/Index';
import React from 'react';

interface RejectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  applicationId: string;
  rejectionReasons?: string[];
  onResubmit?: () => void;
  onContactSupport?: (applicationId: string) => void;
  rejectionDate?: string;
  allowResubmission?: boolean;
}

const RejectionModal: React.FC<RejectionModalProps> = ({
  isOpen,
  onClose,
  customerName,
  applicationId,
  rejectionReasons = [],
  onResubmit,
  onContactSupport,
  rejectionDate = new Date().toLocaleDateString(),
  allowResubmission = true,
}) => {
  const handleResubmit = () => {
    if (onResubmit) {
      onResubmit();
    }
    onClose();
  };

  const handleContactSupport = () => {
    if (onContactSupport) {
      onContactSupport(applicationId);
    } else {
      // Default support contact behavior
      console.log('Contacting support for application:', applicationId);
    }
  };

  const defaultReasons = [
    'Identity document is blurry or unreadable',
    'Address proof is older than 3 months',
    'Selfie does not match the ID photo'
  ];

  const displayReasons = rejectionReasons.length > 0 ? rejectionReasons : defaultReasons;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="KYC Verification Rejected" size="lg">
      <div className="p-6">
        <div className="text-center">
          {/* Error Icon */}
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-6">
            <XCircle className="w-10 h-10 text-red-600" />
          </div>
          
          {/* Rejection Message */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Verification Unsuccessful
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            Unfortunately, {customerName}'s KYC application has been rejected.
          </p>
          
          {/* Application Details */}
          <div className="bg-red-50 rounded-lg p-6 mb-6 text-left">
            <h4 className="font-semibold text-red-800 mb-4 text-center">Application Details</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Application ID:</span>
                <span className="font-mono text-red-700 font-semibold">{applicationId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Status:</span>
                <span className="text-red-700 font-semibold bg-red-200 px-3 py-1 rounded-full text-sm">
                  Rejected
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Rejection Date:</span>
                <span className="text-gray-900 font-semibold">{rejectionDate}</span>
              </div>
            </div>
          </div>

          {/* Rejection Reasons */}
          <div className="text-left mb-6">
            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 justify-center">
              <AlertCircle size={20} className="text-red-600" />
              Reasons for Rejection
            </h4>
            <div className="bg-white border border-red-200 rounded-lg p-4">
              <ul className="space-y-3">
                {displayReasons.map((reason, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-700">
                    <span className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                    <span className="text-sm leading-relaxed">{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-semibold text-blue-800 mb-2">What Can You Do?</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Review the rejection reasons carefully</li>
              <li>• Prepare better quality documents</li>
              <li>• Ensure all information is accurate and current</li>
              {allowResubmission && <li>• Resubmit your application with corrections</li>}
              <li>• Contact support if you need assistance</li>
            </ul>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            {allowResubmission && (
              <button
                onClick={handleResubmit}
                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                Start New Application
              </button>
            )}
            <button
              onClick={handleContactSupport}
              className="flex-1 bg-amber-100 text-amber-800 py-3 px-6 rounded-lg hover:bg-amber-200 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <MessageCircle size={18} />
              Contact Support
            </button>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full bg-gray-100 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default RejectionModal;