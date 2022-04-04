import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { MemoApartment } from "../../components/SingelApartment";
import { MemoFillter } from "../../components/Fillters/Fillters";
import { MemoSorts } from "../../components/Fillters/Sorts";
import Drawer from "@mui/material/Drawer";
import { Box, IconButton, Grid, Button } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import { MemoAdressFillter } from "../../components/Fillters/AdressFillter";
import Pagination from "@mui/material/Pagination";
import NavBar from "../../components/navBar";
import { isMobile } from "react-device-detect";
import * as rdd from "react-device-detect";
export default function Search({ data, query }) {
  const [Query, setQuery] = useState(query);
  const [drawer, setDrawer] = useState({ drawerOpen: false, name: "פתח" });
  console.log(query);
  const router = useRouter();
  const onQueryChange = useCallback(() => {
    router.push({ query: Query });
  }, [Query]);

  useEffect(onQueryChange, [Query]);

  const HandelChange = useCallback(
    (e) => {
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
    },
    [Query]
  );

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
  let page = parseInt(data[0].pageInfo[0]?._id);
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

  if (drawer.drawerOpen && !isMobile) {
    contentStyle.marginRight = 225;
  }

  return (
    <div dir="rtl">
      <NavBar />
      <h1>{JSON.stringify(isMobile)}</h1>

      <Drawer
        sx={
          !isMobile
            ? {
                width: 225,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: 225,
                  top: 70,
                },
              }
            : {
                "& .MuiDrawer-paper": {
                  width: "100%",
                  top: 70,
                },
              }
        }
        anchor={!isMobile ? "right" : "bottom"}
        variant="persistent"
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

      <Grid className="sort" container style={contentStyle}>
        <Grid style={{ textAlign: "center" }} item xs={!isMobile ? "auto" : 12}>
          <Button
            color={!drawer.drawerOpen ? "inherit" : "primary"}
            onClick={handelDrawer}
            startIcon={<FilterListIcon />}
          >
            פילטריה
          </Button>
        </Grid>

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
      </Grid>

      {!data ? (
        "loading"
      ) : data.length === 0 ? (
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
                  setQuery((prevState) => ({
                    ...prevState,
                    page: e.target.innerText,
                  }));
                }}
                count={Math.round(data[0].pageInfo[0]?.count / 50)}
                page={isNaN(page) ? 0 : page}
              ></Pagination>
            </Box>
          </div>
        </div>
      )}
    </div>
  );
}
import { getSession } from "next-auth/react";

export async function getServerSideProps(context) {
  let session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  let query = context.query;
  let MyurlParam = new URLSearchParams(query).toString();
  let url = `https://express-database-theta.vercel.app/search?${MyurlParam}`;
  const res = await fetch(url);
  const data = await res.json();
  return {
    props: { query, data, session }, // will be passed to the page component as props
  };
}
