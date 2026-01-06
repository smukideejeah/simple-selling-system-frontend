import { useState } from "react";
import ThemeContext from "./theme.context";
import { ConfigProvider, theme } from "antd";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [darkMode, setDarkMode] = useState<boolean>(false);

    const toggleDarkMode = () => {
        setDarkMode(prev => {

            return !prev;
        });

    };

    return (
        <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <ConfigProvider theme={{ algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm }}>
                {children}
            </ConfigProvider>
        </ThemeContext.Provider>
    );
}