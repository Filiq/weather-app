import axios from "axios";

export default async (req, res) => {
  const type = req.query.type;
  const lat = req.query.lat;
  const lon = req.query.lon;
  const city = req.query.city;

  if (type === "coords") {
    const { data } = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API}&q=${lat},${lon}&days=5&aqi=no&alerts=no`
    );

    res.json(data);
  }

  if (type === "city") {
    const { data } = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API}&q=${city}&days=5&aqi=no&alerts=no`
    );

    res.json(data);
  }
};
