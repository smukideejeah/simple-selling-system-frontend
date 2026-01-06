import type dayjs from "dayjs";

export type Discount = {
    ID: string;
    ProductID: string;
    Percentage: number;
    ValidFrom: Date | dayjs.Dayjs;
    ValidTo: Date | dayjs.Dayjs;
    IsActive: boolean;
    Product: {
        ID: string;
        Code: string;
        Name: string;
        Description: string;
        Price: number;
        Measure: 'KILO' | 'LITRO' | 'UNIDAD';
        IsActive: boolean;
    };
};

export type DiscountInput = {
    ProductID: string;
    Percentage: number;
    ValidFrom: Date;
    ValidTo: Date;
    IsActive: boolean;
};

export type DiscountPagination = {
    Discounts: Discount[];
    NextCursor: string | null;
}

export type CreateDiscount = Omit<Discount, 'ID'>;

export type UpdateDiscount = Partial<CreateDiscount>;

export type DiscountsFilter = {
    search?: string;
    cursor?: string;
    take?: number;
};