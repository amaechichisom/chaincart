import { useState, useEffect } from "react";
import { RootState, useAppSelector } from "@/store";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { maskAddress } from "@/utils/maskAddress";
import { ProfilePic, Copy } from "./../../assets";
import { toast } from "sonner";
import AppButton from "../shared/AppButton";
import { InputField } from "../shared/InputField";
import { TextareaField } from "../shared/TextareaField";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "./../../utils/copyToClipboard";
import {
  useAuthKycUploadMutation,
  useAuthProfileQuery,
} from "@/api/authService";
import Loading from "../shared/Loading";
import { AuthResponse } from "@/@types/types";

export default function AboutSeller() {
  const [activeTab, setActiveTab] = useState<"profile" | "kyc">("profile");
  const [showEdit, setShowEdit] = useState(false);

  const { user } = useAppSelector((state: RootState) => state.auth);
  const userId = user?.id;

  console.log({ user: user?.walletAddress }, "wallet");
  console.log({ user: user }, "wallet");
  const [uploadKyc, { isLoading: kycLoad }] = useAuthKycUploadMutation();
  const { isLoading, data, error } = useAuthProfileQuery(userId ?? "", {
    skip: !userId,
  });

  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    aboutCompany: "",
  });

  const [kycForm, setKycForm] = useState({
    documentType: "",
    kycDocuments: null as File | null,
  });

  const successResponse = data?.data as AuthResponse;
  console.log({ successResponse });
  useEffect(() => {
    if (successResponse) {
      setFormData({
        fullName: successResponse.user.username || "",
        companyName: successResponse.user.profile.bio || "",
        aboutCompany: successResponse.user.profile.bio || "",
      });
    }
  }, [successResponse]);

  if (!userId || isLoading) {
    return <Loading />;
  }

  if (error) {
    console.error("Profile fetch error:", error);
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <p className="text-red-500 font-medium">
          Error loading profile. Please try again later.
        </p>
      </div>
    );
  }

  console.log({ data }, "from single user");

  const addressMasked = maskAddress(
    user?.walletAddress || "0x0000000000000000000000000000000000000000"
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleKYCChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    if (id === "kycDocuments" && files) {
      setKycForm((prev) => ({ ...prev, kycDocuments: files[0] }));
    } else {
      setKycForm((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Updating profile:", formData);

      toast.success("Profile updated successfully!");
      setShowEdit(false);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Failed to update profile");
    }
  };

  const handleKYCSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!kycForm.documentType || !kycForm.kycDocuments) {
        toast.error("Please fill all KYC fields");
        return;
      }

      console.log("Submitting KYC:", kycForm);
      const formDataToSend = new FormData();
      formDataToSend.append("documentType", kycForm.documentType);
      formDataToSend.append("kycDocuments", kycForm.kycDocuments);
      console.log({formDataToSend},'form to send')
      const result = await uploadKyc(formDataToSend).unwrap();
      console.log({ result });
      toast.success("KYC submitted successfully!");
    } catch (error) {
      console.error("KYC submission error:", error);
      toast.error("Failed to submit KYC");
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
              <AvatarImage
                src={ProfilePic || successResponse.user.profile.avatar}
                alt="User Avatar"
              />
              <AvatarFallback>
                {successResponse.user.profile.name?.charAt(0)?.toUpperCase() ||
                  successResponse.user.profile.name?.charAt(0)?.toUpperCase() ||
                  "U"}
              </AvatarFallback>
            </Avatar>

            <h2 className="text-2xl lg:text-3xl font-bold mt-4 text-black truncate">
              {successResponse.user.profile.name || "Anonymous User"}
            </h2>

            <p className="text-lg mt-2 text-gray-700 dark:text-gray-400">
              Kyc Status: {successResponse.user.kycStatus}
            </p>
            <p className="text-lg mt-2 text-gray-700 dark:text-gray-400">
              {data?.companyName || "Real Estate Professional"}
            </p>

            <div className="flex items-center gap-2 mt-2 text-black dark:text-gray-400">
              <span className="text-sm">{addressMasked}</span>
              <img
                src={Copy}
                alt="copy"
                className="w-4 h-4 cursor-pointer hover:opacity-70 transition-opacity"
                onClick={() => {
                  if (user?.walletAddress) {
                    copyToClipboard(user.walletAddress);
                    toast.success(`Address copied: ${addressMasked}`, {
                      duration: 2000,
                      style: {
                        background: "#008ECC",
                        color: "#fff",
                      },
                    });
                  }
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
                onClick={() => {
                  setShowEdit(!showEdit);

                  if (showEdit && data) {
                    setFormData({
                      fullName: data.profile?.name || data.fullName || "",
                      companyName: data.companyName || "",
                      aboutCompany:
                        data.profile?.bio || data.aboutCompany || "",
                    });
                  }
                }}
              />
            </div>

            {!showEdit ? (
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {data?.profile?.bio ||
                    data?.aboutCompany ||
                    "Welcome to our real estate platform. This user hasn't added a bio yet."}
                </p>

                {data?.email && (
                  <div className="text-sm text-gray-500">
                    <strong>Email:</strong> {data.email}
                  </div>
                )}

                {data?.phoneNumber && (
                  <div className="text-sm text-gray-500">
                    <strong>Phone:</strong> {data.phoneNumber}
                  </div>
                )}
              </div>
            ) : (
              <form className="space-y-4" onSubmit={handleProfileSubmit}>
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
                  value={formData.companyName}
                  onChange={handleChange}
                />
                <TextareaField
                  id="aboutCompany"
                  label="About Company"
                  placeholder="Describe your company"
                  value={formData.aboutCompany}
                  onChange={handleChange}
                />
                <div className="flex gap-2">
                  <AppButton label="Save" type="submit"  />
                  <AppButton
                    label="Cancel"
                    onClick={() => setShowEdit(false)}
                    variant="outline"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (
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

          {data?.kyc?.status === "VERIFIED" ? (
            <div className="text-green-600 font-medium">
              ✅ Your KYC has been verified successfully!
            </div>
          ) : data?.kyc?.status === "PENDING" ? (
            <div className="text-yellow-600 font-medium">
              ⏳ Your KYC is under review. Please wait for verification.
            </div>
          ) : data?.kyc?.status === "REJECTED" ? (
            <div className="text-red-600">
              <div className="font-medium">❌ Your KYC was rejected.</div>
              {data.kyc.rejectedReason && (
                <div className="text-sm mt-1">
                  Reason: {data.kyc.rejectedReason}
                </div>
              )}
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleKYCSubmit}>
              <InputField
                id="documentType"
                label="Document Type"
                placeholder="e.g. Passport, Driver's License"
                required
                value={kycForm.documentType}
                onChange={handleKYCChange}
              />
              <div className="flex flex-col gap-1">
                <label htmlFor="kycDocuments" className="font-medium text-sm">
                  Upload Document *
                </label>
                <input
                  id="kycDocuments"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={handleKYCChange}
                  required
                  className="block w-full text-sm border rounded px-3 py-2 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {kycForm.kycDocuments && (
                  <span className="text-sm text-gray-600">
                    Selected: {kycForm.kycDocuments.name}
                  </span>
                )}
              </div>
              <AppButton label="Submit KYC" type="submit" isLoading={kycLoad}/>
            </form>
          )}
        </div>
      )}
    </section>
  );
}
