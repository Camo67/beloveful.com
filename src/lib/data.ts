import { GENERATED_ALBUMS, GENERATED_HOME_SLIDESHOW } from "./generatedAlbums";

export type Region =
  | "Africa"
  | "Asia"
  | "Middle East"
  | "South America"
  | "North America"
  | "Europe"
  | "Oceania"
  | "Erasing Borders"

/**
 * Defines the structure for a single album, representing a country/location.
 */
export interface CountryAlbum {
  region: Region
  country: string
  slug: string
  images: {
    desktop: string // URL for landscape image
    mobile: string // URL for portrait image
  }[];
}

export interface SlideshowImage {
  desktop: string;
  mobile: string;
}

/**
 * Defines the structure for a featured work/project
 */
export interface Work {
  title: string;
  slug: string;
  description?: string;
  coverImage: {
    desktop: string;
    mobile: string;
  };
  images: {
    desktop: string;
    mobile: string;
  }[];
}

// Local slideshow images with Cloudinary fallbacks
export const HOME_SLIDESHOW: SlideshowImage[] = [
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/JOR-4604.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/DSCF0103.jpg"
  },
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/CHI-2084-Website-2.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/CHI-65.jpg"
  },
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/CHI-770.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/DSCF8938.jpg"
  },
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/Simpler Times.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/Into the Rabbit Hole.jpg"
  },
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/Snack Time.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/NAM-11-22-DSCF8088.jpg"
  },
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/NAM-03-18-DSCF3974-2.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/Sense of Scale.jpg"
  },
  {
    desktop: "https://cdn.shopify.com/s/files/1/1602/8723/files/The-Headless-Horseman-PiL-Beloveful-Tony-Menias.jpg?v=1758731834",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/WanderingPaths.jpg"
  },
  {
    desktop: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Desktop Landscape/Tony Menias-Fly.jpg",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/Enlightened.jpg"
  },
  {
    desktop: "https://cdn.shopify.com/s/files/1/1602/8723/products/CalmBeforeTheStorm-Tony-Menias-photoinnovationlab.jpg?v=1652377339",
    mobile: "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Homepage/Mobile Portrait/Pastel Playground.jpg"
  }
];

