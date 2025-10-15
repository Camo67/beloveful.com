import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

// Simple, accessible cookie banner with localStorage persistence
export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem("cookie-consent");
      if (!consent) setVisible(true);
    } catch {
      // In case localStorage is unavailable, show banner
      setVisible(true);
    }
  }, []);

  const setConsent = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem("cookie-consent", value);
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50"
    >
      <div className="mx-auto max-w-screen-xl px-4 pb-4">
        <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-sm text-gray-700 dark:text-gray-300">
              We use cookies to improve site performance and experience. By clicking “Accept,” you agree to the use of cookies. You can learn more or contact us with any questions.
              <span className="ml-2">
                <a href="/faq#privacy" className="underline underline-offset-4">Learn more</a>
              </span>
            </p>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setConsent("rejected")} aria-label="Reject cookies">
                Decline
              </Button>
              <Button size="sm" onClick={() => setConsent("accepted")} aria-label="Accept cookies">
                Accept
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
