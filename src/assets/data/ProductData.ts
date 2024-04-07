interface ProductDataItem {
  id: number;
  Title: string;
  image: string;
  Price: number;
  Quantity: string;
  DisPrice: number;
}

const ProductData: ProductDataItem[] = [
  {
    id: 1,
    Title: "Desi Tomato (Nattu Thakkali)",
    Price: 42,
    Quantity: '1kg',
    DisPrice: 58,
    image:
      'item1',
  },
  {
    id: 2,
    Title: 'Ginger (Inji)',
    Price: 42,
    Quantity: '1kg',
    DisPrice: 58,
    image:
      'item2',
  },
  {
    id: 3,
    Title: 'Ginger (Inji)',
    Price: 42,
    Quantity: '1kg',
    DisPrice: 58,
    image:
      'item2',
  },
  {
    id: 4,
    Title: 'Ginger (Inji)',
    Price: 42,
    Quantity: '1kg',
    DisPrice: 58,
    image:
      'item2',
  },
  // {
  //   id: 5,
  //   Title: 'Grocery',
  //   Price: 100,
  //   Quantity: '1kg',
  //   DisPrice: 110,
  //   image:
  //     'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-3_9.png',
  // },
  // {
  //   id: 6,
  //   Title: 'Grocery',
  //   Price: 100,
  //   Quantity: '1kg',
  //   DisPrice: 110,
  //   image:
  //     'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-3_9.png',
  // },
  // {
  //   id: 7,
  //   Title: 'Grocery',
  //   Price: 100,
  //   Quantity: '1kg',
  //   DisPrice: 110,
  //   image:
  //     'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-3_9.png',
  // },
  // {
  //   id: 8,
  //   Title: 'Grocery',
  //   Price: 100,
  //   Quantity: '1kg',
  //   DisPrice: 110,
  //   image:
  //     'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-3_9.png',
  // },
];

export default ProductData;
