import Day from "./Day";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const NextDays = ({ forecast, isLoading, setIsSettings, settings }) => {
  return (
    <SCNextDays
      style={{
        justifyContent:
          isLoading || forecast.forecastday.length === 5
            ? "space-between"
            : "flex-start",
      }}
    >
      <SCClose>
        <FontAwesomeIcon icon={faCog} onClick={() => setIsSettings(true)} />
      </SCClose>
      {isLoading ? (
        <>
          <Day loading={true} />
          <Day loading={true} />
          <Day loading={true} />
          <Day loading={true} />
          <Day loading={true} />
        </>
      ) : (
        forecast.forecastday.map((weather, index) => (
          <Day
            weather={weather}
            loading={false}
            daysCount={forecast.forecastday.length}
            index={index}
            date={moment().add(index, "days").format("ddd, D MMM")}
            settings={settings}
            key={index}
          />
        ))
      )}
    </SCNextDays>
  );
};

export default NextDays;

const SCNextDays = styled.div`
  height: 35%;
  width: 80%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;

  @media screen and (max-width: 1440px) {
    margin-top: 2.5rem;
    flex-wrap: wrap;
    justify-content: center;
    width: 90%;
  }
`;

const SCClose = styled.div`
  position: absolute;
  top: 7.5%;
  right: -8.5%;

  svg {
    width: 2rem;
    color: #f53357;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: rotate(60deg);
    }
  }

  @media screen and (max-width: 1440px) {
    top: 0;
    right: 0;
  }
`;
