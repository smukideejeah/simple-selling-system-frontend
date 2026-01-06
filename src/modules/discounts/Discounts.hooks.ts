import { useEffect, useState } from 'react';
import { notification } from 'antd';
import type { CreateDiscount, Discount, DiscountPagination, UpdateDiscount } from './Discounts.types';
import { discountsService, productsService } from '../../shared/di/container';
import dayjs from 'dayjs';

export function useDiscounts() {
    const [discounts, setDiscounts] = useState<DiscountPagination>({ Discounts: [], NextCursor: null });
    const [take, setTake] = useState<number>(5);
    const [loading, setLoading] = useState(false);
    const [cursors, setCursors] = useState<(string | null)[]>([]);
    const [currentCursorIndex, setCurrentCursorIndex] = useState<number>(0);
    const [openDiscountsForm, setOpenDiscountsForm] = useState<boolean>(false);
    const [editingDiscount, setEditingDiscount] = useState<Partial<Discount> | null>(null);
    const [optionsProducts, setOptionsProducts] = useState<{ label: string; value: string }[]>([]);
    const [fetchingProducts, setFetchingProducts] = useState(false);

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

    const showDiscountsForm = (data?: Discount) => {
        const discountInForm = data ? {
            ...data,
            ValidFrom: dayjs(data.ValidFrom),
            ValidTo: dayjs(data.ValidTo),
        } : null;
        setEditingDiscount(discountInForm);
        setOpenDiscountsForm(true);
    }

    const closeDiscountsForm = () => {
        
        setOpenDiscountsForm(false);
        setEditingDiscount(null);
    }

    const saveDiscount = async(discount: UpdateDiscount | CreateDiscount, ID?: string) => {
        try{
            let title = 'Descuento creado';
            let description = 'El descuento ha sido creado correctamente';
            if(ID){
                title = 'Descuento actualizado';
                description = 'El descuento ha sido actualizado correctamente';
                await discountsService.update(ID, discount as UpdateDiscount);
                await dirtyReload();
            }else{
                await discountsService.create(discount as CreateDiscount);
                await cleanReload();
            }
            
            closeDiscountsForm();
            notification.success({
                title,
                description,
                placement: 'topRight',
            });
            
        }catch(error){
            notification.error({
                title: 'Error guardando descuento',
                description: 'Ha ocurrido un error al guardar el descuento',
                placement: 'topRight',
            });
            throw error;
        }
    }

    const searchProducts = async (value: string) => {
        if (!value) {
            setOptionsProducts([]);
            return;
        }

        setFetchingProducts(true);
        try {
            const res = await productsService.list({
            search: value,
            take: 10,
            });

            setOptionsProducts(
                res.Products.filter(p => !p.Discount).map(p => ({
                    label: `${p.Code} - ${p.Name}`,
                    value: p.ID,
                }))
            );
        } finally {
            setFetchingProducts(false);
        }
    };

    const search = async (search: string) => {
        setCursors([null]);
        setCurrentCursorIndex(0);
        await load(search);
    }

    const load = async (search?: string, cursor?: string | null) => {
        try{
            setLoading(true);
            const data = await discountsService.list({
                search,
                take,
                cursor: cursor ? cursor : undefined
            });
            setDiscounts(data);
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
        discounts,
        loading,
        take,
        setTake,
        next: nextCursor,
        prev: prevCursor,
        hasNext: discounts.NextCursor !== null,
        hasPrev: currentCursorIndex > 0,
        search,
        cleanReload,
        dirtyReload,
        showDiscountsForm,
        openDiscountsForm,
        editingDiscount,
        saveDiscount,
        closeDiscountsForm,
        optionsProducts,
        fetchingProducts,
        searchProducts,
        remove: (id: string) => discountsService.delete(id),
        get: (id: string) => discountsService.getById(id)
    };
}