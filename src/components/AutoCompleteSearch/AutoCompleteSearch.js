import React, { useEffect, useState } from "react";
import "./AutoCompleteSearch.css";

const AutoCompleteSearch = () => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isShow, setIsShow] = useState(false);
  const [cache, setCache] = useState({});

  const fetchData = async () => {
    try {
      if(cache[input]){
        setSuggestions(cache[input])
        return;
      }
      const data = await fetch(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${input}`);
      const res = await data.json();
      setSuggestions(res[1]);
      setCache((prev) => ({...prev, [input]:res[1]}))
    } catch (error) {
      console.log("Fetching Error", error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(fetchData, 300);
    return () => {
      clearTimeout(timer)
    }
  }, [input]);

  return (
    <div className="mainContainer">
      <div className="search_container">
        <h1 className="heading">Auto Complete Search</h1>
        <input
          type="text"
          value={input}
          className="search-box"
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsShow(true)}
          onBlur={() => setIsShow(false)}
        />
        {isShow ? <div className="suggestionsContainer">
          {suggestions.map((r, index) => (
            <div key={index}>
              <li className="item">{r}</li>
            </div>
          ))}
        </div> : "" }
       
      </div>
    </div>
  );
};

export default AutoCompleteSearch;
