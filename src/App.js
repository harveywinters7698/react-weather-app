import { AppShell, Header, Text } from "@mantine/core";

import WeatherApp from "./components/WeatherApp";
 
function App() {
  return (
    <AppShell
      fixed
      header={
        <Header height={50} p="md">
          <div style={{
            display: "flex",
            alignItems: "center",
            height: "100%"
          }}>
            <Text>
              Weather App
            </Text>
          </div>
        </Header>
      }
      > 
        <WeatherApp />
      </AppShell>
  );
}

export default App;
