import { describe, it, expect, vi } from 'vitest';
import { ProductsService } from './Products.service';

describe('ProductsService', () => {

    it('calls api.create when product is valid', async () => {
        const apiMock = {
            create: vi.fn().mockResolvedValue({})
        };

        const service = new ProductsService(apiMock as any);

        await service.create({
            code: 'P001',
            name: 'Producto',
            price: 100
        } as any);

        expect(apiMock.create).toHaveBeenCalled();
    });
});
