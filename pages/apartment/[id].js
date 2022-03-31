/** 

import * as React from "react";
import { useRouter } from "next/router";

export default function NavBar({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <>{!data ? "loading" : <h1>{data.id}</h1>}</>;
}

export async function getStaticPaths(props) {
  console.log(props);
  return {
    // Only `/posts/1` and `/posts/2` are generated at build time
    paths: [{ params: { id: "py0h2c8x" } }],
    // Enable statically generating additional pages
    // For example: `/posts/3`
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  console.log(params);
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const res = await fetch(
    `https://express-database.vercel.app/apartment/${params.id}`
  );
  const data = await res.json();

  // Pass post data to the page via props
  return {
    props: { data },
    // Re-generate the post at most once per second
    // if a request comes in
    revalidate: 1,
  };
}
**/
