import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function Dashboard() {
    const classes = useStyles();
    return (
        <React.Fragment>
            <Container maxWidth="xl">
                <div className={classes.root}>
                    <Typography variant="h4" component="h1" align='center' gutterBottom>
                        Dashboard
                    </Typography>
                    <Grid container spacing={3}>    
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>เวลาที่เพิ่ม</Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h4" component="h1" align='center' gutterBottom>
                               ประเภทสัตว์ทั้งหมด
                            </Typography>
                            <Paper className={classes.paper}>5 ประเภท</Paper>
                        </Grid>
                        <Grid item xs={4}>
                              <Typography variant="h4" component="h1" align='center' gutterBottom>
                               อาหารสัตว์ทั้งหมด
                              </Typography>
                              <Paper className={classes.paper}>10 อย่าง</Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h4" component="h1" align='center' gutterBottom>
                               จำนวนสัตว์ทั้งหมด
                              </Typography>
                            <Paper className={classes.paper}>200 ตัว</Paper>
                        </Grid>
                       
                    </Grid>
                </div>
            </Container>
        </React.Fragment>
    );
}