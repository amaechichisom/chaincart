import { CheckCircle } from 'lucide-react';
import Modal from '../modal/Index';
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface ApprovalModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName: string;
  applicationId: string;
  approvalDate?: string;
  processingTime?: string;
}

const ApprovalModal: React.FC<ApprovalModalProps> = ({
  isOpen,
  onClose,
  customerName,
  applicationId,
  approvalDate = new Date().toLocaleDateString(),
  processingTime = '2-3 business days',
}) => {;
  const navigation = useNavigate();

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="KYC Verification Approved" size="md">
      <div className="p-6">
        <div className="text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>

          {/* Success Message */}
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Verification Successful!
          </h3>
          <p className="text-gray-600 mb-6 text-lg">
            {customerName}'s KYC application has been approved successfully.
          </p>

          {/* Application Details */}
          <div className="bg-green-50 rounded-lg p-6 mb-6 text-left">
            <h4 className="font-semibold text-green-800 mb-4 text-center">Application Details</h4>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Application ID:</span>
                <span className="font-mono text-green-700 font-semibold">{applicationId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Status:</span>
                <span className="text-green-700 font-semibold bg-green-200 px-3 py-1 rounded-full text-sm">
                  Approved
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Approval Date:</span>
                <span className="text-gray-900 font-semibold">{approvalDate}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 font-medium">Processing Time:</span>
                <span className="text-gray-900 font-semibold">{processingTime}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-4 mb-6 text-left">
            <h4 className="font-semibold text-blue-800 mb-2">What's Next?</h4>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Your account has been fully verified</li>
              <li>• You can now access all platform features</li>
              <li>• Keep your approval certificate for records</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={()=> {
                onClose();
                navigation('/seller');
              }}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Continue to Seller
            </button>
          </div>

        </div>
      </div>
    </Modal>
  );
};

export default ApprovalModal;