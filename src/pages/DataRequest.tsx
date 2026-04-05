import { useState } from "react";
import { LegalTemplatePage } from "@/components/privacy/LegalTemplatePage";
import { Button } from "@/components/ui/button";

type RequestType = "access" | "delete" | "correction" | "opt_out" | "other";

export default function DataRequest() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      requestType: String(formData.get("requestType") || "access") as RequestType,
      identifierType: String(formData.get("identifierType") || "email"),
      identifierValue: String(formData.get("identifierValue") || "").trim(),
      contactEmail: String(formData.get("contactEmail") || "").trim(),
      details: String(formData.get("details") || "").trim(),
    };

    try {
      const response = await fetch("/api/privacy/data-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Unable to submit request");
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Unable to submit request",
      );
    }
  };

  return (
    <LegalTemplatePage
      title="Data Request"
      intro="This page gives visitors a dedicated way to request access, deletion, correction, or privacy follow-up. Identity verification, response timing, and jurisdiction-specific workflow steps still require legal and operational review."
      sections={[
        {
          title: "1. Before you submit",
          bullets: [
            "Do not include sensitive information in the free-text field unless counsel later approves a secure workflow for it.",
            "This public form is an intake mechanism. Teams should validate identity and confirm the operational process for completing requests before production launch.",
          ],
        },
      ]}
    >
      <section className="rounded-[1.5rem] border border-neutral-200 bg-neutral-50 p-6 dark:border-neutral-800 dark:bg-neutral-900">
        <h2 className="text-2xl font-medium text-black dark:text-white">
          Submit a privacy request
        </h2>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-black dark:text-white">Request type</span>
              <select
                name="requestType"
                defaultValue="access"
                className="rounded-md border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-950"
              >
                <option value="access">Access / know</option>
                <option value="delete">Delete</option>
                <option value="correction">Correction</option>
                <option value="opt_out">Opt-out follow-up</option>
                <option value="other">Other</option>
              </select>
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-black dark:text-white">Identifier type</span>
              <select
                name="identifierType"
                defaultValue="email"
                className="rounded-md border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-950"
              >
                <option value="email">Email</option>
                <option value="anonymous_consent_id">Anonymous consent ID</option>
              </select>
            </label>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-black dark:text-white">Identifier value</span>
              <input
                name="identifierValue"
                required
                className="rounded-md border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-950"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-black dark:text-white">Contact email</span>
              <input
                type="email"
                name="contactEmail"
                required
                className="rounded-md border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-950"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-black dark:text-white">Details</span>
            <textarea
              name="details"
              rows={5}
              placeholder="Describe your request without including sensitive personal information."
              className="rounded-md border border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-950"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <Button type="submit" disabled={status === "submitting"}>
              {status === "submitting" ? "Submitting..." : "Submit request"}
            </Button>
            {status === "success" ? (
              <p className="text-sm text-emerald-700 dark:text-emerald-300">
                Request submitted. Operational verification and counsel-reviewed
                response handling are still required before production use.
              </p>
            ) : null}
            {status === "error" ? (
              <p className="text-sm text-red-700 dark:text-red-300">
                {errorMessage}
              </p>
            ) : null}
          </div>
        </form>
      </section>
    </LegalTemplatePage>
  );
}
