import { Button, Col, Flex, Input, Popconfirm, Row, Select, Space, Table, Tooltip } from "antd";
import { DeleteOutlined, EyeOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import useTableStyle from "../../shared/styles/UseTableStyle";
import { DiscountsFormUI } from "./Discounts.ui.form";
import { useDiscounts } from "./Discounts.hooks";
import type { Discount } from "./Discounts.types";
import dayjs from "dayjs";

export default function DiscountsUI() {
    const hook = useDiscounts();
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
                    <Button type="primary" onClick={() => hook.showDiscountsForm()} >Crear descuento</Button>
                </Flex>
            </Col>
        </Row>

        <Table<Discount>
            className={styles.customTable}
            loading={hook.loading}
            dataSource={hook.discounts.Discounts}
            rowKey="ID"
            scroll={{x:  'auto'}}
            pagination={false}
            columns={[
                {title: 'Fecha de Inicio', dataIndex: 'ValidFrom', key: 'ValidFrom', render: (_, record) => dayjs(record.ValidFrom).format('DD/MM/YYYY')},
                {title: 'Fecha de Fin', dataIndex: 'ValidTo', key: 'ValidTo', render: (_, record) => dayjs(record.ValidTo).format('DD/MM/YYYY')},
                {title: 'Producto', dataIndex: 'ProductID', key: 'ProductID', render: (_, record) => `${record.Product.Code} - ${record.Product.Name}`},
                {title: 'Porcentaje', dataIndex: 'Percentage', key: 'Percentage', render: (value) => `${value}%`},
                {title: 'Activo', dataIndex: 'IsActive', key: 'IsActive', render: (value) => value ? 'Sí' : 'No'},
                {title: 'Acciones', key: 'actions', fixed: true, width: 100, render: (_, record) => <>
                    <Space>
                        <Tooltip title="Ver producto">
                            <Button onClick={async() =>{
                                const discount = await hook.get(record.ID);
                                hook.showDiscountsForm(discount);
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
        <DiscountsFormUI 
            open={hook.openDiscountsForm}
            handleOk={() => {}}
            handleCancel={hook.closeDiscountsForm}
            loading={hook.loading}
            onSubmit={async (data) => {
                await hook.saveDiscount(data, hook.editingDiscount?.ID);
            }}
            initialValues={hook.editingDiscount}
            optionsProducts={hook.optionsProducts}
            fetchingProducts={hook.fetchingProducts}
            searchProduct={hook.searchProducts}
        ></DiscountsFormUI>
    </>;
}