import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { PrivacyProvider } from "@/components/privacy/PrivacyProvider";
import { usePrivacyControls } from "@/components/privacy/privacy-context";
import DoNotSellOrShare from "@/pages/DoNotSellOrShare";
import {
  PRIVACY_STORAGE_KEYS,
} from "@/lib/privacy/constants";
import {
  buildConsentCategories,
  createStoredConsentRecord,
  readStoredConsent,
} from "@/lib/privacy/storage";
import { fallbackPrivacyBootstrap } from "@/lib/privacy/config";
import { trackEvent } from "@/lib/privacy/tracking";

function jsonResponse(payload: unknown, status = 200) {
  return Promise.resolve(
    new Response(JSON.stringify(payload), {
      status,
      headers: {
        "Content-Type": "application/json",
      },
    }),
  );
}

function PrivacyHarness() {
  const privacy = usePrivacyControls();

  return (
    <div>
      <button type="button" onClick={privacy.openPreferences}>
        Open privacy settings
      </button>
      <button type="button" onClick={() => void privacy.optOutSaleSharing()}>
        Trigger sale-sharing opt out
      </button>
      <div data-testid="analytics-consent">
        {String(privacy.hasConsentFor("analytics"))}
      </div>
      <div data-testid="advertising-consent">
        {String(privacy.hasConsentFor("advertising"))}
      </div>
    </div>
  );
}

function renderPrivacyApp(route = "/") {
  render(
    <MemoryRouter
      initialEntries={[route]}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <PrivacyProvider>
        <Routes>
          <Route path="/do-not-sell-or-share" element={<DoNotSellOrShare />} />
          <Route path="*" element={<PrivacyHarness />} />
        </Routes>
      </PrivacyProvider>
    </MemoryRouter>,
  );
}

function setupFetchMock(overrides?: Partial<typeof fallbackPrivacyBootstrap>) {
  const fetchMock = vi.fn((input: RequestInfo | URL) => {
    const url = String(input);

    if (url.endsWith("/api/privacy/bootstrap")) {
      return jsonResponse({
        success: true,
        bootstrap: {
          ...fallbackPrivacyBootstrap,
          ...overrides,
        },
      });
    }

    if (url.endsWith("/api/privacy/consent")) {
      return jsonResponse({ success: true });
    }

    if (url.endsWith("/api/privacy/withdraw")) {
      return jsonResponse({ success: true });
    }

    if (url.endsWith("/api/privacy/opt-out")) {
      return jsonResponse({ success: true });
    }

    if (url.endsWith("/api/privacy/events")) {
      return jsonResponse({ success: true, tracked: true }, 202);
    }

    return jsonResponse({ success: true });
  });

  vi.stubGlobal("fetch", fetchMock);
  return fetchMock;
}

describe("privacy consent controls", () => {
  test("shows the consent banner when no stored consent exists", async () => {
    setupFetchMock();
    renderPrivacyApp();

    expect(
      await screen.findByRole("heading", {
        name: /choose how this site uses optional tracking/i,
      }),
    ).toBeInTheDocument();
  });

  test("persists accept-all consent and suppresses the banner on reload", async () => {
    setupFetchMock();
    renderPrivacyApp();

    fireEvent.click(
      await screen.findByRole("button", { name: /accept all/i }),
    );

    await waitFor(() => {
      const stored = readStoredConsent();
      expect(stored?.categories.analytics).toBe(true);
      expect(stored?.categories.personalization).toBe(true);
    });

    expect(
      screen.queryByRole("heading", {
        name: /choose how this site uses optional tracking/i,
      }),
    ).not.toBeInTheDocument();

    renderPrivacyApp();

    await waitFor(() => {
      expect(
        screen.queryByRole("heading", {
          name: /choose how this site uses optional tracking/i,
        }),
      ).not.toBeInTheDocument();
    });
  });

  test("reject-all keeps optional categories off", async () => {
    const fetchMock = setupFetchMock();
    renderPrivacyApp();

    fireEvent.click(
      await screen.findByRole("button", { name: /reject non-essential/i }),
    );

    await waitFor(() => {
      const stored = readStoredConsent();
      expect(stored?.categories.analytics).toBe(false);
      expect(stored?.categories.personalization).toBe(false);
      expect(stored?.categories.advertising).toBe(false);
    });

    expect(
      fetchMock.mock.calls.filter(([input]) =>
        String(input).endsWith("/api/privacy/events"),
      ),
    ).toHaveLength(0);
  });

  test("blocks analytics tracking before consent exists", async () => {
    const fetchMock = setupFetchMock();
    renderPrivacyApp();
    await screen.findByRole("heading", {
      name: /choose how this site uses optional tracking/i,
    });

    const tracked = await trackEvent("page_view", { source: "test" }, "analytics");

    expect(tracked).toBe(false);
    expect(
      fetchMock.mock.calls.filter(([input]) =>
        String(input).endsWith("/api/privacy/events"),
      ),
    ).toHaveLength(0);
  });

  test("supports a dedicated sale-sharing opt-out flow", async () => {
    setupFetchMock({
      regionMode: "california",
      countryCode: "US",
      regionCode: "CA",
    });

    window.localStorage.setItem(
      PRIVACY_STORAGE_KEYS.consent,
      JSON.stringify(
        createStoredConsentRecord({
          anonymousConsentId: "consent-california",
          regionMode: "california",
          source: "accept_all",
          status: "accepted",
          categories: buildConsentCategories({
            analytics: true,
            personalization: true,
            advertising: true,
          }),
        }),
      ),
    );

    renderPrivacyApp();

    fireEvent.click(
      await screen.findByRole("button", {
        name: /trigger sale-sharing opt out/i,
      }),
    );

    await waitFor(() => {
      const stored = readStoredConsent();
      expect(stored?.saleSharingOptOut).toBe(true);
      expect(stored?.categories.advertising).toBe(false);
    });
  });

  test("supports withdrawing consent from the preferences modal", async () => {
    setupFetchMock();
    window.localStorage.setItem(
      PRIVACY_STORAGE_KEYS.consent,
      JSON.stringify(
        createStoredConsentRecord({
          anonymousConsentId: "consent-withdraw",
          regionMode: "conservative",
          source: "accept_all",
          status: "accepted",
          categories: buildConsentCategories({
            analytics: true,
            personalization: true,
            advertising: true,
          }),
        }),
      ),
    );

    renderPrivacyApp();
    fireEvent.click(await screen.findByRole("button", { name: /open privacy settings/i }));
    fireEvent.click(await screen.findByRole("button", { name: /withdraw consent/i }));

    await waitFor(() => {
      const stored = readStoredConsent();
      expect(stored?.status).toBe("withdrawn");
      expect(stored?.categories.analytics).toBe(false);
      expect(stored?.categories.advertising).toBe(false);
    });
  });

  test("exposes an accessible preferences dialog", async () => {
    setupFetchMock();
    renderPrivacyApp();

    fireEvent.click(
      await screen.findByRole("button", { name: /customize/i }),
    );

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save choices/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/toggle analytics consent/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/toggle personalization consent/i),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/toggle advertising and sale-sharing consent/i),
    ).toBeInTheDocument();
  });
});
