import type { OrderCart } from "./Orders.types";

export function calculateOrderTotal(items: OrderCart[], now = new Date()): number {
  return items.reduce((acc, i) => {
    let unitDiscount = 0;

    const discount = i.product.Discount;
    if (discount?.IsActive) {
      if (
        now >= new Date(discount.StartDate) &&
        now <= new Date(discount.EndDate)
      ) {
        unitDiscount = (i.item.UnitPrice * discount.Percentage) / 100;
      }
    }

    const subTotal = i.item.UnitPrice * i.item.Qty;
    const totalDiscount = unitDiscount * i.item.Qty;
    console.log('subTotal, totalDiscount', subTotal, totalDiscount, unitDiscount);
    const totalItem = subTotal - totalDiscount;

    return acc + totalItem;
  }, 0);
}