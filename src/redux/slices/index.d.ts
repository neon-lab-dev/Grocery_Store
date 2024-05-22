export interface Item {
  id: number;
  Title: string;
  image: string;
  Price: number;
  quantity: number;
  Size: string;
  DisPrice: number;
  QuantityAvalaible: number;
}

export interface CartItem extends Item {
  quantity: number;
}