// Portfolio albums using local images
export const ALBUMS: CountryAlbum[] = [
  {
    "region": "Middle East",
    "country": "Jordan",
    "slug": "jordan",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4610-4.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4610-4.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4694.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4694.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4640.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4640.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4385.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4385.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4619.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4619.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4488.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4488.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4561.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4561.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4430.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4430.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4537-Website-2.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/DSCF4537-Website-2.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JDN-4461.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JDN-4461.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JDN-4455.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JDN-4455.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4604.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4604.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-5061.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-5061.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4569.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4569.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4723.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4723.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4597.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4597.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4876.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4876.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4957.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4957.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4516.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4516.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4574.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4574.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4615.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4615.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4577.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-4577.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-5232103122.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-5232103122.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR--10-30-22.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR--10-30-22.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-5044-10-30-22.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-5044-10-30-22.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-5001-10-30-22.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-5001-10-30-22.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF5274.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF5274.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF5272.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF5272.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF5216.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF5216.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF5213.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF5213.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF4984.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF4984.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF5146.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF5146.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-11-22-DSCF5588.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-11-22-DSCF5588.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF4959.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-22-DSCF4959.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-11-22-DSCF5655.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-11-22-DSCF5655.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-19-DSCF4604.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Jordan/JOR-10-19-DSCF4604.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466071/JOR-4461_kkru8x.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466071/JOR-4461_kkru8x.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620664/JOR-4461.jpg-nggid03307-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nvnoby.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620664/JOR-4461.jpg-nggid03307-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nvnoby.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/JOR-4461.jpg-nggid03307-ngg0dyn-120x90-00f0w010c011r110f110r010t010_xsfpwk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/JOR-4461.jpg-nggid03307-ngg0dyn-120x90-00f0w010c011r110f110r010t010_xsfpwk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620607/JOR-4461_jqbzae.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620607/JOR-4461_jqbzae.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620603/JOR-4461_y7xfyc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620603/JOR-4461_y7xfyc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-10-19-DSCF4604_rv8ibh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-10-19-DSCF4604_rv8ibh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-10-22-DSCF4959_hljqss.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-10-22-DSCF4959_hljqss.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-11-22-DSCF5655_so0p5r.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-11-22-DSCF5655_so0p5r.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-11-22-DSCF5588_orujem.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-11-22-DSCF5588_orujem.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR--10-30-22_mavyog.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR--10-30-22_mavyog.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-10-22-DSCF5146_ppazgw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-10-22-DSCF5146_ppazgw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-4876_dgqtxb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-4876_dgqtxb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620586/JOR-5232103122_ehih9d.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620586/JOR-5232103122_ehih9d.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620576/JOR-10-22-DSCF5272_b8xfbx.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620576/JOR-10-22-DSCF5272_b8xfbx.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620576/JOR-5001-10-30-22_y0pdwm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620576/JOR-5001-10-30-22_y0pdwm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620575/JOR-10-22-DSCF5213_csluvt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620575/JOR-10-22-DSCF5213_csluvt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620575/JOR-4516_lt6tok.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620575/JOR-4516_lt6tok.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620575/JOR-10-22-DSCF5216_lvtv58.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620575/JOR-10-22-DSCF5216_lvtv58.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-5044-10-30-22_bdmvvk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-5044-10-30-22_bdmvvk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-4574_kdl0xq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-4574_kdl0xq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-4723_pblhsy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-4723_pblhsy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-10-22-DSCF5274_qynnqp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-10-22-DSCF5274_qynnqp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-4577_b7xk54.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-4577_b7xk54.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620573/JOR-10-22-DSCF4984_zkosfq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620573/JOR-10-22-DSCF4984_zkosfq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620573/JOR-4615_aldnty.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620573/JOR-4615_aldnty.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JOR-4957_oxybq1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JOR-4957_oxybq1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JOR-4597_tkrvb7.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JOR-4597_tkrvb7.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JOR-4569_pcexyu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JOR-4569_pcexyu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620571/JOR-5061_an9ah9.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620571/JOR-5061_an9ah9.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620570/JOR-4604_weouv8.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620570/JOR-4604_weouv8.jpg" }
    ]
  },
  {
    "region": "Middle East",
    "country": "Israel | Palestine",
    "slug": "israel-palestine",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF3088.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF3088.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF2675.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF2675.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF3675.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF3675.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF2992.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF2992.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/TonyMenias-Hesalwayslistening.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/TonyMenias-Hesalwayslistening.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF3559.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF3559.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF2938.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF2938.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF2969.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/DSCF2969.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-3238.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-3238.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-3250.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-3250.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-3116.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-3116.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/untitled-4506-5.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/untitled-4506-5.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3773.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3773.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3270.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3270.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3313.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3313.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3322.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3322.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3566.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3566.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3303.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3303.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3581.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3581.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3582.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3582.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3611.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3611.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3266.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3266.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3206.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3206.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3208.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3208.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3211.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3211.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3315.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3315.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3221.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3221.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4570.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4570.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4888.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4888.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4890.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4890.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4891.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4891.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4892.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4892.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4893.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4893.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF2937.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF2937.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3722.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3722.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF4212.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF4212.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF4131.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF4131.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF4159.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF4159.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF2980-Enhanced-NR.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF2980-Enhanced-NR.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF3016.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF3016.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF3499.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF3499.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF3674.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF3674.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF3016-2.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF3016-2.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF2603.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/ISR-10-19-DSCF2603.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3283.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-19-DSCF3283.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4693.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4693.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4464.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4464.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4834.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Middle East/Israel | Palestine/PAL-10-22-DSCF4834.jpg" }
    ]
  },
  {
    "region": "Logo",
    "country": "White",
    "slug": "white",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/White/Belovefulwhitetransparent.png", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/White/Belovefulwhitetransparent.png" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/White/Smaller_Logo.png", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/White/Smaller_Logo.png" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/White/Beloveful.png", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/White/Beloveful.png" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/White/Smallest.png", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/White/Smallest.png" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/White/Beloveful_white.png", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/White/Beloveful_white.png" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/White/Smaller.png", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/White/Smaller.png" }
    ]
  },
  {
    "region": "Logo",
    "country": "IMG_0007_f4jnqu",
    "slug": "img0007f4jnqu",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/IMG.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/IMG.jpg" }
    ]
  },
  {
    "region": "Logo",
    "country": "Beloveful_copy_2_ovexsu",
    "slug": "belovefulcopy2ovexsu",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/Beloveful_copy.png", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/Beloveful_copy.png" }
    ]
  },
  {
    "region": "Logo",
    "country": "belovefullogowhite_ho0tiz",
    "slug": "belovefullogowhiteho0tiz",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/belovefullogowhite.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/belovefullogowhite.jpg" }
    ]
  },
  {
    "region": "Logo",
    "country": "nooutline_q5wysb",
    "slug": "nooutlineq5wysb",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/nooutline.png", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/nooutline.png" }
    ]
  },
  {
    "region": "Logo",
    "country": "IMG_4610_copy.jpg_copy_3_yrluid",
    "slug": "img4610copyjpgcopy3yrluid",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/IMG.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/IMG.jpg" }
    ]
  },
  {
    "region": "Logo",
    "country": "Beloveful_black_transparent_hscezu",
    "slug": "belovefulblacktransparenthscezu",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/Beloveful_black.png", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/Beloveful_black.png" }
    ]
  },
  {
    "region": "Logo",
    "country": "Beloveful_copy_ghik9l",
    "slug": "belovefulcopyghik9l",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/Beloveful.png", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/Beloveful.png" }
    ]
  },
  {
    "region": "Logo",
    "country": "IMG_4610_hpu56z",
    "slug": "img4610hpu56z",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/IMG.png", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/IMG.png" }
    ]
  },
  {
    "region": "Logo",
    "country": "beloveful_logo_inverted_75__opacity_t8dpdk",
    "slug": "belovefullogoinverted75opacityt8dpdk",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/beloveful_logo_inverted_75_.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/beloveful_logo_inverted_75_.jpg" }
    ]
  },
  {
    "region": "Logo",
    "country": "Beloveful_copy_3_owljbn",
    "slug": "belovefulcopy3owljbn",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/Beloveful_copy.png", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/Beloveful_copy.png" }
    ]
  },
  {
    "region": "Logo",
    "country": "IMG_SMALl_l4akll",
    "slug": "imgsmalll4akll",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/IMG_SMALl.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/IMG_SMALl.jpg" }
    ]
  },
  {
    "region": "Logo",
    "country": "IMG_0007_copy_ftdbzr",
    "slug": "img0007copyftdbzr",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/IMG_0007.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/IMG_0007.jpg" }
    ]
  },
  {
    "region": "Logo",
    "country": "Beloveful_copy_6_k5mwpt",
    "slug": "belovefulcopy6k5mwpt",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/Beloveful_copy.png", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/Beloveful_copy.png" }
    ]
  },
  {
    "region": "Logo",
    "country": "IMG_1052_ekyghu",
    "slug": "img1052ekyghu",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/IMG.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Logo/IMG.jpg" }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "Erasing Borders",
    "slug": "erasing-borders",
    "images": [
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Tony_Menias_-_Two_Girls_in_Window.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Tony_Menias_-_Two_Girls_in_Window.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Vietnam-DSCF8153.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Vietnam-DSCF8153.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/MOR-IMG_5248.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/MOR-IMG_5248.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-DSCF9471.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-DSCF9471.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/IND-MeniasTony.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/IND-MeniasTony.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/NatureVSNurture.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/NatureVSNurture.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/NEP-Silent_Stare.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/NEP-Silent_Stare.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/TonyMeniasAMansLegacy.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/TonyMeniasAMansLegacy.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/NEP-DSCF8737.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/NEP-DSCF8737.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/IND-MeniasTony.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/IND-MeniasTony.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/NyC-DSCF8922_copy.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/NyC-DSCF8922_copy.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/DSCF3088.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/DSCF3088.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/MYA-DSCF0783.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/MYA-DSCF0783.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-MeniasTony.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-MeniasTony.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/THAI-DSCF3890.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/THAI-DSCF3890.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/PAL-DSCF3675.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/PAL-DSCF3675.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/MYA-DSCF9634.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/MYA-DSCF9634.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/PAL-MeniasTony.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/PAL-MeniasTony.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/FRA-DSCF0103.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/FRA-DSCF0103.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Israel-MeniasTony.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Israel-MeniasTony.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/MOR-IMG.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/MOR-IMG.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Greece-DSCF3935_copy.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/Greece-DSCF3935_copy.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/PHI-1662.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/PHI-1662.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-Beloveful6.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/CHI-Beloveful6.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/JOR-4461.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/JOR-4461.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/IND-MeniasTony.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/IND-MeniasTony.jpg" },
      { "desktop": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/JAP-3265.jpg", "mobile": "https://pub-6ca7f958f39144099d9effd483242d2d.r2.dev/Website beloveful.com/Erasing Borders/JAP-3265.jpg" }
    ]
  },
  {
    "region": "Africa",
    "country": "Morocco",
    "slug": "morocco",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466092/MOR-IMG_5248_copy_o6q3jf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466092/MOR-IMG_5248_copy_o6q3jf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466075/MOR-IMG_5277_b83thl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466075/MOR-IMG_5277_b83thl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621056/MOR-IMG_5277_cbsxmw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621056/MOR-IMG_5277_cbsxmw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621056/MOR-5380-05-07-16_jqwcrp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621056/MOR-5380-05-07-16_jqwcrp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621055/MOR-05-16-IMG_5205_nscxid.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621055/MOR-05-16-IMG_5205_nscxid.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620663/MOR-IMG_5248-copy.jpg-nggid03308-ngg0dyn-120x90-00f0w010c011r110f110r010t010_rifsie.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620663/MOR-IMG_5248-copy.jpg-nggid03308-ngg0dyn-120x90-00f0w010c011r110f110r010t010_rifsie.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620661/MOR-IMG_5248-copy.jpg-nggid03308-ngg0dyn-180x0-00f0w010c010r110f110r010t010_pmwzk0.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620661/MOR-IMG_5248-copy.jpg-nggid03308-ngg0dyn-180x0-00f0w010c010r110f110r010t010_pmwzk0.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620653/MOR-IMG_5277.jpg-nggid03304-ngg0dyn-120x90-00f0w010c011r110f110r010t010_latntg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620653/MOR-IMG_5277.jpg-nggid03304-ngg0dyn-120x90-00f0w010c011r110f110r010t010_latntg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/MOR-IMG_5277.jpg-nggid03304-ngg0dyn-180x0-00f0w010c010r110f110r010t010_t42qne.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/MOR-IMG_5277.jpg-nggid03304-ngg0dyn-180x0-00f0w010c010r110f110r010t010_t42qne.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620608/MOR-IMG_5277_hotiub.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620608/MOR-IMG_5277_hotiub.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620607/MOR-IMG_5277_ikytre.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620607/MOR-IMG_5277_ikytre.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620604/MOR-IMG_5248-copy_m96byn.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620604/MOR-IMG_5248-copy_m96byn.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620599/MOR-IMG_5248-copy_btfy8y.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620599/MOR-IMG_5248-copy_btfy8y.jpg" }
    ]
  },
  {
    "region": "North America",
    "country": "Chicago",
    "slug": "chicago",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466090/CHI-DSCF9471_mrvrxd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466090/CHI-DSCF9471_mrvrxd.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466082/CHI-MeniasTony_12_ywrfrc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466082/CHI-MeniasTony_12_ywrfrc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466071/CHI-Beloveful6_sxid0x.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466071/CHI-Beloveful6_sxid0x.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400287/CHI-0871_irnemb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400287/CHI-0871_irnemb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400286/CHI-1262_nsnxzb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400286/CHI-1262_nsnxzb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400284/CHI-5041_gagtl2.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400284/CHI-5041_gagtl2.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400280/CHI-8292_vy56ok.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400280/CHI-8292_vy56ok.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400278/CHI-8382_xpvkzp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400278/CHI-8382_xpvkzp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400277/CHI-8413_pcmyd4.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400277/CHI-8413_pcmyd4.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400275/CHI-8649_ogte7q.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400275/CHI-8649_ogte7q.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400272/CHI-823-Website-2_dzecx9.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400272/CHI-823-Website-2_dzecx9.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400271/CHI-372_ecbzxy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400271/CHI-372_ecbzxy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400269/CHI-65_fgjwby.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400269/CHI-65_fgjwby.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400267/CHI-770_h8vtwg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400267/CHI-770_h8vtwg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400267/CHI-8032_fnivln.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400267/CHI-8032_fnivln.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400264/CHI-9872-Website-2_n0brdh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400264/CHI-9872-Website-2_n0brdh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400262/CHI-4780_r7bvbn.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400262/CHI-4780_r7bvbn.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400260/CHI-7709_k9welh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400260/CHI-7709_k9welh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400258/CHI-8884_ilxzgz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400258/CHI-8884_ilxzgz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400257/CHI-440-Website-2_yhjghz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400257/CHI-440-Website-2_yhjghz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400255/CHI-2081_jvescl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400255/CHI-2081_jvescl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400253/CHI-2084-Website-2_wr8h5y.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400253/CHI-2084-Website-2_wr8h5y.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400252/CHI-2111_lim7l4.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400252/CHI-2111_lim7l4.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400250/CHI-2145_yrvakj.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400250/CHI-2145_yrvakj.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400248/CHI-2167_yafprb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400248/CHI-2167_yafprb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400246/CHI-4_pdtha2.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400246/CHI-4_pdtha2.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400245/CHI-9371_dvpzg1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400245/CHI-9371_dvpzg1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400243/CHI-7876_copy_qkxrcq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400243/CHI-7876_copy_qkxrcq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400241/CHI-9381_rzvtgh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400241/CHI-9381_rzvtgh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400240/CHI-147_ilmaje.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400240/CHI-147_ilmaje.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400237/CHI-3_rfygr5.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400237/CHI-3_rfygr5.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400236/CHI-20_tknr7q.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400236/CHI-20_tknr7q.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400235/CHI-304_lntriz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400235/CHI-304_lntriz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400232/CHI-253_icy2sv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400232/CHI-253_icy2sv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400229/CHI-Cafe-_tyqd7y.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400229/CHI-Cafe-_tyqd7y.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400228/CHI-415_copy_yjolmp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400228/CHI-415_copy_yjolmp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400227/CHI-367_hdz3ti.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400227/CHI-367_hdz3ti.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400225/CHI-489_ttezok.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400225/CHI-489_ttezok.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400223/CHI-3_copy_iighyl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400223/CHI-3_copy_iighyl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400221/CHI-376_sdjrhp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400221/CHI-376_sdjrhp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400220/CHI-9540_xad0wj.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400220/CHI-9540_xad0wj.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400219/CHI-8789_lntzpl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400219/CHI-8789_lntzpl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400214/CHI-359_vzopw0.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400214/CHI-359_vzopw0.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400212/CHI-1931_rn6te7.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400212/CHI-1931_rn6te7.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400210/CHI-9867_vkoxgk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400210/CHI-9867_vkoxgk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400209/CHI-9127_iyk8v0.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400209/CHI-9127_iyk8v0.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400208/CHI-HotNCold-_icwrgo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400208/CHI-HotNCold-_icwrgo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400205/CHI-5652_gww0pl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400205/CHI-5652_gww0pl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400203/CHI-5927_sbp0gf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400203/CHI-5927_sbp0gf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400201/CHI-1342_lmjfl3.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400201/CHI-1342_lmjfl3.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400200/CHI-8849_ou9flh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400200/CHI-8849_ou9flh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400199/CHI-9692_hdr8cv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400199/CHI-9692_hdr8cv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400195/CHI-12-17-DSCF0612_cncmyo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400195/CHI-12-17-DSCF0612_cncmyo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400194/CHI-01-21-DSCF9573_mv56b0.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400194/CHI-01-21-DSCF9573_mv56b0.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400192/CHI-01-21-DSCF9381_ckmkzy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400192/CHI-01-21-DSCF9381_ckmkzy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400191/CHI-01-21-DSCF9440_zzoxm3.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400191/CHI-01-21-DSCF9440_zzoxm3.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400190/CHI-07-19-DSCF9956_ht1m89.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400190/CHI-07-19-DSCF9956_ht1m89.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400188/CHI-08-19-DSCF5471_nut7mw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400188/CHI-08-19-DSCF5471_nut7mw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400187/CHI-09-19-DSCF5133_vegfdb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400187/CHI-09-19-DSCF5133_vegfdb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400185/CHI-08-16-_DSF2471_thl7cz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400185/CHI-08-16-_DSF2471_thl7cz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400184/CHI-Eclipse-04-24-DSCF6525_sf4rsa.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400184/CHI-Eclipse-04-24-DSCF6525_sf4rsa.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400182/CHI-06-18-DSCF1870-Edit-2_ikpvhu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400182/CHI-06-18-DSCF1870-Edit-2_ikpvhu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400182/CHI-06-18-DSCF1342-Enhanced-NR_cfuwww.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400182/CHI-06-18-DSCF1342-Enhanced-NR_cfuwww.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400179/CHI-09-19-DSCF1288_vfju4l.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400179/CHI-09-19-DSCF1288_vfju4l.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400178/CHI-09-19-DSCF1295_bvowoq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400178/CHI-09-19-DSCF1295_bvowoq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400176/CHI-01-19-DSCF7976_joyqzs.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400176/CHI-01-19-DSCF7976_joyqzs.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400175/CHI-09-19-DSCF1377_zitot9.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400175/CHI-09-19-DSCF1377_zitot9.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400014/CHI-2084-Website-2_aa9b0b.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400014/CHI-2084-Website-2_aa9b0b.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620661/CHI-Beloveful6.jpg-nggid03317-ngg0dyn-180x0-00f0w010c010r110f110r010t010_bvetbt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620661/CHI-Beloveful6.jpg-nggid03317-ngg0dyn-180x0-00f0w010c010r110f110r010t010_bvetbt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620660/CHI-Beloveful6.jpg-nggid03317-ngg0dyn-120x90-00f0w010c011r110f110r010t010_a6z3yb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620660/CHI-Beloveful6.jpg-nggid03317-ngg0dyn-120x90-00f0w010c011r110f110r010t010_a6z3yb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620621/CHI-DSCF9471.jpg-nggid03315-ngg0dyn-180x0-00f0w010c010r110f110r010t010_seh9do.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620621/CHI-DSCF9471.jpg-nggid03315-ngg0dyn-180x0-00f0w010c010r110f110r010t010_seh9do.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620621/CHI-DSCF9471.jpg-nggid03315-ngg0dyn-120x90-00f0w010c011r110f110r010t010_gkt5na.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620621/CHI-DSCF9471.jpg-nggid03315-ngg0dyn-120x90-00f0w010c011r110f110r010t010_gkt5na.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620617/CHI-DSCF9471_vukjxy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620617/CHI-DSCF9471_vukjxy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620610/CHI-Beloveful6_fznavp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620610/CHI-Beloveful6_fznavp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620604/CHI-Beloveful6_wjllrg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620604/CHI-Beloveful6_wjllrg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620602/CHI-DSCF9471_fuc2pl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620602/CHI-DSCF9471_fuc2pl.jpg" }
    ]
  },
  {
    "region": "Asia",
    "country": "India",
    "slug": "india",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466089/IND-MeniasTony_8_kfjhfw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466089/IND-MeniasTony_8_kfjhfw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466086/IND-MeniasTony_16_lp3vsf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466086/IND-MeniasTony_16_lp3vsf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466072/IND-MeniasTony_14_uqvgsq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466072/IND-MeniasTony_14_uqvgsq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620814/IND-4681.jpg-nggid03296-ngg0dyn-0x360-00f0w010c010r110f110r010t010_pnhgzy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620814/IND-4681.jpg-nggid03296-ngg0dyn-0x360-00f0w010c010r110f110r010t010_pnhgzy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620808/IND-4681_tvjvc1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620808/IND-4681_tvjvc1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620807/IND-4681_rh0wgo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620807/IND-4681_rh0wgo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620744/IND-7083.jpg-nggid03273-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xhiogf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620744/IND-7083.jpg-nggid03273-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xhiogf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620741/IND-6285.jpg-nggid03278-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mp3zhl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620741/IND-6285.jpg-nggid03278-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mp3zhl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620739/IND-7067.jpg-nggid03274-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ixgzge.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620739/IND-7067.jpg-nggid03274-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ixgzge.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620738/IND-4740.jpg-nggid03269-ngg0dyn-180x0-00f0w010c010r110f110r010t010_wqreuz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620738/IND-4740.jpg-nggid03269-ngg0dyn-180x0-00f0w010c010r110f110r010t010_wqreuz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620734/IND-6198.jpg-nggid03279-ngg0dyn-180x0-00f0w010c010r110f110r010t010_gopme1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620734/IND-6198.jpg-nggid03279-ngg0dyn-180x0-00f0w010c010r110f110r010t010_gopme1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620730/IND-6783.jpg-nggid03277-ngg0dyn-180x0-00f0w010c010r110f110r010t010_drbow4.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620730/IND-6783.jpg-nggid03277-ngg0dyn-180x0-00f0w010c010r110f110r010t010_drbow4.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620729/IND-0027.jpg-nggid03263-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nqexkq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620729/IND-0027.jpg-nggid03263-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nqexkq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620728/IND-4213.jpg-nggid03266-ngg0dyn-0x360-00f0w010c010r110f110r010t010_mt21zi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620728/IND-4213.jpg-nggid03266-ngg0dyn-0x360-00f0w010c010r110f110r010t010_mt21zi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620727/IND-7059.jpg-nggid03275-ngg0dyn-180x0-00f0w010c010r110f110r010t010_b7eobg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620727/IND-7059.jpg-nggid03275-ngg0dyn-180x0-00f0w010c010r110f110r010t010_b7eobg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620726/IND-5563.jpg-nggid03271-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mrozny.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620726/IND-5563.jpg-nggid03271-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mrozny.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620723/IND-5525.jpg-nggid03270-ngg0dyn-180x0-00f0w010c010r110f110r010t010_jl9s68.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620723/IND-5525.jpg-nggid03270-ngg0dyn-180x0-00f0w010c010r110f110r010t010_jl9s68.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620723/IND-7032-Website-2.jpg-nggid03276-ngg0dyn-0x360-00f0w010c010r110f110r010t010_uirb74.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620723/IND-7032-Website-2.jpg-nggid03276-ngg0dyn-0x360-00f0w010c010r110f110r010t010_uirb74.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620720/IND-6034.jpg-nggid03280-ngg0dyn-180x0-00f0w010c010r110f110r010t010_kilx9s.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620720/IND-6034.jpg-nggid03280-ngg0dyn-180x0-00f0w010c010r110f110r010t010_kilx9s.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-6285.jpg-nggid03278-ngg0dyn-0x360-00f0w010c010r110f110r010t010_dyod0b.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-6285.jpg-nggid03278-ngg0dyn-0x360-00f0w010c010r110f110r010t010_dyod0b.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-0202.jpg-nggid03264-ngg0dyn-0x360-00f0w010c010r110f110r010t010_s8jmth.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-0202.jpg-nggid03264-ngg0dyn-0x360-00f0w010c010r110f110r010t010_s8jmth.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-4233.jpg-nggid03267-ngg0dyn-180x0-00f0w010c010r110f110r010t010_opadzm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-4233.jpg-nggid03267-ngg0dyn-180x0-00f0w010c010r110f110r010t010_opadzm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-3013.jpg-nggid03265-ngg0dyn-180x0-00f0w010c010r110f110r010t010_yogbgm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-3013.jpg-nggid03265-ngg0dyn-180x0-00f0w010c010r110f110r010t010_yogbgm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620717/IND-7067.jpg-nggid03274-ngg0dyn-0x360-00f0w010c010r110f110r010t010_qs456f.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620717/IND-7067.jpg-nggid03274-ngg0dyn-0x360-00f0w010c010r110f110r010t010_qs456f.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620716/IND-7032-Website-2.jpg-nggid03276-ngg0dyn-180x0-00f0w010c010r110f110r010t010_wpbyvd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620716/IND-7032-Website-2.jpg-nggid03276-ngg0dyn-180x0-00f0w010c010r110f110r010t010_wpbyvd.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620714/IND-4681.jpg-nggid03268-ngg0dyn-0x360-00f0w010c010r110f110r010t010_m8hyue.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620714/IND-4681.jpg-nggid03268-ngg0dyn-0x360-00f0w010c010r110f110r010t010_m8hyue.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/IND-4740_c5rfdh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/IND-4740_c5rfdh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620707/IND-7597_zxvqa5.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620707/IND-7597_zxvqa5.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620705/IND-9375_uesbjr.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620705/IND-9375_uesbjr.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-7032-Website-2_w2frde.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-7032-Website-2_w2frde.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-5525_hd10xe.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-5525_hd10xe.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-4213_iirx43.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-4213_iirx43.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-6783_ptuqta.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-6783_ptuqta.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620701/IND-4233_ffnxfc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620701/IND-4233_ffnxfc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620700/IND-7059_sexjw1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620700/IND-7059_sexjw1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620700/IND-3013_ifykat.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620700/IND-3013_ifykat.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620699/IND-7597_fzp92k.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620699/IND-7597_fzp92k.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620698/IND-7032-Website-3_ry3zq8.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620698/IND-7032-Website-3_ry3zq8.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620697/IND-4740_ygewwy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620697/IND-4740_ygewwy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620697/IND-9375_lzyvap.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620697/IND-9375_lzyvap.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620696/IND-6034_qjoykd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620696/IND-6034_qjoykd.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620694/IND-7059_ouwbjp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620694/IND-7059_ouwbjp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620693/IND-7067_oge5zw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620693/IND-7067_oge5zw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620693/IND-6285_qvtsq6.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620693/IND-6285_qvtsq6.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620692/IND-6285_shwuxq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620692/IND-6285_shwuxq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620691/IND-6783_uou9za.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620691/IND-6783_uou9za.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620691/IND-4681_ff4s7x.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620691/IND-4681_ff4s7x.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620691/IND-6198_jogvpt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620691/IND-6198_jogvpt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620690/IND-7351_i9elxy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620690/IND-7351_i9elxy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620690/IND-4681_rugh2g.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620690/IND-4681_rugh2g.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620689/IND-0202_gj5d4a.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620689/IND-0202_gj5d4a.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620687/IND-0027_l6zus5.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620687/IND-0027_l6zus5.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620686/IND-7083_tzp0gh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620686/IND-7083_tzp0gh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620685/IND-7032-Website-3_ywt48u.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620685/IND-7032-Website-3_ywt48u.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620684/IND-6034_tzbe5g.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620684/IND-6034_tzbe5g.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620664/IND-MadameJodhpur-copy.jpg-nggid03313-ngg0dyn-180x0-00f0w010c010r110f110r010t010_qpwoc9.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620664/IND-MadameJodhpur-copy.jpg-nggid03313-ngg0dyn-180x0-00f0w010c010r110f110r010t010_qpwoc9.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/IND-MeniasTony_16.jpg-nggid03311-ngg0dyn-120x90-00f0w010c011r110f110r010t010_etqpnw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/IND-MeniasTony_16.jpg-nggid03311-ngg0dyn-120x90-00f0w010c011r110f110r010t010_etqpnw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620629/IND-MeniasTony_14.jpg-nggid03312-ngg0dyn-120x90-00f0w010c011r110f110r010t010_ce3tlo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620629/IND-MeniasTony_14.jpg-nggid03312-ngg0dyn-120x90-00f0w010c011r110f110r010t010_ce3tlo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620625/IND-MeniasTony_16.jpg-nggid03311-ngg0dyn-180x0-00f0w010c010r110f110r010t010_o0avxw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620625/IND-MeniasTony_16.jpg-nggid03311-ngg0dyn-180x0-00f0w010c010r110f110r010t010_o0avxw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620624/IND-MeniasTony_14.jpg-nggid03312-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mtsm6f.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620624/IND-MeniasTony_14.jpg-nggid03312-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mtsm6f.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620622/IND-MadameJodhpur-copy.jpg-nggid03313-ngg0dyn-120x90-00f0w010c011r110f110r010t010_qoo7rm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620622/IND-MadameJodhpur-copy.jpg-nggid03313-ngg0dyn-120x90-00f0w010c011r110f110r010t010_qoo7rm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620618/IND-MeniasTony_14_wpf8iz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620618/IND-MeniasTony_14_wpf8iz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620616/IND-MeniasTony_16_qgxdfw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620616/IND-MeniasTony_16_qgxdfw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620616/IND-MeniasTony_16_bggyhp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620616/IND-MeniasTony_16_bggyhp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/IND-MeniasTony_14_ti6mbj.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/IND-MeniasTony_14_ti6mbj.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/IND-MadameJodhpur-copy_bmaq15.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/IND-MadameJodhpur-copy_bmaq15.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620606/IND-MadameJodhpur-copy_drvdld.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620606/IND-MadameJodhpur-copy_drvdld.jpg" }
    ]
  },
  {
    "region": "Asia",
    "country": "Nepal",
    "slug": "nepal",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466088/NEP-Silent_Stare_copy_a8leit.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466088/NEP-Silent_Stare_copy_a8leit.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466087/NEP-DSCF8737_copy_thwoaw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466087/NEP-DSCF8737_copy_thwoaw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8794_gv7u6z.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8794_gv7u6z.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8553_fxnxqo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8553_fxnxqo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NEP-8558_qza5ne.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NEP-8558_qza5ne.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NEP-8516_y3e2nt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NEP-8516_y3e2nt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/NEP-DSCF8737_xpxqsv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/NEP-DSCF8737_xpxqsv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620830/NEP-8701_spc74d.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620830/NEP-8701_spc74d.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/NEP-DSCF8289_ztdqsq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/NEP-DSCF8289_ztdqsq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620828/NEP-Silent_Stare_zde6db.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620828/NEP-Silent_Stare_zde6db.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620663/NEP-Silent-Stare-copy.jpg-nggid03301-ngg0dyn-180x0-00f0w010c010r110f110r010t010_jof63m.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620663/NEP-Silent-Stare-copy.jpg-nggid03301-ngg0dyn-180x0-00f0w010c010r110f110r010t010_jof63m.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620663/NEP-DSCF8737-copy.jpg-nggid03303-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ohtp7j.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620663/NEP-DSCF8737-copy.jpg-nggid03303-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ohtp7j.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620628/NEP-DSCF8737-copy.jpg-nggid03303-ngg0dyn-120x90-00f0w010c011r110f110r010t010_rcxdv3.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620628/NEP-DSCF8737-copy.jpg-nggid03303-ngg0dyn-120x90-00f0w010c011r110f110r010t010_rcxdv3.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/NEP-Silent-Stare-copy.jpg-nggid03301-ngg0dyn-120x90-00f0w010c011r110f110r010t010_bhunfp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/NEP-Silent-Stare-copy.jpg-nggid03301-ngg0dyn-120x90-00f0w010c011r110f110r010t010_bhunfp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620617/NEP-Silent-Stare-copy_cybppv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620617/NEP-Silent-Stare-copy_cybppv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620614/NEP-DSCF8737-copy_j1hbcy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620614/NEP-DSCF8737-copy_j1hbcy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620609/NEP-DSCF8737-copy_xit7df.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620609/NEP-DSCF8737-copy_xit7df.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620601/NEP-Silent-Stare-copy_z7kkuy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620601/NEP-Silent-Stare-copy_z7kkuy.jpg" }
    ]
  },
  {
    "region": "Asia",
    "country": "Myanmar",
    "slug": "myanmar",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466083/MYA-DSCF0783_copy_poimdy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466083/MYA-DSCF0783_copy_poimdy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466079/MYA-DSCF9634_copy_ftq8wd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466079/MYA-DSCF9634_copy_ftq8wd.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/MYA-9925-04-25-17_edkog3.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/MYA-9925-04-25-17_edkog3.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620828/MYA-DSCF0329_lrdjuo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620828/MYA-DSCF0329_lrdjuo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-Morning_Catch_gddpsa.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-Morning_Catch_gddpsa.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-04-17-DSCF0068_svqwrr.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-04-17-DSCF0068_svqwrr.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-1292_dclmsa.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-1292_dclmsa.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-0839_gligvf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-0839_gligvf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620826/MYA-0287-04-28-17_ksekuq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620826/MYA-0287-04-28-17_ksekuq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620825/MYA-0829_asdd3w.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620825/MYA-0829_asdd3w.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620824/MYA-Breathe-0668_kimelh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620824/MYA-Breathe-0668_kimelh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620823/MYA-9588_wgu2bq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620823/MYA-9588_wgu2bq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620823/MYA-DSCF0783_svezte.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620823/MYA-DSCF0783_svezte.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620822/MYA-0098-04-26-17_cimava.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620822/MYA-0098-04-26-17_cimava.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620627/MYA-DSCF0783-copy.jpg-nggid03306-ngg0dyn-180x0-00f0w010c010r110f110r010t010_lsdgkt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620627/MYA-DSCF0783-copy.jpg-nggid03306-ngg0dyn-180x0-00f0w010c010r110f110r010t010_lsdgkt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620620/MYA-DSCF0783-copy.jpg-nggid03306-ngg0dyn-120x90-00f0w010c011r110f110r010t010_h0z5ko.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620620/MYA-DSCF0783-copy.jpg-nggid03306-ngg0dyn-120x90-00f0w010c011r110f110r010t010_h0z5ko.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620609/MYA-DSCF0783-copy_dxu51c.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620609/MYA-DSCF0783-copy_dxu51c.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620601/MYA-DSCF0783-copy_dpjrbi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620601/MYA-DSCF0783-copy_dpjrbi.jpg" }
    ]
  },
  {
    "region": "Asia",
    "country": "Thailand",
    "slug": "thailand",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466082/THAI-DSCF3890_copy_gkaz9v.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466082/THAI-DSCF3890_copy_gkaz9v.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-12-19-DSCF2334_jk2cwl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-12-19-DSCF2334_jk2cwl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-12-19-DSCF3863_sc10lu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-12-19-DSCF3863_sc10lu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-03-17-_DSF4784_tgnnda.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-03-17-_DSF4784_tgnnda.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THA-2687_nhldx0.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THA-2687_nhldx0.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THA-3538_bammx3.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THA-3538_bammx3.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THAI-3405_ue9gcu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THAI-3405_ue9gcu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THAI-4383_k7d6cl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THAI-4383_k7d6cl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620840/THAI-2_u2k6p1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620840/THAI-2_u2k6p1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620840/THAI-3302_qgmz1j.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620840/THAI-3302_qgmz1j.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620839/THAI-3571_fpgzhq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620839/THAI-3571_fpgzhq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620839/THAI-04-17-_DSF5575_zh6ue5.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620839/THAI-04-17-_DSF5575_zh6ue5.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620839/THAI-12-19-DSCF3051_pctgo1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620839/THAI-12-19-DSCF3051_pctgo1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/THAI-12-19-DSCF2642_cvmqzq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/THAI-12-19-DSCF2642_cvmqzq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/THAI-12-19-DSCF2498_qins6j.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/THAI-12-19-DSCF2498_qins6j.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/THAI-01-20-DSCF4704_aq3qsy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/THAI-01-20-DSCF4704_aq3qsy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620837/THAI-12-19-DSCF2460_x1i9r7.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620837/THAI-12-19-DSCF2460_x1i9r7.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620837/THA-2780_najztt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620837/THA-2780_najztt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/THAI-DSCF3890-copy.jpg-nggid03298-ngg0dyn-120x90-00f0w010c011r110f110r010t010_nmheth.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/THAI-DSCF3890-copy.jpg-nggid03298-ngg0dyn-120x90-00f0w010c011r110f110r010t010_nmheth.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620627/THAI-3571.jpg-nggid03322-ngg0dyn-180x0-00f0w010c010r110f110r010t010_s7epyv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620627/THAI-3571.jpg-nggid03322-ngg0dyn-180x0-00f0w010c010r110f110r010t010_s7epyv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620625/THAI-DSCF3890-copy.jpg-nggid03298-ngg0dyn-180x0-00f0w010c010r110f110r010t010_cobw8g.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620625/THAI-DSCF3890-copy.jpg-nggid03298-ngg0dyn-180x0-00f0w010c010r110f110r010t010_cobw8g.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620615/THAI-DSCF3890-copy_qrq2m7.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620615/THAI-DSCF3890-copy_qrq2m7.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620612/THAI-3571_dhw0i0.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620612/THAI-3571_dhw0i0.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620603/THAI-3571_dodkdd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620603/THAI-3571_dodkdd.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620603/THAI-DSCF3890-copy_iacbwr.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620603/THAI-DSCF3890-copy_iacbwr.jpg" }
    ]
  },
  {
    "region": "Europe",
    "country": "France",
    "slug": "france",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396078/FRA-9803_rxwmpi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396078/FRA-9803_rxwmpi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396077/FRA-0366_tduyys.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396077/FRA-0366_tduyys.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396072/FRA-0103_g4s51r.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396072/FRA-0103_g4s51r.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396071/FRA-05-19-18_dsoxmh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396071/FRA-05-19-18_dsoxmh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396070/FRA-05-18-DSCF9815_omhj9m.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396070/FRA-05-18-DSCF9815_omhj9m.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396070/FRA-05-18-18_tctpdw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396070/FRA-05-18-18_tctpdw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396070/FRA-DSCF0125_a1or0b.png", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396070/FRA-DSCF0125_a1or0b.png" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396064/FRA-DSCF9765_pycgqe.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396064/FRA-DSCF9765_pycgqe.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620660/FRA-DSCF0103-copy.jpg-nggid03314-ngg0dyn-180x0-00f0w010c010r110f110r010t010_d6frag.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620660/FRA-DSCF0103-copy.jpg-nggid03314-ngg0dyn-180x0-00f0w010c010r110f110r010t010_d6frag.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/FRA-DSCF0103-copy.jpg-nggid03314-ngg0dyn-120x90-00f0w010c011r110f110r010t010_bqniq6.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/FRA-DSCF0103-copy.jpg-nggid03314-ngg0dyn-120x90-00f0w010c011r110f110r010t010_bqniq6.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620609/FRA-DSCF0103-copy_piga2k.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620609/FRA-DSCF0103-copy_piga2k.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620599/FRA-DSCF0103-copy_gu4a5g.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620599/FRA-DSCF0103-copy_gu4a5g.jpg" }
    ]
  },
  {
    "region": "Asia",
    "country": "Philippines",
    "slug": "philippines",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466074/PHI-1662_copy_tmaoz6.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466074/PHI-1662_copy_tmaoz6.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/PHI-0660_vupz0p.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/PHI-0660_vupz0p.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620859/PHI-12-19-DSCF1239_l3qcjj.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620859/PHI-12-19-DSCF1239_l3qcjj.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620859/PHI-1157_ztn3ew.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620859/PHI-1157_ztn3ew.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/PHI-9895_wnvbet.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/PHI-9895_wnvbet.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/PHI-12-19-DSCF8950_uwz1oc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/PHI-12-19-DSCF8950_uwz1oc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/PHI-12-19-DSCF1329_lzhtok.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/PHI-12-19-DSCF1329_lzhtok.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620857/PHI-12-19-DSCF0399_fvtubt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620857/PHI-12-19-DSCF0399_fvtubt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620856/PHI-2331_no1pev.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620856/PHI-2331_no1pev.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620856/PHI-9879-copy_s0mex7.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620856/PHI-9879-copy_s0mex7.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620855/PHI-1179_oyh2ib.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620855/PHI-1179_oyh2ib.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/PHI-9214_mijyiq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/PHI-9214_mijyiq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/PHI-9879-copy_synnev.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/PHI-9879-copy_synnev.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/PHI-1662_xft2m7.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/PHI-1662_xft2m7.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620853/PHI-9214_hygrzm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620853/PHI-9214_hygrzm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620853/PHI-12-19-DSCF0399_omgyi8.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620853/PHI-12-19-DSCF0399_omgyi8.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620853/PHI-9525_defhnk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620853/PHI-9525_defhnk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620852/PHI-12-19-DSCF8950_zm4ybs.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620852/PHI-12-19-DSCF8950_zm4ybs.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620852/PHI-2331_cmrmat.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620852/PHI-2331_cmrmat.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620851/PHI-1179_evl7yj.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620851/PHI-1179_evl7yj.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620851/PHI-9525_brxlr2.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620851/PHI-9525_brxlr2.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620850/PHI-12-19-DSCF1239_k8avfm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620850/PHI-12-19-DSCF1239_k8avfm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620850/PHI-12-19-DSCF1453_bj40gb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620850/PHI-12-19-DSCF1453_bj40gb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620849/PHI-1157_hr7aoi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620849/PHI-1157_hr7aoi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620849/PHI-12-19-DSCF2268_zxctur.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620849/PHI-12-19-DSCF2268_zxctur.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620848/PHI-0660_ddvhjq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620848/PHI-0660_ddvhjq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620847/PHI-2070_n1xsch.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620847/PHI-2070_n1xsch.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620847/PHI-12-19-DSCF1329_lwv2fm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620847/PHI-12-19-DSCF1329_lwv2fm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-1662_odkrbz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-1662_odkrbz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-1052_ppou11.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-1052_ppou11.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-12-19-DSCF1453_zjahji.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-12-19-DSCF1453_zjahji.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-2070_gkusmu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-2070_gkusmu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620845/PHI-1052_kda8vf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620845/PHI-1052_kda8vf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620844/PHI-12-19-DSCF2268_gntd1y.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620844/PHI-12-19-DSCF2268_gntd1y.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620844/PHI-9895_lawc2h.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620844/PHI-9895_lawc2h.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620659/PHI-1662-copy.jpg-nggid03302-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xadovi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620659/PHI-1662-copy.jpg-nggid03302-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xadovi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/PHI-2331.jpg-nggid03323-ngg0dyn-180x0-00f0w010c010r110f110r010t010_tvkzgq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/PHI-2331.jpg-nggid03323-ngg0dyn-180x0-00f0w010c010r110f110r010t010_tvkzgq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/PHI-1662-copy.jpg-nggid03302-ngg0dyn-120x90-00f0w010c011r110f110r010t010_tptll6.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/PHI-1662-copy.jpg-nggid03302-ngg0dyn-120x90-00f0w010c011r110f110r010t010_tptll6.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620612/PHI-2331_aonz6h.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620612/PHI-2331_aonz6h.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/PHI-1662-copy_qlf90s.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/PHI-1662-copy_qlf90s.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620605/PHI-2331_lrp5pu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620605/PHI-2331_lrp5pu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620600/PHI-1662-copy_eojyfm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620600/PHI-1662-copy_eojyfm.jpg" }
    ]
  },
  {
    "region": "Asia",
    "country": "Japan",
    "slug": "japan",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466070/JAP-3265_zrv1pe.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466070/JAP-3265_zrv1pe.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF2819_awss97.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF2819_awss97.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF3291_eqvftc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF3291_eqvftc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF3101_cyash8.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF3101_cyash8.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-03-17-_DSF2579_jgpine.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-03-17-_DSF2579_jgpine.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3636-03-24-17_m2s1dz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3636-03-24-17_m2s1dz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-03-17-_DSF3067-Enhanced-NR_lolbrt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-03-17-_DSF3067-Enhanced-NR_lolbrt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3521-03-17-_DSF3520-Enhanced-NR_abrsod.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3521-03-17-_DSF3520-Enhanced-NR_abrsod.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620803/JAP-03-17-_DSF2918_rkcvov.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620803/JAP-03-17-_DSF2918_rkcvov.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620802/JAP-2670_lcbqlv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620802/JAP-2670_lcbqlv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620802/JAP-3608_gnylxy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620802/JAP-3608_gnylxy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/JAP-4028_xdk6sm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/JAP-4028_xdk6sm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/JAP-3065_ej4dqf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/JAP-3065_ej4dqf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/JAP-03-17-_DSF2807_h7noxi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/JAP-03-17-_DSF2807_h7noxi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620800/JAP-3107_yluc7l.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620800/JAP-3107_yluc7l.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620800/JAP-3291_a2rdvn.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620800/JAP-3291_a2rdvn.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620658/JAP-3265.jpg-nggid03309-ngg0dyn-120x90-00f0w010c011r110f110r010t010_may0cv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620658/JAP-3265.jpg-nggid03309-ngg0dyn-120x90-00f0w010c011r110f110r010t010_may0cv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620631/JAP-3265.jpg-nggid03309-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nf5oyz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620631/JAP-3265.jpg-nggid03309-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nf5oyz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/JAP-3265_wlfvhp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/JAP-3265_wlfvhp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620604/JAP-3265_zy7d74.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620604/JAP-3265_zy7d74.jpg" }
    ]
  },
  {
    "region": "Europe",
    "country": "Spain",
    "slug": "spain",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396529/ESP-4401_f610hw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396529/ESP-4401_f610hw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396527/ESP-4399_tomzgn.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396527/ESP-4399_tomzgn.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396525/ESP-4279_pwutdj.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396525/ESP-4279_pwutdj.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620937/ESP-4399_hymjd2.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620937/ESP-4399_hymjd2.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620936/ESP-4279_etky4d.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620936/ESP-4279_etky4d.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620936/ESP-4401_aaptl0.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620936/ESP-4401_aaptl0.jpg" }
    ]
  },
  {
    "region": "Europe",
    "country": "UK & Ireland",
    "slug": "uk-ireland",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396443/UK-1457012819_vvgveb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396443/UK-1457012819_vvgveb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396439/UK-1871_luujb1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396439/UK-1871_luujb1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396436/UK-0458_pbf4ga.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396436/UK-0458_pbf4ga.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396433/UK-0452_pryun8.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396433/UK-0452_pryun8.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396431/UK-01-19-DSCF1744_b0i4qn.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396431/UK-01-19-DSCF1744_b0i4qn.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396429/UK-01-19-DSCF1565_vjuljk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396429/UK-01-19-DSCF1565_vjuljk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396426/UK-01-19-DSCF1484_ppx52t.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396426/UK-01-19-DSCF1484_ppx52t.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396421/IRL-3258_scvvay.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396421/IRL-3258_scvvay.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396421/IRL-2832_ppdybu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396421/IRL-2832_ppdybu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396419/IRL-3046_jxcqqt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396419/IRL-3046_jxcqqt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396418/IRL-2972_z6lacp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396418/IRL-2972_z6lacp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396413/IRL-2855_nnudt1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396413/IRL-2855_nnudt1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396409/IRL-2676_tu8siv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396409/IRL-2676_tu8siv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396408/IRL-2348_j8hych.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396408/IRL-2348_j8hych.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396406/IRL-2491_u8etxs.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396406/IRL-2491_u8etxs.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396402/IRL-2324_seyxw3.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396402/IRL-2324_seyxw3.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396399/IRL-10-18-DSCF3233_urnn11.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396399/IRL-10-18-DSCF3233_urnn11.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620946/UK-0452_mhbojo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620946/UK-0452_mhbojo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620946/IRL-2855_gzw6tr.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620946/IRL-2855_gzw6tr.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620946/IRL-2324_f24wcf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620946/IRL-2324_f24wcf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/IRL-2972_ripupa.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/IRL-2972_ripupa.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/UK-1871_hojrhl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/UK-1871_hojrhl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/UK-01-19-DSCF1484_vr961f.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/UK-01-19-DSCF1484_vr961f.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/IRL-3258_jtidhf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/IRL-3258_jtidhf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620944/UK-01-19-DSCF1565_vx0cdt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620944/UK-01-19-DSCF1565_vx0cdt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620944/UK-01-19-DSCF1744_vxna03.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620944/UK-01-19-DSCF1744_vxna03.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620944/IRL-10-18-DSCF3233_gcmkuk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620944/IRL-10-18-DSCF3233_gcmkuk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620943/UK-0458_djqeug.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620943/UK-0458_djqeug.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620943/IRL-3046_guyvbu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620943/IRL-3046_guyvbu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620943/IRL-2491_qgjvez.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620943/IRL-2491_qgjvez.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620942/IRL-2676_kq7bs7.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620942/IRL-2676_kq7bs7.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620940/IRL-2832_joy6mn.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620940/IRL-2832_joy6mn.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620940/IRL-2348_ehsww9.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620940/IRL-2348_ehsww9.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620938/UK-1457012819_fnikmo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620938/UK-1457012819_fnikmo.jpg" }
    ]
  },
  {
    "region": "Europe",
    "country": "Greece",
    "slug": "greece",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395926/GRE-06-17-DSCF4387_mgl4lt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395926/GRE-06-17-DSCF4387_mgl4lt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395924/GRE-06-17-DSCF3545_u91ydm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395924/GRE-06-17-DSCF3545_u91ydm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395924/GRE-06-17-DSCF3935_aqs5f8.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395924/GRE-06-17-DSCF3935_aqs5f8.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395920/GRE-06-17-DSCF3354_gvdjqz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395920/GRE-06-17-DSCF3354_gvdjqz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395916/GRE-06-17-DSCF3945_a3f04t.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395916/GRE-06-17-DSCF3945_a3f04t.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395914/GRE-06-17-DSCF3374_nq6s1s.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395914/GRE-06-17-DSCF3374_nq6s1s.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395912/GRC-4135_zvjfqf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395912/GRC-4135_zvjfqf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620927/GRE-06-17-DSCF3354_omvaal.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620927/GRE-06-17-DSCF3354_omvaal.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620926/GRE-06-17-DSCF3935_ebyyij.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620926/GRE-06-17-DSCF3935_ebyyij.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620926/GRE-06-17-DSCF3374_qucydd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620926/GRE-06-17-DSCF3374_qucydd.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620923/GRE-06-17-DSCF3945_xm8zag.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620923/GRE-06-17-DSCF3945_xm8zag.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620923/GRE-06-17-DSCF3545_h7bbzs.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620923/GRE-06-17-DSCF3545_h7bbzs.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/GRE-06-17-DSCF4387_masuwm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/GRE-06-17-DSCF4387_masuwm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/GRC-4135_owc6pu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/GRC-4135_owc6pu.jpg" }
    ]
  },
  {
    "region": "Europe",
    "country": "Italy",
    "slug": "italy",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395887/ITA-06-19-DSCF7678_fx2ick.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395887/ITA-06-19-DSCF7678_fx2ick.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395883/ITA-06-19-DSCF7223-2_ntwqdp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395883/ITA-06-19-DSCF7223-2_ntwqdp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395883/ITA-06-19-DSCF7366_ctzmgg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395883/ITA-06-19-DSCF7366_ctzmgg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395880/ITA-06-19-DSCF6993_iebkie.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395880/ITA-06-19-DSCF6993_iebkie.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395880/ITA-06-19-DSCF6262_rfhqli.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395880/ITA-06-19-DSCF6262_rfhqli.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395877/ITA-06-19-DSCF5753_jtqvpi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395877/ITA-06-19-DSCF5753_jtqvpi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395876/ITA-06-19-DSCF5382_aoi8gm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395876/ITA-06-19-DSCF5382_aoi8gm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395874/ITA-06-19-DSCF5220_qknqxp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395874/ITA-06-19-DSCF5220_qknqxp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395873/ITA-06-19-DSCF4707_sryn8k.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395873/ITA-06-19-DSCF4707_sryn8k.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395872/ITA-7678_ubliex.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395872/ITA-7678_ubliex.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395869/ITA-7475_jl5xla.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395869/ITA-7475_jl5xla.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395868/ITA-7114_vksyaj.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395868/ITA-7114_vksyaj.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395866/ITA-7083_xeauja.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395866/ITA-7083_xeauja.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395865/ITA-6886_g0ntud.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395865/ITA-6886_g0ntud.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395862/ITA-6849_zprglp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395862/ITA-6849_zprglp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395861/ITA-6842_wkw2zb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395861/ITA-6842_wkw2zb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395859/ITA-6300_copy_ejyry8.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395859/ITA-6300_copy_ejyry8.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395859/ITA-6828_h63aiy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395859/ITA-6828_h63aiy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395858/ITA-6796-Website-2_uuwswh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395858/ITA-6796-Website-2_uuwswh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395856/ITA-5491_vxpeby.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395856/ITA-5491_vxpeby.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395853/ITA-06-19-DSCF7323_brute9.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395853/ITA-06-19-DSCF7323_brute9.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395852/ITA-06-19-DSCF6864_rcyu26.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395852/ITA-06-19-DSCF6864_rcyu26.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395851/ITA-06-19-DSCF6817_vz0u22.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395851/ITA-06-19-DSCF6817_vz0u22.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395849/ITA-06-19-DSCF6766_v055po.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395849/ITA-06-19-DSCF6766_v055po.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395846/ITA-06-19-DSCF6413_vnwhpr.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395846/ITA-06-19-DSCF6413_vnwhpr.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395845/ITA-06-19-DSCF6092_ttfodt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395845/ITA-06-19-DSCF6092_ttfodt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395843/ITA-06-19-DSCF5929_h7hohy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395843/ITA-06-19-DSCF5929_h7hohy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395842/ITA-06-19-DSCF5847_t3agru.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395842/ITA-06-19-DSCF5847_t3agru.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395840/ITA-06-19-DSCF5719_qsfcn9.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395840/ITA-06-19-DSCF5719_qsfcn9.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395838/ITA-06-19-DSCF5412_vnu5z6.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395838/ITA-06-19-DSCF5412_vnu5z6.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395837/ITA-06-19-DSCF4624_ivgb0m.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395837/ITA-06-19-DSCF4624_ivgb0m.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395835/ITA-06-19-DSCF4216_p5dzgo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395835/ITA-06-19-DSCF4216_p5dzgo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395834/ITA-06-19-19_njgcld.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395834/ITA-06-19-19_njgcld.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395833/ITA-06-15-19-2_cvrzgl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395833/ITA-06-15-19-2_cvrzgl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395833/ITA-06-15-19_ksnfuk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395833/ITA-06-15-19_ksnfuk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395829/ITA-7800_hrbeim.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395829/ITA-7800_hrbeim.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395827/ITA-5487_kzdmc0.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395827/ITA-5487_kzdmc0.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395826/ITA-7323_allcjx.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395826/ITA-7323_allcjx.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395824/ITA-6952_b1kfcq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395824/ITA-6952_b1kfcq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395823/ITA-7041_bbpuhk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395823/ITA-7041_bbpuhk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395823/ITA-6160_xh9pmt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395823/ITA-6160_xh9pmt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395821/ITA-6300_xw6sox.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395821/ITA-6300_xw6sox.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395816/ITA-5470_k7stuy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395816/ITA-5470_k7stuy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395815/ITA-5275_cgn76o.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395815/ITA-5275_cgn76o.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395813/ITA-5267_w1mddd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395813/ITA-5267_w1mddd.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395810/ITA-5252-Website-2_mwb9eg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395810/ITA-5252-Website-2_mwb9eg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395806/ITA-5252_eftkeo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395806/ITA-5252_eftkeo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395805/ITA-5223_ensfzp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395805/ITA-5223_ensfzp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395802/ITA-5209_iyqwnk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395802/ITA-5209_iyqwnk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395802/ITA-5212_vsx5pv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395802/ITA-5212_vsx5pv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395801/ITA-5220_qo5fs6.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395801/ITA-5220_qo5fs6.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395797/ITA-5193_p7b8sp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395797/ITA-5193_p7b8sp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395793/ITA-5047_vwluei.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395793/ITA-5047_vwluei.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395790/ITA-5030_mztsis.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395790/ITA-5030_mztsis.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395777/ITA-5013_wgt5vh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395777/ITA-5013_wgt5vh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395776/ITA-4995_c2eqdu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395776/ITA-4995_c2eqdu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395775/ITA-4935_uhq82w.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395775/ITA-4935_uhq82w.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395770/ITA-6796_zh2cin.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395770/ITA-6796_zh2cin.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395771/ITA-4755_sda4tl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395771/ITA-4755_sda4tl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395766/ITA-5257_cwv3sg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395766/ITA-5257_cwv3sg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395766/ITA-3816_jskwty.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395766/ITA-3816_jskwty.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395765/ITA-06-19-DSCF6987_reyy29.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395765/ITA-06-19-DSCF6987_reyy29.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395763/ITA-5507_rp7lla.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395763/ITA-5507_rp7lla.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395763/ITA-6092_dtjk7w.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395763/ITA-6092_dtjk7w.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395762/ITA-5847_x9ra95.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395762/ITA-5847_x9ra95.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395755/ITA-5261_qghy13.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395755/ITA-5261_qghy13.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395751/ITA-5208_dez7bc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395751/ITA-5208_dez7bc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395751/ITA-5218_wgszth.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395751/ITA-5218_wgszth.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395747/ITA-5199_hruck4.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395747/ITA-5199_hruck4.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395745/ITA-4096_ribgno.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395745/ITA-4096_ribgno.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395742/ITA-3723_jit6dn.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395742/ITA-3723_jit6dn.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395715/ITA-DSCF6964_ymu4nb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395715/ITA-DSCF6964_ymu4nb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395713/ITA-4985_hyehjz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395713/ITA-4985_hyehjz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395209/ITA-DSCF6964_hni4vg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395209/ITA-DSCF6964_hni4vg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395205/ITA-4985_nvbbiq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395205/ITA-4985_nvbbiq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/ITA-06-19-DSCF7366_ogk0wz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/ITA-06-19-DSCF7366_ogk0wz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620921/ITA-06-19-DSCF5220_cligis.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620921/ITA-06-19-DSCF5220_cligis.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620921/ITA-06-19-DSCF5929_we3xot.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620921/ITA-06-19-DSCF5929_we3xot.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620920/ITA-06-19-DSCF5753_l5lrlz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620920/ITA-06-19-DSCF5753_l5lrlz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620920/ITA-06-19-DSCF7678_efilvw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620920/ITA-06-19-DSCF7678_efilvw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620920/ITA-06-19-DSCF5412_yvy3fr.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620920/ITA-06-19-DSCF5412_yvy3fr.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620919/ITA-06-19-DSCF6987_lvcsxs.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620919/ITA-06-19-DSCF6987_lvcsxs.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620919/ITA-06-19-DSCF4707_fzjblf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620919/ITA-06-19-DSCF4707_fzjblf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620919/ITA-06-19-DSCF7223-2_wkxy2m.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620919/ITA-06-19-DSCF7223-2_wkxy2m.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-19-19_b3tddf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-19-19_b3tddf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-19-DSCF6993_hmrany.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-19-DSCF6993_hmrany.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-19-DSCF6413_klepxc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-19-DSCF6413_klepxc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-15-19-2_mbsoyf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-15-19-2_mbsoyf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620917/ITA-6300_copy_goidlv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620917/ITA-6300_copy_goidlv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620917/ITA-6886_u9kgtn.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620917/ITA-6886_u9kgtn.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620917/ITA-06-19-DSCF5719_oszpp1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620917/ITA-06-19-DSCF5719_oszpp1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620916/ITA-06-19-DSCF6092_cetqiz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620916/ITA-06-19-DSCF6092_cetqiz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620916/ITA-7083_b8kkfh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620916/ITA-7083_b8kkfh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620916/ITA-06-19-DSCF6864_jv7bfz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620916/ITA-06-19-DSCF6864_jv7bfz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620915/ITA-06-19-DSCF6766_nuow1a.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620915/ITA-06-19-DSCF6766_nuow1a.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620915/ITA-7475_hkyaic.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620915/ITA-7475_hkyaic.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620915/ITA-5491_xn3vz5.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620915/ITA-5491_xn3vz5.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620914/ITA-06-19-DSCF4216_zppwxw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620914/ITA-06-19-DSCF4216_zppwxw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620914/ITA-06-19-DSCF5382_o5yipq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620914/ITA-06-19-DSCF5382_o5yipq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620914/ITA-06-15-19_jrg0hp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620914/ITA-06-15-19_jrg0hp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-7114_tzyqgy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-7114_tzyqgy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-06-19-DSCF6817_fr12vo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-06-19-DSCF6817_fr12vo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-06-19-DSCF7323_qndlbe.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-06-19-DSCF7323_qndlbe.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-7041_veqcoe.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-7041_veqcoe.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-5470_fkibpm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-5470_fkibpm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-6842_x4kkyn.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-6842_x4kkyn.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-06-19-DSCF5847_lobxeo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-06-19-DSCF5847_lobxeo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-5487_jwuinc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-5487_jwuinc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-06-19-DSCF4624_aym0mb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-06-19-DSCF4624_aym0mb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620911/ITA-7678_lgir2y.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620911/ITA-7678_lgir2y.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620910/ITA-5047_fy9mf9.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620910/ITA-5047_fy9mf9.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620910/ITA-6160_i6yw0b.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620910/ITA-6160_i6yw0b.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620909/ITA-5030_bw1y9h.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620909/ITA-5030_bw1y9h.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620910/ITA-4995_iz4t9v.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620910/ITA-4995_iz4t9v.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620909/ITA-5252-Website-2_jvdgol.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620909/ITA-5252-Website-2_jvdgol.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620909/ITA-6849_txqrtq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620909/ITA-6849_txqrtq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/ITA-6828_c5n81z.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/ITA-6828_c5n81z.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/ITA-6952_rrfmov.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/ITA-6952_rrfmov.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/ITA-6796-Website-2_jkenjw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/ITA-6796-Website-2_jkenjw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620907/ITA-5218_mw2xhx.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620907/ITA-5218_mw2xhx.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620907/ITA-6300_q1lma3.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620907/ITA-6300_q1lma3.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620907/ITA-5223_i6iofw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620907/ITA-5223_i6iofw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620906/ITA-4935_amg8bg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620906/ITA-4935_amg8bg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620906/ITA-3816_vwqkdf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620906/ITA-3816_vwqkdf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620906/ITA-4755_kzkaqb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620906/ITA-4755_kzkaqb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-7800_w1enov.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-7800_w1enov.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-5257_lilgvq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-5257_lilgvq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-5220_fu0jjm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-5220_fu0jjm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-5267_tpvgyt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-5267_tpvgyt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620904/ITA-7323_zhoddk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620904/ITA-7323_zhoddk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620904/ITA-5209_fnrzei.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620904/ITA-5209_fnrzei.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/ITA-5252_hquggq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/ITA-5252_hquggq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/ITA-5212_eqttus.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/ITA-5212_eqttus.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/ITA-5013_fzs3hi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/ITA-5013_fzs3hi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-5193_sqwohf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-5193_sqwohf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-3723_felkch.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-3723_felkch.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-5261_v9yfzh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-5261_v9yfzh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-6092_qkmz6w.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-6092_qkmz6w.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620901/ITA-5208_gy7npg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620901/ITA-5208_gy7npg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620901/ITA-5275_pvyhxm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620901/ITA-5275_pvyhxm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620900/ITA-5847_ksbceu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620900/ITA-5847_ksbceu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620900/ITA-5199_cg2ph0.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620900/ITA-5199_cg2ph0.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620899/ITA-6796_vfxim1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620899/ITA-6796_vfxim1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/ITA-4096_ytnyad.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/ITA-4096_ytnyad.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/ITA-5507_woxfqe.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/ITA-5507_woxfqe.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/ITA-4985_xxusox.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/ITA-4985_xxusox.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620891/ITA-DSCF6964_b5y2hz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620891/ITA-DSCF6964_b5y2hz.jpg" }
    ]
  },
  {
    "region": "Africa",
    "country": "Ethiopia",
    "slug": "ethiopia",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/ETH-03-14-IMG_1327_pltrne.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/ETH-03-14-IMG_1327_pltrne.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/ETH-03-14-IMG_2202_vn1mwt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/ETH-03-14-IMG_2202_vn1mwt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/ETH-03-14-IMG_1671_t6fjfc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/ETH-03-14-IMG_1671_t6fjfc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/ETH-2206_lundkq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/ETH-2206_lundkq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/ETH-03-14-IMG_1851_mxvvrr.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/ETH-03-14-IMG_1851_mxvvrr.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/ETH-03-14-IMG_1203_ocemca.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/ETH-03-14-IMG_1203_ocemca.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/ETH-1076_epz2yh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/ETH-1076_epz2yh.jpg" }
    ]
  },
  {
    "region": "Africa",
    "country": "Namibia",
    "slug": "namibia",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621045/NAM-11-22-DSCF8007_igcf5l.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621045/NAM-11-22-DSCF8007_igcf5l.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621044/NAM-11-22-DSCF8053_zbbdiv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621044/NAM-11-22-DSCF8053_zbbdiv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621044/NAM-11-22-DSCF8100_c36s7p.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621044/NAM-11-22-DSCF8100_c36s7p.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621042/NAM-03-18-DSCF3974-2_wisjdt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621042/NAM-03-18-DSCF3974-2_wisjdt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621043/NAM-11-22-DSCF8027_ww0n6i.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621043/NAM-11-22-DSCF8027_ww0n6i.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621043/NAM-11-22-DSCF8058_jyfppl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621043/NAM-11-22-DSCF8058_jyfppl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621043/NAM-03-18-DSCF4225_rf0ocf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621043/NAM-03-18-DSCF4225_rf0ocf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621042/NAM-11-22-DSCF8086_hzb2al.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621042/NAM-11-22-DSCF8086_hzb2al.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621042/NAM-03-18-DSCF3994-2_j52uxi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621042/NAM-03-18-DSCF3994-2_j52uxi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-11-22-DSCF8069_s0sfqh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-11-22-DSCF8069_s0sfqh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-11-22-DSCF8065_csokqz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-11-22-DSCF8065_csokqz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-11-22-DSCF8077_tl3ovq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-11-22-DSCF8077_tl3ovq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-03-18-DSCF4108_egoca5.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-03-18-DSCF4108_egoca5.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/NAM-03-18-DSCF3946_hd7bdg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/NAM-03-18-DSCF3946_hd7bdg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/NAM-11-22-DSCF8088_pzgoe6.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/NAM-11-22-DSCF8088_pzgoe6.jpg" }
    ]
  },
  {
    "region": "Africa",
    "country": "Egypt",
    "slug": "egypt",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/EGY-68_y6bkd2.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/EGY-68_y6bkd2.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/EGY-1030_tmdg4s.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/EGY-1030_tmdg4s.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/EGY-337_lg0guc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/EGY-337_lg0guc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-1064_zdf7hn.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-1064_zdf7hn.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-160_bjue1z.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-160_bjue1z.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-698_xpvwc0.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-698_xpvwc0.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-174_uziqy8.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-174_uziqy8.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-565-Website-3_ojuwmi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-565-Website-3_ojuwmi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-869_ujdg3k.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-869_ujdg3k.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-618_chevek.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-618_chevek.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-888_vhl0tl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-888_vhl0tl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-946_v5ldvm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-946_v5ldvm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-148_copy_ccgtjs.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-148_copy_ccgtjs.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-445_fx92a5.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-445_fx92a5.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-917_yi0yxv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-917_yi0yxv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-565-Website-2_dk5fxb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-565-Website-2_dk5fxb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-422_gyv52e.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-422_gyv52e.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-110_twsqs3.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-110_twsqs3.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-585_lshm5r.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-585_lshm5r.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-617_l347ue.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-617_l347ue.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-593_jzugfp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-593_jzugfp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-493_yytmit.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-493_yytmit.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-571_fjskmj.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-571_fjskmj.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-42_mdsysd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-42_mdsysd.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621032/EGY-280_n1um5h.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621032/EGY-280_n1um5h.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621032/EGY-565_copy_lomsva.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621032/EGY-565_copy_lomsva.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621032/EGY-203_zmi8sn.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621032/EGY-203_zmi8sn.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621031/EGY-134_wnlkrz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621031/EGY-134_wnlkrz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621031/EGY-467_spxldi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621031/EGY-467_spxldi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621031/EGY-255_akvon6.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621031/EGY-255_akvon6.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621030/EGY-94_t416ie.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621030/EGY-94_t416ie.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621030/EGY-503_uxaswm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621030/EGY-503_uxaswm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621029/EGY-312_wzdwoi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621029/EGY-312_wzdwoi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621029/EGY-350_mzguxd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621029/EGY-350_mzguxd.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621029/EGY-114_zm260d.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621029/EGY-114_zm260d.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621028/EGY-154_on2wxz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621028/EGY-154_on2wxz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621028/EGY-178_nhny7l.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621028/EGY-178_nhny7l.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621028/EGY-121_ktoy5f.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621028/EGY-121_ktoy5f.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621027/EGY-525_z2s5ep.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621027/EGY-525_z2s5ep.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621027/EGY-277_fpt90b.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621027/EGY-277_fpt90b.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621027/EGY-53_copy_nmrxma.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621027/EGY-53_copy_nmrxma.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-95_bo57j7.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-95_bo57j7.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-128_j02ulw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-128_j02ulw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-143_wcladi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-143_wcladi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-260_qjcdvv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-260_qjcdvv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621025/EGY-76_fwyikl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621025/EGY-76_fwyikl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621025/EGY-205_bsqnrg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621025/EGY-205_bsqnrg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621025/EGY-287_fgvcio.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621025/EGY-287_fgvcio.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-346_pieeu5.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-346_pieeu5.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-1143_kukepv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-1143_kukepv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-120_pqni5f.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-120_pqni5f.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-130_xfq1kr.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-130_xfq1kr.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621023/EGY-1178_fsr2zw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621023/EGY-1178_fsr2zw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621023/EGY-365_vha9pg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621023/EGY-365_vha9pg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621022/EGY-51_cdhacv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621022/EGY-51_cdhacv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621022/EGY-374_tzvz01.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621022/EGY-374_tzvz01.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-565_y3j3zs.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-565_y3j3zs.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-19_whrfkw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-19_whrfkw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-578_zh22hi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-578_zh22hi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-621_aeship.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-621_aeship.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-LUX-425_obwqb6.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-LUX-425_obwqb6.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-313_ssupl1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-313_ssupl1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-85_frzrs4.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-85_frzrs4.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-359_fdxeph.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-359_fdxeph.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621005/EGY-117_dw4guf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621005/EGY-117_dw4guf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620985/EGY-53_uk8d6n.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620985/EGY-53_uk8d6n.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620965/EGY-77-Website-2_ugelda.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620965/EGY-77-Website-2_ugelda.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620962/EGY-61-Website-2_e9fcvy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620962/EGY-61-Website-2_e9fcvy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620962/EGY-395_zqvfyu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620962/EGY-395_zqvfyu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620962/EGY-620_yjzobr.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620962/EGY-620_yjzobr.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620961/EGY-311_axwlrc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620961/EGY-311_axwlrc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620961/EGY-LUX-531_tqbxiq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620961/EGY-LUX-531_tqbxiq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-528_fozrqw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-528_fozrqw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-230_khm08r.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-230_khm08r.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-324_pvsoqz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-324_pvsoqz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-291_iwtsqd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-291_iwtsqd.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-557_kcoc9x.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-557_kcoc9x.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-318_hi8umj.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-318_hi8umj.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-115_oy7jjc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-115_oy7jjc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-148_zqqz9l.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-148_zqqz9l.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620958/EGY-189_zufisw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620958/EGY-189_zufisw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620958/EGY-452_uktncb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620958/EGY-452_uktncb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/EGY-1142-Website-2_wfe5zt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/EGY-1142-Website-2_wfe5zt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/EGY-468_txovy4.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/EGY-468_txovy4.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/EGY-44_hrne6u.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/EGY-44_hrne6u.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620956/EGY-224_kcuctk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620956/EGY-224_kcuctk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620956/EGY-200_ggk5nl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620956/EGY-200_ggk5nl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620956/EGY-231_pzwyih.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620956/EGY-231_pzwyih.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620955/EGY-145_rmqjdj.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620955/EGY-145_rmqjdj.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620955/EGY-481_ku92ju.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620955/EGY-481_ku92ju.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620955/EGY-283_uqni09.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620955/EGY-283_uqni09.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-61_copy_svbwv7.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-61_copy_svbwv7.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-518_cutair.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-518_cutair.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-61_nxpg46.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-61_nxpg46.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620953/EGY-1135_jxlzwd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620953/EGY-1135_jxlzwd.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620658/EGY-481.jpg-nggid03321-ngg0dyn-120x90-00f0w010c011r110f110r010t010_q4ljbo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620658/EGY-481.jpg-nggid03321-ngg0dyn-120x90-00f0w010c011r110f110r010t010_q4ljbo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620629/EGY-1135.jpg-nggid03320-ngg0dyn-120x90-00f0w010c011r110f110r010t010_zycdrs.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620629/EGY-1135.jpg-nggid03320-ngg0dyn-120x90-00f0w010c011r110f110r010t010_zycdrs.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620628/EGY-1135.jpg-nggid03320-ngg0dyn-180x0-00f0w010c010r110f110r010t010_i0dwh2.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620628/EGY-1135.jpg-nggid03320-ngg0dyn-180x0-00f0w010c010r110f110r010t010_i0dwh2.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620624/EGY-481.jpg-nggid03321-ngg0dyn-180x0-00f0w010c010r110f110r010t010_dz9hzo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620624/EGY-481.jpg-nggid03321-ngg0dyn-180x0-00f0w010c010r110f110r010t010_dz9hzo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620616/EGY-1135_tu9nbg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620616/EGY-1135_tu9nbg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620613/EGY-481_axgaj1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620613/EGY-481_axgaj1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620613/EGY-1135_lnxmeq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620613/EGY-1135_lnxmeq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620608/EGY-481_reqn0b.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620608/EGY-481_reqn0b.jpg" }
    ]
  },
  {
    "region": "South America",
    "country": "Argentina",
    "slug": "argentina",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620951/ARG-8518_d1y1ut.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620951/ARG-8518_d1y1ut.jpg" }
    ]
  },
  {
    "region": "Asia",
    "country": "Vietnam",
    "slug": "vietnam",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-04-17-DSCF9132_xehdbe.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-04-17-DSCF9132_xehdbe.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-04-17-DSCF8483_kvdrx3.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-04-17-DSCF8483_kvdrx3.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/VIET-04-17-DSCF8417_x85azw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/VIET-04-17-DSCF8417_x85azw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/VIET-04-17-DSCF8306_zftwy2.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/VIET-04-17-DSCF8306_zftwy2.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-04-17-DSCF8526_klxs2p.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-04-17-DSCF8526_klxs2p.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/VIET-04-17-DSCF8532_kpmfkg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/VIET-04-17-DSCF8532_kpmfkg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-9130-04-20-17_jouth2.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-9130-04-20-17_jouth2.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-7850_misasv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-7850_misasv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-04-17-DSCF9121_uzfr4v.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-04-17-DSCF9121_uzfr4v.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620871/VIET-8530-04-16-17_fztkqd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620871/VIET-8530-04-16-17_fztkqd.jpg" }
    ]
  },
  {
    "region": "Asia",
    "country": "Hong Kong",
    "slug": "hong-kong",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620681/HK-04-17-_DSF6504_sknmxo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620681/HK-04-17-_DSF6504_sknmxo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-Unexpected_perspective-6919_zzi74r.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-Unexpected_perspective-6919_zzi74r.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-04-17-_DSF5703_i2sokz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-04-17-_DSF5703_i2sokz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-04-07-17-3_xwlpuy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-04-07-17-3_xwlpuy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-04-07-17_v9g09f.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-04-07-17_v9g09f.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-5958-04-05-17_fk4wuo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-5958-04-05-17_fk4wuo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620678/HK-Pastel_Playground_3-6617_ayxssd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620678/HK-Pastel_Playground_3-6617_ayxssd.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-Pastel_Playground_2-6570_xzsixb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-Pastel_Playground_2-6570_xzsixb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-5960-04-05-17_rrc3ik.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-5960-04-05-17_rrc3ik.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-5933-04-05-17_iypper.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-5933-04-05-17_iypper.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-04-17-_DSF5965_thdllx.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-04-17-_DSF5965_thdllx.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620676/HK-5841_copy_oftjsq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620676/HK-5841_copy_oftjsq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620675/HK-Pastel_Playground_4-6559_yeil6k.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620675/HK-Pastel_Playground_4-6559_yeil6k.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620674/HK-6578_smezhl.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620674/HK-6578_smezhl.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620623/HK-DSF5841-Website-2.jpg-nggid03324-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xwatei.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620623/HK-DSF5841-Website-2.jpg-nggid03324-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xwatei.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620615/HK-DSF5841-Website-2_m9rpbk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620615/HK-DSF5841-Website-2_m9rpbk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/HK-DSF5841-Website-2_mvb5ya.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/HK-DSF5841-Website-2_mvb5ya.jpg" }
    ]
  },
  {
    "region": "North America",
    "country": "Puerto Rico",
    "slug": "puerto-rico",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/PR-DSF8368_rihtna.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/PR-DSF8368_rihtna.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/PR-1049_fol9kq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/PR-1049_fol9kq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/PR-DSF8358_irvw2j.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/PR-DSF8358_irvw2j.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620551/PR-DSF8343_wfmmui.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620551/PR-DSF8343_wfmmui.jpg" }
    ]
  },
  {
    "region": "North America",
    "country": "Mexico",
    "slug": "mexico",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620551/MEX-11-20-DSCF5674_hv6yem.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620551/MEX-11-20-DSCF5674_hv6yem.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620551/MEX-10-20-DSCF2473_til94o.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620551/MEX-10-20-DSCF2473_til94o.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620550/MEX-11-20-DSCF6087_fjxxbz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620550/MEX-11-20-DSCF6087_fjxxbz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620550/MEX-11-20-DSCF5608_s3rmtp.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620550/MEX-11-20-DSCF5608_s3rmtp.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620550/MEX-11-20-DSCF6067_a6zoaw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620550/MEX-11-20-DSCF6067_a6zoaw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620549/MEX-10-20-DSCF2598_cixoo1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620549/MEX-10-20-DSCF2598_cixoo1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620549/MEX-11-20-DSCF3780_qakvwx.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620549/MEX-11-20-DSCF3780_qakvwx.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620549/MEX-10-20-DSCF2812_ys1hzq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620549/MEX-10-20-DSCF2812_ys1hzq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF5601_rgxl5r.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF5601_rgxl5r.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF4476_ay7pwm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF4476_ay7pwm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF5613_pp4uo2.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF5613_pp4uo2.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF5614_ztu45y.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF5614_ztu45y.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620547/MEX-11-20-DSCF5628_sk679j.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620547/MEX-11-20-DSCF5628_sk679j.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620547/MEX-11-20-DSCF5661_c85i0j.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620547/MEX-11-20-DSCF5661_c85i0j.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620547/MEX-11-20-DSCF6431_k5zu5k.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620547/MEX-11-20-DSCF6431_k5zu5k.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620546/MEX-11-07-20-3_ughmge.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620546/MEX-11-07-20-3_ughmge.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620546/MEX-11-20-DSCF7614_brutu2.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620546/MEX-11-20-DSCF7614_brutu2.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620546/MEX-10-20-DSCF1423_zcbnpm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620546/MEX-10-20-DSCF1423_zcbnpm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620545/MEX-11-20-DSCF6370_ddcbeo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620545/MEX-11-20-DSCF6370_ddcbeo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620545/MEX-11-07-20_oft3b4.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620545/MEX-11-07-20_oft3b4.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620545/MEX-11-03-20-2_sucidz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620545/MEX-11-03-20-2_sucidz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620544/MEX-11-20-DSCF5657_knajz6.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620544/MEX-11-20-DSCF5657_knajz6.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620544/MEX-10-29-20-2_a4auxb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620544/MEX-10-29-20-2_a4auxb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-10-29-20-4_juitn9.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-10-29-20-4_juitn9.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-11-03-20_uhvufh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-11-03-20_uhvufh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-10-31-20_efeo7n.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-10-31-20_efeo7n.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-08-26-20_enz4f4.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-08-26-20_enz4f4.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-10-20-DSCF2506_krnffa.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-10-20-DSCF2506_krnffa.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620542/MEX-11-20-DSCF5556_i0zs7u.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620542/MEX-11-20-DSCF5556_i0zs7u.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620542/MEX-10-28-20-3_rlc1mo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620542/MEX-10-28-20-3_rlc1mo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620541/MEX-10-29-20-3_cvzkyg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620541/MEX-10-29-20-3_cvzkyg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620541/MEX-11-20-DSCF4753_h1mgly.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620541/MEX-11-20-DSCF4753_h1mgly.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-08-28-20_aap6tv.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-08-28-20_aap6tv.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-09-20-DSCF5845_vqaa1u.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-09-20-DSCF5845_vqaa1u.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-09-04-20-2_ecdazw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-09-04-20-2_ecdazw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-10-29-20_okztv5.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-10-29-20_okztv5.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620539/MEX-166_yshj1w.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620539/MEX-166_yshj1w.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620539/MEX-92_qsfpzg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620539/MEX-92_qsfpzg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620539/MEX-7549_zd3edw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620539/MEX-7549_zd3edw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620538/MEX-203_z0lxbr.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620538/MEX-203_z0lxbr.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620538/MEX-84_kbpaxr.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620538/MEX-84_kbpaxr.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620538/MEX-30_tnymgq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620538/MEX-30_tnymgq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-118_ddykfm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-118_ddykfm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-56_copy_d0vdpk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-56_copy_d0vdpk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-18-Website-2_ulwxwm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-18-Website-2_ulwxwm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-79_v0fwxx.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-79_v0fwxx.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620536/MEX-424_xvhxmy.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620536/MEX-424_xvhxmy.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620536/MEX-311_iwlwja.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620536/MEX-311_iwlwja.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620535/MEX-09-04-20_bcxcjc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620535/MEX-09-04-20_bcxcjc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620535/MEX-206_osokrj.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620535/MEX-206_osokrj.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620535/MEX-10-28-20-2_misgct.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620535/MEX-10-28-20-2_misgct.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-10-28-20_zrgfd7.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-10-28-20_zrgfd7.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-5831_lqfktc.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-5831_lqfktc.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-7476-_cacovg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-7476-_cacovg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-5803_jcibny.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-5803_jcibny.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620533/MEX-10-27-20_dknvhm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620533/MEX-10-27-20_dknvhm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620533/MEX-09-09-20_fzdjzw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620533/MEX-09-09-20_fzdjzw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620533/MEX-6692_bqfngj.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620533/MEX-6692_bqfngj.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620532/MEX-178_copy_ivaziz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620532/MEX-178_copy_ivaziz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620532/MEX-18_dmjpjb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620532/MEX-18_dmjpjb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-74_u1183a.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-74_u1183a.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-112_ybuidd.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-112_ybuidd.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-179_e9sgx5.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-179_e9sgx5.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-129_gdtrn2.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-129_gdtrn2.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620530/MEX-345_poxvbm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620530/MEX-345_poxvbm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620530/MEX-328_dyl65f.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620530/MEX-328_dyl65f.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620530/MEX-93_ygttgw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620530/MEX-93_ygttgw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-181_ptmc8v.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-181_ptmc8v.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-109_a2elw7.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-109_a2elw7.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-374_mjeeid.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-374_mjeeid.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-326_qu0gtt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-326_qu0gtt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620528/MEX-164_cer0io.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620528/MEX-164_cer0io.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620528/MEX-61_u7izwt.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620528/MEX-61_u7izwt.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620527/MEX-406_w9xam6.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620527/MEX-406_w9xam6.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620527/MEX-299_raaa7a.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620527/MEX-299_raaa7a.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620527/MEX-159_bvnjbw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620527/MEX-159_bvnjbw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/MEX-64_mmg4x5.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/MEX-64_mmg4x5.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/MEX-178_sdv5k1.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/MEX-178_sdv5k1.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620525/MEX-105_khbotk.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620525/MEX-105_khbotk.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/MEX-23_x9r70a.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/MEX-23_x9r70a.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620525/MEX-37_vw1lav.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620525/MEX-37_vw1lav.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620525/MEX-4376_c2jagu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620525/MEX-4376_c2jagu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620524/MEX-4545_zawvu2.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620524/MEX-4545_zawvu2.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620524/MEX-47_gny7s0.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620524/MEX-47_gny7s0.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620524/MEX-73_hfxjvw.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620524/MEX-73_hfxjvw.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620523/MEX-4731_ptqtqh.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620523/MEX-4731_ptqtqh.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620523/MEX-4426_xilvc3.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620523/MEX-4426_xilvc3.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-54_iharhi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-54_iharhi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-191_uulgki.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-191_uulgki.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-66_k7ho8n.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-66_k7ho8n.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-294_dvsncu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-294_dvsncu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620521/MEX-117_dhrfxg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620521/MEX-117_dhrfxg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620521/MEX-56_ciyjeu.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620521/MEX-56_ciyjeu.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620521/MEX-180_rbi3jo.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620521/MEX-180_rbi3jo.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620520/MEX-197_ngbg2f.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620520/MEX-197_ngbg2f.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620520/MEX-28_zlhjxm.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620520/MEX-28_zlhjxm.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620520/MEX-395_ol8z8u.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620520/MEX-395_ol8z8u.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620519/MEX-Miss_Technicolor-8_xldvhz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620519/MEX-Miss_Technicolor-8_xldvhz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620519/MEX-65_jyrd0s.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620519/MEX-65_jyrd0s.jpg" }
    ]
  },
  {
    "region": "North America",
    "country": "Caribbean",
    "slug": "caribbean",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9074_j1qznq.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9074_j1qznq.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9003_e33r6b.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9003_e33r6b.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620519/CAR-12-24-DSCF9433_bzr6ps.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620519/CAR-12-24-DSCF9433_bzr6ps.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9175_mbgpmz.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9175_mbgpmz.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9143_e6b9mi.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9143_e6b9mi.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620516/CAR-12-24-DSCF9182_kanice.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620516/CAR-12-24-DSCF9182_kanice.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620516/CAR-12-24-DSCF9039_t2wkt7.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620516/CAR-12-24-DSCF9039_t2wkt7.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620516/CAR-12-24-DSCF9126_bnnmle.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620516/CAR-12-24-DSCF9126_bnnmle.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620515/CAR-12-24-DSCF9188_csfq9c.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620515/CAR-12-24-DSCF9188_csfq9c.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620515/CAR-12-24-DSCF8798_akarcf.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620515/CAR-12-24-DSCF8798_akarcf.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620510/CAR-12-24-DSCF9295_ywcx2h.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620510/CAR-12-24-DSCF9295_ywcx2h.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/CAR-7827_ma3agb.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/CAR-7827_ma3agb.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/CAR-12-24-DSCF9563_a0v6pj.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/CAR-12-24-DSCF9563_a0v6pj.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/CAR-12-24-DSCF9138_p1n3fe.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/CAR-12-24-DSCF9138_p1n3fe.jpg" }
    ]
  },
  {
    "region": "North America",
    "country": "St. Martin",
    "slug": "st-martin",
    "images": [
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620517/STM-8082_abjbjg.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620517/STM-8082_abjbjg.jpg" },
      { "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620517/STM-8234_bks8vn.jpg", "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620517/STM-8234_bks8vn.jpg" }
    ]
  }
];

