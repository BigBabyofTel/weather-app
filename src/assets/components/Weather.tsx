import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

export default function Weather() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState({})

  interface WeatherData {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
    main: string;
    description: string;
    name: string;
  }
  useEffect(() => {
    const getWeatherData = async () => {
      const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${apiKey}`;
      try {
        const response: AxiosResponse<WeatherData> = await axios.get(endpoint);
        if (response.status !== 200) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: WeatherData = response.data;
        setData(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    };
    console.log(getWeatherData())
  }, [searchTerm]);

  return (
    <div className="mx-auto">
      <form>
        <input
          className="border-4"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
    </div>
  );
}
