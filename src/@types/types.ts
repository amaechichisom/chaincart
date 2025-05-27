export interface CategoryCardProps {
    image: string;
    title: string;
    count: number;
  }
  
  export interface PromoBannerProps {
    discountText: string;
    title: string;
    subTitle: string;
    buttonText: string;
    imageUrl: string;
    bgColor?: string;
  }
  
  export enum Roles {
    BUYER = 'buyer',
    SELLER = 'seller',
    ADMIN = 'admin',
    SUPERADMIN = 'superadmin',
  }
  
  export interface IUserResponse {
    accessToken: string;
    result?: IUserDetails;
    user?: IUserDetails;
  }  

  export interface AuthResponse {
  accessToken: string;
  user: {
    email: string;
    role: Roles[]; 
    profile: {
      name: string | null;
      bio: string | null;
      avatar: string;
    };
    walletAddress: string ;
    _id: string;
    username: string;
    isVerified: boolean;
  };
}


export interface IMessage {
  status: number,
  message: string,
}
export interface IApiResponse extends IMessage {
  data?: unknown
}

export interface IUserDetails {
  email: string | null;
  role: Roles[];
  profile: Profile;
  walletAddress: string;
  _id: string;
  isVerified: boolean;
}

interface Profile {
  name: string | null;
  bio: string | null;
  avatar: string | null;
}
export interface IProduct  {
    _id: string;
    title: string;
    description?: string;
    price: number;
    category?:string;
    seller?:ISellerId;
    stock: number;
    address:string;
    mapping_location:IMapingLocation;
    image_of_land:string;
    size_of_land:string;
    document_of_land:string;
  }
  
  type ISellerId = {
    _id:string
    walletAddress:string
  }

  export type ICart = Partial<IProduct> & { quantity?: number ,price?:number,};

  // export type ICart = {
  //   _id: string;
  //   product: IProduct;
  //   quantity: number;
  //   price: number;
  // };
  
  
  export interface IAvailableOrder {
    productId: string;
    quantity: number;
    price: number;
    totalAmount: number;
    seller: string;
    sellerAddress: string;
  }
  
  export interface CartItem {
    _id: string;
    product: IProduct;
    quantity: number;
    price: number;
  }
  export interface ICartResponseData {
    _id: string;
    user: string;
    total: number;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
    __v: number;
  }
  // export interface ICartResponseData extends IMessage {
  //   data: CartData;
  // }
  
    // export interface ICartResponseData {
    //   _id: string;
    //   user: string;
    //   total: number;
    //   items: CartItem[];
    // }
  
  export interface ICreateProduct {
      title: string;
      description?: string;
      price: string;
      category?:string;
      stock: string;
      address:string;
      mapping_location:IMapingLocation;
      image_of_land:File | null;
      size_of_land:string;
      document_of_land:string;
    }
  
  export type IMapingLocation = { lat:number, lng: number }
  
  export interface ICategory {
  _id: string;
  name?: string;
  description?: string;
}
export interface IUserOrderHistory {
  _id: string;
  payment: {
    amount: number;
    txHash: string;
  };
  items: {
    product: {
      _id: string;
      price: number;
      stock: number;
      image_of_land: string;
    };
    quantity: number;
    price: number;
    _id: string;
  }[];
  status: string;
  totalAmount: number;
  createdAt: string;
}
 

export type IXionTransact ={
  transactionHash: string;
    gasUsed: bigint;
    height: number;
    events: readonly Event[];
}

export type ILandListing = {
  _id: string;
  title: string;
  description: string;
  price: number;
  specialOfferPrice: number;
  category: string;
  seller: {
    _id: string;
    walletAddress: string | null;
  };
  stock: number;
  beds: number;
  baths: number;
  address: string;
  image_of_land: string[];
  coverImage: string;
  size_of_land: string;
  document_of_land: string[];
  isSpecialOffer: boolean;
  isBestDeal: boolean;
  isTopSelling: boolean;
  offerStartDate: string; 
  offerEndDate: string;   
  tags: string[];
  totalSold: number;
  likes: any[];          
  likeCount: number;
  likedBy: any[];        
  isActive: boolean;
  createdAt: string;      
  updatedAt: string;      
  percentage: number;
  __v: number;
};
