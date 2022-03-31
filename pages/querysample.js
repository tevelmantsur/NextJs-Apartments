import { Input } from "@mui/material";
import Router from "next/router";
import { useEffect, useState } from "react";
import Fillters from "../components/Fillters/Fillters";

function QuerySample({ query: { search } }) {
  console.log(search);
  const [query, setQuery] = useState({});

  const FillterArray = [
    {
      id: "fillterooms",
      placeholder: "חדרים",
      fromInputName: "gte",
      toInputName: "lte",
    },
    {
      id: "filltermeter",
      placeholder: "מטרים",
      fromInputName: "metermin",
      toInputName: "metermax",
    },
    {
      id: "fillterprice",
      placeholder: "מחיר",
      fromInputName: "pricemin",
      toInputName: "pricemax",
    },
  ];

  const updateQuery = (newQuery) => {
    console.log(newQuery);
    console.log(query);
    Router.push({
      pathname: "/querysample",
      query: { search: encodeURI(newQuery) },
    });
  };

  useEffect(() => {
    if (search) {
      console.log("Initial query / update caught!");
    }
  }, [search]);

  const HandelFillters = (e) => {
    e.preventDefault();

    let name = e.target.name;
    let value = e.target.value;
    let number = parseFloat(value);

    if (!value.length == 0) {
      setQuery((prevState) => ({
        ...prevState,
        [name]: number,
      }));
    }
    if (value.length == 0) {
      setQuery((prevState) => {
        const { [name]: value, ...prevStat2e } = prevState;
        return {
          ...prevStat2e,
        };
      });
    }
  };

  useEffect(() => {
    if (search) {
      console.log("Initial query / update caught!");
    }
  }, [search]);

  return (
    <div>
      <h2>Current query is {search}</h2>
      <h2>Currnt Query is {query.gte}</h2>
      <button
        onClick={() => {
          updateQuery(query.gte);
        }}
      >
        Update query
      </button>
      <h5>
        מ-{" "}
        <input
          key="metermin"
          style={{ width: "57px" }}
          onChange={() => {
            updateQuery(query);
          }}
          placeholder="מטרים"
          name="metermin"
          min="0"
          type="number"
        ></input>
      </h5>

      {FillterArray.map((item, i) => (
        <div key={item.placeholder}>
          <Fillters
            key1={item.id}
            HandelFillters={HandelFillters}
            frominputName={item.toInputName}
            toinputName={item.fromInputName}
            placeholder={item.placeholder}
          />
        </div>
      ))}
    </div>
  );
}

QuerySample.getInitialProps = ({ query }) => {
  return { query };
};

export default QuerySample;
