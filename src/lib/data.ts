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

// Generated slideshow images from Cloudinary
export const HOME_SLIDESHOW: SlideshowImage[] = [
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218637/Website%20beloveful.com/Middle%20East/Jordan/DSCF4488_vos7sk.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218637/Website%20beloveful.com/Middle%20East/Jordan/DSCF4488_vos7sk.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218636/Website%20beloveful.com/Middle%20East/Jordan/DSCF4561_qgxdpq.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218636/Website%20beloveful.com/Middle%20East/Jordan/DSCF4561_qgxdpq.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218634/Website%20beloveful.com/Middle%20East/Jordan/JDN-4461_mky4nj.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218634/Website%20beloveful.com/Middle%20East/Jordan/JDN-4461_mky4nj.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218633/Website%20beloveful.com/Middle%20East/Jordan/JOR-4604_wzuqox.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218633/Website%20beloveful.com/Middle%20East/Jordan/JOR-4604_wzuqox.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218632/Website%20beloveful.com/Middle%20East/Jordan/JOR-5061_kma1ff.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218632/Website%20beloveful.com/Middle%20East/Jordan/JOR-5061_kma1ff.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218631/Website%20beloveful.com/Middle%20East/Jordan/JOR-4723_e796m6.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218631/Website%20beloveful.com/Middle%20East/Jordan/JOR-4723_e796m6.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218630/Website%20beloveful.com/Middle%20East/Jordan/JOR-4876_iiiz94.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218630/Website%20beloveful.com/Middle%20East/Jordan/JOR-4876_iiiz94.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218629/Website%20beloveful.com/Middle%20East/Jordan/JOR-4516_jdtgwb.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218629/Website%20beloveful.com/Middle%20East/Jordan/JOR-4516_jdtgwb.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218628/Website%20beloveful.com/Middle%20East/Jordan/JOR-4574_wlc2xf.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218628/Website%20beloveful.com/Middle%20East/Jordan/JOR-4574_wlc2xf.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218627/Website%20beloveful.com/Middle%20East/Jordan/JOR-4615_thgegw.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218627/Website%20beloveful.com/Middle%20East/Jordan/JOR-4615_thgegw.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218625/Website%20beloveful.com/Middle%20East/Jordan/JOR-5044-10-30-22_vkrkjc.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218625/Website%20beloveful.com/Middle%20East/Jordan/JOR-5044-10-30-22_vkrkjc.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218622/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF4984_txlbtf.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218622/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF4984_txlbtf.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218621/Website%20beloveful.com/Middle%20East/Jordan/JOR-11-22-DSCF5588_dg5fld.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218621/Website%20beloveful.com/Middle%20East/Jordan/JOR-11-22-DSCF5588_dg5fld.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218620/Website%20beloveful.com/Middle%20East/Jordan/JOR-11-22-DSCF5655_cpfoam.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218620/Website%20beloveful.com/Middle%20East/Jordan/JOR-11-22-DSCF5655_cpfoam.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218619/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-19-DSCF4604_poqdvg.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218619/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-19-DSCF4604_poqdvg.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218619/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF3088_m0spty.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218619/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF3088_m0spty.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218618/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2675_ar5plz.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218618/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2675_ar5plz.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218617/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2992_m5doqi.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218617/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2992_m5doqi.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218616/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF3559_ei0iam.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218616/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF3559_ei0iam.jpg"
  },
  {
    "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218615/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2938_shuk1d.jpg",
    "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218615/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2938_shuk1d.jpg"
  }
];

