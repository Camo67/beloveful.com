import { useState, type FormEvent } from "react";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { useSearchParams } from "react-router-dom";
import { SocialIcons } from "@/components/SocialIcons";
import { CmsImage } from "@/components/CmsImage.tsx";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_HREF,
  createContactSubmissionMailtoHref,
} from "@/lib/contact";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopyState, setEmailCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const [submitState, setSubmitState] = useState<{
    type: "success" | "error";
    message: string;
    fallbackHref?: string;
  } | null>(null);
  const calendlyLink = import.meta.env.VITE_CALENDLY_LINK ?? "";
  
  const image = searchParams.get("image");
  const source = searchParams.get("source");
  const region = searchParams.get("region");
  const country = searchParams.get("country");
  const variant = searchParams.get("variant");
  const subject = searchParams.get("subject");
  const workshop = searchParams.get("workshop");
  const body = searchParams.get("body");

  const handleCopyEmail = async () => {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopyState("copied");
    } catch {
      setEmailCopyState("failed");
    } finally {
      window.setTimeout(() => {
        setEmailCopyState("idle");
      }, 2500);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    // Honeypot check
    if ((formData.get("website") as string)?.length) {
      return;
    }

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const fallbackHref = createContactSubmissionMailtoHref({
      name,
      email,
      message,
      source: source ?? undefined,
      region: region ?? undefined,
      country: country ?? undefined,
      variant: variant ?? undefined,
      image: image ? decodeURIComponent(image) : undefined,
      subject: subject ?? undefined,
      workshop: workshop ?? undefined,
    });

    setIsSubmitting(true);
    setSubmitState(null);

    try {
      const response = await fetch("/api/public/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          message,
          website: String(formData.get("website") || ""),
          source,
          region,
          country,
          variant,
          image,
          subject,
          workshop,
        }),
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        setSubmitState({
          type: "error",
          message: data?.error || "We could not send your message right now.",
          fallbackHref: response.status >= 500 ? fallbackHref : undefined,
        });
        return;
      }

      form.reset();
      setSubmitState({
        type: "success",
        message: "Your message was sent successfully. Tony will follow up by email soon.",
      });
    } catch (error) {
      setSubmitState({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "We could not send your message right now. Please try again shortly.",
        fallbackHref,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer className="min-h-[70vh] space-y-10">
        <h1 className="text-3xl md:text-4xl font-light mb-8 text-black dark:text-white text-center">Contact</h1>

        {calendlyLink && (
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 p-6 text-center space-y-3">
            <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">Calendly</p>
            <p className="text-lg text-black dark:text-white">Need to talk live? Grab a time that works for you.</p>
            <a
              href={calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-black text-white dark:bg-white dark:text-black text-sm font-medium hover:opacity-80 transition"
            >
              Schedule via Calendly
            </a>
          </div>
        )}

        <div className="grid gap-8 md:grid-cols-5">
          {/* Contextual preview */}
          {image && (
            <div
              className="relative md:col-span-2 h-64 md:h-96 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden select-none"
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            >
              <CmsImage
                url={decodeURIComponent(image)}
                alt="Requested print preview"
                className="absolute inset-0 object-cover w-full h-full"
              />
              <div className="pointer-events-none absolute inset-0" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4 text-xs text-white">
                You're requesting a print of this image
                {region && country && (
                  <span className="block mt-1 opacity-80">
                    {region} • {country}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Form */}
          <form
            className="md:col-span-3 space-y-5"
            onSubmit={handleSubmit}
          >
            {workshop && (
              <div className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
                Inquiry topic: <span className="font-medium text-black dark:text-white">{workshop}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-black dark:text-white">Name</span>
                <input
                  name="name"
                  required
                  className="border border-neutral-300 dark:border-neutral-700 rounded-md px-3 py-2 bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-medium text-black dark:text-white">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="border border-neutral-300 dark:border-neutral-700 rounded-md px-3 py-2 bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-black dark:text-white">Message</span>
              <textarea
                name="message"
                rows={6}
                defaultValue={body ?? ""}
                placeholder={
                  image
                    ? "Tell us preferred size, paper, framing, shipping city, etc."
                    : workshop
                      ? "Tell us which workshop you're interested in, your availability, and any questions you have."
                      : "How can we help?"
                }
                className="border border-neutral-300 dark:border-neutral-700 rounded-md px-3 py-2 bg-transparent text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-500 resize-none"
              />
            </label>

            {/* Honeypot (spam) */}
            <input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Hidden context */}
            <input type="hidden" name="image" value={image ?? ""} />
            <input type="hidden" name="source" value={source ?? ""} />
            <input type="hidden" name="region" value={region ?? ""} />
            <input type="hidden" name="country" value={country ?? ""} />
            <input type="hidden" name="variant" value={variant ?? ""} />
            <input type="hidden" name="subject" value={subject ?? ""} />
            <input type="hidden" name="workshop" value={workshop ?? ""} />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 rounded-md border border-neutral-900 dark:border-neutral-200 bg-transparent text-black dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                This form sends through the site. The direct email link below only opens your device's mail app.
              </p>
            </div>

            {submitState && (
              <div className="space-y-2">
                <p
                  className={`text-sm ${
                    submitState.type === "success"
                      ? "text-green-700 dark:text-green-300"
                      : "text-red-700 dark:text-red-300"
                  }`}
                >
                  {submitState.message}
                </p>
                {submitState.type === "error" && submitState.fallbackHref && (
                  <a
                    href={submitState.fallbackHref}
                    className="inline-flex text-sm underline underline-offset-2 hover:text-black dark:hover:text-white"
                  >
                    Open your email app with this message prefilled
                  </a>
                )}
              </div>
            )}

            <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <p>
                Prefer to email directly?{" "}
                <a
                  href={CONTACT_EMAIL_HREF}
                  className="underline underline-offset-2 hover:text-black dark:hover:text-white"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-sm underline underline-offset-2 hover:text-black dark:hover:text-white"
                >
                  Copy email address
                </button>
                {emailCopyState === "copied" && (
                  <span className="text-xs text-green-700 dark:text-green-300">
                    Email address copied.
                  </span>
                )}
                {emailCopyState === "failed" && (
                  <span className="text-xs text-red-700 dark:text-red-300">
                    Copy failed. Use the address above or the form.
                  </span>
                )}
              </div>
              <p className="text-xs">
                If clicking the email link does nothing, your device may not have a default mail app configured. Use the form here or copy the address instead.
              </p>
            </div>
          </form>
        </div>

        <div className="flex flex-col items-center gap-3 pt-4">
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">Social</p>
          <SocialIcons iconSize={18} variant="auto" />
        </div>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
