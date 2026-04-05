import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import FooterStrip from "@/components/FooterStrip";
import PageContainer from "@/components/PageContainer";
import { legalPlaceholderValues, legalTemplateWarnings } from "@/lib/privacy/legal-placeholders";

interface LegalSection {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
}

interface LegalTemplatePageProps {
  title: string;
  intro: string;
  sections: LegalSection[];
  children?: ReactNode;
}

export function LegalTemplatePage({
  title,
  intro,
  sections,
  children,
}: LegalTemplatePageProps) {
  return (
    <div className="min-h-screen">
      <Header variant="default" />

      <PageContainer className="space-y-10">
        <div className="space-y-4 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-muted-foreground">
            Privacy Template
          </p>
          <h1 className="text-4xl font-light text-black dark:text-white">
            {title}
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-neutral-600 dark:text-neutral-400">
            {intro}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8 rounded-[2rem] border border-neutral-200 bg-white/70 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950/60 md:p-10">
            {sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-2xl font-medium text-black dark:text-white">
                  {section.title}
                </h2>
                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-sm leading-7 text-neutral-700 dark:text-neutral-300"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets?.length ? (
                  <ul className="space-y-3 pl-5 text-sm leading-7 text-neutral-700 marker:text-neutral-500 dark:text-neutral-300">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="list-disc">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            {children}
          </div>

          <aside className="space-y-4">
            <div className="rounded-[1.5rem] border border-amber-500/30 bg-amber-500/10 p-5 text-sm text-amber-950 shadow-sm dark:text-amber-100">
              <p className="font-medium">Review status</p>
              <ul className="mt-3 space-y-2">
                {legalTemplateWarnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-[1.5rem] border border-neutral-200 bg-white/80 p-5 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-950/70">
              <p className="font-medium text-black dark:text-white">
                Template placeholders
              </p>
              <dl className="mt-4 space-y-3 text-neutral-600 dark:text-neutral-400">
                <div>
                  <dt className="font-medium">Company</dt>
                  <dd>{legalPlaceholderValues.companyName}</dd>
                </div>
                <div>
                  <dt className="font-medium">Legal entity</dt>
                  <dd>{legalPlaceholderValues.legalEntity}</dd>
                </div>
                <div>
                  <dt className="font-medium">Privacy contact</dt>
                  <dd>{legalPlaceholderValues.contactEmail}</dd>
                </div>
                <div>
                  <dt className="font-medium">DPO contact</dt>
                  <dd>{legalPlaceholderValues.dpoEmail}</dd>
                </div>
                <div>
                  <dt className="font-medium">Jurisdictions</dt>
                  <dd>{legalPlaceholderValues.jurisdictions}</dd>
                </div>
                <div>
                  <dt className="font-medium">Last updated</dt>
                  <dd>{legalPlaceholderValues.lastUpdated}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-[1.5rem] border border-neutral-200 bg-white/80 p-5 text-sm shadow-sm dark:border-neutral-800 dark:bg-neutral-950/70">
              <p className="font-medium text-black dark:text-white">
                Related privacy pages
              </p>
              <nav className="mt-4 flex flex-col gap-2">
                <Link to="/privacy-policy" className="underline underline-offset-4">
                  Privacy Policy
                </Link>
                <Link to="/cookie-policy" className="underline underline-offset-4">
                  Cookie Policy
                </Link>
                <Link
                  to="/california-privacy-notice"
                  className="underline underline-offset-4"
                >
                  California Privacy Notice
                </Link>
                <Link
                  to="/do-not-sell-or-share"
                  className="underline underline-offset-4"
                >
                  Do Not Sell or Share
                </Link>
                <Link to="/data-request" className="underline underline-offset-4">
                  Data Request
                </Link>
                <Link
                  to="/contact-privacy"
                  className="underline underline-offset-4"
                >
                  Contact Privacy
                </Link>
              </nav>
            </div>
          </aside>
        </div>
      </PageContainer>

      <FooterStrip />
    </div>
  );
}
