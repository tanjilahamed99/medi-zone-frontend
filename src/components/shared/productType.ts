export type product = {
  category: string;
  company: string;
  description: string;
  discount: number;
  image: string[];
  images: string[];
  metaKey: string;
  name: string;
  popular: boolean;
  price: number;
  quantity: number;
  ratings: string;
  review: string[];
  stack: boolean;
  status: boolean;
  type: string;
  _id: string;
};

export type MyCart = {
  userEmail: string;
  userName: string;
  myCartsData: product[];
};

export type CartState = {
  myCart: MyCart;
  isPending: boolean;
  isRejected: boolean;
};

