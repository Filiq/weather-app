import ReactMapGl, { Marker, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState, useEffect, useMemo } from "react";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Mapbox = ({ isMapbox, setIsMapbox, location, getWeather }) => {
  const [clicked, setClicked] = useState(null);

  const [closePopup, setClosedPopup] = useState(true);

  const [showPopup, togglePopup] = useState(false);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude:
      location.latitude || (clicked && clicked.lngLat && clicked.lngLat[1]),
    longitude:
      location.longitude || (clicked && clicked.lngLat && clicked.lngLat[0]),
    zoom: clicked ? clicked.zoom : 10,
  });

  useEffect(() => {
    setViewport({
      width: "100%",
      height: "100%",
      latitude:
        clicked && clicked.lngLat ? clicked.lngLat[1] : location.latitude,
      longitude:
        clicked && clicked.lngLat ? clicked.lngLat[0] : location.longitude,
      zoom: clicked ? clicked.zoom : 10,
    });
  }, [isMapbox]);

  const marker = useMemo(
    () => (
      <Marker
        latitude={
          clicked && clicked.lngLat ? clicked.lngLat[1] : location.latitude
        }
        longitude={
          clicked && clicked.lngLat ? clicked.lngLat[0] : location.longitude
        }
      >
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          width={viewport.zoom * 5}
          height={viewport.zoom * 5}
          color={"#f53357"}
        />
      </Marker>
    ),
    [isMapbox, clicked]
  );

  return (
    <SCMap
      style={{ transform: isMapbox ? "translateY(0)" : "translateY(-80rem)" }}
    >
      <SCClose>
        <button onClick={() => setIsMapbox(false)}>Close</button>
      </SCClose>
      <ReactMapGl
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onViewportChange={(nextViewport) => {
          setViewport(nextViewport);
          setClicked({ ...clicked, zoom: nextViewport.zoom });
        }}
        mapboxApiAccessToken={process.env["NEXT_PUBLIC_MAPBOX_API"]}
        onClick={(e) => {
          !showPopup && setClicked({ ...clicked, lngLat: e.lngLat });
          togglePopup(!showPopup);
        }}
      >
        {marker}
        {showPopup && (
          <Popup
            latitude={clicked && clicked.lngLat && clicked.lngLat[1]}
            longitude={clicked && clicked.lngLat && clicked.lngLat[0]}
            closeButton={false}
            closeOnClick={closePopup ? true : false}
            onClose={() => togglePopup(false)}
          >
            <SCPopup>
              <h4>Would you like to see what weather is here?</h4>
              <div>
                <button
                  onFocus={() => setClosedPopup(false)}
                  onBlur={() => setClosedPopup(true)}
                  onClick={() => setTimeout(() => togglePopup(false), 333)}
                >
                  No
                </button>
                <button
                  onFocus={() => setClosedPopup(false)}
                  onBlur={() => setClosedPopup(true)}
                  onClick={() => {
                    setTimeout(() => togglePopup(false), 333);
                    setIsMapbox(false);
                    getWeather(
                      [clicked.lngLat[1], clicked.lngLat[0]],
                      "coords"
                    );
                  }}
                >
                  Yes
                </button>
              </div>
            </SCPopup>
          </Popup>
        )}
      </ReactMapGl>
    </SCMap>
  );
};

export default Mapbox;

const SCMap = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  transition: all 1.5s ease;
  z-index: 10;
`;

const SCClose = styled.div`
  button {
    position: fixed;
    z-index: 11;
    top: 2.5%;
    right: 2.5%;
    font-family: inherit;
    font-size: 1.25rem;
    height: 2.75rem;
    width: 5rem;
    border: 0;
    cursor: pointer;
    background: #f53357;
    color: #f2f2f2;
    transition: all 0.1s ease;
    border-radius: 0.35rem;

    &:hover {
      opacity: 0.95;
      font-weight: 500;
    }

    &:active {
      transform: scale(0.985);
    }
  }
`;

const SCPopup = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  h4 {
    color: #f53357;
    padding: 1rem 0.5rem;
    font-size: 1.25rem;
  }

  div {
    padding: 0 0.5rem;

    button {
      margin: 1rem 1.5rem 0.5rem 0;
      width: 4.5rem;
      height: 2rem;
      font-family: inherit;
      font-size: 0.9rem;
      border: 0;
      color: #f2f2f2;
      cursor: pointer;
      transition: all 0.1s ease;

      &:first-child {
        color: #f53357;
        background: #fff;
        border: 2px solid #f53357;

        &:hover {
          background: #f53357;
          color: #fff;
          opacity: 0.9;
        }
      }

      &:last-child {
        background: #f53357;

        &:hover {
          opacity: 0.9;
        }
      }

      &:active {
        transform: scale(0.98);
      }
    }
  }
`;
