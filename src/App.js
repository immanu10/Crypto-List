import React, { useState, useEffect } from "react";
import "./App.css";
import Details from "./components/Details";
import Loading from "./components/ui/Loading";
import axios from "axios";

function App() {
  const [idFromBtn, setIdFromBtn] = useState("btc-bitcoin");
  const [coins, setCoins] = useState(null);
  const [isloading, setIsLoading] = useState("true");
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("https://api.coinpaprika.com/v1/coins/")
      .then((res) => {
        setCoins(res.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const filterCoins =
    coins && search
      ? coins.filter((coin) => {
          return coin.name.toLowerCase().includes(search.toLocaleLowerCase());
        })
      : [];

  return (
    <>
      <nav className="navbar">
        <header>
          CrptoList
          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={handleChange}
          />
        </header>

        {isloading ? (
          <div className="load-spinner">
            <Loading />
          </div>
        ) : search ? (
          filterCoins.map((item) => {
            const { id, name, symbol, rank } = item;
            return (
              <div className="coin" key={id}>
                <p>{rank}</p>
                <p className="coin-name">{name}</p>
                <button
                  value={id}
                  onClick={(e) => setIdFromBtn(e.target.value)}
                >
                  {symbol}
                </button>
              </div>
            );
          })
        ) : (
          coins.slice(0, 50).map((item) => {
            const { id, name, symbol, rank } = item;
            return (
              <div className="coin" key={id}>
                <p>{rank}</p>
                <p className="coin-name">{name}</p>
                <button
                  value={id}
                  onClick={(e) => setIdFromBtn(e.target.value)}
                >
                  {symbol}
                </button>
              </div>
            );
          })
        )}
      </nav>
      <main className="details">
        <Details id={idFromBtn} loading={isloading} />
      </main>
    </>
  );
}

export default App;
