import { useEffect, useMemo, useState } from 'react';
import type { OrderInput, NextProductCursor, Product, ProductsPagination, OrderCart} from './Orders.types';
import { ordersService } from '../../shared/di/container';
import useAuth from '../../providers/auth/Auth.hook';
import { notification } from 'antd';
import { calculateOrderTotal } from './Orders.calculator';

export function useOrders() {
    const {userId} = useAuth();
    const [products, setProducts] = useState<ProductsPagination>({ Products: [], NextCursor: null });
    const [loading, setLoading] = useState(false);
    const [loadingOrder, setLoadingOrder] = useState(false);
    const [cursors, setCursors] = useState<(NextProductCursor | null)[]>([]);
    const [currentCursorIndex, setCurrentCursorIndex] = useState<number>(0);
    const [items, setItems] = useState<OrderCart[]>([]);
    const [customer, setCustomer] = useState<Pick<OrderInput, 'CustomerName' | 'CustomerLastName' | 'CustomerDNI'>>({
        CustomerDNI: '',
        CustomerName: '',
        CustomerLastName: ''
    });

    //Orders
    const addProduct = (product: Product) => {
        setItems(items => {
            const existing = items.find(i => i.item.ProductID === product.ID);

            if (existing) {
                // ya estaba → suma cantidad
                return items.map(i =>
                i.item.ProductID === product.ID
                    ? { ...i, item: { ...i.item, Qty: i.item.Qty + 1 } }
                    : i
                );
            }

            return [...items, { 
                item: { 
                    ProductID: product.ID,
                    Price: product.Price,
                    Qty: 1,
                    UnitPrice: product.Price,
                    SubTotal: product.Price,
                    TotalDiscount: 0,
                    TotalItem: product.Price
                }, 
                product 
            }];
        });
    };

    const updateQuantity = (id: string, quantity: number) => {
        setItems(items =>
            items.map(i =>
                i.item.ProductID === id
                ? { ...i, item: { ...i.item, Qty: Math.max(1, quantity) } }
                : i
            )
        );
    };

    const total = useMemo(() => calculateOrderTotal(items), [items]);


    const removeItem = (id: string) => {
        setItems(items => items.filter(i => i.item.ProductID !== id));
    };

    const saveOrder = async() => {
        try{
            setLoadingOrder(true);
            const order: OrderInput = {
                ...customer,
                UserId: userId!,
                Items: items.map(i => ({
                    ProductID: i.item.ProductID,
                    Qty: i.item.Qty
                })),
            }
            await ordersService.create(order);
            notification.success({
                title: 'Orden creada',
                description: 'La orden ha sido creada correctamente',
                placement: 'topRight',
            });
            
            setItems([]);
            setCustomer({
                CustomerDNI: '',
                CustomerName: '',
                CustomerLastName: ''
            });
        }catch(error){
            notification.error({
                title: 'Error creando orden',
                description: 'Ha ocurrido un error al crear la orden',
                placement: 'topRight',
            });
            throw error;
        }finally{
            setLoadingOrder(false);
        }
    }

    //Customer
    const onCustomerChange = (customer: Pick<OrderInput, 'CustomerName' | 'CustomerLastName' | 'CustomerDNI'>) => {
        setCustomer(customer);
    };


    const nextCursor = async () => {
        const currentCursor = cursors[currentCursorIndex + 1];
        const nextCursor = await load(undefined, currentCursor);
        if(nextCursor) setCursors(prev => {
            const fork = prev.slice(0, currentCursorIndex + 2);
            return [...fork, nextCursor];
        });
        setCurrentCursorIndex(prev => prev + 1);
        
    }
    
    const prevCursor = async () => {
        if(currentCursorIndex === 0) return;
        const prevCursor = cursors[currentCursorIndex - 1];
        await load(undefined, prevCursor);
        
        setCurrentCursorIndex(prev => prev - 1);
    }

    const search = async (search: string) => {
        setCursors([null]);
        setCurrentCursorIndex(0);
        await load(search);
    }

    const load = async (search?: string, cursor?: NextProductCursor | null) => {
        try{
            setLoading(true);
            const data = await ordersService.listProducts({
                search,
                take: 15,
                cursor: cursor ? cursor : undefined
            });
            setProducts(data);
            return data.NextCursor;
        }finally{
            setLoading(false);
        }
    };

    const cleanReload = async () => {
        setCursors([null]);
        setCurrentCursorIndex(0);
        const cursor = await load();
        if(cursor) setCursors([null, cursor]);
    }

    const dirtyReload = async () => {
        const currentCursor = cursors[currentCursorIndex];
        await load(undefined, currentCursor);
    }



    useEffect(() => {
        load().then(cursor => {
            if(cursor) setCursors([null, cursor]);
        });
    }, []);


    return {
        products,
        loading,
        loadingOrder,
        next: nextCursor,
        prev: prevCursor,
        hasNext: products.NextCursor !== null,
        hasPrev: currentCursorIndex > 0,
        search,
        cleanReload,
        dirtyReload,
        items,
        addProduct,
        updateQuantity,
        total,
        removeItem,
        saveOrder,
        customer,
        onCustomerChange
    };
}