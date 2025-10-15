import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Logo } from "@/components/Logo";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  
  const image = searchParams.get("image");
  const source = searchParams.get("source");
  const region = searchParams.get("region");
  const country = searchParams.get("country");
  const variant = searchParams.get("variant");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    // Honeypot check
    if ((formData.get("website") as string)?.length) {
      return;
    }

    // TODO: Implement actual contact form submission
    // For now, just show success message
    console.log("Form submitted:", Object.fromEntries(formData.entries()));
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      <Header variant="default" />
      
      <PageContainer className="min-h-[70vh]">
        <div className="flex justify-center mb-6">
          <Logo variant="auto" />
        </div>
        <h1 className="text-3xl md:text-4xl font-light mb-8 text-black dark:text-white text-center">Contact</h1>

        {submitted && (
          <div className="mb-6 rounded-md border border-emerald-300/40 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-3 text-sm text-emerald-800 dark:text-emerald-200">
            Thanks! We've received your message and will follow up shortly.
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
              <div
                className="absolute inset-0 bg-center bg-cover"
                style={{ backgroundImage: `url("${decodeURIComponent(image)}")` }}
                aria-label="Requested print preview"
                role="img"
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
                placeholder={
                  image
                    ? "Tell us preferred size, paper, framing, shipping city, etc."
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

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="px-6 py-2 rounded-md border border-neutral-900 dark:border-neutral-200 bg-transparent text-black dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-200"
              >
                Send Message
              </button>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                We reply within 1–2 business days.
              </p>
            </div>
          </form>
        </div>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