// Merge generated albums (from public/) with static ones (Cloudinary),
// preferring static entries when slugs collide (since they have working URLs).
function mergeAlbums(staticAlbums: CountryAlbum[], generatedAlbums: CountryAlbum[]): CountryAlbum[] {
  const bySlug = new Map<string, CountryAlbum>();
  // Add generated albums first
  for (const g of generatedAlbums) bySlug.set(g.slug, g);
  // Then add static albums, which will override generated ones with same slug
  for (const a of staticAlbums) bySlug.set(a.slug, a);
  return Array.from(bySlug.values());
}

// Deduplicate and clean images within albums
function isLowResOrThumb(url: string): boolean {
  return /nggid|120x90|180x0|_thumb|thumbnail/i.test(url);
}

// Produce a stable, content-oriented key for a Cloudinary URL by
// using the filename and stripping hashes and common suffixes (copy, website variants)
function getGlobalImageKey(url: string): string {
  try {
    const u = new URL(url);
    let name = decodeURIComponent(u.pathname.split('/').pop() || '');
    // drop extension
    name = name.replace(/\.(jpg|jpeg|png|webp|gif|avif)$/i, '');
    // remove trailing random hash tokens like _abc123
    name = name.replace(/_[a-z0-9]{5,}$/i, '');
    // normalize known variants like -copy, _copy, -website, -website-2, etc.
    name = name.replace(/(?:[_-](?:copy|website)(?:[_-]?\d+)*)+$/i, '');
    // collapse whitespace/punctuation and case
    name = name.replace(/\s+/g, '-').replace(/[^a-z0-9-]+/gi, '-');
    name = name.replace(/-+/g, '-').replace(/^-|-$/g, '');
    return name.toLowerCase();
  } catch {
    return url;
  }
}

