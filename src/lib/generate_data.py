#!/usr/bin/env python3
"""
Data Generator for Beloveful.com
Generates TypeScript modules from cloudinary-assets/index.json
"""

import json
import os
from pathlib import Path
from datetime import datetime
from typing import Dict, List, Any, Optional

class DataGenerator:
    def __init__(self, project_root: str):
        self.project_root = Path(project_root)
        self.cloudinary_assets = self.project_root / "src" / "lib" / "cloudinary-assets"
        self.index_file = self.cloudinary_assets / "prefix-mapped.json"
        self.output_dir = self.project_root / "src" / "lib" / "generated"
        
        # Ensure output directory exists
        self.output_dir.mkdir(exist_ok=True)
        
        # Load the index data
        with open(self.index_file, 'r') as f:
            self.index_data = json.load(f)
    
    def load_asset_data(self, assets_path: str) -> List[Dict[str, Any]]:
        """Load asset data from a specific urls.json file"""
        try:
            full_path = self.project_root / "src" / "lib" / assets_path
            with open(full_path, 'r') as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Warning: Could not find {assets_path}")
            return []
    
    def generate_slug(self, name: str) -> str:
        """Generate a URL-friendly slug from a name"""
        return name.lower().replace(' ', '-').replace('_', '-')
    
    def determine_image_orientation(self, width: int, height: int) -> str:
        """Determine if image is landscape or portrait"""
        return "landscape" if width > height else "portrait"
    
    def generate_country_albums(self) -> List[Dict[str, Any]]:
        """Generate country album data"""
        albums = []
        
        for folder in self.index_data['folders']:
            if folder['type'] == 'country':
                # Load the actual image data
                asset_data = self.load_asset_data(folder['assetsPath'])
                
                if not asset_data:
                    continue
                
                # Create images array with desktop/mobile URLs
                images = []
                for asset in asset_data[:20]:  # Limit to first 20 images
                    width = int(asset.get('width', 0))
                    height = int(asset.get('height', 0))
                    
                    # Use the same URL for both desktop and mobile for now
                    # You can add Cloudinary transformations later
                    image_url = asset['url']
                    
                    images.append({
                        'desktop': image_url,
                        'mobile': image_url
                    })
                
                album = {
                    'region': folder['region'],
                    'country': folder['country'],
                    'slug': self.generate_slug(folder['country']),
                    'title': folder['country'],
                    'images': images,
                    'featured': folder['count'] > 50,  # Mark countries with many images as featured
                    'description': f"Photography from {folder['country']}"
                }
                
                albums.append(album)
        
        return albums
    
    def generate_erasing_borders(self) -> List[Dict[str, Any]]:
        """Generate erasing borders project data"""
        erasing_borders = []
        
        for folder in self.index_data['folders']:
            if folder['type'] == 'erasing-borders':
                asset_data = self.load_asset_data(folder['assetsPath'])
                
                if not asset_data:
                    continue
                
                # Get the first image as the main image
                main_asset = asset_data[0] if asset_data else None
                if not main_asset:
                    continue
                
                project = {
                    'title': folder['folder'].split('/')[-1].replace('-', ' ').title(),
                    'slug': self.generate_slug(folder['folder'].split('/')[-1]),
                    'description': f"Erasing Borders project: {folder['folder'].split('/')[-1]}",
                    'region': 'Erasing Borders',
                    'featured': True,
                    'images': {
                        'desktop': main_asset['url'],
                        'mobile': main_asset['url']
                    }
                }
                
                erasing_borders.append(project)
        
        return erasing_borders
    
    def generate_workshop_photos(self) -> List[Dict[str, Any]]:
        """Generate workshop photos data"""
        workshop_photos = []
        
        for folder in self.index_data['folders']:
            if folder['type'] == 'workshop':
                asset_data = self.load_asset_data(folder['assetsPath'])
                
                if not asset_data:
                    continue
                
                # Get the first image
                main_asset = asset_data[0] if asset_data else None
                if not main_asset:
                    continue
                
                workshop = {
                    'title': folder['folder'].split('/')[-1].replace('Copy of ', '').replace('-', ' ').title(),
                    'slug': self.generate_slug(folder['folder'].split('/')[-1]),
                    'description': f"Workshop photo: {folder['folder'].split('/')[-1]}",
                    'region': 'Workshop Photos',
                    'featured': False,
                    'images': {
                        'desktop': main_asset['url'],
                        'mobile': main_asset['url']
                    }
                }
                
                workshop_photos.append(workshop)
        
        return workshop_photos
    
    def generate_homepage_slideshow(self) -> List[Dict[str, Any]]:
        """Generate homepage slideshow data"""
        slideshow = []
        
        # Get homepage images
        for folder in self.index_data['folders']:
            if folder['category'] == 'Homepage':
                asset_data = self.load_asset_data(folder['assetsPath'])
                
                for asset in asset_data:
                    width = int(asset.get('width', 0))
                    height = int(asset.get('height', 0))
                    
                    slideshow.append({
                        'desktop': asset['url'],
                        'mobile': asset['url'],
                        'desktopCloudinary': asset['url'],
                        'mobileCloudinary': asset['url']
                    })
        
        return slideshow
    
    def generate_client_logos(self) -> List[Dict[str, Any]]:
        """Generate client logos data"""
        logos = []
        
        for folder in self.index_data['folders']:
            if folder['category'] == 'clients':
                asset_data = self.load_asset_data(folder['assetsPath'])
                
                if not asset_data:
                    continue
                
                main_asset = asset_data[0] if asset_data else None
                if not main_asset:
                    continue
                
                logo = {
                    'name': folder['folder'].split('/')[-1].replace('-', ' ').title(),
                    'slug': self.generate_slug(folder['folder'].split('/')[-1]),
                    'url': main_asset['url'],
                    'alt': f"{folder['folder'].split('/')[-1]} logo"
                }
                
                logos.append(logo)
        
        return logos

    def generate_all(self):
        """Generate all TypeScript files"""
        timestamp = datetime.now().isoformat()
        
        # Generate travel portfolio all tab data
        portfolio_images = self.generate_travel_portfolio_all_tab()
        portfolio_content = f"""// Auto-generated from cloudinary-urls.json
// Generated on: {timestamp}

export interface Image {{
  desktop: string;
}}

export const TRAVEL_PORTFOLIO_ALL_IMAGES: Image[] = {json.dumps(portfolio_images, indent=2)};
"""
        self.write_typescript_file('travelPortfolioAllImages.ts', portfolio_content)
        
        # Generate page routes
        routes = self.generate_page_routes()
        routes_content = f"""// Auto-generated from cloudinary-assets/prefix-mapped.json
// Generated on: {timestamp}

export interface PageRoute {{
  path: string;
  url: string;
  name: string;
}}

export const GENERATED_PAGE_ROUTES: PageRoute[] = {json.dumps(routes, indent=2)};
"""
        self.write_typescript_file('generatedPageRoutes.ts', routes_content)
        
        print(f"\n✅ Generated page routes successfully!")
        print(f"\ud83d Summary:")
        print(f"   - Total Routes: {len(routes)}")
        print(f"   - Travel Portfolio Images: {len(portfolio_images)}")

        # Generate client logos
        client_logos = self.generate_client_logos()
        client_logos_content = f"""// Auto-generated client logos data
// Generated on: {timestamp}

export const CLIENT_LOGOS: string[] = {json.dumps([logo['url'] for logo in client_logos], indent=2)};

export interface ClientLogo {{
  name: string;
  slug: string;
  url: string;
  alt: string;
}}

export const CLIENT_LOGOS_DATA: ClientLogo[] = {json.dumps(client_logos, indent=2)};
"""
        self.write_typescript_file('clientLogos.ts', client_logos_content)
        
        print(f"\n✅ Generated client logos successfully!")
        print(f"\ud83d Summary:")
        print(f"   - Total Logos: {len(client_logos)}")

def main(home/camo/fok/beloveful.com/src/lib/cloudinary-assets/prefix-mapped.json):
    # Get the project root (assuming script is run from project root)
    project_root = os.getcwd(home/camo/fok/beloveful.com/src/lib/cloudinary-assets/prefix-mapped.json)
    
    generator = DataGenerator(project_root)
    generator.generate_all(home/camo/fok/beloveful.com/src/lib/cloudinary-assets/prefix-mapped.json)

if __name__ == "__main__":
    main(home/camo/fok/beloveful.com/src/lib/cloudinary-assets/prefix-mapped.json)