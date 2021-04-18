import ReactLoading from "react-loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const MoreWeatherInfo = ({ currentWeather, isLoading, settings }) => {
  return (
    <SCWeatherInfo>
      <SCHighlights>
        <h2>Today's Highlights</h2>
      </SCHighlights>
      <SCInformation>
        <SCStats>
          {isLoading ? (
            <SCLargeLoading>
              <ReactLoading type={"bubbles"} />
            </SCLargeLoading>
          ) : (
            <>
              <div>
                <h3>Wind Speed</h3>
              </div>
              <div className="value">
                <h2>
                  {settings.wind === "ms"
                    ? (currentWeather.wind_kph / 3.6).toFixed(2)
                    : settings.wind === "kph"
                    ? currentWeather.wind_kph
                    : currentWeather.wind_mph}{" "}
                  {settings.wind === "ms"
                    ? "m/s"
                    : settings.wind === "kph"
                    ? "kph"
                    : "mph"}
                </h2>
              </div>
              <SCWindAdditionalInfo>
                <FontAwesomeIcon
                  icon={faLocationArrow}
                  style={{
                    transform: `rotate(${-45 + currentWeather.wind_degree}deg)`,
                  }}
                />{" "}
                <h3>{currentWeather.wind_dir}</h3>
              </SCWindAdditionalInfo>
            </>
          )}
        </SCStats>
        <SCStats>
          {isLoading ? (
            <SCLargeLoading>
              <ReactLoading type={"bubbles"} />
            </SCLargeLoading>
          ) : (
            <>
              <div>
                <h3>Humidity</h3>
              </div>
              <div className="value">
                <h2>{currentWeather.humidity}%</h2>
              </div>
              <SCHumidityAdditionalInfo>
                <div className="slide">
                  <div
                    className="slideValue"
                    style={{
                      width: `${currentWeather.humidity}%`,
                      background:
                        currentWeather.humidity <= 25
                          ? "#36bd00"
                          : currentWeather.humidity <= 50
                          ? "#d0aa11"
                          : currentWeather.humidity <= 75
                          ? "#e17f00"
                          : "#e12200",
                    }}
                  ></div>
                </div>
                <span
                  style={{
                    left: `${scale(currentWeather.humidity, 0, 100, 10, 90)}%`,
                  }}
                >
                  {currentWeather.humidity}%
                </span>
              </SCHumidityAdditionalInfo>
            </>
          )}
        </SCStats>
        <SCStats>
          {isLoading ? (
            <SCLoading>
              <ReactLoading type={"bubbles"} />
            </SCLoading>
          ) : (
            <>
              <div>
                <h3>Visibility</h3>
              </div>
              <div className="value">
                <h2>
                  {settings.vis === "km"
                    ? currentWeather.vis_km
                    : currentWeather.vis_miles}{" "}
                  {settings.vis === "km" ? "km" : "miles"}
                </h2>
              </div>
            </>
          )}
        </SCStats>
        <SCStats>
          {isLoading ? (
            <SCLoading>
              <ReactLoading type={"bubbles"} />
            </SCLoading>
          ) : (
            <>
              <div>
                <h3>Air Pressure</h3>
              </div>
              <div className="value">
                <h2>
                  {" "}
                  {settings.pressure === "mb"
                    ? currentWeather.pressure_mb
                    : currentWeather.pressure_in}{" "}
                  {settings.pressure === "mb" ? "mb" : "in"}
                </h2>
              </div>
            </>
          )}
        </SCStats>
      </SCInformation>
    </SCWeatherInfo>
  );
};

const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

export default MoreWeatherInfo;

const SCWeatherInfo = styled.div`
  height: 65%;
  width: 80%;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (max-width: 1440px) {
    margin-top: 2.5rem;
    width: 90%;
  }

  @media screen and (max-width: 520px) {
    width: 100%;
  }
`;

const SCHighlights = styled.div`
  margin: 2.5rem 0;
  h2 {
    color: ${(props) => props.theme.textInfoSecondary};
  }

  @media screen and (max-width: 1440px) {
    margin: 2.5rem 0;
    display: flex;
    justify-content: center;
  }
`;

const SCInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: auto;
  align-items: center;

  @media screen and (max-width: 1440px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const SCStats = styled.div`
  background: ${(props) => props.theme.backgroundInfo};
  width: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 5rem;
  h2,
  h3 {
    color: ${(props) => props.theme.textInfo};
  }

  .value {
    margin: 0.25rem 0;
    h2 {
      font-size: 2.75rem;
    }
  }

  div {
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: 1440px) {
    width: 25rem;
    margin: 2rem;
  }

  @media screen and (max-width: 520px) {
    .value {
      h2 {
        font-size: 2rem;
      }
    }
  }
`;

const SCWindAdditionalInfo = styled.div`
  svg {
    margin-right: 0.75rem;
    width: 1.5rem;
    color: #f53357;
  }
`;

const SCHumidityAdditionalInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;

  .slide {
    background-color: ${(props) => props.theme.textDesc};
    height: 1rem;
    border-radius: 5rem;
    width: 80%;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;

    .slideValue {
      background: red;
      width: 50%;
      height: 1rem;
      transition: all 0.3s ease;
    }
  }

  span {
    position: absolute;
    transform: translate(-50%, 100%);
    left: 10%;
    color: ${(props) => props.theme.textInfo};
  }
`;

const SCLargeLoading = styled.div`
  height: 12.5rem !important;
`;

const SCLoading = styled.div`
  height: 8.5rem !important;
`;
