import type React from "react";

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

export type ProductWKey = {
    ID: string;
    key: React.Key;
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

export type ProductsFilter = {
    search?: string;
    cursor?: NextProductCursor;
    take?: number;
};

export type OrderItem = {
    ProductID: string;
    UnitPrice: number;
    Qty: number;
    SubTotal: number;
    TotalDiscount: number;
    TotalItem: number;
}

export type OrderCart = {
    item: OrderItem;
    product: Product;
}

export type Order = {
    ID: string;
    UserID: string;
    CustomerName?: string | null;
    CustomerLastName?: string | null;
    CustomerDNI?: string | null;
    Total: number;
    CreatedAt: Date;
    Items: OrderItem[];
};

export type OrderInput = {
    UserId: string;
    CustomerName?: string;
    CustomerLastName?: string;
    CustomerDNI?: string;
    Items: {
        ProductID: string;
        Qty: number;
    }[];
};