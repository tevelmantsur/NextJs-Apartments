import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MemoApartment } from "../../components/SingelApartment";
import { MemoFillter } from "../../components/Fillters/Fillters";
import { MemoSorts } from "../../components/Fillters/Sorts";
import Drawer from "@mui/material/Drawer";
import { Box, IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { MemoAdressFillter } from "../../components/Fillters/AdressFillter";
import Pagination from "@mui/material/Pagination";
import NavBar from "../../components/navBar";

export default function Search({ data, query }) {
  const [Query, setQuery] = useState(query);
  const [drawer, setDrawer] = useState({ drawerOpen: false, name: "פתח" });

  const router = useRouter();
  const onQueryChange = useCallback(() => {
    router.push({ query: Query });
  }, [Query]);

  useEffect(onQueryChange, [Query]);

  const HandelChange = useCallback((e) => {
    let name = e.target.name;
    let value = e.target.value;
    e.preventDefault();
    if (value.length == 0) {
      setQuery((prevState) => {
        const { [name]: value, ...prevStat2e } = prevState;
        delete prevStat2e.page;
        return {
          ...prevStat2e,
        };
      });
    } else {
      setQuery((prevState) => {
        delete prevState.page;
        return {
          ...prevState,
          [name]: value,
        };
      });
    }
  });

  function HandelSort(e, i) {
    let id = e.target.id;
    if (id == 0 || id == 1) {
      setQuery((prevState) => ({
        ...prevState,
        [i]: id,
      }));
    } else {
      setQuery((prevState) => {
        const { [i]: id, ...prevStat2e } = prevState;

        return {
          ...prevStat2e,
        };
      });
    }
  }

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
      id: "price",
      placeholder: "מחיר",
      sort: "price",
      htl: "0",
      lth: "1",
    },
    {
      id: "rooms",
      placeholder: "חדרים",
      sort: "room",
      htl: "0",
      lth: "1",
    },
    {
      id: "meter",
      placeholder: "מטרים",
      sort: "meter",
      htl: "0",
      lth: "1",
    },
    {
      id: "updated",
      placeholder: "עדכונים",
      sort: "updated",
      htl: "0",
      lth: "1",
    },
  ];

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
    contentStyle.marginRight = 225;
  }

  return (
    <div dir="rtl">
      <NavBar />
      <Drawer
        anchor="right"
        variant="persistent"
        PaperProps={{ style: { top: "70px" } }}
        open={drawer.drawerOpen}
      >
        <IconButton onClick={handelDrawer}>
          <CloseTwoToneIcon></CloseTwoToneIcon>
        </IconButton>

        <MemoAdressFillter AdressSearch={HandelChange} />

        {FillterArray.map((item, i) => (
          <div key={item.placeholder}>
            <MemoFillter
              key1={item.id}
              HandelFillters={HandelChange}
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
          <div className="ap-container" style={contentStyle}>
            <MemoApartment data={data} />
          </div>
          <div className="pagination">
            <Box style={contentStyle} display="flex" justifyContent="center">
              <Pagination
                onClick={(e, value) => {
                  console.log(e.target.innerText);
                  setQuery((prevState) => ({
                    ...prevState,
                    page: e.target.innerText,
                  }));
                }}
                count={Math.round(data[0].pageInfo[0]?.count / 50)}
                page={parseInt(data[0].pageInfo[0]?._id)}
              ></Pagination>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  let query = context.query;
  let MyurlParam = new URLSearchParams(query).toString();
  let url = `https://express-database.vercel.app//search?${MyurlParam}`;

  const res = await fetch(url);
  const data = await res.json();
  return {
    props: { query, data }, // will be passed to the page component as props
  };
}
