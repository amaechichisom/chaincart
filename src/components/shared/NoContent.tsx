import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

interface NoContentProps {
  title?: string;
  description?: string;
  actionText?: string;
  onActionClick?: () => void;
}

export default function NoContent({
  title = "No Content Found",
  description = "We couldn't find anything matching your criteria.",
  actionText = "Browse All",
  onActionClick,
}: NoContentProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 rounded-2xl border border-muted bg-muted/40 shadow-sm min-h-[300px]">
      <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p className="text-muted-foreground mb-4">{description}</p>
      {onActionClick && (
        <Button variant="outline" onClick={onActionClick}>
          {actionText}
        </Button>
      )}
    </div>
  );
}
