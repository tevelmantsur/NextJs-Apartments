import Pagination from "@mui/material/Pagination";
import React, { useEffect, useState } from "react";
import AdressFillter, { MemoAdressFillter } from "./Fillters/AdressFillter";
import SingelApartment, { MemoApartment } from "./SingelApartment";
import Drawer from "@mui/material/Drawer";
import { Box, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import CircularProgress from "@mui/material/CircularProgress";
import Fillters, { MemoFillter } from "./Fillters/Fillters";
import { MemoSorts } from "./Fillters/Sorts";
import { useRouter } from "next/router";

export default function Apartments() {
  console.log("Apartments got rendersd");

  const renders = React.useRef(0);
  const [data, setData] = useState([]);
  const [drawer, setDrawer] = useState({ drawerOpen: false, name: "פתח" });
  const [Pages, setPages] = useState(0);
  const [query, setQuery] = useState({
    metermax: ``,
    updated: "",
    metermin: ``,
    lte: "",
    gte: "",
    pricemax: ``,
    pricemin: ``,
    location: ``,
    page: ``,
    sortprice: ``,
    sortroom: ``,
    sortmeter: ``,
    sortupdated: ``,
  });

  let url = "http://localhost:3000/search";
  const {
    metermax,
    updated,
    metermin,
    lte,
    gte,
    pricemax,
    pricemin,
    location,
    page,
    sortprice,
    sortroom,
    sortmeter,
    sortupdated,
  } = query;

  let allQuerys =
    metermin +
    metermax +
    updated +
    lte +
    gte +
    pricemax +
    pricemin +
    location +
    page +
    sortprice +
    sortroom +
    sortmeter +
    sortupdated;

  const newURL = url + allQuerys;

  let router = useRouter();
  console.log(router);
  console.log(toString(newURL));
  /*sTART  Fetch*/
  useEffect(() => {
    let isCancel = false;

    router.push({
      pathname: "/",
      query: allQuerys,
    });

    const fetchData = async () => {
      console.log(url + router.asPath);
      let newURL1 = url + router.asPath;
      const response = await fetch(newURL1);
      response = await response.json();
      if (!isCancel) {
        let pages = response[0].pageInfo[0]?.count;
        let pricemaxcheck = query.pricemax.replace(/^\D+/g, "");
        let pricemincheck = query.pricemin.replace(/^\D+/g, "");
        let gtecheck = query.gte.replace(/^\D+/g, "");
        let ltecheck = query.lte.replace(/^\D+/g, "");
        let metermaxcheck = query.metermax.replace(/^\D+/g, "");
        let metermincheck = query.metermin.replace(/^\D+/g, "");
        if (
          gtecheck > ltecheck ||
          metermincheck > metermaxcheck ||
          pricemincheck > pricemaxcheck
        ) {
          setPages(0);
        }

        if (pages) {
          setPages(Math.round(pages / 50));
        }
        setData(response[0].data);
      }
    };

    fetchData();
    return () => {
      isCancel = true;
    };
  }, [query]);

  /*End Fetch*/

  const HandelFillters = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    let number = parseFloat(value);
    let InsertValue;
    if (isNaN(value)) {
      InsertValue = value;
    } else {
      InsertValue = number;
    }
    if (!value.length == 0) {
      setQuery((prevState) => ({
        ...prevState,
        [name]: `&${name}=` + InsertValue,
        page: `&page=0`,
      }));
    }
  };

  const handlePagination = React.useCallback(
    (e, value) => {
      if (value) {
        setQuery((prevState) => ({
          ...prevState,
          page: `&page=` + parseFloat(value),
        }));
      } else {
        setQuery((prevState) => ({
          ...prevState,
          page: `&page=0`,
        }));
      }
    },
    [query]
  );

  function HandelSort(e, i) {
    let id = e.target.id;
    if (id) {
      setQuery((prevState) => ({
        ...prevState,
        [i]: `&${id}`,
      }));
    } else {
      setQuery((prevState) => ({
        ...prevState,
        [i]: ``,
      }));
    }
  }

  function handelDrawer() {
    if (drawer.drawerOpen) {
      setDrawer({ drawerOpen: false, name: "פתח" });
    } else {
      setDrawer({ drawerOpen: true, name: "סגור" });
    }
  }
  const contentStyle = {
    transition: "margin-right 450ms cubic-bezier(0.23, 1, 0.32, 1)",
  };

  if (drawer.drawerOpen) {
    contentStyle.marginRight = 240;
  }

  /* SET Styling */

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
  const SortArray = [
    {
      id: "sortprice",
      placeholder: "מחיר",
      sort: "sortprice",
      htl: "price=0",
      lth: "price=1",
    },
    {
      id: "sortrooms",
      placeholder: "חדרים",
      sort: "sortroom",
      htl: "room=0",
      lth: "room=1",
    },
    {
      id: "sortmeter",
      placeholder: "מטרים",
      sort: "sortmeter",
      htl: "meter=0",
      lth: "meter=1",
    },
    {
      id: "sortupdate",
      placeholder: "עדכונים",
      sort: "sortupdated",
      htl: "updated=0",
      lth: "updated=1",
    },
  ];

  return (
    <div>
      <div style={{ textAlign: "center" }}>renders :{renders.current++}</div>
      <Drawer
        anchor="right"
        variant="persistent"
        PaperProps={{ style: { top: "70px" } }}
        open={drawer.drawerOpen}
      >
        <IconButton onClick={handelDrawer}>
          <CloseTwoToneIcon></CloseTwoToneIcon>
        </IconButton>

        <MemoAdressFillter AdressSearch={HandelFillters} />

        {FillterArray.map((item, i) => (
          <div key={item.placeholder}>
            <MemoFillter
              key1={item.id}
              HandelFillters={HandelFillters}
              frominputName={item.toInputName}
              toinputName={item.fromInputName}
              placeholder={item.placeholder}
            />
          </div>
        ))}
      </Drawer>
      <div style={contentStyle} className="sort flex">
        <p>פילטריה</p>
        <IconButton
          color={!drawer.drawerOpen ? "inherit" : "primary"}
          onClick={handelDrawer}
        >
          <FilterListIcon></FilterListIcon>
        </IconButton>

        {SortArray.map((item, i) => (
          <div key={item.id}>
            <MemoSorts
              sort={item.sort}
              HandelSort={HandelSort}
              htl={item.htl}
              lth={item.lth}
              placeholder={item.placeholder}
            />
          </div>
        ))}
      </div>

      {!data ? null : data.length === 0 ? (
        <div style={contentStyle}>
          <h1>There is No data , click here to reset fillters</h1>
          <button>click me</button>
        </div>
      ) : (
        <div>
          <div style={contentStyle}>
            <MemoApartment data={data} />
          </div>
          <div className="pagination">
            <Box
              style={contentStyle}
              my={2}
              display="flex"
              justifyContent="center"
            >
              <Pagination count={Pages} onChange={handlePagination} />
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}
