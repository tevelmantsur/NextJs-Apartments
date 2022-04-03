import NavBar from "../components/navBar";
import { useSession, getSession, signIn } from "next-auth/react";
import { Button, Container, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import backgroundImage from "../public/assets/Asset1.png";

import { Box } from "@mui/system";

function Home() {
  console.log(backgroundImage);
  const styling = {
    backgroundImage: `url('${backgroundImage.src}')`,
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh",
    marginLeft: "-1px",
  };

  const { data: session } = useSession();

  const style = {};

  return (
    <div style={styling}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="81vh"
        textAlign="center"
      >
        <Box>
          <Box>
            <Typography
              color="white"
              variant="h3"
              align="center"
              padding={"20px"}
            >
              התחברות למערכת
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            endIcon={<GoogleIcon />}
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000/apartment/new",
              })
            }
          >
            Google התחבר באמצעות{" "}
          </Button>
        </Box>
      </Box>
    </div>
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
