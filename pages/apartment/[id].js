import * as React from "react";
import { useRouter } from "next/router";
import NavBar from "../../components/navBar";
import { getSession } from "next-auth/react";
import { Container, Grid } from "@mui/material";
import { height } from "@mui/system";
import { Image } from "@mui/icons-material";

export default function ApartmentDetails({ data }) {
  const router = useRouter();
  console.log(data);
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div dir="rtl">
      <NavBar></NavBar>
      {!data ? (
        "loading"
      ) : (
        <Grid container justifyContent={"flex-start"}>
          <Grid>
            <img src={data.imgUrl} alt={`בית ב ${data.location}`}></img>
          </Grid>
          <Grid>
            <h1>{data.id}</h1>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export async function getServerSideProps(context) {
  let params = context.params;
  let session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://ap-db-six.vercel.app/apartment/${params.id}`
  );
  const data = await res.json();

  // Pass post data to the page via props
  return {
    props: { data, session },
  };
}
