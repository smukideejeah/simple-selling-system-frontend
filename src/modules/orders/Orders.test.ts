import { calculateOrderTotal } from './Orders.calculator';
import type { OrderCart } from './Orders.types';

describe('calculateOrderTotal', () => {
  it('calculates total without discount', () => {
    //Arrange
    const items: OrderCart[] = [
      {
        item: {
          ProductID: 'p1',
          Qty: 2,
          UnitPrice: 100,
        },
        product: {
          ID: 'p1',
          Discount: null,
        },
      } as any,
    ];

    //Act
    const total = calculateOrderTotal(items);

    //Assert
    expect(total).toBe(200);
  });

    it('applies active discount within date range', () => {
        // Arrange
        const now = new Date('2025-01-15');

        const items: OrderCart[] = [{
            item: {
                ProductID: 'p1',
                Qty: 2,
                UnitPrice: 100,
            },
            product: {
                ID: 'p1',
                Discount: {
                    isActive: true,
                    percentage: 10,
                    startDate: '2025-01-01',
                    endDate: '2025-01-31',
                },
            }
        } as any];

        const total = calculateOrderTotal(items, now);

        expect(total).toBe(180);
    });
});