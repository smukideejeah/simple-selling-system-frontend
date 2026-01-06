import { describe, it, expect, vi } from 'vitest';
import { DiscountsService } from './Discounts.service';

describe('ProductsService', () => {

    it('calls api.create when product is valid', async () => {
        const apiMock = {
            create: vi.fn().mockResolvedValue({})
        };

        const service = new DiscountsService(apiMock as any);

        await service.create({
            ProductID: 'D001',
            name: 'Descuento',
            percentage: 10,
            ValidFrom: new Date(),
            ValidTo: new Date(),
            IsActive: true
        } as any);

        expect(apiMock.create).toHaveBeenCalled();
    });
});
