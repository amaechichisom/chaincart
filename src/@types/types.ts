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
/**
* * learn  ReturnType
 */
//? type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
// function getUser() {
//   return { id: 1, name: "Alice" };
// }

// type UserType = ReturnType<typeof getUser>; 

// UserType = { id: number; name: string }

//? 
// const add = (a: number, b: number): number => a + b;

// type AddReturnType = ReturnType<typeof add>;
// // AddReturnType = number


  
  // export type ICart = Partial<IProduct> & { quantity?: number };
  // export type ICart = Partial<IProduct>;
  //? Remove 'description' and 'stock' from IProduct
  // export type ICart = Omit<IProduct, "description" | "stock">;
  // const cartItem: ICart = {
  //   title: "Product Name",
  //   price: 100
  //   // description and stock are omitted
  // };
  //? Make all properties optional except 'id' and 'title'
//   type TCart = Partial<Omit<IProduct, "id" | "title">>;

//? Make all properties optional
// type TCart = Partial<IProduct>;

// type IBtn {
//   [key:string]:string
// }
// const cartItem: TCart = {
//   price: 100
//   // 'id' and 'title' are omitted, but the rest are optional
// };
  // export type ICart = {
  //   quantity: number;
  //   id: number;
  //   title: string;
  //   price: number;
  //   image: string;
  // }[];
  
  // interface IOrder<TProduct = IProduct, TUser = string> {
  //   _id: string;
  //   buyer: TUser; // Can be string (userId) or a full user object
  //   seller: TUser;
  //   items: Array<{
  //     product: TProduct;
  //     quantity: number;
  //     price: number;
  //   }>;
  //   totalAmount: number;
  //   payment: {
  //     amount: number;
  //     txHash: string;
  //   };
  //   status: "pending" | "shipped" | "delivered";
  //   createdAt: Date;
  // }
  // function getValue<T>(value: T): T {
  //   return value;
  // }
  // interface Box<T> {
  //   content: T;
  // }
  // const numberBox: Box<number> = { content: 42 };
  // const stringBox: Box<string> = { content: "hello" };
  
  // console.log(numberBox.content); // 42
  // console.log(stringBox.content); // "hello"
    
  // interface Pair<T, U> {
  //   first: T;
  //   second: U;
  // }
//   const pair1: Pair<string, number> = { first: "Alice", second: 25 };
// const pair2: Pair<boolean, string> = { first: true, second: "Yes" };

// console.log(pair1); // { first: "Alice", second: 25 }
// console.log(pair2); // { first: true, second: "Yes" }
// interface IOrder<TProduct, TUser> {
//   buyer: TUser;
//   items: { product: TProduct; quantity: number }[];
// }

// interface IProduct {
//   id: string;
//   name: string;
// }

// const order1: IOrder<IProduct, string> = {
//   buyer: "user123", // Just the user ID
//   items: [
//     { product: { id: "p1", name: "Laptop" }, quantity: 1 }
//   ]
// };

// interface IUser {
//   id: string;
//   name: string;
// }

// const order2: IOrder<string, IUser> = {
//   buyer: { id: "user456", name: "Bob" }, // Full user object
//   items: [
//     { product: "product789", quantity: 2 } // Just the product ID
//   ]
// };
//? de
// interface Box<T> {
//   content: T;
// }
// const numberBox: Box<number> = { content: 10 }; // ✅ Works
// const stringBox: Box<string> = { content: "Hello" }; // ✅ Works
// const anyBox: Box = { content: "Hello" }; // ❌ ERROR: Type is required




