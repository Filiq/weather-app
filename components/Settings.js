import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const Settings = ({ isSettings, setIsSettings, settings, setSettings }) => {
  return (
    <SCSettings
      style={{
        transform: isSettings ? "translateX(0)" : "translateX(100%)",
      }}
    >
      <SCClose>
        <FontAwesomeIcon icon={faTimes} onClick={() => setIsSettings(false)} />
      </SCClose>
      <SCSettingsHeading>
        <h2>Settings</h2>
      </SCSettingsHeading>
      <SCSetting>
        <div>
          <div className="heading darkmode">
            <h3>Dark Mode</h3>
            <SCSwitch>
              <input
                type="checkbox"
                checked={settings.darkMode ? true : false}
                onChange={() => {
                  localStorage.setItem(
                    "settings",
                    JSON.stringify({
                      ...settings,
                      darkMode: !settings.darkMode,
                    })
                  );
                  setSettings({ ...settings, darkMode: !settings.darkMode });
                }}
              />
              <span className="slider round"></span>
            </SCSwitch>
          </div>

          <SCOptions>
            <div>
              <label>{"\u00A0"}</label>
            </div>
          </SCOptions>
        </div>
      </SCSetting>

      <SCSetting>
        <div>
          <div className="heading">
            <h3>Weather Degrees</h3>
          </div>
          <SCOptions>
            <div>
              <label>Celsius</label>
              <input
                type="radio"
                name="deg"
                id="celsius"
                checked={settings.deg === "c"}
                onChange={() => {
                  localStorage.setItem(
                    "settings",
                    JSON.stringify({
                      ...settings,
                      deg: "c",
                    })
                  );
                  setSettings({ ...settings, deg: "c" });
                }}
              />
            </div>
            <div>
              <label>Fahrenheit</label>
              <input
                type="radio"
                name="deg"
                id="fahrenheit"
                checked={settings.deg === "f"}
                onChange={() => {
                  localStorage.setItem(
                    "settings",
                    JSON.stringify({
                      ...settings,
                      deg: "f",
                    })
                  );
                  setSettings({ ...settings, deg: "f" });
                }}
              />
            </div>
            <div>
              <label>Kelvin</label>
              <input
                type="radio"
                name="deg"
                id="kelvin"
                checked={settings.deg === "k"}
                onChange={() => {
                  localStorage.setItem(
                    "settings",
                    JSON.stringify({
                      ...settings,
                      deg: "k",
                    })
                  );
                  setSettings({ ...settings, deg: "k" });
                }}
              />
            </div>
          </SCOptions>
        </div>
      </SCSetting>

      <SCSetting>
        <div>
          <div className="heading">
            <h3>Wind Speed</h3>
          </div>
          <SCOptions>
            <div>
              <label id="ms">Meters per second</label>
              <input
                type="radio"
                name="wind"
                id="ms"
                checked={settings.wind === "ms"}
                onChange={() => {
                  localStorage.setItem(
                    "settings",
                    JSON.stringify({
                      ...settings,
                      wind: "ms",
                    })
                  );
                  setSettings({ ...settings, wind: "ms" });
                }}
              />
            </div>
            <div>
              <label id="kph">Kilometers per hour</label>
              <input
                type="radio"
                name="wind"
                id="kph"
                checked={settings.wind === "kph"}
                onChange={() => {
                  localStorage.setItem(
                    "settings",
                    JSON.stringify({
                      ...settings,
                      wind: "kph",
                    })
                  );
                  setSettings({ ...settings, wind: "kph" });
                }}
              />
            </div>
            <div>
              <label id="mph">Miles per hour</label>
              <input
                type="radio"
                name="wind"
                id="mph"
                checked={settings.wind === "mph"}
                onChange={() => {
                  localStorage.setItem(
                    "settings",
                    JSON.stringify({
                      ...settings,
                      wind: "mph",
                    })
                  );
                  setSettings({ ...settings, wind: "mph" });
                }}
              />
            </div>
          </SCOptions>
        </div>
      </SCSetting>

      <SCSetting>
        <div>
          <div className="heading">
            <h3>Visibility</h3>
          </div>
          <SCOptions>
            <div>
              <label id="km">Kilometers</label>
              <input
                type="radio"
                name="visibility"
                id="km"
                checked={settings.vis === "km"}
                onChange={() => {
                  localStorage.setItem(
                    "settings",
                    JSON.stringify({
                      ...settings,
                      vis: "km",
                    })
                  );
                  setSettings({ ...settings, vis: "km" });
                }}
              />
            </div>
            <div>
              <label id="miles">Miles</label>
              <input
                type="radio"
                name="visibility"
                id="miles"
                checked={settings.vis === "miles"}
                onChange={() => {
                  localStorage.setItem(
                    "settings",
                    JSON.stringify({
                      ...settings,
                      vis: "miles",
                    })
                  );
                  setSettings({ ...settings, vis: "miles" });
                }}
              />
            </div>
          </SCOptions>
        </div>
      </SCSetting>

      <SCSetting>
        <div>
          <div className="heading">
            <h3>Air Pressure</h3>
          </div>
          <SCOptions>
            <div>
              <label id="mb">Millibars</label>
              <input
                type="radio"
                name="pressure"
                id="mb"
                checked={settings.pressure === "mb"}
                onChange={() => {
                  localStorage.setItem(
                    "settings",
                    JSON.stringify({
                      ...settings,
                      pressure: "mb",
                    })
                  );
                  setSettings({ ...settings, pressure: "mb" });
                }}
              />
            </div>
            <div>
              <label id="in">Inches</label>
              <input
                type="radio"
                name="pressure"
                id="in"
                checked={settings.pressure === "in"}
                onChange={() => {
                  localStorage.setItem(
                    "settings",
                    JSON.stringify({
                      ...settings,
                      pressure: "in",
                    })
                  );
                  setSettings({ ...settings, pressure: "in" });
                }}
              />
            </div>
          </SCOptions>
        </div>
      </SCSetting>
    </SCSettings>
  );
};

