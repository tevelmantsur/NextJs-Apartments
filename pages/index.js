import { useState } from "react";
import AllApartments from "../components/AllApartments";
import NavBar from "../components/navBar";

function Home({ data }) {
  return (
    <div dir="rtl">
      <div style={{ marginBottom: "68.5px" }}>
        <NavBar />
      </div>
    </div>
  );
}

export default Home;
