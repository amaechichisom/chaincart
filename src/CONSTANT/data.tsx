import { CategoryCardProps } from "@/@types/types"
import * as IMG from './../assets/index'

export const navbarItemsContent = {
    menu: [
        {
            name: "About Us",
            href: "/",
        },
        {
            name: "Compare",
            href: "/",
        },
        {
            name: "Wishlist",
            href: "/",
        }
    ],
    subtext: "100% Secure delivery without contacting the courier",
    contactText: "Need help? Call Us: ",
    contactSpanText: "+0020 500",
    languages: [
        {
            name: "English",
            value: "en",
        },
        {
            name: "Arabic",
            value: "ar",
        },
        {
            name: "French",
            value: "fr",
        }
    ],
    currency: [
        {
            name: "USD",
            value: "usd",
        },
        {
            name: "NGR",
            value: "ngr",
        },
        {
            name: "EUR",
            value: "eur",
        }
    ]
}


export const headerMenu = [
    {
        name: "Apartment",
        href: "/category?search=apartment",
    },
    {
        name: "Flat",
        href: "/category?search=flat",
    },
    {
        name: "Land",
        href: "/category?search=land",
    },
    {
        name: "Duplex",
        href: "/category?search=duplex",
    },
    {
        name: "Bungalow",
        href: "/category?search=bungalow",
    },
    {
        name: "Bedsitter",
        href: "/category?search=bedsitter",
    },
    {
        name: "High rise",
        href: "/category?search=high-rise",
    },
    {
        name: "Mini Flat",
        href: "/category?search=mini-flat",
    }
]

export const profileHeaderMenu = [
    {
        name: "My Profile",
        href: "/seller",
    },
    {
        name: "My Listings",
        href: "/seller/listing",
    },
    {
        name: "Settings",
        href: "/seller/settings",
    },
    {
        name: "Logout",
        href: "/logout",
    }
]

export const categoryCardData:CategoryCardProps[] =[
    {
        image: IMG.Apartment,
        title:'Apartment',
        count: 2
    },
    {
        image: IMG.Household_Need,
        title:'Household Need',
        count: 2
    },
    {
        image: IMG.Meat_and_Seafood,
        title:'Meat and Seafood',
        count: 2
    },
    {
        image: IMG.Mini_Flat,
        title:'Mini Flat',
        count: 2
    },
    {
        image: IMG.Mini_flat_One,
        title:'Mini flat One',
        count: 2
    },
    {
        image: IMG.Shared_Apartment,
        title:'Shared Apartment',
        count: 2
    },
    {
        image: IMG.Sky_Scrapper,
        title:'Sky Scrapper',
        count: 2
    },
    {
        image: IMG.Studio_Apartment,
        title:'Studio Apartment',
        count: 2
    },
    {
        image: IMG.Terrace,
        title:'Terrace',
        count: 2
    },
]
export const dealsData = {
    image: IMG.WeekDeal,
    discount: 18,
    oldPrice: 54.99,
    newPrice: 44.49,
    title: "4 bedroom semi-detached duplex for rent",
    location: "Victoria Island (VI), Lagos",
    stock: 100,
    available: 79,
    endTime: "2024-12-31 23:59:59",
  };
  
 export  const propertiesData = [
    {
      image: IMG.P2BedRm,
      discount: 22,
      oldPrice: 53.5,
      newPrice: 7.25,
      title: "3bdm Block of Flats",
      location: "Adeniyi Jones for rent",
      reviews: 1,
    },
    {
      image: IMG.P2BedRmOne,
      discount: 23,
      oldPrice: 4.29,
      newPrice: 3.29,
      title: "Mini Flat in Lekki Phase 1",
      location: "For rent",
      reviews: 1,
    },
    {
      image: IMG.P2BedRmOne,
      discount: 23,
      oldPrice: 4.29,
      newPrice: 3.29,
      title: "Mini Flat in Lekki Phase 1",
      location: "For rent",
      reviews: 1,
    },
    {
      image: IMG.P2BedRmOne,
      discount: 23,
      oldPrice: 4.29,
      newPrice: 3.29,
      title: "Mini Flat in Lekki Phase 1",
      location: "For rent",
      reviews: 1,
    },
    {
      image: IMG.P3BedRm,
      discount: 23,
      oldPrice: 4.29,
      newPrice: 3.29,
      title: "Mini Flat in Lekki Phase 1",
      location: "For rent",
      reviews: 1,
    },
    {
      image: IMG.PMiniFlat,
      discount: 23,
      oldPrice: 4.29,
      newPrice: 3.29,
      title: "Mini Flat in Lekki Phase 1",
      location: "For rent",
      reviews: 1,
    },
  ];
  
