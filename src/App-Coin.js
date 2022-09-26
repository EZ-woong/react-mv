import { useEffect, useState } from "react";

function AppCoin() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [myMoney, setMyMoney] = useState("");
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  const onChange = (event) => setMyMoney(event.target.value);
  console.log(myMoney);
  return (
    <div>
      <h1>The Coin! {loading ? "" : `(${coins.length})`}</h1>
      <div>
        <input
          value={myMoney}
          onChange={onChange}
          type="number"
          placeholder="Write your Money"
        />
      </div>
      {loading ? (
        <strong>Loading..</strong>
      ) : (
        <select>
          {coins.map((coin, index) => (
            <option key={index}>
              {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD =
              {myMoney / coin.quotes.USD.price} {coin.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default AppCoin;
