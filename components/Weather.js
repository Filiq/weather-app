import Today from "./Today";
import Search from "./Search";
import Settings from "./Settings";
import NextDays from "./NextDays";
import MoreWeatherInfo from "./MoreWeatherInfo";
import Mapbox from "./Mapbox";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ settings, setSettings }) => {
  const [isSearching, setIsSearching] = useState(false);
  const [isSettings, setIsSettings] = useState(false);
  const [isMapbox, setIsMapbox] = useState(false);
  const [location, setLocation] = useState({
    latitude: 51.509865,
    longitude: -0.118092,
  });
  const [weather, setWeather] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
      enableHighAccuracy: true,
    });
  }, []);

  const successLocation = (position) => {
    const {
      coords: { latitude, longitude },
    } = position;

    setLocation({ latitude, longitude });

    getWeather([latitude, longitude], "coords");
  };

  const getWeather = async (location, type) => {
    setIsLoading(true);
    if (type === "coords") {
      try {
        const { data } = await axios.get(
          `api/weather?type=coords&lat=${location[0]}&lon=${location[1]}`
        );

        setWeather(data);
      } catch (err) {}
      setIsLoading(false);
    }

    if (type === "city") {
      try {
        const { data } = await axios.get(
          `api/weather?type=city&city=${location}`
        );

        setLocation({
          latitude: data.location.lat,
          longitude: data.location.lon,
        });

        setWeather(data);

        setIsLoading(false);

        return true;
      } catch (err) {
        setIsLoading(false);

        return false;
      }
    }
  };

  const errorLocation = () => {
    getWeather("London", "city");
  };

  return (
    <SCWeather>
      <Settings
        isSettings={isSettings}
        setIsSettings={setIsSettings}
        settings={settings}
        setSettings={setSettings}
      />

      <Today
        setIsSearching={setIsSearching}
        setIsMapbox={setIsMapbox}
        currentWeather={weather && weather.current}
        weatherLocation={weather && weather.location}
        isLoading={isLoading}
        setIsMapbox={setIsMapbox}
        settings={settings}
      />

      <Search
        isSearching={isSearching}
        setIsSearching={setIsSearching}
        getWeather={getWeather}
      />

      {isSearching ? (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            zIndex: 9,
          }}
        ></div>
      ) : (
        <></>
      )}

      <Mapbox
        isMapbox={isMapbox}
        setIsMapbox={setIsMapbox}
        location={location}
        getWeather={getWeather}
      />

      <SCSideContainer>
        <NextDays
          forecast={weather && weather.forecast}
          isLoading={isLoading}
          setIsSettings={setIsSettings}
          settings={settings}
        />

        <MoreWeatherInfo
          currentWeather={weather && weather.current}
          isLoading={isLoading}
          settings={settings}
        />
      </SCSideContainer>

      {isSearching || isMapbox ? (
        <style jsx global>
          {`
            body {
              overflow: hidden;
            }
          `}
        </style>
      ) : (
        <style jsx global>
          {`
            body {
              overflow: initial;
            }
          `}
        </style>
      )}
    </SCWeather>
  );
};

export default Weather;

const SCWeather = styled.div`
  min-height: 100vh;
  display: flex;

  @media (max-width: 1440px) {
    flex-direction: column;
  }
`;

const SCSideContainer = styled.div`
  min-height: 100%;
  width: 68vw;

  @media (max-width: 1440px) {
    width: 100%;
  }
`;
