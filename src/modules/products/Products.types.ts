export type Product = {
    ID: string;
    Code: string;
    Name: string;
    Description: string;
    Price: number;
    Measure: 'KILO' | 'LITRO' | 'UNIDAD';
    IsActive: boolean;
    Discount?: {
        Percentage: number;
        IsActive: boolean;
        StartDate: Date;
        EndDate: Date;
    } | null;
};

export type NextProductCursor = {
    ID: string;
    Name: string;
};

export type ProductsPagination = {
    Products: Product[];
    NextCursor: NextProductCursor | null;
}

export type CreateProduct = Omit<Product, 'ID'>;

export type UpdateProduct = Partial<CreateProduct>;

export type ProductsFilter = {
    search?: string;
    cursor?: NextProductCursor;
    take?: number;
};