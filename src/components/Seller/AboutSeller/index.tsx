import { useState, useEffect } from "react";
import { useAppSelector, RootState, useAppDispatch } from "@/store";
import { TabSelector } from "./TabSelector";
import { ProfileAvatarCard } from "./ProfileAvatarCard";
import { ProfileInfoForm } from "./ProfileInfoForm";
import { KycForm } from "./KycForm";
import {
  useAuthKycUploadMutation,
  useAuthProfileQuery,
} from "@/api/authService";
import { toast } from "sonner";
import Loading from "@/components/shared/Loading";
import { AuthResponse, IApiResponse, Roles } from "@/@types/types";
import { ProfilePic } from "./../../../assets";
import { setAuthenticated } from "@/features/authSlice";

export default function AboutSeller() {
  const [activeTab, setActiveTab] = useState<"profile" | "kyc">("profile");
  const [showEdit, setShowEdit] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state: RootState) => state.auth);
  const userId = user?.id;

  const [uploadKyc, { isLoading: kycLoad }] = useAuthKycUploadMutation();
  const { isLoading, data, error } = useAuthProfileQuery(userId ?? "", {
    skip: !userId,
  });
  const successResponse = data?.data as AuthResponse;
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    aboutCompany: "",
  });

  const [kycForm, setKycForm] = useState({
    documentType: "",
    kycDocuments: null as File | null,
  });

  useEffect(() => {
    if (successResponse?.user) {
      const { user } = data.data;
      setFormData({
        fullName: user.username || "",
        companyName: user.profile.bio || "",
        aboutCompany: user.profile.bio || "",
      });
    }
  }, [data]);

  if (!userId || isLoading) return <Loading />;
  if (error) return <p className="text-red-500">Failed to load profile.</p>;

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
    toast.success("Profile updated successfully!");
    setShowEdit(false);
  };

  const handleKYCSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading("Uploading Kyc");
    try {
      if (!kycForm.documentType || !kycForm.kycDocuments) {
        toast.error("Please fill all KYC fields");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("documentType", kycForm.documentType);
      formDataToSend.append("kycDocuments", kycForm.kycDocuments);
      const response: IApiResponse = await uploadKyc(formDataToSend).unwrap();
      if (response.status === 200) {
        toast.dismiss(loadingToast);
        toast.success(response.message || "Kyc successfully posted!");
        setKycForm({ documentType: "", kycDocuments: null });
        dispatch(
          setAuthenticated({
            isAuthenticated: true,
            user: {
              id: successResponse.user?._id,
              // roles: [Roles.ADMIN],
              roles: successResponse.user.role.map(
                (role) => role.toLowerCase() as Roles
              ),
              walletAddress: successResponse.user.walletAddress,
              isVerified: successResponse.user.isVerified,
            },
          })
        );
      }
      console.log({ kyc: response });
      toast.success("KYC submitted successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.dismiss(loadingToast);
        console.error("Error submitting form:", error);
        toast.error("Error posting ad");
      }
      toast.error("Error posting ad");
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <section className="flex flex-col gap-6">
      <TabSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "profile" ? (
        <div className="flex flex-col lg:flex-row gap-5 items-center lg:items-start">
          <ProfileAvatarCard
            user={successResponse?.user}
            profile={ProfilePic ?? successResponse?.user?.profile}
          />
          <ProfileInfoForm
            showEdit={showEdit}
            formData={formData}
            handleChange={handleChange}
            handleProfileSubmit={handleProfileSubmit}
            setShowEdit={setShowEdit}
            data={successResponse}
          />
        </div>
      ) : (
        <KycForm
          data={data?.data?.user}
          kycForm={kycForm}
          handleKYCChange={handleKYCChange}
          handleKYCSubmit={handleKYCSubmit}
          isLoading={kycLoad}
        />
      )}
    </section>
  );
}
