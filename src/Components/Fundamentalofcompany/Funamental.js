import React from "react";
import "./Funamental.css";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useState, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import SearchIcon from "@mui/icons-material/Search";
import FundamentalData from "./FundamentalData";

function Funamental() {
  const [threeword, setthreeeword] = useState(false);
  const [datas, setdatas] = useState(gtData());
  const [filterData, setfilterData] = useState([]);
  const [notfound, setnotfound] = useState(false);
  const [stocksymbol, setstocksymbol] = useState("");

  function gtData() {
    let List = localStorage.getItem("StockLists");

    if (List) {
      return JSON.parse(List);
    } else {
      return [];
    }
  }
  const handelfilter = (e) => {
    const searchword = e.target.value;
    if (searchword.trim().length > 0 && searchword.trim() != "") {
      setthreeeword(true);
    } else {
      setthreeeword(false);
    }
    const newFilter = datas.filter((data) => {
      return data.name
        .replace(/[, ]+/g, "", " ", ",")
        .toLowerCase()
        .includes(searchword.replace(/[, ]+/g, "", " ", ",").toLowerCase());
    });
    setfilterData(newFilter);
    if (searchword.length > 0 && newFilter.length === 0) {
      setnotfound(true);
    }
    if (searchword === "") {
      setfilterData([]);

      setnotfound(false);
    }
    if (searchword != "" && newFilter.length > 0) {
      setnotfound(false);
    }
  };

  const clickonstock = (data) => {
    const stock = datas.find((e) => e.name === data);
    
    if (stock) {
      const { symbol } = stock;
  
      setstocksymbol(symbol);
      // BalancesheetData(symbol);
      setfilterData([]);
      setthreeeword(false);
      // gttData(symbol);
      // epsData(symbol);
      // totalRevenue(symbol);
      fetchData(symbol);
    }

     setTimeout(() => {
          window.location.reload(false);
        }, 9000);
  };
  
  // function gttData(e) {
  //   fetch(
  //     `https://www.alphavantage.co/query?function=OVERVIEW&symbol=${e}&apikey=2KWEIOOBNB82EHKZ`
  //   )
  //     .then((respponse) => respponse.json())
  //     .then((data) => {
  //       console.log(data);
  //       localStorage.setItem("overviewData", JSON.stringify(data));
  //     });
  // }
  // function epsData(e) {
  //   fetch(
  //     `https://www.alphavantage.co/query?function=EARNINGS&symbol=${e}&apikey=55RB6VW5QMERT6HW`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       localStorage.setItem("eps", JSON.stringify(data));
  //     });
  // }
  // function totalRevenue(e) {
  //   fetch(
  //     `https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${e}&apikey=2A6AAA2W48C4FBJM`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       localStorage.setItem("totalRevenue", JSON.stringify(data));
  //     });
  // }
  // function BalancesheetData(e) {
  //   fetch(
  //     `https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${e}&apikey=H425ECFTGFPLCQ4K`
  //   )
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       localStorage.setItem("Balancesheet", JSON.stringify(data));
  //     });
  // }

  function fetchData(symbol) {
    const apiCalls = [
      fetch(`https://www.alphavantage.co/query?function=OVERVIEW&symbol=${symbol}&apikey=2KWEIOOBNB82EHKZ`)
        .then((res) => res.json())
        .then((data) => localStorage.setItem("overviewData", JSON.stringify(data))),
  
      fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${symbol}&apikey=55RB6VW5QMERT6HW`)
        .then((res) => res.json())
        .then((data) => localStorage.setItem("eps", JSON.stringify(data))),
  
      fetch(`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=${symbol}&apikey=2A6AAA2W48C4FBJM`)
        .then((res) => res.json())
        .then((data) => localStorage.setItem("totalRevenue", JSON.stringify(data))),
  
      fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${symbol}&apikey=H425ECFTGFPLCQ4K`)
        .then((res) => res.json())
        .then((data) => localStorage.setItem("Balancesheet", JSON.stringify(data)))
    ];
  
    // Wait for all API requests to complete before reloading the page
    Promise.all(apiCalls)
      .then(() => {
        console.log("All API requests completed successfully");
        window.location.reload(false); // Reload the page
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  
  // Call fetchData(symbol) wherever needed
  




  let [arrow, setarrow] = useState("none");
  let GotoTop = () => {
    document.documentElement.scrollTop = 0;
  };

  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setarrow("block");
    } else {
      setarrow("none");
    }
  }

  console.log(stocksymbol, "stocksymbol-stocksymbol");
  
  return (
    <div className="Funamental">
      <div className="Fundamental-header">
        <div className="Fundamental-header-logo">
          <p>Profit King</p>
          <p>
            <CurrencyRupeeIcon className="rupee-logo" />
          </p>
        </div>
        <div className="Fundamental-header-searchbar">
          <div className="Inputsearchss">
            <div className="InputSearch_Searchss">
              <div className="inputbox">
                <input
                  className="inputtserch"
                  placeholder="Which scrip are you looking for?"
                  type="text"
                  onChange={handelfilter}
                />

                <SearchIcon className="serchstocks" />
              </div>
            </div>
            {threeword && (
              <div className="InputSearch_recommm">
                {notfound && (
                  <>
                    <div className="notfoundcontainer">
                      <img
                        className="notfoundimage"
                        src="https://pro.upstox.com/assets/empty.svg"
                      />
                    </div>
                    <p className="Write3word">
                      We searched high and low,but couldn’t find anything.Try
                      another keyword?
                    </p>
                  </>
                )}
                {filterData?.slice(0, 15).map((e, key) => {
                  return (
                    <div className="Addstocklist" key={key}>
                      <p
                        className="stockfilters"
                        key={key}
                        onClick={() => clickonstock(e.name)}
                      >
                        {e.name.toUpperCase()}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <FundamentalData stocksymbol={stocksymbol} />

   
      <div className="Gototop">
        <button
          onClick={GotoTop}
          className="Gotobtn"
          style={{ display: arrow }}
        >
          <ArrowUpwardIcon />
        </button>
      </div>
    </div>
  );
}

export default Funamental;
