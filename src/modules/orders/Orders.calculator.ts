import type { OrderCart } from "./Orders.types";

export function calculateOrderTotal(items: OrderCart[], now = new Date()): number {
  return items.reduce((acc, i) => {
    let unitDiscount = 0;

    const discount = i.product.Discount;
    if (discount?.isActive) {
      if (
        now >= new Date(discount.startDate) &&
        now <= new Date(discount.endDate)
      ) {
        unitDiscount = (i.item.UnitPrice * discount.percentage) / 100;
      }
    }

    const subTotal = i.item.UnitPrice * i.item.Qty;
    const totalDiscount = unitDiscount * i.item.Qty;
    const totalItem = subTotal - totalDiscount;

    return acc + totalItem;
  }, 0);
}