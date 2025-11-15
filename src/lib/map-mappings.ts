import type { CountryCode, LatLng, FolderId } from "@/types/map";

// City-level centers for better zoom/centering experience.
export const COUNTRY_COORDS: Record<CountryCode, LatLng> = {
  ARG: { lat: -34.6037, lng: -58.3816 }, // Buenos Aires
  JOR: { lat: 31.9539,  lng: 35.9106  }, // Amman
  IND: { lat: 28.6139,  lng: 77.2090  }, // New Delhi
  ESP: { lat: 40.4168,  lng: -3.7038  }, // Madrid
  FRA: { lat: 48.8566,  lng: 2.3522   }, // Paris
  GRC: { lat: 37.9838,  lng: 23.7275  }, // Athens
  ITA: { lat: 41.9028,  lng: 12.4964  }, // Rome
  PRT: { lat: 38.7223,  lng: -9.1393  }, // Lisbon
  GBR: { lat: 51.5074,  lng: -0.1278  }, // London
  IRL: { lat: 53.3498,  lng: -6.2603  }, // Dublin
  PRI: { lat: 18.4655,  lng: -66.1057 }, // San Juan
  CUB: { lat: 21.5218,  lng: -77.7812 }, // Havana
  MEX: { lat: 19.4326,  lng: -99.1332 }, // Mexico City
  CAR: { lat: 18.2208,  lng: -66.5901 }, // Caribbean (San Juan as proxy)
  MAR: { lat: 31.7917,  lng: -7.0926  }, // Morocco (national center)
  EGY: { lat: 30.0444,  lng: 31.2357  }, // Cairo
  ETH: { lat: 9.1450,   lng: 40.4897  }, // National center
  ZAF: { lat: -25.7479, lng: 28.2293  }, // Pretoria
  NAM: { lat: -22.5609, lng: 17.0658  }, // Windhoek
  MMR: { lat: 19.7633, lng: 96.0785 }, // Naypyidaw (Myanmar)
  NPL: { lat: 27.7172,  lng: 85.3240  }, // Kathmandu
  THA: { lat: 13.7563,  lng: 100.5018 }, // Bangkok
  VNM: { lat: 21.0278,  lng: 105.8342 }, // Hanoi
  HKG: { lat: 22.3193,  lng: 114.1694 }, // Hong Kong
  JPN: { lat: 35.6762,  lng: 139.6503 }, // Tokyo
  CHI: { lat: 41.8379,  lng: -87.6828 }, // Chicago (41°50'16"N 87°40'58"W)
  NYC: { lat: 40.7143,  lng: -74.0060 }  // New York City (40°42'51.37"N 74°0'21.49"W)
};

export const COUNTRY_FOLDER_MAP: Record<CountryCode, FolderId> = {
  ARG: "folder-argentina",
  JOR: "folder-jordan",
  IND: "folder-india",
  ESP: "folder-spain",
  FRA: "folder-france",
  GRC: "folder-greece",
  ITA: "folder-italy",
  PRT: "folder-portugal",
  GBR: "folder-uk-ireland",
  IRL: "folder-uk-ireland",
  PRI: "folder-puerto-rico",
  CUB: "folder-cuba",
  MEX: "folder-mexico",
  CAR: "folder-caribbean",
  MAR: "folder-morocco",
  EGY: "folder-egypt",
  ETH: "folder-ethiopia",
  ZAF: "folder-south-africa",
  NAM: "folder-namibia",
  MMR: "folder-myanmar",
  NPL: "folder-nepal",
  THA: "folder-thailand",
  VNM: "folder-vietnam",
  HKG: "folder-hong-kong",
  JPN: "folder-japan",
  CHI: "folder-chicago",     // Adding Chicago folder
  NYC: "folder-new-york"     // Adding New York folder
};
