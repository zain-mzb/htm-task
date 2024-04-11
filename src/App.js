import { useEffect, useState } from "react";
import "./App.css";
let htmData = require("./data/properties.json");

function App() {
  let [pageData, setPageData] = useState();
  let [searchText, setSearchText] = useState("");
  let [error, setError] = useState(false);

  useEffect(() => {
    setPageData(htmData);
  }, []);

  const searchFunc = (searchText) => {
    let initialData = htmData;
    setError(false);
    let filteredData = [];

    for (let i = 0; i < initialData.length; i++) {
      if (searchText.trim() !== "") {
        if (
          initialData[i].name
            .toLowerCase()
            .includes(searchText.toLowerCase()) ||
          initialData[i].description
            .toLowerCase()
            .includes(searchText.toLowerCase())
        ) {
          filteredData.push(initialData[i]);
        }
      } else {
        filteredData.push(initialData[i]);
      }
    }

    if (filteredData.length === 0) {
      setError(true);
    }
    setPageData(filteredData);
  };

  return (
    <div className="App">
      <div>
        <img
          src="https://d2wk8ab0462hyq.cloudfront.net/logos/htm-logo.png?mtime=20160301200633&focal=none"
          alt=""
          height={"100vh"}
        />
      </div>

      <div className="search-div">
        <input
          type="text"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          placeholder="Search by name or description"
        />{" "}
        <button
          onClick={() => {
            searchFunc(searchText);
          }}
        >
          Search
        </button>
      </div>

      {error ? (
        <div className="error-message">No data found</div>
      ) : (
        <div>
          {pageData?.map((data, index) => (
            <div key={index} className="property-card">
              <h2>
                {data.name} - {data.code}
              </h2>
              <p>{data.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
