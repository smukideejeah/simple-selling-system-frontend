import { useEffect } from "react";
import { Button, Form, Input, Select, Switch, Modal, Typography, DatePicker } from 'antd';
import type { Discount } from "./Discounts.types";
export function DiscountsFormUI({
    onSubmit,
    initialValues,
    open,
    handleCancel,
    loading,
    searchProduct,
    optionsProducts,
    fetchingProducts
}: {
    onSubmit: (data: Discount) => void;
    initialValues: Partial<Discount> | null;
    open: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    loading: boolean;
    optionsProducts: { label: string; value: string }[];
    fetchingProducts: boolean;
    searchProduct: (search: string) => void;
}){
    
    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues)  form.setFieldsValue(initialValues);
        else  form.resetFields();
    }, [initialValues, form]);

    return <Modal
    open={open}
    onCancel={handleCancel}
    title="Guardar Descuento"
    footer={[
        <Button key="back" onClick={handleCancel} disabled={loading}>
            Cancelar
        </Button>,
    ]}
    >
    <Form form={form} onFinish={(data) => {
        onSubmit(data);
        form.resetFields();
    }}>
        <Typography.Text hidden={!initialValues?.ID}>ID del descuento</Typography.Text>
        <Form.Item<Discount> name="ID" rules={[{required: !!initialValues?.ID, message: 'Por favor, ingrese el nombre del descuento'}]} hidden={!initialValues?.ID}>
            <Input disabled={!!initialValues?.ID}/>
        </Form.Item>
        <Typography.Text>Válido desde</Typography.Text>
        <Form.Item<Discount> name="ValidFrom" rules={[{required: true, message: 'Por favor, Selecciona la fecha de inicio'}]}>
            <DatePicker placeholder="Seleccione la fecha de inicio" format={'YYYY-MM-DD'}/>
        </Form.Item>
        <Typography.Text>Descripción del descuento</Typography.Text>
        <Form.Item<Discount> name="ValidTo" rules={[{required: true, message: 'Por favor, Selecciona la fecha de fin'}]}>
            <DatePicker placeholder="Seleccione la fecha de fin" format={'YYYY-MM-DD'}/>
        </Form.Item>
        <Typography.Text>Producto</Typography.Text>
        <Form.Item<Discount> name="ProductID" rules={[{required: true, message: 'Por favor, ingrese la unidad de medida'}]}>
            <Select 
                showSearch={{
                    filterOption: false,
                    onSearch: searchProduct,
                    
                }}
                notFoundContent={fetchingProducts ? 'Cargando...' : 'No se encontraron productos'}
                placeholder="Seleccione un producto"
                options={optionsProducts}
            />
        </Form.Item>
        <Typography.Text>Porcentaje</Typography.Text>
        <Form.Item<Discount> name="Percentage" rules={[{required: true, message: 'Por favor, ingrese el porcentaje del descuento'}]}>
            <Input placeholder="Porcentaje de descuento" type="number" />
        </Form.Item>
        <Typography.Text>Estado del descuento</Typography.Text>
        <Form.Item<Discount> name="IsActive" >
            <Switch checkedChildren="Activo" unCheckedChildren="Inactivo" />
        </Form.Item>

        <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
                {initialValues?.ID ? 'Actualizar Producto' : 'Crear Producto'}
            </Button>
        </Form.Item>
    </Form>
    </Modal>
}