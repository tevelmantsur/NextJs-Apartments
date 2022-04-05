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

export default function SingelApartment(props) {
  console.log("Singel Componet has Rendered");

  return (
    <Grid container spacing={2} style={{ padding: "10px 20px" }}>
      {!props.data ? (
        <CircularProgress />
      ) : (
        props.data[0].data.map((item, index) => {
          if (index == 0) {
            return;
          }
          return (
            <Grid item xs={12} sm={6} md={4} lg={4} key={item.id}>
              <Card key={item.id}>
                <Link
                  href={`/apartment/${item.id}`}
                  color="inherit"
                  underline="none"
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="200px"
                      image={item.imgUrl}
                      alt={"image" + item.adress}
                    />
                    <CardContent>
                      <h3>
                        {item.price === 0 ? (
                          "ללא מחיר"
                        ) : (
                          <div>
                            {"מחיר: " +
                              new Intl.NumberFormat().format(item.price)}
                          </div>
                        )}
                      </h3>

                      <Box className="flex">
                        <Tooltip title="כתובת" placement="right-start">
                          <LocationOnIcon fontSize="small" />
                        </Tooltip>
                        <Typography variant="inherit">
                          {item.location}
                        </Typography>
                      </Box>

                      <div></div>
                      <Box className="flex">
                        <Tooltip title="רחוב" placement="right-start">
                          <SignpostIcon fontSize="small" />
                        </Tooltip>
                        <Typography variant="caption">{item.adress}</Typography>
                      </Box>
                      <div></div>
                      <Box className="flex">
                        <Tooltip title="רמת גימור" placement="right-start">
                          <ConstructionIcon fontSize="small" />
                        </Tooltip>
                        <Typography variant="caption">
                          {item.fixlevel}
                        </Typography>
                      </Box>

                      <div></div>
                      <Box className=" rooms">
                        <Typography variant="caption">{item.rooms}</Typography>
                        <Tooltip title="חדרים" placement="bottom-end">
                          <MeetingRoomIcon fontSize="small" />
                        </Tooltip>
                      </Box>
                      <div></div>
                      <Box className=" meters">
                        <Typography variant="caption">{item.meter}</Typography>
                        <Tooltip title="מטר רבוע" placement="bottom-end">
                          <AspectRatioIcon fontSize="small" />
                        </Tooltip>
                      </Box>
                      <div></div>

                      <Box className=" parking">
                        <Typography variant="caption">
                          {" "}
                          {item.parking}
                        </Typography>
                        <Tooltip title="חנייה" placement="bottom-end">
                          <DirectionsCarIcon fontSize="small" />
                        </Tooltip>
                      </Box>

                      {!item.OldPrices.length ? (
                        <Tooltip
                          className="notification"
                          color="inherit"
                          size="small"
                          key={item.id}
                          title="כמות העדכונים  "
                          placement="bottom-start"
                        >
                          <Badge badgeContent={item.updated} color="primary">
                            <NotificationsIcon></NotificationsIcon>
                          </Badge>
                        </Tooltip>
                      ) : (
                        <div key={item.id} className="notification">
                          <Tooltip
                            color="inherit"
                            size="small"
                            key={item.id}
                            title={item.OldPrices.map((e) => {
                              let a = `${new Intl.NumberFormat().format(e)}  `;

                              return a;
                            })}
                            placement="bottom-start"
                          >
                            <Badge badgeContent={item.updated} color="primary">
                              <NotificationsIcon></NotificationsIcon>
                            </Badge>
                          </Tooltip>
                        </div>
                      )}

                      <h4>קומות בבניין: {item.buildingfloors}</h4>
                      <h4>מס קומה: {item.floor}</h4>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Grid>
          );
        })
      )}
    </Grid>
  );
}

export const MemoApartment = React.memo(SingelApartment);