export const PromaBannerData =[
    {
        discountText:"Weekend Discount 40%",
        title:"4-bedroom Duplex Mansion",
        subTitle:"Shortlet Weekend Discount",
        buttonText:"Shop Now",
        imageUrl:IMG.CreamBanner,
        bgColor:"bg-teal-100"
    },
    {
        discountText:"Weekend Discount 40%",
        title:"Furnished 2-bedroom Apartment",
        subTitle:"Shorlet Weekend Discount",
        buttonText:"Shop Now",
        imageUrl:IMG.CreamBannerOne,
        bgColor:"bg-pink-100"
    }
]

export const finsidCardData = [
    {
      image: IMG.Mini_Flat,
      discount: 40,
      title: "Semi-Furnished",
      description: "Buy one this weekend",
      date: "Jan 13, 2025",
      category: "GROCERY",
    },
    {
      image: IMG.P2BedRmTwo,
      discount: 40,
      title: "Unfurnished",
      description: "Shine the morning",
      date: "Jan 13, 2025",
      category: "GROCERY",
    },
    {
      image: IMG.P3BedRm,
      discount: 40,
      title: "Furnished",
      description: "Housing made better",
      date: "Jan 13, 2025",
      category: "GROCERY",
    },
    {
      image: IMG.P2BedRmTwo,
      title: "Furnished 2bdrm Duplex in Peace Estate, Ajah for rent",
      description: "",
      date: "Jan 13, 2025",
      category: "GROCERY",
    },
    {
      image: IMG.P2BedRmTwo,
      title: "Furnished 3bdrm Block of Flats in Alfred Rewane Ikoyi for rent",
      description: "",
      date: "Jan 13, 2025",
      category: "GROCERY",
    },
    {
      image: IMG.P2BedRmTwo,
      title: "3bdrm Duplex in Orchid Road, Chevron for rent",
      description: "",
      date: "Jan 13, 2025",
      category: "GROCERY",
    },
  ];
  
