import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePrivacyControls } from "./privacy-context";

interface PrivacySettingsLinkProps {
  className?: string;
  variant?: "inline" | "button";
}

export function PrivacySettingsLink({
  className,
  variant = "inline",
}: PrivacySettingsLinkProps) {
  const { openPreferences } = usePrivacyControls();

  if (variant === "button") {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={openPreferences}
        className={className}
      >
        Privacy Settings
      </Button>
    );
  }

  return (
    <button
      type="button"
      onClick={openPreferences}
      className={cn(
        "text-xs text-neutral-500 underline-offset-2 hover:underline hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200",
        className,
      )}
    >
      Privacy Settings
    </button>
  );
}
