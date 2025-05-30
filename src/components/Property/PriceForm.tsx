import { InputField } from "../shared/InputField";
import AppButton from "../shared/AppButton";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

type PriceFormProps = {
  email: string;
  phoneNumber: string;
  fullName: string;
  saveDetailsToProfile: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckboxChange: (val: boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
};

export function PriceForm({
  email,
  phoneNumber,
  fullName,
  saveDetailsToProfile,
  onChange,
  onCheckboxChange,
  onSubmit,
  disabled,
}: PriceFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-3 mt-4">
      <InputField
        id="email"
        type="email"
        label="Email"
        placeholder="Enter email"
        required
        value={email}
        onChange={onChange}
      />
      <InputField
        id="phoneNumber"
        type="tel"
        label="Phone Number"
        placeholder="Enter phone number"
        required
        value={phoneNumber}
        onChange={onChange}
      />
      <InputField
        id="fullName"
        label="Full Name"
        placeholder="Enter full name"
        required
        value={fullName}
        onChange={onChange}
      />
      <div className="flex items-center space-x-2 mt-2">
        <Checkbox
          id="saveDetailsToProfile"
          checked={saveDetailsToProfile}
          onCheckedChange={(val) => onCheckboxChange(Boolean(val))}
        />
        <Label htmlFor="saveDetailsToProfile">
          Save these details to my profile for future purchases
        </Label>
      </div>
      <AppButton
        label="Continue to Agreement"
        type="submit"
        className="mt-2 w-full"
        disabled={disabled}
      />
    </form>
  );
}
