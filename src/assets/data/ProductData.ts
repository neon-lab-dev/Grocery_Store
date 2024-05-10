interface ProductDataItem {
  id: number;
  Title: string;
  image: string;
  Price: number;
  Size: string;
  quantity:number,
  QuantityAvalaible:number;
  DisPrice: number;
}

const ProductData: ProductDataItem[] = [
  {
    id: 1,
    Title: "Desi Tomato (Nattu Thakkali)",
    Price: 42,
    Size: '1kg',
    quantity:0,
    QuantityAvalaible:9,
    DisPrice: 58,
    image:
      'item1',
  },
  {
    id: 2,
    Title: 'Ginger (Inji)',
    Price: 42,
    Size: '1kg',
    quantity:0,
    QuantityAvalaible:0,
    DisPrice: 58,
    image:
      'item2',
  },
  {
    id: 3,
    Title: "Desi Tomato (Nattu Thakkali)",
    Price: 42,
    quantity:0,
    Size: '1kg',
    QuantityAvalaible:0,
    DisPrice: 58,
    image:
      'item1',
  },
  {
    id: 4,
    Title: 'Ginger (Inji)',
    quantity:0,
    Price: 42,
    QuantityAvalaible:6,
    Size: '1kg',
    DisPrice: 58,
    image:
      'item2',
  },
  {
    id: 5,
    Title: 'Ginger (Inji)',
    QuantityAvalaible:0,
    quantity:0,
    Price: 42,
    Size: '1kg',
    DisPrice: 58,
    image:
      'item2',
  },
  {
    id: 6,
    Title: 'Ginger (Inji)',
    QuantityAvalaible:0,
    quantity:0,
    Price: 42,
    Size: '1kg',
    DisPrice: 58,
    image:
      'item2',
  },
  {
    id: 7,
    Title: 'Ginger (Inji)',
    QuantityAvalaible:5,
    Price: 42,
    quantity:0,
    Size: '1kg',
    DisPrice: 58,
    image:
      'item2',
  },
  {
    id: 8,
    Title: 'Ginger (Inji)',
    QuantityAvalaible:8,
    quantity:0,
    Price: 42,
    Size: '1kg',
    DisPrice: 58,
    image:
      'item2',
  },
];

export default ProductData;
