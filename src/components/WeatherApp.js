import React, { useState } from "react";
import { TextInput, Space, Container, Text, Center, Box, Table, Button, SegmentedControl } from "@mantine/core";
import { Search } from "tabler-icons-react";
import axios from "axios";

import WeatherDetails from "./WeatherDetails";

// Replace with your own openweather api key
// IMPORTANT: in production, this should be stored as an environment variable on the server
const apiKey = "";

export default function WeatherApp() {
    const [value, setValue] = useState("");
    const [geoCoordinates, setGeoCoordinates] = useState([]);
    const [details, setDetails] = useState(null);
    const [units, setUnits] = useState("standard");
    const [unitsUsed, setUnitsUsed] = useState("standard");

    const getWeather = (lat, lon) => {
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`)
            .then((res) => {
                setDetails(res.data);
                setUnitsUsed(units);
            }).catch((err) => {
                alert(err);
            })
    }

    const getGeoCoordinates = () => {
        axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${apiKey}`)
            .then((res) => {
                setGeoCoordinates(res.data);
            }).catch((err) => {
                alert(err);
            })
    }

    const rows = geoCoordinates.map((g, i) => {
        return <tr key={i}>
            <td>{g.country}</td>
            <td>{g.name}</td>
            <td>{g.state}</td>
            <td>{g.lat}</td>
            <td>{g.lon}</td>
            <td>
                <Button variant="outline" onClick={() => {
                    getWeather(g.lat, g.lon)
                }}>
                    Get Weather
                </Button>
            </td>
        </tr>
    })

    const handleKeyDown = e => {
        if (e.key === "Enter") {
            getGeoCoordinates();
        }
    }

    const handleChange = e => {
        setValue(e.target.value);
    }


    return (
        <Container>
            <div style={{ display: "flex", alignItems: "center" }}>
                <Text mr="xs">
                    Units:
                </Text>
                <SegmentedControl
                    value={units}
                    onChange={setUnits}
                    data={[
                        {
                            value: "standard",
                            label: <Center>
                                <Box>Kelvin</Box>
                            </Center>
                        },
                        {
                            value: "metric",
                            label: <Center>
                                <Box>Celsius</Box>
                            </Center>
                        },
                        {
                            value: "imperial",
                            label: <Center>
                                <Box>Fahrenheit</Box>
                            </Center>
                        }
                    ]}
                />
            </div>

            <Space h="lg" />

            <TextInput icon={<Search />} sx={{
                width: "500px",
                maxWidth: "100%"
            }}
                value={value}
                onKeyDown={handleKeyDown}
                onChange={handleChange}
                placeholder="City Name (e.g. London)"
            />
            <Space h="lg" />
            <Table>
                <thead>
                    <tr>
                        <th>Country</th>
                        <th>Name</th>
                        <th>State</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </Table>

            <Space h="md" />

            <WeatherDetails units={unitsUsed} details={details} />
        </Container>
    )


}