export default Settings;

const SCSettings = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.backgroundInfo};
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s ease;
  z-index: 100;
  overflow-y: auto;
  overflow-x: hidden;

  @media screen and (max-width: 520px) {
    justify-content: center;
    align-items: center;
  }
`;

const SCClose = styled.div`
  position: absolute;
  top: 2.5%;
  right: 2.5%;

  svg {
    width: 1.5rem;
    color: ${(props) => props.theme.textInfo};
    cursor: pointer;
  }
`;

const SCSettingsHeading = styled.div`
  margin: 0 10rem;
  display: flex;
  align-items: center;
  height: 20vh;

  h2 {
    color: ${(props) => props.theme.textInfo};
    font-size: 2.75rem;
  }

  @media screen and (max-width: 520px) {
    margin: 0;
  }
`;

const SCSetting = styled.div`
  margin: 0 10rem;
  display: flex;
  align-items: center;

  .heading {
    color: ${(props) => props.theme.textInfo};
    display: flex;
    align-items: center;
  }

  .heading.darkmode {
    font-size: 1.5rem;
    h3 {
      margin-right: 2.25rem;
    }
  }

  @media screen and (max-width: 520px) {
    margin: 0;
  }
`;

const SCOptions = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 0;

  div {
    margin: 0.25rem 0;
    label {
      display: inline-block;
      width: 12.5rem;
      color: ${(props) => props.theme.textDesc};
    }
  }
`;

const SCSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${(props) => props.theme.textDesc};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 34px;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 2px;
    background-color: #f2f2f2;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }

  input:checked + .slider {
    background-color: #178ced;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #178ced;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(23px);
    -ms-transform: translateX(23px);
    transform: translateX(23px);
  }
`;
