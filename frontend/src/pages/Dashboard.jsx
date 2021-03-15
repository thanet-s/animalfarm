import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [show, setShow] = useState({
    types: 0,
    foods: 0,
    animals: 0,
  });
  useEffect(() => {
    const fetchData = async () => {
      axios.get("/api/dashboard").then((res) => {
        if (res.status === 200) {
          setShow(res.data);
        }
      });
    };
    fetchData();
  }, []);
  return (
    <React.Fragment>
      <Container maxWidth="xl">
        <div className={classes.root}>
          <Typography color='primary' variant="h1" component="h1" align="center" gutterBottom>
            Dashboard
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Typography
                variant="h4"
                component="h4"
                align="center"
                gutterBottom
              >
                ประเภทสัตว์ทั้งหมด
              </Typography>
              <Paper className={classes.paper}>
                <Typography
                  color="secondary"
                  variant="h2"
                  component="h4"
                  align="center"
                  gutterBottom
                >
                  {show.types} ประเภท
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h4"
                component="h4"
                align="center"
                gutterBottom
              >
                อาหารสัตว์ทั้งหมด
              </Typography>
              <Paper className={classes.paper}>
                <Typography
                  color="secondary"
                  variant="h2"
                  component="h4"
                  align="center"
                  gutterBottom
                >
                  {show.foods} อย่าง
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={4}>
              <Typography
                variant="h4"
                component="h4"
                align="center"
                gutterBottom
              >
                จำนวนสัตว์ทั้งหมด
              </Typography>
              <Paper className={classes.paper}>
                <Typography
                  color="secondary"
                  variant="h2"
                  component="h4"
                  align="center"
                  gutterBottom
                >
                  {show.animals} ตัว
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </Container>
    </React.Fragment>
  );
}
