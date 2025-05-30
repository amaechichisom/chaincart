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
import AppButton from "../shared/AppButton";

type PurchaseAgreementModalProps = {
  isOpen: boolean;
  onOpenChange: (val: boolean) => void;
  isAgreementChecked: boolean;
  onAgreementToggle: (val: boolean) => void;
  onConfirm: () => void;
  disabled: boolean;
};

export function PurchaseAgreementModal({
  isOpen,
  onOpenChange,
  isAgreementChecked,
  onAgreementToggle,
  onConfirm,
  disabled,
}: PurchaseAgreementModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Confirm Purchase Agreement</DialogTitle>
          <DialogDescription>
            Please read and agree to the terms below before continuing.
          </DialogDescription>
        </DialogHeader>

        <div className="text-sm text-gray-700 space-y-3 max-h-60 overflow-auto">
          <p>
            Chaincart performs thorough due diligence for all listed properties,
            including on-site inspections and document verification.
          </p>
          <p>
            All post-purchase communications will be securely handled via email.
          </p>
          <p>
            Ownership rights and legal documents will be officially transferred
            after payment and identity verification.
          </p>
          <p>
            By proceeding, you confirm that you have read, understood, and agree
            to the terms above.
          </p>
        </div>

        <div className="flex items-center space-x-2 mt-4">
          <Checkbox
            id="agreement"
            checked={isAgreementChecked}
            onCheckedChange={(val) => onAgreementToggle(Boolean(val))}
          />
          <Label htmlFor="agreement">
            I have read and agree to the terms above.
          </Label>
        </div>

        <DialogFooter>
          <AppButton
            label="Confirm & Pay"
            onClick={onConfirm}
            disabled={disabled || !isAgreementChecked}
            className="w-full"
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
