import * as React from "react";
import { useRouter } from "next/router";

export default function NavBar({ data }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return <>{!data ? "loading" : <h1>{data.id}</h1>}</>;
}
