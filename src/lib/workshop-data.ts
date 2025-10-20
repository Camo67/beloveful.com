// Workshop Images Data
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
    {
      src: "/workshop-photos/Copy of CHI-0871.jpg",
      alt: "Chicago Street Scene"
    },
    {
      src: "/workshop-photos/Copy of CHI-09-19-DSCF5133.jpg",
      alt: "Urban Photography Workshop"
    },
    {
      src: "/workshop-photos/Copy of CHI-2084-Website-2.jpg",
      alt: "Street Photography Moment"
    },
    {
      src: "/workshop-photos/Copy of CHI-359.jpg",
      alt: "Chicago Workshop Experience"
    }
  ] as WorkshopImage[],

  chicagoGroup: [
    {
      src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
      alt: "Group Workshop Chicago"
    },
    {
      src: "/workshop-photos/Copy of CHI-3.jpg",
      alt: "Group Workshop Scene"
    },
    {
      src: "/workshop-photos/Copy of CHI-5041.jpg",
      alt: "Chicago Street Collaborative"
    },
    {
      src: "/workshop-photos/Copy of CHI-5652.jpg",
      alt: "Group Photography Session"
    },
    {
      src: "/workshop-photos/Copy of CHI-65.jpg",
      alt: "Workshop Participants"
    }
  ] as WorkshopImage[],

  online: [
    {
      src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218565/Website%20beloveful.com/Erasing%20Borders/NyC-DSCF8922_copy_2_lswqmq.jpg",
      alt: "Online Workshop"
    },
    {
      src: "/workshop-photos/Copy of CHI-8649.jpg",
      alt: "Online Learning Photography"
    },
    {
      src: "/workshop-photos/Copy of CHI-8789.jpg",
      alt: "Virtual Workshop Experience"
    },
    {
      src: "/workshop-photos/Copy of CHI-9867.jpg",
      alt: "Remote Photography Training"
    },
    {
      src: "/workshop-photos/Copy of CHI-9872-Website-2.jpg",
      alt: "Online Street Photography"
    }
  ] as WorkshopImage[],

  mentorship: [
    {
      src: "https://res.cloudinary.com/dvwdoezk1/image/upload/v1760218570/Website%20beloveful.com/Erasing%20Borders/Tony_Menias_-_Two_Girls_in_Window_rgthwg.jpg",
      alt: "Photography Mentorship"
    },
    {
      src: "/workshop-photos/Copy of CHI-Cafe-.jpg",
      alt: "Mentorship Session"
    },
    {
      src: "/workshop-photos/Copy of DSCF1980.jpg",
      alt: "One-on-One Guidance"
    },
    {
      src: "/workshop-photos/Copy of DSCF8938.jpg",
      alt: "Photography Mentorship Program"
    },
    {
      src: "/workshop-photos/Copy of Fountain Fairy.jpg",
      alt: "Creative Mentorship"
    },
    {
      src: "/workshop-photos/Copy of Tony_Menias 1.jpg",
      alt: "Personalized Photography Training"
    }
  ] as WorkshopImage[]
};
