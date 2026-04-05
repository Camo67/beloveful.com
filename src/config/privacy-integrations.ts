export const privacyIntegrationConfig = {
  googleAnalytics: {
    enabled: import.meta.env.VITE_GA_ENABLED === "true",
    measurementId: import.meta.env.VITE_GA_MEASUREMENT_ID ?? "",
  },
  plausible: {
    enabled: import.meta.env.VITE_PLAUSIBLE_ENABLED === "true",
    domain: import.meta.env.VITE_PLAUSIBLE_DOMAIN ?? "",
  },
  posthog: {
    enabled: import.meta.env.VITE_POSTHOG_ENABLED === "true",
    apiKey: import.meta.env.VITE_POSTHOG_API_KEY ?? "",
    apiHost: import.meta.env.VITE_POSTHOG_HOST ?? "",
  },
  metaAds: {
    enabled: import.meta.env.VITE_META_ADS_ENABLED === "true",
    pixelId: import.meta.env.VITE_META_PIXEL_ID ?? "",
  },
  googleAds: {
    enabled: import.meta.env.VITE_GOOGLE_ADS_ENABLED === "true",
    conversionId: import.meta.env.VITE_GOOGLE_ADS_CONVERSION_ID ?? "",
  },
} as const;
