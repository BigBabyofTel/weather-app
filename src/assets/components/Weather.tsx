import axios from "axios";

export default function Weather() {
  const APIkey = "982f45c73f249b6ad789f61b951da41c"
  const cityName = "Cairo";

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;

  interface WeatherData {
    temp: number,
    feels_like: number,
    temp_min: number, 
    temp_max: number,
    humidity: number,
    main: string,
    description: string,
    name: string

  }

  const getWeatherData:Promise<WeatherData> = async () => {
    try {
      const data = await axios.get(endpoint);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {getWeatherData}
    </div>
  );
}
