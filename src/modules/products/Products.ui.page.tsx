import { Button, Col, Flex, Input, Popconfirm, Row, Select, Space, Table, Tooltip } from "antd";
import { useProducts } from "./Poducts.hooks";
import type { Product } from "./Products.types";
import { DeleteOutlined, EyeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import useTableStyle from "../../shared/styles/UseTableStyle";
import { ProductsFormUI } from "./Products.ui.form";

export default function ProductsUI() {
    const hook = useProducts();
    const { styles } = useTableStyle();
    

    return <>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col key="col1" lg={{flex: '50%'}} sm={{flex: '100%'}}>
                <Space orientation="horizontal" size="middle">
                    <Input.Search placeholder="Buscar productos..." onSearch={value => hook.search(value)} />
                    <Select placeholder="Paginación" value={hook.take} onChange={value => hook.setTake(value)}>
                        <Select.Option value={5}>5 por página</Select.Option>
                        <Select.Option value={10}>10 por página</Select.Option>
                        <Select.Option value={25}>25 por página</Select.Option>
                        <Select.Option value={50}>50 por página</Select.Option>
                        <Select.Option value={100}>100 por página</Select.Option>
                    </Select>
                </Space>
            </Col>
            <Col key="col2" lg={{flex: '50%'}} sm={{flex: '100%'}}>
                <Flex justify="end" gap="small">
                    <Button onClick={() => hook.cleanReload()}>Refrescar</Button>
                    <Button type="primary" onClick={() => hook.showProductsForm()} >Crear producto</Button>
                </Flex>
            </Col>
        </Row>

        <Table<Product>
            className={styles.customTable}
            loading={hook.loading}
            dataSource={hook.products.Products}
            rowKey="ID"
            scroll={{x:  'auto'}}
            pagination={false}
            columns={[
                {title: 'ID', dataIndex: 'ID', key: 'ID'},
                {title: 'Código', dataIndex: 'Code', key: 'Code'},
                {title: 'Nombre', dataIndex: 'Name', key: 'Name'},
                {title: 'Descripción', dataIndex: 'Description', key: 'Description'},
                {title: 'Precio', dataIndex: 'Price', key: 'Price'},
                {title: 'Medida', dataIndex: 'Measure', key: 'Measure'},
                {title: 'Activo', dataIndex: 'IsActive', key: 'IsActive', render: (value) => value ? 'Sí' : 'No'},
                {title: 'Descuento', dataIndex: 'Discount', key: 'Discount', render: (value) => value ? (value.isActive ? `Sí (${value.percentage}%)` : 'No') : 'No' },
                {title: 'Acciones', key: 'actions', fixed: true, width: 100, render: (_, record) => <>
                    <Space>
                        <Tooltip title="Ver producto">
                            <Button onClick={async() =>{
                                const product = await hook.get(record.ID);
                                hook.showProductsForm(product);
                            }}>
                                <EyeOutlined />
                            </Button>
                        </Tooltip>
                        <Popconfirm
                            title="Eliminar producto"
                            description="¿Estás seguro de eliminar este producto?"
                            onConfirm={async () => hook.remove(record.ID).then(() => hook.dirtyReload())}
                            okText="Sí"
                            cancelText="No"
                        >
                            <Tooltip title="Eliminar producto">
                                <Button danger >
                                    <DeleteOutlined />
                                </Button>
                            </Tooltip>
                        </Popconfirm>
                    </Space>
                </>}
            ]}
        />
        <Flex justify="center" align="center" gap="small" style={{ marginTop: 16 }}>
            <Button
                icon={<LeftOutlined />}
                disabled={!hook.hasPrev}
                onClick={async () => {
                    await hook.prev();
                }}
            />
            <Button
                icon={<RightOutlined />}
                disabled={!hook.hasNext}
                onClick={async () => {
                    await hook.next();
                }}
            />
        </Flex>
        <ProductsFormUI 
            open={hook.openProductsForm}
            handleOk={() => {}}
            handleCancel={hook.closeProductsForm}
            loading={hook.loading}
            onSubmit={async (data) => {
                console.log('Submitting product form...', data, hook.editingProduct?.ID);
                await hook.saveProduct(data, hook.editingProduct?.ID);
            }}
            initialValues={hook.editingProduct}
        ></ProductsFormUI>
    </>;
}