import Weather from "../components/Weather";
import GlobalStyle from "../styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { useState, useEffect } from "react";

export default function Home() {
  const [settings, setSettings] = useState({});

  useEffect(() => {
    localStorage.getItem("settings")
      ? setSettings(JSON.parse(localStorage.getItem("settings")))
      : setSettings({
          darkMode: true,
          deg: "c",
          wind: "ms",
          vis: "km",
          pressure: "mb",
        });
  }, []);

  const theme = {
    background: settings.darkMode ? "#090715" : "#f2f2f2",
    backgroundInfo: settings.darkMode ? "#212653" : "#1936d2",
    textInfo: settings.darkMode ? "#f2f2f2" : "#f2f2f2",
    textInfoSecondary: settings.darkMode ? "#f2f2f2" : "#101010",
    textDesc: settings.darkMode ? "#ccc" : "#bbb",
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Weather settings={settings} setSettings={setSettings} />
      </ThemeProvider>
    </>
  );
}
