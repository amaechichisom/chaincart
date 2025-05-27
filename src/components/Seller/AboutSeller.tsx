import { useState } from "react";
import { RootState, useAppSelector } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { maskAddress } from "@/utils/maskAddress";
import { ProfilePic, Copy } from "./../../assets";
import { toast } from "sonner";
import AppButton from "../shared/AppButton";
import { InputField } from "../shared/InputField";
import { TextareaField } from "../shared/TextareaField";
import { cn } from "@/lib/utils";

export default function AboutSeller() {
  const [activeTab, setActiveTab] = useState<"profile" | "kyc">("profile");
  const [showEdit, setShowEdit] = useState(false);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const address = user?.walletAddress;
  const copyToClipboard = async (address?:string) => {
    try {
      await navigator.clipboard.writeText(
        address || "0x0000000000000000000000000000000000000000"
      );
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const addressMasked = maskAddress(
    address || "0x0000000000000000000000000000000000000000"
  );

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    aboutCompany: "",
  });

  const [kycForm, setKycForm] = useState({
    documentType: "",
    documentFile: null as File | null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleKYCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    if (id === "documentFile" && files) {
      setKycForm((prev) => ({ ...prev, documentFile: files[0] }));
    } else {
      setKycForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <div className="flex gap-4 border-b">
        {["profile", "kyc"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "profile" | "kyc")}
            className={cn(
              "pb-2 border-b-2 font-semibold border-0 focus:outline-none focus:ring-0",
              activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500"
            )}
          >
            {tab === "profile" ? "Profile" : "KYC"}
          </button>
        ))}
      </div>

      {activeTab === "profile" ? (
        <div className="flex flex-col lg:flex-row gap-5 items-center lg:items-start">
          <div className="flex flex-col items-center text-center w-full md:w-1/3">
            <Avatar className="w-24 h-24 lg:w-32 lg:h-32">
              <AvatarImage src={ProfilePic} alt="User Avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>

            <h2 className="text-2xl lg:text-3xl font-bold mt-4 text-black truncate">
              John Doe
            </h2>

            <p className="text-lg mt-2 text-gray-700 dark:text-gray-400">Brad Details</p>

            <div className="flex items-center gap-2 mt-2 text-black dark:text-gray-400">
              <span className="text-sm">{addressMasked}</span>
              <img
                src={Copy}
                alt="copy"
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  copyToClipboard(address);
                  toast.success(`Address copied to clipboard: ${addressMasked}`, {
                    duration: 2000,
                    style: {
                      background: "#008ECC",
                      color: "#fff",
                    },
                  });
                }}
              />
            </div>
          </div>

          <div className="w-full max-w-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {showEdit ? "Edit Profile" : "About"}
              </h3>
              <AppButton
                label={showEdit ? "Cancel" : "Edit Profile"}
                onClick={() => setShowEdit(!showEdit)}
              />
            </div>

            {!showEdit ? (
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Viral Properties is a forward-thinking real estate development
                company based in Lagos, Nigeria, specializing in building and
                selling high-quality residential and commercial properties...
              </p>
            ) : (
              <form className="space-y-4">
                <InputField
                  id="fullName"
                  label="Full Name"
                  placeholder="Enter full name"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                />
                <InputField
                  id="companyName"
                  label="Company Name"
                  placeholder="Enter company name"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                />
                <TextareaField
                  id="aboutCompany"
                  label="About Company"
                  placeholder="Describe your company"
                  required
                  value={formData.aboutCompany}
                  onChange={handleChange}
                />
                <AppButton label="Save" type="submit" />
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-xl space-y-6">
          <h3 className="text-xl font-semibold">KYC Verification</h3>
          <form className="space-y-4">
            <InputField
              id="documentType"
              label="Document Type"
              placeholder="e.g. Passport, Driver’s License"
              required
              value={kycForm.documentType}
              onChange={handleKYCChange}
            />
            <div className="flex flex-col gap-1">
              <label htmlFor="documentFile" className="font-medium text-sm">
                Upload Document
              </label>
              <input
                id="documentFile"
                type="file"
                accept="image/*,application/pdf"
                onChange={handleKYCChange}
                className="block w-full text-sm border rounded px-3 py-2"
              />
            </div>
            <AppButton label="Submit KYC" type="submit" />
          </form>
        </div>
      )}
    </section>
  );
}
