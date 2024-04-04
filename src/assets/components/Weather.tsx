import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const apiKey = import.meta.env.VITE_API_KEY;

interface WeatherInfo {
  city: string;
  temp: number | undefined;
  feelslike: undefined | number;
  description: string;
  image: string;
}

export default function Weather() {
  const [searchTerm, setSearchTerm] = useState("");
  const [temp, setTemp] = useState();
  const [feelsLike, setFeelsLike] = useState();
  const [description, setDescription] = useState();
  const [icon, setIcon] = useState();

  const getWeatherData = useCallback(async () => {
    try {
      const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=${apiKey}`;
      const response = await axios.get(endpoint); // Use 'axios.get' directly

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = response.data; // Destructure directly
      setTemp(data.main.temp);
      setFeelsLike(data.main.feels_like);
      setDescription(data.weather[0].description);
      setIcon(data.weather[0].icon);
      return data;
    } catch (error) {
      console.error(error); // Use console.error for errors
    }
  }, [searchTerm]); // Include dependencies

  useEffect(() => {
    getWeatherData();
  }, [getWeatherData]);

  if (temp === undefined) {
    return (
      <input
        className="border-2 w-full text-center p-2 mb-10"
        type="text"
        placeholder="name of city"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    );
  }
  if (feelsLike === undefined) return;
  if (description === undefined) return;

  const weatherInfo: WeatherInfo = {
    city: searchTerm,
    temp: Math.round(temp),
    feelslike: Math.round(feelsLike),
    description: description,
    image: `https://openweathermap.org/img/wn/${icon}.png`,
  };

  return (
    <div className="mx-auto flex justify-center flex-col">
      <form>
        <input
          className="border-2 w-full text-center p-2 mb-10"
          type="text"
          placeholder="name of city"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </form>
      {searchTerm ? (
        <div className="flex flex-col bg-slate-200 text-center p-5 my-32 text-3xl">
          City: {weatherInfo.city}
          <br />
          Current temp: {weatherInfo.temp}
          <br />
          Feels like: {weatherInfo.feelslike}
          <br />
          Description: {weatherInfo.description}
          <br />
          <section className="flex justify-center">
            <img className="w-[30%] lg:w-[10%]" src={weatherInfo.image} />
          </section>
        </div>
      ) : (
        <h1 className="text-2xl text-center">Please enter a city name</h1>
      )}
    </div>
  );
}
