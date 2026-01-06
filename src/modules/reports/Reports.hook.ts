import { useEffect, useState } from "react";
import { reportsService } from "../../shared/di/container";
import type { Top10ReportType } from "./Reports.types";
import { notification } from "antd";

export function useReports() {
    const [loading, setLoading] = useState(false);
    const [top10ReportData, setTop10ReportData] = useState<Top10ReportType[]>([]);

    const top10Products = async () => {
        try{
            setLoading(true);
            const data = await reportsService.getTop10Products();
            setTop10ReportData(data);
        }catch(error){
            notification.error({
                message: 'Error al cargar el reporte',
                description: 'Ha ocurrido un error al intentar cargar el reporte de los 10 productos más vendidos.',
                placement: 'topRight',
            });
            console.error('Error loading top 10 products report:', error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        top10Products();
    }, []);

    return {
        loading,
        top10ReportData,
        top10Products,
    }
}