function cleanAlbum(album: CountryAlbum): CountryAlbum {
  const seen = new Set<string>();
  const cleaned = album.images.filter((img) => {
    if (!img?.desktop) return false;
    if (isLowResOrThumb(img.desktop)) return false;
    const key = getGlobalImageKey(img.desktop);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  return { ...album, images: cleaned };
}

// Remove duplicates across albums (global dedupe), keeping country albums first,
// and removing duplicates from "Erasing Borders" last.
function dedupeAcrossAlbums(albums: CountryAlbum[]): CountryAlbum[] {
  const isLogo = (a: CountryAlbum) => a.region === 'Logo';
  const isErasing = (a: CountryAlbum) => a.region === 'Erasing Borders';

  const normal = albums.filter(a => !isLogo(a) && !isErasing(a));
  const erasing = albums.filter(isErasing);
  const logos = albums.filter(isLogo);

  const globalSeen = new Set<string>();
  const dedupeList = (list: CountryAlbum[]) => list.map(a => {
    const imgs = a.images.filter(img => {
      const key = img?.desktop ? getGlobalImageKey(img.desktop) : '';
      if (!key) return false;
      if (globalSeen.has(key)) return false;
      globalSeen.add(key);
      return true;
    });
    return { ...a, images: imgs };
  });

  const normalD = dedupeList(normal);
  const erasingD = dedupeList(erasing);
  // Leave logos as-is (not part of portfolio grid)

  // Reconstruct original order based on input array
  const bySlug = new Map<string, CountryAlbum>();
  for (const a of [...normalD, ...erasingD, ...logos]) bySlug.set(a.slug, a);
  return albums.map(a => bySlug.get(a.slug) || a);
}

const CLEANED_ALBUMS: CountryAlbum[] = [];
const MERGED_ALBUMS: CountryAlbum[] = [];

export const getAlbumsByRegion = (region: Region): CountryAlbum[] => {
  return MERGED_ALBUMS
    .filter((album): album is CountryAlbum => album.region === region);
}

export const getAlbumBySlug = (slug: string): CountryAlbum | undefined => {
  return MERGED_ALBUMS.find(album => album.slug === slug);
}

// Use static homepage slideshow (with working Cloudinary URLs)
export const HOME_SLIDESHOW_SOURCE: SlideshowImage[] = HOME_SLIDESHOW;

export const REGIONS: Region[] = ["Africa", "Asia", "Middle East", "South America", "North America", "Europe", "Oceania", "Erasing Borders"];

// Get all albums sorted alphabetically by country name (excluding non-portfolio categories like Logo)
export const getAllAlbumsSorted = (): CountryAlbum[] => {
  return MERGED_ALBUMS
    .filter((album): album is CountryAlbum => (REGIONS as readonly string[]).includes(album.region))
    .sort((a, b) => a.country.localeCompare(b.country));
};
