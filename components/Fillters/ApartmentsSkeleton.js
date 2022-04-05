import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import {
  CardActionArea,
  CircularProgress,
  IconButton,
  Link,
  ListItem,
  Skeleton,
  Tooltip,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import SignpostIcon from "@mui/icons-material/Signpost";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/system";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import ConstructionIcon from "@mui/icons-material/Construction";

export default function ApartmnetLoading() {
  let fakeArray = [...Array(50).keys()];
  return (
    <Grid container spacing={2} style={{ padding: "10px 20px" }}>
      {fakeArray.map((item, index) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={4} key={item}>
            <Card key={item}>
              <CardActionArea>
                <Skeleton
                  sx={{ height: 200 }}
                  animation="wave"
                  variant="rectangular"
                />
                <CardContent>
                  <Typography varient="h3">
                    <Skeleton width={130} height={18} />
                  </Typography>
                  <Box className="flex">
                    <LocationOnIcon fontSize="small"></LocationOnIcon>
                    <Typography variant="inherit">
                      <Skeleton width={150} height={13} />
                    </Typography>
                  </Box>
                  <div></div>
                  <Box className="flex">
                    <SignpostIcon fontSize="small"></SignpostIcon>
                    <Typography variant="caption">
                      <Skeleton width={110} height={13} />
                    </Typography>
                  </Box>
                  <div></div>
                  <Box className="flex">
                    <ConstructionIcon fontSize="small" />
                    <Typography variant="caption">
                      <Skeleton width={110} height={13} />
                    </Typography>
                  </Box>
                  <div></div>
                  <Box className=" rooms">
                    <Typography variant="caption"> </Typography>
                    <Skeleton width={22} height={16} />
                    <MeetingRoomIcon fontSize="small" />
                  </Box>
                  <div></div>
                  <Box className=" meters">
                    <Typography variant="caption"> </Typography>
                    <Skeleton width={22} height={16} />
                    <AspectRatioIcon fontSize="small" />
                  </Box>
                  <div></div>
                  <Box className=" parking">
                    <Typography variant="caption"></Typography>
                    <Skeleton variant="text" width={22} height={16} />
                    <DirectionsCarIcon fontSize="small" />
                  </Box>
                  <div key={item.id} className="notification">
                    <NotificationsIcon>
                      <Skeleton width={20} />
                    </NotificationsIcon>
                  </div>

                  <Skeleton width={110} height={15} />
                  <Skeleton width={110} height={15} />
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}
