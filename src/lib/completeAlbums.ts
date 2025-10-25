const createImageArray = (count: number) => 
  Array.from({ length: count }, () => ({ desktop: '', mobile: '' }));

const data = [
  {
    region: "Asia Pacific",
    country: "Australia",
    slug: "australia",
    images: createImageArray(18)
  },
  {
    region: "Asia Pacific",
    country: "China",
    slug: "china",
    images: createImageArray(30)
  },
  {
    region: "Asia Pacific",
    country: "Hong Kong",
    slug: "hong-kong",
    images: createImageArray(18)
  },
  {
    region: "Asia Pacific",
    country: "India",
    slug: "india",
    images: createImageArray(18)
  },
  {
    region: "Asia Pacific",
    country: "Indonesia",
    slug: "indonesia",
    images: createImageArray(18)
  },
  {
    region: "Asia Pacific",
    country: "Japan",
    slug: "japan",
    images: createImageArray(18)
  },
  {
    region: "Asia Pacific",
    country: "Malaysia",
    slug: "malaysia",
    images: createImageArray(18)
  },
  {
    region: "Asia Pacific",
    country: "New Zealand",
    slug: "new-zealand",
    images: createImageArray(18)
  },
  {
    region: "Asia Pacific",
    country: "Philippines",
    slug: "philippines",
    images: createImageArray(18)
  },
  {
    region: "Asia Pacific",
    country: "Singapore",
    slug: "singapore",
    images: createImageArray(18)
  },
  {
    region: "Asia Pacific",
    country: "South Korea",
    slug: "south-korea",
    images: createImageArray(18)
  },
  {
    region: "Asia Pacific",
    country: "Taiwan",
    slug: "taiwan",
    images: createImageArray(18)
  },
  {
    region: "Asia Pacific",
    country: "Thailand",
    slug: "thailand",
    images: createImageArray(18)
  },
  {
    region: "Asia Pacific",
    country: "Vietnam",
    slug: "vietnam",
    images: createImageArray(18)
  },
  {
    region: "Europe & Scandinavia",
    country: "Austria",
    slug: "austria",
    images: createImageArray(18)
  },
  {
    region: "Europe & Scandinavia",
    country: "Belgium",
    slug: "belgium",
    images: createImageArray(18)
  },
  {
    region: "Europe & Scandinavia",
    country: "Czech Republic",
    slug: "czech-republic",
    images: createImageArray(18)
  },
  {
    region: "Europe & Scandinavia",
    country: "Denmark",
    slug: "denmark",
    images: createImageArray(18)
  },
  {
    region: "Europe & Scandinavia",
    country: "Finland",
    slug: "finland",
    images: createImageArray(18)
  },
  {
    region: "Europe & Scandinavia",
    country: "France",
    slug: "france",
    images: createImageArray(18)
  },
  {
    region: "Europe & Scandinavia",
    country: "Germany",
    slug: "germany",
    images: createImageArray(18)
  },
  {
    region: "Europe & Scandinavia",
    country: "Greece",
    slug: "greece",
    images: createImageArray(20)
  },
  {
    region: "Europe & Scandinavia",
    country: "Italy",
    slug: "italy",
    images: createImageArray(70)
  },
  {
    region: "Europe & Scandinavia",
    country: "Portugal",
    slug: "portugal",
    images: createImageArray(24)
  },
  {
    region: "Europe & Scandinavia",
    country: "Spain",
    slug: "spain",
    images: createImageArray(7)
  },
  {
    region: "Europe & Scandinavia",
    country: "UK & Ireland",
    slug: "uk-ireland",
    images: createImageArray(30)
  },
  {
    region: "Middle East",
    country: "Jordan",
    slug: "jordan",
    images: createImageArray(35),
    title: ''
  },
  {
    region: "North America",
    country: "Chicago",
    slug: "chicago",
    images: createImageArray(90),
    title: ''
  },
  {
    region: "North America",
    country: "New York",
    slug: "new-york",
    images: createImageArray(90),
    title: ''
  },
  {
    region: "South America",
    country: "Argentina",
    slug: "argentina",
    images: createImageArray(21),
    title: ''
  }
];