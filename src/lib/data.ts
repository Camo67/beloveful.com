export type Region =
  | "Africa"
  | "Asia"
  | "Middle East"
  | "South America"
  | "Erasing Borders";

export interface SlideshowImage {
  desktop: string;
  mobile: string;
}

export interface CountryAlbum {
  region: Region;
  country: string;
  slug: string;
  images: SlideshowImage[];
}

export const HOME_SLIDESHOW: SlideshowImage[] = [
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/EGY-68_y6bkd2.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080086/TonyMenias-1302.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/ETH-03-14-IMG_1327_pltrne.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080086/TonyMenias-1302.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620681/HK-04-17-_DSF6504_sknmxo.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080082/TonyMenias-1297.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620712/DSCF7677-1_hlb75w.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080069/TonyMenias-1281.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF2819_awss97.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080042/TonyMenias-1248.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/MYA-9925-04-25-17_edkog3.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080039/TonyMenias-1244.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8794_gv7u6z.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080026/TonyMenias-1229.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/DSCF1066_dlp2l5.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080019/TonyMenias-1220.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-12-19-DSCF2334_jk2cwl.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080015/TonyMenias-1217.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-04-17-DSCF9132_xehdbe.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080013/TonyMenias-1214.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620567/PAL-10-19-DSCF3283_j0zztl.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080009/TonyMenias-1210.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-10-19-DSCF4604_rv8ibh.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080007/TonyMenias-1207.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/_DSF6993_copy_ez4ele.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080008/TonyMenias-1208.jpg",
  },
  {
    desktop: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620617/CHI-DSCF9471_vukjxy.jpg",
    mobile: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079998/TonyMenias-1196.jpg",
  },
];

