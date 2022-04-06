import "./styles.css";

import { useEffect, useState } from "react";
import Loader from "../Components/Loader";
import CounterCopm from "../Components/CounterCopm";

const App3 = () => {
  const [count, setCount] = useState(1);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    fetch(
      "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",
      {
        method: "GET"
      }
    ).then((resp) => {
      resp.json().then((result) => {
        // console.log(result);
        result ? setCount(result[Object.keys(result)[0]]) : setCount(1);
        setLoader(false);
      });
    });
  }, []);

  const sendDataToBackend = (data) => {
    fetch(
      "https://interview-8e4c5-default-rtdb.firebaseio.com/front-end.json",
      {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ shubh_sharma: data })
      }
    ).then((result) => {
      console.log(result);
    });
  };

  const incFun = () => {
    process.env.MAX_VALUE
      ? setCount((count) =>
          count < +process.env.MAX_VALUE ? count + 1 : count
        )
      : setCount((count) => (count < 18 ? count + 1 : count));

    sendDataToBackend(count);
  };

  const decFun = () => {
    setCount(count - 1);
    sendDataToBackend(count);
  };

  return (
    <>
      <div className="parentDiv">
        {loader ? <Loader /> : ""}
        <div className="showText">Saving counter value </div>

        <div className="decrementBtn" onClick={() => decFun()}>
          -
        </div>
        <div className="counterValue">{count}</div>
        <div className="incrementBtn" onClick={() => incFun()}>
          +
        </div>

        <CounterCopm counter={count} />
      </div>
    </>
  );
};

export default App3;
