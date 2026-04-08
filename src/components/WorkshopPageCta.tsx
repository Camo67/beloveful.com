import { Button } from "@/components/ui/button";
import { createWorkshopInquiryHref } from "@/lib/contact";
import { Link } from "react-router-dom";

type WorkshopPageCtaProps = {
  workshopName: string;
  buttonLabel: string;
  position: "top" | "bottom";
};

const CTA_COPY = {
  top: "Questions about dates, availability, or fit? Send a note and Tony will follow up directly.",
  bottom: "Ready to move forward? Reach out here and we'll send the next steps straight to your inbox.",
} as const;

export default function WorkshopPageCta({
  workshopName,
  buttonLabel,
  position,
}: WorkshopPageCtaProps) {
  return (
    <div
      className={`rounded-2xl border border-neutral-200 bg-neutral-50 px-6 py-8 text-center dark:border-neutral-800 dark:bg-neutral-900 ${
        position === "top" ? "my-10" : "mt-16"
      }`}
    >
      <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
        {position === "top" ? "Start Here" : "Ready When You Are"}
      </p>
      <p className="mx-auto mb-6 max-w-2xl text-base text-neutral-700 dark:text-neutral-300">
        {CTA_COPY[position]}
      </p>
      <Button asChild size="lg" className="px-10 text-base">
        <Link to={createWorkshopInquiryHref(workshopName)}>{buttonLabel}</Link>
      </Button>
    </div>
  );
}