export const ALBUMS: CountryAlbum[] = [
  // AFRICA
  {
    region: "Africa",
    country: "Egypt",
    slug: "egypt",
    images: [
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/EGY-68_y6bkd2.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/EGY-68_y6bkd2.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/EGY-1030_tmdg4s.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/EGY-1030_tmdg4s.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/EGY-337_lg0guc.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/EGY-337_lg0guc.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/11-21-EGY-262_2_hpvm9z.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/11-21-EGY-262_2_hpvm9z.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-1064_zdf7hn.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-1064_zdf7hn.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-160_bjue1z.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-160_bjue1z.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-698_xpvwc0.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-698_xpvwc0.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-174_uziqy8.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-174_uziqy8.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-565-Website-3_ojuwmi.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-565-Website-3_ojuwmi.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-869_ujdg3k.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-869_ujdg3k.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-618_chevek.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-618_chevek.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-888_vhl0tl.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-888_vhl0tl.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-946_v5ldvm.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-946_v5ldvm.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-148_copy_ccgtjs.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-148_copy_ccgtjs.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-445_fx92a5.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-445_fx92a5.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-917_yi0yxv.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-917_yi0yxv.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-565-Website-2_dk5fxb.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-565-Website-2_dk5fxb.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-422_gyv52e.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-422_gyv52e.jpg' },
    ],
  },
  {
    region: "Africa",
    country: "Ethiopia",
    slug: "ethiopia",
    images: [
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/ETH-03-14-IMG_1327_pltrne.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/ETH-03-14-IMG_1327_pltrne.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/ETH-03-14-IMG_2202_vn1mwt.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/ETH-03-14-IMG_2202_vn1mwt.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/IMG_1755_wkwumk.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/IMG_1755_wkwumk.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/IMG_1428_n0rozd.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/IMG_1428_n0rozd.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/ETH-03-14-IMG_1671_t6fjfc.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/ETH-03-14-IMG_1671_t6fjfc.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/ETH-2206_lundkq.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/ETH-2206_lundkq.jpg' },
    ],
  },
  // ASIA
  {
    region: "Asia",
    country: "Hong Kong",
    slug: "hong-kong",
    images: [
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620681/HK-04-17-_DSF6504_sknmxo.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620681/HK-04-17-_DSF6504_sknmxo.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-Unexpected_perspective-6919_zzi74r.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-Unexpected_perspective-6919_zzi74r.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-04-17-_DSF5703_i2sokz.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-04-17-_DSF5703_i2sokz.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-04-07-17-3_xwlpuy.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-04-07-17-3_xwlpuy.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-04-07-17_v9g09f.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-04-07-17_v9g09f.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-5958-04-05-17_fk4wuo.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-5958-04-05-17_fk4wuo.jpg' },
    ],
  },
  {
    region: "Asia",
    country: "India",
    slug: "india",
    images: [
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620712/DSCF7677-1_hlb75w.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620712/DSCF7677-1_hlb75w.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/DSCF7677-1_xzxjyn.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/DSCF7677-1_xzxjyn.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/MadameJodhpur_kxinxc.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/MadameJodhpur_kxinxc.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/DSCF9656_grtkma.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/DSCF9656_grtkma.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/IND-4740_c5rfdh.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/IND-4740_c5rfdh.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620710/DSCF9689-Website-2_pkowsx.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620710/DSCF9689-Website-2_pkowsx.jpg' },
    ],
  },
  {
    region: "Asia",
    country: "Japan",
    slug: "japan",
    images: [
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF2819_awss97.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF2819_awss97.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF3291_eqvftc.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF3291_eqvftc.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF3101_cyash8.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF3101_cyash8.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-03-17-_DSF2579_jgpine.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-03-17-_DSF2579_jgpine.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3521-03-17-_DSF3520-Enhanced-NR_abrsod.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3521-03-17-_DSF3520-Enhanced-NR_abrsod.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3636-03-24-17_m2s1dz.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3636-03-24-17_m2s1dz.jpg' },
    ],
  },
  {
    region: "Asia",
    country: "Myanmar",
    slug: "myanmar",
    images: [
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/MYA-9925-04-25-17_edkog3.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/MYA-9925-04-25-17_edkog3.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620828/MYA-DSCF0329_lrdjuo.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620828/MYA-DSCF0329_lrdjuo.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-Morning_Catch_gddpsa.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-Morning_Catch_gddpsa.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-04-17-DSCF0068_svqwrr.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-04-17-DSCF0068_svqwrr.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-1292_dclmsa.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-1292_dclmsa.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-0839_gligvf.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-0839_gligvf.jpg' },
    ],
  },
  {
    region: "Asia",
    country: "Nepal",
    slug: "nepal",
    images: [
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8794_gv7u6z.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8794_gv7u6z.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8553_fxnxqo.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8553_fxnxqo.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NPL-8750_lspnpu.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NPL-8750_lspnpu.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NEP-8558_qza5ne.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NEP-8558_qza5ne.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NEP-8516_y3e2nt.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NEP-8516_y3e2nt.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620830/DSCF8466_lptg9y.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620830/DSCF8466_lptg9y.jpg' },
    ],
  },
  {
    region: "Asia",
    country: "Philippines",
    slug: "philippines",
    images: [
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/DSCF1066_dlp2l5.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/DSCF1066_dlp2l5.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/PHI-0660_vupz0p.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/PHI-0660_vupz0p.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620860/DSCF0146_i2balz.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620860/DSCF0146_i2balz.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620860/DSCF2143_aaxhrl.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620860/DSCF2143_aaxhrl.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620859/PHI-12-19-DSCF1239_l3qcjj.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620859/PHI-12-19-DSCF1239_l3qcjj.jpg' },
      { desktop: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620859/PHI-1157_ztn3ew.jpg', mobile: 'https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620859/PHI-1157_ztn3ew.jpg' },
    ],
  },
  // More countries can be added following the same pattern...
];

export const REGIONS: Region[] = ["Africa", "Asia", "Middle East", "South America", "Erasing Borders"];

export const getAlbumsByRegion = (region: Region): CountryAlbum[] => {
  return ALBUMS.filter(album => album.region === region);
};

export const getAlbumBySlug = (slug: string): CountryAlbum | undefined => {
  return ALBUMS.find(album => album.slug === slug);
};