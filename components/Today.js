import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faMapMarkedAlt,
} from "@fortawesome/free-solid-svg-icons";
import ReactLoading from "react-loading";
import moment from "moment";
import styled from "styled-components";

const Today = ({
  setIsSearching,
  setIsMapbox,
  weatherLocation,
  currentWeather,
  isLoading,
  settings,
}) => {
  return (
    <SCToday>
      <SCSearch>
        <button onClick={() => setIsSearching(true)}>Search</button>
        <FontAwesomeIcon
          icon={faMapMarkedAlt}
          onClick={() => setIsMapbox(true)}
        />
      </SCSearch>
      {isLoading ? (
        <SCLoading>
          <ReactLoading
            type={"spin"}
            color={"#fff"}
            height={"20%"}
            width={"20%"}
          />
        </SCLoading>
      ) : (
        <>
          <SCWeatherIcon>
            <img
              src={currentWeather.condition.icon.replace("64x64", "128x128")}
              alt=""
            />
          </SCWeatherIcon>
          <SCTemp>
            {
              <h2>
                {settings.deg === "c"
                  ? currentWeather.temp_c
                  : settings.deg === "f"
                  ? currentWeather.temp_f
                  : (currentWeather.temp_c * 273.15).toFixed(1)}
              </h2>
            }
            <span>
              {settings.deg === "c" ? "°C" : settings.deg === "f" ? "°F" : "K"}
            </span>
          </SCTemp>
          <SCWeatherType>
            <h3>{currentWeather.condition.text}</h3>
          </SCWeatherType>
          <SCDateAndPlace>
            <SCDate>
              <h4>Today - {moment().format("ddd, D MMM")}</h4>
            </SCDate>
            <SCPlace onClick={() => setIsMapbox(true)}>
              <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
              <h4>
                {weatherLocation.name}, {weatherLocation.country}
              </h4>
            </SCPlace>
          </SCDateAndPlace>
        </>
      )}
    </SCToday>
  );
};

export default Today;

const SCToday = styled.div`
  width: 32vw;
  min-height: 100vh;
  background-color: ${(props) => props.theme.backgroundInfo};
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1440px) {
    width: 100%;
  }
`;

const SCSearch = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 10%;

  button {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.5rem 3rem;
    margin-right: 2.5rem;
    background: #f53357;
    border: 0;
    color: #f2f2f2;
    cursor: pointer;
    transition: all 0.1s ease;
    border-radius: 2rem;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      transform: scale(0.99);
    }
  }

  svg {
    margin-left: 2.5rem;
    color: #f53357;
    width: 2rem;
    transition: all 0.1s ease;
    cursor: pointer;

    &:hover {
      opacity: 0.9;
    }

    &:active {
      transform: scale(0.98);
    }
  }

  @media screen and (max-width: 1440px) {
    margin-top: 2rem;
  }

  @media screen and (max-width: 520px) {
    margin-top: 2rem;
    justify-content: center;
  }
`;

const SCLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const SCWeatherIcon = styled.div`
  height: 40%;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 30%;
  }

  @media screen and (max-width: 1440px) {
    margin-top: 5rem;

    img {
      width: calc(5rem + 10%);
    }
  }
`;

const SCTemp = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10%;

  h2 {
    color: ${(props) => props.theme.textInfo};
    font-size: 7.5rem;

    @media screen and (max-width: 520px) {
      font-size: calc(1.5vw + 4rem);
    }
  }

  span {
    color: ${(props) => props.theme.textDesc};
    font-weight: 500;
    font-size: 3rem;
  }

  @media screen and (max-width: 1440px) {
    margin-top: 2.5rem;
  }
`;

const SCWeatherType = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 15%;

  h3 {
    color: ${(props) => props.theme.textDesc};
    font-size: 2rem;
  }

  @media screen and (max-width: 1440px) {
    margin-top: 0.5rem;
  }
`;

const SCDateAndPlace = styled.div`
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 1440px) {
    margin-top: 5rem;
  }
`;

const SCDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  h4 {
    color: ${(props) => props.theme.textDesc};
    font-weight: 400;
  }
`;

const SCPlace = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100;
  cursor: pointer;
  transition: all 0.1s ease;

  h4,
  svg {
    color: ${(props) => props.theme.textDesc};
    margin: 1.75rem 0.5rem;
  }

  svg {
    width: 1.25rem;
  }

  &:hover {
    opacity: 0.9;
  }

  &:active {
    transform: scale(0.98);
  }
`;