// Generated albums from Cloudinary
export const ALBUMS: CountryAlbum[] = [
  {
    "region": "Middle East",
    "country": "Jordan",
    "slug": "jordan",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218639/Website%20beloveful.com/Middle%20East/Jordan/DSCF4610-4_uu35i7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218639/Website%20beloveful.com/Middle%20East/Jordan/DSCF4610-4_uu35i7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218639/Website%20beloveful.com/Middle%20East/Jordan/DSCF4694_huyfxr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218639/Website%20beloveful.com/Middle%20East/Jordan/DSCF4694_huyfxr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218638/Website%20beloveful.com/Middle%20East/Jordan/DSCF4640_h4akz1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218638/Website%20beloveful.com/Middle%20East/Jordan/DSCF4640_h4akz1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218637/Website%20beloveful.com/Middle%20East/Jordan/DSCF4385_j6s1g4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218637/Website%20beloveful.com/Middle%20East/Jordan/DSCF4385_j6s1g4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218637/Website%20beloveful.com/Middle%20East/Jordan/DSCF4619_etckse.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218637/Website%20beloveful.com/Middle%20East/Jordan/DSCF4619_etckse.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218637/Website%20beloveful.com/Middle%20East/Jordan/DSCF4488_vos7sk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218637/Website%20beloveful.com/Middle%20East/Jordan/DSCF4488_vos7sk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218636/Website%20beloveful.com/Middle%20East/Jordan/DSCF4561_qgxdpq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218636/Website%20beloveful.com/Middle%20East/Jordan/DSCF4561_qgxdpq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218635/Website%20beloveful.com/Middle%20East/Jordan/DSCF4430_l7ksx6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218635/Website%20beloveful.com/Middle%20East/Jordan/DSCF4430_l7ksx6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218635/Website%20beloveful.com/Middle%20East/Jordan/DSCF4537-Website-2_zwwsiy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218635/Website%20beloveful.com/Middle%20East/Jordan/DSCF4537-Website-2_zwwsiy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218634/Website%20beloveful.com/Middle%20East/Jordan/JDN-4461_mky4nj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218634/Website%20beloveful.com/Middle%20East/Jordan/JDN-4461_mky4nj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218633/Website%20beloveful.com/Middle%20East/Jordan/JDN-4455_dq0qfo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218633/Website%20beloveful.com/Middle%20East/Jordan/JDN-4455_dq0qfo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218633/Website%20beloveful.com/Middle%20East/Jordan/JOR-4604_wzuqox.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218633/Website%20beloveful.com/Middle%20East/Jordan/JOR-4604_wzuqox.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218632/Website%20beloveful.com/Middle%20East/Jordan/JOR-5061_kma1ff.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218632/Website%20beloveful.com/Middle%20East/Jordan/JOR-5061_kma1ff.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218632/Website%20beloveful.com/Middle%20East/Jordan/JOR-4569_xieper.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218632/Website%20beloveful.com/Middle%20East/Jordan/JOR-4569_xieper.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218631/Website%20beloveful.com/Middle%20East/Jordan/JOR-4723_e796m6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218631/Website%20beloveful.com/Middle%20East/Jordan/JOR-4723_e796m6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218631/Website%20beloveful.com/Middle%20East/Jordan/JOR-4597_wfaibp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218631/Website%20beloveful.com/Middle%20East/Jordan/JOR-4597_wfaibp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218630/Website%20beloveful.com/Middle%20East/Jordan/JOR-4876_iiiz94.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218630/Website%20beloveful.com/Middle%20East/Jordan/JOR-4876_iiiz94.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218630/Website%20beloveful.com/Middle%20East/Jordan/JOR-4957_uh7djm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218630/Website%20beloveful.com/Middle%20East/Jordan/JOR-4957_uh7djm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218629/Website%20beloveful.com/Middle%20East/Jordan/JOR-4516_jdtgwb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218629/Website%20beloveful.com/Middle%20East/Jordan/JOR-4516_jdtgwb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218628/Website%20beloveful.com/Middle%20East/Jordan/JOR-4574_wlc2xf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218628/Website%20beloveful.com/Middle%20East/Jordan/JOR-4574_wlc2xf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218627/Website%20beloveful.com/Middle%20East/Jordan/JOR-4615_thgegw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218627/Website%20beloveful.com/Middle%20East/Jordan/JOR-4615_thgegw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218628/Website%20beloveful.com/Middle%20East/Jordan/JOR-4577_dnakcs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218628/Website%20beloveful.com/Middle%20East/Jordan/JOR-4577_dnakcs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218626/Website%20beloveful.com/Middle%20East/Jordan/JOR-5232103122_sw3cix.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218626/Website%20beloveful.com/Middle%20East/Jordan/JOR-5232103122_sw3cix.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218626/Website%20beloveful.com/Middle%20East/Jordan/JOR--10-30-22_odgkni.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218626/Website%20beloveful.com/Middle%20East/Jordan/JOR--10-30-22_odgkni.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218625/Website%20beloveful.com/Middle%20East/Jordan/JOR-5044-10-30-22_vkrkjc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218625/Website%20beloveful.com/Middle%20East/Jordan/JOR-5044-10-30-22_vkrkjc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218625/Website%20beloveful.com/Middle%20East/Jordan/JOR-5001-10-30-22_xuhih3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218625/Website%20beloveful.com/Middle%20East/Jordan/JOR-5001-10-30-22_xuhih3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218624/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF5274_jsjtia.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218624/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF5274_jsjtia.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218624/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF5272_b2mvnb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218624/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF5272_b2mvnb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218623/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF5216_r6nnbz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218623/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF5216_r6nnbz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218623/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF5213_cxeiwg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218623/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF5213_cxeiwg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218622/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF4984_txlbtf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218622/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF4984_txlbtf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218621/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF5146_dcqlnh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218621/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF5146_dcqlnh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218621/Website%20beloveful.com/Middle%20East/Jordan/JOR-11-22-DSCF5588_dg5fld.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218621/Website%20beloveful.com/Middle%20East/Jordan/JOR-11-22-DSCF5588_dg5fld.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218621/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF4959_c9wc7m.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218621/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-22-DSCF4959_c9wc7m.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218620/Website%20beloveful.com/Middle%20East/Jordan/JOR-11-22-DSCF5655_cpfoam.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218620/Website%20beloveful.com/Middle%20East/Jordan/JOR-11-22-DSCF5655_cpfoam.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218619/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-19-DSCF4604_poqdvg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218619/Website%20beloveful.com/Middle%20East/Jordan/JOR-10-19-DSCF4604_poqdvg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466071/JOR-4461_kkru8x.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466071/JOR-4461_kkru8x.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620664/JOR-4461.jpg-nggid03307-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nvnoby.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620664/JOR-4461.jpg-nggid03307-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nvnoby.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/JOR-4461.jpg-nggid03307-ngg0dyn-120x90-00f0w010c011r110f110r010t010_xsfpwk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/JOR-4461.jpg-nggid03307-ngg0dyn-120x90-00f0w010c011r110f110r010t010_xsfpwk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620607/JOR-4461_jqbzae.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620607/JOR-4461_jqbzae.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620603/JOR-4461_y7xfyc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620603/JOR-4461_y7xfyc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-10-19-DSCF4604_rv8ibh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-10-19-DSCF4604_rv8ibh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-10-22-DSCF4959_hljqss.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-10-22-DSCF4959_hljqss.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-11-22-DSCF5655_so0p5r.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620598/JOR-11-22-DSCF5655_so0p5r.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-11-22-DSCF5588_orujem.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-11-22-DSCF5588_orujem.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR--10-30-22_mavyog.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR--10-30-22_mavyog.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-10-22-DSCF5146_ppazgw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-10-22-DSCF5146_ppazgw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-4876_dgqtxb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620597/JOR-4876_dgqtxb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620586/JOR-5232103122_ehih9d.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620586/JOR-5232103122_ehih9d.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620576/JOR-10-22-DSCF5272_b8xfbx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620576/JOR-10-22-DSCF5272_b8xfbx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620576/JOR-5001-10-30-22_y0pdwm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620576/JOR-5001-10-30-22_y0pdwm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620575/JOR-10-22-DSCF5213_csluvt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620575/JOR-10-22-DSCF5213_csluvt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620575/JOR-4516_lt6tok.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620575/JOR-4516_lt6tok.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620575/JOR-10-22-DSCF5216_lvtv58.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620575/JOR-10-22-DSCF5216_lvtv58.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-5044-10-30-22_bdmvvk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-5044-10-30-22_bdmvvk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-4574_kdl0xq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-4574_kdl0xq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-4723_pblhsy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-4723_pblhsy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-10-22-DSCF5274_qynnqp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-10-22-DSCF5274_qynnqp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-4577_b7xk54.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620574/JOR-4577_b7xk54.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620573/JOR-10-22-DSCF4984_zkosfq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620573/JOR-10-22-DSCF4984_zkosfq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620573/JOR-4615_aldnty.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620573/JOR-4615_aldnty.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JOR-4957_oxybq1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JOR-4957_oxybq1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JOR-4597_tkrvb7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JOR-4597_tkrvb7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JOR-4569_pcexyu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JOR-4569_pcexyu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620571/JOR-5061_an9ah9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620571/JOR-5061_an9ah9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620570/JOR-4604_weouv8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620570/JOR-4604_weouv8.jpg"
      }
    ]
  },
  {
    "region": "Middle East",
    "country": "Israel | Palestine",
    "slug": "israel-palestine",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218619/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF3088_m0spty.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218619/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF3088_m0spty.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218618/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2675_ar5plz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218618/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2675_ar5plz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218617/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF3675_vznaue.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218617/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF3675_vznaue.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218617/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2992_m5doqi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218617/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2992_m5doqi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218616/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/TonyMenias-Hesalwayslistening_ukmuhb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218616/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/TonyMenias-Hesalwayslistening_ukmuhb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218616/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF3559_ei0iam.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218616/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF3559_ei0iam.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218615/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2938_shuk1d.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218615/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2938_shuk1d.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218614/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2969_kjplq0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218614/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/DSCF2969_kjplq0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218614/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-3238_rzm8wg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218614/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-3238_rzm8wg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218614/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-3250_m4tccn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218614/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-3250_m4tccn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218613/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-3116_l6gm9c.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218613/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-3116_l6gm9c.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218612/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/untitled-4506-5_qelzzx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218612/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/untitled-4506-5_qelzzx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218612/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3773_zk6xyh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218612/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3773_zk6xyh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218611/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3270_wwectj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218611/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3270_wwectj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218611/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3313_b9efng.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218611/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3313_b9efng.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218610/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3322_aihh2l.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218610/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3322_aihh2l.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218610/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3566_qeu5c7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218610/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3566_qeu5c7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218610/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3303_mei77g.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218610/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3303_mei77g.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218608/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3581_hjevfi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218608/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3581_hjevfi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218608/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3582_zdf66h.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218608/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3582_zdf66h.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218607/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3611_rt7e6b.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218607/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3611_rt7e6b.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218607/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3266_hvtpsw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218607/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3266_hvtpsw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218606/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3206_fyzwtk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218606/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3206_fyzwtk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218606/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3208_gptblh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218606/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3208_gptblh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218605/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3211_xgwzo9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218605/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3211_xgwzo9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218604/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3315_gxk85o.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218604/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3315_gxk85o.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218604/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3221_gecjfb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218604/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3221_gecjfb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218604/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4570_wjnxmq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218604/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4570_wjnxmq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218603/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4888_pbjkbp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218603/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4888_pbjkbp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218602/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4890_ksnaew.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218602/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4890_ksnaew.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218602/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4891_bjsjmb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218602/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4891_bjsjmb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218601/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4892_laocxx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218601/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4892_laocxx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218601/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4893_vh9hbo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218601/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4893_vh9hbo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218600/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF2937_mfy45m.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218600/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF2937_mfy45m.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218600/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3722_pq2gdp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218600/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3722_pq2gdp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218599/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF4212_qm5kot.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218599/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF4212_qm5kot.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218598/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF4131_hozimu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218598/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF4131_hozimu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218598/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF4159_cucscs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218598/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF4159_cucscs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218598/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF2980-Enhanced-NR_dpixxa.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218598/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF2980-Enhanced-NR_dpixxa.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218597/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF3016_b0ss9k.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218597/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF3016_b0ss9k.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218597/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF3499_dg7o8o.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218597/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF3499_dg7o8o.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218595/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF3674_ffeyui.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218595/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF3674_ffeyui.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218595/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF3016-2_dpjkhg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218595/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF3016-2_dpjkhg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218594/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF2603_ape1d6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218594/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/ISR-10-19-DSCF2603_ape1d6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218594/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3283_sxynzo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218594/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-19-DSCF3283_sxynzo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218593/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4693_uih0vi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218593/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4693_uih0vi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218593/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4464_ceuybl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218593/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4464_ceuybl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218593/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4834_vdjlya.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218593/Website%20beloveful.com/Middle%20East/Israel%20%7C%20Palestine/PAL-10-22-DSCF4834_vdjlya.jpg"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "White",
    "slug": "white",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218583/Website%20beloveful.com/Logo/White/Belovefulwhitetransparent_fl7l4e.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218583/Website%20beloveful.com/Logo/White/Belovefulwhitetransparent_fl7l4e.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218582/Website%20beloveful.com/Logo/White/Smaller_Logo_j43ss5.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218582/Website%20beloveful.com/Logo/White/Smaller_Logo_j43ss5.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218582/Website%20beloveful.com/Logo/White/Beloveful_dniflr.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218582/Website%20beloveful.com/Logo/White/Beloveful_dniflr.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218581/Website%20beloveful.com/Logo/White/Smallest_aqjfu9.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218581/Website%20beloveful.com/Logo/White/Smallest_aqjfu9.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218580/Website%20beloveful.com/Logo/White/Beloveful_white_transparent_audwbh.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218580/Website%20beloveful.com/Logo/White/Beloveful_white_transparent_audwbh.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218580/Website%20beloveful.com/Logo/White/Smaller_2_rnvcjh.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218580/Website%20beloveful.com/Logo/White/Smaller_2_rnvcjh.png"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "IMG_0007_f4jnqu",
    "slug": "img0007f4jnqu",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218578/Website%20beloveful.com/Logo/IMG_0007_f4jnqu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218578/Website%20beloveful.com/Logo/IMG_0007_f4jnqu.jpg"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "Beloveful_copy_2_ovexsu",
    "slug": "belovefulcopy2ovexsu",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218578/Website%20beloveful.com/Logo/Beloveful_copy_2_ovexsu.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218578/Website%20beloveful.com/Logo/Beloveful_copy_2_ovexsu.png"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "belovefullogowhite_ho0tiz",
    "slug": "belovefullogowhiteho0tiz",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218577/Website%20beloveful.com/Logo/belovefullogowhite_ho0tiz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218577/Website%20beloveful.com/Logo/belovefullogowhite_ho0tiz.jpg"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "nooutline_q5wysb",
    "slug": "nooutlineq5wysb",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218576/Website%20beloveful.com/Logo/nooutline_q5wysb.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218576/Website%20beloveful.com/Logo/nooutline_q5wysb.png"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "IMG_4610_copy.jpg_copy_3_yrluid",
    "slug": "img4610copyjpgcopy3yrluid",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218576/Website%20beloveful.com/Logo/IMG_4610_copy.jpg_copy_3_yrluid.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218576/Website%20beloveful.com/Logo/IMG_4610_copy.jpg_copy_3_yrluid.png"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "Beloveful_black_transparent_hscezu",
    "slug": "belovefulblacktransparenthscezu",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218576/Website%20beloveful.com/Logo/Beloveful_black_transparent_hscezu.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218576/Website%20beloveful.com/Logo/Beloveful_black_transparent_hscezu.png"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "Beloveful_copy_ghik9l",
    "slug": "belovefulcopyghik9l",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218575/Website%20beloveful.com/Logo/Beloveful_copy_ghik9l.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218575/Website%20beloveful.com/Logo/Beloveful_copy_ghik9l.png"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "IMG_4610_hpu56z",
    "slug": "img4610hpu56z",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218575/Website%20beloveful.com/Logo/IMG_4610_hpu56z.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218575/Website%20beloveful.com/Logo/IMG_4610_hpu56z.png"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "beloveful_logo_inverted_75__opacity_t8dpdk",
    "slug": "belovefullogoinverted75opacityt8dpdk",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218574/Website%20beloveful.com/Logo/beloveful_logo_inverted_75__opacity_t8dpdk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218574/Website%20beloveful.com/Logo/beloveful_logo_inverted_75__opacity_t8dpdk.jpg"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "Beloveful_copy_3_owljbn",
    "slug": "belovefulcopy3owljbn",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218573/Website%20beloveful.com/Logo/Beloveful_copy_3_owljbn.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218573/Website%20beloveful.com/Logo/Beloveful_copy_3_owljbn.png"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "IMG_SMALl_l4akll",
    "slug": "imgsmalll4akll",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218573/Website%20beloveful.com/Logo/IMG_SMALl_l4akll.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218573/Website%20beloveful.com/Logo/IMG_SMALl_l4akll.jpg"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "IMG_0007_copy_ftdbzr",
    "slug": "img0007copyftdbzr",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218572/Website%20beloveful.com/Logo/IMG_0007_copy_ftdbzr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218572/Website%20beloveful.com/Logo/IMG_0007_copy_ftdbzr.jpg"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "Beloveful_copy_6_k5mwpt",
    "slug": "belovefulcopy6k5mwpt",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218571/Website%20beloveful.com/Logo/Beloveful_copy_6_k5mwpt.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218571/Website%20beloveful.com/Logo/Beloveful_copy_6_k5mwpt.png"
      }
    ]
  },
  {
    "region": "Logo",
    "country": "IMG_1052_ekyghu",
    "slug": "img1052ekyghu",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218571/Website%20beloveful.com/Logo/IMG_1052_ekyghu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218571/Website%20beloveful.com/Logo/IMG_1052_ekyghu.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "Tony_Menias_-_Two_Girls_in_Window_rgthwg",
    "slug": "tonymenias-twogirlsinwindowrgthwg",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "Vietnam-DSCF8153_copy_vwsvcl",
    "slug": "vietnam-dscf8153copyvwsvcl",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Vietnam-DSCF8153_copy_vwsvcl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Vietnam-DSCF8153_copy_vwsvcl.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "MOR-IMG_5248_copy_uekfqp",
    "slug": "mor-img5248copyuekfqp",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/MOR-IMG_5248_copy_uekfqp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/MOR-IMG_5248_copy_uekfqp.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "CHI-DSCF9471_omluyg",
    "slug": "chi-dscf9471omluyg",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218569/Website%20beloveful.com/Erasing%20Borders/CHI-DSCF9471_omluyg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218569/Website%20beloveful.com/Erasing%20Borders/CHI-DSCF9471_omluyg.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "IND-MeniasTony_8_hycmrp",
    "slug": "ind-meniastony8hycmrp",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218568/Website%20beloveful.com/Erasing%20Borders/IND-MeniasTony_8_hycmrp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218568/Website%20beloveful.com/Erasing%20Borders/IND-MeniasTony_8_hycmrp.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "NatureVSNurture_copy_cpmmlj",
    "slug": "naturevsnurturecopycpmmlj",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218568/Website%20beloveful.com/Erasing%20Borders/NatureVSNurture_copy_cpmmlj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218568/Website%20beloveful.com/Erasing%20Borders/NatureVSNurture_copy_cpmmlj.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "NEP-Silent_Stare_copy_jg5dfb",
    "slug": "nep-silentstarecopyjg5dfb",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218567/Website%20beloveful.com/Erasing%20Borders/NEP-Silent_Stare_copy_jg5dfb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218567/Website%20beloveful.com/Erasing%20Borders/NEP-Silent_Stare_copy_jg5dfb.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "TonyMeniasAMansLegacy_jwoufh",
    "slug": "tonymeniasamanslegacyjwoufh",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218567/Website%20beloveful.com/Erasing%20Borders/TonyMeniasAMansLegacy_jwoufh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218567/Website%20beloveful.com/Erasing%20Borders/TonyMeniasAMansLegacy_jwoufh.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "NEP-DSCF8737_copy_g093tk",
    "slug": "nep-dscf8737copyg093tk",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218566/Website%20beloveful.com/Erasing%20Borders/NEP-DSCF8737_copy_g093tk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218566/Website%20beloveful.com/Erasing%20Borders/NEP-DSCF8737_copy_g093tk.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "IND-MeniasTony_16_koedqp",
    "slug": "ind-meniastony16koedqp",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218566/Website%20beloveful.com/Erasing%20Borders/IND-MeniasTony_16_koedqp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218566/Website%20beloveful.com/Erasing%20Borders/IND-MeniasTony_16_koedqp.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "NyC-DSCF8922_copy_2_lswqmq",
    "slug": "nyc-dscf8922copy2lswqmq",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "DSCF3088_copy_xtmkva",
    "slug": "dscf3088copyxtmkva",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218564/Website%20beloveful.com/Erasing%20Borders/DSCF3088_copy_xtmkva.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218564/Website%20beloveful.com/Erasing%20Borders/DSCF3088_copy_xtmkva.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "MYA-DSCF0783_copy_ngdvkp",
    "slug": "mya-dscf0783copyngdvkp",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218564/Website%20beloveful.com/Erasing%20Borders/MYA-DSCF0783_copy_ngdvkp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218564/Website%20beloveful.com/Erasing%20Borders/MYA-DSCF0783_copy_ngdvkp.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "CHI-MeniasTony_12_zhmfdu",
    "slug": "chi-meniastony12zhmfdu",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218563/Website%20beloveful.com/Erasing%20Borders/CHI-MeniasTony_12_zhmfdu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218563/Website%20beloveful.com/Erasing%20Borders/CHI-MeniasTony_12_zhmfdu.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "THAI-DSCF3890_copy_t2frpq",
    "slug": "thai-dscf3890copyt2frpq",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218563/Website%20beloveful.com/Erasing%20Borders/THAI-DSCF3890_copy_t2frpq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218563/Website%20beloveful.com/Erasing%20Borders/THAI-DSCF3890_copy_t2frpq.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "PAL-DSCF3675_copy_hkjes9",
    "slug": "pal-dscf3675copyhkjes9",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218562/Website%20beloveful.com/Erasing%20Borders/PAL-DSCF3675_copy_hkjes9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218562/Website%20beloveful.com/Erasing%20Borders/PAL-DSCF3675_copy_hkjes9.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "MYA-DSCF9634_copy_rnu1bw",
    "slug": "mya-dscf9634copyrnu1bw",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218561/Website%20beloveful.com/Erasing%20Borders/MYA-DSCF9634_copy_rnu1bw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218561/Website%20beloveful.com/Erasing%20Borders/MYA-DSCF9634_copy_rnu1bw.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "PAL-MeniasTony_13_umcpbf",
    "slug": "pal-meniastony13umcpbf",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218561/Website%20beloveful.com/Erasing%20Borders/PAL-MeniasTony_13_umcpbf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218561/Website%20beloveful.com/Erasing%20Borders/PAL-MeniasTony_13_umcpbf.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "FRA-DSCF0103_copy_scnm1o",
    "slug": "fra-dscf0103copyscnm1o",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218560/Website%20beloveful.com/Erasing%20Borders/FRA-DSCF0103_copy_scnm1o.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218560/Website%20beloveful.com/Erasing%20Borders/FRA-DSCF0103_copy_scnm1o.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "Israel-MeniasTony_20_yrd47y",
    "slug": "israel-meniastony20yrd47y",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218560/Website%20beloveful.com/Erasing%20Borders/Israel-MeniasTony_20_yrd47y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218560/Website%20beloveful.com/Erasing%20Borders/Israel-MeniasTony_20_yrd47y.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "MOR-IMG_5277_jagvrq",
    "slug": "mor-img5277jagvrq",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218559/Website%20beloveful.com/Erasing%20Borders/MOR-IMG_5277_jagvrq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218559/Website%20beloveful.com/Erasing%20Borders/MOR-IMG_5277_jagvrq.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "Greece-DSCF3935_copy_3_kfb8tr",
    "slug": "greece-dscf3935copy3kfb8tr",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218558/Website%20beloveful.com/Erasing%20Borders/Greece-DSCF3935_copy_3_kfb8tr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218558/Website%20beloveful.com/Erasing%20Borders/Greece-DSCF3935_copy_3_kfb8tr.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "PHI-1662_copy_iuo0hw",
    "slug": "phi-1662copyiuo0hw",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218558/Website%20beloveful.com/Erasing%20Borders/PHI-1662_copy_iuo0hw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218558/Website%20beloveful.com/Erasing%20Borders/PHI-1662_copy_iuo0hw.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "CHI-Beloveful6_n0hlne",
    "slug": "chi-beloveful6n0hlne",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218558/Website%20beloveful.com/Erasing%20Borders/CHI-Beloveful6_n0hlne.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218558/Website%20beloveful.com/Erasing%20Borders/CHI-Beloveful6_n0hlne.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "JOR-4461_teauee",
    "slug": "jor-4461teauee",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218558/Website%20beloveful.com/Erasing%20Borders/JOR-4461_teauee.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218558/Website%20beloveful.com/Erasing%20Borders/JOR-4461_teauee.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "IND-MeniasTony_14_cnvjhb",
    "slug": "ind-meniastony14cnvjhb",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218557/Website%20beloveful.com/Erasing%20Borders/IND-MeniasTony_14_cnvjhb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218557/Website%20beloveful.com/Erasing%20Borders/IND-MeniasTony_14_cnvjhb.jpg"
      }
    ]
  },
  {
    "region": "Erasing Borders",
    "country": "JAP-3265_v8dugw",
    "slug": "jap-3265v8dugw",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218557/Website%20beloveful.com/Erasing%20Borders/JAP-3265_v8dugw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218557/Website%20beloveful.com/Erasing%20Borders/JAP-3265_v8dugw.jpg"
      }
    ]
  },
  {
    "region": "Oceania",
    "country": "Mixed Countries",
    "slug": "mixed-countries",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466111/Netflix_Logo_RGB_ee2msb.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466111/Netflix_Logo_RGB_ee2msb.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466110/mediakit_branding_1_jf0qin.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466110/mediakit_branding_1_jf0qin.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466107/Hard_Rock_Hotel_scagaa.svg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466107/Hard_Rock_Hotel_scagaa.svg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466109/breaks-chicago_jx78ob.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466109/breaks-chicago_jx78ob.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466109/egypt_bbdpte.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466109/egypt_bbdpte.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466108/2019-02-05_10.22.37_pm_iaaee9.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466108/2019-02-05_10.22.37_pm_iaaee9.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466106/national-geographic-logo-vector-768x768_atyqqm.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466106/national-geographic-logo-vector-768x768_atyqqm.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466105/kissclipart-navy-pier-logo-clipart-chicago-shakespeare-theater-e550ac399dac0a24_ote3pm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466105/kissclipart-navy-pier-logo-clipart-chicago-shakespeare-theater-e550ac399dac0a24_ote3pm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466105/Flickr_logo_qdzuup.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466105/Flickr_logo_qdzuup.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466104/Time_Magazine_logo.svg_qqjaxk.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466104/Time_Magazine_logo.svg_qqjaxk.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466103/pngegg_nwa8dr.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466103/pngegg_nwa8dr.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466102/pngegg_1_ljj3px.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466102/pngegg_1_ljj3px.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466101/pngegg_2_cm0z3y.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466101/pngegg_2_cm0z3y.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466100/logo_evnmlk.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466100/logo_evnmlk.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466100/benq_mikchz.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466100/benq_mikchz.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466099/TED_tmzl1w.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466099/TED_tmzl1w.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466098/Crowneplaza4_tss4iv.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466098/Crowneplaza4_tss4iv.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466094/Tony_Menias_-_Two_Girls_in_Window_miecqy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466094/Tony_Menias_-_Two_Girls_in_Window_miecqy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466093/Vietnam-DSCF8153_copy_afm450.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466093/Vietnam-DSCF8153_copy_afm450.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466090/NatureVSNurture_copy_zzd1ca.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466090/NatureVSNurture_copy_zzd1ca.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466087/TonyMeniasAMansLegacy_k9hdsv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466087/TonyMeniasAMansLegacy_k9hdsv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466084/NyC-DSCF8922_copy_2_w7uu8e.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466084/NyC-DSCF8922_copy_2_w7uu8e.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466084/DSCF3088_copy_dgres9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466084/DSCF3088_copy_dgres9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466076/Israel-MeniasTony_20_felo26.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466076/Israel-MeniasTony_20_felo26.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466074/Greece-DSCF3935_copy_3_embr8u.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466074/Greece-DSCF3935_copy_3_embr8u.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464680/Belovefulwhitetransparent_simo0i.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464680/Belovefulwhitetransparent_simo0i.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464679/Beloveful_j6qhbq.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464679/Beloveful_j6qhbq.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464679/Smaller_Logo_eu2jev.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464679/Smaller_Logo_eu2jev.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464678/Smallest_q7roe2.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464678/Smallest_q7roe2.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464678/Beloveful_white_transparent_l1gsaf.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464678/Beloveful_white_transparent_l1gsaf.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464677/Smaller_2_f4shkl.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464677/Smaller_2_f4shkl.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464674/IMG_0007_rdhvrz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464674/IMG_0007_rdhvrz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464674/Beloveful_copy_2_r7zstd.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464674/Beloveful_copy_2_r7zstd.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464674/belovefullogowhite_m6nqvq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464674/belovefullogowhite_m6nqvq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464673/nooutline_pfujy6.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464673/nooutline_pfujy6.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464673/IMG_4610_copy.jpg_copy_3_v917ex.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464673/IMG_4610_copy.jpg_copy_3_v917ex.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464668/Beloveful_black_transparent_twsqsq.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464668/Beloveful_black_transparent_twsqsq.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464667/Beloveful_copy_cqunxm.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464667/Beloveful_copy_cqunxm.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464667/IMG_4610_xlnmix.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464667/IMG_4610_xlnmix.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464667/IMG_0007_copy_dgbsjt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464667/IMG_0007_copy_dgbsjt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464666/beloveful_logo_inverted_75__opacity_kdwgtm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464666/beloveful_logo_inverted_75__opacity_kdwgtm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464666/Beloveful_copy_3_msuria.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464666/Beloveful_copy_3_msuria.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464666/Beloveful_copy_6_vubasv.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464666/Beloveful_copy_6_vubasv.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464666/IMG_1052_vbsqo7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464666/IMG_1052_vbsqo7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464666/IMG_SMALl_zkwjoe.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759464666/IMG_SMALl_zkwjoe.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759402610/Sense_of_Scale_leennx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759402610/Sense_of_Scale_leennx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759402567/Into_the_Rabbit_Hole_taaxtc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759402567/Into_the_Rabbit_Hole_taaxtc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759402471/WanderingPaths_uoz9ea.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759402471/WanderingPaths_uoz9ea.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759402469/WanderingPaths_qwdigf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759402469/WanderingPaths_qwdigf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400314/DSCF0926_f2xbs8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400314/DSCF0926_f2xbs8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400312/Fountain_Fairy_mglhmx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400312/Fountain_Fairy_mglhmx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400311/DSCF8938_lowoiy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400311/DSCF8938_lowoiy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400309/DSCF1980_ue5duj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400309/DSCF1980_ue5duj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400307/DSCF7113_nxxnfy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400307/DSCF7113_nxxnfy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400306/DSCF1196_daetl5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400306/DSCF1196_daetl5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400303/DSCF1007_rdv3zy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400303/DSCF1007_rdv3zy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400302/DSCF9626_u3sp6b.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400302/DSCF9626_u3sp6b.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400300/DSCF2587_xw6efa.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400300/DSCF2587_xw6efa.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400298/_DSF9855_ovokr0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400298/_DSF9855_ovokr0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400296/DSCF1841_mku6sk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400296/DSCF1841_mku6sk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400294/DSCF0942_khdkzf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400294/DSCF0942_khdkzf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400293/DSCF9897-2_bvqhnf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400293/DSCF9897-2_bvqhnf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400291/DSCF5972_jtmhha.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400291/DSCF5972_jtmhha.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400289/DSCF0396_b7ozkg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400289/DSCF0396_b7ozkg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400282/Tony_Menias_1_hfgevn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400282/Tony_Menias_1_hfgevn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400216/Tony_Menias-Marathoners_xndk9n.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400216/Tony_Menias-Marathoners_xndk9n.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400197/Marina_City-10-16-16_ddcypr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400197/Marina_City-10-16-16_ddcypr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396540/Spain-DSCF4277_ohy72a.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396540/Spain-DSCF4277_ohy72a.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396539/DSCF4995_tl1fwr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396539/DSCF4995_tl1fwr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396534/SPA-06-23-DSCF8619_vflj0w.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396534/SPA-06-23-DSCF8619_vflj0w.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396531/SPA-06-23-DSCF8291_iuk1yy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396531/SPA-06-23-DSCF8291_iuk1yy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396397/Ireland-DSCF2233_dl6iro.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396397/Ireland-DSCF2233_dl6iro.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396393/DSCF0708_daiyba.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396393/DSCF0708_daiyba.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396390/Ridethewave_hkquvg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396390/Ridethewave_hkquvg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396388/Outlined_dqfy7u.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396388/Outlined_dqfy7u.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396385/Ireland-HeAwaits_pxbdva.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396385/Ireland-HeAwaits_pxbdva.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396383/GoneGirl_vywpye.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396383/GoneGirl_vywpye.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396381/DSCF3251_ahh7y6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396381/DSCF3251_ahh7y6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396377/DSCF3198-Edit-Website-2_cnbhc0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396377/DSCF3198-Edit-Website-2_cnbhc0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396376/DSCF3123_nc7nzw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396376/DSCF3123_nc7nzw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396372/DSCF3031_rnofvr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396372/DSCF3031_rnofvr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396372/DSCF2087_m06iib.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396372/DSCF2087_m06iib.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396368/DSCF1591-Edit_haeggz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396368/DSCF1591-Edit_haeggz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396365/DSCF1055_ky3aif.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396365/DSCF1055_ky3aif.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396248/PORT-06-22-DSCF7572_cjowqh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396248/PORT-06-22-DSCF7572_cjowqh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396246/PORT-06-22-DSCF5934_eicpbk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396246/PORT-06-22-DSCF5934_eicpbk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396245/LIsbon-6784_cvfor9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396245/LIsbon-6784_cvfor9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396241/LIsbon-5511_hfy2zs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396241/LIsbon-5511_hfy2zs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396238/Porto-5222_t0kbhv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396238/Porto-5222_t0kbhv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396236/Porto-5193-3_fcnvgg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396236/Porto-5193-3_fcnvgg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396233/PORT-6458_oaooo1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396233/PORT-6458_oaooo1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396231/PORT-678_mtrpna.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396231/PORT-678_mtrpna.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396229/PORT-482_xd9c7p.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396229/PORT-482_xd9c7p.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396226/PORT-443_dxka3e.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396226/PORT-443_dxka3e.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396223/PORT-420_znb1rp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396223/PORT-420_znb1rp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396221/PORT-267_xx50ea.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396221/PORT-267_xx50ea.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396219/PORT-208_vr8ndf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396219/PORT-208_vr8ndf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396216/PORT-140-Website-2_vwxcbc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396216/PORT-140-Website-2_vwxcbc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396214/PORT-80_jvfhnr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396214/PORT-80_jvfhnr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396211/PORT-78_s5irzp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396211/PORT-78_s5irzp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396208/PORT-06-22-DSCF7819_eid8q1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396208/PORT-06-22-DSCF7819_eid8q1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396207/PORT-06-22-DSCF5792_jhrwx6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396207/PORT-06-22-DSCF5792_jhrwx6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396205/LIsbon-7142_kexa6o.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396205/LIsbon-7142_kexa6o.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396202/LIsbon-6127_wskwst.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396202/LIsbon-6127_wskwst.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396200/LIsbon-5987_klus6w.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396200/LIsbon-5987_klus6w.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396198/Lisbon-5890_c3muuq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396198/Lisbon-5890_c3muuq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396196/Lisbon-5415_u4l5ht.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396196/Lisbon-5415_u4l5ht.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396194/LIsbon-5078_wpbe0t.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396194/LIsbon-5078_wpbe0t.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396059/DSCF9877_cpdmlo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396059/DSCF9877_cpdmlo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396058/DSCF9790_ib2iwb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396058/DSCF9790_ib2iwb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396056/DSCF9772_lwb6zr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396056/DSCF9772_lwb6zr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396052/DSCF9661_gaa43r.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396052/DSCF9661_gaa43r.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396051/DSCF9616_guwt4h.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396051/DSCF9616_guwt4h.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396050/DSCF9603_hk7t0i.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396050/DSCF9603_hk7t0i.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396048/DSCF0856_kowbea.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396048/DSCF0856_kowbea.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396046/DSCF0739_nicrir.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396046/DSCF0739_nicrir.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396044/DSCF0654_mez4dj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396044/DSCF0654_mez4dj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396043/DSCF0703_oiqxz3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396043/DSCF0703_oiqxz3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396042/DSCF0509_w2ufzm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396042/DSCF0509_w2ufzm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396040/DSCF0545_jpxv9i.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396040/DSCF0545_jpxv9i.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396040/DSCF0459_i4goqu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396040/DSCF0459_i4goqu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396033/DSCF0133_kn4mqp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396033/DSCF0133_kn4mqp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396032/DSCF0271_gzfjcn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396032/DSCF0271_gzfjcn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396031/DSCF0103_twkdba.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396031/DSCF0103_twkdba.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396029/DSCF0106_gxizzj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396029/DSCF0106_gxizzj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396024/DSCF0063_bkuzrd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396024/DSCF0063_bkuzrd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395922/DSCF4186_zoiudp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395922/DSCF4186_zoiudp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395918/Greece-DSCF4135_bsfpzl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395918/Greece-DSCF4135_bsfpzl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395909/DSCF4538_oj8bok.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395909/DSCF4538_oj8bok.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395908/DSCF4522_cngbub.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395908/DSCF4522_cngbub.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395906/DSCF4458_aayyus.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395906/DSCF4458_aayyus.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395906/DSCF4324_ohkxec.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395906/DSCF4324_ohkxec.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395901/DSCF4185_st6sbc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395901/DSCF4185_st6sbc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395899/DSCF4135_nw9d7j.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395899/DSCF4135_nw9d7j.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395898/DSCF4025_d3znfp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395898/DSCF4025_d3znfp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395896/DSCF3950_ls9ynt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395896/DSCF3950_ls9ynt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395895/DSCF3837_onwcko.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395895/DSCF3837_onwcko.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395894/DSCF3935_ztjhsa.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395894/DSCF3935_ztjhsa.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395893/DSCF3407_copy_ibvqbl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395893/DSCF3407_copy_ibvqbl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395830/DSCF3885_copy_ttescq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395830/DSCF3885_copy_ttescq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395747/DSCF7678_s1aida.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395747/DSCF7678_s1aida.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395739/DSCF7366_cqm2kf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395739/DSCF7366_cqm2kf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395737/DSCF6643_rpjtrw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395737/DSCF6643_rpjtrw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395734/DSCF5990_wcuil1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395734/DSCF5990_wcuil1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395732/DSCF5985_m1jb7o.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395732/DSCF5985_m1jb7o.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395732/DSCF5223_qxklhl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395732/DSCF5223_qxklhl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395728/DSCF4927_awsnx6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395728/DSCF4927_awsnx6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395726/DSCF4018_yjb9mi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395726/DSCF4018_yjb9mi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395723/DSCF3900_bnyuop.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395723/DSCF3900_bnyuop.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395721/DSCF3885_copy_2_xnfgd6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395721/DSCF3885_copy_2_xnfgd6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395720/DSCF3861_wygb5j.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395720/DSCF3861_wygb5j.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395719/DSCF3847-Website-2_t3bl5i.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395719/DSCF3847-Website-2_t3bl5i.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395716/DSCF3805_unvjbq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395716/DSCF3805_unvjbq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395712/DSCF7701_hzcirg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395712/DSCF7701_hzcirg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395709/DSCF7793_nyjcxd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395709/DSCF7793_nyjcxd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395707/DSCF6139_wboxmd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395707/DSCF6139_wboxmd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395707/DSCF7381_w4fyjm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395707/DSCF7381_w4fyjm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395703/DSCF5259_dnqbtu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395703/DSCF5259_dnqbtu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395703/DSCF5218_w0z9od.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395703/DSCF5218_w0z9od.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395699/DSCF5156_yubqrv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395699/DSCF5156_yubqrv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395696/DSCF5067_cw5xbf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395696/DSCF5067_cw5xbf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395696/DSCF4707_gku6zx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395696/DSCF4707_gku6zx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395692/DSCF4511-Website-2_jtjwac.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395692/DSCF4511-Website-2_jtjwac.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395691/DSCF4511_ddm4wt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395691/DSCF4511_ddm4wt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395691/DSCF4039_shmhdz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395691/DSCF4039_shmhdz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395690/DSCF3885_log9nw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395690/DSCF3885_log9nw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395206/DSCF7793_vulwdw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395206/DSCF7793_vulwdw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395204/DSCF7701_xabxvp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395204/DSCF7701_xabxvp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395203/DSCF6139_bkjdst.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395203/DSCF6139_bkjdst.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395201/DSCF7381_hty7l5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395201/DSCF7381_hty7l5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395200/DSCF5218_bnqjq8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395200/DSCF5218_bnqjq8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395199/DSCF5259_sgl91t.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395199/DSCF5259_sgl91t.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395197/DSCF4707_jbskuu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395197/DSCF4707_jbskuu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395196/DSCF5156_jnzg97.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395196/DSCF5156_jnzg97.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395195/DSCF4511-Website-2_iiw0vd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395195/DSCF4511-Website-2_iiw0vd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395194/DSCF4511_e0ebk9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395194/DSCF4511_e0ebk9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395194/DSCF5067_ilsqjy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395194/DSCF5067_ilsqjy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395191/DSCF4039_qlgwme.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395191/DSCF4039_qlgwme.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395190/DSCF3885_lsrfub.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395190/DSCF3885_lsrfub.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080087/TonyMenias-1303.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080087/TonyMenias-1303.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080086/TonyMenias-1302.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080086/TonyMenias-1302.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080085/TonyMenias-1301.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080085/TonyMenias-1301.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080085/TonyMenias-1300.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080085/TonyMenias-1300.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080084/TonyMenias-1299.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080084/TonyMenias-1299.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080083/TonyMenias-1298.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080083/TonyMenias-1298.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080082/TonyMenias-1297.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080082/TonyMenias-1297.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080081/TonyMenias-1296.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080081/TonyMenias-1296.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080080/TonyMenias-1295.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080080/TonyMenias-1295.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080080/TonyMenias-1294.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080080/TonyMenias-1294.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080079/TonyMenias-1293.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080079/TonyMenias-1293.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080078/TonyMenias-1292.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080078/TonyMenias-1292.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080077/TonyMenias-1291.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080077/TonyMenias-1291.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080076/TonyMenias-1290.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080076/TonyMenias-1290.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080076/TonyMenias-1289.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080076/TonyMenias-1289.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080075/TonyMenias-1288.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080075/TonyMenias-1288.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080074/TonyMenias-1287.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080074/TonyMenias-1287.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080073/TonyMenias-1286.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080073/TonyMenias-1286.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080072/TonyMenias-1285.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080072/TonyMenias-1285.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080071/TonyMenias-1284.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080071/TonyMenias-1284.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080071/TonyMenias-1283.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080071/TonyMenias-1283.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080070/TonyMenias-1282.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080070/TonyMenias-1282.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080069/TonyMenias-1281.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080069/TonyMenias-1281.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080068/TonyMenias-1280.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080068/TonyMenias-1280.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080067/TonyMenias-1279.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080067/TonyMenias-1279.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080066/TonyMenias-1278.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080066/TonyMenias-1278.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080066/TonyMenias-1277.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080066/TonyMenias-1277.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080065/TonyMenias-1276.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080065/TonyMenias-1276.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080064/TonyMenias-1275.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080064/TonyMenias-1275.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080063/TonyMenias-1274.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080063/TonyMenias-1274.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080062/TonyMenias-1273.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080062/TonyMenias-1273.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080061/TonyMenias-1272.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080061/TonyMenias-1272.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080061/TonyMenias-1271.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080061/TonyMenias-1271.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080059/TonyMenias-1270.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080059/TonyMenias-1270.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080059/TonyMenias-1269.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080059/TonyMenias-1269.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080058/TonyMenias-1268.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080058/TonyMenias-1268.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080057/TonyMenias-1267.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080057/TonyMenias-1267.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080056/TonyMenias-1266.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080056/TonyMenias-1266.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080056/TonyMenias-1265.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080056/TonyMenias-1265.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080055/TonyMenias-1264.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080055/TonyMenias-1264.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080054/TonyMenias-1263.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080054/TonyMenias-1263.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080053/TonyMenias-1262.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080053/TonyMenias-1262.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080052/TonyMenias-1261.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080052/TonyMenias-1261.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080051/TonyMenias-1260.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080051/TonyMenias-1260.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080050/TonyMenias-1259.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080050/TonyMenias-1259.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080050/TonyMenias-1258.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080050/TonyMenias-1258.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080049/TonyMenias-1257.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080049/TonyMenias-1257.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080048/TonyMenias-1256.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080048/TonyMenias-1256.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080047/TonyMenias-1255.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080047/TonyMenias-1255.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080047/TonyMenias-1254.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080047/TonyMenias-1254.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080046/TonyMenias-1253.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080046/TonyMenias-1253.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080045/TonyMenias-1252.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080045/TonyMenias-1252.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080044/TonyMenias-1251.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080044/TonyMenias-1251.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080043/TonyMenias-1250.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080043/TonyMenias-1250.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080043/TonyMenias-1249.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080043/TonyMenias-1249.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080042/TonyMenias-1248.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080042/TonyMenias-1248.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080041/TonyMenias-1247.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080041/TonyMenias-1247.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080040/TonyMenias-1246.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080040/TonyMenias-1246.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080039/TonyMenias-1245.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080039/TonyMenias-1245.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080039/TonyMenias-1244.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080039/TonyMenias-1244.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080038/TonyMenias-1243.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080038/TonyMenias-1243.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080037/TonyMenias-1242.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080037/TonyMenias-1242.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080036/TonyMenias-1241.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080036/TonyMenias-1241.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080035/TonyMenias-1240.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080035/TonyMenias-1240.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080034/TonyMenias-1239.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080034/TonyMenias-1239.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080033/TonyMenias-1238.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080033/TonyMenias-1238.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080033/TonyMenias-1237.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080033/TonyMenias-1237.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080032/TonyMenias-1236.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080032/TonyMenias-1236.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080031/TonyMenias-1235.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080031/TonyMenias-1235.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080030/TonyMenias-1234.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080030/TonyMenias-1234.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080029/TonyMenias-1233.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080029/TonyMenias-1233.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080029/TonyMenias-1232.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080029/TonyMenias-1232.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080028/TonyMenias-1231.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080028/TonyMenias-1231.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080026/TonyMenias-1230.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080026/TonyMenias-1230.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080026/TonyMenias-1228.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080026/TonyMenias-1228.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080026/TonyMenias-1229.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080026/TonyMenias-1229.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080024/TonyMenias-1227.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080024/TonyMenias-1227.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080023/TonyMenias-1226.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080023/TonyMenias-1226.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080022/TonyMenias-1225.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080022/TonyMenias-1225.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080022/TonyMenias-1224.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080022/TonyMenias-1224.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080021/TonyMenias-1223.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080021/TonyMenias-1223.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080020/TonyMenias-1222.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080020/TonyMenias-1222.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080019/TonyMenias-1221.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080019/TonyMenias-1221.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080019/TonyMenias-1220.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080019/TonyMenias-1220.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080017/TonyMenias-1219.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080017/TonyMenias-1219.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080016/TonyMenias-1218.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080016/TonyMenias-1218.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080016/TonyMenias-1216.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080016/TonyMenias-1216.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080015/TonyMenias-1217.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080015/TonyMenias-1217.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080014/TonyMenias-1215.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080014/TonyMenias-1215.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080013/TonyMenias-1214.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080013/TonyMenias-1214.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080012/TonyMenias-1213.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080012/TonyMenias-1213.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080011/TonyMenias-1212.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080011/TonyMenias-1212.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080011/TonyMenias-1211.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080011/TonyMenias-1211.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080009/TonyMenias-1210.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080009/TonyMenias-1210.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080009/TonyMenias-1209.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080009/TonyMenias-1209.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080008/TonyMenias-1208.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080008/TonyMenias-1208.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080007/TonyMenias-1207.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080007/TonyMenias-1207.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080006/TonyMenias-1206.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080006/TonyMenias-1206.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080005/TonyMenias-1205.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080005/TonyMenias-1205.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080005/TonyMenias-1204.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080005/TonyMenias-1204.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080004/TonyMenias-1203.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080004/TonyMenias-1203.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080003/TonyMenias-1202.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080003/TonyMenias-1202.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080002/TonyMenias-1201.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080002/TonyMenias-1201.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080001/TonyMenias-1200.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080001/TonyMenias-1200.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080001/TonyMenias-1199.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080001/TonyMenias-1199.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080000/TonyMenias-1198.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759080000/TonyMenias-1198.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079999/TonyMenias-1197.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079999/TonyMenias-1197.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079998/TonyMenias-1196.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079998/TonyMenias-1196.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079997/TonyMenias-1195.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079997/TonyMenias-1195.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079996/TonyMenias-1194.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079996/TonyMenias-1194.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079995/TonyMenias-1193.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079995/TonyMenias-1193.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079994/TonyMenias-1192.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079994/TonyMenias-1192.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079994/TonyMenias-1191.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079994/TonyMenias-1191.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079993/TonyMenias-1190.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079993/TonyMenias-1190.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079992/TonyMenias-1189.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079992/TonyMenias-1189.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079991/TonyMenias-1188.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079991/TonyMenias-1188.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079990/TonyMenias-1187.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079990/TonyMenias-1187.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079989/TonyMenias-1186.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079989/TonyMenias-1186.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079989/TonyMenias-1185.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079989/TonyMenias-1185.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079988/TonyMenias-1184.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079988/TonyMenias-1184.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079987/TonyMenias-1183.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079987/TonyMenias-1183.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079986/TonyMenias-1182.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079986/TonyMenias-1182.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079985/TonyMenias-1181.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079985/TonyMenias-1181.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079984/TonyMenias-1180.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079984/TonyMenias-1180.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079983/TonyMenias-1178.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079983/TonyMenias-1178.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079983/TonyMenias-1179.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079983/TonyMenias-1179.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079983/TonyMenias-1177.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079983/TonyMenias-1177.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079981/TonyMenias-1176.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079981/TonyMenias-1176.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079980/TonyMenias-1175.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079980/TonyMenias-1175.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079979/TonyMenias-1174.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079979/TonyMenias-1174.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079979/TonyMenias-1173.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079979/TonyMenias-1173.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079978/TonyMenias-1172.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079978/TonyMenias-1172.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079977/TonyMenias-1171.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079977/TonyMenias-1171.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079976/TonyMenias-1170.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079976/TonyMenias-1170.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079975/TonyMenias-1169.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079975/TonyMenias-1169.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079974/TonyMenias-1168.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079974/TonyMenias-1168.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079974/TonyMenias-1167.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079974/TonyMenias-1167.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079973/TonyMenias-1166.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079973/TonyMenias-1166.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079972/TonyMenias-1165.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079972/TonyMenias-1165.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079971/TonyMenias-1164.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079971/TonyMenias-1164.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079971/TonyMenias-1163.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079971/TonyMenias-1163.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079970/TonyMenias-1162.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079970/TonyMenias-1162.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079970/TonyMenias-1161.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079970/TonyMenias-1161.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079968/TonyMenias-1160.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079968/TonyMenias-1160.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079968/TonyMenias-1159.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079968/TonyMenias-1159.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079967/TonyMenias-1158.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079967/TonyMenias-1158.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079966/TonyMenias-1157.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079966/TonyMenias-1157.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079965/TonyMenias-1156.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079965/TonyMenias-1156.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079964/TonyMenias-1155.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079964/TonyMenias-1155.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079964/TonyMenias-1154.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079964/TonyMenias-1154.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079963/TonyMenias-1153.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079963/TonyMenias-1153.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079962/TonyMenias-1152.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079962/TonyMenias-1152.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079961/TonyMenias-1151.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079961/TonyMenias-1151.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079960/TonyMenias-1150.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079960/TonyMenias-1150.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079960/TonyMenias-1149.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079960/TonyMenias-1149.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079959/TonyMenias-1148.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079959/TonyMenias-1148.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079958/TonyMenias-1147.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079958/TonyMenias-1147.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079958/TonyMenias-1146.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079958/TonyMenias-1146.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079956/TonyMenias-1145.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079956/TonyMenias-1145.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079955/TonyMenias-1144.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079955/TonyMenias-1144.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079954/TonyMenias-1143.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079954/TonyMenias-1143.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079954/TonyMenias-1142.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079954/TonyMenias-1142.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079953/TonyMenias-1141.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079953/TonyMenias-1141.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079953/TonyMenias-1140.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079953/TonyMenias-1140.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079951/TonyMenias-1139.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079951/TonyMenias-1139.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079950/TonyMenias-1138.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079950/TonyMenias-1138.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079949/TonyMenias-1137.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079949/TonyMenias-1137.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079949/TonyMenias-1136.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079949/TonyMenias-1136.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079948/TonyMenias-1135.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079948/TonyMenias-1135.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079947/TonyMenias-1134.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079947/TonyMenias-1134.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079947/TonyMenias-1133.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079947/TonyMenias-1133.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079945/TonyMenias-1132.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079945/TonyMenias-1132.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079945/TonyMenias-1131.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079945/TonyMenias-1131.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079944/TonyMenias-1130.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079944/TonyMenias-1130.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079942/TonyMenias-1127.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079942/TonyMenias-1127.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079943/TonyMenias-1129.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079943/TonyMenias-1129.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079942/TonyMenias-1128.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079942/TonyMenias-1128.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079940/TonyMenias-1125.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079940/TonyMenias-1125.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079939/TonyMenias-1124.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079939/TonyMenias-1124.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079939/TonyMenias-1123.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079939/TonyMenias-1123.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079938/TonyMenias-1122.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079938/TonyMenias-1122.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079937/TonyMenias-1121.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079937/TonyMenias-1121.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079936/TonyMenias-1120.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079936/TonyMenias-1120.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079936/TonyMenias-1119.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079936/TonyMenias-1119.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079935/TonyMenias-1118.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079935/TonyMenias-1118.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079934/TonyMenias-1117.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079934/TonyMenias-1117.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079933/TonyMenias-1116.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079933/TonyMenias-1116.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079932/TonyMenias-1115.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079932/TonyMenias-1115.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079932/TonyMenias-1114.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079932/TonyMenias-1114.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079931/TonyMenias-1113.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079931/TonyMenias-1113.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079930/TonyMenias-1112.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079930/TonyMenias-1112.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079930/TonyMenias-1110.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079930/TonyMenias-1110.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079929/TonyMenias-1111.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079929/TonyMenias-1111.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079928/TonyMenias-1109.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079928/TonyMenias-1109.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079928/TonyMenias-1107.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079928/TonyMenias-1107.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079927/TonyMenias-1108.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079927/TonyMenias-1108.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079925/TonyMenias-1106.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079925/TonyMenias-1106.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079925/TonyMenias-1105.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079925/TonyMenias-1105.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079924/TonyMenias-1104.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079924/TonyMenias-1104.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079923/TonyMenias-1102.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079923/TonyMenias-1102.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079923/TonyMenias-1103.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079923/TonyMenias-1103.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079922/TonyMenias-1101.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079922/TonyMenias-1101.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079921/TonyMenias-1100.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079921/TonyMenias-1100.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079920/TonyMenias-1099.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079920/TonyMenias-1099.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079919/TonyMenias-1098.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079919/TonyMenias-1098.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079919/TonyMenias-1097.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079919/TonyMenias-1097.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079918/TonyMenias-1096.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079918/TonyMenias-1096.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079917/TonyMenias-1095.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079917/TonyMenias-1095.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079917/TonyMenias-1094.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079917/TonyMenias-1094.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079915/TonyMenias-1093.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079915/TonyMenias-1093.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079915/TonyMenias-1092.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079915/TonyMenias-1092.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079914/TonyMenias-1091.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079914/TonyMenias-1091.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079913/TonyMenias-1090.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079913/TonyMenias-1090.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079912/TonyMenias-1089.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079912/TonyMenias-1089.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079912/TonyMenias-1088.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079912/TonyMenias-1088.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079911/TonyMenias-1087.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079911/TonyMenias-1087.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079910/TonyMenias-1086.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079910/TonyMenias-1086.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079909/TonyMenias-1085.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079909/TonyMenias-1085.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079908/TonyMenias-1084.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079908/TonyMenias-1084.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079908/TonyMenias-1083.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079908/TonyMenias-1083.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079907/TonyMenias-1082.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079907/TonyMenias-1082.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079906/TonyMenias-1081.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079906/TonyMenias-1081.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079905/TonyMenias-1080.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079905/TonyMenias-1080.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079904/TonyMenias-1079.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079904/TonyMenias-1079.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079904/TonyMenias-1077.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079904/TonyMenias-1077.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079904/TonyMenias-1078.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079904/TonyMenias-1078.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079902/TonyMenias-1076.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079902/TonyMenias-1076.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079902/TonyMenias-1075.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079902/TonyMenias-1075.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079901/TonyMenias-1074.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079901/TonyMenias-1074.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079900/TonyMenias-1073.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079900/TonyMenias-1073.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079899/TonyMenias-1072.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079899/TonyMenias-1072.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079898/TonyMenias-1071.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079898/TonyMenias-1071.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079897/TonyMenias-1070.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079897/TonyMenias-1070.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079896/TonyMenias-1069.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079896/TonyMenias-1069.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079896/TonyMenias-1068.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079896/TonyMenias-1068.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079895/TonyMenias-1067.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079895/TonyMenias-1067.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079894/TonyMenias-1066.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079894/TonyMenias-1066.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079893/TonyMenias-1065.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079893/TonyMenias-1065.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079893/TonyMenias-1064.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079893/TonyMenias-1064.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079892/TonyMenias-1063.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079892/TonyMenias-1063.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079891/TonyMenias-1062.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079891/TonyMenias-1062.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079890/TonyMenias-1061.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079890/TonyMenias-1061.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079889/TonyMenias-1060.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079889/TonyMenias-1060.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079889/TonyMenias-1059.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079889/TonyMenias-1059.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079888/TonyMenias-1058.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079888/TonyMenias-1058.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079887/TonyMenias-1057.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079887/TonyMenias-1057.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079887/TonyMenias-1056.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079887/TonyMenias-1056.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079885/TonyMenias-1055.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079885/TonyMenias-1055.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079884/TonyMenias-1054.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079884/TonyMenias-1054.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079884/TonyMenias-1053.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079884/TonyMenias-1053.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079883/TonyMenias-1052.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079883/TonyMenias-1052.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079882/TonyMenias-1051.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079882/TonyMenias-1051.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079882/TonyMenias-1050.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079882/TonyMenias-1050.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079880/TonyMenias-1049.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079880/TonyMenias-1049.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079880/TonyMenias-1048.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079880/TonyMenias-1048.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079879/TonyMenias-1047.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079879/TonyMenias-1047.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079878/TonyMenias-1046.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079878/TonyMenias-1046.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079878/TonyMenias-1045.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079878/TonyMenias-1045.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079877/TonyMenias-1044.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079877/TonyMenias-1044.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079876/TonyMenias-1043.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079876/TonyMenias-1043.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079875/TonyMenias-1042.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079875/TonyMenias-1042.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079874/TonyMenias-1041.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079874/TonyMenias-1041.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079873/TonyMenias-1040.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079873/TonyMenias-1040.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079873/TonyMenias-1039.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079873/TonyMenias-1039.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079872/TonyMenias-1038.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079872/TonyMenias-1038.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079871/TonyMenias-1037.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079871/TonyMenias-1037.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079870/TonyMenias-1036.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079870/TonyMenias-1036.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079870/TonyMenias-1035.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079870/TonyMenias-1035.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079869/TonyMenias-1034.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079869/TonyMenias-1034.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079869/TonyMenias-1033.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079869/TonyMenias-1033.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079868/TonyMenias-1032.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079868/TonyMenias-1032.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079867/TonyMenias-1031.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079867/TonyMenias-1031.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079866/TonyMenias-1030.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079866/TonyMenias-1030.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079866/TonyMenias-1029.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079866/TonyMenias-1029.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079865/TonyMenias-1028.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079865/TonyMenias-1028.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079864/TonyMenias-1027.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079864/TonyMenias-1027.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079863/TonyMenias-1026.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079863/TonyMenias-1026.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079862/TonyMenias-1025.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079862/TonyMenias-1025.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079862/TonyMenias-1024.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079862/TonyMenias-1024.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079861/TonyMenias-1023.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079861/TonyMenias-1023.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079860/TonyMenias-1022.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079860/TonyMenias-1022.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079859/TonyMenias-1021.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079859/TonyMenias-1021.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079859/TonyMenias-1019.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079859/TonyMenias-1019.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079858/TonyMenias-1020.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079858/TonyMenias-1020.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079857/TonyMenias-1018.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079857/TonyMenias-1018.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079856/TonyMenias-1016.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079856/TonyMenias-1016.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079856/TonyMenias-1017.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079856/TonyMenias-1017.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079855/TonyMenias-1015.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079855/TonyMenias-1015.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079853/TonyMenias-1014.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079853/TonyMenias-1014.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079853/TonyMenias-1013.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079853/TonyMenias-1013.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079852/TonyMenias-1012.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079852/TonyMenias-1012.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079851/TonyMenias-1011.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079851/TonyMenias-1011.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079850/TonyMenias-1010.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079850/TonyMenias-1010.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079849/TonyMenias-1009.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079849/TonyMenias-1009.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079848/TonyMenias-1008.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079848/TonyMenias-1008.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079848/TonyMenias-1007.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079848/TonyMenias-1007.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079847/TonyMenias-1006.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079847/TonyMenias-1006.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079846/TonyMenias-1005.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079846/TonyMenias-1005.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079845/TonyMenias-1004.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079845/TonyMenias-1004.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079844/TonyMenias-1003.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079844/TonyMenias-1003.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079843/TonyMenias-1002.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079843/TonyMenias-1002.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079843/TonyMenias-1001.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079843/TonyMenias-1001.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079841/TonyMenias-1000.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079841/TonyMenias-1000.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079840/TonyMenias-999.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079840/TonyMenias-999.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079840/TonyMenias-998.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079840/TonyMenias-998.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079839/TonyMenias-997.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079839/TonyMenias-997.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079838/TonyMenias-996.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079838/TonyMenias-996.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079837/TonyMenias-995.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079837/TonyMenias-995.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079836/TonyMenias-993.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079836/TonyMenias-993.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079836/TonyMenias-994.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079836/TonyMenias-994.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079836/TonyMenias-992.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079836/TonyMenias-992.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079834/TonyMenias-991.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079834/TonyMenias-991.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079834/TonyMenias-990.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079834/TonyMenias-990.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079832/TonyMenias-989.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079832/TonyMenias-989.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079832/TonyMenias-988.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079832/TonyMenias-988.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079831/TonyMenias-987.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079831/TonyMenias-987.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079830/TonyMenias-986.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079830/TonyMenias-986.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079830/TonyMenias-985.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079830/TonyMenias-985.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079828/TonyMenias-984.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079828/TonyMenias-984.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079828/TonyMenias-983.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079828/TonyMenias-983.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079827/TonyMenias-982.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079827/TonyMenias-982.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079826/TonyMenias-981.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079826/TonyMenias-981.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079825/TonyMenias-980.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079825/TonyMenias-980.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079824/TonyMenias-979.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079824/TonyMenias-979.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079823/TonyMenias-977.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079823/TonyMenias-977.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079823/TonyMenias-978.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079823/TonyMenias-978.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079822/TonyMenias-976.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079822/TonyMenias-976.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079821/TonyMenias-975.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079821/TonyMenias-975.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079821/TonyMenias-974.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079821/TonyMenias-974.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079819/TonyMenias-973.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079819/TonyMenias-973.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079819/TonyMenias-972.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079819/TonyMenias-972.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079818/TonyMenias-971.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079818/TonyMenias-971.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079817/TonyMenias-970.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079817/TonyMenias-970.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079817/TonyMenias-969.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079817/TonyMenias-969.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079815/TonyMenias-968.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079815/TonyMenias-968.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079815/TonyMenias-967.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079815/TonyMenias-967.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079814/TonyMenias-966.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079814/TonyMenias-966.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079813/TonyMenias-965.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079813/TonyMenias-965.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079812/TonyMenias-964.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079812/TonyMenias-964.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079812/TonyMenias-963.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079812/TonyMenias-963.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079811/TonyMenias-962.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079811/TonyMenias-962.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079810/TonyMenias-961.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079810/TonyMenias-961.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079809/TonyMenias-960.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079809/TonyMenias-960.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079808/TonyMenias-959.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079808/TonyMenias-959.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079808/TonyMenias-958.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079808/TonyMenias-958.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079807/TonyMenias-957.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079807/TonyMenias-957.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079806/TonyMenias-956.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079806/TonyMenias-956.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079806/TonyMenias-955.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079806/TonyMenias-955.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079805/TonyMenias-954.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079805/TonyMenias-954.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079804/TonyMenias-953.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079804/TonyMenias-953.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079803/TonyMenias-952.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079803/TonyMenias-952.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079802/TonyMenias-951.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079802/TonyMenias-951.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079801/TonyMenias-950.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079801/TonyMenias-950.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079801/TonyMenias-949.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079801/TonyMenias-949.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079800/TonyMenias-948.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079800/TonyMenias-948.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079799/TonyMenias-947.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079799/TonyMenias-947.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079798/TonyMenias-946.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079798/TonyMenias-946.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079797/TonyMenias-944.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079797/TonyMenias-944.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079796/TonyMenias-943.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079796/TonyMenias-943.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079795/TonyMenias-942.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079795/TonyMenias-942.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079794/TonyMenias-941.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079794/TonyMenias-941.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079793/TonyMenias-940.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079793/TonyMenias-940.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079793/TonyMenias-939.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079793/TonyMenias-939.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079792/TonyMenias-938.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079792/TonyMenias-938.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079791/TonyMenias-936.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079791/TonyMenias-936.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079791/TonyMenias-937.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079791/TonyMenias-937.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079789/TonyMenias-935.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079789/TonyMenias-935.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079788/TonyMenias-934.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079788/TonyMenias-934.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079787/TonyMenias-933.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079787/TonyMenias-933.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079786/TonyMenias-932.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079786/TonyMenias-932.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079786/TonyMenias-931.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079786/TonyMenias-931.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079784/TonyMenias-930.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079784/TonyMenias-930.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079784/TonyMenias-929.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079784/TonyMenias-929.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079783/TonyMenias-928.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079783/TonyMenias-928.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079782/TonyMenias-927.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079782/TonyMenias-927.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079782/TonyMenias-926.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079782/TonyMenias-926.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079781/TonyMenias-925.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079781/TonyMenias-925.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079780/TonyMenias-924.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079780/TonyMenias-924.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079779/TonyMenias-923.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079779/TonyMenias-923.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079779/TonyMenias-922.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079779/TonyMenias-922.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079778/TonyMenias-921.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079778/TonyMenias-921.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079777/TonyMenias-920.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079777/TonyMenias-920.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079776/TonyMenias-919.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079776/TonyMenias-919.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079775/TonyMenias-918.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079775/TonyMenias-918.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079774/TonyMenias-917.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079774/TonyMenias-917.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079773/TonyMenias-916.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079773/TonyMenias-916.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079772/TonyMenias-915.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079772/TonyMenias-915.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079771/TonyMenias-914.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079771/TonyMenias-914.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079771/TonyMenias-913.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079771/TonyMenias-913.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079770/TonyMenias-912.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079770/TonyMenias-912.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079770/TonyMenias-911.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079770/TonyMenias-911.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079768/TonyMenias-910.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079768/TonyMenias-910.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079767/TonyMenias-909.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079767/TonyMenias-909.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079767/TonyMenias-908.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079767/TonyMenias-908.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079766/TonyMenias-907.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079766/TonyMenias-907.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079766/TonyMenias-906.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079766/TonyMenias-906.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079764/TonyMenias-905.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079764/TonyMenias-905.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079763/TonyMenias-904.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079763/TonyMenias-904.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079763/TonyMenias-903.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079763/TonyMenias-903.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079762/TonyMenias-902.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079762/TonyMenias-902.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079761/TonyMenias-901.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079761/TonyMenias-901.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079761/TonyMenias-900.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079761/TonyMenias-900.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079759/TonyMenias-899.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079759/TonyMenias-899.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079758/TonyMenias-898.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079758/TonyMenias-898.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079758/TonyMenias-897.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079758/TonyMenias-897.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079757/TonyMenias-896.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079757/TonyMenias-896.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079756/TonyMenias-895.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079756/TonyMenias-895.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079755/TonyMenias-894.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079755/TonyMenias-894.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079754/TonyMenias-892.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079754/TonyMenias-892.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079754/TonyMenias-893.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079754/TonyMenias-893.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079753/TonyMenias-891.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079753/TonyMenias-891.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079752/TonyMenias-890.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079752/TonyMenias-890.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079751/TonyMenias-889.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079751/TonyMenias-889.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079751/TonyMenias-888.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079751/TonyMenias-888.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079750/TonyMenias-887.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079750/TonyMenias-887.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079749/TonyMenias-886.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079749/TonyMenias-886.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079748/TonyMenias-885.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079748/TonyMenias-885.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079748/TonyMenias-884.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079748/TonyMenias-884.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079747/TonyMenias-883.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079747/TonyMenias-883.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079746/TonyMenias-882.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079746/TonyMenias-882.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079745/TonyMenias-881.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079745/TonyMenias-881.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079745/TonyMenias-880.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079745/TonyMenias-880.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079744/TonyMenias-879.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079744/TonyMenias-879.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079743/TonyMenias-878.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079743/TonyMenias-878.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079742/TonyMenias-877.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079742/TonyMenias-877.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079742/TonyMenias-876.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079742/TonyMenias-876.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079740/TonyMenias-875.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079740/TonyMenias-875.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079740/TonyMenias-874.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079740/TonyMenias-874.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079739/TonyMenias-873.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079739/TonyMenias-873.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079738/TonyMenias-872.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079738/TonyMenias-872.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079737/TonyMenias-870.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079737/TonyMenias-870.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079737/TonyMenias-871.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079737/TonyMenias-871.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079735/TonyMenias-869.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079735/TonyMenias-869.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079735/TonyMenias-868.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079735/TonyMenias-868.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079733/TonyMenias-867.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079733/TonyMenias-867.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079732/TonyMenias-866.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079732/TonyMenias-866.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079732/TonyMenias-865.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079732/TonyMenias-865.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079731/TonyMenias-864.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079731/TonyMenias-864.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079730/TonyMenias-863.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079730/TonyMenias-863.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079729/TonyMenias-862.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079729/TonyMenias-862.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079729/TonyMenias-860.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079729/TonyMenias-860.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079729/TonyMenias-861.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079729/TonyMenias-861.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079727/TonyMenias-859.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079727/TonyMenias-859.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079727/TonyMenias-858.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079727/TonyMenias-858.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079726/TonyMenias-857.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079726/TonyMenias-857.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079725/TonyMenias-856.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079725/TonyMenias-856.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079724/TonyMenias-855.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079724/TonyMenias-855.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079723/TonyMenias-854.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079723/TonyMenias-854.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079722/TonyMenias-853.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079722/TonyMenias-853.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079721/TonyMenias-852.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079721/TonyMenias-852.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079721/TonyMenias-851.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079721/TonyMenias-851.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079720/TonyMenias-850.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079720/TonyMenias-850.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079720/TonyMenias-849.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079720/TonyMenias-849.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079719/TonyMenias-848.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079719/TonyMenias-848.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079718/TonyMenias-847.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079718/TonyMenias-847.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079717/TonyMenias-846.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079717/TonyMenias-846.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079716/TonyMenias-845.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079716/TonyMenias-845.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079715/TonyMenias-844.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079715/TonyMenias-844.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079715/TonyMenias-843.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079715/TonyMenias-843.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079714/TonyMenias-842.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079714/TonyMenias-842.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079713/TonyMenias-841.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079713/TonyMenias-841.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079712/TonyMenias-840.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079712/TonyMenias-840.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079711/TonyMenias-839.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079711/TonyMenias-839.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079711/TonyMenias-838.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079711/TonyMenias-838.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079710/TonyMenias-837.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079710/TonyMenias-837.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079709/TonyMenias-836.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079709/TonyMenias-836.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079708/TonyMenias-835.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079708/TonyMenias-835.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079707/TonyMenias-834.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079707/TonyMenias-834.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079707/TonyMenias-833.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079707/TonyMenias-833.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079706/TonyMenias-832.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079706/TonyMenias-832.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079705/TonyMenias-831.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079705/TonyMenias-831.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079704/TonyMenias-830.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079704/TonyMenias-830.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079703/TonyMenias-829.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079703/TonyMenias-829.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079703/TonyMenias-828.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079703/TonyMenias-828.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079702/TonyMenias-827.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079702/TonyMenias-827.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079701/TonyMenias-826.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079701/TonyMenias-826.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079700/TonyMenias-825.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079700/TonyMenias-825.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079699/TonyMenias-824.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079699/TonyMenias-824.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079698/TonyMenias-823.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079698/TonyMenias-823.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079697/TonyMenias-822.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079697/TonyMenias-822.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079697/TonyMenias-821.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079697/TonyMenias-821.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079697/TonyMenias-820.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079697/TonyMenias-820.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079694/TonyMenias-818.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079694/TonyMenias-818.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079695/TonyMenias-819.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079695/TonyMenias-819.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079693/TonyMenias-817.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079693/TonyMenias-817.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079693/TonyMenias-816.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079693/TonyMenias-816.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079692/TonyMenias-815.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079692/TonyMenias-815.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079691/TonyMenias-814.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079691/TonyMenias-814.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079690/TonyMenias-813.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079690/TonyMenias-813.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079689/TonyMenias-812.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079689/TonyMenias-812.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079688/TonyMenias-811.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079688/TonyMenias-811.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079687/TonyMenias-809.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079687/TonyMenias-809.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079687/TonyMenias-810.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079687/TonyMenias-810.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079686/TonyMenias-808.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079686/TonyMenias-808.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079685/TonyMenias-807.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079685/TonyMenias-807.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079682/TonyMenias-806.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079682/TonyMenias-806.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079681/TonyMenias-805.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079681/TonyMenias-805.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079680/TonyMenias-804.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079680/TonyMenias-804.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079679/TonyMenias-803.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079679/TonyMenias-803.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079677/TonyMenias-802.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079677/TonyMenias-802.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079676/TonyMenias-801.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079676/TonyMenias-801.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079675/TonyMenias-800.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079675/TonyMenias-800.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079674/TonyMenias-799.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079674/TonyMenias-799.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079673/TonyMenias-798.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079673/TonyMenias-798.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079672/TonyMenias-797.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079672/TonyMenias-797.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079672/TonyMenias-796.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079672/TonyMenias-796.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079670/TonyMenias-795.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079670/TonyMenias-795.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079669/TonyMenias-794.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079669/TonyMenias-794.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079668/TonyMenias-793.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079668/TonyMenias-793.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079667/TonyMenias-792.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079667/TonyMenias-792.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079666/TonyMenias-791.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079666/TonyMenias-791.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079665/TonyMenias-790.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079665/TonyMenias-790.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079664/TonyMenias-789.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079664/TonyMenias-789.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079664/TonyMenias-788.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079664/TonyMenias-788.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079663/TonyMenias-787.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079663/TonyMenias-787.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079662/TonyMenias-786.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079662/TonyMenias-786.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079661/TonyMenias-785.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079661/TonyMenias-785.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079661/TonyMenias-784.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079661/TonyMenias-784.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079659/TonyMenias-783.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079659/TonyMenias-783.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079658/TonyMenias-782.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079658/TonyMenias-782.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079658/TonyMenias-781.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079658/TonyMenias-781.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079656/TonyMenias-780.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079656/TonyMenias-780.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079655/TonyMenias-779.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079655/TonyMenias-779.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079655/TonyMenias-778.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079655/TonyMenias-778.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079654/TonyMenias-777.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079654/TonyMenias-777.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079652/TonyMenias-776.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079652/TonyMenias-776.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079651/TonyMenias-775.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079651/TonyMenias-775.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079650/TonyMenias-774.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079650/TonyMenias-774.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079649/TonyMenias-773.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079649/TonyMenias-773.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079649/TonyMenias-772.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079649/TonyMenias-772.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079648/TonyMenias-771.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079648/TonyMenias-771.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079647/TonyMenias-770.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079647/TonyMenias-770.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079646/TonyMenias-769.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079646/TonyMenias-769.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079645/TonyMenias-768.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079645/TonyMenias-768.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079644/TonyMenias-767.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079644/TonyMenias-767.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079643/TonyMenias-766.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079643/TonyMenias-766.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079642/TonyMenias-764.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079642/TonyMenias-764.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079642/TonyMenias-765.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079642/TonyMenias-765.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079641/TonyMenias-763.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079641/TonyMenias-763.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079640/TonyMenias-762.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079640/TonyMenias-762.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079639/TonyMenias-761.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079639/TonyMenias-761.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079639/TonyMenias-760.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079639/TonyMenias-760.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079638/TonyMenias-759.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079638/TonyMenias-759.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079637/TonyMenias-757.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079637/TonyMenias-757.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079637/TonyMenias-758.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079637/TonyMenias-758.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079636/TonyMenias-756.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079636/TonyMenias-756.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079635/TonyMenias-755.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079635/TonyMenias-755.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079634/TonyMenias-754.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079634/TonyMenias-754.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079633/TonyMenias-753.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079633/TonyMenias-753.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079633/TonyMenias-752.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079633/TonyMenias-752.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079631/TonyMenias-751.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079631/TonyMenias-751.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079631/TonyMenias-750.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079631/TonyMenias-750.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079630/TonyMenias-749.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079630/TonyMenias-749.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079629/TonyMenias-748.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079629/TonyMenias-748.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079628/TonyMenias-747.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079628/TonyMenias-747.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079628/TonyMenias-746.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079628/TonyMenias-746.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079627/TonyMenias-745.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079627/TonyMenias-745.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079626/TonyMenias-744.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079626/TonyMenias-744.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079625/TonyMenias-743.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079625/TonyMenias-743.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079624/TonyMenias-741.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079624/TonyMenias-741.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079624/TonyMenias-742.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079624/TonyMenias-742.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079623/TonyMenias-740.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079623/TonyMenias-740.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079622/TonyMenias-739.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079622/TonyMenias-739.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079621/TonyMenias-738.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079621/TonyMenias-738.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079621/TonyMenias-737.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079621/TonyMenias-737.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079620/TonyMenias-736.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079620/TonyMenias-736.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079619/TonyMenias-735.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079619/TonyMenias-735.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079618/TonyMenias-734.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079618/TonyMenias-734.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079617/TonyMenias-733.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079617/TonyMenias-733.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079617/TonyMenias-732.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079617/TonyMenias-732.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079616/TonyMenias-731.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079616/TonyMenias-731.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079615/TonyMenias-730.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079615/TonyMenias-730.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079615/TonyMenias-729.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079615/TonyMenias-729.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079614/TonyMenias-728.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079614/TonyMenias-728.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079613/TonyMenias-727.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079613/TonyMenias-727.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079612/TonyMenias-726.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079612/TonyMenias-726.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079611/TonyMenias-725.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079611/TonyMenias-725.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079610/TonyMenias-724.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079610/TonyMenias-724.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079610/TonyMenias-723.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079610/TonyMenias-723.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079609/TonyMenias-722.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079609/TonyMenias-722.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079608/TonyMenias-721.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079608/TonyMenias-721.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079608/TonyMenias-720.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079608/TonyMenias-720.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079607/TonyMenias-719.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079607/TonyMenias-719.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079606/TonyMenias-718.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079606/TonyMenias-718.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079605/TonyMenias-717.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079605/TonyMenias-717.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079604/TonyMenias-716.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079604/TonyMenias-716.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079604/TonyMenias-715.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079604/TonyMenias-715.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079602/TonyMenias-714.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079602/TonyMenias-714.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079602/TonyMenias-713.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079602/TonyMenias-713.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079601/TonyMenias-712.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079601/TonyMenias-712.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079600/TonyMenias-711.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079600/TonyMenias-711.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079599/TonyMenias-710.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079599/TonyMenias-710.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079598/TonyMenias-709.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079598/TonyMenias-709.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079598/TonyMenias-708.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079598/TonyMenias-708.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079597/TonyMenias-707.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079597/TonyMenias-707.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079596/TonyMenias-706.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079596/TonyMenias-706.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079595/TonyMenias-705.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079595/TonyMenias-705.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079595/TonyMenias-704.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079595/TonyMenias-704.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079593/TonyMenias-702.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079593/TonyMenias-702.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079594/TonyMenias-703.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079594/TonyMenias-703.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079593/TonyMenias-701.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079593/TonyMenias-701.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079591/TonyMenias-700.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079591/TonyMenias-700.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079590/TonyMenias-699.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079590/TonyMenias-699.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079589/TonyMenias-698.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079589/TonyMenias-698.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079589/TonyMenias-697.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079589/TonyMenias-697.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079588/TonyMenias-696.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079588/TonyMenias-696.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079587/TonyMenias-695.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079587/TonyMenias-695.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079586/TonyMenias-694.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079586/TonyMenias-694.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079585/TonyMenias-693.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079585/TonyMenias-693.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079584/TonyMenias-691.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079584/TonyMenias-691.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079584/TonyMenias-692.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079584/TonyMenias-692.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079583/TonyMenias-690.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079583/TonyMenias-690.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079582/TonyMenias-689.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079582/TonyMenias-689.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079581/TonyMenias-688.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079581/TonyMenias-688.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079580/TonyMenias-687.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079580/TonyMenias-687.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079579/TonyMenias-686.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079579/TonyMenias-686.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079579/TonyMenias-685.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079579/TonyMenias-685.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079578/TonyMenias-684.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079578/TonyMenias-684.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079577/TonyMenias-683.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079577/TonyMenias-683.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079576/TonyMenias-681.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079576/TonyMenias-681.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079576/TonyMenias-682.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079576/TonyMenias-682.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079574/TonyMenias-680.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079574/TonyMenias-680.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079574/TonyMenias-679.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079574/TonyMenias-679.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079573/TonyMenias-678.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079573/TonyMenias-678.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079572/TonyMenias-676.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079572/TonyMenias-676.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079572/TonyMenias-677.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079572/TonyMenias-677.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079570/TonyMenias-675.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079570/TonyMenias-675.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079569/TonyMenias-674.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079569/TonyMenias-674.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079569/TonyMenias-673.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079569/TonyMenias-673.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079568/TonyMenias-672.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079568/TonyMenias-672.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079567/TonyMenias-671.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079567/TonyMenias-671.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079566/TonyMenias-670.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079566/TonyMenias-670.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079565/TonyMenias-669.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079565/TonyMenias-669.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079564/TonyMenias-668.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079564/TonyMenias-668.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079564/TonyMenias-667.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079564/TonyMenias-667.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079563/TonyMenias-666.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079563/TonyMenias-666.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079562/TonyMenias-665.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079562/TonyMenias-665.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079561/TonyMenias-664.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079561/TonyMenias-664.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079560/TonyMenias-663.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079560/TonyMenias-663.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079559/TonyMenias-662.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079559/TonyMenias-662.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079558/TonyMenias-661.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079558/TonyMenias-661.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079557/TonyMenias-660.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079557/TonyMenias-660.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079556/TonyMenias-659.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079556/TonyMenias-659.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079555/TonyMenias-658.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079555/TonyMenias-658.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079555/TonyMenias-657.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079555/TonyMenias-657.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079554/TonyMenias-656.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079554/TonyMenias-656.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079554/TonyMenias-655.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079554/TonyMenias-655.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079552/TonyMenias-654.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079552/TonyMenias-654.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079551/TonyMenias-653.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079551/TonyMenias-653.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079551/TonyMenias-652.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079551/TonyMenias-652.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079550/TonyMenias-651.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079550/TonyMenias-651.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079549/TonyMenias-650.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079549/TonyMenias-650.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079548/TonyMenias-649.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079548/TonyMenias-649.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079547/TonyMenias-648.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079547/TonyMenias-648.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079546/TonyMenias-647.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079546/TonyMenias-647.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079535/TonyMenias-635.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079535/TonyMenias-635.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079545/TonyMenias-646.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079545/TonyMenias-646.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079544/TonyMenias-645.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079544/TonyMenias-645.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079544/TonyMenias-644.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079544/TonyMenias-644.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079542/TonyMenias-643.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079542/TonyMenias-643.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079542/TonyMenias-642.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079542/TonyMenias-642.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079541/TonyMenias-641.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079541/TonyMenias-641.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079540/TonyMenias-640.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079540/TonyMenias-640.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079539/TonyMenias-639.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079539/TonyMenias-639.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079538/TonyMenias-638.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079538/TonyMenias-638.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079537/TonyMenias-637.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079537/TonyMenias-637.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079536/TonyMenias-636.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079536/TonyMenias-636.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079535/TonyMenias-634.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079535/TonyMenias-634.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079534/TonyMenias-633.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079534/TonyMenias-633.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079533/TonyMenias-632.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079533/TonyMenias-632.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079533/TonyMenias-631.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079533/TonyMenias-631.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079531/TonyMenias-630.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079531/TonyMenias-630.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079531/TonyMenias-629.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079531/TonyMenias-629.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079530/TonyMenias-628.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079530/TonyMenias-628.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079529/TonyMenias-627.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079529/TonyMenias-627.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079528/TonyMenias-626.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079528/TonyMenias-626.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079528/TonyMenias-625.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079528/TonyMenias-625.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079527/TonyMenias-624.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079527/TonyMenias-624.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079526/TonyMenias-623.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079526/TonyMenias-623.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079525/TonyMenias-622.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079525/TonyMenias-622.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079525/TonyMenias-621.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079525/TonyMenias-621.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079523/TonyMenias-620.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079523/TonyMenias-620.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079523/TonyMenias-619.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079523/TonyMenias-619.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079522/TonyMenias-618.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079522/TonyMenias-618.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079521/TonyMenias-617.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079521/TonyMenias-617.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079520/TonyMenias-616.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079520/TonyMenias-616.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079519/TonyMenias-615.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079519/TonyMenias-615.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079518/TonyMenias-614.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079518/TonyMenias-614.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079517/TonyMenias-613.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079517/TonyMenias-613.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079516/TonyMenias-612.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079516/TonyMenias-612.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079516/TonyMenias-611.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079516/TonyMenias-611.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079515/TonyMenias-610.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079515/TonyMenias-610.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079514/TonyMenias-609.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079514/TonyMenias-609.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079514/TonyMenias-608.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079514/TonyMenias-608.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079512/TonyMenias-607.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079512/TonyMenias-607.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079512/TonyMenias-606.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079512/TonyMenias-606.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079511/TonyMenias-605.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079511/TonyMenias-605.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079510/TonyMenias-604.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079510/TonyMenias-604.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079509/TonyMenias-603.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079509/TonyMenias-603.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079508/TonyMenias-602.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079508/TonyMenias-602.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079508/TonyMenias-601.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079508/TonyMenias-601.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079507/TonyMenias-600.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079507/TonyMenias-600.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079506/TonyMenias-599.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079506/TonyMenias-599.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079505/TonyMenias-598.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079505/TonyMenias-598.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079504/TonyMenias-597.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079504/TonyMenias-597.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079503/TonyMenias-596.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079503/TonyMenias-596.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079502/TonyMenias-595.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079502/TonyMenias-595.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079502/TonyMenias-594.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079502/TonyMenias-594.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079501/TonyMenias-593.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079501/TonyMenias-593.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079501/TonyMenias-592.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079501/TonyMenias-592.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079499/TonyMenias-591.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079499/TonyMenias-591.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079498/TonyMenias-590.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079498/TonyMenias-590.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079498/TonyMenias-589.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079498/TonyMenias-589.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079496/TonyMenias-588.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079496/TonyMenias-588.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079496/TonyMenias-587.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079496/TonyMenias-587.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079495/TonyMenias-586.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079495/TonyMenias-586.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079494/TonyMenias-585.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079494/TonyMenias-585.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079493/TonyMenias-584.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079493/TonyMenias-584.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079492/TonyMenias-583.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079492/TonyMenias-583.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079491/TonyMenias-582.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079491/TonyMenias-582.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079491/TonyMenias-581.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079491/TonyMenias-581.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079489/TonyMenias-580.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079489/TonyMenias-580.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079489/TonyMenias-579.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079489/TonyMenias-579.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079488/TonyMenias-578.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079488/TonyMenias-578.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079487/TonyMenias-577.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079487/TonyMenias-577.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079486/TonyMenias-576.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079486/TonyMenias-576.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079485/TonyMenias-575.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079485/TonyMenias-575.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079484/TonyMenias-573.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079484/TonyMenias-573.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079484/TonyMenias-574.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079484/TonyMenias-574.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079483/TonyMenias-572.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079483/TonyMenias-572.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079482/TonyMenias-571.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079482/TonyMenias-571.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079480/TonyMenias-570.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079480/TonyMenias-570.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079479/TonyMenias-569.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079479/TonyMenias-569.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079478/TonyMenias-568.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079478/TonyMenias-568.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079478/TonyMenias-567.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079478/TonyMenias-567.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079476/TonyMenias-566.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079476/TonyMenias-566.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079476/TonyMenias-565.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079476/TonyMenias-565.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079474/TonyMenias-564.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079474/TonyMenias-564.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079474/TonyMenias-563.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079474/TonyMenias-563.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079473/TonyMenias-562.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079473/TonyMenias-562.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079472/TonyMenias-561.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079472/TonyMenias-561.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079471/TonyMenias-560.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079471/TonyMenias-560.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079470/TonyMenias-559.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079470/TonyMenias-559.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079469/TonyMenias-558.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079469/TonyMenias-558.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079468/TonyMenias-557.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079468/TonyMenias-557.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079467/TonyMenias-556.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079467/TonyMenias-556.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079466/TonyMenias-554.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079466/TonyMenias-554.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079466/TonyMenias-555.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079466/TonyMenias-555.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079465/TonyMenias-553.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079465/TonyMenias-553.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079464/TonyMenias-552.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079464/TonyMenias-552.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079463/TonyMenias-551.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079463/TonyMenias-551.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079462/TonyMenias-550.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079462/TonyMenias-550.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079461/TonyMenias-549.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079461/TonyMenias-549.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079460/TonyMenias-548.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079460/TonyMenias-548.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079460/TonyMenias-547.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079460/TonyMenias-547.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079458/TonyMenias-546.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079458/TonyMenias-546.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079457/TonyMenias-545.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079457/TonyMenias-545.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079457/TonyMenias-544.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079457/TonyMenias-544.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079456/TonyMenias-543.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079456/TonyMenias-543.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079455/TonyMenias-542.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079455/TonyMenias-542.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079454/TonyMenias-541.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079454/TonyMenias-541.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079453/TonyMenias-540.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079453/TonyMenias-540.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079452/TonyMenias-539.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079452/TonyMenias-539.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079452/TonyMenias-538.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079452/TonyMenias-538.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079450/TonyMenias-537.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079450/TonyMenias-537.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079450/TonyMenias-536.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079450/TonyMenias-536.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079449/TonyMenias-535.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079449/TonyMenias-535.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079448/TonyMenias-534.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079448/TonyMenias-534.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079447/TonyMenias-533.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079447/TonyMenias-533.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079447/TonyMenias-532.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079447/TonyMenias-532.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079445/TonyMenias-530.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079445/TonyMenias-530.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079445/TonyMenias-531.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079445/TonyMenias-531.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079444/TonyMenias-529.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079444/TonyMenias-529.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079443/TonyMenias-528.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079443/TonyMenias-528.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079442/TonyMenias-527.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079442/TonyMenias-527.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079442/TonyMenias-526.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079442/TonyMenias-526.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079441/TonyMenias-525.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079441/TonyMenias-525.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079440/TonyMenias-524.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079440/TonyMenias-524.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079439/TonyMenias-522.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079439/TonyMenias-522.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079439/TonyMenias-523.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079439/TonyMenias-523.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079438/TonyMenias-521.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079438/TonyMenias-521.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079437/TonyMenias-520.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079437/TonyMenias-520.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079435/TonyMenias-519.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079435/TonyMenias-519.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079435/TonyMenias-518.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079435/TonyMenias-518.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079434/TonyMenias-517.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079434/TonyMenias-517.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079433/TonyMenias-516.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079433/TonyMenias-516.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079432/TonyMenias-515.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079432/TonyMenias-515.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079431/TonyMenias-514.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079431/TonyMenias-514.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079430/TonyMenias-513.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079430/TonyMenias-513.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079429/TonyMenias-512.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079429/TonyMenias-512.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079429/TonyMenias-511.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079429/TonyMenias-511.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079428/TonyMenias-510.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079428/TonyMenias-510.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079427/TonyMenias-509.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079427/TonyMenias-509.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079427/TonyMenias-508.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079427/TonyMenias-508.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079426/TonyMenias-507.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079426/TonyMenias-507.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079425/TonyMenias-506.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079425/TonyMenias-506.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079424/TonyMenias-505.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079424/TonyMenias-505.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079423/TonyMenias-504.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079423/TonyMenias-504.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079422/TonyMenias-503.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079422/TonyMenias-503.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079421/TonyMenias-502.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079421/TonyMenias-502.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079420/TonyMenias-501.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079420/TonyMenias-501.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079419/TonyMenias-500.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079419/TonyMenias-500.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079419/TonyMenias-499.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079419/TonyMenias-499.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079418/TonyMenias-498.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079418/TonyMenias-498.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079416/TonyMenias-497.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079416/TonyMenias-497.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079416/TonyMenias-496.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079416/TonyMenias-496.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079415/TonyMenias-495.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079415/TonyMenias-495.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079414/TonyMenias-494.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079414/TonyMenias-494.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079413/TonyMenias-493.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079413/TonyMenias-493.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079412/TonyMenias-492.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079412/TonyMenias-492.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079411/TonyMenias-491.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079411/TonyMenias-491.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079411/TonyMenias-490.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079411/TonyMenias-490.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079410/TonyMenias-489.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079410/TonyMenias-489.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079409/TonyMenias-488.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079409/TonyMenias-488.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079407/TonyMenias-487.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079407/TonyMenias-487.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079407/TonyMenias-486.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079407/TonyMenias-486.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079406/TonyMenias-485.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079406/TonyMenias-485.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079406/TonyMenias-484.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079406/TonyMenias-484.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079404/TonyMenias-483.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079404/TonyMenias-483.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079403/TonyMenias-482.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079403/TonyMenias-482.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079402/TonyMenias-481.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079402/TonyMenias-481.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079401/TonyMenias-477.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079401/TonyMenias-477.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079401/TonyMenias-480.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079401/TonyMenias-480.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079400/TonyMenias-479.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079400/TonyMenias-479.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079400/TonyMenias-478.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079400/TonyMenias-478.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079398/TonyMenias-476.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079398/TonyMenias-476.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079397/TonyMenias-475.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079397/TonyMenias-475.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079396/TonyMenias-474.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079396/TonyMenias-474.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079395/TonyMenias-473.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079395/TonyMenias-473.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079395/TonyMenias-472.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079395/TonyMenias-472.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079393/TonyMenias-471.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079393/TonyMenias-471.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079392/TonyMenias-470.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079392/TonyMenias-470.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079392/TonyMenias-469.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079392/TonyMenias-469.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079390/TonyMenias-468.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079390/TonyMenias-468.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079390/TonyMenias-467.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079390/TonyMenias-467.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079389/TonyMenias-466.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079389/TonyMenias-466.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079388/TonyMenias-465.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079388/TonyMenias-465.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079387/TonyMenias-464.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079387/TonyMenias-464.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079386/TonyMenias-463.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079386/TonyMenias-463.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079385/TonyMenias-462.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079385/TonyMenias-462.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079384/TonyMenias-461.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079384/TonyMenias-461.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079384/TonyMenias-459.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079384/TonyMenias-459.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079384/TonyMenias-460.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079384/TonyMenias-460.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079382/TonyMenias-458.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079382/TonyMenias-458.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079382/TonyMenias-457.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079382/TonyMenias-457.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079381/TonyMenias-456.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079381/TonyMenias-456.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079380/TonyMenias-455.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079380/TonyMenias-455.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079379/TonyMenias-454.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079379/TonyMenias-454.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079378/TonyMenias-453.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079378/TonyMenias-453.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079377/TonyMenias-452.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079377/TonyMenias-452.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079377/TonyMenias-451.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079377/TonyMenias-451.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079376/TonyMenias-450.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079376/TonyMenias-450.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079375/TonyMenias-449.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079375/TonyMenias-449.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079374/TonyMenias-447.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079374/TonyMenias-447.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079374/TonyMenias-448.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079374/TonyMenias-448.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079372/TonyMenias-446.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079372/TonyMenias-446.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079371/TonyMenias-445.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079371/TonyMenias-445.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079371/TonyMenias-444.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079371/TonyMenias-444.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079369/TonyMenias-443.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079369/TonyMenias-443.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079368/TonyMenias-441.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079368/TonyMenias-441.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079368/TonyMenias-442.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079368/TonyMenias-442.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079367/TonyMenias-440.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079367/TonyMenias-440.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079366/TonyMenias-439.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079366/TonyMenias-439.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079366/TonyMenias-438.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079366/TonyMenias-438.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079365/TonyMenias-437.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079365/TonyMenias-437.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079363/TonyMenias-436.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079363/TonyMenias-436.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079363/TonyMenias-434.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079363/TonyMenias-434.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079362/TonyMenias-435.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079362/TonyMenias-435.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079361/TonyMenias-433.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079361/TonyMenias-433.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079360/TonyMenias-432.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079360/TonyMenias-432.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079359/TonyMenias-431.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079359/TonyMenias-431.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079358/TonyMenias-430.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079358/TonyMenias-430.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079358/TonyMenias-429.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079358/TonyMenias-429.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079357/TonyMenias-428.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079357/TonyMenias-428.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079356/TonyMenias-427.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079356/TonyMenias-427.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079355/TonyMenias-426.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079355/TonyMenias-426.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079354/TonyMenias-424.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079354/TonyMenias-424.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079354/TonyMenias-425.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079354/TonyMenias-425.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079352/TonyMenias-423.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079352/TonyMenias-423.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079352/TonyMenias-422.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079352/TonyMenias-422.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079351/TonyMenias-421.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079351/TonyMenias-421.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079350/TonyMenias-420.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079350/TonyMenias-420.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079349/TonyMenias-418.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079349/TonyMenias-418.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079349/TonyMenias-419.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079349/TonyMenias-419.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079348/TonyMenias-414.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079348/TonyMenias-414.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079348/TonyMenias-417.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079348/TonyMenias-417.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079347/TonyMenias-416.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079347/TonyMenias-416.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079346/TonyMenias-415.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079346/TonyMenias-415.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079344/TonyMenias-413.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079344/TonyMenias-413.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079343/TonyMenias-412.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079343/TonyMenias-412.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079343/TonyMenias-411.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079343/TonyMenias-411.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079342/TonyMenias-410.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079342/TonyMenias-410.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079341/TonyMenias-409.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079341/TonyMenias-409.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079340/TonyMenias-408.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079340/TonyMenias-408.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079339/TonyMenias-407.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079339/TonyMenias-407.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079339/TonyMenias-406.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079339/TonyMenias-406.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079338/TonyMenias-405.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079338/TonyMenias-405.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079337/TonyMenias-404.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079337/TonyMenias-404.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079336/TonyMenias-403.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079336/TonyMenias-403.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079334/TonyMenias-398.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079334/TonyMenias-398.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079335/TonyMenias-402.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079335/TonyMenias-402.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079334/TonyMenias-401.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079334/TonyMenias-401.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079333/TonyMenias-400.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079333/TonyMenias-400.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079333/TonyMenias-399.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079333/TonyMenias-399.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079331/TonyMenias-397.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079331/TonyMenias-397.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079330/TonyMenias-396.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079330/TonyMenias-396.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079329/TonyMenias-395.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079329/TonyMenias-395.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079328/TonyMenias-394.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079328/TonyMenias-394.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079328/TonyMenias-392.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079328/TonyMenias-392.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079327/TonyMenias-393.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079327/TonyMenias-393.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079326/TonyMenias-389.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079326/TonyMenias-389.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079326/TonyMenias-391.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079326/TonyMenias-391.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079325/TonyMenias-390.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079325/TonyMenias-390.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079323/TonyMenias-388.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079323/TonyMenias-388.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079323/TonyMenias-387.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079323/TonyMenias-387.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079322/TonyMenias-386.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079322/TonyMenias-386.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079322/TonyMenias-385.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079322/TonyMenias-385.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079320/TonyMenias-384.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079320/TonyMenias-384.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079319/TonyMenias-383.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079319/TonyMenias-383.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079319/TonyMenias-381.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079319/TonyMenias-381.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079318/TonyMenias-382.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079318/TonyMenias-382.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079317/TonyMenias-380.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079317/TonyMenias-380.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079315/TonyMenias-375.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079315/TonyMenias-375.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079316/TonyMenias-379.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079316/TonyMenias-379.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079315/TonyMenias-378.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079315/TonyMenias-378.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079314/TonyMenias-377.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079314/TonyMenias-377.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079313/TonyMenias-374.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079313/TonyMenias-374.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079313/TonyMenias-376.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079313/TonyMenias-376.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079311/TonyMenias-373.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079311/TonyMenias-373.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079310/TonyMenias-372.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079310/TonyMenias-372.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079309/TonyMenias-371.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079309/TonyMenias-371.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079308/TonyMenias-370.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079308/TonyMenias-370.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079308/TonyMenias-369.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079308/TonyMenias-369.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079307/TonyMenias-364.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079307/TonyMenias-364.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079306/TonyMenias-368.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079306/TonyMenias-368.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079305/TonyMenias-367.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079305/TonyMenias-367.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079304/TonyMenias-366.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079304/TonyMenias-366.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079303/TonyMenias-362.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079303/TonyMenias-362.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079304/TonyMenias-365.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079304/TonyMenias-365.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079304/TonyMenias-363.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079304/TonyMenias-363.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079301/TonyMenias-361.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079301/TonyMenias-361.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079300/TonyMenias-357.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079300/TonyMenias-357.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079299/TonyMenias-360.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079299/TonyMenias-360.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079299/TonyMenias-359.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079299/TonyMenias-359.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079298/TonyMenias-358.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079298/TonyMenias-358.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079296/TonyMenias-356.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079296/TonyMenias-356.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079296/TonyMenias-355.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079296/TonyMenias-355.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079295/TonyMenias-354.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079295/TonyMenias-354.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079294/TonyMenias-353.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079294/TonyMenias-353.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079293/TonyMenias-352.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079293/TonyMenias-352.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079292/TonyMenias-351.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079292/TonyMenias-351.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079292/TonyMenias-350.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079292/TonyMenias-350.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079291/TonyMenias-349.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079291/TonyMenias-349.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079290/TonyMenias-348.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079290/TonyMenias-348.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079289/TonyMenias-347.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079289/TonyMenias-347.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079288/TonyMenias-346.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079288/TonyMenias-346.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079288/TonyMenias-345.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079288/TonyMenias-345.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079287/TonyMenias-343.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079287/TonyMenias-343.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079287/TonyMenias-344.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079287/TonyMenias-344.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079285/TonyMenias-342.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079285/TonyMenias-342.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079284/TonyMenias-341.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079284/TonyMenias-341.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079284/TonyMenias-339.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079284/TonyMenias-339.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079284/TonyMenias-340.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079284/TonyMenias-340.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079282/TonyMenias-338.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079282/TonyMenias-338.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079282/TonyMenias-336.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079282/TonyMenias-336.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079282/TonyMenias-337.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079282/TonyMenias-337.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079281/TonyMenias-335.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079281/TonyMenias-335.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079280/TonyMenias-334.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079280/TonyMenias-334.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079279/TonyMenias-333.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079279/TonyMenias-333.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079278/TonyMenias-332.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079278/TonyMenias-332.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079278/TonyMenias-331.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079278/TonyMenias-331.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079277/TonyMenias-330.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079277/TonyMenias-330.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079276/TonyMenias-329.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079276/TonyMenias-329.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079276/TonyMenias-327.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079276/TonyMenias-327.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079276/TonyMenias-328.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079276/TonyMenias-328.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079274/TonyMenias-326.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079274/TonyMenias-326.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079274/TonyMenias-325.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079274/TonyMenias-325.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079273/TonyMenias-324.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079273/TonyMenias-324.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079272/TonyMenias-323.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079272/TonyMenias-323.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079271/TonyMenias-321.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079271/TonyMenias-321.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079271/TonyMenias-322.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079271/TonyMenias-322.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079269/TonyMenias-320.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079269/TonyMenias-320.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079269/TonyMenias-319.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079269/TonyMenias-319.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079268/TonyMenias-318.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079268/TonyMenias-318.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079268/TonyMenias-317.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079268/TonyMenias-317.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079266/TonyMenias-316.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079266/TonyMenias-316.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079265/TonyMenias-315.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079265/TonyMenias-315.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079265/TonyMenias-314.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079265/TonyMenias-314.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079264/TonyMenias-313.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079264/TonyMenias-313.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079263/TonyMenias-312.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079263/TonyMenias-312.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079263/TonyMenias-311.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079263/TonyMenias-311.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079262/TonyMenias-310.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079262/TonyMenias-310.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079261/TonyMenias-309.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079261/TonyMenias-309.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079260/TonyMenias-308.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079260/TonyMenias-308.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079260/TonyMenias-307.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079260/TonyMenias-307.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079258/TonyMenias-306.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079258/TonyMenias-306.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079257/TonyMenias-305.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079257/TonyMenias-305.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079257/TonyMenias-304.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079257/TonyMenias-304.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079256/TonyMenias-303.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079256/TonyMenias-303.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079255/TonyMenias-302.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079255/TonyMenias-302.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079254/TonyMenias-301.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079254/TonyMenias-301.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079253/TonyMenias-297.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079253/TonyMenias-297.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079253/TonyMenias-300.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079253/TonyMenias-300.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079253/TonyMenias-299.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079253/TonyMenias-299.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079252/TonyMenias-298.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079252/TonyMenias-298.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079250/TonyMenias-296.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079250/TonyMenias-296.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079247/TonyMenias-291.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079247/TonyMenias-291.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079249/TonyMenias-295.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079249/TonyMenias-295.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079248/TonyMenias-293.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079248/TonyMenias-293.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079249/TonyMenias-294.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079249/TonyMenias-294.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079247/TonyMenias-292.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079247/TonyMenias-292.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079246/TonyMenias-290.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079246/TonyMenias-290.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079245/TonyMenias-289.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079245/TonyMenias-289.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079244/TonyMenias-288.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079244/TonyMenias-288.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079243/TonyMenias-287.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079243/TonyMenias-287.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079243/TonyMenias-286.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079243/TonyMenias-286.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079241/TonyMenias-285.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079241/TonyMenias-285.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079240/TonyMenias-284.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079240/TonyMenias-284.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079239/TonyMenias-283.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079239/TonyMenias-283.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079238/TonyMenias-282.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079238/TonyMenias-282.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079238/TonyMenias-281.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079238/TonyMenias-281.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079237/TonyMenias-280.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079237/TonyMenias-280.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079236/TonyMenias-279.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079236/TonyMenias-279.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079235/TonyMenias-278.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079235/TonyMenias-278.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079235/TonyMenias-277.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079235/TonyMenias-277.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079233/TonyMenias-276.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079233/TonyMenias-276.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079233/TonyMenias-275.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079233/TonyMenias-275.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079232/TonyMenias-274.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079232/TonyMenias-274.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079231/TonyMenias-273.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079231/TonyMenias-273.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079230/TonyMenias-272.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079230/TonyMenias-272.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079229/TonyMenias-271.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079229/TonyMenias-271.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079229/TonyMenias-270.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079229/TonyMenias-270.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079227/TonyMenias-269.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079227/TonyMenias-269.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079227/TonyMenias-268.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079227/TonyMenias-268.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079226/TonyMenias-267.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079226/TonyMenias-267.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079225/TonyMenias-266.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079225/TonyMenias-266.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079225/TonyMenias-265.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079225/TonyMenias-265.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079223/TonyMenias-264.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079223/TonyMenias-264.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079222/TonyMenias-263.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079222/TonyMenias-263.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079222/TonyMenias-262.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079222/TonyMenias-262.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079221/TonyMenias-261.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079221/TonyMenias-261.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079220/TonyMenias-260.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079220/TonyMenias-260.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079219/TonyMenias-259.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079219/TonyMenias-259.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079218/TonyMenias-258.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079218/TonyMenias-258.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079218/TonyMenias-257.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079218/TonyMenias-257.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079216/TonyMenias-256.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079216/TonyMenias-256.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079216/TonyMenias-255.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079216/TonyMenias-255.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079215/TonyMenias-254.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079215/TonyMenias-254.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079214/TonyMenias-253.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079214/TonyMenias-253.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079213/TonyMenias-252.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079213/TonyMenias-252.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079212/TonyMenias-251.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079212/TonyMenias-251.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079212/TonyMenias-250.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079212/TonyMenias-250.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079211/TonyMenias-249.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079211/TonyMenias-249.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079210/TonyMenias-248.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079210/TonyMenias-248.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079209/TonyMenias-247.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079209/TonyMenias-247.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079208/TonyMenias-246.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079208/TonyMenias-246.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079207/TonyMenias-245.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079207/TonyMenias-245.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079207/TonyMenias-244.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079207/TonyMenias-244.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079206/TonyMenias-243.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079206/TonyMenias-243.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079204/TonyMenias-242.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079204/TonyMenias-242.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079202/TonyMenias-241.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079202/TonyMenias-241.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079201/TonyMenias-240.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079201/TonyMenias-240.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079201/TonyMenias-239.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079201/TonyMenias-239.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079199/TonyMenias-238.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079199/TonyMenias-238.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079199/TonyMenias-235.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079199/TonyMenias-235.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079198/TonyMenias-236.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079198/TonyMenias-236.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079198/TonyMenias-237.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079198/TonyMenias-237.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079195/TonyMenias-234.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079195/TonyMenias-234.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079195/TonyMenias-233.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079195/TonyMenias-233.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079193/TonyMenias-232.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079193/TonyMenias-232.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079191/TonyMenias-231.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079191/TonyMenias-231.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079191/TonyMenias-230.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079191/TonyMenias-230.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079190/TonyMenias-229.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079190/TonyMenias-229.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079188/TonyMenias-228.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079188/TonyMenias-228.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079188/TonyMenias-227.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079188/TonyMenias-227.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079186/TonyMenias-221.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079186/TonyMenias-221.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079186/TonyMenias-226.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079186/TonyMenias-226.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079185/TonyMenias-225.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079185/TonyMenias-225.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079184/TonyMenias-224.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079184/TonyMenias-224.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079184/TonyMenias-223.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079184/TonyMenias-223.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079182/TonyMenias-222.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079182/TonyMenias-222.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079180/TonyMenias-220.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079180/TonyMenias-220.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079179/TonyMenias-219.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079179/TonyMenias-219.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079178/TonyMenias-218.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079178/TonyMenias-218.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079176/TonyMenias-217.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079176/TonyMenias-217.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079175/TonyMenias-216.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079175/TonyMenias-216.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079175/TonyMenias-215.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079175/TonyMenias-215.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079174/TonyMenias-214.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079174/TonyMenias-214.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079172/TonyMenias-213.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079172/TonyMenias-213.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079171/TonyMenias-212.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079171/TonyMenias-212.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079171/TonyMenias-210.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079171/TonyMenias-210.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079171/TonyMenias-211.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079171/TonyMenias-211.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079170/TonyMenias-209.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079170/TonyMenias-209.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079169/TonyMenias-208.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079169/TonyMenias-208.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079168/TonyMenias-207.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079168/TonyMenias-207.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079167/TonyMenias-206.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079167/TonyMenias-206.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079166/TonyMenias-205.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079166/TonyMenias-205.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079166/TonyMenias-204.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079166/TonyMenias-204.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079164/TonyMenias-203.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079164/TonyMenias-203.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079162/TonyMenias-202.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079162/TonyMenias-202.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079161/TonyMenias-201.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079161/TonyMenias-201.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079159/TonyMenias-200.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079159/TonyMenias-200.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079158/TonyMenias-199.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079158/TonyMenias-199.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079157/TonyMenias-198.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079157/TonyMenias-198.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079156/TonyMenias-197.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079156/TonyMenias-197.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079155/TonyMenias-196.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079155/TonyMenias-196.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079154/TonyMenias-195.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079154/TonyMenias-195.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079153/TonyMenias-194.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079153/TonyMenias-194.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079152/TonyMenias-193.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079152/TonyMenias-193.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079151/TonyMenias-192.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079151/TonyMenias-192.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079151/TonyMenias-191.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079151/TonyMenias-191.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079150/TonyMenias-190.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079150/TonyMenias-190.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079149/TonyMenias-189.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079149/TonyMenias-189.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079148/TonyMenias-188.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079148/TonyMenias-188.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079147/TonyMenias-187.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079147/TonyMenias-187.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079146/TonyMenias-186.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079146/TonyMenias-186.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079145/TonyMenias-185.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079145/TonyMenias-185.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079144/TonyMenias-183.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079144/TonyMenias-183.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079144/TonyMenias-184.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079144/TonyMenias-184.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079142/TonyMenias-182.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079142/TonyMenias-182.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079142/TonyMenias-181.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079142/TonyMenias-181.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079141/TonyMenias-177.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079141/TonyMenias-177.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079140/TonyMenias-179.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079140/TonyMenias-179.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079140/TonyMenias-180.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079140/TonyMenias-180.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079139/TonyMenias-178.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079139/TonyMenias-178.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079137/TonyMenias-163.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079137/TonyMenias-163.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079137/TonyMenias-176.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079137/TonyMenias-176.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079136/TonyMenias-175.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079136/TonyMenias-175.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079135/TonyMenias-174.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079135/TonyMenias-174.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079135/TonyMenias-173.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079135/TonyMenias-173.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079134/TonyMenias-172.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079134/TonyMenias-172.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079133/TonyMenias-171.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079133/TonyMenias-171.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079132/TonyMenias-170.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079132/TonyMenias-170.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079131/TonyMenias-169.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079131/TonyMenias-169.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079130/TonyMenias-168.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079130/TonyMenias-168.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079129/TonyMenias-167.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079129/TonyMenias-167.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079128/TonyMenias-166.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079128/TonyMenias-166.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079128/TonyMenias-165.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079128/TonyMenias-165.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079127/TonyMenias-164.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079127/TonyMenias-164.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079126/TonyMenias-160.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079126/TonyMenias-160.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079125/TonyMenias-162.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079125/TonyMenias-162.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079125/TonyMenias-161.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079125/TonyMenias-161.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079123/TonyMenias-159.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079123/TonyMenias-159.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079123/TonyMenias-158.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079123/TonyMenias-158.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079122/TonyMenias-157.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079122/TonyMenias-157.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079120/TonyMenias-156.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079120/TonyMenias-156.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079120/TonyMenias-155.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079120/TonyMenias-155.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079120/TonyMenias-154.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079120/TonyMenias-154.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079118/TonyMenias-153.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079118/TonyMenias-153.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079118/TonyMenias-152.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079118/TonyMenias-152.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079117/TonyMenias-151.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079117/TonyMenias-151.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079116/TonyMenias-150.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079116/TonyMenias-150.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079115/TonyMenias-149.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079115/TonyMenias-149.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079114/TonyMenias-148.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079114/TonyMenias-148.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079113/TonyMenias-147.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079113/TonyMenias-147.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079111/TonyMenias-142.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079111/TonyMenias-142.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079112/TonyMenias-146.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079112/TonyMenias-146.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079112/TonyMenias-145.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079112/TonyMenias-145.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079111/TonyMenias-144.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079111/TonyMenias-144.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079110/TonyMenias-143.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079110/TonyMenias-143.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079108/TonyMenias-141.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079108/TonyMenias-141.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079108/TonyMenias-140.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079108/TonyMenias-140.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079105/TonyMenias-139.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079105/TonyMenias-139.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079103/TonyMenias-138.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079103/TonyMenias-138.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079100/TonyMenias-137.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079100/TonyMenias-137.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079098/TonyMenias-136.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079098/TonyMenias-136.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079097/TonyMenias-135.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079097/TonyMenias-135.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079096/TonyMenias-134.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079096/TonyMenias-134.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079093/TonyMenias-133.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079093/TonyMenias-133.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079091/TonyMenias-131.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079091/TonyMenias-131.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079091/TonyMenias-132.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079091/TonyMenias-132.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079090/TonyMenias-129.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079090/TonyMenias-129.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079090/TonyMenias-130.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079090/TonyMenias-130.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079088/TonyMenias-128.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079088/TonyMenias-128.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079088/TonyMenias-127.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079088/TonyMenias-127.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079088/TonyMenias-126.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079088/TonyMenias-126.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079086/TonyMenias-125.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079086/TonyMenias-125.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079085/TonyMenias-124.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079085/TonyMenias-124.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079085/TonyMenias-123.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079085/TonyMenias-123.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079084/TonyMenias-122.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079084/TonyMenias-122.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079083/TonyMenias-121.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079083/TonyMenias-121.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079083/TonyMenias-120.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079083/TonyMenias-120.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079082/TonyMenias-119.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079082/TonyMenias-119.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079081/TonyMenias-118.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079081/TonyMenias-118.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079080/TonyMenias-117.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079080/TonyMenias-117.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079080/TonyMenias-116.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079080/TonyMenias-116.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079079/TonyMenias-115.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079079/TonyMenias-115.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079078/TonyMenias-114.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079078/TonyMenias-114.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079077/TonyMenias-113.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079077/TonyMenias-113.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079076/TonyMenias-112.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079076/TonyMenias-112.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079075/TonyMenias-110.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079075/TonyMenias-110.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079075/TonyMenias-111.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079075/TonyMenias-111.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079074/TonyMenias-109.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079074/TonyMenias-109.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079073/TonyMenias-108.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079073/TonyMenias-108.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079072/TonyMenias-107.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079072/TonyMenias-107.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079071/TonyMenias-105.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079071/TonyMenias-105.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079071/TonyMenias-106.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079071/TonyMenias-106.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079070/TonyMenias-104.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079070/TonyMenias-104.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079069/TonyMenias-103.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079069/TonyMenias-103.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079068/TonyMenias-102.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079068/TonyMenias-102.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079067/TonyMenias-101.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079067/TonyMenias-101.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079066/TonyMenias-100.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079066/TonyMenias-100.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079066/TonyMenias-99.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079066/TonyMenias-99.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079066/TonyMenias-98.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079066/TonyMenias-98.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079064/TonyMenias-97.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079064/TonyMenias-97.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079064/TonyMenias-96.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079064/TonyMenias-96.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079062/TonyMenias-95.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079062/TonyMenias-95.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079061/TonyMenias-94.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079061/TonyMenias-94.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079060/TonyMenias-93.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079060/TonyMenias-93.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079059/TonyMenias-92.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079059/TonyMenias-92.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079059/TonyMenias-91.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079059/TonyMenias-91.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079058/TonyMenias-90.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079058/TonyMenias-90.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079057/TonyMenias-89.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079057/TonyMenias-89.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079056/TonyMenias-88.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079056/TonyMenias-88.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079056/TonyMenias-87.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079056/TonyMenias-87.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079054/TonyMenias-86.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079054/TonyMenias-86.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079054/TonyMenias-85.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079054/TonyMenias-85.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079052/TonyMenias-84.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079052/TonyMenias-84.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079052/TonyMenias-83.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079052/TonyMenias-83.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079051/TonyMenias-82.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079051/TonyMenias-82.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079050/TonyMenias-81.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079050/TonyMenias-81.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079049/TonyMenias-80.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079049/TonyMenias-80.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079049/TonyMenias-79.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079049/TonyMenias-79.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079047/TonyMenias-73.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079047/TonyMenias-73.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079047/TonyMenias-78.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079047/TonyMenias-78.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079047/TonyMenias-76.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079047/TonyMenias-76.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079046/TonyMenias-77.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079046/TonyMenias-77.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079045/TonyMenias-75.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079045/TonyMenias-75.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079045/TonyMenias-74.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079045/TonyMenias-74.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079043/TonyMenias-72.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079043/TonyMenias-72.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079041/TonyMenias-62.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079041/TonyMenias-62.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079042/TonyMenias-71.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079042/TonyMenias-71.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079041/TonyMenias-70.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079041/TonyMenias-70.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079040/TonyMenias-68.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079040/TonyMenias-68.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079040/TonyMenias-69.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079040/TonyMenias-69.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079039/TonyMenias-67.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079039/TonyMenias-67.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079038/TonyMenias-66.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079038/TonyMenias-66.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079037/TonyMenias-64.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079037/TonyMenias-64.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079037/TonyMenias-65.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079037/TonyMenias-65.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079035/TonyMenias-63.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079035/TonyMenias-63.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079034/TonyMenias-61.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079034/TonyMenias-61.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079034/TonyMenias-60.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079034/TonyMenias-60.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079032/TonyMenias-59.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079032/TonyMenias-59.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079031/TonyMenias-58.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079031/TonyMenias-58.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079031/TonyMenias-57.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079031/TonyMenias-57.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079030/TonyMenias-56.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079030/TonyMenias-56.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079029/TonyMenias-55.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079029/TonyMenias-55.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079028/TonyMenias-54.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079028/TonyMenias-54.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079027/TonyMenias-53.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079027/TonyMenias-53.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079027/TonyMenias-52.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079027/TonyMenias-52.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079026/TonyMenias-51.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079026/TonyMenias-51.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079025/TonyMenias-50.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079025/TonyMenias-50.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079024/TonyMenias-49.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079024/TonyMenias-49.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079024/TonyMenias-48.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079024/TonyMenias-48.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079023/TonyMenias-47.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079023/TonyMenias-47.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079022/TonyMenias-46.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079022/TonyMenias-46.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079021/TonyMenias-45.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079021/TonyMenias-45.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079020/TonyMenias-44.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079020/TonyMenias-44.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079019/TonyMenias-43.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079019/TonyMenias-43.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079019/TonyMenias-42.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079019/TonyMenias-42.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079018/TonyMenias-41.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079018/TonyMenias-41.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079017/TonyMenias-40.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079017/TonyMenias-40.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079016/TonyMenias-37.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079016/TonyMenias-37.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079016/TonyMenias-39.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079016/TonyMenias-39.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079016/TonyMenias-38.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079016/TonyMenias-38.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079014/TonyMenias-36.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079014/TonyMenias-36.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079013/TonyMenias-35.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079013/TonyMenias-35.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079013/TonyMenias-34.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079013/TonyMenias-34.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079012/TonyMenias-33.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079012/TonyMenias-33.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079011/TonyMenias-32.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079011/TonyMenias-32.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079010/TonyMenias-31.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079010/TonyMenias-31.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079009/TonyMenias-30.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079009/TonyMenias-30.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079008/TonyMenias-29.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079008/TonyMenias-29.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079007/TonyMenias-28.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079007/TonyMenias-28.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079007/TonyMenias-27.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079007/TonyMenias-27.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079006/TonyMenias-26.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079006/TonyMenias-26.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079005/TonyMenias-25.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079005/TonyMenias-25.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079005/TonyMenias-24.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079005/TonyMenias-24.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079004/TonyMenias-23.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079004/TonyMenias-23.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079003/TonyMenias-22.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079003/TonyMenias-22.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079002/TonyMenias-21.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079002/TonyMenias-21.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079001/TonyMenias-20.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079001/TonyMenias-20.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079000/TonyMenias-19.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079000/TonyMenias-19.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079000/TonyMenias-18.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759079000/TonyMenias-18.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078999/TonyMenias-17.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078999/TonyMenias-17.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078998/TonyMenias-16.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078998/TonyMenias-16.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078997/TonyMenias-15.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078997/TonyMenias-15.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078996/TonyMenias-14.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078996/TonyMenias-14.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078995/TonyMenias-13.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078995/TonyMenias-13.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078994/TonyMenias-12.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078994/TonyMenias-12.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078994/TonyMenias-11.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078994/TonyMenias-11.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078993/TonyMenias-10.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078993/TonyMenias-10.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078991/TonyMenias-9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078991/TonyMenias-9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078990/TonyMenias-7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078990/TonyMenias-7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078988/TonyMenias-6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078988/TonyMenias-6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078981/TonyMenias-5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078981/TonyMenias-5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078981/TonyMenias-4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078981/TonyMenias-4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078980/TonyMenias-3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078980/TonyMenias-3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078980/TonyMenias-2.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078980/TonyMenias-2.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078980/TonyMenias.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759078980/TonyMenias.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621057/IMG_5172_fkijr5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621057/IMG_5172_fkijr5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621056/IMG_5263-Website-2_cvmccm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621056/IMG_5263-Website-2_cvmccm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621055/IMG_5169_xj9n4t.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621055/IMG_5169_xj9n4t.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621055/Morocco-AlmostHome_aspjcf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621055/Morocco-AlmostHome_aspjcf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621055/IMG_5215_br0tt8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621055/IMG_5215_br0tt8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621054/IMG_5206_rancef.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621054/IMG_5206_rancef.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621054/IMG_5249_zpj3zb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621054/IMG_5249_zpj3zb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/Morocco-Hide_n_Seek_dp1kh8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/Morocco-Hide_n_Seek_dp1kh8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/IMG_1755_wkwumk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/IMG_1755_wkwumk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/IMG_1428_n0rozd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/IMG_1428_n0rozd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/IMG_1615_junzhn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/IMG_1615_junzhn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621050/IMG_1923_rlrrqb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621050/IMG_1923_rlrrqb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621050/IMG_1930_wp1shk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621050/IMG_1930_wp1shk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621049/IMG_2057_nr2zqu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621049/IMG_2057_nr2zqu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621049/IMG_1852_oqmfhx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621049/IMG_1852_oqmfhx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621049/SA-11-22-DSCF5780_ine99g.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621049/SA-11-22-DSCF5780_ine99g.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621049/SA-11-22-DSCF5766_gr3cyj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621049/SA-11-22-DSCF5766_gr3cyj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621049/SA-11-22-DSCF5864_zel0dj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621049/SA-11-22-DSCF5864_zel0dj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621048/SA-11-22-DSCF6247_azsmlt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621048/SA-11-22-DSCF6247_azsmlt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621048/SA-11-22-DSCF6142_tjeame.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621048/SA-11-22-DSCF6142_tjeame.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621048/DSCF6215_egbqkv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621048/DSCF6215_egbqkv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621047/SA-11-22-DSCF6210_we7i7s.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621047/SA-11-22-DSCF6210_we7i7s.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621047/SA-11-22-DSCF5894_pel3se.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621047/SA-11-22-DSCF5894_pel3se.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621047/SA-11-22-DSCF5926_qfnb8f.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621047/SA-11-22-DSCF5926_qfnb8f.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621046/SA-11-22-DSCF5758_k5j5pt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621046/SA-11-22-DSCF5758_k5j5pt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621046/SA-11-22-DSCF5932_y5c2pr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621046/SA-11-22-DSCF5932_y5c2pr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621045/SA-11-22-DSCF5838_pfjqju.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621045/SA-11-22-DSCF5838_pfjqju.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621046/DSCF6243_roie7r.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621046/DSCF6243_roie7r.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621045/SA-11-22-DSCF5770_jpw3x4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621045/SA-11-22-DSCF5770_jpw3x4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621045/SA-11-22-DSCF6237_ukd0oy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621045/SA-11-22-DSCF6237_ukd0oy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621044/SA-11-22-DSCF6201_lespup.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621044/SA-11-22-DSCF6201_lespup.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/11-21-EGY-262_2_hpvm9z.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/11-21-EGY-262_2_hpvm9z.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621030/EGY1-178_u825bt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621030/EGY1-178_u825bt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620963/Toiny_Mernias_Buoyancy1_yetys2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620963/Toiny_Mernias_Buoyancy1_yetys2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620961/Tony_Menias-Buoyancy_myfvra.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620961/Tony_Menias-Buoyancy_myfvra.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/Tony_Menias_-_Tuk_Tuk_Graveyard_emgyqf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/Tony_Menias_-_Tuk_Tuk_Graveyard_emgyqf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/_DSF6993_copy_ez4ele.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/_DSF6993_copy_ez4ele.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620953/_DSF6993_imr71j.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620953/_DSF6993_imr71j.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620953/_DSF7175-4_l53vy2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620953/_DSF7175-4_l53vy2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620952/_DSF6798-3_vm9lbb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620952/_DSF6798-3_vm9lbb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620952/_DSF6120_rvryvg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620952/_DSF6120_rvryvg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620952/Arg-7220_vfos9y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620952/Arg-7220_vfos9y.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620951/_DSF5908_rtpkuu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620951/_DSF5908_rtpkuu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620951/_DSF6704_bwusb7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620951/_DSF6704_bwusb7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620950/_DSF6728-2_lg1kxs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620950/_DSF6728-2_lg1kxs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620950/_DSF6820_apyna9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620950/_DSF6820_apyna9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620949/_DSF6182-2_idm9eh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620949/_DSF6182-2_idm9eh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620949/_DSF6559_pm0xud.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620949/_DSF6559_pm0xud.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620949/_DSF5960_qfmzok.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620949/_DSF5960_qfmzok.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620949/_DSF8239-3_itkhwq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620949/_DSF8239-3_itkhwq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620949/_DSF6742-2_acirk5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620949/_DSF6742-2_acirk5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620948/_DSF6263_wmqdk9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620948/_DSF6263_wmqdk9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620948/_DSF7244-3_j5io5c.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620948/_DSF7244-3_j5io5c.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620948/_DSF7204-5_tsgdse.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620948/_DSF7204-5_tsgdse.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620947/_DSF8320_pxw2h6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620947/_DSF8320_pxw2h6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620947/_DSF6444-2_aaay4m.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620947/_DSF6444-2_aaay4m.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620942/GoneGirl_mfquy6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620942/GoneGirl_mfquy6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620942/DSCF3123_ek5dc9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620942/DSCF3123_ek5dc9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620941/Ireland-DSCF2233_qs86po.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620941/Ireland-DSCF2233_qs86po.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620941/DSCF0708_h6crwt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620941/DSCF0708_h6crwt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620941/DSCF3251_pzcvqz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620941/DSCF3251_pzcvqz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620940/DSCF3031_ypdnsc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620940/DSCF3031_ypdnsc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620939/DSCF2087_tvj0pv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620939/DSCF2087_tvj0pv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620939/DSCF1055_ehxn90.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620939/DSCF1055_ehxn90.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620939/DSCF3198-Edit-Website-2_o6qskm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620939/DSCF3198-Edit-Website-2_o6qskm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620939/DSCF1591-Edit_h5opk8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620939/DSCF1591-Edit_h5opk8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620938/Outlined_h0b8w7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620938/Outlined_h0b8w7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620938/Ireland-HeAwaits_iu0adf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620938/Ireland-HeAwaits_iu0adf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620938/Ridethewave_kzuni3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620938/Ridethewave_kzuni3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620937/SPA-06-23-DSCF8619_gpx4ze.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620937/SPA-06-23-DSCF8619_gpx4ze.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620937/PORT-208_uvbmej.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620937/PORT-208_uvbmej.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620937/Spain-DSCF4277_kzhupl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620937/Spain-DSCF4277_kzhupl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620936/DSCF4995_ihppbz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620936/DSCF4995_ihppbz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620935/SPA-06-23-DSCF8291_l0zhgo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620935/SPA-06-23-DSCF8291_l0zhgo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620935/PORT-06-22-DSCF7572_gm9ckn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620935/PORT-06-22-DSCF7572_gm9ckn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620935/LIsbon-5078_cslbfh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620935/LIsbon-5078_cslbfh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620935/PORT-06-22-DSCF5792_zepgtb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620935/PORT-06-22-DSCF5792_zepgtb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620934/LIsbon-5511_ip1myf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620934/LIsbon-5511_ip1myf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620934/PORT-06-22-DSCF7819_hoei12.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620934/PORT-06-22-DSCF7819_hoei12.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620933/Porto-5193-3_gutxvd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620933/Porto-5193-3_gutxvd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620933/LIsbon-7142_ikm1rn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620933/LIsbon-7142_ikm1rn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620933/LIsbon-6784_rmd6bz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620933/LIsbon-6784_rmd6bz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620932/PORT-6458_najzqw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620932/PORT-6458_najzqw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620932/Porto-5222_h1oaaq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620932/Porto-5222_h1oaaq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620932/PORT-140-Website-2_noqpop.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620932/PORT-140-Website-2_noqpop.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620932/LIsbon-6127_a8djca.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620932/LIsbon-6127_a8djca.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620931/PORT-06-22-DSCF5934_q3623t.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620931/PORT-06-22-DSCF5934_q3623t.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620931/LIsbon-5987_zv37dw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620931/LIsbon-5987_zv37dw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620930/PORT-482_enog7p.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620930/PORT-482_enog7p.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620930/PORT-420_fyyumc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620930/PORT-420_fyyumc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620930/Lisbon-5890_haasme.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620930/Lisbon-5890_haasme.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620929/PORT-78_wyjut9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620929/PORT-78_wyjut9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620929/PORT-443_cpq1gm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620929/PORT-443_cpq1gm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620929/PORT-267_jg3qms.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620929/PORT-267_jg3qms.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620928/PORT-80_lrdazv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620928/PORT-80_lrdazv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620928/PORT-678_enndze.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620928/PORT-678_enndze.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620928/Lisbon-5415_ordief.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620928/Lisbon-5415_ordief.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620927/DSCF4538_n0ws8y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620927/DSCF4538_n0ws8y.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620927/DSCF3837_sqhwsp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620927/DSCF3837_sqhwsp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620926/DSCF4522_kt4gv1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620926/DSCF4522_kt4gv1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620926/Greece-DSCF4135_c6rdkq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620926/Greece-DSCF4135_c6rdkq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620925/DSCF3950_anx3nk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620925/DSCF3950_anx3nk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620925/DSCF4185_ynqobu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620925/DSCF4185_ynqobu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620925/DSCF4135_ziuvqa.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620925/DSCF4135_ziuvqa.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620924/DSCF4458_wtvjrt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620924/DSCF4458_wtvjrt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620924/DSCF4324_rsbfvp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620924/DSCF4324_rsbfvp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620924/DSCF4025_ji9ebk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620924/DSCF4025_ji9ebk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/DSCF4186_wakazf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/DSCF4186_wakazf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/DSCF3407_copy_pkrzen.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/DSCF3407_copy_pkrzen.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620921/DSCF3935_jlhzid.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620921/DSCF3935_jlhzid.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/DSCF3885_copy_ygoaqw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/DSCF3885_copy_ygoaqw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/DSCF3847-Website-2_kjn3a7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/DSCF3847-Website-2_kjn3a7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620900/DSCF5985_cj2jqe.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620900/DSCF5985_cj2jqe.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620899/DSCF7701_cv8trj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620899/DSCF7701_cv8trj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620899/DSCF3900_a4fdnu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620899/DSCF3900_a4fdnu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/DSCF4018_yov5nd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/DSCF4018_yov5nd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/DSCF4511-Website-2_reprqy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/DSCF4511-Website-2_reprqy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620897/DSCF5990_p5uglb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620897/DSCF5990_p5uglb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620897/DSCF5156_alm1cc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620897/DSCF5156_alm1cc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620897/DSCF3805_cy72sz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620897/DSCF3805_cy72sz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620896/DSCF3885_copy_2_c1kkgf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620896/DSCF3885_copy_2_c1kkgf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620896/DSCF6643_s0jw0x.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620896/DSCF6643_s0jw0x.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620895/DSCF6139_w3dqsv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620895/DSCF6139_w3dqsv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620895/DSCF4511_oq9cc0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620895/DSCF4511_oq9cc0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620895/DSCF5223_abwbmt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620895/DSCF5223_abwbmt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620895/DSCF3861_ofa84j.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620895/DSCF3861_ofa84j.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620895/DSCF4707_aknmba.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620895/DSCF4707_aknmba.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620894/DSCF5218_obpmdl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620894/DSCF5218_obpmdl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620894/DSCF7793_kfzy68.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620894/DSCF7793_kfzy68.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620893/DSCF7678_tc8tqy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620893/DSCF7678_tc8tqy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620893/DSCF5067_iyrbdd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620893/DSCF5067_iyrbdd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620893/DSCF3885_ymtq9l.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620893/DSCF3885_ymtq9l.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620893/DSCF4927_ykly5u.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620893/DSCF4927_ykly5u.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620892/DSCF7366_rmz149.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620892/DSCF7366_rmz149.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620892/DSCF4039_qe62xq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620892/DSCF4039_qe62xq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620892/DSCF7381_xfkdjc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620892/DSCF7381_xfkdjc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620891/DSCF5259_phy5zx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620891/DSCF5259_phy5zx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620889/DSCF0654_rtvu5a.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620889/DSCF0654_rtvu5a.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620888/DSCF0739_kscqli.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620888/DSCF0739_kscqli.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620888/DSCF0106_jyytfd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620888/DSCF0106_jyytfd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620887/DSCF9790_gewj8b.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620887/DSCF9790_gewj8b.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620887/DSCF0133_j3uy6b.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620887/DSCF0133_j3uy6b.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620887/DSCF0703_j8hgoi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620887/DSCF0703_j8hgoi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620887/DSCF0271_mrdxe1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620887/DSCF0271_mrdxe1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620886/DSCF0509_mq1l2i.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620886/DSCF0509_mq1l2i.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620886/DSCF9603_hoqpgn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620886/DSCF9603_hoqpgn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620885/DSCF9772_zomtnk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620885/DSCF9772_zomtnk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620885/DSCF9616_z06mft.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620885/DSCF9616_z06mft.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620885/DSCF9877_yzg03y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620885/DSCF9877_yzg03y.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620884/DSCF0103_hqdwnz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620884/DSCF0103_hqdwnz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620883/DSCF0063_eklmfd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620883/DSCF0063_eklmfd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620881/DSCF9661_mhhihj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620881/DSCF9661_mhhihj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620880/DSCF0459_wzv7m7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620880/DSCF0459_wzv7m7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620879/DSCF0856_chw8hy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620879/DSCF0856_chw8hy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620879/DSCF0545_szgxcg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620879/DSCF0545_szgxcg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/Viet-04-14-17_nryngg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/Viet-04-14-17_nryngg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620875/Vietnam_Valley_u2mka2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620875/Vietnam_Valley_u2mka2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620875/untitled-8559_m3tuuu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620875/untitled-8559_m3tuuu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620874/DSCF8205_kqw4yi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620874/DSCF8205_kqw4yi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620874/Viet-8465_j5wmg7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620874/Viet-8465_j5wmg7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620874/DSCF8179_gpz2ux.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620874/DSCF8179_gpz2ux.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620874/Lazy_Sunday_yqdq71.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620874/Lazy_Sunday_yqdq71.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620873/Viet-8468_y8fxq9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620873/Viet-8468_y8fxq9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620873/FamilyMeal_mnnogi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620873/FamilyMeal_mnnogi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620872/DSCF8354_jbm0nu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620872/DSCF8354_jbm0nu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620872/DSCF8045_yapviz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620872/DSCF8045_yapviz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620872/DSCF8181-2_kjhyau.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620872/DSCF8181-2_kjhyau.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620872/DSCF8023_lj771k.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620872/DSCF8023_lj771k.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620871/DSCF9062_fqan6k.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620871/DSCF9062_fqan6k.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620871/DSCF9211_jfiwxb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620871/DSCF9211_jfiwxb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620871/DSCF8269_rahyjy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620871/DSCF8269_rahyjy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620870/DSCF9016_tmuvf7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620870/DSCF9016_tmuvf7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620870/DSCF8333_pzflsu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620870/DSCF8333_pzflsu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620870/DSCF8868_w7ma4l.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620870/DSCF8868_w7ma4l.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620869/TonyMenias-GirlsInWindow_t0js9m.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620869/TonyMenias-GirlsInWindow_t0js9m.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620869/DSCF8577_s3huuf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620869/DSCF8577_s3huuf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620869/thumbs_DSCF2142-Website-2_rfyyur.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620869/thumbs_DSCF2142-Website-2_rfyyur.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620868/thumbs_DSCF0146_mb8cmn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620868/thumbs_DSCF0146_mb8cmn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620868/thumbs_PHI-12-19-DSCF2268_gdtflp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620868/thumbs_PHI-12-19-DSCF2268_gdtflp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620868/thumbs_DSCF1519_kxzk9n.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620868/thumbs_DSCF1519_kxzk9n.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620868/thumbs_DSCF2157_o2twgl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620868/thumbs_DSCF2157_o2twgl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620867/thumbs_DSCF2143_a1w12d.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620867/thumbs_DSCF2143_a1w12d.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620867/thumbs_DSCF2226_elu2on.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620867/thumbs_DSCF2226_elu2on.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620867/thumbs_PHI-1179_auredo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620867/thumbs_PHI-1179_auredo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620866/thumbs_PHI-9525_titzyf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620866/thumbs_PHI-9525_titzyf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620866/thumbs_PHI-1052_kbmxnq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620866/thumbs_PHI-1052_kbmxnq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620866/thumbs_PHI-0660_myrvfv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620866/thumbs_PHI-0660_myrvfv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620866/thumbs_PHI-1662_n59w2h.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620866/thumbs_PHI-1662_n59w2h.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620865/thumbs_PHI-12-19-DSCF1239_fmrwnn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620865/thumbs_PHI-12-19-DSCF1239_fmrwnn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620865/thumbs_PHI-12-19-DSCF1453_xpoztj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620865/thumbs_PHI-12-19-DSCF1453_xpoztj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620864/thumbs_PHI-9895_lvrqtc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620864/thumbs_PHI-9895_lvrqtc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620864/thumbs_PHI-12-19-DSCF8950_ymghku.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620864/thumbs_PHI-12-19-DSCF8950_ymghku.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620864/thumbs_PHI-12-19-DSCF0399_blyraj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620864/thumbs_PHI-12-19-DSCF0399_blyraj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620864/thumbs_Sunset-Sails_zmckrm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620864/thumbs_Sunset-Sails_zmckrm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620863/thumbs_PHI-12-19-DSCF1329_stqgfm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620863/thumbs_PHI-12-19-DSCF1329_stqgfm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620863/thumbs_DSCF0077_k3sfhn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620863/thumbs_DSCF0077_k3sfhn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620863/thumbs_PHI-1157_zn9ueu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620863/thumbs_PHI-1157_zn9ueu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620863/thumbs_PHI-2070_olmija.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620863/thumbs_PHI-2070_olmija.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620862/thumbs_DSCF1066_gndlcr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620862/thumbs_DSCF1066_gndlcr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620862/thumbs_DSCF1817_sxtt6u.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620862/thumbs_DSCF1817_sxtt6u.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/thumbs_PHI-9214_pgct8o.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/thumbs_PHI-9214_pgct8o.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/thumbs_PHI-9879-copy_r5mmpl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/thumbs_PHI-9879-copy_r5mmpl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/DSCF1066_dlp2l5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/DSCF1066_dlp2l5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/thumbs_PHI-2331_m3mcet.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/thumbs_PHI-2331_m3mcet.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620860/DSCF0146_i2balz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620860/DSCF0146_i2balz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620860/DSCF2143_aaxhrl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620860/DSCF2143_aaxhrl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/DSCF2157_gx2hbg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/DSCF2157_gx2hbg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/DSCF0146_dlacij.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/DSCF0146_dlacij.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/DSCF2142-Website-2_eb6hzl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/DSCF2142-Website-2_eb6hzl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620857/DSCF1519_txauyj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620857/DSCF1519_txauyj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620857/DSCF1519_cytcln.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620857/DSCF1519_cytcln.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620856/DSCF0077_niz5ed.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620856/DSCF0077_niz5ed.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620855/DSCF2157_dwy4f7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620855/DSCF2157_dwy4f7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/DSCF2226_sirkkb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/DSCF2226_sirkkb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/DSCF2143_ugizl0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/DSCF2143_ugizl0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620852/DSCF2142-Website-2_c2mozq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620852/DSCF2142-Website-2_c2mozq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620851/DSCF1066_xsgu1x.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620851/DSCF1066_xsgu1x.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620849/Sunset-Sails_vy5syf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620849/Sunset-Sails_vy5syf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620849/DSCF0077_l2yojy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620849/DSCF0077_l2yojy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620848/DSCF1817_opxj2a.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620848/DSCF1817_opxj2a.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620847/Sunset-Sails_yki0qw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620847/Sunset-Sails_yki0qw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/DSCF2226_zd5ivt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/DSCF2226_zd5ivt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620844/DSCF1817_xjgw9q.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620844/DSCF1817_xjgw9q.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620842/THAII-12-19-DSCF3053_jeapu8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620842/THAII-12-19-DSCF3053_jeapu8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620842/_DSF4413_pvua7q.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620842/_DSF4413_pvua7q.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620840/_DSF4670_horm3y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620840/_DSF4670_horm3y.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/DSCF3846_a0fmq9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/DSCF3846_a0fmq9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620837/DSCF3146_w6d7v7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620837/DSCF3146_w6d7v7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620836/DSCF2520_k8kntl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620836/DSCF2520_k8kntl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620836/DSCF3890_g5rsz8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620836/DSCF3890_g5rsz8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620836/DSCF3700_pffyyy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620836/DSCF3700_pffyyy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620835/_DSF4784_z5lzzf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620835/_DSF4784_z5lzzf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620835/_DSF4410_boqsxk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620835/_DSF4410_boqsxk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620835/DSCF4676_pxnikn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620835/DSCF4676_pxnikn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620835/DSCF3152_p3yz0p.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620835/DSCF3152_p3yz0p.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620834/DSCF2498-Website-2_yqwcgp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620834/DSCF2498-Website-2_yqwcgp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620834/DSCF3654_rw4xon.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620834/DSCF3654_rw4xon.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620834/_DSF5070_ehwohp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620834/_DSF5070_ehwohp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620833/Simpler_Times_oj3qes.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620833/Simpler_Times_oj3qes.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620833/_DSF4899_mfob4c.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620833/_DSF4899_mfob4c.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/_DSF4413_1_vold4e.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/_DSF4413_1_vold4e.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/_DSF4863_onemqn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/_DSF4863_onemqn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NPL-8750_lspnpu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NPL-8750_lspnpu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620830/DSCF8466_lptg9y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620830/DSCF8466_lptg9y.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620830/DSCF8230_v5v1ax.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620830/DSCF8230_v5v1ax.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/DSCF8726_tiiww6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/DSCF8726_tiiww6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620826/DSCF1006-2_bku643.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620826/DSCF1006-2_bku643.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620826/DSCF9634_xrji9g.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620826/DSCF9634_xrji9g.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620825/DSCF1206_cqxnyj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620825/DSCF1206_cqxnyj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620825/DSCF0839-Website-2_e0ynng.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620825/DSCF0839-Website-2_e0ynng.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620825/DSCF9828_hjylcq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620825/DSCF9828_hjylcq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620824/DSCF9932_erydwn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620824/DSCF9932_erydwn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620824/Serendipity_wxoipu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620824/Serendipity_wxoipu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620823/DSCF0743_qalolu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620823/DSCF0743_qalolu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620822/DSCF0467_bcfzjb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620822/DSCF0467_bcfzjb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620822/DSCF9240_uotnpn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620822/DSCF9240_uotnpn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620821/DSCF9886_qkkv02.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620821/DSCF9886_qkkv02.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620821/DSCF0214_copy_q5ckis.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620821/DSCF0214_copy_q5ckis.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620821/Enlightened_yoigxl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620821/Enlightened_yoigxl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620821/DSCF0086-2_o5lf6y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620821/DSCF0086-2_o5lf6y.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620820/DSCF1056_voblia.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620820/DSCF1056_voblia.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620820/Bridge_to_Enlightenment_zruskk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620820/Bridge_to_Enlightenment_zruskk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620820/DSCF0506_lgj9ja.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620820/DSCF0506_lgj9ja.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620819/Tony_Menias-Fly_yc61ae.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620819/Tony_Menias-Fly_yc61ae.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620819/DSCF0817_lprtzs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620819/DSCF0817_lprtzs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620818/DSCF0474_sifar4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620818/DSCF0474_sifar4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620818/DSCF0098_copy_wnwgc3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620818/DSCF0098_copy_wnwgc3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620818/thumbs_Silent-Stare_ota6uu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620818/thumbs_Silent-Stare_ota6uu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620818/thumbs_DSF4784_xfuiej.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620818/thumbs_DSF4784_xfuiej.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620818/thumbs_DSCF3328_x6rla1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620818/thumbs_DSCF3328_x6rla1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620818/thumbs_NatureVSNurture_wnchde.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620818/thumbs_NatureVSNurture_wnchde.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620817/thumbs_DSF6570-4_ccdkyf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620817/thumbs_DSF6570-4_ccdkyf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620817/thumbs_1_NatureVSNurture_gppapp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620817/thumbs_1_NatureVSNurture_gppapp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620816/thumbs_DSCF1777_o7rget.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620816/thumbs_DSCF1777_o7rget.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620816/thumbs_DSF3067_dplmjl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620816/thumbs_DSF3067_dplmjl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620816/thumbs_IND-4681_tb81hc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620816/thumbs_IND-4681_tb81hc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620815/thumbs_DSF3265_pjwhvl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620815/thumbs_DSF3265_pjwhvl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620815/thumbs_DSCF0120_fqep27.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620815/thumbs_DSCF0120_fqep27.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620815/DSCF0120.jpg-nggid03291-ngg0dyn-0x360-00f0w010c010r110f110r010t010_lsqkdi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620815/DSCF0120.jpg-nggid03291-ngg0dyn-0x360-00f0w010c010r110f110r010t010_lsqkdi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620814/DSCF0120.jpg-nggid03291-ngg0dyn-300x200x100-00f0w010c010r110f110r010t010_t0rucx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620814/DSCF0120.jpg-nggid03291-ngg0dyn-300x200x100-00f0w010c010r110f110r010t010_t0rucx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620814/NatureVSNurture.jpg-nggid03295-ngg0dyn-0x360-00f0w010c010r110f110r010t010_uv9zmc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620814/NatureVSNurture.jpg-nggid03295-ngg0dyn-0x360-00f0w010c010r110f110r010t010_uv9zmc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620814/DSCF0120.jpg-nggid03291-ngg0dyn-240x160x100-00f0w010c011r110f110r010t010_hwfmit.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620814/DSCF0120.jpg-nggid03291-ngg0dyn-240x160x100-00f0w010c011r110f110r010t010_hwfmit.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620813/DSF3067.jpg-nggid03293-ngg0dyn-0x360-00f0w010c010r110f110r010t010_lb0fjv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620813/DSF3067.jpg-nggid03293-ngg0dyn-0x360-00f0w010c010r110f110r010t010_lb0fjv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620813/DSF6570-4.jpg-nggid03294-ngg0dyn-0x360-00f0w010c010r110f110r010t010_fmszce.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620813/DSF6570-4.jpg-nggid03294-ngg0dyn-0x360-00f0w010c010r110f110r010t010_fmszce.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620813/DSCF1777.jpg-nggid03292-ngg0dyn-0x360-00f0w010c010r110f110r010t010_aw6mha.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620813/DSCF1777.jpg-nggid03292-ngg0dyn-0x360-00f0w010c010r110f110r010t010_aw6mha.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620812/DSCF0120_i85dyk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620812/DSCF0120_i85dyk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620812/DSCF0120.jpg-nggid03291-ngg0dyn-240x160x100-00f0w010c010r110f110r010t010_knqaxk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620812/DSCF0120.jpg-nggid03291-ngg0dyn-240x160x100-00f0w010c010r110f110r010t010_knqaxk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620812/Silent-Stare_adkd7f.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620812/Silent-Stare_adkd7f.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620812/1_NatureVSNurture_f0pvd4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620812/1_NatureVSNurture_f0pvd4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620811/DSF4784_rn11rs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620811/DSF4784_rn11rs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620811/DSF4784_ss8r0m.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620811/DSF4784_ss8r0m.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620810/DSF6570-4_gjumyq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620810/DSF6570-4_gjumyq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620810/DSCF1777_yr4n3i.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620810/DSCF1777_yr4n3i.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620810/DSF3067_nrt1qa.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620810/DSF3067_nrt1qa.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620810/Silent-Stare_q2x5wf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620810/Silent-Stare_q2x5wf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620809/1_NatureVSNurture_pidfch.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620809/1_NatureVSNurture_pidfch.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620809/DSCF3328_jyq5bs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620809/DSCF3328_jyq5bs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620809/DSF3265_gdy5cr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620809/DSF3265_gdy5cr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620809/DSCF3328_tiifso.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620809/DSCF3328_tiifso.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620809/NatureVSNurture_qsneh0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620809/NatureVSNurture_qsneh0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620807/NatureVSNurture_adxhb7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620807/NatureVSNurture_adxhb7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620807/DSF6570-4_r3ygaw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620807/DSF6570-4_r3ygaw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620806/DSF3067_jnautl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620806/DSF3067_jnautl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620806/DSF3265_wdiwjj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620806/DSF3265_wdiwjj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620806/DSCF1777_sx8nq4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620806/DSCF1777_sx8nq4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620806/DSCF0120_sftepy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620806/DSCF0120_sftepy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620802/_DSF3449_copy_owz7fb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620802/_DSF3449_copy_owz7fb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620802/_DSF3067_yg1ubj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620802/_DSF3067_yg1ubj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/WanderingPaths_x2mcir.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/WanderingPaths_x2mcir.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620800/Japan_usigoc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620800/Japan_usigoc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620799/_DSF3121_hh1qpp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620799/_DSF3121_hh1qpp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620799/_DSF2956_dclmfe.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620799/_DSF2956_dclmfe.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620799/thumbs_DSCF7711_ofz4on.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620799/thumbs_DSCF7711_ofz4on.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620798/thumbs_DSCF7447-Website-2_yxsd5x.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620798/thumbs_DSCF7447-Website-2_yxsd5x.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620798/thumbs_IND-4213_f2cxqt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620798/thumbs_IND-4213_f2cxqt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620798/thumbs_IND-4233_femsuv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620798/thumbs_IND-4233_femsuv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620797/thumbs_IND-0027_qpe9px.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620797/thumbs_IND-0027_qpe9px.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620797/thumbs_DSCF9656_lbpucp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620797/thumbs_DSCF9656_lbpucp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620797/thumbs_DSCF6376_ho9b7g.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620797/thumbs_DSCF6376_ho9b7g.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620796/thumbs_IND-7351_vmpqfc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620796/thumbs_IND-7351_vmpqfc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620796/thumbs_DSCF7426-Website-2_frlsj6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620796/thumbs_DSCF7426-Website-2_frlsj6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620796/thumbs_DSCF5602_sa3wrf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620796/thumbs_DSCF5602_sa3wrf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620796/thumbs_IND-0202_jithat.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620796/thumbs_IND-0202_jithat.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620795/thumbs_DSCF9829_enaacm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620795/thumbs_DSCF9829_enaacm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620795/thumbs_DSCF3328_r8rss7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620795/thumbs_DSCF3328_r8rss7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620795/thumbs_IND-7032-Website-3_a1euzd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620795/thumbs_IND-7032-Website-3_a1euzd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620795/thumbs_IND-6198_vyjl4z.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620795/thumbs_IND-6198_vyjl4z.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620794/thumbs_IND-7059_vwvrsu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620794/thumbs_IND-7059_vwvrsu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620794/thumbs_IND-7067_su1xwn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620794/thumbs_IND-7067_su1xwn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620793/thumbs_DSCF5623_m3qccf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620793/thumbs_DSCF5623_m3qccf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620793/thumbs_HoliAir_ho70xw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620793/thumbs_HoliAir_ho70xw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620793/thumbs_IND-4681_pd93db.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620793/thumbs_IND-4681_pd93db.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620793/thumbs_DSCF7149_p0s548.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620793/thumbs_DSCF7149_p0s548.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620793/thumbs_IND-4740_yuiwff.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620793/thumbs_IND-4740_yuiwff.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620792/thumbs_DSCF8019_atuhmp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620792/thumbs_DSCF8019_atuhmp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620791/thumbs_DSCF7677_wteqvj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620791/thumbs_DSCF7677_wteqvj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620791/thumbs_DSCF9341_bfiibj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620791/thumbs_DSCF9341_bfiibj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620791/thumbs_DSCF6985_g7pj52.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620791/thumbs_DSCF6985_g7pj52.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620791/thumbs_DSCF3538_mm0qgd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620791/thumbs_DSCF3538_mm0qgd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620790/thumbs_DSCF9891_tuagib.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620790/thumbs_DSCF9891_tuagib.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620790/thumbs_IND-5525_ewrh9c.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620790/thumbs_IND-5525_ewrh9c.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620789/thumbs_DSCF6075_ergrrw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620789/thumbs_DSCF6075_ergrrw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620789/thumbs_DSCF6430_ssqmoy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620789/thumbs_DSCF6430_ssqmoy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620789/thumbs_DSCF9996_sxonuo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620789/thumbs_DSCF9996_sxonuo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620789/thumbs_DSCF6505-Website-2_tdife9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620789/thumbs_DSCF6505-Website-2_tdife9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620789/thumbs_DSCF9461_iw5kle.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620789/thumbs_DSCF9461_iw5kle.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620787/thumbs_DSCF9989_mbqwgh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620787/thumbs_DSCF9989_mbqwgh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620787/thumbs_DSCF6730_jofhf8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620787/thumbs_DSCF6730_jofhf8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620787/thumbs_DSCF5162_eb3zlx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620787/thumbs_DSCF5162_eb3zlx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620786/thumbs_DSCF4836_yflzay.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620786/thumbs_DSCF4836_yflzay.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620786/thumbs_DSCF9708_nie3re.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620786/thumbs_DSCF9708_nie3re.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620786/thumbs_Manhole_qv8h3z.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620786/thumbs_Manhole_qv8h3z.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620786/thumbs_MadameJodhpur_uplgie.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620786/thumbs_MadameJodhpur_uplgie.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620786/thumbs_IND-7032-Website-2_rvzsol.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620786/thumbs_IND-7032-Website-2_rvzsol.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620785/thumbs_DSCF4040-Edit_ktvg2x.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620785/thumbs_DSCF4040-Edit_ktvg2x.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620779/thumbs_DSCF5877_sg0kzz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620779/thumbs_DSCF5877_sg0kzz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620759/thumbs_DSCF7461_rlgplm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620759/thumbs_DSCF7461_rlgplm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620757/thumbs_DSCF7677-1_zrmrta.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620757/thumbs_DSCF7677-1_zrmrta.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620757/thumbs_DSCF9362_vmr2lv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620757/thumbs_DSCF9362_vmr2lv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620756/thumbs_DSCF7231_jk8imz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620756/thumbs_DSCF7231_jk8imz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620756/thumbs_DSCF7290_yr507h.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620756/thumbs_DSCF7290_yr507h.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620756/thumbs_DSCF7967_cwmjhn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620756/thumbs_DSCF7967_cwmjhn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620755/thumbs_IND-9375_hhuyp2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620755/thumbs_IND-9375_hhuyp2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620755/thumbs_DSCF6265_nvkgsa.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620755/thumbs_DSCF6265_nvkgsa.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620755/thumbs_IND-6285_qpkyht.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620755/thumbs_IND-6285_qpkyht.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620755/thumbs_DSCF4140_nicqru.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620755/thumbs_DSCF4140_nicqru.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620754/thumbs_IND-6034_wo4ydn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620754/thumbs_IND-6034_wo4ydn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620754/thumbs_DSCF4983_dvmok9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620754/thumbs_DSCF4983_dvmok9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620754/thumbs_Baba-Holi_meb1rw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620754/thumbs_Baba-Holi_meb1rw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620753/thumbs_DSCF3256_amcfmk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620753/thumbs_DSCF3256_amcfmk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620753/thumbs_DSCF0299-Website-2_igruis.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620753/thumbs_DSCF0299-Website-2_igruis.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620752/thumbs_DSCF8106_duvah7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620752/thumbs_DSCF8106_duvah7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620752/thumbs_IND-7083_mrbnwg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620752/thumbs_IND-7083_mrbnwg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620752/thumbs_DSCF0189_irqefw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620752/thumbs_DSCF0189_irqefw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620752/thumbs_DSCF3669_wsahor.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620752/thumbs_DSCF3669_wsahor.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620751/thumbs_INDTAJ-_qsv8mm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620751/thumbs_INDTAJ-_qsv8mm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620751/thumbs_IND-6783_innosd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620751/thumbs_IND-6783_innosd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620751/thumbs_DSCF9629_bnkyxm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620751/thumbs_DSCF9629_bnkyxm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620750/thumbs_IND-3013_zuzbvs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620750/thumbs_IND-3013_zuzbvs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620750/thumbs_DSCF8897_dy5uyt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620750/thumbs_DSCF8897_dy5uyt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620750/thumbs_DSCF8021-Website-2_gosfx7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620750/thumbs_DSCF8021-Website-2_gosfx7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620748/thumbs_DSCF4813-Website-2_eeahug.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620748/thumbs_DSCF4813-Website-2_eeahug.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620746/thumbs_DSCF9689-Website-2_nuwujx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620746/thumbs_DSCF9689-Website-2_nuwujx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620746/thumbs_IND-5563_as7u1s.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620746/thumbs_IND-5563_as7u1s.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620746/thumbs_DSCF7376_llz3jw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620746/thumbs_DSCF7376_llz3jw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620745/thumbs_DSCF4455-1_luclck.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620745/thumbs_DSCF4455-1_luclck.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620745/thumbs_IND-7597_ngramc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620745/thumbs_IND-7597_ngramc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620745/thumbs_DSCF5839_sbhvy5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620745/thumbs_DSCF5839_sbhvy5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620744/thumbs_DSCF8848-2_dqwoym.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620744/thumbs_DSCF8848-2_dqwoym.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620744/thumbs_DSCF7426-Website-2-1_ame9mq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620744/thumbs_DSCF7426-Website-2-1_ame9mq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620743/MadameJodhpur.jpg-nggid03231-ngg0dyn-0x360-00f0w010c010r110f110r010t010_ztrcwa.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620743/MadameJodhpur.jpg-nggid03231-ngg0dyn-0x360-00f0w010c010r110f110r010t010_ztrcwa.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620743/DSCF6730.jpg-nggid03238-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ytjb7x.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620743/DSCF6730.jpg-nggid03238-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ytjb7x.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620743/DSCF9461.jpg-nggid03234-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nsbwqu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620743/DSCF9461.jpg-nggid03234-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nsbwqu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620743/DSCF7149.jpg-nggid03258-ngg0dyn-180x0-00f0w010c010r110f110r010t010_wjivru.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620743/DSCF7149.jpg-nggid03258-ngg0dyn-180x0-00f0w010c010r110f110r010t010_wjivru.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620742/DSCF9461.jpg-nggid03234-ngg0dyn-0x360-00f0w010c010r110f110r010t010_v5ew9v.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620742/DSCF9461.jpg-nggid03234-ngg0dyn-0x360-00f0w010c010r110f110r010t010_v5ew9v.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620742/DSCF4836.jpg-nggid03223-ngg0dyn-180x0-00f0w010c010r110f110r010t010_sptr8h.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620742/DSCF4836.jpg-nggid03223-ngg0dyn-180x0-00f0w010c010r110f110r010t010_sptr8h.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620742/DSCF7290.jpg-nggid03241-ngg0dyn-0x360-00f0w010c010r110f110r010t010_peggsg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620742/DSCF7290.jpg-nggid03241-ngg0dyn-0x360-00f0w010c010r110f110r010t010_peggsg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620740/DSCF7426-Website-2.jpg-nggid03242-ngg0dyn-180x0-00f0w010c010r110f110r010t010_txjixb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620740/DSCF7426-Website-2.jpg-nggid03242-ngg0dyn-180x0-00f0w010c010r110f110r010t010_txjixb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620740/DSCF3256.jpg-nggid03213-ngg0dyn-240x160x100-00f0w010c011r110f110r010t010_dlz5en.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620740/DSCF3256.jpg-nggid03213-ngg0dyn-240x160x100-00f0w010c011r110f110r010t010_dlz5en.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620740/DSCF7461.jpg-nggid03247-ngg0dyn-0x360-00f0w010c010r110f110r010t010_ct8fcp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620740/DSCF7461.jpg-nggid03247-ngg0dyn-0x360-00f0w010c010r110f110r010t010_ct8fcp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620739/DSCF9989.jpg-nggid03227-ngg0dyn-180x0-00f0w010c010r110f110r010t010_n50owy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620739/DSCF9989.jpg-nggid03227-ngg0dyn-180x0-00f0w010c010r110f110r010t010_n50owy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620739/DSCF6505-Website-2.jpg-nggid03287-ngg0dyn-180x0-00f0w010c010r110f110r010t010_npwxn6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620739/DSCF6505-Website-2.jpg-nggid03287-ngg0dyn-180x0-00f0w010c010r110f110r010t010_npwxn6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620739/DSCF3328.jpg-nggid03285-ngg0dyn-0x360-00f0w010c010r110f110r010t010_szyjcf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620739/DSCF3328.jpg-nggid03285-ngg0dyn-0x360-00f0w010c010r110f110r010t010_szyjcf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620739/DSCF4813-Website-2.jpg-nggid03253-ngg0dyn-180x0-00f0w010c010r110f110r010t010_lzmfk2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620739/DSCF4813-Website-2.jpg-nggid03253-ngg0dyn-180x0-00f0w010c010r110f110r010t010_lzmfk2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620738/DSCF9341.jpg-nggid03233-ngg0dyn-0x360-00f0w010c010r110f110r010t010_ehdbny.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620738/DSCF9341.jpg-nggid03233-ngg0dyn-0x360-00f0w010c010r110f110r010t010_ehdbny.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620737/DSCF7447-Website-2.jpg-nggid03243-ngg0dyn-0x360-00f0w010c010r110f110r010t010_xzpiox.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620737/DSCF7447-Website-2.jpg-nggid03243-ngg0dyn-0x360-00f0w010c010r110f110r010t010_xzpiox.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620737/DSCF0189.jpg-nggid03236-ngg0dyn-0x360-00f0w010c010r110f110r010t010_zewgx5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620737/DSCF0189.jpg-nggid03236-ngg0dyn-0x360-00f0w010c010r110f110r010t010_zewgx5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620737/DSCF7231.jpg-nggid03240-ngg0dyn-180x0-00f0w010c010r110f110r010t010_jp65b5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620737/DSCF7231.jpg-nggid03240-ngg0dyn-180x0-00f0w010c010r110f110r010t010_jp65b5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620737/DSCF0299-Website-2.jpg-nggid03237-ngg0dyn-180x0-00f0w010c010r110f110r010t010_zmzqfu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620737/DSCF0299-Website-2.jpg-nggid03237-ngg0dyn-180x0-00f0w010c010r110f110r010t010_zmzqfu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620736/Manhole.jpg-nggid03230-ngg0dyn-180x0-00f0w010c010r110f110r010t010_urfnpf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620736/Manhole.jpg-nggid03230-ngg0dyn-180x0-00f0w010c010r110f110r010t010_urfnpf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620736/DSCF5877.jpg-nggid03220-ngg0dyn-180x0-00f0w010c010r110f110r010t010_sdncit.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620736/DSCF5877.jpg-nggid03220-ngg0dyn-180x0-00f0w010c010r110f110r010t010_sdncit.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620735/DSCF4140.jpg-nggid03215-ngg0dyn-0x360-00f0w010c010r110f110r010t010_rf6lnd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620735/DSCF4140.jpg-nggid03215-ngg0dyn-0x360-00f0w010c010r110f110r010t010_rf6lnd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620735/DSCF9656.jpg-nggid03248-ngg0dyn-180x0-00f0w010c010r110f110r010t010_dbmdyd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620735/DSCF9656.jpg-nggid03248-ngg0dyn-180x0-00f0w010c010r110f110r010t010_dbmdyd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620735/DSCF7376.jpg-nggid03217-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ca9zoh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620735/DSCF7376.jpg-nggid03217-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ca9zoh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620735/MadameJodhpur.jpg-nggid03231-ngg0dyn-180x0-00f0w010c010r110f110r010t010_rsagqq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620735/MadameJodhpur.jpg-nggid03231-ngg0dyn-180x0-00f0w010c010r110f110r010t010_rsagqq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620734/DSCF5162.jpg-nggid03252-ngg0dyn-180x0-00f0w010c010r110f110r010t010_zfx82e.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620734/DSCF5162.jpg-nggid03252-ngg0dyn-180x0-00f0w010c010r110f110r010t010_zfx82e.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620734/DSCF0299-Website-2.jpg-nggid03237-ngg0dyn-0x360-00f0w010c010r110f110r010t010_jiu5gi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620734/DSCF0299-Website-2.jpg-nggid03237-ngg0dyn-0x360-00f0w010c010r110f110r010t010_jiu5gi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620733/DSCF7677-1.jpg-nggid03225-ngg0dyn-0x360-00f0w010c010r110f110r010t010_g7du47.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620733/DSCF7677-1.jpg-nggid03225-ngg0dyn-0x360-00f0w010c010r110f110r010t010_g7du47.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620733/DSCF4140.jpg-nggid03215-ngg0dyn-180x0-00f0w010c010r110f110r010t010_qfuvr8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620733/DSCF4140.jpg-nggid03215-ngg0dyn-180x0-00f0w010c010r110f110r010t010_qfuvr8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620733/DSCF7426-Website-2-1.jpg-nggid03288-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ybpje3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620733/DSCF7426-Website-2-1.jpg-nggid03288-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ybpje3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620732/DSCF7447-Website-2.jpg-nggid03243-ngg0dyn-180x0-00f0w010c010r110f110r010t010_vrsue5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620732/DSCF7447-Website-2.jpg-nggid03243-ngg0dyn-180x0-00f0w010c010r110f110r010t010_vrsue5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620732/DSCF6730.jpg-nggid03238-ngg0dyn-0x360-00f0w010c010r110f110r010t010_bbotwm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620732/DSCF6730.jpg-nggid03238-ngg0dyn-0x360-00f0w010c010r110f110r010t010_bbotwm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620732/HoliAir.jpg-nggid03214-ngg0dyn-0x360-00f0w010c010r110f110r010t010_t4ghjh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620732/HoliAir.jpg-nggid03214-ngg0dyn-0x360-00f0w010c010r110f110r010t010_t4ghjh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620732/DSCF7426-Website-2.jpg-nggid03242-ngg0dyn-0x360-00f0w010c010r110f110r010t010_pm4k1r.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620732/DSCF7426-Website-2.jpg-nggid03242-ngg0dyn-0x360-00f0w010c010r110f110r010t010_pm4k1r.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620731/DSCF7461.jpg-nggid03247-ngg0dyn-180x0-00f0w010c010r110f110r010t010_utrrvx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620731/DSCF7461.jpg-nggid03247-ngg0dyn-180x0-00f0w010c010r110f110r010t010_utrrvx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620731/DSCF4040-Edit.jpg-nggid03254-ngg0dyn-0x360-00f0w010c010r110f110r010t010_b1sjt3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620731/DSCF4040-Edit.jpg-nggid03254-ngg0dyn-0x360-00f0w010c010r110f110r010t010_b1sjt3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620730/DSCF3256.jpg-nggid03213-ngg0dyn-300x200x100-00f0w010c010r110f110r010t010_hye2k4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620730/DSCF3256.jpg-nggid03213-ngg0dyn-300x200x100-00f0w010c010r110f110r010t010_hye2k4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620729/DSCF3538.jpg-nggid03228-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mrbanv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620729/DSCF3538.jpg-nggid03228-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mrbanv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620729/DSCF6075.jpg-nggid03256-ngg0dyn-0x360-00f0w010c010r110f110r010t010_hzoiyx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620729/DSCF6075.jpg-nggid03256-ngg0dyn-0x360-00f0w010c010r110f110r010t010_hzoiyx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620729/DSCF8897.jpg-nggid03260-ngg0dyn-0x360-00f0w010c010r110f110r010t010_yu01d9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620729/DSCF8897.jpg-nggid03260-ngg0dyn-0x360-00f0w010c010r110f110r010t010_yu01d9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620729/DSCF9341.jpg-nggid03233-ngg0dyn-180x0-00f0w010c010r110f110r010t010_qftugz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620729/DSCF9341.jpg-nggid03233-ngg0dyn-180x0-00f0w010c010r110f110r010t010_qftugz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620728/DSCF9891.jpg-nggid03224-ngg0dyn-0x360-00f0w010c010r110f110r010t010_unhhkk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620728/DSCF9891.jpg-nggid03224-ngg0dyn-0x360-00f0w010c010r110f110r010t010_unhhkk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620727/DSCF3669.jpg-nggid03255-ngg0dyn-180x0-00f0w010c010r110f110r010t010_uvo1zb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620727/DSCF3669.jpg-nggid03255-ngg0dyn-180x0-00f0w010c010r110f110r010t010_uvo1zb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620727/DSCF9629.jpg-nggid03290-ngg0dyn-180x0-00f0w010c010r110f110r010t010_qwr0sc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620727/DSCF9629.jpg-nggid03290-ngg0dyn-180x0-00f0w010c010r110f110r010t010_qwr0sc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620727/DSCF6265.jpg-nggid03222-ngg0dyn-180x0-00f0w010c010r110f110r010t010_x9pw7c.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620727/DSCF6265.jpg-nggid03222-ngg0dyn-180x0-00f0w010c010r110f110r010t010_x9pw7c.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620726/DSCF8106.jpg-nggid03289-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nuvi3s.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620726/DSCF8106.jpg-nggid03289-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nuvi3s.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620726/Baba-Holi.jpg-nggid03229-ngg0dyn-180x0-00f0w010c010r110f110r010t010_srhe48.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620726/Baba-Holi.jpg-nggid03229-ngg0dyn-180x0-00f0w010c010r110f110r010t010_srhe48.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620725/DSCF4455-1.jpg-nggid03232-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ofwawq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620725/DSCF4455-1.jpg-nggid03232-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ofwawq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620725/DSCF7376.jpg-nggid03217-ngg0dyn-0x360-00f0w010c010r110f110r010t010_kyzd2o.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620725/DSCF7376.jpg-nggid03217-ngg0dyn-0x360-00f0w010c010r110f110r010t010_kyzd2o.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620725/DSCF7231.jpg-nggid03240-ngg0dyn-0x360-00f0w010c010r110f110r010t010_ablfzm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620725/DSCF7231.jpg-nggid03240-ngg0dyn-0x360-00f0w010c010r110f110r010t010_ablfzm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620725/DSCF8019.jpg-nggid03245-ngg0dyn-180x0-00f0w010c010r110f110r010t010_cjx3xu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620725/DSCF8019.jpg-nggid03245-ngg0dyn-180x0-00f0w010c010r110f110r010t010_cjx3xu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620724/DSCF9708.jpg-nggid03235-ngg0dyn-0x360-00f0w010c010r110f110r010t010_hbjpqc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620724/DSCF9708.jpg-nggid03235-ngg0dyn-0x360-00f0w010c010r110f110r010t010_hbjpqc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620724/DSCF9689-Website-2.jpg-nggid03262-ngg0dyn-180x0-00f0w010c010r110f110r010t010_zetluf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620724/DSCF9689-Website-2.jpg-nggid03262-ngg0dyn-180x0-00f0w010c010r110f110r010t010_zetluf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620723/DSCF3256.jpg-nggid03213-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ylrtqt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620723/DSCF3256.jpg-nggid03213-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ylrtqt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620722/DSCF6430.jpg-nggid03257-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xjetee.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620722/DSCF6430.jpg-nggid03257-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xjetee.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620722/DSCF7967.jpg-nggid03216-ngg0dyn-0x360-00f0w010c010r110f110r010t010_isi2xy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620722/DSCF7967.jpg-nggid03216-ngg0dyn-0x360-00f0w010c010r110f110r010t010_isi2xy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620722/DSCF5623.jpg-nggid03251-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mkid71.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620722/DSCF5623.jpg-nggid03251-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mkid71.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620722/DSCF4983.jpg-nggid03286-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nvtzig.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620722/DSCF4983.jpg-nggid03286-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nvtzig.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620721/DSCF6075.jpg-nggid03256-ngg0dyn-180x0-00f0w010c010r110f110r010t010_armbvq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620721/DSCF6075.jpg-nggid03256-ngg0dyn-180x0-00f0w010c010r110f110r010t010_armbvq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620721/DSCF3328.jpg-nggid03285-ngg0dyn-180x0-00f0w010c010r110f110r010t010_prkeum.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620721/DSCF3328.jpg-nggid03285-ngg0dyn-180x0-00f0w010c010r110f110r010t010_prkeum.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620721/DSCF6505-Website-2.jpg-nggid03287-ngg0dyn-0x360-00f0w010c010r110f110r010t010_atwvq5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620721/DSCF6505-Website-2.jpg-nggid03287-ngg0dyn-0x360-00f0w010c010r110f110r010t010_atwvq5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620720/DSCF7711.jpg-nggid03246-ngg0dyn-180x0-00f0w010c010r110f110r010t010_giws8k.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620720/DSCF7711.jpg-nggid03246-ngg0dyn-180x0-00f0w010c010r110f110r010t010_giws8k.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620720/DSCF9829.jpg-nggid03249-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ciade6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620720/DSCF9829.jpg-nggid03249-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ciade6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620719/DSCF0189.jpg-nggid03236-ngg0dyn-180x0-00f0w010c010r110f110r010t010_tungq1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620719/DSCF0189.jpg-nggid03236-ngg0dyn-180x0-00f0w010c010r110f110r010t010_tungq1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620719/DSCF4455-1.jpg-nggid03232-ngg0dyn-0x360-00f0w010c010r110f110r010t010_ap2zam.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620719/DSCF4455-1.jpg-nggid03232-ngg0dyn-0x360-00f0w010c010r110f110r010t010_ap2zam.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620719/DSCF7967.jpg-nggid03216-ngg0dyn-180x0-00f0w010c010r110f110r010t010_uqhkvm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620719/DSCF7967.jpg-nggid03216-ngg0dyn-180x0-00f0w010c010r110f110r010t010_uqhkvm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620717/DSCF5839.jpg-nggid03250-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xkpwu9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620717/DSCF5839.jpg-nggid03250-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xkpwu9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620717/DSCF8021-Website-2.jpg-nggid03244-ngg0dyn-180x0-00f0w010c010r110f110r010t010_wxaj0j.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620717/DSCF8021-Website-2.jpg-nggid03244-ngg0dyn-180x0-00f0w010c010r110f110r010t010_wxaj0j.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620717/DSCF5839.jpg-nggid03250-ngg0dyn-0x360-00f0w010c010r110f110r010t010_duofyq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620717/DSCF5839.jpg-nggid03250-ngg0dyn-0x360-00f0w010c010r110f110r010t010_duofyq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620716/DSCF3256.jpg-nggid03213-ngg0dyn-0x360-00f0w010c010r110f110r010t010_qz2com.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620716/DSCF3256.jpg-nggid03213-ngg0dyn-0x360-00f0w010c010r110f110r010t010_qz2com.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620715/DSCF5602.jpg-nggid03219-ngg0dyn-180x0-00f0w010c010r110f110r010t010_su9hem.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620715/DSCF5602.jpg-nggid03219-ngg0dyn-180x0-00f0w010c010r110f110r010t010_su9hem.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620715/Manhole.jpg-nggid03230-ngg0dyn-0x360-00f0w010c010r110f110r010t010_ajixk5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620715/Manhole.jpg-nggid03230-ngg0dyn-0x360-00f0w010c010r110f110r010t010_ajixk5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620715/DSCF6265.jpg-nggid03222-ngg0dyn-0x360-00f0w010c010r110f110r010t010_zj2pee.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620715/DSCF6265.jpg-nggid03222-ngg0dyn-0x360-00f0w010c010r110f110r010t010_zj2pee.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620714/DSCF5602.jpg-nggid03219-ngg0dyn-0x360-00f0w010c010r110f110r010t010_tl1hcg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620714/DSCF5602.jpg-nggid03219-ngg0dyn-0x360-00f0w010c010r110f110r010t010_tl1hcg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620714/DSCF6985.jpg-nggid03239-ngg0dyn-180x0-00f0w010c010r110f110r010t010_khrnz5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620714/DSCF6985.jpg-nggid03239-ngg0dyn-180x0-00f0w010c010r110f110r010t010_khrnz5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620714/DSCF4040-Edit.jpg-nggid03254-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mzlfom.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620714/DSCF4040-Edit.jpg-nggid03254-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mzlfom.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620713/DSCF3256.jpg-nggid03213-ngg0dyn-240x160x100-00f0w010c010r110f110r010t010_xxn54k.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620713/DSCF3256.jpg-nggid03213-ngg0dyn-240x160x100-00f0w010c010r110f110r010t010_xxn54k.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620713/DSCF3669.jpg-nggid03255-ngg0dyn-0x360-00f0w010c010r110f110r010t010_voorfy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620713/DSCF3669.jpg-nggid03255-ngg0dyn-0x360-00f0w010c010r110f110r010t010_voorfy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620712/DSCF8848-2.jpg-nggid03259-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ayvyqs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620712/DSCF8848-2.jpg-nggid03259-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ayvyqs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620712/DSCF7677-1_hlb75w.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620712/DSCF7677-1_hlb75w.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620712/DSCF5877.jpg-nggid03220-ngg0dyn-0x360-00f0w010c010r110f110r010t010_igeyrw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620712/DSCF5877.jpg-nggid03220-ngg0dyn-0x360-00f0w010c010r110f110r010t010_igeyrw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/DSCF7677-1_xzxjyn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/DSCF7677-1_xzxjyn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/MadameJodhpur_kxinxc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/MadameJodhpur_kxinxc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/DSCF9656_grtkma.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/DSCF9656_grtkma.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620710/DSCF9689-Website-2_pkowsx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620710/DSCF9689-Website-2_pkowsx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620710/MadameJodhpur_wjaeib.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620710/MadameJodhpur_wjaeib.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620710/DSCF5602_ftcd4e.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620710/DSCF5602_ftcd4e.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620709/DSCF3328_igh8th.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620709/DSCF3328_igh8th.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620709/DSCF6730_hjigj9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620709/DSCF6730_hjigj9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620709/DSCF7677_ree7wl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620709/DSCF7677_ree7wl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620708/DSCF9689-Website-2_ryspa2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620708/DSCF9689-Website-2_ryspa2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620708/DSCF9996_gqxy95.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620708/DSCF9996_gqxy95.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620708/Manhole_fiv7fz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620708/Manhole_fiv7fz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620707/DSCF3256_lompl4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620707/DSCF3256_lompl4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620706/DSCF6376_m7vjoo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620706/DSCF6376_m7vjoo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620706/DSCF7149_ricozb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620706/DSCF7149_ricozb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620706/DSCF5162_umwjfw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620706/DSCF5162_umwjfw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620706/DSCF0189_fhiiut.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620706/DSCF0189_fhiiut.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620705/DSCF3328_qzasd5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620705/DSCF3328_qzasd5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620705/DSCF4983_gbwklk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620705/DSCF4983_gbwklk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620704/DSCF7290_mjf518.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620704/DSCF7290_mjf518.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620704/DSCF9656_xnakv2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620704/DSCF9656_xnakv2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620704/DSCF6265_umhevm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620704/DSCF6265_umhevm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/DSCF7711_gt9x7t.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/DSCF7711_gt9x7t.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620702/INDTAJ-_eoyvuq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620702/INDTAJ-_eoyvuq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620701/DSCF7290_r5tpbp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620701/DSCF7290_r5tpbp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620701/DSCF8897_rz7dbs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620701/DSCF8897_rz7dbs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620700/DSCF7426-Website-2_hy1q1y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620700/DSCF7426-Website-2_hy1q1y.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620700/Manhole_z4mhke.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620700/Manhole_z4mhke.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620699/DSCF5162_hh0nyi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620699/DSCF5162_hh0nyi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620699/DSCF4983_xcjouy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620699/DSCF4983_xcjouy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620699/DSCF8848-2_qfn9qi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620699/DSCF8848-2_qfn9qi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620698/DSCF7461_wsfq0j.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620698/DSCF7461_wsfq0j.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620697/DSCF5877_o1p1zv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620697/DSCF5877_o1p1zv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620696/DSCF6985_snvflz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620696/DSCF6985_snvflz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620696/DSCF8021-Website-2_q9zkbm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620696/DSCF8021-Website-2_q9zkbm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620695/DSCF8106_xsidwt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620695/DSCF8106_xsidwt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620695/DSCF6505-Website-2_wxpmyh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620695/DSCF6505-Website-2_wxpmyh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620695/HoliAir_uxvtpc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620695/HoliAir_uxvtpc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620694/DSCF9989_ic8r5q.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620694/DSCF9989_ic8r5q.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620694/DSCF7447-Website-2_ptymhn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620694/DSCF7447-Website-2_ptymhn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620694/DSCF9989_j8pkre.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620694/DSCF9989_j8pkre.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620692/DSCF9341_qclwd6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620692/DSCF9341_qclwd6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620692/DSCF6505-Website-2_grkqyr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620692/DSCF6505-Website-2_grkqyr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620692/DSCF6985_aotkec.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620692/DSCF6985_aotkec.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620690/DSCF9708_haugho.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620690/DSCF9708_haugho.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620689/DSCF7426-Website-2-1_okmkjn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620689/DSCF7426-Website-2-1_okmkjn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620689/DSCF3538_tpastt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620689/DSCF3538_tpastt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620688/DSCF5602_nrr4cy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620688/DSCF5602_nrr4cy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620688/DSCF6075_l5tonk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620688/DSCF6075_l5tonk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620688/DSCF4813-Website-2_tzc09b.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620688/DSCF4813-Website-2_tzc09b.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620688/DSCF9891_ch5za3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620688/DSCF9891_ch5za3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620687/Baba-Holi_ntmcyz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620687/Baba-Holi_ntmcyz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620687/DSCF6430_lj8wdl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620687/DSCF6430_lj8wdl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620686/DSCF7967_wnkfyi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620686/DSCF7967_wnkfyi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620686/DSCF7426-Website-2_mvzhop.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620686/DSCF7426-Website-2_mvzhop.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620685/DSCF6430_zdetmh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620685/DSCF6430_zdetmh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620685/DSCF5623_mmeuce.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620685/DSCF5623_mmeuce.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620684/Baba-Holi_cipi9l.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620684/Baba-Holi_cipi9l.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620683/DSCF0189_f3jukd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620683/DSCF0189_f3jukd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620683/DSCF8019_i7h96g.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620683/DSCF8019_i7h96g.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620683/DSCF4040-Edit_vltf0o.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620683/DSCF4040-Edit_vltf0o.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620682/DSCF9461_uq85wr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620682/DSCF9461_uq85wr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620682/DSCF6376_vvnrvy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620682/DSCF6376_vvnrvy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620682/INDTAJ-_onqp8l.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620682/INDTAJ-_onqp8l.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620682/DSCF8897_zecif8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620682/DSCF8897_zecif8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620681/DSCF8106_zyqu7u.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620681/DSCF8106_zyqu7u.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620681/DSCF7677_np7j7c.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620681/DSCF7677_np7j7c.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620681/DSCF3256_kjkqo7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620681/DSCF3256_kjkqo7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620678/Pastel_Playground_sluwyy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620678/Pastel_Playground_sluwyy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620676/_DSF6933_b9ihxi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620676/_DSF6933_b9ihxi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620676/_DSF6254_a4l3be.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620676/_DSF6254_a4l3be.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620676/_DSF5646-2_gjjfym.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620676/_DSF5646-2_gjjfym.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620675/_DSF6882_yggp35.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620675/_DSF6882_yggp35.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620674/_DSF6743-2_ftkxyl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620674/_DSF6743-2_ftkxyl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620674/thumbs_IND-MadameJodhpur-copy_ybgosn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620674/thumbs_IND-MadameJodhpur-copy_ybgosn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620674/thumbs_IND-MeniasTony_14_bm7cap.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620674/thumbs_IND-MeniasTony_14_bm7cap.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620673/thumbs_DSCF9897-2_nc0lpz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620673/thumbs_DSCF9897-2_nc0lpz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620673/thumbs_Greece-DSCF3935-copy-3_ty6cmh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620673/thumbs_Greece-DSCF3935-copy-3_ty6cmh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620673/thumbs_CHI-Beloveful6_lr9ywz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620673/thumbs_CHI-Beloveful6_lr9ywz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620673/thumbs_JOR-4461_rx7y7m.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620673/thumbs_JOR-4461_rx7y7m.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620672/thumbs_NEP-Silent-Stare-copy_o79jvj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620672/thumbs_NEP-Silent-Stare-copy_o79jvj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620672/thumbs_MOR-IMG_5277_r14kak.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620672/thumbs_MOR-IMG_5277_r14kak.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620671/thumbs_PHI-1662-copy_h8z0zj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620671/thumbs_PHI-1662-copy_h8z0zj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620671/thumbs_Israel-MeniasTony_20_adykpm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620671/thumbs_Israel-MeniasTony_20_adykpm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620671/thumbs_IND-MeniasTony_16_n3z0eh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620671/thumbs_IND-MeniasTony_16_n3z0eh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620671/thumbs_NatureVSNurture-copy_fcjhbp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620671/thumbs_NatureVSNurture-copy_fcjhbp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620671/thumbs_Tony-Menias-Two-Girls-in-Window_iziuse.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620671/thumbs_Tony-Menias-Two-Girls-in-Window_iziuse.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620670/thumbs_NEP-DSCF8737-copy_xidol7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620670/thumbs_NEP-DSCF8737-copy_xidol7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620670/thumbs_THAI-DSCF3890-copy_r8pyqg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620670/thumbs_THAI-DSCF3890-copy_r8pyqg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620670/thumbs_THAI-3571_ygfayq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620670/thumbs_THAI-3571_ygfayq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620670/thumbs_CHI-DSCF9471_hmdaut.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620670/thumbs_CHI-DSCF9471_hmdaut.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620668/thumbs_MYA-DSCF0783-copy_dlpd0n.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620668/thumbs_MYA-DSCF0783-copy_dlpd0n.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620668/thumbs_EGY-1135_fzkpqr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620668/thumbs_EGY-1135_fzkpqr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620668/thumbs_JAP-3265_pvhn5p.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620668/thumbs_JAP-3265_pvhn5p.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620668/thumbs_MOR-IMG_5248-copy_dd5qm7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620668/thumbs_MOR-IMG_5248-copy_dd5qm7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620667/thumbs_DSCF4537-Website-2_ekeqzd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620667/thumbs_DSCF4537-Website-2_ekeqzd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620668/thumbs_PAL-DSCF3675-copy_ncymwz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620668/thumbs_PAL-DSCF3675-copy_ncymwz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620667/thumbs_DSCF7931_iunitl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620667/thumbs_DSCF7931_iunitl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620667/thumbs_DSCF0743_kivclh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620667/thumbs_DSCF0743_kivclh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620666/thumbs_HK-DSF5841-Website-2_oy1dtf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620666/thumbs_HK-DSF5841-Website-2_oy1dtf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620665/thumbs_FRA-DSCF0103-copy_fv25dc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620665/thumbs_FRA-DSCF0103-copy_fv25dc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620665/thumbs_NyC-DSCF8922-copy-2_sixink.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620665/thumbs_NyC-DSCF8922-copy-2_sixink.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620665/thumbs_EGY-481_j0wvrr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620665/thumbs_EGY-481_j0wvrr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620665/thumbs_PHI-2331_m4jo9m.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620665/thumbs_PHI-2331_m4jo9m.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620664/thumbs_PAL-MeniasTony_13_vev11d.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620664/thumbs_PAL-MeniasTony_13_vev11d.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620664/thumbs_Lazy-Sunday_o9i6u2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620664/thumbs_Lazy-Sunday_o9i6u2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/DSCF9897-2.jpg-nggid03328-ngg0dyn-180x0-00f0w010c010r110f110r010t010_kyujh2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/DSCF9897-2.jpg-nggid03328-ngg0dyn-180x0-00f0w010c010r110f110r010t010_kyujh2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620661/Tony-Menias-Two-Girls-in-Window.jpg-nggid03319-ngg0dyn-120x90-00f0w010c011r110f110r010t010_krvlxp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620661/Tony-Menias-Two-Girls-in-Window.jpg-nggid03319-ngg0dyn-120x90-00f0w010c011r110f110r010t010_krvlxp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620659/NyC-DSCF8922-copy-2.jpg-nggid03300-ngg0dyn-180x0-00f0w010c010r110f110r010t010_qhepoe.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620659/NyC-DSCF8922-copy-2.jpg-nggid03300-ngg0dyn-180x0-00f0w010c010r110f110r010t010_qhepoe.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620632/Greece-DSCF3935-copy-3.jpg-nggid03316-ngg0dyn-120x90-00f0w010c011r110f110r010t010_q9ucvg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620632/Greece-DSCF3935-copy-3.jpg-nggid03316-ngg0dyn-120x90-00f0w010c011r110f110r010t010_q9ucvg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620630/Israel-MeniasTony_20.jpg-nggid03310-ngg0dyn-120x90-00f0w010c011r110f110r010t010_nrn5nr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620630/Israel-MeniasTony_20.jpg-nggid03310-ngg0dyn-120x90-00f0w010c011r110f110r010t010_nrn5nr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620629/Lazy-Sunday.jpg-nggid03318-ngg0dyn-120x90-00f0w010c011r110f110r010t010_e33d6h.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620629/Lazy-Sunday.jpg-nggid03318-ngg0dyn-120x90-00f0w010c011r110f110r010t010_e33d6h.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620628/Israel-MeniasTony_20.jpg-nggid03310-ngg0dyn-180x0-00f0w010c010r110f110r010t010_rm2pcs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620628/Israel-MeniasTony_20.jpg-nggid03310-ngg0dyn-180x0-00f0w010c010r110f110r010t010_rm2pcs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620627/DSCF4537-Website-2.jpg-nggid03326-ngg0dyn-180x0-00f0w010c010r110f110r010t010_sp1ztq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620627/DSCF4537-Website-2.jpg-nggid03326-ngg0dyn-180x0-00f0w010c010r110f110r010t010_sp1ztq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620625/Lazy-Sunday.jpg-nggid03318-ngg0dyn-180x0-00f0w010c010r110f110r010t010_s9u2wp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620625/Lazy-Sunday.jpg-nggid03318-ngg0dyn-180x0-00f0w010c010r110f110r010t010_s9u2wp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620624/NatureVSNurture-copy.jpg-nggid03305-ngg0dyn-120x90-00f0w010c011r110f110r010t010_lpkncg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620624/NatureVSNurture-copy.jpg-nggid03305-ngg0dyn-120x90-00f0w010c011r110f110r010t010_lpkncg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620624/DSCF0743.jpg-nggid03325-ngg0dyn-180x0-00f0w010c010r110f110r010t010_w3ghao.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620624/DSCF0743.jpg-nggid03325-ngg0dyn-180x0-00f0w010c010r110f110r010t010_w3ghao.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620623/Tony-Menias-Two-Girls-in-Window.jpg-nggid03319-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nkujid.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620623/Tony-Menias-Two-Girls-in-Window.jpg-nggid03319-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nkujid.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620623/Greece-DSCF3935-copy-3.jpg-nggid03316-ngg0dyn-180x0-00f0w010c010r110f110r010t010_eguctm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620623/Greece-DSCF3935-copy-3.jpg-nggid03316-ngg0dyn-180x0-00f0w010c010r110f110r010t010_eguctm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620622/NyC-DSCF8922-copy-2.jpg-nggid03300-ngg0dyn-120x90-00f0w010c011r110f110r010t010_mzne3t.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620622/NyC-DSCF8922-copy-2.jpg-nggid03300-ngg0dyn-120x90-00f0w010c011r110f110r010t010_mzne3t.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620622/NatureVSNurture-copy.jpg-nggid03305-ngg0dyn-180x0-00f0w010c010r110f110r010t010_v6osvt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620622/NatureVSNurture-copy.jpg-nggid03305-ngg0dyn-180x0-00f0w010c010r110f110r010t010_v6osvt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/DSCF7931.jpg-nggid03327-ngg0dyn-180x0-00f0w010c010r110f110r010t010_k5u3kj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/DSCF7931.jpg-nggid03327-ngg0dyn-180x0-00f0w010c010r110f110r010t010_k5u3kj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620618/DSCF9897-2_wcvn5h.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620618/DSCF9897-2_wcvn5h.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620618/DSCF7931_c7ikeo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620618/DSCF7931_c7ikeo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620617/DSCF0743_bhnrdh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620617/DSCF0743_bhnrdh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620614/NyC-DSCF8922-copy-2_qcftak.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620614/NyC-DSCF8922-copy-2_qcftak.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620614/DSCF4537-Website-2_p6f8oj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620614/DSCF4537-Website-2_p6f8oj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620614/NyC-DSCF8922-copy-2_pss8dk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620614/NyC-DSCF8922-copy-2_pss8dk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620613/DSCF0743_aoa4cf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620613/DSCF0743_aoa4cf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620612/Tony-Menias-Two-Girls-in-Window_lz3rpf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620612/Tony-Menias-Two-Girls-in-Window_lz3rpf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/DSCF9897-2_adnx1s.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/DSCF9897-2_adnx1s.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620607/Lazy-Sunday_afwalh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620607/Lazy-Sunday_afwalh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620607/Lazy-Sunday_yof75c.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620607/Lazy-Sunday_yof75c.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620606/Israel-MeniasTony_20_szicvr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620606/Israel-MeniasTony_20_szicvr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620606/Israel-MeniasTony_20_anmkg5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620606/Israel-MeniasTony_20_anmkg5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620605/DSCF4537-Website-2_vhwng0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620605/DSCF4537-Website-2_vhwng0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620602/DSCF7931_njehon.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620602/DSCF7931_njehon.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620601/NatureVSNurture-copy_wmk97f.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620601/NatureVSNurture-copy_wmk97f.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620601/NatureVSNurture-copy_fimpbr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620601/NatureVSNurture-copy_fimpbr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620600/Greece-DSCF3935-copy-3_ifktih.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620600/Greece-DSCF3935-copy-3_ifktih.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620600/Tony-Menias-Two-Girls-in-Window_wrrrss.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620600/Tony-Menias-Two-Girls-in-Window_wrrrss.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620599/Greece-DSCF3935-copy-3_aq6wvw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620599/Greece-DSCF3935-copy-3_aq6wvw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JDN-4455_vyvg5h.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620572/JDN-4455_vyvg5h.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620571/DSCF4561_nbt5k0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620571/DSCF4561_nbt5k0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620571/DSCF4385_twwel2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620571/DSCF4385_twwel2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620570/DSCF4430_ouqcyc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620570/DSCF4430_ouqcyc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620570/DSCF4640_pg5kuy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620570/DSCF4640_pg5kuy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620570/DSCF4537-Website-2_f4xqpq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620570/DSCF4537-Website-2_f4xqpq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620569/JDN-4461_jwxate.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620569/JDN-4461_jwxate.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620569/DSCF4619_eqtre5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620569/DSCF4619_eqtre5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620568/DSCF4610-4_uzspmh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620568/DSCF4610-4_uzspmh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620568/DSCF4488_jslcga.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620568/DSCF4488_jslcga.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620568/DSCF4694_enq9wb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620568/DSCF4694_enq9wb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620557/DSCF2969_kmeyus.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620557/DSCF2969_kmeyus.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620556/untitled-4506-5_wup2nq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620556/untitled-4506-5_wup2nq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620555/DSCF2675_m8fhcr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620555/DSCF2675_m8fhcr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620554/TonyMenias-Hesalwayslistening_jtyzdk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620554/TonyMenias-Hesalwayslistening_jtyzdk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620555/DSCF3088_ntjkol.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620555/DSCF3088_ntjkol.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620554/DSCF3675_nx65bl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620554/DSCF3675_nx65bl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620554/DSCF3559_f9chja.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620554/DSCF3559_f9chja.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620553/DSCF2938_ttvpac.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620553/DSCF2938_ttvpac.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620553/DSCF2992_vrwtbv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620553/DSCF2992_vrwtbv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/_DSF1141_wmsomq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/_DSF1141_wmsomq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/untitled-8_yeyl85.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/untitled-8_yeyl85.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/favicon_staqlf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/favicon_staqlf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620507/tony-hero-new_mtx9wk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620507/tony-hero-new_mtx9wk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620507/about-hero_xupbiy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620507/about-hero_xupbiy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620507/beloveful-logo-white_q5prnb.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620507/beloveful-logo-white_q5prnb.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620506/beloveful-logo-black_rwsx2j.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620506/beloveful-logo-black_rwsx2j.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620506/workshop-hero_sj9x3j.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620506/workshop-hero_sj9x3j.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620506/chicago-basketball-court_uf5asu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620506/chicago-basketball-court_uf5asu.jpg"
      }
    ]
  },
  {
    "region": "Africa",
    "country": "Morocco",
    "slug": "morocco",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466092/MOR-IMG_5248_copy_o6q3jf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466092/MOR-IMG_5248_copy_o6q3jf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466075/MOR-IMG_5277_b83thl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466075/MOR-IMG_5277_b83thl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621056/MOR-IMG_5277_cbsxmw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621056/MOR-IMG_5277_cbsxmw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621056/MOR-5380-05-07-16_jqwcrp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621056/MOR-5380-05-07-16_jqwcrp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621055/MOR-05-16-IMG_5205_nscxid.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621055/MOR-05-16-IMG_5205_nscxid.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620663/MOR-IMG_5248-copy.jpg-nggid03308-ngg0dyn-120x90-00f0w010c011r110f110r010t010_rifsie.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620663/MOR-IMG_5248-copy.jpg-nggid03308-ngg0dyn-120x90-00f0w010c011r110f110r010t010_rifsie.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620661/MOR-IMG_5248-copy.jpg-nggid03308-ngg0dyn-180x0-00f0w010c010r110f110r010t010_pmwzk0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620661/MOR-IMG_5248-copy.jpg-nggid03308-ngg0dyn-180x0-00f0w010c010r110f110r010t010_pmwzk0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620653/MOR-IMG_5277.jpg-nggid03304-ngg0dyn-120x90-00f0w010c011r110f110r010t010_latntg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620653/MOR-IMG_5277.jpg-nggid03304-ngg0dyn-120x90-00f0w010c011r110f110r010t010_latntg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/MOR-IMG_5277.jpg-nggid03304-ngg0dyn-180x0-00f0w010c010r110f110r010t010_t42qne.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/MOR-IMG_5277.jpg-nggid03304-ngg0dyn-180x0-00f0w010c010r110f110r010t010_t42qne.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620608/MOR-IMG_5277_hotiub.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620608/MOR-IMG_5277_hotiub.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620607/MOR-IMG_5277_ikytre.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620607/MOR-IMG_5277_ikytre.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620604/MOR-IMG_5248-copy_m96byn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620604/MOR-IMG_5248-copy_m96byn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620599/MOR-IMG_5248-copy_btfy8y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620599/MOR-IMG_5248-copy_btfy8y.jpg"
      }
    ]
  },
  {
    "region": "North America",
    "country": "Chicago",
    "slug": "chicago",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466090/CHI-DSCF9471_mrvrxd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466090/CHI-DSCF9471_mrvrxd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466082/CHI-MeniasTony_12_ywrfrc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466082/CHI-MeniasTony_12_ywrfrc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466071/CHI-Beloveful6_sxid0x.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466071/CHI-Beloveful6_sxid0x.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400287/CHI-0871_irnemb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400287/CHI-0871_irnemb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400286/CHI-1262_nsnxzb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400286/CHI-1262_nsnxzb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400284/CHI-5041_gagtl2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400284/CHI-5041_gagtl2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400280/CHI-8292_vy56ok.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400280/CHI-8292_vy56ok.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400278/CHI-8382_xpvkzp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400278/CHI-8382_xpvkzp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400277/CHI-8413_pcmyd4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400277/CHI-8413_pcmyd4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400275/CHI-8649_ogte7q.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400275/CHI-8649_ogte7q.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400272/CHI-823-Website-2_dzecx9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400272/CHI-823-Website-2_dzecx9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400271/CHI-372_ecbzxy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400271/CHI-372_ecbzxy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400269/CHI-65_fgjwby.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400269/CHI-65_fgjwby.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400267/CHI-770_h8vtwg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400267/CHI-770_h8vtwg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400267/CHI-8032_fnivln.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400267/CHI-8032_fnivln.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400264/CHI-9872-Website-2_n0brdh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400264/CHI-9872-Website-2_n0brdh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400262/CHI-4780_r7bvbn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400262/CHI-4780_r7bvbn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400260/CHI-7709_k9welh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400260/CHI-7709_k9welh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400258/CHI-8884_ilxzgz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400258/CHI-8884_ilxzgz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400257/CHI-440-Website-2_yhjghz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400257/CHI-440-Website-2_yhjghz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400255/CHI-2081_jvescl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400255/CHI-2081_jvescl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400253/CHI-2084-Website-2_wr8h5y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400253/CHI-2084-Website-2_wr8h5y.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400252/CHI-2111_lim7l4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400252/CHI-2111_lim7l4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400250/CHI-2145_yrvakj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400250/CHI-2145_yrvakj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400248/CHI-2167_yafprb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400248/CHI-2167_yafprb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400246/CHI-4_pdtha2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400246/CHI-4_pdtha2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400245/CHI-9371_dvpzg1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400245/CHI-9371_dvpzg1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400243/CHI-7876_copy_qkxrcq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400243/CHI-7876_copy_qkxrcq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400241/CHI-9381_rzvtgh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400241/CHI-9381_rzvtgh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400240/CHI-147_ilmaje.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400240/CHI-147_ilmaje.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400237/CHI-3_rfygr5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400237/CHI-3_rfygr5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400236/CHI-20_tknr7q.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400236/CHI-20_tknr7q.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400235/CHI-304_lntriz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400235/CHI-304_lntriz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400232/CHI-253_icy2sv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400232/CHI-253_icy2sv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400229/CHI-Cafe-_tyqd7y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400229/CHI-Cafe-_tyqd7y.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400228/CHI-415_copy_yjolmp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400228/CHI-415_copy_yjolmp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400227/CHI-367_hdz3ti.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400227/CHI-367_hdz3ti.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400225/CHI-489_ttezok.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400225/CHI-489_ttezok.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400223/CHI-3_copy_iighyl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400223/CHI-3_copy_iighyl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400221/CHI-376_sdjrhp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400221/CHI-376_sdjrhp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400220/CHI-9540_xad0wj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400220/CHI-9540_xad0wj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400219/CHI-8789_lntzpl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400219/CHI-8789_lntzpl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400214/CHI-359_vzopw0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400214/CHI-359_vzopw0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400212/CHI-1931_rn6te7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400212/CHI-1931_rn6te7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400210/CHI-9867_vkoxgk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400210/CHI-9867_vkoxgk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400209/CHI-9127_iyk8v0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400209/CHI-9127_iyk8v0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400208/CHI-HotNCold-_icwrgo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400208/CHI-HotNCold-_icwrgo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400205/CHI-5652_gww0pl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400205/CHI-5652_gww0pl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400203/CHI-5927_sbp0gf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400203/CHI-5927_sbp0gf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400201/CHI-1342_lmjfl3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400201/CHI-1342_lmjfl3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400200/CHI-8849_ou9flh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400200/CHI-8849_ou9flh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400199/CHI-9692_hdr8cv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400199/CHI-9692_hdr8cv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400195/CHI-12-17-DSCF0612_cncmyo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400195/CHI-12-17-DSCF0612_cncmyo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400194/CHI-01-21-DSCF9573_mv56b0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400194/CHI-01-21-DSCF9573_mv56b0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400192/CHI-01-21-DSCF9381_ckmkzy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400192/CHI-01-21-DSCF9381_ckmkzy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400191/CHI-01-21-DSCF9440_zzoxm3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400191/CHI-01-21-DSCF9440_zzoxm3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400190/CHI-07-19-DSCF9956_ht1m89.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400190/CHI-07-19-DSCF9956_ht1m89.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400188/CHI-08-19-DSCF5471_nut7mw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400188/CHI-08-19-DSCF5471_nut7mw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400187/CHI-09-19-DSCF5133_vegfdb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400187/CHI-09-19-DSCF5133_vegfdb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400185/CHI-08-16-_DSF2471_thl7cz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400185/CHI-08-16-_DSF2471_thl7cz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400184/CHI-Eclipse-04-24-DSCF6525_sf4rsa.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400184/CHI-Eclipse-04-24-DSCF6525_sf4rsa.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400182/CHI-06-18-DSCF1870-Edit-2_ikpvhu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400182/CHI-06-18-DSCF1870-Edit-2_ikpvhu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400182/CHI-06-18-DSCF1342-Enhanced-NR_cfuwww.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400182/CHI-06-18-DSCF1342-Enhanced-NR_cfuwww.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400179/CHI-09-19-DSCF1288_vfju4l.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400179/CHI-09-19-DSCF1288_vfju4l.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400178/CHI-09-19-DSCF1295_bvowoq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400178/CHI-09-19-DSCF1295_bvowoq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400176/CHI-01-19-DSCF7976_joyqzs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400176/CHI-01-19-DSCF7976_joyqzs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400175/CHI-09-19-DSCF1377_zitot9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400175/CHI-09-19-DSCF1377_zitot9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400014/CHI-2084-Website-2_aa9b0b.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759400014/CHI-2084-Website-2_aa9b0b.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620661/CHI-Beloveful6.jpg-nggid03317-ngg0dyn-180x0-00f0w010c010r110f110r010t010_bvetbt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620661/CHI-Beloveful6.jpg-nggid03317-ngg0dyn-180x0-00f0w010c010r110f110r010t010_bvetbt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620660/CHI-Beloveful6.jpg-nggid03317-ngg0dyn-120x90-00f0w010c011r110f110r010t010_a6z3yb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620660/CHI-Beloveful6.jpg-nggid03317-ngg0dyn-120x90-00f0w010c011r110f110r010t010_a6z3yb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620621/CHI-DSCF9471.jpg-nggid03315-ngg0dyn-180x0-00f0w010c010r110f110r010t010_seh9do.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620621/CHI-DSCF9471.jpg-nggid03315-ngg0dyn-180x0-00f0w010c010r110f110r010t010_seh9do.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620621/CHI-DSCF9471.jpg-nggid03315-ngg0dyn-120x90-00f0w010c011r110f110r010t010_gkt5na.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620621/CHI-DSCF9471.jpg-nggid03315-ngg0dyn-120x90-00f0w010c011r110f110r010t010_gkt5na.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620617/CHI-DSCF9471_vukjxy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620617/CHI-DSCF9471_vukjxy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620610/CHI-Beloveful6_fznavp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620610/CHI-Beloveful6_fznavp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620604/CHI-Beloveful6_wjllrg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620604/CHI-Beloveful6_wjllrg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620602/CHI-DSCF9471_fuc2pl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620602/CHI-DSCF9471_fuc2pl.jpg"
      }
    ]
  },
  {
    "region": "Asia",
    "country": "India",
    "slug": "india",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466089/IND-MeniasTony_8_kfjhfw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466089/IND-MeniasTony_8_kfjhfw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466086/IND-MeniasTony_16_lp3vsf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466086/IND-MeniasTony_16_lp3vsf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466072/IND-MeniasTony_14_uqvgsq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466072/IND-MeniasTony_14_uqvgsq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620814/IND-4681.jpg-nggid03296-ngg0dyn-0x360-00f0w010c010r110f110r010t010_pnhgzy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620814/IND-4681.jpg-nggid03296-ngg0dyn-0x360-00f0w010c010r110f110r010t010_pnhgzy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620808/IND-4681_tvjvc1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620808/IND-4681_tvjvc1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620807/IND-4681_rh0wgo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620807/IND-4681_rh0wgo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620744/IND-7083.jpg-nggid03273-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xhiogf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620744/IND-7083.jpg-nggid03273-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xhiogf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620741/IND-6285.jpg-nggid03278-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mp3zhl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620741/IND-6285.jpg-nggid03278-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mp3zhl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620739/IND-7067.jpg-nggid03274-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ixgzge.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620739/IND-7067.jpg-nggid03274-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ixgzge.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620738/IND-4740.jpg-nggid03269-ngg0dyn-180x0-00f0w010c010r110f110r010t010_wqreuz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620738/IND-4740.jpg-nggid03269-ngg0dyn-180x0-00f0w010c010r110f110r010t010_wqreuz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620734/IND-6198.jpg-nggid03279-ngg0dyn-180x0-00f0w010c010r110f110r010t010_gopme1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620734/IND-6198.jpg-nggid03279-ngg0dyn-180x0-00f0w010c010r110f110r010t010_gopme1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620730/IND-6783.jpg-nggid03277-ngg0dyn-180x0-00f0w010c010r110f110r010t010_drbow4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620730/IND-6783.jpg-nggid03277-ngg0dyn-180x0-00f0w010c010r110f110r010t010_drbow4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620729/IND-0027.jpg-nggid03263-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nqexkq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620729/IND-0027.jpg-nggid03263-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nqexkq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620728/IND-4213.jpg-nggid03266-ngg0dyn-0x360-00f0w010c010r110f110r010t010_mt21zi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620728/IND-4213.jpg-nggid03266-ngg0dyn-0x360-00f0w010c010r110f110r010t010_mt21zi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620727/IND-7059.jpg-nggid03275-ngg0dyn-180x0-00f0w010c010r110f110r010t010_b7eobg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620727/IND-7059.jpg-nggid03275-ngg0dyn-180x0-00f0w010c010r110f110r010t010_b7eobg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620726/IND-5563.jpg-nggid03271-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mrozny.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620726/IND-5563.jpg-nggid03271-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mrozny.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620723/IND-5525.jpg-nggid03270-ngg0dyn-180x0-00f0w010c010r110f110r010t010_jl9s68.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620723/IND-5525.jpg-nggid03270-ngg0dyn-180x0-00f0w010c010r110f110r010t010_jl9s68.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620723/IND-7032-Website-2.jpg-nggid03276-ngg0dyn-0x360-00f0w010c010r110f110r010t010_uirb74.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620723/IND-7032-Website-2.jpg-nggid03276-ngg0dyn-0x360-00f0w010c010r110f110r010t010_uirb74.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620720/IND-6034.jpg-nggid03280-ngg0dyn-180x0-00f0w010c010r110f110r010t010_kilx9s.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620720/IND-6034.jpg-nggid03280-ngg0dyn-180x0-00f0w010c010r110f110r010t010_kilx9s.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-6285.jpg-nggid03278-ngg0dyn-0x360-00f0w010c010r110f110r010t010_dyod0b.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-6285.jpg-nggid03278-ngg0dyn-0x360-00f0w010c010r110f110r010t010_dyod0b.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-0202.jpg-nggid03264-ngg0dyn-0x360-00f0w010c010r110f110r010t010_s8jmth.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-0202.jpg-nggid03264-ngg0dyn-0x360-00f0w010c010r110f110r010t010_s8jmth.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-4233.jpg-nggid03267-ngg0dyn-180x0-00f0w010c010r110f110r010t010_opadzm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-4233.jpg-nggid03267-ngg0dyn-180x0-00f0w010c010r110f110r010t010_opadzm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-3013.jpg-nggid03265-ngg0dyn-180x0-00f0w010c010r110f110r010t010_yogbgm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620718/IND-3013.jpg-nggid03265-ngg0dyn-180x0-00f0w010c010r110f110r010t010_yogbgm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620717/IND-7067.jpg-nggid03274-ngg0dyn-0x360-00f0w010c010r110f110r010t010_qs456f.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620717/IND-7067.jpg-nggid03274-ngg0dyn-0x360-00f0w010c010r110f110r010t010_qs456f.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620716/IND-7032-Website-2.jpg-nggid03276-ngg0dyn-180x0-00f0w010c010r110f110r010t010_wpbyvd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620716/IND-7032-Website-2.jpg-nggid03276-ngg0dyn-180x0-00f0w010c010r110f110r010t010_wpbyvd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620714/IND-4681.jpg-nggid03268-ngg0dyn-0x360-00f0w010c010r110f110r010t010_m8hyue.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620714/IND-4681.jpg-nggid03268-ngg0dyn-0x360-00f0w010c010r110f110r010t010_m8hyue.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/IND-4740_c5rfdh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620711/IND-4740_c5rfdh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620707/IND-7597_zxvqa5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620707/IND-7597_zxvqa5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620705/IND-9375_uesbjr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620705/IND-9375_uesbjr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-7032-Website-2_w2frde.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-7032-Website-2_w2frde.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-5525_hd10xe.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-5525_hd10xe.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-4213_iirx43.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-4213_iirx43.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-6783_ptuqta.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620703/IND-6783_ptuqta.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620701/IND-4233_ffnxfc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620701/IND-4233_ffnxfc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620700/IND-7059_sexjw1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620700/IND-7059_sexjw1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620700/IND-3013_ifykat.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620700/IND-3013_ifykat.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620699/IND-7597_fzp92k.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620699/IND-7597_fzp92k.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620698/IND-7032-Website-3_ry3zq8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620698/IND-7032-Website-3_ry3zq8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620697/IND-4740_ygewwy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620697/IND-4740_ygewwy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620697/IND-9375_lzyvap.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620697/IND-9375_lzyvap.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620696/IND-6034_qjoykd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620696/IND-6034_qjoykd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620694/IND-7059_ouwbjp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620694/IND-7059_ouwbjp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620693/IND-7067_oge5zw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620693/IND-7067_oge5zw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620693/IND-6285_qvtsq6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620693/IND-6285_qvtsq6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620692/IND-6285_shwuxq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620692/IND-6285_shwuxq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620691/IND-6783_uou9za.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620691/IND-6783_uou9za.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620691/IND-4681_ff4s7x.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620691/IND-4681_ff4s7x.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620691/IND-6198_jogvpt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620691/IND-6198_jogvpt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620690/IND-7351_i9elxy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620690/IND-7351_i9elxy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620690/IND-4681_rugh2g.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620690/IND-4681_rugh2g.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620689/IND-0202_gj5d4a.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620689/IND-0202_gj5d4a.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620687/IND-0027_l6zus5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620687/IND-0027_l6zus5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620686/IND-7083_tzp0gh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620686/IND-7083_tzp0gh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620685/IND-7032-Website-3_ywt48u.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620685/IND-7032-Website-3_ywt48u.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620684/IND-6034_tzbe5g.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620684/IND-6034_tzbe5g.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620664/IND-MadameJodhpur-copy.jpg-nggid03313-ngg0dyn-180x0-00f0w010c010r110f110r010t010_qpwoc9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620664/IND-MadameJodhpur-copy.jpg-nggid03313-ngg0dyn-180x0-00f0w010c010r110f110r010t010_qpwoc9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/IND-MeniasTony_16.jpg-nggid03311-ngg0dyn-120x90-00f0w010c011r110f110r010t010_etqpnw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/IND-MeniasTony_16.jpg-nggid03311-ngg0dyn-120x90-00f0w010c011r110f110r010t010_etqpnw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620629/IND-MeniasTony_14.jpg-nggid03312-ngg0dyn-120x90-00f0w010c011r110f110r010t010_ce3tlo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620629/IND-MeniasTony_14.jpg-nggid03312-ngg0dyn-120x90-00f0w010c011r110f110r010t010_ce3tlo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620625/IND-MeniasTony_16.jpg-nggid03311-ngg0dyn-180x0-00f0w010c010r110f110r010t010_o0avxw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620625/IND-MeniasTony_16.jpg-nggid03311-ngg0dyn-180x0-00f0w010c010r110f110r010t010_o0avxw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620624/IND-MeniasTony_14.jpg-nggid03312-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mtsm6f.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620624/IND-MeniasTony_14.jpg-nggid03312-ngg0dyn-180x0-00f0w010c010r110f110r010t010_mtsm6f.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620622/IND-MadameJodhpur-copy.jpg-nggid03313-ngg0dyn-120x90-00f0w010c011r110f110r010t010_qoo7rm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620622/IND-MadameJodhpur-copy.jpg-nggid03313-ngg0dyn-120x90-00f0w010c011r110f110r010t010_qoo7rm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620618/IND-MeniasTony_14_wpf8iz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620618/IND-MeniasTony_14_wpf8iz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620616/IND-MeniasTony_16_qgxdfw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620616/IND-MeniasTony_16_qgxdfw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620616/IND-MeniasTony_16_bggyhp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620616/IND-MeniasTony_16_bggyhp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/IND-MeniasTony_14_ti6mbj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/IND-MeniasTony_14_ti6mbj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/IND-MadameJodhpur-copy_bmaq15.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/IND-MadameJodhpur-copy_bmaq15.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620606/IND-MadameJodhpur-copy_drvdld.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620606/IND-MadameJodhpur-copy_drvdld.jpg"
      }
    ]
  },
  {
    "region": "Asia",
    "country": "Nepal",
    "slug": "nepal",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466088/NEP-Silent_Stare_copy_a8leit.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466088/NEP-Silent_Stare_copy_a8leit.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466087/NEP-DSCF8737_copy_thwoaw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466087/NEP-DSCF8737_copy_thwoaw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8794_gv7u6z.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8794_gv7u6z.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8553_fxnxqo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620832/NEP-8553_fxnxqo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NEP-8558_qza5ne.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NEP-8558_qza5ne.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NEP-8516_y3e2nt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620831/NEP-8516_y3e2nt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/NEP-DSCF8737_xpxqsv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/NEP-DSCF8737_xpxqsv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620830/NEP-8701_spc74d.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620830/NEP-8701_spc74d.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/NEP-DSCF8289_ztdqsq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/NEP-DSCF8289_ztdqsq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620828/NEP-Silent_Stare_zde6db.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620828/NEP-Silent_Stare_zde6db.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620663/NEP-Silent-Stare-copy.jpg-nggid03301-ngg0dyn-180x0-00f0w010c010r110f110r010t010_jof63m.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620663/NEP-Silent-Stare-copy.jpg-nggid03301-ngg0dyn-180x0-00f0w010c010r110f110r010t010_jof63m.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620663/NEP-DSCF8737-copy.jpg-nggid03303-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ohtp7j.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620663/NEP-DSCF8737-copy.jpg-nggid03303-ngg0dyn-180x0-00f0w010c010r110f110r010t010_ohtp7j.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620628/NEP-DSCF8737-copy.jpg-nggid03303-ngg0dyn-120x90-00f0w010c011r110f110r010t010_rcxdv3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620628/NEP-DSCF8737-copy.jpg-nggid03303-ngg0dyn-120x90-00f0w010c011r110f110r010t010_rcxdv3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/NEP-Silent-Stare-copy.jpg-nggid03301-ngg0dyn-120x90-00f0w010c011r110f110r010t010_bhunfp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/NEP-Silent-Stare-copy.jpg-nggid03301-ngg0dyn-120x90-00f0w010c011r110f110r010t010_bhunfp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620617/NEP-Silent-Stare-copy_cybppv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620617/NEP-Silent-Stare-copy_cybppv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620614/NEP-DSCF8737-copy_j1hbcy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620614/NEP-DSCF8737-copy_j1hbcy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620609/NEP-DSCF8737-copy_xit7df.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620609/NEP-DSCF8737-copy_xit7df.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620601/NEP-Silent-Stare-copy_z7kkuy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620601/NEP-Silent-Stare-copy_z7kkuy.jpg"
      }
    ]
  },
  {
    "region": "Asia",
    "country": "Myanmar",
    "slug": "myanmar",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466083/MYA-DSCF0783_copy_poimdy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466083/MYA-DSCF0783_copy_poimdy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466079/MYA-DSCF9634_copy_ftq8wd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466079/MYA-DSCF9634_copy_ftq8wd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/MYA-9925-04-25-17_edkog3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620829/MYA-9925-04-25-17_edkog3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620828/MYA-DSCF0329_lrdjuo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620828/MYA-DSCF0329_lrdjuo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-Morning_Catch_gddpsa.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-Morning_Catch_gddpsa.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-04-17-DSCF0068_svqwrr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-04-17-DSCF0068_svqwrr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-1292_dclmsa.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-1292_dclmsa.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-0839_gligvf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620827/MYA-0839_gligvf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620826/MYA-0287-04-28-17_ksekuq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620826/MYA-0287-04-28-17_ksekuq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620825/MYA-0829_asdd3w.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620825/MYA-0829_asdd3w.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620824/MYA-Breathe-0668_kimelh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620824/MYA-Breathe-0668_kimelh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620823/MYA-9588_wgu2bq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620823/MYA-9588_wgu2bq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620823/MYA-DSCF0783_svezte.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620823/MYA-DSCF0783_svezte.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620822/MYA-0098-04-26-17_cimava.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620822/MYA-0098-04-26-17_cimava.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620627/MYA-DSCF0783-copy.jpg-nggid03306-ngg0dyn-180x0-00f0w010c010r110f110r010t010_lsdgkt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620627/MYA-DSCF0783-copy.jpg-nggid03306-ngg0dyn-180x0-00f0w010c010r110f110r010t010_lsdgkt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620620/MYA-DSCF0783-copy.jpg-nggid03306-ngg0dyn-120x90-00f0w010c011r110f110r010t010_h0z5ko.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620620/MYA-DSCF0783-copy.jpg-nggid03306-ngg0dyn-120x90-00f0w010c011r110f110r010t010_h0z5ko.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620609/MYA-DSCF0783-copy_dxu51c.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620609/MYA-DSCF0783-copy_dxu51c.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620601/MYA-DSCF0783-copy_dpjrbi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620601/MYA-DSCF0783-copy_dpjrbi.jpg"
      }
    ]
  },
  {
    "region": "Asia",
    "country": "Thailand",
    "slug": "thailand",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466082/THAI-DSCF3890_copy_gkaz9v.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466082/THAI-DSCF3890_copy_gkaz9v.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-12-19-DSCF2334_jk2cwl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-12-19-DSCF2334_jk2cwl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-12-19-DSCF3863_sc10lu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-12-19-DSCF3863_sc10lu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-03-17-_DSF4784_tgnnda.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620843/THAI-03-17-_DSF4784_tgnnda.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THA-2687_nhldx0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THA-2687_nhldx0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THA-3538_bammx3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THA-3538_bammx3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THAI-3405_ue9gcu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THAI-3405_ue9gcu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THAI-4383_k7d6cl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620841/THAI-4383_k7d6cl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620840/THAI-2_u2k6p1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620840/THAI-2_u2k6p1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620840/THAI-3302_qgmz1j.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620840/THAI-3302_qgmz1j.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620839/THAI-3571_fpgzhq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620839/THAI-3571_fpgzhq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620839/THAI-04-17-_DSF5575_zh6ue5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620839/THAI-04-17-_DSF5575_zh6ue5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620839/THAI-12-19-DSCF3051_pctgo1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620839/THAI-12-19-DSCF3051_pctgo1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/THAI-12-19-DSCF2642_cvmqzq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/THAI-12-19-DSCF2642_cvmqzq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/THAI-12-19-DSCF2498_qins6j.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/THAI-12-19-DSCF2498_qins6j.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/THAI-01-20-DSCF4704_aq3qsy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620838/THAI-01-20-DSCF4704_aq3qsy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620837/THAI-12-19-DSCF2460_x1i9r7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620837/THAI-12-19-DSCF2460_x1i9r7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620837/THA-2780_najztt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620837/THA-2780_najztt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/THAI-DSCF3890-copy.jpg-nggid03298-ngg0dyn-120x90-00f0w010c011r110f110r010t010_nmheth.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620662/THAI-DSCF3890-copy.jpg-nggid03298-ngg0dyn-120x90-00f0w010c011r110f110r010t010_nmheth.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620627/THAI-3571.jpg-nggid03322-ngg0dyn-180x0-00f0w010c010r110f110r010t010_s7epyv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620627/THAI-3571.jpg-nggid03322-ngg0dyn-180x0-00f0w010c010r110f110r010t010_s7epyv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620625/THAI-DSCF3890-copy.jpg-nggid03298-ngg0dyn-180x0-00f0w010c010r110f110r010t010_cobw8g.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620625/THAI-DSCF3890-copy.jpg-nggid03298-ngg0dyn-180x0-00f0w010c010r110f110r010t010_cobw8g.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620615/THAI-DSCF3890-copy_qrq2m7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620615/THAI-DSCF3890-copy_qrq2m7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620612/THAI-3571_dhw0i0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620612/THAI-3571_dhw0i0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620603/THAI-3571_dodkdd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620603/THAI-3571_dodkdd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620603/THAI-DSCF3890-copy_iacbwr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620603/THAI-DSCF3890-copy_iacbwr.jpg"
      }
    ]
  },
  {
    "region": "Middle East",
    "country": "Israel_Palestine",
    "slug": "israelpalestine",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466080/PAL-DSCF3675_copy_szirpb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466080/PAL-DSCF3675_copy_szirpb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466078/PAL-MeniasTony_13_ajtnqt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466078/PAL-MeniasTony_13_ajtnqt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620630/PAL-DSCF3675-copy.jpg-nggid03297-ngg0dyn-180x0-00f0w010c010r110f110r010t010_f434aq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620630/PAL-DSCF3675-copy.jpg-nggid03297-ngg0dyn-180x0-00f0w010c010r110f110r010t010_f434aq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/PAL-DSCF3675-copy.jpg-nggid03297-ngg0dyn-120x90-00f0w010c011r110f110r010t010_zs6hlp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/PAL-DSCF3675-copy.jpg-nggid03297-ngg0dyn-120x90-00f0w010c011r110f110r010t010_zs6hlp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620620/PAL-MeniasTony_13.jpg-nggid03299-ngg0dyn-180x0-00f0w010c010r110f110r010t010_byatrv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620620/PAL-MeniasTony_13.jpg-nggid03299-ngg0dyn-180x0-00f0w010c010r110f110r010t010_byatrv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620620/PAL-MeniasTony_13.jpg-nggid03299-ngg0dyn-120x90-00f0w010c011r110f110r010t010_ez2ge3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620620/PAL-MeniasTony_13.jpg-nggid03299-ngg0dyn-120x90-00f0w010c011r110f110r010t010_ez2ge3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620615/PAL-MeniasTony_13_fk2wqx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620615/PAL-MeniasTony_13_fk2wqx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620610/PAL-DSCF3675-copy_atjrdo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620610/PAL-DSCF3675-copy_atjrdo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620606/PAL-MeniasTony_13_xehwap.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620606/PAL-MeniasTony_13_xehwap.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620606/PAL-DSCF3675-copy_wasrel.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620606/PAL-DSCF3675-copy_wasrel.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620567/PAL-10-19-DSCF3283_j0zztl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620567/PAL-10-19-DSCF3283_j0zztl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620567/PAL-10-22-DSCF4464_psyyxq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620567/PAL-10-22-DSCF4464_psyyxq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620566/ISR-10-19-DSCF2980-Enhanced-NR_rnrtrt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620566/ISR-10-19-DSCF2980-Enhanced-NR_rnrtrt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620566/PAL-10-22-DSCF4834_yikoh2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620566/PAL-10-22-DSCF4834_yikoh2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620566/ISR-10-19-DSCF3016-2_vivp7p.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620566/ISR-10-19-DSCF3016-2_vivp7p.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620565/ISR-10-19-DSCF2603_kfiszj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620565/ISR-10-19-DSCF2603_kfiszj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620565/ISR-10-19-DSCF4159_mxwq2p.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620565/ISR-10-19-DSCF4159_mxwq2p.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620565/ISR-10-19-DSCF3016_tnmnrq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620565/ISR-10-19-DSCF3016_tnmnrq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620565/ISR-10-19-DSCF3499_dwxasa.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620565/ISR-10-19-DSCF3499_dwxasa.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620564/ISR-10-19-DSCF4212_bnfwaw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620564/ISR-10-19-DSCF4212_bnfwaw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620564/ISR-10-19-DSCF3674_hwwcew.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620564/ISR-10-19-DSCF3674_hwwcew.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620564/PAL-10-22-DSCF4693_b0symj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620564/PAL-10-22-DSCF4693_b0symj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620563/ISR-10-19-DSCF4131_k2wo6p.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620563/ISR-10-19-DSCF4131_k2wo6p.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620563/PAL-10-19-DSCF3266_ah2gkw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620563/PAL-10-19-DSCF3266_ah2gkw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620563/PAL-10-19-DSCF3206_y8flpl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620563/PAL-10-19-DSCF3206_y8flpl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620563/PAL-10-19-DSCF3208_guxz4u.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620563/PAL-10-19-DSCF3208_guxz4u.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620562/PAL-10-19-DSCF3221_wl4g9u.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620562/PAL-10-19-DSCF3221_wl4g9u.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620562/PAL-10-19-DSCF3211_dua8kh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620562/PAL-10-19-DSCF3211_dua8kh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620562/PAL-10-22-DSCF4893_imgf4v.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620562/PAL-10-22-DSCF4893_imgf4v.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620561/PAL-10-19-DSCF3315_qk6lv4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620561/PAL-10-19-DSCF3315_qk6lv4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620561/PAL-10-22-DSCF4570_wfju5u.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620561/PAL-10-22-DSCF4570_wfju5u.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620561/PAL-10-22-DSCF4890_l9rgzt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620561/PAL-10-22-DSCF4890_l9rgzt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620560/PAL-10-22-DSCF4891_lob7tg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620560/PAL-10-22-DSCF4891_lob7tg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620560/PAL-10-22-DSCF4892_pc3pry.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620560/PAL-10-22-DSCF4892_pc3pry.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620560/PAL-10-19-DSCF3722_oxjjqt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620560/PAL-10-19-DSCF3722_oxjjqt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620559/PAL-10-22-DSCF4888_jr9sun.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620559/PAL-10-22-DSCF4888_jr9sun.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620559/PAL-10-19-DSCF3582_ywpr3k.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620559/PAL-10-19-DSCF3582_ywpr3k.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620559/PAL-10-19-DSCF3773_u4gtap.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620559/PAL-10-19-DSCF3773_u4gtap.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620559/PAL-3238_yswvxc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620559/PAL-3238_yswvxc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620559/PAL-10-19-DSCF3313_l2udkz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620559/PAL-10-19-DSCF3313_l2udkz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620558/PAL-10-19-DSCF3303_drz89o.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620558/PAL-10-19-DSCF3303_drz89o.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620558/ISR-10-19-DSCF2937_a1ummg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620558/ISR-10-19-DSCF2937_a1ummg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620557/PAL-10-19-DSCF3270_quhilr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620557/PAL-10-19-DSCF3270_quhilr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620557/PAL-10-19-DSCF3611_gy1dsr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620557/PAL-10-19-DSCF3611_gy1dsr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620556/PAL-3250_uzdzq5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620556/PAL-3250_uzdzq5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620556/PAL-10-19-DSCF3581_qmbazg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620556/PAL-10-19-DSCF3581_qmbazg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620555/PAL-10-19-DSCF3566_t1phqk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620555/PAL-10-19-DSCF3566_t1phqk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620555/PAL-10-19-DSCF3322_dpwvsz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620555/PAL-10-19-DSCF3322_dpwvsz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620553/PAL-3116_lli3bj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620553/PAL-3116_lli3bj.jpg"
      }
    ]
  },
  {
    "region": "Europe",
    "country": "France",
    "slug": "france",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466078/FRA-DSCF0103_copy_gkgga5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466078/FRA-DSCF0103_copy_gkgga5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396078/FRA-9803_rxwmpi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396078/FRA-9803_rxwmpi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396077/FRA-0366_tduyys.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396077/FRA-0366_tduyys.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396072/FRA-0103_g4s51r.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396072/FRA-0103_g4s51r.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396071/FRA-05-19-18_dsoxmh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396071/FRA-05-19-18_dsoxmh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396070/FRA-05-18-DSCF9815_omhj9m.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396070/FRA-05-18-DSCF9815_omhj9m.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396070/FRA-05-18-18_tctpdw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396070/FRA-05-18-18_tctpdw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396070/FRA-DSCF0125_a1or0b.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396070/FRA-DSCF0125_a1or0b.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396064/FRA-DSCF9765_pycgqe.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396064/FRA-DSCF9765_pycgqe.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620890/FRA-05-18-DSCF9815_jti8jj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620890/FRA-05-18-DSCF9815_jti8jj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620890/FRA-05-18-18_otpd6f.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620890/FRA-05-18-18_otpd6f.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620889/FRA-0366_yr6tpl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620889/FRA-0366_yr6tpl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620889/FRA-05-19-18_e8h21o.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620889/FRA-05-19-18_e8h21o.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620889/FRA-0103_ofiooc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620889/FRA-0103_ofiooc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620888/FRA-9803_btrfp6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620888/FRA-9803_btrfp6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620885/FRA-DSCF9765_dkb7az.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620885/FRA-DSCF9765_dkb7az.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620879/FRA-DSCF0125_omylpt.png",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620879/FRA-DSCF0125_omylpt.png"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620660/FRA-DSCF0103-copy.jpg-nggid03314-ngg0dyn-180x0-00f0w010c010r110f110r010t010_d6frag.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620660/FRA-DSCF0103-copy.jpg-nggid03314-ngg0dyn-180x0-00f0w010c010r110f110r010t010_d6frag.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/FRA-DSCF0103-copy.jpg-nggid03314-ngg0dyn-120x90-00f0w010c011r110f110r010t010_bqniq6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/FRA-DSCF0103-copy.jpg-nggid03314-ngg0dyn-120x90-00f0w010c011r110f110r010t010_bqniq6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620609/FRA-DSCF0103-copy_piga2k.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620609/FRA-DSCF0103-copy_piga2k.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620599/FRA-DSCF0103-copy_gu4a5g.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620599/FRA-DSCF0103-copy_gu4a5g.jpg"
      }
    ]
  },
  {
    "region": "Asia",
    "country": "Philippines",
    "slug": "philippines",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466074/PHI-1662_copy_tmaoz6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466074/PHI-1662_copy_tmaoz6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/PHI-0660_vupz0p.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620861/PHI-0660_vupz0p.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620859/PHI-12-19-DSCF1239_l3qcjj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620859/PHI-12-19-DSCF1239_l3qcjj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620859/PHI-1157_ztn3ew.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620859/PHI-1157_ztn3ew.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/PHI-9895_wnvbet.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/PHI-9895_wnvbet.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/PHI-12-19-DSCF8950_uwz1oc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/PHI-12-19-DSCF8950_uwz1oc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/PHI-12-19-DSCF1329_lzhtok.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620858/PHI-12-19-DSCF1329_lzhtok.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620857/PHI-12-19-DSCF0399_fvtubt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620857/PHI-12-19-DSCF0399_fvtubt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620856/PHI-2331_no1pev.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620856/PHI-2331_no1pev.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620856/PHI-9879-copy_s0mex7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620856/PHI-9879-copy_s0mex7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620855/PHI-1179_oyh2ib.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620855/PHI-1179_oyh2ib.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/PHI-9214_mijyiq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/PHI-9214_mijyiq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/PHI-9879-copy_synnev.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/PHI-9879-copy_synnev.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/PHI-1662_xft2m7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620854/PHI-1662_xft2m7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620853/PHI-9214_hygrzm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620853/PHI-9214_hygrzm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620853/PHI-12-19-DSCF0399_omgyi8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620853/PHI-12-19-DSCF0399_omgyi8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620853/PHI-9525_defhnk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620853/PHI-9525_defhnk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620852/PHI-12-19-DSCF8950_zm4ybs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620852/PHI-12-19-DSCF8950_zm4ybs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620852/PHI-2331_cmrmat.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620852/PHI-2331_cmrmat.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620851/PHI-1179_evl7yj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620851/PHI-1179_evl7yj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620851/PHI-9525_brxlr2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620851/PHI-9525_brxlr2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620850/PHI-12-19-DSCF1239_k8avfm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620850/PHI-12-19-DSCF1239_k8avfm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620850/PHI-12-19-DSCF1453_bj40gb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620850/PHI-12-19-DSCF1453_bj40gb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620849/PHI-1157_hr7aoi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620849/PHI-1157_hr7aoi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620849/PHI-12-19-DSCF2268_zxctur.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620849/PHI-12-19-DSCF2268_zxctur.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620848/PHI-0660_ddvhjq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620848/PHI-0660_ddvhjq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620847/PHI-2070_n1xsch.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620847/PHI-2070_n1xsch.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620847/PHI-12-19-DSCF1329_lwv2fm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620847/PHI-12-19-DSCF1329_lwv2fm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-1662_odkrbz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-1662_odkrbz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-1052_ppou11.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-1052_ppou11.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-12-19-DSCF1453_zjahji.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-12-19-DSCF1453_zjahji.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-2070_gkusmu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620846/PHI-2070_gkusmu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620845/PHI-1052_kda8vf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620845/PHI-1052_kda8vf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620844/PHI-12-19-DSCF2268_gntd1y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620844/PHI-12-19-DSCF2268_gntd1y.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620844/PHI-9895_lawc2h.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620844/PHI-9895_lawc2h.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620659/PHI-1662-copy.jpg-nggid03302-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xadovi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620659/PHI-1662-copy.jpg-nggid03302-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xadovi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/PHI-2331.jpg-nggid03323-ngg0dyn-180x0-00f0w010c010r110f110r010t010_tvkzgq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620626/PHI-2331.jpg-nggid03323-ngg0dyn-180x0-00f0w010c010r110f110r010t010_tvkzgq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/PHI-1662-copy.jpg-nggid03302-ngg0dyn-120x90-00f0w010c011r110f110r010t010_tptll6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/PHI-1662-copy.jpg-nggid03302-ngg0dyn-120x90-00f0w010c011r110f110r010t010_tptll6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620612/PHI-2331_aonz6h.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620612/PHI-2331_aonz6h.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/PHI-1662-copy_qlf90s.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/PHI-1662-copy_qlf90s.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620605/PHI-2331_lrp5pu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620605/PHI-2331_lrp5pu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620600/PHI-1662-copy_eojyfm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620600/PHI-1662-copy_eojyfm.jpg"
      }
    ]
  },
  {
    "region": "Asia",
    "country": "Japan",
    "slug": "japan",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466070/JAP-3265_zrv1pe.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759466070/JAP-3265_zrv1pe.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF2819_awss97.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF2819_awss97.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF3291_eqvftc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF3291_eqvftc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF3101_cyash8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620805/JAP-03-17-_DSF3101_cyash8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-03-17-_DSF2579_jgpine.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-03-17-_DSF2579_jgpine.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3636-03-24-17_m2s1dz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3636-03-24-17_m2s1dz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-03-17-_DSF3067-Enhanced-NR_lolbrt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-03-17-_DSF3067-Enhanced-NR_lolbrt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3521-03-17-_DSF3520-Enhanced-NR_abrsod.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620804/JAP-3521-03-17-_DSF3520-Enhanced-NR_abrsod.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620803/JAP-03-17-_DSF2918_rkcvov.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620803/JAP-03-17-_DSF2918_rkcvov.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620802/JAP-2670_lcbqlv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620802/JAP-2670_lcbqlv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620802/JAP-3608_gnylxy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620802/JAP-3608_gnylxy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/JAP-4028_xdk6sm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/JAP-4028_xdk6sm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/JAP-3065_ej4dqf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/JAP-3065_ej4dqf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/JAP-03-17-_DSF2807_h7noxi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620801/JAP-03-17-_DSF2807_h7noxi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620800/JAP-3107_yluc7l.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620800/JAP-3107_yluc7l.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620800/JAP-3291_a2rdvn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620800/JAP-3291_a2rdvn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620658/JAP-3265.jpg-nggid03309-ngg0dyn-120x90-00f0w010c011r110f110r010t010_may0cv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620658/JAP-3265.jpg-nggid03309-ngg0dyn-120x90-00f0w010c011r110f110r010t010_may0cv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620631/JAP-3265.jpg-nggid03309-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nf5oyz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620631/JAP-3265.jpg-nggid03309-ngg0dyn-180x0-00f0w010c010r110f110r010t010_nf5oyz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/JAP-3265_wlfvhp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620619/JAP-3265_wlfvhp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620604/JAP-3265_zy7d74.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620604/JAP-3265_zy7d74.jpg"
      }
    ]
  },
  {
    "region": "Europe",
    "country": "Spain",
    "slug": "spain",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396529/ESP-4401_f610hw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396529/ESP-4401_f610hw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396527/ESP-4399_tomzgn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396527/ESP-4399_tomzgn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396525/ESP-4279_pwutdj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396525/ESP-4279_pwutdj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620937/ESP-4399_hymjd2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620937/ESP-4399_hymjd2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620936/ESP-4279_etky4d.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620936/ESP-4279_etky4d.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620936/ESP-4401_aaptl0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620936/ESP-4401_aaptl0.jpg"
      }
    ]
  },
  {
    "region": "Europe",
    "country": "UK & Ireland",
    "slug": "uk-ireland",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396443/UK-1457012819_vvgveb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396443/UK-1457012819_vvgveb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396439/UK-1871_luujb1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396439/UK-1871_luujb1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396436/UK-0458_pbf4ga.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396436/UK-0458_pbf4ga.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396433/UK-0452_pryun8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396433/UK-0452_pryun8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396431/UK-01-19-DSCF1744_b0i4qn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396431/UK-01-19-DSCF1744_b0i4qn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396429/UK-01-19-DSCF1565_vjuljk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396429/UK-01-19-DSCF1565_vjuljk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396426/UK-01-19-DSCF1484_ppx52t.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396426/UK-01-19-DSCF1484_ppx52t.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396421/IRL-3258_scvvay.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396421/IRL-3258_scvvay.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396421/IRL-2832_ppdybu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396421/IRL-2832_ppdybu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396419/IRL-3046_jxcqqt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396419/IRL-3046_jxcqqt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396418/IRL-2972_z6lacp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396418/IRL-2972_z6lacp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396413/IRL-2855_nnudt1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396413/IRL-2855_nnudt1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396409/IRL-2676_tu8siv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396409/IRL-2676_tu8siv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396408/IRL-2348_j8hych.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396408/IRL-2348_j8hych.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396406/IRL-2491_u8etxs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396406/IRL-2491_u8etxs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396402/IRL-2324_seyxw3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396402/IRL-2324_seyxw3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396399/IRL-10-18-DSCF3233_urnn11.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759396399/IRL-10-18-DSCF3233_urnn11.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620946/UK-0452_mhbojo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620946/UK-0452_mhbojo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620946/IRL-2855_gzw6tr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620946/IRL-2855_gzw6tr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620946/IRL-2324_f24wcf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620946/IRL-2324_f24wcf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/IRL-2972_ripupa.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/IRL-2972_ripupa.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/UK-1871_hojrhl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/UK-1871_hojrhl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/UK-01-19-DSCF1484_vr961f.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/UK-01-19-DSCF1484_vr961f.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/IRL-3258_jtidhf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620945/IRL-3258_jtidhf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620944/UK-01-19-DSCF1565_vx0cdt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620944/UK-01-19-DSCF1565_vx0cdt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620944/UK-01-19-DSCF1744_vxna03.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620944/UK-01-19-DSCF1744_vxna03.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620944/IRL-10-18-DSCF3233_gcmkuk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620944/IRL-10-18-DSCF3233_gcmkuk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620943/UK-0458_djqeug.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620943/UK-0458_djqeug.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620943/IRL-3046_guyvbu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620943/IRL-3046_guyvbu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620943/IRL-2491_qgjvez.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620943/IRL-2491_qgjvez.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620942/IRL-2676_kq7bs7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620942/IRL-2676_kq7bs7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620940/IRL-2832_joy6mn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620940/IRL-2832_joy6mn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620940/IRL-2348_ehsww9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620940/IRL-2348_ehsww9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620938/UK-1457012819_fnikmo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620938/UK-1457012819_fnikmo.jpg"
      }
    ]
  },
  {
    "region": "Europe",
    "country": "Greece",
    "slug": "greece",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395926/GRE-06-17-DSCF4387_mgl4lt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395926/GRE-06-17-DSCF4387_mgl4lt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395924/GRE-06-17-DSCF3545_u91ydm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395924/GRE-06-17-DSCF3545_u91ydm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395924/GRE-06-17-DSCF3935_aqs5f8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395924/GRE-06-17-DSCF3935_aqs5f8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395920/GRE-06-17-DSCF3354_gvdjqz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395920/GRE-06-17-DSCF3354_gvdjqz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395916/GRE-06-17-DSCF3945_a3f04t.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395916/GRE-06-17-DSCF3945_a3f04t.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395914/GRE-06-17-DSCF3374_nq6s1s.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395914/GRE-06-17-DSCF3374_nq6s1s.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395912/GRC-4135_zvjfqf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395912/GRC-4135_zvjfqf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620927/GRE-06-17-DSCF3354_omvaal.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620927/GRE-06-17-DSCF3354_omvaal.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620926/GRE-06-17-DSCF3935_ebyyij.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620926/GRE-06-17-DSCF3935_ebyyij.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620926/GRE-06-17-DSCF3374_qucydd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620926/GRE-06-17-DSCF3374_qucydd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620923/GRE-06-17-DSCF3945_xm8zag.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620923/GRE-06-17-DSCF3945_xm8zag.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620923/GRE-06-17-DSCF3545_h7bbzs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620923/GRE-06-17-DSCF3545_h7bbzs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/GRE-06-17-DSCF4387_masuwm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/GRE-06-17-DSCF4387_masuwm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/GRC-4135_owc6pu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/GRC-4135_owc6pu.jpg"
      }
    ]
  },
  {
    "region": "Europe",
    "country": "Italy",
    "slug": "italy",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395887/ITA-06-19-DSCF7678_fx2ick.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395887/ITA-06-19-DSCF7678_fx2ick.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395883/ITA-06-19-DSCF7223-2_ntwqdp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395883/ITA-06-19-DSCF7223-2_ntwqdp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395883/ITA-06-19-DSCF7366_ctzmgg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395883/ITA-06-19-DSCF7366_ctzmgg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395880/ITA-06-19-DSCF6993_iebkie.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395880/ITA-06-19-DSCF6993_iebkie.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395880/ITA-06-19-DSCF6262_rfhqli.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395880/ITA-06-19-DSCF6262_rfhqli.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395877/ITA-06-19-DSCF5753_jtqvpi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395877/ITA-06-19-DSCF5753_jtqvpi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395876/ITA-06-19-DSCF5382_aoi8gm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395876/ITA-06-19-DSCF5382_aoi8gm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395874/ITA-06-19-DSCF5220_qknqxp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395874/ITA-06-19-DSCF5220_qknqxp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395873/ITA-06-19-DSCF4707_sryn8k.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395873/ITA-06-19-DSCF4707_sryn8k.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395872/ITA-7678_ubliex.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395872/ITA-7678_ubliex.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395869/ITA-7475_jl5xla.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395869/ITA-7475_jl5xla.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395868/ITA-7114_vksyaj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395868/ITA-7114_vksyaj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395866/ITA-7083_xeauja.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395866/ITA-7083_xeauja.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395865/ITA-6886_g0ntud.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395865/ITA-6886_g0ntud.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395862/ITA-6849_zprglp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395862/ITA-6849_zprglp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395861/ITA-6842_wkw2zb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395861/ITA-6842_wkw2zb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395859/ITA-6300_copy_ejyry8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395859/ITA-6300_copy_ejyry8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395859/ITA-6828_h63aiy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395859/ITA-6828_h63aiy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395858/ITA-6796-Website-2_uuwswh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395858/ITA-6796-Website-2_uuwswh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395856/ITA-5491_vxpeby.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395856/ITA-5491_vxpeby.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395853/ITA-06-19-DSCF7323_brute9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395853/ITA-06-19-DSCF7323_brute9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395852/ITA-06-19-DSCF6864_rcyu26.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395852/ITA-06-19-DSCF6864_rcyu26.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395851/ITA-06-19-DSCF6817_vz0u22.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395851/ITA-06-19-DSCF6817_vz0u22.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395849/ITA-06-19-DSCF6766_v055po.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395849/ITA-06-19-DSCF6766_v055po.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395846/ITA-06-19-DSCF6413_vnwhpr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395846/ITA-06-19-DSCF6413_vnwhpr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395845/ITA-06-19-DSCF6092_ttfodt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395845/ITA-06-19-DSCF6092_ttfodt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395843/ITA-06-19-DSCF5929_h7hohy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395843/ITA-06-19-DSCF5929_h7hohy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395842/ITA-06-19-DSCF5847_t3agru.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395842/ITA-06-19-DSCF5847_t3agru.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395840/ITA-06-19-DSCF5719_qsfcn9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395840/ITA-06-19-DSCF5719_qsfcn9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395838/ITA-06-19-DSCF5412_vnu5z6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395838/ITA-06-19-DSCF5412_vnu5z6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395837/ITA-06-19-DSCF4624_ivgb0m.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395837/ITA-06-19-DSCF4624_ivgb0m.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395835/ITA-06-19-DSCF4216_p5dzgo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395835/ITA-06-19-DSCF4216_p5dzgo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395834/ITA-06-19-19_njgcld.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395834/ITA-06-19-19_njgcld.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395833/ITA-06-15-19-2_cvrzgl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395833/ITA-06-15-19-2_cvrzgl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395833/ITA-06-15-19_ksnfuk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395833/ITA-06-15-19_ksnfuk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395829/ITA-7800_hrbeim.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395829/ITA-7800_hrbeim.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395827/ITA-5487_kzdmc0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395827/ITA-5487_kzdmc0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395826/ITA-7323_allcjx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395826/ITA-7323_allcjx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395824/ITA-6952_b1kfcq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395824/ITA-6952_b1kfcq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395823/ITA-7041_bbpuhk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395823/ITA-7041_bbpuhk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395823/ITA-6160_xh9pmt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395823/ITA-6160_xh9pmt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395821/ITA-6300_xw6sox.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395821/ITA-6300_xw6sox.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395816/ITA-5470_k7stuy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395816/ITA-5470_k7stuy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395815/ITA-5275_cgn76o.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395815/ITA-5275_cgn76o.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395813/ITA-5267_w1mddd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395813/ITA-5267_w1mddd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395810/ITA-5252-Website-2_mwb9eg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395810/ITA-5252-Website-2_mwb9eg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395806/ITA-5252_eftkeo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395806/ITA-5252_eftkeo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395805/ITA-5223_ensfzp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395805/ITA-5223_ensfzp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395802/ITA-5209_iyqwnk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395802/ITA-5209_iyqwnk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395802/ITA-5212_vsx5pv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395802/ITA-5212_vsx5pv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395801/ITA-5220_qo5fs6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395801/ITA-5220_qo5fs6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395797/ITA-5193_p7b8sp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395797/ITA-5193_p7b8sp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395793/ITA-5047_vwluei.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395793/ITA-5047_vwluei.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395790/ITA-5030_mztsis.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395790/ITA-5030_mztsis.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395777/ITA-5013_wgt5vh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395777/ITA-5013_wgt5vh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395776/ITA-4995_c2eqdu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395776/ITA-4995_c2eqdu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395775/ITA-4935_uhq82w.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395775/ITA-4935_uhq82w.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395770/ITA-6796_zh2cin.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395770/ITA-6796_zh2cin.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395771/ITA-4755_sda4tl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395771/ITA-4755_sda4tl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395766/ITA-5257_cwv3sg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395766/ITA-5257_cwv3sg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395766/ITA-3816_jskwty.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395766/ITA-3816_jskwty.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395765/ITA-06-19-DSCF6987_reyy29.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395765/ITA-06-19-DSCF6987_reyy29.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395763/ITA-5507_rp7lla.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395763/ITA-5507_rp7lla.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395763/ITA-6092_dtjk7w.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395763/ITA-6092_dtjk7w.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395762/ITA-5847_x9ra95.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395762/ITA-5847_x9ra95.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395755/ITA-5261_qghy13.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395755/ITA-5261_qghy13.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395751/ITA-5208_dez7bc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395751/ITA-5208_dez7bc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395751/ITA-5218_wgszth.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395751/ITA-5218_wgszth.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395747/ITA-5199_hruck4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395747/ITA-5199_hruck4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395745/ITA-4096_ribgno.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395745/ITA-4096_ribgno.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395742/ITA-3723_jit6dn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395742/ITA-3723_jit6dn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395715/ITA-DSCF6964_ymu4nb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395715/ITA-DSCF6964_ymu4nb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395713/ITA-4985_hyehjz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395713/ITA-4985_hyehjz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395209/ITA-DSCF6964_hni4vg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395209/ITA-DSCF6964_hni4vg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395205/ITA-4985_nvbbiq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1759395205/ITA-4985_nvbbiq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/ITA-06-19-DSCF7366_ogk0wz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620922/ITA-06-19-DSCF7366_ogk0wz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620921/ITA-06-19-DSCF5220_cligis.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620921/ITA-06-19-DSCF5220_cligis.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620921/ITA-06-19-DSCF5929_we3xot.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620921/ITA-06-19-DSCF5929_we3xot.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620920/ITA-06-19-DSCF5753_l5lrlz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620920/ITA-06-19-DSCF5753_l5lrlz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620920/ITA-06-19-DSCF7678_efilvw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620920/ITA-06-19-DSCF7678_efilvw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620920/ITA-06-19-DSCF5412_yvy3fr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620920/ITA-06-19-DSCF5412_yvy3fr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620919/ITA-06-19-DSCF6987_lvcsxs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620919/ITA-06-19-DSCF6987_lvcsxs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620919/ITA-06-19-DSCF4707_fzjblf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620919/ITA-06-19-DSCF4707_fzjblf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620919/ITA-06-19-DSCF7223-2_wkxy2m.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620919/ITA-06-19-DSCF7223-2_wkxy2m.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-19-19_b3tddf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-19-19_b3tddf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-19-DSCF6993_hmrany.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-19-DSCF6993_hmrany.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-19-DSCF6413_klepxc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-19-DSCF6413_klepxc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-15-19-2_mbsoyf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620918/ITA-06-15-19-2_mbsoyf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620917/ITA-6300_copy_goidlv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620917/ITA-6300_copy_goidlv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620917/ITA-6886_u9kgtn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620917/ITA-6886_u9kgtn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620917/ITA-06-19-DSCF5719_oszpp1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620917/ITA-06-19-DSCF5719_oszpp1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620916/ITA-06-19-DSCF6092_cetqiz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620916/ITA-06-19-DSCF6092_cetqiz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620916/ITA-7083_b8kkfh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620916/ITA-7083_b8kkfh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620916/ITA-06-19-DSCF6864_jv7bfz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620916/ITA-06-19-DSCF6864_jv7bfz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620915/ITA-06-19-DSCF6766_nuow1a.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620915/ITA-06-19-DSCF6766_nuow1a.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620915/ITA-7475_hkyaic.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620915/ITA-7475_hkyaic.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620915/ITA-5491_xn3vz5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620915/ITA-5491_xn3vz5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620914/ITA-06-19-DSCF4216_zppwxw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620914/ITA-06-19-DSCF4216_zppwxw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620914/ITA-06-19-DSCF5382_o5yipq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620914/ITA-06-19-DSCF5382_o5yipq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620914/ITA-06-15-19_jrg0hp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620914/ITA-06-15-19_jrg0hp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-7114_tzyqgy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-7114_tzyqgy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-06-19-DSCF6817_fr12vo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-06-19-DSCF6817_fr12vo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-06-19-DSCF7323_qndlbe.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-06-19-DSCF7323_qndlbe.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-7041_veqcoe.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620913/ITA-7041_veqcoe.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-5470_fkibpm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-5470_fkibpm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-6842_x4kkyn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-6842_x4kkyn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-06-19-DSCF5847_lobxeo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-06-19-DSCF5847_lobxeo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-5487_jwuinc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-5487_jwuinc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-06-19-DSCF4624_aym0mb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620912/ITA-06-19-DSCF4624_aym0mb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620911/ITA-7678_lgir2y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620911/ITA-7678_lgir2y.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620910/ITA-5047_fy9mf9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620910/ITA-5047_fy9mf9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620910/ITA-6160_i6yw0b.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620910/ITA-6160_i6yw0b.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620909/ITA-5030_bw1y9h.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620909/ITA-5030_bw1y9h.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620910/ITA-4995_iz4t9v.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620910/ITA-4995_iz4t9v.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620909/ITA-5252-Website-2_jvdgol.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620909/ITA-5252-Website-2_jvdgol.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620909/ITA-6849_txqrtq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620909/ITA-6849_txqrtq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/ITA-6828_c5n81z.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/ITA-6828_c5n81z.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/ITA-6952_rrfmov.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/ITA-6952_rrfmov.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/ITA-6796-Website-2_jkenjw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620908/ITA-6796-Website-2_jkenjw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620907/ITA-5218_mw2xhx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620907/ITA-5218_mw2xhx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620907/ITA-6300_q1lma3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620907/ITA-6300_q1lma3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620907/ITA-5223_i6iofw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620907/ITA-5223_i6iofw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620906/ITA-4935_amg8bg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620906/ITA-4935_amg8bg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620906/ITA-3816_vwqkdf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620906/ITA-3816_vwqkdf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620906/ITA-4755_kzkaqb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620906/ITA-4755_kzkaqb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-7800_w1enov.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-7800_w1enov.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-5257_lilgvq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-5257_lilgvq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-5220_fu0jjm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-5220_fu0jjm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-5267_tpvgyt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620905/ITA-5267_tpvgyt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620904/ITA-7323_zhoddk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620904/ITA-7323_zhoddk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620904/ITA-5209_fnrzei.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620904/ITA-5209_fnrzei.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/ITA-5252_hquggq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/ITA-5252_hquggq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/ITA-5212_eqttus.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/ITA-5212_eqttus.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/ITA-5013_fzs3hi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620903/ITA-5013_fzs3hi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-5193_sqwohf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-5193_sqwohf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-3723_felkch.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-3723_felkch.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-5261_v9yfzh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-5261_v9yfzh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-6092_qkmz6w.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620902/ITA-6092_qkmz6w.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620901/ITA-5208_gy7npg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620901/ITA-5208_gy7npg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620901/ITA-5275_pvyhxm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620901/ITA-5275_pvyhxm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620900/ITA-5847_ksbceu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620900/ITA-5847_ksbceu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620900/ITA-5199_cg2ph0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620900/ITA-5199_cg2ph0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620899/ITA-6796_vfxim1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620899/ITA-6796_vfxim1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/ITA-4096_ytnyad.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/ITA-4096_ytnyad.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/ITA-5507_woxfqe.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/ITA-5507_woxfqe.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/ITA-4985_xxusox.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620898/ITA-4985_xxusox.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620891/ITA-DSCF6964_b5y2hz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620891/ITA-DSCF6964_b5y2hz.jpg"
      }
    ]
  },
  {
    "region": "Africa",
    "country": "Ethiopia",
    "slug": "ethiopia",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/ETH-03-14-IMG_1327_pltrne.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/ETH-03-14-IMG_1327_pltrne.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/ETH-03-14-IMG_2202_vn1mwt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621053/ETH-03-14-IMG_2202_vn1mwt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/ETH-03-14-IMG_1671_t6fjfc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/ETH-03-14-IMG_1671_t6fjfc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/ETH-2206_lundkq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621052/ETH-2206_lundkq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/ETH-03-14-IMG_1851_mxvvrr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/ETH-03-14-IMG_1851_mxvvrr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/ETH-03-14-IMG_1203_ocemca.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/ETH-03-14-IMG_1203_ocemca.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/ETH-1076_epz2yh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621051/ETH-1076_epz2yh.jpg"
      }
    ]
  },
  {
    "region": "Africa",
    "country": "Namibia",
    "slug": "namibia",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621045/NAM-11-22-DSCF8007_igcf5l.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621045/NAM-11-22-DSCF8007_igcf5l.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621044/NAM-11-22-DSCF8053_zbbdiv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621044/NAM-11-22-DSCF8053_zbbdiv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621044/NAM-11-22-DSCF8100_c36s7p.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621044/NAM-11-22-DSCF8100_c36s7p.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621042/NAM-03-18-DSCF3974-2_wisjdt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621042/NAM-03-18-DSCF3974-2_wisjdt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621043/NAM-11-22-DSCF8027_ww0n6i.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621043/NAM-11-22-DSCF8027_ww0n6i.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621043/NAM-11-22-DSCF8058_jyfppl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621043/NAM-11-22-DSCF8058_jyfppl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621043/NAM-03-18-DSCF4225_rf0ocf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621043/NAM-03-18-DSCF4225_rf0ocf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621042/NAM-11-22-DSCF8086_hzb2al.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621042/NAM-11-22-DSCF8086_hzb2al.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621042/NAM-03-18-DSCF3994-2_j52uxi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621042/NAM-03-18-DSCF3994-2_j52uxi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-11-22-DSCF8069_s0sfqh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-11-22-DSCF8069_s0sfqh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-11-22-DSCF8065_csokqz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-11-22-DSCF8065_csokqz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-11-22-DSCF8077_tl3ovq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-11-22-DSCF8077_tl3ovq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-03-18-DSCF4108_egoca5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621041/NAM-03-18-DSCF4108_egoca5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/NAM-03-18-DSCF3946_hd7bdg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/NAM-03-18-DSCF3946_hd7bdg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/NAM-11-22-DSCF8088_pzgoe6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/NAM-11-22-DSCF8088_pzgoe6.jpg"
      }
    ]
  },
  {
    "region": "Africa",
    "country": "Egypt",
    "slug": "egypt",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/EGY-68_y6bkd2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621040/EGY-68_y6bkd2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/EGY-1030_tmdg4s.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/EGY-1030_tmdg4s.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/EGY-337_lg0guc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621039/EGY-337_lg0guc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-1064_zdf7hn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-1064_zdf7hn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-160_bjue1z.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-160_bjue1z.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-698_xpvwc0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621038/EGY-698_xpvwc0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-174_uziqy8.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-174_uziqy8.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-565-Website-3_ojuwmi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-565-Website-3_ojuwmi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-869_ujdg3k.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621037/EGY-869_ujdg3k.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-618_chevek.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-618_chevek.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-888_vhl0tl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-888_vhl0tl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-946_v5ldvm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-946_v5ldvm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-148_copy_ccgtjs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621036/EGY-148_copy_ccgtjs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-445_fx92a5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-445_fx92a5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-917_yi0yxv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-917_yi0yxv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-565-Website-2_dk5fxb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621035/EGY-565-Website-2_dk5fxb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-422_gyv52e.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-422_gyv52e.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-110_twsqs3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-110_twsqs3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-585_lshm5r.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-585_lshm5r.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-617_l347ue.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621034/EGY-617_l347ue.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-593_jzugfp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-593_jzugfp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-493_yytmit.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-493_yytmit.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-571_fjskmj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-571_fjskmj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-42_mdsysd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621033/EGY-42_mdsysd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621032/EGY-280_n1um5h.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621032/EGY-280_n1um5h.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621032/EGY-565_copy_lomsva.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621032/EGY-565_copy_lomsva.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621032/EGY-203_zmi8sn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621032/EGY-203_zmi8sn.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621031/EGY-134_wnlkrz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621031/EGY-134_wnlkrz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621031/EGY-467_spxldi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621031/EGY-467_spxldi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621031/EGY-255_akvon6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621031/EGY-255_akvon6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621030/EGY-94_t416ie.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621030/EGY-94_t416ie.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621030/EGY-503_uxaswm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621030/EGY-503_uxaswm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621029/EGY-312_wzdwoi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621029/EGY-312_wzdwoi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621029/EGY-350_mzguxd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621029/EGY-350_mzguxd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621029/EGY-114_zm260d.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621029/EGY-114_zm260d.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621028/EGY-154_on2wxz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621028/EGY-154_on2wxz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621028/EGY-178_nhny7l.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621028/EGY-178_nhny7l.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621028/EGY-121_ktoy5f.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621028/EGY-121_ktoy5f.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621027/EGY-525_z2s5ep.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621027/EGY-525_z2s5ep.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621027/EGY-277_fpt90b.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621027/EGY-277_fpt90b.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621027/EGY-53_copy_nmrxma.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621027/EGY-53_copy_nmrxma.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-95_bo57j7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-95_bo57j7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-128_j02ulw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-128_j02ulw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-143_wcladi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-143_wcladi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-260_qjcdvv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621026/EGY-260_qjcdvv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621025/EGY-76_fwyikl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621025/EGY-76_fwyikl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621025/EGY-205_bsqnrg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621025/EGY-205_bsqnrg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621025/EGY-287_fgvcio.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621025/EGY-287_fgvcio.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-346_pieeu5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-346_pieeu5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-1143_kukepv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-1143_kukepv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-120_pqni5f.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-120_pqni5f.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-130_xfq1kr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621024/EGY-130_xfq1kr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621023/EGY-1178_fsr2zw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621023/EGY-1178_fsr2zw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621023/EGY-365_vha9pg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621023/EGY-365_vha9pg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621022/EGY-51_cdhacv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621022/EGY-51_cdhacv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621022/EGY-374_tzvz01.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621022/EGY-374_tzvz01.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-565_y3j3zs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-565_y3j3zs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-19_whrfkw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-19_whrfkw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-578_zh22hi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-578_zh22hi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-621_aeship.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621021/EGY-621_aeship.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-LUX-425_obwqb6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-LUX-425_obwqb6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-313_ssupl1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-313_ssupl1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-85_frzrs4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-85_frzrs4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-359_fdxeph.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621020/EGY-359_fdxeph.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621005/EGY-117_dw4guf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758621005/EGY-117_dw4guf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620985/EGY-53_uk8d6n.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620985/EGY-53_uk8d6n.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620965/EGY-77-Website-2_ugelda.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620965/EGY-77-Website-2_ugelda.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620962/EGY-61-Website-2_e9fcvy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620962/EGY-61-Website-2_e9fcvy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620962/EGY-395_zqvfyu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620962/EGY-395_zqvfyu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620962/EGY-620_yjzobr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620962/EGY-620_yjzobr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620961/EGY-311_axwlrc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620961/EGY-311_axwlrc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620961/EGY-LUX-531_tqbxiq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620961/EGY-LUX-531_tqbxiq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-528_fozrqw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-528_fozrqw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-230_khm08r.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-230_khm08r.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-324_pvsoqz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-324_pvsoqz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-291_iwtsqd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620960/EGY-291_iwtsqd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-557_kcoc9x.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-557_kcoc9x.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-318_hi8umj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-318_hi8umj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-115_oy7jjc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-115_oy7jjc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-148_zqqz9l.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620959/EGY-148_zqqz9l.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620958/EGY-189_zufisw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620958/EGY-189_zufisw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620958/EGY-452_uktncb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620958/EGY-452_uktncb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/EGY-1142-Website-2_wfe5zt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/EGY-1142-Website-2_wfe5zt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/EGY-468_txovy4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/EGY-468_txovy4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/EGY-44_hrne6u.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620957/EGY-44_hrne6u.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620956/EGY-224_kcuctk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620956/EGY-224_kcuctk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620956/EGY-200_ggk5nl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620956/EGY-200_ggk5nl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620956/EGY-231_pzwyih.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620956/EGY-231_pzwyih.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620955/EGY-145_rmqjdj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620955/EGY-145_rmqjdj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620955/EGY-481_ku92ju.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620955/EGY-481_ku92ju.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620955/EGY-283_uqni09.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620955/EGY-283_uqni09.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-61_copy_svbwv7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-61_copy_svbwv7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-518_cutair.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-518_cutair.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-61_nxpg46.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620954/EGY-61_nxpg46.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620953/EGY-1135_jxlzwd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620953/EGY-1135_jxlzwd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620658/EGY-481.jpg-nggid03321-ngg0dyn-120x90-00f0w010c011r110f110r010t010_q4ljbo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620658/EGY-481.jpg-nggid03321-ngg0dyn-120x90-00f0w010c011r110f110r010t010_q4ljbo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620629/EGY-1135.jpg-nggid03320-ngg0dyn-120x90-00f0w010c011r110f110r010t010_zycdrs.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620629/EGY-1135.jpg-nggid03320-ngg0dyn-120x90-00f0w010c011r110f110r010t010_zycdrs.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620628/EGY-1135.jpg-nggid03320-ngg0dyn-180x0-00f0w010c010r110f110r010t010_i0dwh2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620628/EGY-1135.jpg-nggid03320-ngg0dyn-180x0-00f0w010c010r110f110r010t010_i0dwh2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620624/EGY-481.jpg-nggid03321-ngg0dyn-180x0-00f0w010c010r110f110r010t010_dz9hzo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620624/EGY-481.jpg-nggid03321-ngg0dyn-180x0-00f0w010c010r110f110r010t010_dz9hzo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620616/EGY-1135_tu9nbg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620616/EGY-1135_tu9nbg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620613/EGY-481_axgaj1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620613/EGY-481_axgaj1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620613/EGY-1135_lnxmeq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620613/EGY-1135_lnxmeq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620608/EGY-481_reqn0b.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620608/EGY-481_reqn0b.jpg"
      }
    ]
  },
  {
    "region": "South America",
    "country": "Argentina",
    "slug": "argentina",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620951/ARG-8518_d1y1ut.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620951/ARG-8518_d1y1ut.jpg"
      }
    ]
  },
  {
    "region": "Asia",
    "country": "Vietnam",
    "slug": "vietnam",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-04-17-DSCF9132_xehdbe.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-04-17-DSCF9132_xehdbe.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-04-17-DSCF8483_kvdrx3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620878/VIET-04-17-DSCF8483_kvdrx3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/VIET-04-17-DSCF8417_x85azw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/VIET-04-17-DSCF8417_x85azw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/VIET-04-17-DSCF8306_zftwy2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/VIET-04-17-DSCF8306_zftwy2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-04-17-DSCF8526_klxs2p.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-04-17-DSCF8526_klxs2p.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/VIET-04-17-DSCF8532_kpmfkg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620877/VIET-04-17-DSCF8532_kpmfkg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-9130-04-20-17_jouth2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-9130-04-20-17_jouth2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-7850_misasv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-7850_misasv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-04-17-DSCF9121_uzfr4v.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620876/VIET-04-17-DSCF9121_uzfr4v.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620871/VIET-8530-04-16-17_fztkqd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620871/VIET-8530-04-16-17_fztkqd.jpg"
      }
    ]
  },
  {
    "region": "Asia",
    "country": "Hong Kong",
    "slug": "hong-kong",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620681/HK-04-17-_DSF6504_sknmxo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620681/HK-04-17-_DSF6504_sknmxo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-Unexpected_perspective-6919_zzi74r.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-Unexpected_perspective-6919_zzi74r.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-04-17-_DSF5703_i2sokz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620680/HK-04-17-_DSF5703_i2sokz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-04-07-17-3_xwlpuy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-04-07-17-3_xwlpuy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-04-07-17_v9g09f.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-04-07-17_v9g09f.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-5958-04-05-17_fk4wuo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620679/HK-5958-04-05-17_fk4wuo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620678/HK-Pastel_Playground_3-6617_ayxssd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620678/HK-Pastel_Playground_3-6617_ayxssd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-Pastel_Playground_2-6570_xzsixb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-Pastel_Playground_2-6570_xzsixb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-5960-04-05-17_rrc3ik.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-5960-04-05-17_rrc3ik.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-5933-04-05-17_iypper.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-5933-04-05-17_iypper.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-04-17-_DSF5965_thdllx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620677/HK-04-17-_DSF5965_thdllx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620676/HK-5841_copy_oftjsq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620676/HK-5841_copy_oftjsq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620675/HK-Pastel_Playground_4-6559_yeil6k.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620675/HK-Pastel_Playground_4-6559_yeil6k.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620674/HK-6578_smezhl.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620674/HK-6578_smezhl.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620623/HK-DSF5841-Website-2.jpg-nggid03324-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xwatei.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620623/HK-DSF5841-Website-2.jpg-nggid03324-ngg0dyn-180x0-00f0w010c010r110f110r010t010_xwatei.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620615/HK-DSF5841-Website-2_m9rpbk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620615/HK-DSF5841-Website-2_m9rpbk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/HK-DSF5841-Website-2_mvb5ya.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620611/HK-DSF5841-Website-2_mvb5ya.jpg"
      }
    ]
  },
  {
    "region": "North America",
    "country": "Puerto Rico",
    "slug": "puerto-rico",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/PR-DSF8368_rihtna.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/PR-DSF8368_rihtna.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/PR-1049_fol9kq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/PR-1049_fol9kq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/PR-DSF8358_irvw2j.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620552/PR-DSF8358_irvw2j.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620551/PR-DSF8343_wfmmui.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620551/PR-DSF8343_wfmmui.jpg"
      }
    ]
  },
  {
    "region": "North America",
    "country": "Mexico",
    "slug": "mexico",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620551/MEX-11-20-DSCF5674_hv6yem.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620551/MEX-11-20-DSCF5674_hv6yem.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620551/MEX-10-20-DSCF2473_til94o.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620551/MEX-10-20-DSCF2473_til94o.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620550/MEX-11-20-DSCF6087_fjxxbz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620550/MEX-11-20-DSCF6087_fjxxbz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620550/MEX-11-20-DSCF5608_s3rmtp.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620550/MEX-11-20-DSCF5608_s3rmtp.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620550/MEX-11-20-DSCF6067_a6zoaw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620550/MEX-11-20-DSCF6067_a6zoaw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620549/MEX-10-20-DSCF2598_cixoo1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620549/MEX-10-20-DSCF2598_cixoo1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620549/MEX-11-20-DSCF3780_qakvwx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620549/MEX-11-20-DSCF3780_qakvwx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620549/MEX-10-20-DSCF2812_ys1hzq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620549/MEX-10-20-DSCF2812_ys1hzq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF5601_rgxl5r.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF5601_rgxl5r.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF4476_ay7pwm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF4476_ay7pwm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF5613_pp4uo2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF5613_pp4uo2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF5614_ztu45y.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620548/MEX-11-20-DSCF5614_ztu45y.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620547/MEX-11-20-DSCF5628_sk679j.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620547/MEX-11-20-DSCF5628_sk679j.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620547/MEX-11-20-DSCF5661_c85i0j.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620547/MEX-11-20-DSCF5661_c85i0j.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620547/MEX-11-20-DSCF6431_k5zu5k.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620547/MEX-11-20-DSCF6431_k5zu5k.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620546/MEX-11-07-20-3_ughmge.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620546/MEX-11-07-20-3_ughmge.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620546/MEX-11-20-DSCF7614_brutu2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620546/MEX-11-20-DSCF7614_brutu2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620546/MEX-10-20-DSCF1423_zcbnpm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620546/MEX-10-20-DSCF1423_zcbnpm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620545/MEX-11-20-DSCF6370_ddcbeo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620545/MEX-11-20-DSCF6370_ddcbeo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620545/MEX-11-07-20_oft3b4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620545/MEX-11-07-20_oft3b4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620545/MEX-11-03-20-2_sucidz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620545/MEX-11-03-20-2_sucidz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620544/MEX-11-20-DSCF5657_knajz6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620544/MEX-11-20-DSCF5657_knajz6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620544/MEX-10-29-20-2_a4auxb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620544/MEX-10-29-20-2_a4auxb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-10-29-20-4_juitn9.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-10-29-20-4_juitn9.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-11-03-20_uhvufh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-11-03-20_uhvufh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-10-31-20_efeo7n.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-10-31-20_efeo7n.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-08-26-20_enz4f4.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-08-26-20_enz4f4.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-10-20-DSCF2506_krnffa.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620543/MEX-10-20-DSCF2506_krnffa.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620542/MEX-11-20-DSCF5556_i0zs7u.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620542/MEX-11-20-DSCF5556_i0zs7u.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620542/MEX-10-28-20-3_rlc1mo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620542/MEX-10-28-20-3_rlc1mo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620541/MEX-10-29-20-3_cvzkyg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620541/MEX-10-29-20-3_cvzkyg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620541/MEX-11-20-DSCF4753_h1mgly.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620541/MEX-11-20-DSCF4753_h1mgly.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-08-28-20_aap6tv.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-08-28-20_aap6tv.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-09-20-DSCF5845_vqaa1u.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-09-20-DSCF5845_vqaa1u.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-09-04-20-2_ecdazw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-09-04-20-2_ecdazw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-10-29-20_okztv5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620540/MEX-10-29-20_okztv5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620539/MEX-166_yshj1w.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620539/MEX-166_yshj1w.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620539/MEX-92_qsfpzg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620539/MEX-92_qsfpzg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620539/MEX-7549_zd3edw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620539/MEX-7549_zd3edw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620538/MEX-203_z0lxbr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620538/MEX-203_z0lxbr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620538/MEX-84_kbpaxr.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620538/MEX-84_kbpaxr.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620538/MEX-30_tnymgq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620538/MEX-30_tnymgq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-118_ddykfm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-118_ddykfm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-56_copy_d0vdpk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-56_copy_d0vdpk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-18-Website-2_ulwxwm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-18-Website-2_ulwxwm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-79_v0fwxx.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620537/MEX-79_v0fwxx.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620536/MEX-424_xvhxmy.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620536/MEX-424_xvhxmy.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620536/MEX-311_iwlwja.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620536/MEX-311_iwlwja.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620535/MEX-09-04-20_bcxcjc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620535/MEX-09-04-20_bcxcjc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620535/MEX-206_osokrj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620535/MEX-206_osokrj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620535/MEX-10-28-20-2_misgct.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620535/MEX-10-28-20-2_misgct.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-10-28-20_zrgfd7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-10-28-20_zrgfd7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-5831_lqfktc.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-5831_lqfktc.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-7476-_cacovg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-7476-_cacovg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-5803_jcibny.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620534/MEX-5803_jcibny.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620533/MEX-10-27-20_dknvhm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620533/MEX-10-27-20_dknvhm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620533/MEX-09-09-20_fzdjzw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620533/MEX-09-09-20_fzdjzw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620533/MEX-6692_bqfngj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620533/MEX-6692_bqfngj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620532/MEX-178_copy_ivaziz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620532/MEX-178_copy_ivaziz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620532/MEX-18_dmjpjb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620532/MEX-18_dmjpjb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-74_u1183a.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-74_u1183a.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-112_ybuidd.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-112_ybuidd.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-179_e9sgx5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-179_e9sgx5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-129_gdtrn2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620531/MEX-129_gdtrn2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620530/MEX-345_poxvbm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620530/MEX-345_poxvbm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620530/MEX-328_dyl65f.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620530/MEX-328_dyl65f.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620530/MEX-93_ygttgw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620530/MEX-93_ygttgw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-181_ptmc8v.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-181_ptmc8v.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-109_a2elw7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-109_a2elw7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-374_mjeeid.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-374_mjeeid.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-326_qu0gtt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620529/MEX-326_qu0gtt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620528/MEX-164_cer0io.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620528/MEX-164_cer0io.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620528/MEX-61_u7izwt.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620528/MEX-61_u7izwt.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620527/MEX-406_w9xam6.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620527/MEX-406_w9xam6.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620527/MEX-299_raaa7a.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620527/MEX-299_raaa7a.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620527/MEX-159_bvnjbw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620527/MEX-159_bvnjbw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/MEX-64_mmg4x5.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/MEX-64_mmg4x5.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/MEX-178_sdv5k1.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/MEX-178_sdv5k1.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620525/MEX-105_khbotk.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620525/MEX-105_khbotk.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/MEX-23_x9r70a.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620526/MEX-23_x9r70a.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620525/MEX-37_vw1lav.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620525/MEX-37_vw1lav.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620525/MEX-4376_c2jagu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620525/MEX-4376_c2jagu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620524/MEX-4545_zawvu2.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620524/MEX-4545_zawvu2.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620524/MEX-47_gny7s0.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620524/MEX-47_gny7s0.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620524/MEX-73_hfxjvw.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620524/MEX-73_hfxjvw.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620523/MEX-4731_ptqtqh.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620523/MEX-4731_ptqtqh.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620523/MEX-4426_xilvc3.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620523/MEX-4426_xilvc3.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-54_iharhi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-54_iharhi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-191_uulgki.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-191_uulgki.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-66_k7ho8n.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-66_k7ho8n.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-294_dvsncu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620522/MEX-294_dvsncu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620521/MEX-117_dhrfxg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620521/MEX-117_dhrfxg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620521/MEX-56_ciyjeu.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620521/MEX-56_ciyjeu.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620521/MEX-180_rbi3jo.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620521/MEX-180_rbi3jo.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620520/MEX-197_ngbg2f.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620520/MEX-197_ngbg2f.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620520/MEX-28_zlhjxm.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620520/MEX-28_zlhjxm.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620520/MEX-395_ol8z8u.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620520/MEX-395_ol8z8u.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620519/MEX-Miss_Technicolor-8_xldvhz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620519/MEX-Miss_Technicolor-8_xldvhz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620519/MEX-65_jyrd0s.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620519/MEX-65_jyrd0s.jpg"
      }
    ]
  },
  {
    "region": "North America",
    "country": "Caribbean",
    "slug": "caribbean",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9074_j1qznq.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9074_j1qznq.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9003_e33r6b.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9003_e33r6b.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620519/CAR-12-24-DSCF9433_bzr6ps.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620519/CAR-12-24-DSCF9433_bzr6ps.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9175_mbgpmz.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9175_mbgpmz.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9143_e6b9mi.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620518/CAR-12-24-DSCF9143_e6b9mi.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620516/CAR-12-24-DSCF9182_kanice.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620516/CAR-12-24-DSCF9182_kanice.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620516/CAR-12-24-DSCF9039_t2wkt7.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620516/CAR-12-24-DSCF9039_t2wkt7.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620516/CAR-12-24-DSCF9126_bnnmle.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620516/CAR-12-24-DSCF9126_bnnmle.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620515/CAR-12-24-DSCF9188_csfq9c.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620515/CAR-12-24-DSCF9188_csfq9c.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620515/CAR-12-24-DSCF8798_akarcf.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620515/CAR-12-24-DSCF8798_akarcf.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620510/CAR-12-24-DSCF9295_ywcx2h.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620510/CAR-12-24-DSCF9295_ywcx2h.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/CAR-7827_ma3agb.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/CAR-7827_ma3agb.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/CAR-12-24-DSCF9563_a0v6pj.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/CAR-12-24-DSCF9563_a0v6pj.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/CAR-12-24-DSCF9138_p1n3fe.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620508/CAR-12-24-DSCF9138_p1n3fe.jpg"
      }
    ]
  },
  {
    "region": "North America",
    "country": "St. Martin",
    "slug": "st-martin",
    "images": [
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620517/STM-8082_abjbjg.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620517/STM-8082_abjbjg.jpg"
      },
      {
        "desktop": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620517/STM-8234_bks8vn.jpg",
        "mobile": "https://res.cloudinary.com/dvwdoezk1/image/upload/v1758620517/STM-8234_bks8vn.jpg"
      }
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

const MERGED_ALBUMS: CountryAlbum[] = mergeAlbums(ALBUMS, GENERATED_ALBUMS ?? []);

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
