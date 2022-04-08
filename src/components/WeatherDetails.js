import { Grid, Card, Text, Title, ThemeIcon, Space } from "@mantine/core";
import { MapPin, Temperature, Cloud } from "tabler-icons-react";

export default function WeatherDetails({ units, details }) {
    if (!details) {
        return null;
    }

    const renderTemperature = (value) => {
        if (units === "metric") {
            return `${value}\u00b0C`;
        }
        if (units === "imperial") {
            return `${value}\u00b0F`
        }
        return `${value}\u212A`
    }

    return (
        <div>
            <Grid>
                <Grid.Col md={6} sm={12}>
                    <div style={{ margin: 'auto' }}>
                        <Card shadow="md" p="lg">
                            <div style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <ThemeIcon mr="xs" variant="light">
                                    <MapPin />
                                </ThemeIcon>
                                <Title order={3}>
                                    Coordinates
                                </Title>
                            </div>

                            <Space h="sm" />

                            <Text>
                                Latitude: {details.coord.lat}
                            </Text>

                            <Text>
                                Longitude: {details.coord.lon}
                            </Text>

                            <Space h="lg" />

                            <div style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <ThemeIcon mr="xs" variant="light">
                                    <Cloud />
                                </ThemeIcon>
                                <Title order={3}>
                                    Weather
                                </Title>
                            </div>

                            <Space h="sm" />

                            <div style={{ display: "flex" }}>
                                <img src={`http://openweathermap.org/img/wn/${details.weather[0].icon}.png`}
                                    style={{
                                        marginRight: "8px"
                                    }} />
                                <div>
                                    <Text>{details.weather[0].main}</Text>
                                    <Text size="sm">{details.weather[0].description}</Text>
                                </div>
                            </div>


                        </Card>
                    </div>
                </Grid.Col>

                <Grid.Col md={6} sm={12}>
                    <div style={{ margin: 'auto' }}>
                        <Card shadow="md" p="lg">
                            <div style={{
                                display: "flex",
                                alignItems: "center"
                            }}>
                                <ThemeIcon mr="xs" variant="light">
                                    <Temperature />
                                </ThemeIcon>
                                <Title order={3}>
                                    Main
                                </Title>
                            </div>

                            <Space h="sm" />

                            <Text>
                                Temperature: {renderTemperature(details.main.temp)}
                            </Text>

                            <Text>
                                Feels Like: {renderTemperature(details.main.feels_like)}
                            </Text>
                            <Text>
                                Temperature Min: {renderTemperature(details.main.temp_min)}
                            </Text>
                            <Text>
                                Temperature Max: {renderTemperature(details.main.temp_max)}
                            </Text>
                            <Text>
                                Pressure: {details.main.pressure}
                            </Text>
                            <Text>
                                Humidity: {details.main.humidity}
                            </Text>
                        </Card>
                    </div>
                </Grid.Col>
            </Grid>
        </div>
    )
}