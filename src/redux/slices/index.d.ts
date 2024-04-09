export interface Item {
  id: number;
  name: string;
  price: number;
  size: string;
}

export interface CartItem extends Item {
  quantity: number;
}
