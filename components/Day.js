import ReactLoading from "react-loading";
import styled from "styled-components";

const Day = ({ weather, loading, daysCount, index, date, settings }) => {
  return (
    <SCDay
      style={{
        marginRight: daysCount < 5 ? "4rem" : "initial",
      }}
    >
      {loading && (
        <SCLoading>
          <ReactLoading type={"spinningBubbles"} />
        </SCLoading>
      )}
      {!loading && (
        <div>
          <SCDate>
            <h4>{index === 0 ? "Today" : index === 1 ? "Tomorrow" : date}</h4>
          </SCDate>
          <SCWeatherIcon>
            <img src={weather.day.condition.icon} alt="" />
          </SCWeatherIcon>
          <SCTemp>
            <SCDayTemp>
              {settings.deg === "c"
                ? weather.day.avgtemp_c
                : settings.deg === "f"
                ? weather.day.avgtemp_f
                : (weather.day.avgtemp_c * 273.15).toFixed(1)}
              {settings.deg === "c" ? "°C" : settings.deg === "f" ? "°F" : "K"}
            </SCDayTemp>
            <SCNightTemp>
              {settings.deg === "c"
                ? weather.hour[23].temp_c
                : settings.deg === "f"
                ? weather.hour[23].temp_f
                : (weather.hour[23].temp_c * 273.15).toFixed(1)}
              {settings.deg === "c" ? "°C" : settings.deg === "f" ? "°F" : "K"}
            </SCNightTemp>
          </SCTemp>
        </div>
      )}
    </SCDay>
  );
};

export default Day;

const SCDay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundInfo};
  width: calc(7rem + 2vw);
  height: 13.5rem;

  @media screen and (max-width: 1440px) {
    width: calc(7rem + 3vw);
    margin: 1rem;
  }

  @media screen and (max-width: 740px) {
    width: calc(8rem + 10vw);
    height: 16rem;
  }
`;

const SCLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SCDate = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textInfo};
`;

const SCWeatherIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2.25rem 0;

  img {
    width: 40%;
  }
`;

const SCTemp = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

const SCDayTemp = styled.h4`
  color: ${(props) => props.theme.textInfo};
`;

const SCNightTemp = styled.h4`
  color: ${(props) => props.theme.textDesc};
`;
