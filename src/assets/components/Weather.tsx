import axios from "axios";

export default function Weather() {
  const APIkey =
  const cityName = "Cairo";

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIkey}`;

  const getWeatherData = async () => {
    try {
      const data = await axios.get(endpoint);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(getWeatherData());

  return;
}
