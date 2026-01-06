import { createStyles } from "antd-style";

const useTableStyle = createStyles(({ css, token }) => {
    const { antCls } = token as any;
    return {
        customTable: css`
        ${antCls}-table {
            ${antCls}-table-container {
                ${antCls}-table-body,
                ${antCls}-table-content {
                    scrollbar-width: thin;
                    scrollbar-color: #eaeaea transparent;
                }
            }
        }
        `,
    };
});

export default useTableStyle;