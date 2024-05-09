interface ProductDataItem {
  id: number;
  Title: string;
  image: string;
  Price: number;
  Quantity: string;
  QuantityAvalaible:number;
  DisPrice: number;
}

const ProductData: ProductDataItem[] = [
  {
    id: 1,
    Title: "Desi Tomato (Nattu Thakkali)",
    Price: 42,
    Quantity: '1kg',
    QuantityAvalaible:9,
    DisPrice: 58,
    image:
      'item1',
  },
  {
    id: 2,
    Title: 'Ginger (Inji)',
    Price: 42,
    Quantity: '1kg',
    QuantityAvalaible:0,
    DisPrice: 58,
    image:
      'item2',
  },
  {
    id: 3,
    Title: "Desi Tomato (Nattu Thakkali)",
    Price: 42,
    Quantity: '1kg',
    QuantityAvalaible:0,
    DisPrice: 58,
    image:
      'item1',
  },
  {
    id: 4,
    Title: 'Ginger (Inji)',
    Price: 42,
    QuantityAvalaible:6,
    Quantity: '1kg',
    DisPrice: 58,
    image:
      'item2',
  },
  {
    id: 5,
    Title: 'Ginger (Inji)',
    QuantityAvalaible:0,
    Price: 42,
    Quantity: '1kg',
    DisPrice: 58,
    image:
      'item2',
  },
  {
    id: 6,
    Title: 'Ginger (Inji)',
    QuantityAvalaible:0,
    Price: 42,
    Quantity: '1kg',
    DisPrice: 58,
    image:
      'item2',
  },
  {
    id: 7,
    Title: 'Ginger (Inji)',
    QuantityAvalaible:5,
    Price: 42,
    Quantity: '1kg',
    DisPrice: 58,
    image:
      'item2',
  },
  {
    id: 8,
    Title: 'Ginger (Inji)',
    QuantityAvalaible:8,
    Price: 42,
    Quantity: '1kg',
    DisPrice: 58,
    image:
      'item2',
  },
];

export default ProductData;
