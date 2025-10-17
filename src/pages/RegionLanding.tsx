import { useMemo } from "react";
import { Navigate, useParams } from "react-router-dom";
import type { Region } from "@/lib/data";

function normalize(input: string): string {
  return input.toLowerCase().replace(/[^a-z]/g, "");
}

const REGION_MAP: Record<string, Region> = {
  africa: "Africa",
  asia: "Asia",
  middleeast: "Middle East",
  southamerica: "South America",
  northamerica: "North America",
  europe: "Europe",
  oceania: "Oceania",
  erasingborders: "Erasing Borders",
};

export default function RegionLanding() {
  const { region } = useParams<{ region: string }>();

  const target = useMemo(() => {
    if (!region) return null;
    const key = normalize(region);
    return REGION_MAP[key] ?? null;
  }, [region]);

  if (!target) {
    return <Navigate to="/portfolio" replace />;
  }
  return <Navigate to={`/portfolio?region=${encodeURIComponent(target)}`} replace />;
}