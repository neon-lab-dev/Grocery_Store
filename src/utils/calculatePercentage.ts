export function calculateDiscountPercentage(DisPrice: number, Price: number): number {
    return ((DisPrice - Price) / DisPrice) * 100;
  }