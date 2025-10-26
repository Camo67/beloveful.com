#!/usr/bin/env python3
"""
Data Generator for Beloveful.com
Builds lightweight TypeScript modules from cloudinary-assets/prefix-mapped.json.
"""

from __future__ import annotations

import json
import os
import re
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, Iterable, List, Optional, Tuple


class DataGenerator:
    def __init__(self, project_root: Path):
        self.project_root = Path(project_root)
        self.cloudinary_assets = self.project_root / "src" / "lib" / "cloudinary-assets"
        self.prefix_file = self.cloudinary_assets / "prefix-mapped.json"
        self.output_dir = self.project_root / "src" / "lib" / "generated"
        self.output_dir.mkdir(parents=True, exist_ok=True)

        with self.prefix_file.open("r", encoding="utf-8") as fh:
            self.prefix_data = json.load(fh)

        self.base_site_url = os.environ.get("SITE_BASE_URL", "https://beloveful.com").rstrip("/")
        self.assets = self._flatten_assets()

    def _flatten_assets(self) -> List[Dict[str, Any]]:
        """Flatten matched + unknown assets into a single iterable list."""
        assets: List[Dict[str, Any]] = []

        matched = self.prefix_data.get("matched", {})
        for region, countries in matched.items():
            if not isinstance(countries, dict):
                continue
            for country, items in countries.items():
                for asset in items or []:
                    assets.append(
                        {
                            "region": region,
                            "country": country,
                            "public_id": asset.get("public_id", ""),
                            "url": asset.get("url"),
                            "filename": asset.get("filename"),
                        }
                    )

        for asset in self.prefix_data.get("unknown", []):
            assets.append(
                {
                    "region": None,
                    "country": None,
                    "public_id": asset.get("public_id", ""),
                    "url": asset.get("url"),
                    "filename": asset.get("filename"),
                }
            )

        return assets

    @staticmethod
    def slugify(value: str) -> str:
        cleaned = re.sub(r"[^a-z0-9]+", "-", value.strip().lower())
        return cleaned.strip("-") or "untitled"

    @staticmethod
    def _prettify_name(value: str) -> str:
        pretty = re.sub(r"[_\-]+", " ", value).strip()
        return pretty.title() or "Partner"

    def iter_countries(self) -> Iterable[Tuple[str, str, List[Dict[str, Any]]]]:
        matched = self.prefix_data.get("matched", {})
        for region, countries in matched.items():
            if not isinstance(countries, dict):
                continue
            for country, assets in countries.items():
                yield region, country, assets or []

    def generate_travel_portfolio_all_tab(
        self, per_country: int = 12, max_total: int = 600
    ) -> List[Dict[str, str]]:
        images: List[Dict[str, str]] = []
        seen: set[str] = set()

        for _, _, assets in self.iter_countries():
            for asset in assets[:per_country]:
                url = asset.get("url")
                if not url or url in seen:
                    continue
                seen.add(url)
                images.append({"desktop": url})
                if len(images) >= max_total:
                    return images

        return images

    def generate_page_routes(self) -> List[Dict[str, str]]:
        routes: List[Dict[str, str]] = []
        seen_paths: set[str] = set()

        def add_route(path: str, name: str) -> None:
            if path in seen_paths:
                return
            seen_paths.add(path)
            routes.append(
                {
                    "path": path,
                    "url": f"{self.base_site_url}{path}",
                    "name": name,
                }
            )

        matched = self.prefix_data.get("matched", {})
        for region, countries in matched.items():
            region_slug = self.slugify(region)
            add_route(f"/{region_slug}", region)

            if not isinstance(countries, dict):
                continue

            for country in countries.keys():
                country_slug = self.slugify(str(country))
                add_route(f"/{region_slug}/{country_slug}", f"{country}, {region}")

        routes.sort(key=lambda entry: entry["path"])
        return routes

    def generate_client_logos(self, limit: Optional[int] = None) -> List[Dict[str, str]]:
        logos: List[Dict[str, str]] = []
        seen_urls: set[str] = set()

        for asset in self.assets:
            public_id = (asset.get("public_id") or "").lower()
            if "clients" not in public_id:
                continue

            url = asset.get("url")
            if not url or url in seen_urls:
                continue

            seen_urls.add(url)
            filename = asset.get("filename") or Path(public_id).name
            name = self._prettify_name(filename)

            logos.append(
                {
                    "name": name,
                    "slug": self.slugify(name),
                    "url": url,
                    "alt": f"{name} logo",
                }
            )

            if limit and len(logos) >= limit:
                break

        return logos

    def write_typescript_file(self, filename: str, content: str) -> None:
        target = self.output_dir / filename
        target.write_text(content.strip() + "\n", encoding="utf-8")
        print(f"📝 Wrote {target.relative_to(self.project_root)}")

    def generate_all(self) -> None:
        timestamp = datetime.now().isoformat(timespec="seconds")

        portfolio_images = self.generate_travel_portfolio_all_tab()
        portfolio_content = f"""// Auto-generated from {self.prefix_file.name}
// Generated on: {timestamp}

export interface TravelPortfolioImage {{
  desktop: string;
}}

export const TRAVEL_PORTFOLIO_ALL_IMAGES: TravelPortfolioImage[] = {json.dumps(portfolio_images, indent=2, ensure_ascii=False)};
"""
        self.write_typescript_file("travelPortfolioAllImages.ts", portfolio_content)

        routes = self.generate_page_routes()
        routes_content = f"""// Auto-generated from {self.prefix_file.name}
// Generated on: {timestamp}

export interface PageRoute {{
  path: string;
  url: string;
  name: string;
}}

export const GENERATED_PAGE_ROUTES: PageRoute[] = {json.dumps(routes, indent=2, ensure_ascii=False)};
"""
        self.write_typescript_file("generatedPageRoutes.ts", routes_content)

        client_logos = self.generate_client_logos()
        client_logo_urls = [logo["url"] for logo in client_logos]
        client_logos_content = f"""// Auto-generated from {self.prefix_file.name}
// Generated on: {timestamp}

export const CLIENT_LOGOS: string[] = {json.dumps(client_logo_urls, indent=2, ensure_ascii=False)};

export interface ClientLogo {{
  name: string;
  slug: string;
  url: string;
  alt: string;
}}

export const CLIENT_LOGOS_DATA: ClientLogo[] = {json.dumps(client_logos, indent=2, ensure_ascii=False)};
"""
        self.write_typescript_file("clientLogos.ts", client_logos_content)

        print("\n✅ Generation summary")
        print(f"   • Travel portfolio images: {len(portfolio_images)}")
        print(f"   • Page routes: {len(routes)}")
        print(f"   • Client logos: {len(client_logos)}")


def main() -> None:
    project_root = Path(__file__).resolve().parents[2]
    generator = DataGenerator(project_root)
    generator.generate_all()


if __name__ == "__main__":
    main()
