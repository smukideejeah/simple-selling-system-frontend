import { useEffect } from "react";
import type { Product } from "./Products.types";
import { Button, Form, Input, Select, Switch, Modal, Typography } from 'antd';
export function ProductsFormUI({
    onSubmit,
    initialValues,
    open,
    handleCancel,
    loading
}: {
    onSubmit: (data: Product) => void;
    initialValues: Partial<Product> | null;
    open: boolean;
    handleOk: () => void;
    handleCancel: () => void;
    loading: boolean;
}){

    const [form] = Form.useForm();

    useEffect(() => {
        if (initialValues)  form.setFieldsValue(initialValues);
        else  form.resetFields();
    }, [initialValues, form]);

    return <Modal
    open={open}
    onCancel={handleCancel}
    title="Guardar Producto"
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
        <Typography.Text hidden={!initialValues?.ID}>ID del producto</Typography.Text>
        <Form.Item<Product> name="ID" rules={[{required: !!initialValues?.ID, message: 'Por favor, ingrese el nombre del producto'}]} hidden={!initialValues?.ID}>
            <Input disabled={!!initialValues?.ID}/>
        </Form.Item>
        <Typography.Text>Código del producto</Typography.Text>
        <Form.Item<Product> name="Code" rules={[{required: true, message: 'Por favor, ingrese el código del producto'}]}>
            <Input placeholder="Código de producto" />
        </Form.Item>
        <Typography.Text>Nombre del producto</Typography.Text>
        <Form.Item<Product> name="Name" rules={[{required: true, message: 'Por favor, ingrese el nombre del producto'}]}>
            <Input placeholder="Nombre de producto" />
        </Form.Item>
        <Typography.Text>Descripción del producto</Typography.Text>
        <Form.Item<Product> name="Description" rules={[{required: true, message: 'Por favor, ingrese la descripción del producto'}]}>
            <Input.TextArea placeholder="Descripción de producto" />
        </Form.Item>
        <Typography.Text>Unidad de medida</Typography.Text>
        <Form.Item<Product> name="Measure" rules={[{required: true, message: 'Por favor, ingrese el nombre del producto'}]}>
            <Select placeholder="Unidad de medida">
                <Select.Option value="KILO">KILO</Select.Option>
                <Select.Option value="LITRO">LITRO</Select.Option>
                <Select.Option value="UNIDAD">UNIDAD</Select.Option>
            </Select>
        </Form.Item>
        <Typography.Text>Precio del producto</Typography.Text>
        <Form.Item<Product> name="Price" rules={[{required: true, message: 'Por favor, ingrese el precio del producto'}]}>
            <Input placeholder="Precio de producto" type="number" />
        </Form.Item>
        <Typography.Text>Estado del producto</Typography.Text>
        <Form.Item<Product> name="IsActive" >
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