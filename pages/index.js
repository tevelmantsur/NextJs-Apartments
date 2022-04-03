import NavBar from "../components/navBar";
import { useSession, getSession, signIn } from "next-auth/react";
import { Button, Container, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

import { Box } from "@mui/system";

function Home() {
  const { data: session } = useSession();

  const style = {};

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        textAlign="center"
      >
        <Box>
          <Box>
            <Typography variant="h3" align="center">
              gas התחברות למערכת
            </Typography>
          </Box>

          <Button
            endIcon={<GoogleIcon />}
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000//apartment/new",
              })
            }
          >
            Google התחבר באמצעות{" "}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Home;

export async function getServerSideProps(context) {
  let session = await getSession(context);
  if (session) {
    return {
      redirect: {
        destination: "/apartment/new",
        permanent: false,
      },
    };
  }
  return {
    props: { session }, // will be passed to the page component as props
  };
}
