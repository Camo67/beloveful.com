// Workshop Images Data
// TODO: Upload images from /public/Website beloveful.com/Workshop Photos to Cloudflare R2
// and replace these placeholder URLs with actual R2 URLs

export interface WorkshopImage {
  src: string;
  alt: string;
  caption?: string;
}

export const workshopImages = {
  chicagoPrivate: [
    {
      src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
      alt: "Chicago Street Photography"
    },
    // Upload these from Workshop Photos folder to Cloudflare R2:
    // - Copy of CHI-0871.jpg
    // - Copy of CHI-09-19-DSCF5133.jpg
    // - Copy of CHI-2084-Website-2.jpg
    // - Copy of CHI-359.jpg
  ] as WorkshopImage[],

  chicagoGroup: [
    {
      src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
      alt: "Group Workshop Chicago"
    },
    // Upload these from Workshop Photos folder to Cloudflare R2:
    // - Copy of CHI-3.jpg
    // - Copy of CHI-5041.jpg
    // - Copy of CHI-5652.jpg
    // - Copy of CHI-65.jpg
  ] as WorkshopImage[],

  online: [
    {
      src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
      alt: "Online Workshop"
    },
    // Upload these from Workshop Photos folder to Cloudflare R2:
    // - Copy of CHI-8649.jpg
    // - Copy of CHI-8789.jpg
    // - Copy of CHI-9867.jpg
    // - Copy of CHI-9872-Website-2.jpg
  ] as WorkshopImage[],

  mentorship: [
    {
      src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
      alt: "Photography Mentorship"
    },
    // Upload these from Workshop Photos folder to Cloudflare R2:
    // - Copy of CHI-Cafe-.jpg
    // - Copy of DSCF1980.jpg
    // - Copy of DSCF8938.jpg
    // - Copy of Fountain Fairy.jpg
    // - Copy of Tony_Menias 1.jpg
  ] as WorkshopImage[]
};
