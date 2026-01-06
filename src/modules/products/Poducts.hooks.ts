import { useEffect, useState } from 'react';
import type { CreateProduct, NextProductCursor, Product, ProductsPagination, UpdateProduct } from './Products.types';
import { productsService } from '../../shared/di/container';
import { notification } from 'antd';

export function useProducts() {
    const [products, setProducts] = useState<ProductsPagination>({ Products: [], NextCursor: null });
    const [take, setTake] = useState<number>(5);
    const [loading, setLoading] = useState(false);
    const [cursors, setCursors] = useState<(NextProductCursor | null)[]>([]);
    const [currentCursorIndex, setCurrentCursorIndex] = useState<number>(0);
    const [openProductsForm, setOpenProductsForm] = useState<boolean>(false);
    const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

    const nextCursor = async () => {
        const currentCursor = cursors[currentCursorIndex + 1];
        const nextCursor = await load(undefined, currentCursor);
        if(nextCursor) setCursors(prev => {
            const fork = prev.slice(0, currentCursorIndex + 2);
            return [...fork, nextCursor];
        });
        setCurrentCursorIndex(prev => prev + 1);
        
    }

    const showProductsForm = (data?: Product) => {
        setEditingProduct(data || null);
        setOpenProductsForm(true);
    }

    const closeProductsForm = () => {
        
        setOpenProductsForm(false);
        setEditingProduct(null);
    }

    const saveProduct = async(product: UpdateProduct | CreateProduct, ID?: string) => {
        try{
            let title = 'Producto creado';
            let description = 'El producto ha sido creado correctamente';
            if(ID){
                title = 'Producto actualizado';
                description = 'El producto ha sido actualizado correctamente';
                await productsService.update(ID, product as UpdateProduct);
                await dirtyReload();
            }else{
                await productsService.create(product as CreateProduct);
                await cleanReload();
            }
            
            
            closeProductsForm();
            notification.success({
                title,
                description,
                placement: 'topRight',
            });
            
        }catch(error){
            notification.error({
                title: 'Error guardando producto',
                description: 'Ha ocurrido un error al guardar el producto',
                placement: 'topRight',
            });
            throw error;
        }
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
            const data = await productsService.list({
                search,
                take,
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
    }, [take]);

    return {
        products,
        loading,
        take,
        setTake,
        next: nextCursor,
        prev: prevCursor,
        hasNext: products.NextCursor !== null,
        hasPrev: currentCursorIndex > 0,
        search,
        cleanReload,
        dirtyReload,
        showProductsForm,
        openProductsForm,
        editingProduct,
        saveProduct,
        closeProductsForm,
        remove: (id: string) => productsService.delete(id),
        get: (id: string) => productsService.getById(id)
    };
}