
import AppButton from "@/components/shared/AppButton";
import { cn } from "@/lib/utils";


export const KycForm = ({ data, kycForm, handleKYCChange, handleKYCSubmit, isLoading }: any) => {
  return (
    <div className="w-full max-w-xl space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">KYC Verification</h3>
        {data?.kyc?.status && (
          <span
            className={cn(
              "px-3 py-1 rounded-full text-sm font-medium",
              data.kyc.status === "VERIFIED"
                ? "bg-green-100 text-green-800"
                : data.kyc.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : data.kyc.status === "REJECTED"
                ? "bg-red-100 text-red-800"
                : "bg-gray-100 text-gray-800"
            )}
          >
            {data.kyc.status}
          </span>
        )}
      </div>

      {["VERIFIED", "PENDING"].includes(data?.kyc?.status) ? (
        <div className={cn("font-medium", {
          "text-green-600": data.kyc.status === "VERIFIED",
          "text-yellow-600": data.kyc.status === "PENDING"
        })}>
          {data.kyc.status === "VERIFIED"
            ? "✅ Your KYC has been verified successfully!"
            : "⌛ Your KYC is pending verification."}
        </div>
      ) : (
        <form onSubmit={handleKYCSubmit} className="space-y-4">
          <div>
            <label htmlFor="documentType" className="block font-medium text-sm mb-1">
              Document Type
            </label>
            <input
              type="text"
              id="documentType"
              required
              value={kycForm.documentType}
              onChange={handleKYCChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="kycDocuments" className="block font-medium text-sm mb-1">
              Upload Document
            </label>
            <input
              type="file"
              id="kycDocuments"
              accept="application/pdf"
              onChange={handleKYCChange}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <AppButton label="Submit KYC" type="submit" disabled={isLoading} />
        </form>
      )}
    </div>
  );
};