export const shopProptiesData = [
    { title: "2bdrm Apartment in Lekki", image: IMG.Mini_flat_One, price: 8.35, discountPrice: 7.25, discount: 22, inStock: true },
    { title: "2bdrm Apartment in Lekki", image: IMG.Mini_flat_One, price: 8.35, discountPrice: 7.25, discount: 22, inStock: true },
    { title: "2bdrm Apartment in Lekki", image: IMG.Mini_flat_One, price: 8.35, discountPrice: 7.25, discount: 22, inStock: true },
    { title: "American Cheese Singles", image: IMG.Mini_flat_One, price: 8.23, discountPrice: 3.29, discount: 60, inStock: true },
    { title: "American Cheese Singles", image: IMG.Mini_flat_One, price: 8.23, discountPrice: 3.29, discount: 60, inStock: true },
    { title: "American Cheese Singles", image: IMG.Mini_flat_One, price: 8.23, discountPrice: 3.29, discount: 60, inStock: true },
    { title: "Apartment in Abraham Aseganya", image: IMG.Mini_flat_One, price: 4.35, discountPrice: 3.29, discount: 23, inStock: true },
    { title: "Apartment in Abraham Aseganya", image: IMG.Mini_flat_One, price: 4.35, discountPrice: 3.29, discount: 23, inStock: true },
    { title: "Apartment in Abraham Aseganya", image: IMG.Mini_flat_One, price: 4.35, discountPrice: 3.29, discount: 23, inStock: true },
  ];
  
  export const CartData = [
    {
      title: "2Bdrm Apartment in Lekki for Rent",
      image: IMG.P2BedRmTwo,
      price: 1000,
      discountPrice: 850,
      discount: 15,
      inStock: true,
    },
    {
      title: "Furnished Duplex in Ajah",
      image: "/images/duplex.jpg",
      price: 3000,
      discountPrice: 2800,
      discount: 10,
      inStock: true,
    },
    {
      title: "Luxury Condo in Victoria Island",
      image: "/images/condo.jpg",
      price: 5000,
      inStock: false,
    },
  ];
  
  export const productDetailsData = {
    title: "Furnished 5bdrm Duplex in Pearl Garden Estate, Ajah for rent",
    images: [IMG.Apartment, IMG.Mini_Flat],
    price: 0.89,
    oldPrice: 1.99,
    rating: 3.0,
    description: "Beautiful 5-bedroom duplex with modern amenities in Pearl Garden Estate, Ajah.",
    specialOfferEnds: "08:50:02",
  };
  
  export const apartmentData = [
  { 
    src: IMG.ApartmentOne, 
    title: "2bdrm Apartment in Lekki", 
    price: 32000, 
    discountPrice: 27000, 
    discountPercentage: Math.round(((32000 - 27000) / 32000) * 100)
  },
  { 
    src: IMG.ApartmentTwo, 
    title: "3bdrm Apartment in Ikoyi", 
    price: 40000 
  },
  { 
    src: IMG.ApartmentThree, 
    title: "1bdrm Apartment in Yaba", 
    price: 22000, 
    discountPrice: 18700, 
    discountPercentage: Math.round(((22000 - 18700) / 22000) * 100)
  },
  { 
    src: IMG.ApartmentFour, 
    title: "Studio Apartment in VI", 
    price: 25000 
  },
  { 
    src: IMG.ApartmentOne, 
    title: "Mini Flat in Ajah", 
    price: 28000, 
    discountPrice: 21000, 
    discountPercentage: Math.round(((28000 - 21000) / 28000) * 100)
  },
];

export const landData = [
  { 
    src: IMG.ApartmentOne, 
    title: "3 Acres In Lekki", 
    price: 37000, 
    discountPrice: 29600, 
    discountPercentage: Math.round(((37000 - 29600) / 37000) * 100)
  },
  { 
    src: IMG.ApartmentTwo, 
    title: "5 Hectares in Magodo", 
    price: 40000, 
    discountPrice: 32000, 
    discountPercentage: Math.round(((40000 - 32000) / 40000) * 100)
  },
  { 
    src: IMG.ApartmentThree, 
    title: "Farmland in Lagos", 
    price: 25000 
  },
  { 
    src: IMG.ApartmentFour, 
    title: "5 Plots in Ibadan", 
    price: 34000 
  },
  { 
    src: IMG.ApartmentOne, 
    title: "25 Acres in Ilishan", 
    price: 28000, 
    discountPrice: 21000, 
    discountPercentage: Math.round(((28000 - 21000) / 28000) * 100)
  },
];

export const topCategories = [
  {
    title: "Lands",
    src: IMG.SaleIcon,
  },
  {
    title: "Apartments",
    src: IMG.ApartmentIcon,
  },
  {
    title: "Hotels",
    src: IMG.HotelIcon,
  },
  {
    title: "Duplex",
    src: IMG.DuplexIcon,
  },
  {
    title: "Bungalow",
    src: IMG.BungalowIcon,
  },
  {
    title: "Guesthouse",
    src: IMG.GuesthouseIcon,
  },
  {
    title: "Condos",
    src: IMG.CondoIcon,
  },
];

export const topSellers = [
  {
    title: "Adron Homes",
    src: IMG.AdronLogo,
  },
  {
    title: "Brit Properties",
    src: IMG.BritLogo,
  },
  {
    title: "Dradrock Limited",
    src: IMG.DradrockLogo,
  },
  {
    title: "First Real Value",
    src: IMG.FrvLogo,
  },
  {
    title: "Landwey Investment",
    src: IMG.LandweyLogo,
  },
  {
    title: "OAK Properties",
    src: IMG.OakLogo,
  },
  {
    title: "UPDC",
    src: IMG.UpdcLogo,
  }
]