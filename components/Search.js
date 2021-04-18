import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faTimes,
  faHandPointer,
  faMinusCircle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import styled from "styled-components";

const Search = ({ isSearching, setIsSearching, getWeather }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState({ msg: "", color: "" });
  const [hideError, setHideError] = useState(true);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    setHideError(false);

    setTimeout(() => {
      setHideError(true);
    }, 3500);
  }, [error]);

  useEffect(() => {
    localStorage.getItem("cities")
      ? setSearchHistory(JSON.parse(localStorage.getItem("cities")))
      : setSearchHistory([]);
  }, []);

  const submitHandler = async () => {
    setInputValue("");
    const found = await getWeather(inputValue, "city");

    if (found) {
      setIsSearching(false);
      localStorage.setItem(
        "cities",
        JSON.stringify([...searchHistory, { city: inputValue, id: uuidv4() }])
      );
      setSearchHistory((state) => [
        ...state,
        { city: inputValue, id: uuidv4() },
      ]);
    } else {
      setError({ msg: "City was not found.", color: "red" });
    }
  };

  const deleteSearchItem = (id) => {
    localStorage.setItem(
      "cities",
      JSON.stringify(searchHistory.filter((item) => item.id !== id))
    );
    setSearchHistory(searchHistory.filter((item) => item.id !== id));
  };

  const deleteAllItems = () => {
    localStorage.setItem("cities", "[]");
    setSearchHistory([]);
  };

  return (
    <SCSearch
      style={{ transform: isSearching ? "translateX(0)" : "translateX(-100%)" }}
    >
      <SCClose>
        <div>
          <FontAwesomeIcon
            icon={faTimes}
            onClick={() => setIsSearching(false)}
          />
        </div>
      </SCClose>
      <SCInput>
        <input
          type="search"
          placeholder="Search location"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          id="searchInput"
        />
        <label
          htmlFor="searchInput"
          style={{
            color:
              error.color === "red"
                ? "#bd0404"
                : error.color === "orange"
                ? "orange"
                : "green",
            opacity: hideError ? 0 : 1,
          }}
        >
          {error.msg}
        </label>
        <button onClick={submitHandler}>Search</button>
      </SCInput>
      <SCHistory>
        <h2>Search History</h2>
        <SCPlaces>
          {searchHistory.length !== 0 &&
            searchHistory.map((search) => (
              <SCPlace
                key={search.id}
                onClick={() => {
                  getWeather(search.city, "city");
                  setIsSearching(false);
                }}
                onContextMenu={() => {
                  deleteSearchItem(search.id);
                }}
              >
                <h3>{search.city}</h3>
                <FontAwesomeIcon icon={faAngleRight} />
              </SCPlace>
            ))}
        </SCPlaces>
        {searchHistory.length !== 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              margin: "0 auto",
              width: "75%",
            }}
          >
            <span
              style={{
                color: "#888",
                margin: "0.75rem auto",
              }}
            >
              <FontAwesomeIcon
                icon={faHandPointer}
                style={{
                  width: "1rem",
                  marginRight: "0.25rem",
                }}
              />{" "}
              Left Click - Select{"\u00A0\u00A0\u00A0\u00A0\u00A0"}
            </span>
            <span style={{ color: "#888", margin: "0 auto" }}>
              <FontAwesomeIcon
                icon={faMinusCircle}
                style={{
                  width: "1rem",
                  marginRight: "0.25rem",
                }}
              />{" "}
              Right Click - Remove
            </span>
            <SCRemoveAll onClick={deleteAllItems}>
              <FontAwesomeIcon
                icon={faTrash}
                style={{
                  width: "1rem",
                  marginRight: "0.25rem",
                }}
              />{" "}
              Remove All
            </SCRemoveAll>
          </div>
        )}
      </SCHistory>
    </SCSearch>
  );
};

export default Search;

const SCSearch = styled.div`
  width: 32vw;
  min-height: 100vh;
  background-color: ${(props) => props.theme.backgroundInfo};
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  transition: all 0.3s ease;
  z-index: 10;
  overflow-y: auto;

  @media screen and (max-width: 1440px) {
    width: 100%;
  }
`;

const SCClose = styled.div`
  width: 70%;
  display: flex;
  justify-content: flex-end;
  margin: 1.75rem 0 2.5rem 0;

  div {
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 1.5rem;
      color: ${(props) => props.theme.textInfo};
      cursor: pointer;
    }
  }
`;

const SCInput = styled.div`
  margin: 0 0 2.5rem 0;
  width: 80%;
  display: flex;
  justify-content: center;
  position: relative;

  input {
    font-family: inherit;
    font-size: 1.25rem;
    padding: 0.5rem;
    height: 2.75rem;
    border: 0;
    width: 75%;

    &:focus {
      outline: 0;
    }
  }

  label {
    position: absolute;
    left: 0;
    top: 110%;
    transition: all 0.3s ease;
  }

  button {
    font-family: inherit;
    font-size: 1.25rem;
    height: 2.75rem;
    border: 0;
    cursor: pointer;
    padding: 0 1.25rem;
    background: #f53357;
    color: ${(props) => props.theme.textInfo};
    transition: all 0.1s ease;
    border-radius: 0 2rem 0 0;

    &:hover {
      opacity: 0.9;
    }
  }
`;

const SCHistory = styled.div`
  margin-top: 2rem;
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  h2 {
    color: ${(props) => props.theme.textInfo};
  }
`;

const SCPlaces = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2.5rem;
  overflow-y: auto;
  height: 28rem;
  padding: 0 2.5rem;
`;

const SCPlace = styled.div`
  margin: 0.75rem 0;
  padding: 1rem;
  border-bottom: 1px solid ${(props) => props.theme.textDesc};
  border-top: 1px solid transparent;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  cursor: pointer;
  transition: all 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h3 {
    color: ${(props) => props.theme.textDesc};
    font-weight: 400;
  }
  svg {
    color: ${(props) => props.theme.textDesc};
    width: 1rem;
    opacity: 0;
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.textDesc};
    svg {
      opacity: 1;
    }
  }
`;

const SCRemoveAll = styled.button`
  background: #f53357;
  color: #f2f2f2;
  font-family: inherit;
  font-size: 1.2rem;
  border: 0;
  height: 2.2rem;
  margin: 0.75rem 0;
  cursor: pointer;
  margin-top: 1.5rem;
  &:hover {
    opacity: 0.9;
  }
`;
