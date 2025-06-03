import { AuthResponse } from "@/@types/types";
import AppButton from "@/components/shared/AppButton";
import { InputField } from "@/components/shared/InputField";
import { TextareaField } from "@/components/shared/TextareaField";

type IProfileData = {
  fullName: string;
  companyName: string;
  aboutCompany: string;
};
type IProfileInfoForm = {
  showEdit: boolean;
  formData: IProfileData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleProfileSubmit: (e: React.FormEvent<Element>) => Promise<void>;
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  data: AuthResponse;
};

export const ProfileInfoForm = ({
  showEdit,
  formData,
  handleChange,
  handleProfileSubmit,
  setShowEdit,
  data,
}: IProfileInfoForm) => {
  return (
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
              setShowEdit(false);
            }
          }}
        />
      </div>

      {!showEdit ? (
        <div className="space-y-4">
          <p className="text-gray-600 leading-relaxed">
            {data.user.profile.bio || "Welcome to our real estate platform. This user hasn't added a bio yet."}
          </p>
          {data?.user.email && (
            <div className="text-sm text-gray-500">
              <strong>Email:</strong> {data?.user.email}
            </div>
          )}
          {data?.user.phoneNumber && (
            <div className="text-sm text-gray-500">
              <strong>Phone:</strong> {data.user.phoneNumber}
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
            <AppButton label="Save" type="submit" />
            <AppButton
              label="Cancel"
              variant="outline"
              onClick={() => setShowEdit(false)}
            />
          </div>
        </form>
      )}
    </div>
  );
};
