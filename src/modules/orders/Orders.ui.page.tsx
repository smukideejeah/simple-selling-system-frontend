import { Button, Card, Col, Divider, Flex, Input, InputNumber, List, Row, Space, Table, Typography } from "antd";
import { useOrders } from "./Orders.hook";
import { DeleteOutlined, SaveOutlined } from "@ant-design/icons";
import useTableStyle from "../../shared/styles/UseTableStyle";
import { useState } from "react";

export default function OrdersUI() {
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const hook = useOrders();
    const { styles } = useTableStyle();
    

    return <>
        <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col key="col1" lg={{flex: '50%'}} sm={{flex: '100%'}}>
                <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
                    <Col key="col1" lg={{flex: '50%'}} sm={{flex: '100%'}}>
                        <Space orientation="horizontal" size="middle">
                            <Input.Search placeholder="Buscar productos..." onSearch={value => hook.search(value)} />
                        </Space>
                    </Col>
                    <Col key="col2" lg={{flex: '50%'}} sm={{flex: '100%'}}>
                        <Flex justify="end" gap="small">
                            <Button
                                type="primary"
                                disabled={!selectedRowKeys.length}
                                onClick={() => {
                                const selectedProducts = hook.products.Products.filter(p =>
                                    selectedRowKeys.includes(p.ID)
                                );

                                selectedProducts.forEach(hook.addProduct);
                                // 🔥 CLAVE: limpiar selección
                                setSelectedRowKeys([]);
                                }}
                            >
                                Agregar al carrito
                            </Button>
                            <Button onClick={() => hook.cleanReload()}>Refrescar</Button>
                        </Flex>
                    </Col>
                </Row>

                <Table
                    className={styles.customTable}
                    loading={hook.loading}
                    dataSource={hook.products.Products}
                    rowSelection={{
                        selectedRowKeys,
                        onChange: setSelectedRowKeys,
                    }}
                    rowKey="ID"
                    scroll={{x:  'auto'}}
                    pagination={false}
                    columns={[
                        {title: 'Código', dataIndex: 'Code', key: 'Code'},
                        {title: 'Nombre', dataIndex: 'Name', key: 'Name'},
                        {title: 'Precio', dataIndex: 'Price', key: 'Price'},
                        {title: 'Medida', dataIndex: 'Measure', key: 'Measure'},
                        {title: 'Activo', dataIndex: 'IsActive', key: 'IsActive', render: (value) => value ? 'Sí' : 'No'},
                        {title: 'Descuento', dataIndex: 'Discount', key: 'Discount', render: (value) => {
                            return value ? (value.isActive ? `Sí (${value.percentage}%)` : 'No') : 'No';
                        }},
                    ]}
                />
            </Col>
            <Col key="col2" lg={{flex: '50%'}} sm={{flex: '100%'}}>
                <Card title="Resumen de la orden">
                    <Space orientation="vertical" style={{ width: "100%" }}>
                        <Input
                        placeholder="Nombre del cliente"
                        value={hook.customer.CustomerName}
                        
                        onChange={(e) =>
                            hook.onCustomerChange({ ...hook.customer, CustomerName: e.target.value })
                        }
                        />

                        <Input 
                            placeholder="Apellido del cliente"
                            value={hook.customer.CustomerLastName}
                            onChange={(e) =>
                                hook.onCustomerChange({ ...hook.customer, CustomerLastName: e.target.value })
                            }
                        />

                        <Input
                        placeholder="Cédula / NIT"
                        value={hook.customer.CustomerDNI}
                        onChange={(e) =>
                            hook.onCustomerChange({ ...hook.customer, CustomerDNI: e.target.value })
                        }
                        />
                    </Space>
                    <List
                        dataSource={[...hook.items]}
                        renderItem={(item) => {
                        return (
                            <List.Item>
                            <Row style={{ width: "100%" }} align="middle">
                                <Col span={8}>
                                <Typography.Text>{item.product.Name}</Typography.Text>
                                </Col>
                                <Col span={4} style={{ textAlign: "right" }}>
                                <InputNumber
                                    min={1}
                                    value={item.item.Qty}
                                    onChange={(value) =>{
                                        //onQuantityChange(item.item.ProductID, Number(value))
                                        hook.updateQuantity(item.item.ProductID, Number(value));
                                    }}
                                />
                                </Col>

                                <Col span={4} style={{ textAlign: "right" }}>
                                <Typography.Text>${item.item.UnitPrice.toFixed(2)}</Typography.Text>
                                </Col>

                                <Col span={4} style={{ textAlign: "right" }}>
                                <Typography.Text strong>${(item.item.TotalItem).toFixed(2)}</Typography.Text>
                                </Col>
                                <Col span={3} style={{ textAlign: "right" }}>
                                    <Button
                                        danger
                                        type="text"
                                        icon={<DeleteOutlined />}
                                        onClick={() => hook.removeItem(item.product.ID)}
                                    />
                                </Col>

                            </Row>
                            </List.Item>
                        );
                        }}
                    />

                    <Divider />

                    <Row justify="end">
                        <Col>
                            <Space size="large" align="center">
                                <Typography.Title level={4} style={{ margin: 0 }}>
                                Total: ${hook.total.toFixed(2)}
                                </Typography.Title>

                                <Button
                                type="primary"
                                icon={<SaveOutlined />}
                                disabled={hook.items.length === 0}
                                onClick={hook.saveOrder}
                                loading={hook.loadingOrder}
                                >
                                Guardar orden
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </>;
}