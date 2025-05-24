import React, { useState } from "react";
import AppButton from "../shared/AppButton";
import { InputField } from "../shared/InputField";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function PriceBox() {
  const [show, setIsShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAgreementChecked, setIsAgreementChecked] = useState(false);
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
  });

  const { email, fullName, phoneNumber } = userDetails;

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsModalOpen(true); 
  }

  function confirmAgreement() {
    if (!isAgreementChecked) return;
    setIsModalOpen(false);
    alert("API sent with: " + JSON.stringify(userDetails, null, 2));
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold text-neutral-900 mb-4">$4,000</h2>

      <div className="mb-3">
        <p className="text-sm font-medium text-blue-600 mb-1">Special offer:</p>
        <div className="flex gap-2 text-xs text-white">
          <div className="bg-blue-500 px-2 py-1 rounded">4d</div>
          <div className="bg-blue-500 px-2 py-1 rounded">23h</div>
          <div className="bg-blue-500 px-2 py-1 rounded">25m</div>
        </div>
      </div>

      <AppButton
        className="w-full"
        label={show ? "Hide Form" : "Buy Now"}
        onClick={() => setIsShow((prev) => !prev)}
      />

      {show && (
        <div className="mt-4 space-y-3">
          <form onSubmit={handleSubmit}>
            <InputField
              id="email"
              label="Email"
              placeholder="Enter email"
              required
              value={email}
              onChange={handleChange}
            />
            <InputField
              id="phoneNumber"
              label="Phone Number"
              placeholder="Enter phone number"
              required
              value={phoneNumber}
              onChange={handleChange}
            />
            <InputField
              id="fullName"
              label="Full Name"
              placeholder="Enter full name"
              required
              value={fullName}
              onChange={handleChange}
            />
            <AppButton label="Continue" type="submit" className="mt-2 w-full" />
          </form>
        </div>
      )}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Confirm Purchase Agreement</DialogTitle>
            <DialogDescription>
              Please review and confirm the agreement below before continuing.
            </DialogDescription>
          </DialogHeader>

          <div className="text-sm text-gray-700 space-y-3 max-h-60 overflow-auto">
            <p>
              Chaincart conducts a thorough vetting process for all listed properties,
              including on-site inspections and document verification.
            </p>
            <p>
              All post-purchase communication will be handled securely via email.
            </p>
            <p>
              Ownership rights and legal documents will be formally transferred after
              payment and identity confirmation.
            </p>
            <p>
              By continuing, you confirm that you have read, understood, and agree to
              these terms.
            </p>
          </div>

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox
              id="agreement"
              checked={isAgreementChecked}
              onCheckedChange={(val) => setIsAgreementChecked(Boolean(val))}
            />
            <Label htmlFor="agreement">
              I have read and agree to the terms above.
            </Label>
          </div>

          <DialogFooter>
            <AppButton
              label="Buy"
              onClick={confirmAgreement}
              disabled={!isAgreementChecked}
              className="w-full"
            />
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
