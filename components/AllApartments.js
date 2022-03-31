import { useEffect, useState } from "react";
import { MemoApartment } from "./SingelApartment";
import { useRouter } from "next/router";
import { MemoFillter } from "./Fillters/Fillters";

export default function AllApartments(props) {
  const [data, setData] = useState();
  const [query, setQuery] = useState({});
  const [isLoading, setLoading] = useState(false);

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

  const router = useRouter();
  let url = "http://localhost:3000/search";

  useEffect(() => {
    setLoading(true);
    if (!router.isReady) return;
    return () => {
      console.log(query);
      router.push(`/?${query}`, { query: query });
      console.log(router);
      fetchData();
      setLoading(false);
    };
  }, [query]);

  const fetchData = async () => {
    const response = await fetch(url);
    response = await response.json();
    setData(response[0].data);
  };

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

  return (
    <>
      {!isLoading ? (
        "loading"
      ) : (
        <>
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

          <MemoApartment data={data} />
        </>
      )}
    </>
  );
}
