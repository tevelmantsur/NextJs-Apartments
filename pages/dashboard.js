import NavBar from "../components/navBar";
import { getSession } from "next-auth/react";

function Dashboard() {
  return (
    <div dir="rtl">
      <NavBar />
      <div></div>
    </div>
  );
}

export default Dashboard;

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
  return {
    props: { session }, // will be passed to the page component as props
  };
}
