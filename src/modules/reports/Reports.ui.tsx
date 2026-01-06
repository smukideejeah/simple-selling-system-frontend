import { Table } from "antd";
import type { Top10ReportType } from "./Reports.types";
import { useReports } from "./Reports.hook";

export default function ReportsUI() {
    const hook = useReports();
    return <Table<Top10ReportType>
        loading={hook.loading}
        dataSource={hook.top10ReportData}
        rowKey="ID"
        scroll={{x:  'auto'}}
        pagination={false}
        columns={[
            {title: 'Código', dataIndex: 'productId', key: 'productId'},
            {title: 'Nombre', dataIndex: 'productName', key: 'productName'},
            {title: 'Total Vendido', dataIndex: 'total', key: 'total'}
        ]}
    />
}